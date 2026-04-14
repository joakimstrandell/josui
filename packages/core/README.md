# @josui/core

Pure JavaScript utilities for the Josui design system. Works anywhere – Node.js, browser, SSR.

## Installation

```bash
pnpm add @josui/core
```

## What's included

- **Color** – `toRgb`, `toHex`, `parse`, `formatRgb`, `formatHex` (powered by [culori](https://culorijs.org/))

## Usage

```ts
import { toRgb, toHex } from "@josui/core";
```

No build step – consumers import TypeScript source directly via `main: "./src/index.ts"`.

## Development

See [DEVELOPMENT.md](DEVELOPMENT.md) for adding utilities and constraints.
