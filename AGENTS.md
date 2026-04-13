# Agent Instructions

Design system monorepo. Build order: `core → core-web → tailwind-preset → react → apps`

## Code Style

- TypeScript only (never `.js` files)
- Named exports (no default exports) — promotes tree shaking
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

**Published:** `@josui/core`, `@josui/core-web`, `@josui/react`, `@josui/tailwind-preset`, `@josui/token-studio`, `@josui/typescript-config`
**Ignored:** Apps (`docs`, `playground`, `portfolio`, `awkwardgroup`)

When adding packages, update `.changeset/config.json` (`linked` or `ignore`).

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

## Documentation

After changing documentation (README.md, ARCHITECTURE.md, skills), run `docs-audit` to verify consistency across the repo. Documentation rules live in the `write-docs` skill.
