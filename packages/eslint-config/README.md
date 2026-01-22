# @josui/eslint-config

Shared ESLint flat configs for the Josui monorepo.

## Configs

- `@josui/eslint-config` — Base TypeScript config
- `@josui/eslint-config/react` — React + TypeScript
- `@josui/eslint-config/vue` — Vue + TypeScript

## Usage

```ts
// eslint.config.ts
import { createReactConfig } from '@josui/eslint-config/react';

export default createReactConfig(import.meta.dirname);
```

Internal package — not published to npm.
