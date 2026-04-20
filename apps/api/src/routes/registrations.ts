import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { RegistrationService } from '../services/registration.service';
import { createRegistrationSchema, updateRegistrationSchema } from '../schemas/registration.schema';
import { paginationSchema, idParamSchema } from '../schemas/common.schema';
import { extractUser, requireAuth } from '../middleware/auth';
import { requireRole } from '../middleware/require-role';
import { successResponse } from '../utils/response';
import { paginationMeta } from '../utils/response';
import { ValidationError } from '../utils/errors';

/**
 * Registration routes — Spec §10.4
 * 6 endpoints under /api/registrations
 */
export default async function registrationRoutes(app: FastifyInstance) {
  const service = new RegistrationService(app);

  // Apply auth to all routes
  app.addHook('preHandler', extractUser);

  // ─── POST /api/registrations ──────────────────────────────
  app.post(
    '/',
    { preHandler: [requireAuth] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const parsed = createRegistrationSchema.safeParse(request.body);
      if (!parsed.success) {
        const fields: Record<string, string> = {};
        parsed.error.errors.forEach((e) => (fields[e.path.join('.')] = e.message));
        throw new ValidationError('Validation failed', fields);
      }

      const registration = await service.create(request.user!.userId, parsed.data);
      return reply.status(201).send(successResponse(registration));
    }
  );

  // ─── GET /api/registrations/me ────────────────────────────
  app.get(
    '/me',
    { preHandler: [requireAuth] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const registration = await service.getMyRegistration(request.user!.userId);
      return reply.send(successResponse(registration));
    }
  );

  // ─── GET /api/registrations (admin) ───────────────────────
  app.get(
    '/',
    { preHandler: [requireAuth, requireRole('ADMIN')] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const query = request.query as any;
      const pagination = paginationSchema.parse(query);
      const filters = {
        status: query.status,
        category: query.category,
        search: query.search,
      };

      const { registrations, total } = await service.list(
        pagination.page,
        pagination.perPage,
        filters
      );

      return reply.send(
        successResponse(
          registrations,
          paginationMeta(pagination.page, pagination.perPage, total)
        )
      );
    }
  );

  // ─── GET /api/registrations/:id ───────────────────────────
  app.get(
    '/:id',
    { preHandler: [requireAuth] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { id } = idParamSchema.parse(request.params);
      const isAdmin = request.user!.role === 'ADMIN';
      const registration = await service.getById(
        id,
        isAdmin ? undefined : request.user!.userId
      );
      return reply.send(successResponse(registration));
    }
  );

  // ─── PATCH /api/registrations/:id (admin) ─────────────────
  app.patch(
    '/:id',
    { preHandler: [requireAuth, requireRole('ADMIN')] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { id } = idParamSchema.parse(request.params);
      const parsed = updateRegistrationSchema.safeParse(request.body);
      if (!parsed.success) {
        throw new ValidationError('Validation failed');
      }
      const registration = await service.update(id, parsed.data);
      return reply.send(successResponse(registration));
    }
  );

  // ─── POST /api/registrations/:id/invitation-letter ────────
  app.post(
    '/:id/invitation-letter',
    { preHandler: [requireAuth] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { id } = idParamSchema.parse(request.params);
      const registration = await service.requestInvitationLetter(id, request.user!.userId);
      return reply.send(successResponse(registration));
    }
  );
}
