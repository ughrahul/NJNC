import { z } from 'zod';

export const uploadPaymentProofSchema = z.object({
  registrationId: z.string().min(1),
  method: z.enum(['BANK_TRANSFER', 'QR_PAYMENT']),
  amount: z.number().positive(),
  currency: z.string().default('USD'),
  proofUrl: z.string().url('Proof URL is required'),
});
export type UploadPaymentProofInput = z.infer<typeof uploadPaymentProofSchema>;

export const verifyPaymentSchema = z.object({
  status: z.enum(['VERIFIED', 'REJECTED']),
  adminNotes: z.string().optional(),
});
export type VerifyPaymentInput = z.infer<typeof verifyPaymentSchema>;
