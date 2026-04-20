# Stage 1: Install dependencies
FROM node:20-alpine AS deps
RUN corepack enable
WORKDIR /app

# Copy root workspace items
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
# Copy package definitions
COPY apps/web/package.json ./apps/web/
COPY packages/ ./packages/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Stage 2: Build
FROM node:20-alpine AS builder
WORKDIR /app
RUN corepack enable
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages ./packages
COPY package.json pnpm-workspace.yaml turbo.json ./

# Copy web files
COPY apps/web ./apps/web

ENV NEXT_TELEMETRY_DISABLED=1

# Build Next.js
RUN pnpm --filter web build

# Stage 3: Production runtime
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Ensure permissions
RUN chown nextjs:nodejs /app

# Copy public folder for static assets
COPY --from=builder /app/apps/web/public ./apps/web/public

# Copy Next.js standalone server
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./

# Copy static assets (standalone does not include static assets)
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static

USER nextjs
EXPOSE 3000

# The standalone server runs the app, mirroring directory structure
CMD ["node", "apps/web/server.js"]

