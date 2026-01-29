# @josui/core-web

Shared web utilities for the Josui design system. Framework-agnostic helpers for DOM, canvas, cursors, and more.

## Installation

```bash
pnpm add @josui/core-web
```

## Usage

```ts
import { cn, createCustomCursor, createCellGridController } from '@josui/core-web';

// Merge Tailwind classes with proper precedence
const className = cn('px-4 py-2', isActive && 'bg-blue-500', className);

// Create a custom cursor
const cursor = createCustomCursor(element, { interactiveScale: 2.5 });

// Create an interactive cell grid
const controller = createCellGridController(canvas, { cellSize: 24 });
controller.start();
```

## Utilities

- **cn** — Merge Tailwind CSS classes with `clsx` + `tailwind-merge`
- **createCustomCursor** — GSAP-powered custom cursor with interactive element detection
- **createCellGridController** — Interactive canvas cell grid that follows cursor movement
- **interactiveState** — Pub/sub state for tracking cursor over interactive elements
- **isInteractiveElement** — Check if an element is interactive (button, link, etc.)
- **isTouchDevice** — Detect touch-capable devices
- **getCssVariable** — Retrieve CSS variable values from the DOM
- **resolveColor** — Resolve color tokens (e.g., `color-primary-500`) to CSS variable values
- **themeState** — Theme manager singleton (light/dark/system) with localStorage persistence
- **getThemeScript** — Blocking script to prevent theme flash on SSR
- **createKeyboardShortcut** — Keyboard shortcut listener with cleanup
- **parseShortcut** — Parse shortcut strings (e.g., "ctrl+shift+t") into objects
