import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { extractUser, requireAuth } from "../middleware/auth";
import { successResponse } from "../utils/response";

/**
 * User routes — Spec §10.10 (GDPR-related)
 */
export default async function userRoutes(app: FastifyInstance) {
  app.addHook("preHandler", extractUser);
  app.addHook("preHandler", requireAuth);

  // GET /api/users/me/data — GDPR data export
  app.get("/me/data", async (req: FastifyRequest, reply: FastifyReply) => {
    const user = await app.prisma.user.findUnique({
      where: { id: req.user!.userId },
      include: {
        registrations: true,
        abstracts: true,
      },
    });
    return reply.send(successResponse(user));
  });

  // DELETE /api/users/me — GDPR account deletion (soft delete)
  app.delete("/me", async (req: FastifyRequest, reply: FastifyReply) => {
    await app.prisma.user.update({
      where: { id: req.user!.userId },
      data: { deletedAt: new Date() },
    });

    // Revoke all refresh tokens
    await app.prisma.refreshToken.updateMany({
      where: { userId: req.user!.userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });

    return reply.send(
      successResponse({ message: "Account scheduled for deletion" }),
    );
  });
}
