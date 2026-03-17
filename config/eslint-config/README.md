# @josui/eslint-config

Shared ESLint flat configs for josui projects.

## Installation

```bash
pnpm add -D @josui/eslint-config eslint
```

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
