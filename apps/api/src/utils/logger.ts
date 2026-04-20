import type { FastifyBaseLogger } from "fastify";

const isProduction = process.env.NODE_ENV === "production";

export const logger: FastifyBaseLogger | boolean | object = isProduction
  ? {
      level: "info",
      serializers: {
        req(request: {
          method: string;
          url: string;
          headers: Record<string, string>;
        }) {
          return {
            method: request.method,
            url: request.url,
            host: request.headers?.host,
          };
        },
        res(reply: { statusCode: number }) {
          return {
            statusCode: reply.statusCode,
          };
        },
      },
      // Never log sensitive data
      redact: ["req.headers.authorization", "req.headers.cookie"],
    }
  : {
      level: "debug",
    };
