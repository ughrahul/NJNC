import type { FastifyInstance } from "fastify";
import type {
  CreateRegistrationInput,
  UpdateRegistrationInput,
} from "../schemas/registration.schema";
import { generateRegistrationCode } from "@njnc/utils";
import { NotFoundError, ConflictError, ForbiddenError } from "../utils/errors";

export class RegistrationService {
  constructor(private app: FastifyInstance) {}

  /**
   * Create a new registration.
   * Spec §10.4: POST /api/registrations
   */
  async create(userId: string, input: CreateRegistrationInput) {
    // Check if user already has an active registration
    const existing = await this.app.prisma.registration.findFirst({
      where: {
        userId,
        deletedAt: null,
        paymentStatus: { notIn: ["CANCELLED"] },
      },
    });
    if (existing) {
      throw new ConflictError("You already have an active registration");
    }

    // Get next registration number
    const count = await this.app.prisma.registration.count();
    const registrationCode = generateRegistrationCode(count + 1);

    // Update user profile with registration details
    await this.app.prisma.user.update({
      where: { id: userId },
      data: {
        phone: input.phone,
        country: input.country,
        institution: input.institution,
        specialty: input.specialty,
        designation: input.designation,
      },
    });

    const registration = await this.app.prisma.registration.create({
      data: {
        userId,
        registrationCode,
        category: input.category,
        workshopSelected: input.workshopSelected,
        amount: 0, // No pricing per user clarification
        currency: input.category === "NATIONAL" ? "NPR" : "USD",
        notes: input.notes,
      },
      include: {
        user: {
          select: { id: true, email: true, name: true },
        },
      },
    });

    return registration;
  }

  /**
   * Get a single registration by ID.
   */
  async getById(id: string, userId?: string) {
    const registration = await this.app.prisma.registration.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            phone: true,
            country: true,
            institution: true,
          },
        },
        payments: true,
      },
    });

    if (!registration || registration.deletedAt) {
      throw new NotFoundError("Registration", id);
    }

    // Non-admin users can only see their own registration
    if (userId && registration.userId !== userId) {
      throw new ForbiddenError();
    }

    return registration;
  }

  /**
   * Get current user's registration.
   */
  async getMyRegistration(userId: string) {
    const registration = await this.app.prisma.registration.findFirst({
      where: { userId, deletedAt: null },
      include: { payments: true },
      orderBy: { createdAt: "desc" },
    });
    return registration;
  }

  /**
   * List all registrations (admin).
   */
  async list(
    page: number,
    perPage: number,
    filters?: {
      status?: string;
      category?: string;
      search?: string;
    },
  ) {
    const where: any = { deletedAt: null };

    if (filters?.status) {
      where.paymentStatus = filters.status;
    }
    if (filters?.category) {
      where.category = filters.category;
    }
    if (filters?.search) {
      where.OR = [
        { registrationCode: { contains: filters.search, mode: "insensitive" } },
        { user: { name: { contains: filters.search, mode: "insensitive" } } },
        { user: { email: { contains: filters.search, mode: "insensitive" } } },
      ];
    }

    const [registrations, total] = await Promise.all([
      this.app.prisma.registration.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              name: true,
              country: true,
              institution: true,
            },
          },
          payments: {
            select: { id: true, status: true, method: true, createdAt: true },
          },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * perPage,
        take: perPage,
      }),
      this.app.prisma.registration.count({ where }),
    ]);

    return { registrations, total };
  }

  /**
   * Update a registration (admin).
   */
  async update(id: string, input: UpdateRegistrationInput) {
    const registration = await this.app.prisma.registration.findUnique({
      where: { id },
    });

    if (!registration || registration.deletedAt) {
      throw new NotFoundError("Registration", id);
    }

    return this.app.prisma.registration.update({
      where: { id },
      data: input,
      include: {
        user: { select: { id: true, email: true, name: true } },
      },
    });
  }

  /**
   * Soft-delete a registration (admin).
   */
  async delete(id: string) {
    const registration = await this.app.prisma.registration.findUnique({
      where: { id },
    });

    if (!registration || registration.deletedAt) {
      throw new NotFoundError("Registration", id);
    }

    return this.app.prisma.registration.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  /**
   * Request invitation letter.
   */
  async requestInvitationLetter(registrationId: string, userId: string) {
    const registration = await this.app.prisma.registration.findUnique({
      where: { id: registrationId },
    });

    if (!registration || registration.deletedAt) {
      throw new NotFoundError("Registration", registrationId);
    }

    if (registration.userId !== userId) {
      throw new ForbiddenError();
    }

    return this.app.prisma.registration.update({
      where: { id: registrationId },
      data: { invitationLetterRequested: true },
    });
  }
}
