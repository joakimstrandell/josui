# @josui/core

Pure JavaScript utilities for the Josui design system. Works anywhere — Node.js, browser, SSR.

## Installation

```bash
pnpm add @josui/core
```

## Usage

```ts
import { toRgb, toHex, parse } from "@josui/core";

// Convert to RGB
toRgb("#ff0000"); // "rgb(255, 0, 0)"
toRgb("oklch(0.6 0.15 30)"); // "rgb(219, 98, 89)"

// Convert to hex
toHex("rgb(255, 0, 0)"); // "#ff0000"

// Full culori parse (for advanced use)
parse("oklch(0.6 0.15 30)"); // { mode: 'oklch', l: 0.6, c: 0.15, h: 30 }
```

## Utilities

- **Color** (`src/color.ts`) — `toRgb`, `toHex`, `parse`, `formatRgb`, `formatHex` (powered by [culori](https://culorijs.org/))

No build step — consumers import TypeScript source directly via `main: "./src/index.ts"`.

## Adding Utilities

1. Create `src/utility-name.ts`
2. Export from `src/index.ts`

## Constraints

- No browser APIs (`window`, `document`, `navigator`) — this package must work in Node.js and SSR
- Pure functions — no side effects where possible
- Minimal dependencies — only well-maintained, focused libraries
- Used as a dependency by `@josui/core-web`
