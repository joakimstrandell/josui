# Agent Instructions — @josui/vue

Vue 3 component library for the Josui design system.

## Build

```bash
pnpm --filter @josui/vue build
```

Uses Vite for bundling. Outputs ESM, CJS, and type definitions to `dist/`.

## Component Structure

Components live in `src/components/ComponentName/`. Each component folder contains:

- `ComponentName.vue` — Component implementation (SFC)
- `ComponentName.stories.ts` — Storybook stories
- `index.ts` — Barrel export

Components:

- Use `<script setup lang="ts">`
- Use Tailwind CSS classes
- Support `class` prop via `useAttrs()`
- Have TypeScript props interface

## Creating a Component

1. Create `src/components/ComponentName/ComponentName.vue`
2. Create `src/components/ComponentName/ComponentName.stories.ts`
3. Create `src/components/ComponentName/index.ts` with exports
4. Export from `src/index.ts`
5. Create matching component in `@josui/react` with identical API

## Props Conventions

- `variant` — Visual style (primary, secondary, etc.)
- `size` — Size scale (sm, md, lg)
- Use `defineProps<{...}>()` for type-safe props
- Use `withDefaults()` for default values

## Testing

### Storybook

```bash
pnpm --filter @josui/storybook-vue dev
```

Visually verify in Storybook at http://localhost:6007

Stories live alongside components: `src/components/ComponentName/ComponentName.stories.ts`

## Important

Keep APIs identical to `@josui/react` for cross-framework consistency.
