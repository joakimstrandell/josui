<p align="center">
  <img src="https://img.shields.io/badge/status-under%20development-8a2be2?style=for-the-badge" alt="Status: Under Development" />
</p>
<p align="center">
  <strong>Expect breaking changes and rapid iteration.</strong>
</p>

# Josui

[![CI](https://github.com/joakimstrandell/josui/actions/workflows/ci.yml/badge.svg)](https://github.com/joakimstrandell/josui/actions/workflows/ci.yml)

AI-native design system built on DTCG tokens.

## Packages (published to npm)

| Package                                                  | Description             |
| -------------------------------------------------------- | ----------------------- |
| [@josui/react](./packages/react)                         | React component library |
| [@josui/tailwind-preset](./packages/tailwind-preset)     | Tailwind CSS v4 preset  |
| [@josui/token-studio](./packages/token-studio)           | Token editor CLI        |
| [@josui/core](./packages/core)                           | Pure JS utilities       |
| [@josui/core-web](./packages/core-web)                   | Shared web utilities    |
| [@josui/typescript-config](./packages/typescript-config) | Shared tsconfig files   |

## Apps

| App                                    | Description        |
| -------------------------------------- | ------------------ |
| [@josui/docs](./apps/docs)             | Landing page       |
| [@josui/playground](./apps/playground) | Dev sandbox        |
| [portfolio](./apps/portfolio)          | Personal portfolio |
| [awkwardgroup](./apps/awkwardgroup)    | Company website    |

## Development

```bash
pnpm build      # Build all packages
pnpm dev        # Start all dev servers
pnpm check      # Lint + format + typecheck
pnpm lint       # Lint all packages
pnpm test       # Run all tests
pnpm clean      # Delete all build artifacts and node_modules
```

## Releasing

This project uses [Changesets](https://github.com/changesets/changesets) for versioning.

```bash
pnpm changeset  # Create a changeset after making releasable changes
```

When you push to main with changesets, CI automatically creates a "Version Packages" PR. Merging that PR publishes to npm.

## Documentation

This project uses three documentation layers:

- **README.md** (per package) — Single source of truth for both humans and AI. What it is, structure, constraints, usage. See the `write-docs` skill for structure guidelines.
- **ARCHITECTURE.md** (optional, per package) — Design decisions, tradeoffs, and constraints that aren't obvious from the code. Referenced from README.md when present.
- **AGENTS.md** (root only) — Non-discoverable operational info: build order, commit conventions, tooling quirks. If it can be inferred from code, it doesn't belong here.
- **Skills** — Teachable knowledge for AI assistants, loaded on demand. Lives in `packages/{name}/skills/`.

Per-package AGENTS.md files are an anti-pattern — they duplicate README content, drift from reality, and inflate context windows. All package-level documentation belongs in README.md.

## License

MIT
