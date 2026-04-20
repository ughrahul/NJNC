import type { FastifyInstance } from 'fastify';
import type { RegisterInput, LoginInput, ForgotPasswordInput, ResetPasswordInput } from '../schemas/auth.schema';
import { hashPassword, verifyPassword, generateSecureToken, hashToken } from '../utils/crypto';
import { ConflictError, UnauthorizedError, NotFoundError, ValidationError } from '../utils/errors';
import type { JwtPayload } from '../plugins/jwt';

const REFRESH_TOKEN_EXPIRY_DAYS = 7;
const LOCKOUT_THRESHOLD = 5;
const LOCKOUT_DURATION_SECONDS = 900; // 15 minutes

export class AuthService {
  constructor(private app: FastifyInstance) {}

  /**
   * Register a new user account.
   * Spec §10.3: POST /api/auth/register
   */
  async register(input: RegisterInput) {
    // Check for existing user
    const existing = await this.app.prisma.user.findUnique({
      where: { email: input.email },
    });
    if (existing) {
      throw new ConflictError('Email address is already registered', {
        email: 'This email is already in use',
      });
    }

    const passwordHash = await hashPassword(input.password);

    const user = await this.app.prisma.user.create({
      data: {
        email: input.email,
        name: input.name,
        passwordHash,
        phone: input.phone,
        country: input.country,
        institution: input.institution,
        specialty: input.specialty,
        designation: input.designation,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    // Generate tokens
    const accessToken = this.generateAccessToken(user);
    const refreshToken = await this.createRefreshToken(user.id);

    return { user, accessToken, refreshToken };
  }

  /**
   * Login with email and password.
   * Spec §12.1: Login Sequence
   */
  async login(input: LoginInput) {
    // Check account lockout
    const lockoutKey = `lockout:${input.email}`;
    const failedAttempts = await this.app.redis.get(`failed-login:${input.email}`);
    
    if (failedAttempts && parseInt(failedAttempts) >= LOCKOUT_THRESHOLD) {
      const ttl = await this.app.redis.ttl(`failed-login:${input.email}`);
      throw new UnauthorizedError(
        `Account locked due to too many failed attempts. Try again in ${Math.ceil(ttl / 60)} minutes.`
      );
    }

    const user = await this.app.prisma.user.findUnique({
      where: { email: input.email },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        passwordHash: true,
        deletedAt: true,
        createdAt: true,
      },
    });

    if (!user || user.deletedAt) {
      await this.incrementFailedLogin(input.email);
      throw new UnauthorizedError('Invalid email or password');
    }

    if (!user.passwordHash) {
      throw new UnauthorizedError(
        'This account uses Google login. Please sign in with Google.'
      );
    }

    const isValid = await verifyPassword(input.password, user.passwordHash);
    if (!isValid) {
      await this.incrementFailedLogin(input.email);
      throw new UnauthorizedError('Invalid email or password');
    }

    // Clear failed login attempts on success
    await this.app.redis.del(`failed-login:${input.email}`);

    const { passwordHash: _, ...userWithoutPassword } = user;
    const accessToken = this.generateAccessToken(userWithoutPassword);
    const refreshToken = await this.createRefreshToken(user.id);

    return {
      user: userWithoutPassword,
      accessToken,
      refreshToken,
    };
  }

  /**
   * Refresh access token using a valid refresh token.
   * Spec §12.1: Rotated on every use (old token invalidated, new token issued).
   */
  async refresh(refreshTokenRaw: string) {
    const tokenHash = hashToken(refreshTokenRaw);

    const storedToken = await this.app.prisma.refreshToken.findUnique({
      where: { tokenHash },
      include: {
        user: {
          select: { id: true, email: true, name: true, role: true, deletedAt: true },
        },
      },
    });

    if (!storedToken || storedToken.revokedAt || storedToken.user.deletedAt) {
      throw new UnauthorizedError('Invalid or expired refresh token');
    }

    if (storedToken.expiresAt < new Date()) {
      // Revoke expired token
      await this.app.prisma.refreshToken.update({
        where: { id: storedToken.id },
        data: { revokedAt: new Date() },
      });
      throw new UnauthorizedError('Refresh token has expired');
    }

    // Rotate: revoke old, create new
    await this.app.prisma.refreshToken.update({
      where: { id: storedToken.id },
      data: { revokedAt: new Date() },
    });

    const accessToken = this.generateAccessToken(storedToken.user);
    const newRefreshToken = await this.createRefreshToken(storedToken.user.id);

    return {
      user: storedToken.user,
      accessToken,
      refreshToken: newRefreshToken,
    };
  }

  /**
   * Logout: revoke the refresh token.
   * Spec §10.3: POST /api/auth/logout
   */
  async logout(refreshTokenRaw: string) {
    const tokenHash = hashToken(refreshTokenRaw);

    await this.app.prisma.refreshToken.updateMany({
      where: { tokenHash, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  /**
   * Forgot password: send reset email.
   * Spec §12.4: Password reset via signed JWT token valid for 1 hour.
   */
  async forgotPassword(input: ForgotPasswordInput) {
    const user = await this.app.prisma.user.findUnique({
      where: { email: input.email },
      select: { id: true, email: true, deletedAt: true },
    });

    // Always return success to prevent email enumeration
    if (!user || user.deletedAt) {
      return;
    }

    const resetToken = this.app.jwt.signPasswordReset(user.email);

    // TODO: Queue email job with reset link
    // await this.app.bull.add('email', {
    //   template: 'password-reset',
    //   to: user.email,
    //   data: { resetToken, resetUrl: `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}` },
    // });

    this.app.log.info({ email: user.email }, 'Password reset email queued');
  }

  /**
   * Reset password with token.
   * Spec §10.3: POST /api/auth/reset-password
   */
  async resetPassword(input: ResetPasswordInput) {
    let email: string;
    try {
      const decoded = this.app.jwt.verifyPasswordReset(input.token);
      email = decoded.email;
    } catch {
      throw new ValidationError('Invalid or expired reset token');
    }

    const user = await this.app.prisma.user.findUnique({
      where: { email },
      select: { id: true, deletedAt: true },
    });

    if (!user || user.deletedAt) {
      throw new NotFoundError('User');
    }

    const passwordHash = await hashPassword(input.password);

    await this.app.prisma.user.update({
      where: { id: user.id },
      data: { passwordHash },
    });

    // Revoke all existing refresh tokens
    await this.app.prisma.refreshToken.updateMany({
      where: { userId: user.id, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  /**
   * Get current user profile.
   * Spec §10.3: GET /api/auth/me
   */
  async getProfile(userId: string) {
    const user = await this.app.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        phone: true,
        country: true,
        institution: true,
        specialty: true,
        designation: true,
        isEmailVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundError('User', userId);
    }

    return user;
  }

  // ─── Private Helpers ──────────────────────────────────────

  private generateAccessToken(user: {
    id: string;
    email: string;
    role: string;
  }): string {
    return this.app.jwt.sign({
      userId: user.id,
      email: user.email,
      role: user.role,
    });
  }

  private async createRefreshToken(userId: string): Promise<string> {
    const rawToken = generateSecureToken(64);
    const tokenHash = hashToken(rawToken);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_EXPIRY_DAYS);

    await this.app.prisma.refreshToken.create({
      data: {
        userId,
        tokenHash,
        expiresAt,
      },
    });

    return rawToken;
  }

  /**
   * Increment failed login counter in Redis.
   * Spec §12.4: Account locked for 15 minutes after 5 failed attempts.
   */
  private async incrementFailedLogin(email: string): Promise<void> {
    const key = `failed-login:${email}`;
    const current = await this.app.redis.incr(key);
    if (current === 1) {
      await this.app.redis.expire(key, LOCKOUT_DURATION_SECONDS);
    }
  }
}
