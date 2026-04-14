<p align="center">
  <img src="https://img.shields.io/badge/status-under%20development-8a2be2?style=for-the-badge" alt="Status: Under Development" />
</p>
<p align="center">
  <strong>Expect breaking changes and rapid iteration.</strong>
</p>

# Josui

[![CI](https://github.com/joakimstrandell/josui/actions/workflows/ci.yml/badge.svg)](https://github.com/joakimstrandell/josui/actions/workflows/ci.yml)

AI-native design system and build tooling for shipping applications with speed and consistency.

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

| App                                        | Description        |
| ------------------------------------------ | ------------------ |
| [@josui/docs](./apps/docs)                 | Landing page       |
| [@josui/playground](./apps/playground)     | Dev sandbox        |
| [@josui/portfolio](./apps/portfolio)       | Personal portfolio |
| [@josui/awkwardgroup](./apps/awkwardgroup) | Company website    |

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

- **README.md** – Landing page. What it is, install, exports, links
- **USAGE.md** (optional) – Setup guides, configuration, extended examples
- **DEVELOPMENT.md** – Structure, constraints, patterns. Root: code style, commits, tooling
- **CLAUDE.md** – References for AI assistants. Points to DEVELOPMENT.md
- **Skills** – Teachable knowledge for AI assistants. Lives in `.claude/skills/`. Package-level skills in `packages/{name}/skills/` are for symlinking into consumer projects

## License

MIT
