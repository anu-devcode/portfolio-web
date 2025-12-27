# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app

# Install dependencies needed for native modules
RUN apk add --no-cache libc6-compat

# Copy package files for better caching
COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: Development (Fastest for dev)
FROM node:20-alpine AS dev
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Stage 3: Builder (Production build)
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production
RUN npm run build

# Stage 4: Runner
FROM node:20-alpine AS runner
WORKDIR /app

# Install runtime dependencies
RUN apk add --no-cache dumb-init

# Set environment variables
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy production dependencies
COPY --from=deps --chown=nextjs:nodejs /app/node_modules ./node_modules

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["dumb-init", "node", "server.js"]

