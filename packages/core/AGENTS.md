# Agent Instructions — @josui/core

Pure JavaScript utilities that work anywhere (Node.js, browser, SSR).

## Build

```bash
pnpm --filter @josui/core build
```

Uses tsup for bundling. Outputs ESM, CJS, and type definitions to `dist/`.

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
import { toRgb, toHex } from '@josui/core';

toRgb('oklch(0.6 0.2 260)'); // 'rgb(0, 102, 255)'
toRgb('red', 0.5); // 'rgba(255, 0, 0, 0.5)'
toHex('rgb(255, 0, 0)'); // '#ff0000'
```

## Adding Utilities

1. Create `src/utility-name.ts`
2. Export from `src/index.ts`
3. Run `pnpm build` to verify

## Guidelines

- **No browser APIs** — No `window`, `document`, `navigator`, etc.
- **Pure functions** — No side effects where possible
- **Well-typed** — Full TypeScript support with documented parameters
- **Minimal dependencies** — Only add well-maintained, focused libraries

## Important

This package can be used as a dependency by `@josui/core-web` for shared utilities.
