# @josui/eslint-config

Shared ESLint flat configs for the Josui design system.

## Installation

```bash
pnpm add -D @josui/eslint-config eslint
```

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

```ts
// eslint.config.ts
import { createVueConfig } from '@josui/eslint-config/vue';

export default createVueConfig(import.meta.dirname);
```

```ts
// eslint.config.ts
import { createBaseConfig } from '@josui/eslint-config';

export default createBaseConfig(import.meta.dirname);
```
