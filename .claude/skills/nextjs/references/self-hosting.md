# Self-Hosting Next.js

Deploy Next.js outside of Vercel with confidence.

## Quick Start: Standalone Output

For Docker or any containerized deployment, use standalone output:

```js
// next.config.js
module.exports = {
  output: 'standalone',
};
```

This creates a minimal `standalone` folder with only production dependencies:

```
.next/
├── standalone/
│   ├── server.js          # Entry point
│   ├── node_modules/      # Only production deps
│   └── .next/             # Build output
└── static/                # Must be copied separately
```

## Docker Deployment

### Dockerfile

```dockerfile
FROM node:20-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy standalone output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

## Pre-Deployment Checklist

1. **Build locally first**: `npm run build` - catch errors before deploy
2. **Test standalone output**: `node .next/standalone/server.js`
3. **Set `output: 'standalone'`** for Docker
4. **Configure cache handler** for multi-instance ISR
5. **Set `HOSTNAME="0.0.0.0"`** for containers
6. **Copy `public/` and `.next/static/`** - not included in standalone
7. **Add health check endpoint**
8. **Test ISR revalidation** after deployment
9. **Monitor memory usage** - Node.js defaults may need tuning

## Health Check Endpoint

Always include a health check for load balancers:

```tsx
// app/api/health/route.ts
export async function GET() {
  try {
    return Response.json({ status: 'healthy' }, { status: 200 });
  } catch (error) {
    return Response.json({ status: 'unhealthy' }, { status: 503 });
  }
}
```
