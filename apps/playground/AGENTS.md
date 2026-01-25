# Agent Instructions — @josui/playground

Development sandbox for testing components and features.

## Development

```bash
pnpm --filter @josui/playground dev
```

Runs at http://localhost:3001

## Build

```bash
pnpm --filter @josui/playground build
```

## Stack

- React 19
- TanStack Router (file-based routing)
- Tailwind CSS v4 via `@josui/tailwind`
- Vite

## Structure

Routes are in `src/routes/`. TanStack Router uses file-based routing — create new `.tsx` files to add routes.

## Dependencies

Uses `@josui/tailwind` for styling. Other josui packages can be added as needed for testing.
