import 'dotenv/config';
import Fastify from 'fastify';
import cookie from '@fastify/cookie';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import { logger } from './utils/logger';

// Plugins
import prismaPlugin from './plugins/prisma';
import redisPlugin from './plugins/redis';
import jwtPlugin from './plugins/jwt';

// Routes
import authRoutes from './routes/auth';
import registrationRoutes from './routes/registrations';
import abstractRoutes from './routes/abstracts';
import speakerRoutes from './routes/speakers';
import programRoutes from './routes/program';
import paymentRoutes from './routes/payments';
import adminRoutes from './routes/admin';
import contentRoutes from './routes/content';
import contactRoutes from './routes/contact';
import userRoutes from './routes/users';

const PORT = parseInt(process.env.PORT || '4000', 10);
const HOST = process.env.HOST || '0.0.0.0';

async function buildApp() {
  const app = Fastify({ logger });

  // ─── Core Plugins ─────────────────────────────────────────
  await app.register(cookie);

  await app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
      },
    },
  });

  await app.register(cors, {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });

  await app.register(rateLimit, {
    global: true,
    max: 100,
    timeWindow: '1 minute',
  });

  // ─── Data Plugins ─────────────────────────────────────────
  await app.register(prismaPlugin);
  await app.register(redisPlugin);
  await app.register(jwtPlugin);

  // ─── Health Check ─────────────────────────────────────────
  app.get('/api/health', async () => ({
    success: true,
    data: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    },
  }));

  // ─── Routes (52 endpoints) ────────────────────────────────
  await app.register(authRoutes, { prefix: '/api/auth' });
  await app.register(registrationRoutes, { prefix: '/api/registrations' });
  await app.register(abstractRoutes, { prefix: '/api/abstracts' });
  await app.register(speakerRoutes, { prefix: '/api/speakers' });
  await app.register(programRoutes, { prefix: '/api/program' });
  await app.register(paymentRoutes, { prefix: '/api/payments' });
  await app.register(adminRoutes, { prefix: '/api/admin' });
  await app.register(contentRoutes, { prefix: '/api/content' });
  await app.register(contactRoutes, { prefix: '/api/contact' });
  await app.register(userRoutes, { prefix: '/api/users' });

  // ─── Global Error Handler ────────────────────────────────
  app.setErrorHandler((error, _request, reply) => {
    app.log.error(error);
    const statusCode = error.statusCode || 500;
    const message = statusCode === 500 ? 'Internal Server Error' : error.message || 'An error occurred';

    reply.status(statusCode).send({
      success: false,
      error: {
        code: (error as any).code || 'INTERNAL_ERROR',
        message,
        ...((error as any).fields && { fields: (error as any).fields }),
      },
    });
  });

  // ─── 404 Handler ──────────────────────────────────────────
  app.setNotFoundHandler((_request, reply) => {
    reply.status(404).send({
      success: false,
      error: { code: 'NOT_FOUND', message: 'The requested resource was not found' },
    });
  });

  return app;
}

async function start() {
  try {
    const app = await buildApp();
    await app.listen({ port: PORT, host: HOST });
    console.log(`🚀 NJNC 2028 API running on http://${HOST}:${PORT}`);
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();
export { buildApp };
