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

| Package                                | Description              |
| -------------------------------------- | ------------------------ |
| [@josui/react](./packages/react)       | React component library  |
| [@josui/tokens](./packages/tokens)     | Design tokens (CSS + JS) |
| [@josui/tailwind](./packages/tailwind) | Tailwind CSS v4 config   |
| [@josui/core](./packages/core)         | Pure JS utilities        |
| [@josui/core-web](./packages/core-web) | Shared web utilities     |
| [@josui/cli](./packages/cli)           | CLI for linking packages |

## Internal Config (not published)

Shared tooling configs used within this monorepo:

| Config                                          | Description             |
| ----------------------------------------------- | ----------------------- |
| [eslint-config](./config/eslint-config)         | Shared ESLint configs   |
| [prettier-config](./config/prettier-config)     | Shared Prettier configs |
| [typescript-config](./config/typescript-config) | Shared tsconfig files   |

## Apps

| App                                    | Description  |
| -------------------------------------- | ------------ |
| [@josui/docs](./apps/docs)             | Landing page |
| [@josui/playground](./apps/playground) | Dev sandbox  |

## Development

```bash
pnpm build      # Build all packages
pnpm dev        # Start all dev servers
pnpm lint       # Lint all packages
pnpm test       # Run all tests
```

## Releasing

This project uses [Changesets](https://github.com/changesets/changesets) for versioning.

```bash
pnpm changeset  # Create a changeset after making releasable changes
```

When you push to main with changesets, CI automatically creates a "Version Packages" PR. Merging that PR publishes to npm.

## License

MIT
