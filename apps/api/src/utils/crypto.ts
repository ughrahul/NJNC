import bcrypt from 'bcrypt';
import crypto from 'crypto';

const BCRYPT_COST_FACTOR = 12;

/**
 * Hash a password with bcrypt (cost factor 12 as per spec §12.4).
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_COST_FACTOR);
}

/**
 * Verify a password against a bcrypt hash.
 */
export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Generate a cryptographically secure random token (base64url).
 * Used for refresh tokens (64 bytes as per spec §12.1).
 */
export function generateSecureToken(bytes = 64): string {
  return crypto.randomBytes(bytes).toString('base64url');
}

/**
 * Hash a token with SHA-256 for storage (refresh tokens stored hashed).
 */
export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

/**
 * Generate a speaker self-update token.
 */
export function generateUpdateToken(): string {
  return generateSecureToken(32);
}
