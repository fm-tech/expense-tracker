# Expense Tracker - Agent Guidelines

## Build/Lint/Test Commands

### Client (React/Vite)
- Build: `cd client && npm run build`
- Lint: `cd client && npm run lint`
- Dev server: `cd client && npm run dev`
- Preview: `cd client && npm run preview`

### Server (Bun/TypeScript)
- Dev server: `cd server && npm run dev`
- Build: Not applicable (Bun runtime)

### Testing
No specific test commands found. Look for test scripts in package.json or test files.

## Code Style Guidelines

### Imports
- Use ES6 module syntax (`import`/`export`)
- Group imports by type: external libraries, internal modules, local files
- Sort alphabetically within each group

### Formatting
- Use Prettier with default settings (via Tailwind CSS setup)
- Indentation: 2 spaces for JavaScript/TypeScript
- Use single quotes for strings
- No trailing commas in function parameters

### Types
- TypeScript is used for server-side code
- Use explicit typing for all variables and functions
- Prefer interfaces over types for object shapes
- Use strict mode in TypeScript configuration

### Naming Conventions
- PascalCase for React components (e.g., `ExpenseForm`)
- camelCase for functions and variables (e.g., `calculateTotal`)
- UPPER_SNAKE_CASE for constants (e.g., `API_BASE_URL`)
- File names should match component names (e.g., `ExpenseForm.jsx`)

### Error Handling
- Use try/catch blocks for async operations
- Implement proper error boundaries in React components
- Validate inputs before processing
- Log errors appropriately for debugging

### React Specific
- Use functional components with hooks
- Prefer functional components over class components
- Use appropriate state management (Zustand store for client-side state)
- Follow component composition patterns
- Use useEffect for side effects

### Architecture
- Client: Vite + React + Zustand + Wouter router
- Server: Hono framework with Prisma ORM
- Component structure should follow React best practices
- Use context for global state management (AuthContext)