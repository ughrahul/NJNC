import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { createSessionSchema, updateSessionSchema } from '../schemas/program.schema';
import { idParamSchema } from '../schemas/common.schema';
import { extractUser, requireAuth } from '../middleware/auth';
import { requireRole } from '../middleware/require-role';
import { successResponse } from '../utils/response';
import { NotFoundError, ValidationError } from '../utils/errors';

export default async function programRoutes(app: FastifyInstance) {

  // GET /api/program — Public: published sessions grouped by day/hall
  app.get('/', async (_req: FastifyRequest, reply: FastifyReply) => {
    const sessions = await app.prisma.session.findMany({
      where: { isPublished: true },
      include: {
        speaker: { select: { id: true, name: true, title: true, photoUrl: true } },
      },
      orderBy: [{ day: 'asc' }, { startTime: 'asc' }],
    });

    // Group by day
    const grouped = sessions.reduce((acc, session) => {
      const key = `day${session.day}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(session);
      return acc;
    }, {} as Record<string, typeof sessions>);

    return reply.send(successResponse(grouped));
  });

  // GET /api/program/:id — Session detail
  app.get('/:id', async (req: FastifyRequest, reply: FastifyReply) => {
    const { id } = idParamSchema.parse(req.params);
    const session = await app.prisma.session.findUnique({
      where: { id },
      include: {
        speaker: true,
        abstracts: { where: { status: 'SCHEDULED' }, select: { id: true, title: true, presentationType: true } },
      },
    });
    if (!session) throw new NotFoundError('Session', id);
    return reply.send(successResponse(session));
  });

  // ─── Admin routes ─────────────────────────────────────────

  // GET /api/program/admin/all — All sessions (admin)
  app.get('/admin/all', { preHandler: [extractUser, requireAuth, requireRole('ADMIN')] }, async (_req: FastifyRequest, reply: FastifyReply) => {
    const sessions = await app.prisma.session.findMany({
      include: { speaker: { select: { id: true, name: true } } },
      orderBy: [{ day: 'asc' }, { startTime: 'asc' }],
    });
    return reply.send(successResponse(sessions));
  });

  // POST /api/program (admin)
  app.post('/', { preHandler: [extractUser, requireAuth, requireRole('ADMIN')] }, async (req: FastifyRequest, reply: FastifyReply) => {
    const parsed = createSessionSchema.safeParse(req.body);
    if (!parsed.success) throw new ValidationError('Validation failed');
    const session = await app.prisma.session.create({
      data: {
        ...parsed.data,
        startTime: new Date(parsed.data.startTime),
        endTime: new Date(parsed.data.endTime),
      },
    });
    return reply.status(201).send(successResponse(session));
  });

  // PUT /api/program/:id (admin)
  app.put('/:id', { preHandler: [extractUser, requireAuth, requireRole('ADMIN')] }, async (req: FastifyRequest, reply: FastifyReply) => {
    const { id } = idParamSchema.parse(req.params);
    const parsed = updateSessionSchema.safeParse(req.body);
    if (!parsed.success) throw new ValidationError('Validation failed');
    const data: any = { ...parsed.data };
    if (data.startTime) data.startTime = new Date(data.startTime);
    if (data.endTime) data.endTime = new Date(data.endTime);
    const session = await app.prisma.session.update({ where: { id }, data });
    return reply.send(successResponse(session));
  });

  // PATCH /api/program/:id/publish (admin)
  app.patch('/:id/publish', { preHandler: [extractUser, requireAuth, requireRole('ADMIN')] }, async (req: FastifyRequest, reply: FastifyReply) => {
    const { id } = idParamSchema.parse(req.params);
    const session = await app.prisma.session.update({ where: { id }, data: { isPublished: true } });
    return reply.send(successResponse(session));
  });

  // DELETE /api/program/:id (admin)
  app.delete('/:id', { preHandler: [extractUser, requireAuth, requireRole('ADMIN')] }, async (req: FastifyRequest, reply: FastifyReply) => {
    const { id } = idParamSchema.parse(req.params);
    await app.prisma.session.delete({ where: { id } });
    return reply.send(successResponse({ message: 'Session deleted' }));
  });
}
