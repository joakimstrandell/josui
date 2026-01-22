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
  --color-primary-500: oklch(0.6 0.2 280);
  --color-brand-500: oklch(0.53 0.19 250);
}
```

## JavaScript Tokens

```ts
import { colors, spacing } from '@josui/tokens';

const customTheme = {
  colors: {
    ...colors,
    brand: { 500: 'oklch(0.53 0.19 250)' },
  },
};
```

## Tailwind

```js
// tailwind.config.js
import { colors } from '@josui/tokens';

export default {
  theme: {
    extend: {
      colors: { ...colors, brand: { 500: 'oklch(0.53 0.19 250)' } },
    },
  },
};
```

## Token Patterns

| Type    | CSS Pattern              | Example               |
| ------- | ------------------------ | --------------------- |
| Color   | `--color-{name}-{shade}` | `--color-primary-500` |
| Spacing | `--spacing-{size}`       | `--spacing-4`         |
| Radius  | `--radius-{size}`        | `--radius-md`         |
