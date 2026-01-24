# Agent Instructions — @josui/vue

Vue 3 component library using SCSS and CSS custom properties from `@josui/tokens`.

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
- Use scoped SCSS with `@use '../../styles/tokens' as *`
- BEM naming: `josui-component`, `josui-component--variant`, `josui-component__element`

## reka-ui

Components requiring complex accessibility use [reka-ui](https://reka-ui.com) primitives:

| Component | reka-ui Primitives                                                                                  |
| --------- | --------------------------------------------------------------------------------------------------- |
| Dialog    | DialogRoot, DialogPortal, DialogOverlay, DialogContent, DialogTitle, DialogDescription, DialogClose |
| Checkbox  | CheckboxRoot, CheckboxIndicator                                                                     |

Button, Card, Badge, Icon are custom implementations (no reka-ui).

## Styling

Import shared utilities in component `<style>`:

```scss
@use '../../styles/tokens' as *;

.josui-button {
  background-color: color('primary-500');
  padding: spacing('2') spacing('4');
  border-radius: radius('md');
  @include transition-colors;
  @include focus-visible-ring;
}
```

### Functions

| Function               | Example                 | Output                             |
| ---------------------- | ----------------------- | ---------------------------------- |
| `color($name)`         | `color('primary-500')`  | `var(--color-primary-500)`         |
| `spacing($scale)`      | `spacing('4')`          | `var(--spacing-4)`                 |
| `radius($size)`        | `radius('md')`          | `var(--radius-md)`                 |
| `shadow($size)`        | `shadow('md')`          | `var(--shadow-md)`                 |
| `font-size($size)`     | `font-size('sm')`       | `var(--font-size-sm)`              |
| `font-weight($weight)` | `font-weight('medium')` | `var(--font-weight-medium)`        |
| `duration($speed)`     | `duration('fast')`      | `var(--animation-duration-fast)`   |
| `easing($type)`        | `easing('ease-out')`    | `var(--animation-easing-ease-out)` |
| `z-index($layer)`      | `z-index('modal')`      | `var(--z-index-modal)`             |

### Mixins

| Mixin                        | Purpose                                |
| ---------------------------- | -------------------------------------- |
| `focus-ring($color)`         | Focus outline                          |
| `focus-visible-ring($color)` | Focus outline on keyboard only         |
| `disabled-state`             | Opacity + no pointer events            |
| `transition-colors`          | Color property transitions             |
| `transition-all`             | Common property transitions            |
| `interactive-base`           | Cursor, transitions, disabled handling |
| `visually-hidden`            | Screen reader only                     |
| `reset-button`               | Reset native button styles             |

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
