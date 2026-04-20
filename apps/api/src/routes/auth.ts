import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { AuthService } from '../services/auth.service';
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from '../schemas/auth.schema';
import { extractUser, requireAuth } from '../middleware/auth';
import { successResponse, errorResponse } from '../utils/response';
import { ValidationError } from '../utils/errors';

/**
 * Auth routes — Spec §10.3
 * 7 endpoints under /api/auth
 */
export default async function authRoutes(app: FastifyInstance) {
  const authService = new AuthService(app);

  // ─── POST /api/auth/register ──────────────────────────────
  app.post('/register', async (request: FastifyRequest, reply: FastifyReply) => {
    const parsed = registerSchema.safeParse(request.body);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.errors.forEach((err) => {
        const field = err.path.join('.');
        fieldErrors[field] = err.message;
      });
      throw new ValidationError('Validation failed', fieldErrors);
    }

    const result = await authService.register(parsed.data);

    // Set refresh token as httpOnly cookie (spec §12.1)
    reply.setCookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/api/auth',
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    });

    return reply.status(201).send(
      successResponse({
        user: result.user,
        accessToken: result.accessToken,
      })
    );
  });

  // ─── POST /api/auth/login ─────────────────────────────────
  app.post('/login', {
    config: {
      rateLimit: {
        max: 5,
        timeWindow: '1 minute',
      },
    },
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      const parsed = loginSchema.safeParse(request.body);
      if (!parsed.success) {
        throw new ValidationError('Invalid credentials');
      }

      const result = await authService.login(parsed.data);

      reply.setCookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/api/auth',
        maxAge: 7 * 24 * 60 * 60,
      });

      return reply.send(
        successResponse({
          user: result.user,
          accessToken: result.accessToken,
        })
      );
    },
  });

  // ─── POST /api/auth/logout ────────────────────────────────
  app.post(
    '/logout',
    { preHandler: [extractUser, requireAuth] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const refreshToken = request.cookies?.refreshToken;
      if (refreshToken) {
        await authService.logout(refreshToken);
      }

      reply.clearCookie('refreshToken', {
        path: '/api/auth',
      });

      return reply.send(successResponse({ message: 'Logged out successfully' }));
    }
  );

  // ─── POST /api/auth/refresh ───────────────────────────────
  app.post('/refresh', async (request: FastifyRequest, reply: FastifyReply) => {
    const refreshToken = request.cookies?.refreshToken;
    if (!refreshToken) {
      return reply.status(401).send(
        errorResponse('UNAUTHORIZED', 'Refresh token required')
      );
    }

    const result = await authService.refresh(refreshToken);

    reply.setCookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/api/auth',
      maxAge: 7 * 24 * 60 * 60,
    });

    return reply.send(
      successResponse({
        user: result.user,
        accessToken: result.accessToken,
      })
    );
  });

  // ─── POST /api/auth/forgot-password ───────────────────────
  app.post(
    '/forgot-password',
    {
      config: {
        rateLimit: {
          max: 3,
          timeWindow: '1 minute',
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const parsed = forgotPasswordSchema.safeParse(request.body);
      if (!parsed.success) {
        throw new ValidationError('Invalid email address');
      }

      await authService.forgotPassword(parsed.data);

      // Always return success to prevent email enumeration
      return reply.send(
        successResponse({
          message: 'If an account exists with this email, a password reset link has been sent.',
        })
      );
    }
  );

  // ─── POST /api/auth/reset-password ────────────────────────
  app.post('/reset-password', async (request: FastifyRequest, reply: FastifyReply) => {
    const parsed = resetPasswordSchema.safeParse(request.body);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.errors.forEach((err) => {
        fieldErrors[err.path.join('.')] = err.message;
      });
      throw new ValidationError('Validation failed', fieldErrors);
    }

    await authService.resetPassword(parsed.data);

    return reply.send(
      successResponse({
        message: 'Password has been reset successfully. Please log in.',
      })
    );
  });

  // ─── GET /api/auth/me ─────────────────────────────────────
  app.get(
    '/me',
    { preHandler: [extractUser, requireAuth] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const user = await authService.getProfile(request.user!.userId);
      return reply.send(successResponse(user));
    }
  );
}
