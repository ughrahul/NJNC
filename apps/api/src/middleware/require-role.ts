import type { FastifyRequest, FastifyReply } from 'fastify';
import type { Role } from '@njnc/types';
import { ForbiddenError, UnauthorizedError } from '../utils/errors';

/**
 * RBAC middleware factory.
 * Spec §12.2: Enforced via requireRole(role) applied to route definitions.
 *
 * Usage:
 *   { preHandler: [requireAuth, requireRole('ADMIN')] }
 */
export function requireRole(...roles: Role[]) {
  return async (request: FastifyRequest, _reply: FastifyReply) => {
    if (!request.user) {
      throw new UnauthorizedError('Authentication required');
    }

    if (!roles.includes(request.user.role as Role)) {
      throw new ForbiddenError(
        `This action requires one of the following roles: ${roles.join(', ')}`
      );
    }
  };
}
