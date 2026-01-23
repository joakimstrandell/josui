# Agent Instructions — @josui/core-web

Framework-agnostic web utilities shared across `@josui/react` and `@josui/vue`.

## Build

```bash
pnpm --filter @josui/core-web build
```

Uses tsup for bundling. Outputs ESM, CJS, and type definitions to `dist/`.

## Structure

Utilities live in `src/`. Each utility is a separate file:

- `cn.ts` — Tailwind class merging utility

## Adding Utilities

1. Create `src/utility-name.ts`
2. Export from `src/index.ts`
3. Run `pnpm build` to verify

## Guidelines

- Keep utilities **framework-agnostic** (no React/Vue imports)
- Target browser environments (DOM APIs are fine)
- Export TypeScript types alongside functions
- Minimize dependencies

## Important

This package must build before `@josui/react` and `@josui/vue` packages.
