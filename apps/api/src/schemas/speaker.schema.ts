import { z } from "zod";

export const createSpeakerSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  institution: z.string().min(1),
  country: z.string().min(1),
  bio: z.string().min(10),
  photoUrl: z.string().url().optional(),
  email: z.string().email().optional(),
  linkedInUrl: z.string().url().optional(),
});
export type CreateSpeakerInput = z.infer<typeof createSpeakerSchema>;

export const updateSpeakerSchema = createSpeakerSchema.partial();
export type UpdateSpeakerInput = z.infer<typeof updateSpeakerSchema>;
