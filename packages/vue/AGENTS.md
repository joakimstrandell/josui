# Agent Instructions — @josui/vue

Vue 3 component library using SCSS utilities from `@josui/scss` and CSS custom properties from `@josui/tokens`.

## Build

```bash
pnpm --filter @josui/vue build
```

Outputs ESM, CJS, types, and `styles.css` to `dist/`.

## Structure

Components live in `src/components/ComponentName/`:

```
ComponentName/
├── ComponentName.vue        # SFC with scoped SCSS
├── ComponentName.test.ts    # Vitest tests
├── ComponentName.stories.ts # Storybook stories
└── index.ts                 # Barrel export
```

## Component Conventions

- Use `<script setup lang="ts">`
- Export props interface from SFC: `export interface ComponentProps { ... }`
- Use scoped SCSS with `@use '@josui/scss/mixins' as *`
- BEM naming: `josui-component`, `josui-component--variant`, `josui-component__element`

## reka-ui

Components requiring complex accessibility use [reka-ui](https://reka-ui.com) primitives:

| Component | reka-ui Primitives                                                                                  |
| --------- | --------------------------------------------------------------------------------------------------- |
| Dialog    | DialogRoot, DialogPortal, DialogOverlay, DialogContent, DialogTitle, DialogDescription, DialogClose |
| Checkbox  | CheckboxRoot, CheckboxIndicator                                                                     |

Button, Card, Badge, Icon are custom implementations (no reka-ui).

## Styling

Import shared utilities from `@josui/scss` in component `<style>`:

```scss
@use '@josui/scss/mixins' as *;

.josui-button {
  background-color: color('primary-500');
  padding: spacing('2') spacing('4');
  border-radius: radius('md');
  @include transition-colors;
  @include focus-visible-ring;
}
```

Functions and mixins are defined in `@josui/scss` — see that package for full documentation.

## Creating a Component

1. Create folder `src/components/ComponentName/`
2. Create `ComponentName.vue` with scoped SCSS
3. Create `ComponentName.test.ts` using `@testing-library/vue`
4. Create `ComponentName.stories.ts`
5. Create `index.ts` exporting component and props type
6. Add exports to `src/index.ts`
7. Update `skills/use-vue-components/SKILL.md` with usage docs

## Important

When modifying components (adding/removing props, changing API), update:

- `AGENTS.md` — Component table, styling helpers, conventions
- `skills/use-vue-components/SKILL.md` — Component usage examples
- `README.md` — If architecture or setup changes

## Testing

```bash
pnpm --filter @josui/vue test        # Run once
pnpm --filter @josui/vue test:watch  # Watch mode
```

Uses Vitest with `@testing-library/vue`.

## Components

| Component | Variants                                        | Sizes                     |
| --------- | ----------------------------------------------- | ------------------------- |
| Button    | primary, secondary, outline, ghost, destructive | sm, md, lg                |
| Card      | default, bordered, elevated                     | padding: none, sm, md, lg |
| Dialog    | —                                               | sm, md, lg, xl, full      |
| Checkbox  | —                                               | sm, md, lg                |
| Badge     | default, primary, success, warning, error       | sm, md, lg                |
| Icon      | —                                               | xs, sm, md, lg, xl        |

Card and Dialog are compound components with sub-components (CardHeader, DialogContent, etc.).

## Skills

This package includes a `use-vue-components` skill for AI-assisted development.

**For package consumers:** Copy the skill to your project to enhance agentic coding:

```bash
cp -r node_modules/@josui/vue/skills/use-vue-components .claude/skills/
```

The skill helps AI assistants correctly use components with proper props, variants, and patterns.
