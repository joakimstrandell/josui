# Agent Instructions — @josui/eslint-config

Internal ESLint configuration for the josui monorepo. **Not published to npm.**

## Purpose

Provides shared ESLint flat configs for all packages and apps in this monorepo. This ensures consistent linting rules across the codebase.

## Configs

- `index.ts` — Base TypeScript config with `createConfig()` factory
- `react.ts` — React config with `createReactConfig()` factory

## Usage (monorepo only)

```ts
// eslint.config.ts in any package/app
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
3. Changes affect all packages in this monorepo

## Important

- This package is private and not published to npm
- External projects consuming @josui packages should use their own ESLint config
- Only packages/ contents are published; config/ is internal tooling
