import Redis from "ioredis";
import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

declare module "fastify" {
  interface FastifyInstance {
    redis: Redis;
  }
}

async function redisPlugin(fastify: FastifyInstance) {
  const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379", {
    maxRetriesPerRequest: 3,
    retryStrategy(times: number) {
      const delay = Math.min(times * 200, 3000);
      return delay;
    },
  });

  redis.on("connect", () => {
    fastify.log.info("✅ Redis connected");
  });

  redis.on("error", (err: Error) => {
    fastify.log.error({ err }, "Redis connection error");
  });

  fastify.decorate("redis", redis);

  fastify.addHook("onClose", async () => {
    await redis.quit();
    fastify.log.info("Redis disconnected");
  });
}

export default fp(redisPlugin, { name: "redis" });
