FROM node:18-alpine AS base
RUN apk add --no-cache tzdata
ENV TZ=Asia/Jakarta

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV TZ=Asia/Jakarta

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY . .
RUN chown nextjs:nodejs .next

USER nextjs

EXPOSE 3002