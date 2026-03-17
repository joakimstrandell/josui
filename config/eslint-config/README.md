# @josui/eslint-config

> Internal package — not published to npm

Shared ESLint flat configs for the josui monorepo.

## Configs

- `@josui/eslint-config` — Base TypeScript config
- `@josui/eslint-config/react` — React + TypeScript

## Usage

```ts
// eslint.config.ts
import { createReactConfig } from '@josui/eslint-config/react';

export default createReactConfig(import.meta.dirname);
```

```ts
// eslint.config.ts
import { createConfig } from '@josui/eslint-config';

export default createConfig(import.meta.dirname);
```
