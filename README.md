<p align="center">
  <img src="https://img.shields.io/badge/status-under%20development-8a2be2?style=for-the-badge" alt="Status: Under Development" />
</p>
<p align="center">
  <strong>Expect breaking changes and rapid iteration.</strong>
</p>

# Josui

[![CI](https://github.com/joakimstrandell/josui/actions/workflows/ci.yml/badge.svg)](https://github.com/joakimstrandell/josui/actions/workflows/ci.yml)

AI-native design system built on DTCG tokens.

## Packages

| Package                                                  | Description               |
| -------------------------------------------------------- | ------------------------- |
| [@josui/react](./packages/react)                         | React component library   |
| [@josui/vue](./packages/vue)                             | Vue 3 component library   |
| [@josui/core](./packages/core)                           | Pure JS utilities         |
| [@josui/core-web](./packages/core-web)                   | Shared web utilities      |
| [@josui/tokens](./packages/tokens)                       | Design tokens (CSS + JS)  |
| [@josui/tailwind-config](./packages/tailwind-config)     | Tailwind CSS v4 config    |
| [@josui/eslint-config](./packages/eslint-config)         | Shared ESLint configs     |
| [@josui/typescript-config](./packages/typescript-config) | Shared TypeScript configs |

## Apps

| App                                              | Description          |
| ------------------------------------------------ | -------------------- |
| [@josui/storybook-react](./apps/storybook-react) | React component docs |
| [@josui/storybook-vue](./apps/storybook-vue)     | Vue component docs   |
| [@josui/docs](./apps/docs)                       | Landing page         |

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
