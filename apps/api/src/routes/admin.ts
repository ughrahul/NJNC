import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { extractUser, requireAuth } from '../middleware/auth';
import { requireRole } from '../middleware/require-role';
import { successResponse } from '../utils/response';

/**
 * Admin routes — Spec §10.8
 * Dashboard stats, CSV export, and audit logs.
 */
export default async function adminRoutes(app: FastifyInstance) {
  app.addHook('preHandler', extractUser);
  app.addHook('preHandler', requireAuth);
  app.addHook('preHandler', requireRole('ADMIN'));

  // GET /api/admin/stats — Dashboard KPIs
  app.get('/stats', async (_req: FastifyRequest, reply: FastifyReply) => {
    const [
      totalRegistrations,
      pendingPayments,
      verifiedPayments,
      totalAbstracts,
      submittedAbstracts,
      reviewedAbstracts,
      totalSpeakers,
      totalInquiries,
    ] = await Promise.all([
      app.prisma.registration.count({ where: { deletedAt: null } }),
      app.prisma.payment.count({ where: { status: 'PENDING' } }),
      app.prisma.payment.count({ where: { status: 'VERIFIED' } }),
      app.prisma.abstract.count({ where: { deletedAt: null } }),
      app.prisma.abstract.count({ where: { status: 'SUBMITTED', deletedAt: null } }),
      app.prisma.abstract.count({ where: { status: { in: ['ACCEPTED', 'REJECTED'] }, deletedAt: null } }),
      app.prisma.speaker.count(),
      app.prisma.contactInquiry.count({ where: { isResolved: false } }),
    ]);

    // Category breakdown
    const categoryBreakdown = await app.prisma.registration.groupBy({
      by: ['category'],
      where: { deletedAt: null },
      _count: true,
    });

    // Payment status breakdown
    const paymentBreakdown = await app.prisma.payment.groupBy({
      by: ['status'],
      _count: true,
    });

    return reply.send(successResponse({
      registrations: {
        total: totalRegistrations,
        byCategory: categoryBreakdown.map((c) => ({ category: c.category, count: c._count })),
      },
      payments: {
        pending: pendingPayments,
        verified: verifiedPayments,
        byStatus: paymentBreakdown.map((p) => ({ status: p.status, count: p._count })),
      },
      abstracts: {
        total: totalAbstracts,
        submitted: submittedAbstracts,
        reviewed: reviewedAbstracts,
      },
      speakers: totalSpeakers,
      unresolvedInquiries: totalInquiries,
    }));
  });

  // GET /api/admin/export/registrations — CSV export
  app.get('/export/registrations', async (_req: FastifyRequest, reply: FastifyReply) => {
    const registrations = await app.prisma.registration.findMany({
      where: { deletedAt: null },
      include: {
        user: { select: { email: true, name: true, phone: true, country: true, institution: true, specialty: true } },
        payments: { select: { status: true, method: true, amount: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Build CSV
    const headers = 'Registration Code,Name,Email,Country,Institution,Specialty,Category,Payment Status,Created At\n';
    const rows = registrations.map((r) =>
      `${r.registrationCode},"${r.user.name}",${r.user.email},${r.user.country || ''},${r.user.institution || ''},${r.user.specialty || ''},${r.category},${r.paymentStatus},${r.createdAt.toISOString()}`
    ).join('\n');

    reply.header('Content-Type', 'text/csv');
    reply.header('Content-Disposition', 'attachment; filename=registrations.csv');
    return reply.send(headers + rows);
  });

  // GET /api/admin/export/abstracts — CSV export
  app.get('/export/abstracts', async (_req: FastifyRequest, reply: FastifyReply) => {
    const abstracts = await app.prisma.abstract.findMany({
      where: { deletedAt: null },
      include: {
        submitter: { select: { name: true, email: true, institution: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    const headers = 'Title,Author,Email,Institution,Topic,Type,Status,Score,Created At\n';
    const rows = abstracts.map((a) =>
      `"${a.title}","${a.submitter.name}",${a.submitter.email},${a.submitter.institution || ''},${a.topic},${a.presentationType},${a.status},${a.finalScore || ''},${a.createdAt.toISOString()}`
    ).join('\n');

    reply.header('Content-Type', 'text/csv');
    reply.header('Content-Disposition', 'attachment; filename=abstracts.csv');
    return reply.send(headers + rows);
  });

  // GET /api/admin/audit-logs — Audit trail
  app.get('/audit-logs', async (req: FastifyRequest, reply: FastifyReply) => {
    const query = req.query as any;
    const page = parseInt(query.page || '1');
    const perPage = parseInt(query.perPage || '50');

    const [logs, total] = await Promise.all([
      app.prisma.auditLog.findMany({
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * perPage,
        take: perPage,
      }),
      app.prisma.auditLog.count(),
    ]);

    return reply.send(successResponse(logs, { page, perPage, total, totalPages: Math.ceil(total / perPage) }));
  });
}
