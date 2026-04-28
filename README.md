<p align="center">
  <img src="https://img.shields.io/badge/status-under%20development-8a2be2?style=for-the-badge" alt="Status: Under Development" />
</p>
<p align="center">
  <strong>Expect breaking changes and rapid iteration.</strong>
</p>

# Josui

[![CI](https://github.com/joakimstrandell/josui/actions/workflows/ci.yml/badge.svg)](https://github.com/joakimstrandell/josui/actions/workflows/ci.yml)

AI-native design system and build tooling for shipping applications with speed and consistency.

## What's inside

| Package                                                  | Description             |
| -------------------------------------------------------- | ----------------------- |
| [@josui/react](./packages/react)                         | React component library |
| [@josui/tailwind-preset](./packages/tailwind-preset)     | Tailwind CSS v4 preset  |
| [@josui/core](./packages/core)                           | Pure JS utilities       |
| [@josui/core-web](./packages/core-web)                   | Shared web utilities    |
| [@josui/typescript-config](./packages/typescript-config) | Shared tsconfig files   |

| App                                        | Description        |
| ------------------------------------------ | ------------------ |
| [@josui/playground](./apps/playground)     | Dev sandbox        |
| [@josui/portfolio](./apps/portfolio)       | Personal portfolio |
| [@josui/awkwardgroup](./apps/awkwardgroup) | Company website    |

```bash
pnpm build      # Build all packages
pnpm dev        # Start all dev servers
pnpm check      # Lint + format + typecheck
pnpm test       # Run all tests
```

See [AGENTS.md](AGENTS.md) for agent workflow and [DEVELOPMENT.md](DEVELOPMENT.md) for engineering conventions.

## Documentation

- **README.md** – The way in. What it is, what's inside, how to use it, links
- **USAGE.md** (optional) – Setup guides, API reference, extended examples
- **AGENTS.md** – Agent-agnostic workflow for working in this monorepo
- **DEVELOPMENT.md** – Engineering conventions, code style, commits, tooling
- **CLAUDE.md** – Thin compatibility shim that points to AGENTS.md + DEVELOPMENT.md
- **Skills** – Teachable knowledge for AI assistants in `.claude/skills/`

## License

MIT
