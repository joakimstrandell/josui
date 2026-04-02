# Awkward Group

Company website for Awkward Group AB, built with TanStack Start (file-based routing on Vite), Tailwind CSS v4, and `@josui/*` packages.

## Routing

- Routes in `src/routes/` using `createFileRoute`
- Don't manually edit `src/routeTree.gen.ts`
- Root layout: `src/routes/__root.tsx`
- Route metadata via `head` property in route config

## Styling

- Tailwind CSS v4 with `@tailwindcss/vite` plugin
- Global styles in `src/styles/globals.css`

## Dependencies

`@josui/*` packages resolve via pnpm workspace protocol:

```tsx
import { cn } from "@josui/core-web";
import { Button } from "@josui/react";
```

## Deployment

Hosted on Vercel with root directory `apps/awkwardgroup`. Push to `main` triggers deployment.

## Don't

- Don't manually edit `src/routeTree.gen.ts`
- Don't use `next/link` or `next/image`
- Don't add vinxi
