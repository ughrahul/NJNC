import { z } from "zod";

export const createSessionSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  hall: z.string().min(1),
  day: z.number().int().min(1).max(2),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  type: z.enum([
    "KEYNOTE",
    "PANEL",
    "WORKSHOP",
    "ORAL_PRESENTATION",
    "EPOSTER_SESSION",
    "BREAK",
    "NETWORKING",
  ]),
  speakerId: z.string().optional(),
});
export type CreateSessionInput = z.infer<typeof createSessionSchema>;

export const updateSessionSchema = createSessionSchema.partial();
