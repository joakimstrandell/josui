# @josui/playground

Development sandbox for testing components and features.

## Stack

React 19, TanStack Router (file-based routing), Tailwind CSS v4 via `@josui/tailwind-preset`, Vite.

## Development

```bash
pnpm --filter @josui/playground dev
```

Runs at http://localhost:3001

## Build

```bash
pnpm --filter @josui/playground build
```

## Structure

Routes are in `src/routes/`. TanStack Router uses file-based routing — create new `.tsx` files to add routes.

## Tailwind Source Scanning

`styles.css` includes `@source "../../../packages/react/src"` so Tailwind scans the react package for class names. Without this, component styles would be purged from the build.

## Dependencies

Uses `@josui/tailwind-preset` for styling and `@josui/react` for components.
