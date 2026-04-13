# @josui/core-web

Shared web utilities for the Josui design system. Framework-agnostic helpers for DOM, canvas, cursors, and more.

## Installation

```bash
pnpm add @josui/core-web
```

## Usage

```ts
import { cn, createCustomCursor, createCellGridController } from "@josui/core-web";

// Merge Tailwind classes with proper precedence
const className = cn("px-4 py-2", isActive && "bg-blue-500", className);

// Create a custom cursor
const cursor = createCustomCursor(element, { interactiveScale: 2.5 });

// Create an interactive cell grid
const controller = createCellGridController(canvas, { cellSize: 24 });
controller.start();
```

## Utilities

- **Class merging** — `cn()` via clsx + tailwind-merge
- **Theme** — Light/dark manager with localStorage persistence and SSR flash prevention
- **Keyboard shortcuts** — Listener, parser, platform-aware display formatting, ARIA support
- **Custom cursor** — GSAP-powered cursor with interactive element detection
- **Cell grid** — Interactive canvas background
- **DOM helpers** — Touch detection, CSS variable access, color token resolution

No build step — consumers import TypeScript source directly via `main: "./src/index.ts"`.

## Structure

```
src/
├── cn.ts              # Tailwind class merging
├── utils.ts           # isTouchDevice, getCssVariable, resolveColor
├── keyboard.ts        # Keyboard shortcuts (on @tanstack/react-hotkeys)
├── theme.ts           # Theme singleton, SSR script, view transitions
├── custom-cursor.ts   # GSAP-powered custom cursor
├── interactive.ts     # Interactive element detection
└── cell-grid/         # Canvas cell grid (controller, manager, renderer)
```

## Constraints

- Framework-agnostic — no React/Vue imports
- Browser environment assumed (DOM APIs are fine)
- Workspace dependency of `@josui/react`
