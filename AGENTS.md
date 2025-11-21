# Repository Guidelines

## Project Structure & Module Organization
- Root split: `client/` (React + Vite + Tailwind) and `server/` (Bun + Hono + Prisma + SQLite).
- Client entry is `client/src/main.jsx` with UI in `client/src/App.jsx`; shared UI lives in `client/src/components/`, state/providers in `client/src/providers/`, and runtime config helper in `client/src/config.js`. Static assets go under `client/public/`.
- Server entry is `server/src/index.ts`; routes live in `server/src/routes/` (expenses CRUD) and database access is centralized in `server/src/db.ts` using the generated Prisma client from `server/generated/prisma`. Schema and migrations reside in `server/prisma/` (SQLite DB in `db_files/` by default).

## Build, Test, and Development Commands
- Frontend: `cd client && yarn install` once. `yarn dev --host` for local dev (defaults to port 5173), `yarn build` for production assets, `yarn preview` to serve the build, `yarn lint` for ESLint checks.
- Backend: `cd server && bun install`. `bun run src/index.ts` (or `bun run dev`) starts the API on port 3000 and relies on `FRONTEND_URL` and `DATABASE_URL`. Use `bunx prisma migrate dev --name <desc>` to evolve the schema and `bunx prisma generate` after schema changes.
- Docker: each side has a `Dockerfile` for containerized builds; client uses `entrypoint.sh` for runtime config injection.

## Coding Style & Naming Conventions
- JavaScript/JSX uses ESLint (recommended + React Hooks + Refresh) with Vite ES modules. Prefer 2-space indent, semicolons optional but be consistent with existing files, and avoid unused vars (ESLint enforces).
- Components in PascalCase (`ExpenseList.jsx`), functions/variables in `camelCase`, constants in `SCREAMING_SNAKE_CASE` when shared.
- Keep hooks at the top of components, colocate styles next to components (`App.css`, `index.css`), and prefix public env vars with `VITE_` (consumed via `src/config.js`).

## Testing Guidelines
- No automated tests exist yet. When adding, mirror Vite conventions (`*.test.jsx` near sources) and prefer Vitest + React Testing Library for UI, or lightweight unit tests for helpers.
- For API work, add integration-style tests around Hono handlers where possible; keep fixtures small and deterministic.

## Commit & Pull Request Guidelines
- Recent history favors short, descriptive messages (e.g., “added basic auth functions…”). Keep subject lines under ~72 chars and focus on the user-facing change. Group related edits; avoid mixed concerns.
- Pull requests should include: a short summary, linked issue/task ID, setup/verification steps (commands and URLs), screenshots/GIFs for UI changes, and notes about env or DB migration impacts. If a migration is added, call out the expected `bunx prisma migrate dev` run.

## Security & Configuration Tips
- Do not commit `.env` files. Server expects `DATABASE_URL` (SQLite path) and `FRONTEND_URL` for CORS. Client runtime config is injected via Vite env vars in dev and runtime JSON in container deploys.
- Regenerate Prisma client after altering `prisma/schema.prisma`, and verify the generated artifacts remain in `server/generated/prisma/` for the runtime to function.
