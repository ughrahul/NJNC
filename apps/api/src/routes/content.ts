import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { extractUser, requireAuth } from "../middleware/auth";
import { requireRole } from "../middleware/require-role";
import { successResponse } from "../utils/response";
import { NotFoundError, ValidationError } from "../utils/errors";

/**
 * Content management routes — Spec §10.9
 */
export default async function contentRoutes(app: FastifyInstance) {
  // GET /api/content/:section — Public: get content block
  app.get("/:section", async (req: FastifyRequest, reply: FastifyReply) => {
    const { section } = req.params as { section: string };
    const content = await app.prisma.contentBlock.findUnique({
      where: { section },
    });
    if (!content) throw new NotFoundError("Content", section);
    return reply.send(successResponse(content));
  });

  // PUT /api/content/:section — Admin: update content block
  app.put(
    "/:section",
    { preHandler: [extractUser, requireAuth, requireRole("ADMIN")] },
    async (req: FastifyRequest, reply: FastifyReply) => {
      const { section } = req.params as { section: string };
      const { data } = req.body as { data: any };
      if (!data) throw new ValidationError("Content data is required");

      const content = await app.prisma.contentBlock.upsert({
        where: { section },
        update: { data, updatedBy: req.user!.userId },
        create: { section, data, updatedBy: req.user!.userId },
      });

      return reply.send(successResponse(content));
    },
  );

  // ─── News Posts ───────────────────────────────────────────

  // GET /api/content/news/list — Public: list published news
  app.get("/news/list", async (req: FastifyRequest, reply: FastifyReply) => {
    const query = req.query as any;
    const page = parseInt(query.page || "1");
    const perPage = parseInt(query.perPage || "10");

    const [posts, total] = await Promise.all([
      app.prisma.newsPost.findMany({
        where: { isPublished: true },
        orderBy: { publishedAt: "desc" },
        skip: (page - 1) * perPage,
        take: perPage,
      }),
      app.prisma.newsPost.count({ where: { isPublished: true } }),
    ]);

    return reply.send(
      successResponse(posts, {
        page,
        perPage,
        total,
        totalPages: Math.ceil(total / perPage),
      }),
    );
  });

  // GET /api/content/news/:slug — Public: single news post
  app.get("/news/:slug", async (req: FastifyRequest, reply: FastifyReply) => {
    const { slug } = req.params as { slug: string };
    const post = await app.prisma.newsPost.findUnique({ where: { slug } });
    if (!post || !post.isPublished) throw new NotFoundError("News post", slug);
    return reply.send(successResponse(post));
  });
}
