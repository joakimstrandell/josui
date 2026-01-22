# Agent Instructions — @josui/vue

Vue 3 component library for the Josui design system.

## Build

```bash
pnpm --filter @josui/vue build
```

Uses Vite for bundling. Outputs ESM, CJS, and type definitions to `dist/`.

## Component Structure

Components live in `src/components/`. Each component:

- Is a `.vue` SFC (Single File Component)
- Uses `<script setup lang="ts">`
- Uses Tailwind CSS classes
- Supports `class` prop via `useAttrs()`

## Creating a Component

1. Create `src/components/ComponentName.vue`
2. Export from `src/index.ts`
3. Create matching component in `@josui/react` with identical API
4. Add story in `apps/storybook-vue`

## Props Conventions

- `variant` — Visual style (primary, secondary, etc.)
- `size` — Size scale (sm, md, lg)
- Use `defineProps<{...}>()` for type-safe props
- Use `withDefaults()` for default values

## Testing

```bash
pnpm --filter @josui/storybook-vue dev
```

Visually verify in Storybook at http://localhost:6007

## Important

Keep APIs identical to `@josui/react` for cross-framework consistency.
