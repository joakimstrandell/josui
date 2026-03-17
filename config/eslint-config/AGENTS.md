# Agent Instructions — @josui/eslint-config

Shared ESLint configuration package. **Published to npm.**

## Purpose

Provides shared ESLint flat configs for josui projects. Ensures consistent linting rules.

## Configs

- `index.ts` — Base TypeScript config with `createConfig()` factory
- `react.ts` — React config with `createReactConfig()` factory

## Usage

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

1. Edit the appropriate config file in `src/`
2. Run `pnpm lint` from root to test across all packages
3. Create a changeset for the version bump
