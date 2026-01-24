---
name: add-token
description: Extend or customize design tokens when using @josui/tokens. Use when asked to add tokens, add colors, add spacing, customize tokens, or override theme values.
---

# Add Design Token

## CSS Custom Properties

Import and override:

```css
@import '@josui/tokens/css';

:root {
  --color-primary-500: oklch(0.85 0.17 72.04);
  --color-brand-500: oklch(0.6 0.2 280);
}
```

## JavaScript Tokens

```ts
import token from '@josui/tokens';

// Access tokens via function
const primaryColor = token('color.primary.500');
const spacing = token('spacing.4');
```

## Tailwind

Extend or override in your CSS using the `@theme` directive:

```css
@theme {
  --color-brand-500: oklch(0.6 0.2 280);
}
```

## Token Patterns

| Type       | CSS Pattern              | Example                       |
| ---------- | ------------------------ | ----------------------------- |
| Color      | `--color-{name}-{shade}` | `--color-primary-500`         |
| Spacing    | `--spacing-{size}`       | `--spacing-4`                 |
| Radius     | `--radius-{size}`        | `--radius-md`                 |
| Z-index    | `--z-index-{name}`       | `--z-index-modal`             |
| Animation  | `--animation-*`          | `--animation-duration-normal` |
| Breakpoint | `--breakpoint-{size}`    | `--breakpoint-md`             |
| Opacity    | `--opacity-{value}`      | `--opacity-50`                |
