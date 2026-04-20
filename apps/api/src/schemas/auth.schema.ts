import { z } from 'zod';

// ─── Password Validation ────────────────────────────────────
// Spec §12.4: min 8 chars, 1 uppercase, 1 number
const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

// ─── Register ───────────────────────────────────────────────
export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  password: passwordSchema,
  phone: z.string().optional(),
  country: z.string().optional(),
  institution: z.string().optional(),
  specialty: z.string().optional(),
  designation: z.string().optional(),
});
export type RegisterInput = z.infer<typeof registerSchema>;

// ─── Login ──────────────────────────────────────────────────
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});
export type LoginInput = z.infer<typeof loginSchema>;

// ─── Forgot Password ────────────────────────────────────────
export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

// ─── Reset Password ─────────────────────────────────────────
export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  password: passwordSchema,
});
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

// ─── Refresh Token ──────────────────────────────────────────
export const refreshSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});
export type RefreshInput = z.infer<typeof refreshSchema>;
