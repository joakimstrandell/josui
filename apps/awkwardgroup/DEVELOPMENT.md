# Development

## Routing

Routes in `src/routes/` using `createFileRoute`. Root layout: `src/routes/__root.tsx`. Route metadata via `head` property in route config.

## Styling

Tailwind CSS v4 with `@tailwindcss/vite` plugin. Global styles in `src/styles/globals.css`.

## Deployment

Hosted on Vercel with root directory `apps/awkwardgroup`. Push to `main` triggers deployment.

## Constraints

- Don't manually edit `src/routeTree.gen.ts` – it's auto-generated
- Don't use `next/link` or `next/image` – this is TanStack Start, not Next.js
- Don't add vinxi
