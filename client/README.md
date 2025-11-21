# Expense Tracker Client
React + Vite frontend with Tailwind CSS and runtime-configured API endpoints.

## Quick Start
```bash
cd client
yarn install
yarn dev --host    # starts on http://localhost:5173
```
Build with `yarn build` and preview with `yarn preview`. Run lint checks via `yarn lint`.

## Environment & Runtime Config
- Dev env vars live in `.env` (not committed). Required keys: `VITE_API_URL` (backend base URL), `VITE_MODE`, `VITE_VERSION`.
- In production containers, config is injected at runtime (see `entrypoint.sh`); `src/config.js` reads `window.runtimeConfig` when not in dev.

## Project Structure
- `src/main.jsx` bootstraps React; `src/App.jsx` renders expenses UI.
- Components: `src/components/`; providers/state: `src/providers/`; runtime config helper: `src/config.js`; styles: `src/App.css`, `src/index.css`.
- Public assets live in `public/` and are served at the root by Vite.

## Styling
- Tailwind is configured via `tailwind.config.js` with `@tailwindcss/vite`.
- Prefer utility classes; keep component-specific styles near their JSX when needed.

## API Access
- Requests use the base URL from `getRuntimeConfig()` in `src/config.js`. Point `VITE_API_URL` to the Bun/Hono server (defaults to port 3000).
- For local dev, ensure backend CORS `FRONTEND_URL` matches `http://localhost:5173`.

## Coding Standards
- ESLint enforces recommended rules plus React Hooks and Refresh (`yarn lint`). Default style: 2-space indent, ES modules, PascalCase components, camelCase functions/vars. Avoid unused vars; prefix shared constants with `VITE_` or `SCREAMING_SNAKE_CASE` where appropriate.

## Common Tasks
- Add a component: place in `src/components/<Name>.jsx` and import into `App.jsx`.
- Update API endpoints: adjust `VITE_API_URL` or the runtime `config.json` consumed by `entrypoint.sh`.
- Verify a build: run `yarn build && yarn preview`, then visit `/` to smoke test the generated assets.
