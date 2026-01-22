# Agent Instructions — @josui/react

React component library for the Josui design system.

## Build

```bash
pnpm --filter @josui/react build
```

Uses tsup for bundling. Outputs ESM, CJS, and type definitions to `dist/`.

## Component Structure

Components live in `src/components/`. Each component:

- Is a named export (no default exports)
- Uses Tailwind CSS classes
- Supports `className` prop for customization
- Has TypeScript props interface

## Creating a Component

1. Create `src/components/ComponentName.tsx`
2. Export from `src/index.ts`
3. Create matching component in `@josui/vue` with identical API
4. Add story in `apps/storybook-react`

## Props Conventions

- `variant` — Visual style (primary, secondary, etc.)
- `size` — Size scale (sm, md, lg)
- `className` — Additional CSS classes
- Use `React.ComponentPropsWithoutRef<'element'>` for HTML props

## Testing

```bash
pnpm --filter @josui/storybook-react dev
```

Visually verify in Storybook at http://localhost:6006

## Important

Keep APIs identical to `@josui/vue` for cross-framework consistency.
