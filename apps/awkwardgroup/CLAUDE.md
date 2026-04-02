# Claude Code Instructions

Project-specific instructions for Claude Code when working on the Awkward Group website.

## Project Overview

Company website for Awkward Group AB, built with TanStack Start (file-based routing on Vite).

## Key Architecture Decisions

- **TanStack Start** over Next.js: Consistent with portfolio and other projects
- **File-based routing**: Routes in `src/routes/` using `createFileRoute`
- **Local packages**: `@josui/*` packages linked locally in dev, installed from npm in CI

## File Conventions

### Routes
- Root layout: `src/routes/__root.tsx`
- Pages use `createFileRoute('/path')` pattern
- Route metadata via `head` property in route config

### Components
- Shared components in `src/components/`
- UI primitives in `src/components/ui/`

### Styling
- Tailwind CSS v4 with `@tailwindcss/vite` plugin
- Global styles in `src/styles/globals.css`
- Uses Josui design system tokens

## Important Files

| File | Purpose |
|------|---------|
| `vite.config.ts` | Vite + TanStack Start config |
| `src/router.tsx` | Router setup with `getRouter` export |
| `src/routeTree.gen.ts` | Auto-generated (don't edit manually) |
| `tailwind.config.js` | Tailwind configuration |

## Deployment

Hosted on Vercel. Push to `main` triggers automatic deployment.

## Dependencies

### @josui packages

The `@josui/*` packages are published on npm but can be linked locally for development.

**Always import from `/src`:**
```tsx
// Correct
import { cn } from '@josui/core-web/src';
import { Button } from '@josui/react/src';

// Wrong
import { cn } from '@josui/core-web';
import { Button } from '@josui/react';
```

## Don't

- Don't manually edit `src/routeTree.gen.ts`
- Don't use `next/link` or `next/image`
- Don't add vinxi - project uses Vite directly
