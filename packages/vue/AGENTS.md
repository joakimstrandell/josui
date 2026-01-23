# Agent Instructions — @josui/vue

Vue 3 component library for the Josui design system.

> **Note:** This package is a proof of concept. It will be refactored to use SCSS instead of Tailwind CSS to demonstrate centralized token consumption.

## Build

```bash
pnpm --filter @josui/vue build
```

Uses Vite for bundling. Outputs ESM, CJS, and type definitions to `dist/`.

## Component Structure

Components live in `src/components/ComponentName/`. Each component folder contains:

- `ComponentName.vue` — Component implementation (SFC)
- `ComponentName.test.ts` — Unit tests
- `ComponentName.stories.ts` — Storybook stories
- `index.ts` — Barrel export

Components:

- Use `<script setup lang="ts">`
- Use Tailwind CSS classes
- Support `class` prop via `useAttrs()`
- Have TypeScript props interface

## Creating a Component

1. Create `src/components/ComponentName/ComponentName.vue`
2. Create `src/components/ComponentName/ComponentName.test.ts`
3. Create `src/components/ComponentName/ComponentName.stories.ts`
4. Create `src/components/ComponentName/index.ts` with exports
5. Export from `src/index.ts`

## Props Conventions

- `variant` — Visual style (primary, secondary, etc.)
- `size` — Size scale (sm, md, lg)
- Use `defineProps<{...}>()` for type-safe props
- Use `withDefaults()` for default values

## Testing

### Unit Tests

```bash
pnpm --filter @josui/vue test        # Run once
pnpm --filter @josui/vue test:watch  # Watch mode
```

Uses Vitest with @testing-library/vue. Tests live alongside components.

Note: Unlike React, Vue's `rerender()` doesn't update props. Use `it.each()` for testing multiple prop values.

### Storybook

```bash
pnpm --filter @josui/storybook-vue dev
```

Visually verify in Storybook at http://localhost:6007

Stories live alongside components: `src/components/ComponentName/ComponentName.stories.ts`

## Important

This is a proof of concept package demonstrating token usage with SCSS. It does not aim for full parity with `@josui/react`.
