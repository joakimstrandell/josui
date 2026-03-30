# Agent Instructions — @josui/core

Pure JavaScript utilities that work anywhere (Node.js, browser, SSR).

## Build

No build step — consumers import TypeScript source directly via `main: "./src/index.ts"`.

## Structure

Utilities are organized by domain:

- `color.ts` — Color parsing and manipulation

## Exports

### Color Utilities

| Function    | Description                                               |
| ----------- | --------------------------------------------------------- |
| `toRgb`     | Convert any CSS color to RGB format (with optional alpha) |
| `toHex`     | Convert any CSS color to hex format                       |
| `parse`     | Parse any CSS color string (from culori)                  |
| `formatRgb` | Format color object to RGB string (from culori)           |
| `formatHex` | Format color object to hex string (from culori)           |

```ts
import { toRgb, toHex } from "@josui/core";

toRgb("oklch(0.6 0.2 260)"); // 'rgb(0, 102, 255)'
toRgb("red", 0.5); // 'rgba(255, 0, 0, 0.5)'
toHex("rgb(255, 0, 0)"); // '#ff0000'
```

## Adding Utilities

1. Create `src/utility-name.ts`
2. Export from `src/index.ts`
3. Verify exports from `src/index.ts`

## Guidelines

- **No browser APIs** — No `window`, `document`, `navigator`, etc.
- **Pure functions** — No side effects where possible
- **Well-typed** — Full TypeScript support with documented parameters
- **Minimal dependencies** — Only add well-maintained, focused libraries

## Important

This package can be used as a dependency by `@josui/core-web` for shared utilities.
