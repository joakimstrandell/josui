# Agent Instructions

Multi-framework design system monorepo. Build order: `tokens → tailwind-config → core → core-web → react/vue → storybook apps`

## Build & Test

```bash
pnpm install              # Install dependencies
pnpm build                # Build all packages
pnpm lint                 # Must pass before committing
pnpm --filter @josui/storybook-react dev  # Visual verification
```

## Code Style

- TypeScript only (never `.js` files)
- Named exports (no default exports) — promotes tree shaking
- `const` over `let`, single quotes, semicolons
- Prefer functional and composable patterns
- Avoid side effects in module scope

## Commits

Use [Conventional Commits](https://www.conventionalcommits.org/): `<type>(<scope>): <description>`

**Types:** `feat`, `fix`, `refactor`, `docs`, `chore`, `test`
**Scopes:** Package name without `@josui/` (e.g., `react`, `tokens`, `core-web`)

## Releasing

Uses [Changesets](https://github.com/changesets/changesets). **Do NOT create changesets automatically** — only when the user asks.

```bash
pnpm changeset  # Select packages, bump type, write summary
```

**Published:** `@josui/core`, `@josui/core-web`, `@josui/tokens`, `@josui/tailwind-config`, `@josui/react`, `@josui/vue`, `@josui/eslint-config`, `@josui/typescript-config`
**Ignored:** Apps (`docs`, `storybook-*`)

When adding packages, update `.changeset/config.json` (`linked` or `ignore`).

## Package-Specific Instructions

Each package has its own `AGENTS.md`. The closest one to the file you're editing takes precedence.

## Common Pitfalls

- **ESLint**: Each package has its own `eslint.config.ts` with `tsconfigRootDir`
- **TypeScript**: Ensure `tsconfig.json` extends the correct base config
- **Build failures**: Build tokens first (`pnpm --filter @josui/tokens build`)
- **Imports**: Use workspace protocol (`workspace:*`) for internal dependencies
