import type { FastifyInstance } from 'fastify';
import type { CreateAbstractInput, SubmitReviewInput } from '../schemas/abstract.schema';
import { NotFoundError, ForbiddenError, ValidationError } from '../utils/errors';
import { countWords } from '@njnc/utils';

export class AbstractService {
  constructor(private app: FastifyInstance) {}

  async create(submitterId: string, input: CreateAbstractInput) {
    const wordCount = countWords(input.body);

    return this.app.prisma.abstract.create({
      data: {
        submitterId,
        title: input.title,
        body: input.body,
        wordCount,
        topic: input.topic,
        presentationType: input.presentationType,
        coAuthors: input.coAuthors,
        fileUrl: input.fileUrl,
        status: 'DRAFT',
      },
    });
  }

  async update(id: string, submitterId: string, input: Partial<CreateAbstractInput>) {
    const abstract = await this.app.prisma.abstract.findUnique({ where: { id } });
    if (!abstract || abstract.deletedAt) throw new NotFoundError('Abstract', id);
    if (abstract.submitterId !== submitterId) throw new ForbiddenError();
    if (!['DRAFT', 'REVISION_REQUIRED'].includes(abstract.status)) {
      throw new ValidationError('Abstract can only be edited in DRAFT or REVISION_REQUIRED status');
    }

    const wordCount = input.body ? countWords(input.body) : abstract.wordCount;

    return this.app.prisma.abstract.update({
      where: { id },
      data: {
        ...input,
        wordCount,
        coAuthors: input.coAuthors ?? undefined,
      },
    });
  }

  async submit(id: string, submitterId: string) {
    const abstract = await this.app.prisma.abstract.findUnique({ where: { id } });
    if (!abstract || abstract.deletedAt) throw new NotFoundError('Abstract', id);
    if (abstract.submitterId !== submitterId) throw new ForbiddenError();
    if (!['DRAFT', 'REVISION_REQUIRED'].includes(abstract.status)) {
      throw new ValidationError('Abstract can only be submitted from DRAFT or REVISION_REQUIRED status');
    }

    return this.app.prisma.abstract.update({
      where: { id },
      data: { status: 'SUBMITTED' },
    });
  }

  async getById(id: string, userId?: string, role?: string) {
    const abstract = await this.app.prisma.abstract.findUnique({
      where: { id },
      include: {
        submitter: { select: { id: true, email: true, name: true, institution: true } },
        reviews: role === 'ADMIN' ? {
          include: { reviewer: { select: { id: true, name: true } } },
        } : false,
        session: true,
      },
    });

    if (!abstract || abstract.deletedAt) throw new NotFoundError('Abstract', id);

    // Reviewers should not see author info (double-blind)
    if (role === 'REVIEWER') {
      return { ...abstract, submitter: undefined };
    }

    // Non-admin, non-reviewer can only see their own
    if (userId && role !== 'ADMIN' && role !== 'REVIEWER' && abstract.submitterId !== userId) {
      throw new ForbiddenError();
    }

    return abstract;
  }

  async getMyAbstracts(submitterId: string) {
    return this.app.prisma.abstract.findMany({
      where: { submitterId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  async list(page: number, perPage: number, filters?: {
    status?: string;
    topic?: string;
    search?: string;
  }) {
    const where: any = { deletedAt: null };
    if (filters?.status) where.status = filters.status;
    if (filters?.topic) where.topic = filters.topic;
    if (filters?.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { submitter: { name: { contains: filters.search, mode: 'insensitive' } } },
      ];
    }

    const [abstracts, total] = await Promise.all([
      this.app.prisma.abstract.findMany({
        where,
        include: {
          submitter: { select: { id: true, name: true, institution: true } },
          reviews: { select: { id: true, overallScore: true, recommendation: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * perPage,
        take: perPage,
      }),
      this.app.prisma.abstract.count({ where }),
    ]);

    return { abstracts, total };
  }

  async assignReviewers(abstractId: string, reviewerIds: string[]) {
    const abstract = await this.app.prisma.abstract.findUnique({ where: { id: abstractId } });
    if (!abstract || abstract.deletedAt) throw new NotFoundError('Abstract', abstractId);

    await this.app.prisma.abstract.update({
      where: { id: abstractId },
      data: { status: 'UNDER_REVIEW' },
    });

    // Note: Reviews are created when reviewers submit — for now we track assignment via a notification
    return { abstractId, reviewerIds, status: 'UNDER_REVIEW' };
  }

  async submitReview(abstractId: string, reviewerId: string, input: SubmitReviewInput) {
    const abstract = await this.app.prisma.abstract.findUnique({ where: { id: abstractId } });
    if (!abstract || abstract.deletedAt) throw new NotFoundError('Abstract', abstractId);

    const overallScore =
      (input.originality + input.scientificMerit + input.clinicalRelevance + input.presentationQuality) / 4;

    const review = await this.app.prisma.review.upsert({
      where: {
        abstractId_reviewerId: { abstractId, reviewerId },
      },
      update: {
        ...input,
        overallScore,
      },
      create: {
        abstractId,
        reviewerId,
        ...input,
        overallScore,
      },
    });

    // Auto-calculate final score of the abstract
    const allReviews = await this.app.prisma.review.findMany({
      where: { abstractId },
    });
    const avgScore = allReviews.reduce((sum, r) => sum + r.overallScore, 0) / allReviews.length;

    await this.app.prisma.abstract.update({
      where: { id: abstractId },
      data: { finalScore: avgScore },
    });

    return review;
  }

  async makeDecision(abstractId: string, status: string, reviewerComments?: string) {
    const abstract = await this.app.prisma.abstract.findUnique({ where: { id: abstractId } });
    if (!abstract || abstract.deletedAt) throw new NotFoundError('Abstract', abstractId);

    return this.app.prisma.abstract.update({
      where: { id: abstractId },
      data: {
        status: status as any,
        reviewerComments,
      },
    });
  }

  async withdraw(id: string, submitterId: string) {
    const abstract = await this.app.prisma.abstract.findUnique({ where: { id } });
    if (!abstract || abstract.deletedAt) throw new NotFoundError('Abstract', id);
    if (abstract.submitterId !== submitterId) throw new ForbiddenError();

    return this.app.prisma.abstract.update({
      where: { id },
      data: { status: 'WITHDRAWN' },
    });
  }
}
