import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { createSpeakerSchema, updateSpeakerSchema } from '../schemas/speaker.schema';
import { paginationSchema, idParamSchema } from '../schemas/common.schema';
import { extractUser, requireAuth } from '../middleware/auth';
import { requireRole } from '../middleware/require-role';
import { successResponse, paginationMeta } from '../utils/response';
import { ValidationError, NotFoundError } from '../utils/errors';
import { generateUpdateToken } from '../utils/crypto';

export default async function speakerRoutes(app: FastifyInstance) {

  // GET /api/speakers — Public list (published only)
  app.get('/', async (req: FastifyRequest, reply: FastifyReply) => {
    const query = req.query as any;
    const pagination = paginationSchema.parse(query);
    const where = { isPublished: true };

    const [speakers, total] = await Promise.all([
      app.prisma.speaker.findMany({
        where,
        select: { id: true, name: true, title: true, institution: true, country: true, bio: true, photoUrl: true, linkedInUrl: true },
        orderBy: { name: 'asc' },
        skip: (pagination.page - 1) * pagination.perPage,
        take: pagination.perPage,
      }),
      app.prisma.speaker.count({ where }),
    ]);

    return reply.send(successResponse(speakers, paginationMeta(pagination.page, pagination.perPage, total)));
  });

  // GET /api/speakers/:id — Public detail
  app.get('/:id', async (req: FastifyRequest, reply: FastifyReply) => {
    const { id } = idParamSchema.parse(req.params);
    const speaker = await app.prisma.speaker.findUnique({
      where: { id },
      include: { sessions: { where: { isPublished: true } } },
    });
    if (!speaker || !speaker.isPublished) throw new NotFoundError('Speaker', id);
    return reply.send(successResponse(speaker));
  });

  // ─── Admin routes ─────────────────────────────────────────

  // POST /api/speakers (admin)
  app.post('/', { preHandler: [extractUser, requireAuth, requireRole('ADMIN')] }, async (req: FastifyRequest, reply: FastifyReply) => {
    const parsed = createSpeakerSchema.safeParse(req.body);
    if (!parsed.success) throw new ValidationError('Validation failed');
    const updateToken = generateUpdateToken();
    const speaker = await app.prisma.speaker.create({ data: { ...parsed.data, updateToken } });
    return reply.status(201).send(successResponse(speaker));
  });

  // PUT /api/speakers/:id (admin)
  app.put('/:id', { preHandler: [extractUser, requireAuth, requireRole('ADMIN')] }, async (req: FastifyRequest, reply: FastifyReply) => {
    const { id } = idParamSchema.parse(req.params);
    const parsed = updateSpeakerSchema.safeParse(req.body);
    if (!parsed.success) throw new ValidationError('Validation failed');
    const speaker = await app.prisma.speaker.update({ where: { id }, data: parsed.data });
    return reply.send(successResponse(speaker));
  });

  // DELETE /api/speakers/:id (admin)
  app.delete('/:id', { preHandler: [extractUser, requireAuth, requireRole('ADMIN')] }, async (req: FastifyRequest, reply: FastifyReply) => {
    const { id } = idParamSchema.parse(req.params);
    await app.prisma.speaker.delete({ where: { id } });
    return reply.send(successResponse({ message: 'Speaker deleted' }));
  });

  // PATCH /api/speakers/:id/publish (admin)
  app.patch('/:id/publish', { preHandler: [extractUser, requireAuth, requireRole('ADMIN')] }, async (req: FastifyRequest, reply: FastifyReply) => {
    const { id } = idParamSchema.parse(req.params);
    const speaker = await app.prisma.speaker.update({ where: { id }, data: { isPublished: true } });
    return reply.send(successResponse(speaker));
  });

  // PUT /api/speakers/self-update/:token — Speaker self-update via token
  app.put('/self-update/:token', async (req: FastifyRequest, reply: FastifyReply) => {
    const { token } = req.params as { token: string };
    const speaker = await app.prisma.speaker.findUnique({ where: { updateToken: token } });
    if (!speaker) throw new NotFoundError('Speaker');
    const parsed = updateSpeakerSchema.safeParse(req.body);
    if (!parsed.success) throw new ValidationError('Validation failed');
    const updated = await app.prisma.speaker.update({ where: { id: speaker.id }, data: parsed.data });
    return reply.send(successResponse(updated));
  });

  // GET /api/speakers/admin/all (admin — includes unpublished)
  app.get('/admin/all', { preHandler: [extractUser, requireAuth, requireRole('ADMIN')] }, async (req: FastifyRequest, reply: FastifyReply) => {
    const query = req.query as any;
    const pagination = paginationSchema.parse(query);
    const [speakers, total] = await Promise.all([
      app.prisma.speaker.findMany({
        orderBy: { createdAt: 'desc' },
        skip: (pagination.page - 1) * pagination.perPage,
        take: pagination.perPage,
      }),
      app.prisma.speaker.count(),
    ]);
    return reply.send(successResponse(speakers, paginationMeta(pagination.page, pagination.perPage, total)));
  });
}
