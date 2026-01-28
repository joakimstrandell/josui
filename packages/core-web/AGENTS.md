# Agent Instructions — @josui/core-web

Framework-agnostic web utilities shared across `@josui/react` and `@josui/vue`.

## Build

```bash
pnpm --filter @josui/core-web build
```

Uses tsup for bundling. Outputs ESM, CJS, and type definitions to `dist/`.

## Structure

Utilities live in `src/`:

- `cn.ts` — Tailwind class merging utility
- `utils.ts` — Touch device detection, CSS variable access
- `custom-cursor.ts` — GSAP-powered custom cursor
- `interactive.ts` — Interactive element detection and state management
- `cell-grid/` — Interactive canvas cell grid
  - `controller.ts` — Main controller for animation loop
  - `manager.ts` — Cell lifecycle management with Bresenham's algorithm
  - `renderer.ts` — Canvas drawing functions
  - `types.ts` — TypeScript interfaces

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
