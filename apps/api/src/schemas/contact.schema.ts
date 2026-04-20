import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  inquiryType: z.enum(["REGISTRATION", "ABSTRACT", "GENERAL"]),
  message: z.string().min(10).max(2000),
});
export type ContactFormInput = z.infer<typeof contactFormSchema>;
