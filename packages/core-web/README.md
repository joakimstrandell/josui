# @josui/core-web

Shared web utilities for the Josui design system. Framework-agnostic helpers for DOM, canvas, cursors, and more.

## What's inside

```bash
pnpm add @josui/core-web
```

- **Class merging** – `cn()` via clsx + tailwind-merge
- **Theme** – Light/dark manager with localStorage persistence and SSR flash prevention
- **Keyboard shortcuts** – Listener, parser, platform-aware display formatting
- **Custom cursor** – GSAP-powered cursor with interactive element detection
- **Cell grid** – Interactive canvas background
- **DOM helpers** – Touch detection, CSS variable access, color token resolution

```ts
import { cn, createCustomCursor, createCellGridController } from "@josui/core-web";
```

No build step – consumers import TypeScript source directly. See [USAGE.md](./USAGE.md) for detailed examples of each utility.

## Development

See [DEVELOPMENT.md](./DEVELOPMENT.md).
