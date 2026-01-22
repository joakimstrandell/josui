# Josui Design System

Multi-framework design system monorepo optimized for AI development.

## Packages

| Package                                                  | Description               |
| -------------------------------------------------------- | ------------------------- |
| [@josui/react](./packages/react)                         | React component library   |
| [@josui/vue](./packages/vue)                             | Vue 3 component library   |
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
pnpm changeset  # Create a changeset
```

## License

MIT
