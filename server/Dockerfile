# 1) Base image: Bun runtime (includes bun binary + Node compat)
FROM oven/bun:latest

# define DATABASE_URL for both generate & migrate
ENV DATABASE_URL="file:../db_files/dev.db"

# 2) Set working dir inside container
WORKDIR /app

# 3) Copy dependency manifests to leverage layer caching
#    - bun.lockb: lockfile for exact versions
#    - package.json: declares hono, prisma, etc.
#    - bunfig.toml: Bun-specific config (entrypoint)
COPY bun.lock package.json bunfig.toml ./


# 4) Install all dependencies
RUN bun install

# 5) Copy your Prisma schema & migrations
COPY prisma ./prisma

# 6) Generate Prisma Client (TypeScript code that talks to SQLite)
RUN bun prisma generate

# 7) Copy your source code (the Hono app, routes, etc.)
COPY src ./src

# 8) Apply any pending migrations (creates/updates dev.db in prisma/)
RUN bun prisma migrate deploy

# 9) Expose port 3000 for HTTP traffic
EXPOSE 3000

# 10) Default command: launch your server
CMD ["bun", "run", "src/index.ts"]
