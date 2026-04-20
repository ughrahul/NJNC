# Stage 1: Install dependencies
FROM node:20-alpine AS deps
RUN corepack enable
WORKDIR /app

# Copy root workspace items
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
# Copy package definitions
COPY apps/api/package.json ./apps/api/
COPY packages/ ./packages/

# Install dependencies (ignoring dev dependencies scripts)
RUN pnpm install --frozen-lockfile

# Stage 2: Production runtime
FROM node:20-alpine AS runner
WORKDIR /app
RUN corepack enable
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 apiuser

# Copy all node_modules (including hoisted)
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages ./packages
COPY package.json pnpm-workspace.yaml ./

# Copy API files
COPY apps/api ./apps/api

WORKDIR /app/apps/api
# Generate prisma client inside the workspace
RUN npx prisma generate

USER apiuser
EXPOSE 4000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
  CMD wget -qO- http://localhost:4000/api/health || exit 1

# Execute directly with tsx to perfectly resolve workspace dependencies without ESM extension errors
CMD ["npx", "tsx", "src/server.ts"]

