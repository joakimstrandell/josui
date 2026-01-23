# @josui/core-web

Shared web utilities for the Josui design system. Framework-agnostic helpers for DOM, canvas, cursors, and more.

## Installation

```bash
pnpm add @josui/core-web
```

## Usage

```ts
import { cn } from '@josui/core-web';

// Merge Tailwind classes with proper precedence
const className = cn('px-4 py-2', isActive && 'bg-blue-500', className);
```

## Utilities

- **cn** — Merge Tailwind CSS classes with `clsx` + `tailwind-merge`
