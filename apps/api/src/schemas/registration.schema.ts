import { z } from 'zod';

const delegateCategoryEnum = z.enum([
  'INTERNATIONAL',
  'NATIONAL',
  'SAARC',
  'RESIDENT_MO_PARAMEDICS',
]);

// ─── Create Registration ─────────────────────────────────────
export const createRegistrationSchema = z.object({
  category: delegateCategoryEnum,
  workshopSelected: z.boolean().default(false),
  phone: z.string().optional(),
  country: z.string().min(1, 'Country is required'),
  institution: z.string().min(1, 'Institution is required'),
  specialty: z.string().optional(),
  designation: z.string().optional(),
  notes: z.string().max(500).optional(),
});
export type CreateRegistrationInput = z.infer<typeof createRegistrationSchema>;

// ─── Update Registration (admin) ────────────────────────────
export const updateRegistrationSchema = z.object({
  category: delegateCategoryEnum.optional(),
  workshopSelected: z.boolean().optional(),
  paymentStatus: z.enum(['PENDING', 'VERIFIED', 'REJECTED', 'REFUNDED', 'CANCELLED']).optional(),
  notes: z.string().max(500).optional(),
});
export type UpdateRegistrationInput = z.infer<typeof updateRegistrationSchema>;

// ─── Request Invitation Letter ──────────────────────────────
export const requestInvitationLetterSchema = z.object({
  registrationId: z.string().min(1),
});
export type RequestInvitationLetterInput = z.infer<typeof requestInvitationLetterSchema>;
