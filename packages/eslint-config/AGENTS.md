# Agent Instructions — @josui/eslint-config

Shared ESLint flat configs for the monorepo.

## Configs

- `index.ts` — Base TypeScript config with `createConfig()` factory
- `react.ts` — React config with `createReactConfig()` factory
- `vue.ts` — Vue config with `createVueConfig()` factory

## Usage Pattern

Consumers must use factory functions with `import.meta.dirname`:

```ts
import { createReactConfig } from '@josui/eslint-config/react';

export default createReactConfig(import.meta.dirname);
```

## Key Settings

- Uses `projectService: true` for automatic tsconfig resolution
- `tsconfigRootDir` must be set per package for monorepo support
- Ignores: `dist/`, `node_modules/`, `.storybook/`, `storybook-static/`, `coverage/`

## Modifying Rules

1. Edit the appropriate config file
2. Run `pnpm lint` from root to test across all packages
3. Update consumers if adding new exports

## Important

Changes affect all packages using these configs. Test with `pnpm lint` from root.
