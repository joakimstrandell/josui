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
