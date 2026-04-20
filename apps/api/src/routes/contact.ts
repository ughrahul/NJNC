import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { contactFormSchema } from '../schemas/contact.schema';
import { successResponse } from '../utils/response';
import { ValidationError } from '../utils/errors';

export default async function contactRoutes(app: FastifyInstance) {
  // POST /api/contact — Submit contact inquiry
  app.post('/', {
    config: { rateLimit: { max: 3, timeWindow: '1 minute' } },
    handler: async (req: FastifyRequest, reply: FastifyReply) => {
      const parsed = contactFormSchema.safeParse(req.body);
      if (!parsed.success) {
        const fields: Record<string, string> = {};
        parsed.error.errors.forEach((e) => (fields[e.path.join('.')] = e.message));
        throw new ValidationError('Validation failed', fields);
      }

      const inquiry = await app.prisma.contactInquiry.create({
        data: parsed.data,
      });

      // TODO: Queue email notification to admin

      return reply.status(201).send(successResponse({
        message: 'Your inquiry has been submitted. We will respond within 48 hours.',
        id: inquiry.id,
      }));
    },
  });
}
