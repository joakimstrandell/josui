# @josui/core-web

Shared web utilities for the Josui design system. Framework-agnostic helpers for DOM, canvas, cursors, and more.

## Installation

```bash
pnpm add @josui/core-web
```

## What's Included

- **Class merging** – `cn()` via clsx + tailwind-merge
- **Theme** – Light/dark manager with localStorage persistence and SSR flash prevention
- **Keyboard shortcuts** – Listener, parser, platform-aware display formatting
- **Custom cursor** – GSAP-powered cursor with interactive element detection
- **Cell grid** – Interactive canvas background
- **DOM helpers** – Touch detection, CSS variable access, color token resolution

No build step – consumers import TypeScript source directly via `main: "./src/index.ts"`.

## Usage

```ts
import { cn, createCustomCursor, createCellGridController } from "@josui/core-web";
```

## Further Reading

- [USAGE.md](./USAGE.md) – Extended usage examples for each utility
- [DEVELOPMENT.md](./DEVELOPMENT.md) – Package structure and constraints
