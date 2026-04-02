# Portfolio

Personal portfolio site built with TanStack Start (file-based routing on Vite), Tailwind CSS v4, and `@josui/*` packages.

## Routing

- Routes in `src/routes/` using `createFileRoute`
- Don't manually edit `src/routeTree.gen.ts`
- Root layout: `src/routes/__root.tsx`
- Route metadata via `head` property in route config

## Styling

- Tailwind CSS v4 with `@tailwindcss/vite` plugin
- Global styles in `src/styles/globals.css`
- Custom colors: `primary-*`, `secondary-*`, `tertiary-*`

## Dependencies

`@josui/*` packages resolve via pnpm workspace protocol:

```tsx
import { cn } from "@josui/core-web";
import { Button } from "@josui/react";
```

Key packages: `@tanstack/react-router`, `@tanstack/react-start`, `nitro`, `gsap`, `@react-three/fiber`, `three`

## Deployment

Hosted on Vercel with root directory `apps/portfolio`. Push to `main` triggers deployment.

## Known Issues

- `asChild` prop on Button shows React warning - type issue in @josui/react, works at runtime

## Don't

- Don't manually edit `src/routeTree.gen.ts`
- Don't use `next/link` or `next/image`
- Don't add vinxi
