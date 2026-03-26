# Agent Instructions — @josui/core-web

Framework-agnostic web utilities used by `@josui/react`.

## Build

No build step — consumers import TypeScript source directly via `main: "./src/index.ts"`.

## Structure

Utilities live in `src/`:

- `cn.ts` — Tailwind class merging utility
- `utils.ts` — `isTouchDevice()`, `getCssVariable()`, `resolveColor()`
- `keyboard.ts` — `createKeyboardShortcut()`, `parseShortcut()`
- `theme.ts` — `themeState` singleton, `getThemeScript()`
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
3. Verify exports from `src/index.ts`

## Guidelines

- Keep utilities **framework-agnostic** (no React/Vue imports)
- Target browser environments (DOM APIs are fine)
- Export TypeScript types alongside functions
- Minimize dependencies

## Important

This package is a workspace dependency of `@josui/react`.
