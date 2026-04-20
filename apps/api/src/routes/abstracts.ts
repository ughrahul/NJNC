import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { AbstractService } from '../services/abstract.service';
import { createAbstractSchema, assignReviewersSchema, submitReviewSchema, abstractDecisionSchema } from '../schemas/abstract.schema';
import { paginationSchema, idParamSchema } from '../schemas/common.schema';
import { extractUser, requireAuth } from '../middleware/auth';
import { requireRole } from '../middleware/require-role';
import { successResponse, paginationMeta } from '../utils/response';
import { ValidationError } from '../utils/errors';

export default async function abstractRoutes(app: FastifyInstance) {
  const service = new AbstractService(app);
  app.addHook('preHandler', extractUser);

  // POST /api/abstracts — Create draft
  app.post('/', { preHandler: [requireAuth] }, async (req: FastifyRequest, reply: FastifyReply) => {
    const parsed = createAbstractSchema.safeParse(req.body);
    if (!parsed.success) {
      const fields: Record<string, string> = {};
      parsed.error.errors.forEach((e) => (fields[e.path.join('.')] = e.message));
      throw new ValidationError('Validation failed', fields);
    }
    const abstract = await service.create(req.user!.userId, parsed.data);
    return reply.status(201).send(successResponse(abstract));
  });

  // PUT /api/abstracts/:id — Update draft (auto-save)
  app.put('/:id', { preHandler: [requireAuth] }, async (req: FastifyRequest, reply: FastifyReply) => {
    const { id } = idParamSchema.parse(req.params);
    const parsed = createAbstractSchema.partial().safeParse(req.body);
    if (!parsed.success) throw new ValidationError('Validation failed');
    const abstract = await service.update(id, req.user!.userId, parsed.data);
    return reply.send(successResponse(abstract));
  });

  // POST /api/abstracts/:id/submit
  app.post('/:id/submit', { preHandler: [requireAuth] }, async (req: FastifyRequest, reply: FastifyReply) => {
    const { id } = idParamSchema.parse(req.params);
    const abstract = await service.submit(id, req.user!.userId);
    return reply.send(successResponse(abstract));
  });

  // GET /api/abstracts/me — User's abstracts
  app.get('/me', { preHandler: [requireAuth] }, async (req: FastifyRequest, reply: FastifyReply) => {
    const abstracts = await service.getMyAbstracts(req.user!.userId);
    return reply.send(successResponse(abstracts));
  });

  // GET /api/abstracts — Admin list
  app.get('/', { preHandler: [requireAuth, requireRole('ADMIN')] }, async (req: FastifyRequest, reply: FastifyReply) => {
    const query = req.query as any;
    const pagination = paginationSchema.parse(query);
    const { abstracts, total } = await service.list(pagination.page, pagination.perPage, {
      status: query.status, topic: query.topic, search: query.search,
    });
    return reply.send(successResponse(abstracts, paginationMeta(pagination.page, pagination.perPage, total)));
  });

  // GET /api/abstracts/:id
  app.get('/:id', { preHandler: [requireAuth] }, async (req: FastifyRequest, reply: FastifyReply) => {
    const { id } = idParamSchema.parse(req.params);
    const abstract = await service.getById(id, req.user!.userId, req.user!.role);
    return reply.send(successResponse(abstract));
  });

  // PATCH /api/abstracts/:id/assign — Assign reviewers (admin)
  app.patch('/:id/assign', { preHandler: [requireAuth, requireRole('ADMIN')] }, async (req: FastifyRequest, reply: FastifyReply) => {
    const { id } = idParamSchema.parse(req.params);
    const parsed = assignReviewersSchema.safeParse(req.body);
    if (!parsed.success) throw new ValidationError('Provide 2-3 reviewer IDs');
    const result = await service.assignReviewers(id, parsed.data.reviewerIds);
    return reply.send(successResponse(result));
  });

  // POST /api/abstracts/:id/review — Submit review (reviewer)
  app.post('/:id/review', { preHandler: [requireAuth, requireRole('REVIEWER', 'ADMIN')] }, async (req: FastifyRequest, reply: FastifyReply) => {
    const { id } = idParamSchema.parse(req.params);
    const parsed = submitReviewSchema.safeParse(req.body);
    if (!parsed.success) throw new ValidationError('Validation failed');
    const review = await service.submitReview(id, req.user!.userId, parsed.data);
    return reply.send(successResponse(review));
  });

  // PATCH /api/abstracts/:id/decision — Accept/reject (admin)
  app.patch('/:id/decision', { preHandler: [requireAuth, requireRole('ADMIN')] }, async (req: FastifyRequest, reply: FastifyReply) => {
    const { id } = idParamSchema.parse(req.params);
    const parsed = abstractDecisionSchema.safeParse(req.body);
    if (!parsed.success) throw new ValidationError('Validation failed');
    const abstract = await service.makeDecision(id, parsed.data.status, parsed.data.reviewerComments);
    return reply.send(successResponse(abstract));
  });

  // DELETE /api/abstracts/:id/withdraw
  app.delete('/:id/withdraw', { preHandler: [requireAuth] }, async (req: FastifyRequest, reply: FastifyReply) => {
    const { id } = idParamSchema.parse(req.params);
    const abstract = await service.withdraw(id, req.user!.userId);
    return reply.send(successResponse(abstract));
  });
}
