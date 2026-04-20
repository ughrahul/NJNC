import { z } from "zod";
import { ABSTRACT_CONSTRAINTS } from "@njnc/utils";

const presentationTypeEnum = z.enum(["ORAL", "POSTER", "EPOSTER", "EITHER"]);

const coAuthorSchema = z.object({
  name: z.string().min(1),
  institution: z.string().min(1),
  email: z.string().email(),
});

// ─── Create/Update Abstract ─────────────────────────────────
export const createAbstractSchema = z.object({
  title: z
    .string()
    .min(1)
    .refine(
      (val) => val.split(/\s+/).length <= ABSTRACT_CONSTRAINTS.titleMaxWords,
      `Title must not exceed ${ABSTRACT_CONSTRAINTS.titleMaxWords} words`,
    ),
  body: z
    .string()
    .min(1)
    .refine(
      (val) => val.split(/\s+/).length <= ABSTRACT_CONSTRAINTS.bodyMaxWords,
      `Body must not exceed ${ABSTRACT_CONSTRAINTS.bodyMaxWords} words`,
    ),
  topic: z.string().min(1, "Topic is required"),
  presentationType: presentationTypeEnum,
  coAuthors: z
    .array(coAuthorSchema)
    .max(ABSTRACT_CONSTRAINTS.maxCoAuthors)
    .default([]),
  fileUrl: z.string().url().optional(),
});
export type CreateAbstractInput = z.infer<typeof createAbstractSchema>;

// ─── Submit Abstract ────────────────────────────────────────
export const submitAbstractSchema = z.object({
  abstractId: z.string().min(1),
});

// ─── Assign Reviewers ───────────────────────────────────────
export const assignReviewersSchema = z.object({
  reviewerIds: z.array(z.string().min(1)).min(2).max(3),
});

// ─── Submit Review ──────────────────────────────────────────
export const submitReviewSchema = z.object({
  originality: z.number().int().min(1).max(5),
  scientificMerit: z.number().int().min(1).max(5),
  clinicalRelevance: z.number().int().min(1).max(5),
  presentationQuality: z.number().int().min(1).max(5),
  comments: z.string().optional(),
  recommendation: z.enum(["ACCEPT", "REJECT", "REVISE"]),
});
export type SubmitReviewInput = z.infer<typeof submitReviewSchema>;

// ─── Admin Decision ─────────────────────────────────────────
export const abstractDecisionSchema = z.object({
  status: z.enum(["ACCEPTED", "REJECTED", "REVISION_REQUIRED"]),
  reviewerComments: z.string().optional(),
});
