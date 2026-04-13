# Portfolio

Personal portfolio site for Joakim Strandell, built with [TanStack Start](https://tanstack.com/start) and [Tailwind CSS](https://tailwindcss.com).

## Stack

TanStack Start (Vite + TanStack Router), Tailwind CSS v4, @josui/react, GSAP with ScrollTrigger, React Three Fiber, Roboto Mono (Fontsource).

## Development

```bash
pnpm dev
```

## Build

```bash
pnpm build
```

## Deployment

Hosted on Vercel with root directory `apps/portfolio`. Push to `main` triggers deployment.

## Constraints

- Don't manually edit `src/routeTree.gen.ts` — it's auto-generated
- Don't use `next/link` or `next/image` — this is TanStack Start, not Next.js
- Don't add vinxi
- Route metadata uses the `head` property in route config
- `asChild` prop on Button shows a React warning — type issue in @josui/react, works at runtime
