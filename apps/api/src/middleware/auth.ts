import type { FastifyRequest, FastifyReply } from "fastify";
import type { JwtPayload } from "../plugins/jwt";
import { UnauthorizedError } from "../utils/errors";

declare module "fastify" {
  interface FastifyRequest {
    user?: JwtPayload;
  }
}

/**
 * Auth middleware: extracts and verifies JWT from Authorization header.
 * Sets request.user if valid. Does NOT block — for optional auth.
 */
export async function extractUser(
  request: FastifyRequest,
  _reply: FastifyReply,
) {
  const authHeader = request.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return; // No token, continue without user
  }

  const token = authHeader.slice(7);
  try {
    const payload = request.server.jwt.verify(token);

    // Check if user is soft-deleted
    const user = await request.server.prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, deletedAt: true },
    });

    if (!user || user.deletedAt) {
      return; // User doesn't exist or is deleted
    }

    request.user = payload;
  } catch {
    // Invalid token, continue without user
  }
}

/**
 * Auth guard: requires a valid authenticated user.
 * Must be used after extractUser middleware.
 */
export async function requireAuth(
  request: FastifyRequest,
  _reply: FastifyReply,
) {
  if (!request.user) {
    throw new UnauthorizedError("Authentication required");
  }
}
