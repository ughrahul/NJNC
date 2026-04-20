import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import {
  uploadPaymentProofSchema,
  verifyPaymentSchema,
} from "../schemas/payment.schema";
import { paginationSchema, idParamSchema } from "../schemas/common.schema";
import { extractUser, requireAuth } from "../middleware/auth";
import { requireRole } from "../middleware/require-role";
import { successResponse, paginationMeta } from "../utils/response";
import {
  NotFoundError,
  ForbiddenError,
  ValidationError,
} from "../utils/errors";

/**
 * Payment routes — Spec §10.5
 * Manual payment proof upload and admin verification.
 */
export default async function paymentRoutes(app: FastifyInstance) {
  app.addHook("preHandler", extractUser);

  // POST /api/payments/upload-proof — Upload payment proof
  app.post(
    "/upload-proof",
    { preHandler: [requireAuth] },
    async (req: FastifyRequest, reply: FastifyReply) => {
      const parsed = uploadPaymentProofSchema.safeParse(req.body);
      if (!parsed.success) {
        const fields: Record<string, string> = {};
        parsed.error.errors.forEach(
          (e) => (fields[e.path.join(".")] = e.message),
        );
        throw new ValidationError("Validation failed", fields);
      }

      // Verify ownership
      const registration = await app.prisma.registration.findUnique({
        where: { id: parsed.data.registrationId },
      });
      if (!registration)
        throw new NotFoundError("Registration", parsed.data.registrationId);
      if (registration.userId !== req.user!.userId) throw new ForbiddenError();

      const payment = await app.prisma.payment.create({
        data: {
          registrationId: parsed.data.registrationId,
          amount: parsed.data.amount,
          currency: parsed.data.currency,
          method: parsed.data.method,
          proofUrl: parsed.data.proofUrl,
          status: "PENDING",
        },
      });

      return reply.status(201).send(successResponse(payment));
    },
  );

  // GET /api/payments (admin) — List all payments
  app.get(
    "/",
    { preHandler: [requireAuth, requireRole("ADMIN")] },
    async (req: FastifyRequest, reply: FastifyReply) => {
      const query = req.query as any;
      const pagination = paginationSchema.parse(query);
      const where: any = {};
      if (query.status) where.status = query.status;

      const [payments, total] = await Promise.all([
        app.prisma.payment.findMany({
          where,
          include: {
            registration: {
              include: {
                user: {
                  select: { id: true, name: true, email: true, country: true },
                },
              },
            },
          },
          orderBy: { createdAt: "desc" },
          skip: (pagination.page - 1) * pagination.perPage,
          take: pagination.perPage,
        }),
        app.prisma.payment.count({ where }),
      ]);

      return reply.send(
        successResponse(
          payments,
          paginationMeta(pagination.page, pagination.perPage, total),
        ),
      );
    },
  );

  // PATCH /api/payments/:id/verify (admin) — Verify or reject payment
  app.patch(
    "/:id/verify",
    { preHandler: [requireAuth, requireRole("ADMIN")] },
    async (req: FastifyRequest, reply: FastifyReply) => {
      const { id } = idParamSchema.parse(req.params);
      const parsed = verifyPaymentSchema.safeParse(req.body);
      if (!parsed.success) throw new ValidationError("Validation failed");

      const payment = await app.prisma.payment.findUnique({ where: { id } });
      if (!payment) throw new NotFoundError("Payment", id);

      const updated = await app.prisma.payment.update({
        where: { id },
        data: {
          status: parsed.data.status,
          adminNotes: parsed.data.adminNotes,
          verifiedAt: parsed.data.status === "VERIFIED" ? new Date() : null,
          verifiedById: req.user!.userId,
        },
      });

      // If verified, update registration status too
      if (parsed.data.status === "VERIFIED") {
        await app.prisma.registration.update({
          where: { id: payment.registrationId },
          data: { paymentStatus: "VERIFIED" },
        });
      } else if (parsed.data.status === "REJECTED") {
        await app.prisma.registration.update({
          where: { id: payment.registrationId },
          data: { paymentStatus: "REJECTED" },
        });
      }

      return reply.send(successResponse(updated));
    },
  );
}
