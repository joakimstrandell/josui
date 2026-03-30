# Agent Instructions

Design system monorepo. Build order: `core → core-web → react → apps`

## Build & Test

```bash
pnpm install              # Install dependencies
pnpm build                # Build all packages in dependency order
pnpm dev                  # Start all packages in watch mode
pnpm test                 # Run all tests
pnpm check                # Lint + format + typecheck
pnpm lint                 # Lint all packages
pnpm format               # Format all files
pnpm clean                # Delete all build artifacts and node_modules
pnpm knip                 # Check for unused deps/exports
pnpm --filter @josui/react storybook      # Visual verification
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
pnpm changeset          # Select packages, bump type, write summary
pnpm version-packages   # Apply changesets and bump package versions
pnpm release            # Build all packages and publish to npm
```

**Published:** `@josui/core`, `@josui/core-web`, `@josui/react`, `@josui/tailwind-preset`, `@josui/token-studio`, `@josui/cli`, `@josui/typescript-config`
**Ignored:** Apps (`docs`, `playground`)

When adding packages, update `.changeset/config.json` (`linked` or `ignore`).

## Package-Specific Instructions

Each package has its own `AGENTS.md`. The closest one to the file you're editing takes precedence.

## Package Skills

Some packages include skills that enhance AI-assisted development. Skills live in `packages/{name}/skills/` and are published with the package.

| Package        | Skill                  | Purpose                        |
| -------------- | ---------------------- | ------------------------------ |
| `@josui/react` | `use-react-components` | Use React components correctly |

**For monorepo contributors:** Run `pnpm josui link skills` to symlink package skills into `.claude/skills/`.

**For package consumers:** Copy the skill from your installed package:

```bash
cp -r node_modules/@josui/react/skills/use-react-components .claude/skills/
```

## Dependency Management

Run `pnpm knip` to detect unused dependencies, exports, and files. Use after:

- Adding/removing dependencies
- Refactoring exports
- Before releasing

Knip config is in `knip.config.ts`. CSS-only packages (tailwind) are ignored since knip only analyzes JS/TS.

## Tooling

Uses [Vite+](https://viteplus.dev/) as unified toolchain:

- **Linting:** Oxlint via `vp lint`
- **Formatting:** Oxfmt via `vp fmt` (includes Tailwind class sorting)
- **Building:** `vp build` for apps, `vp pack` for libraries
- **Testing:** Vitest via `vp test`
- **Task orchestration:** `vp run`
- **Pre-commit:** `vp staged` — runs automatically on `git commit` via a git hook installed by `pnpm install` (`prepare` script runs `vp config`)

Config is in root `vite.config.ts`.

### Pre-commit behaviour

Staged files are processed by file type:

- `*.{ts,tsx,js,jsx}` → `vp check --fix` (lint + format + typecheck, with auto-fix)
- `*.{json,md,css}` → `vp fmt --write` (format only)

Only staged files are checked — not the entire repo.

## Common Pitfalls

- **TypeScript**: Ensure `tsconfig.json` extends `@josui/typescript-config`
- **Build failures**: Build core first (`pnpm --filter @josui/core build`)
- **Imports**: Use workspace protocol (`workspace:*`) for internal dependencies
