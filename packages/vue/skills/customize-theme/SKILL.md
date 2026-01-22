---
name: customize-theme
description: Customize theming for @josui/vue. Use when asked to change colors, add dark mode, customize theme, or override styles in josui Vue components.
---

# Customize Theme

## CSS Variables

```css
:root {
  --color-primary-500: oklch(0.6 0.2 280);
  --color-primary-600: oklch(0.53 0.18 280);
  --color-gray-100: oklch(0.96 0 0);
  --color-error-500: oklch(0.63 0.26 25);
}
```

## Dark Mode

```css
.dark,
[data-theme='dark'] {
  --color-background: oklch(0.15 0 0);
  --color-foreground: oklch(0.95 0 0);
}
```

## Tailwind Config

```js
// tailwind.config.js
import { colors } from '@josui/tokens';

export default {
  content: ['./src/**/*.{vue,js,ts}', './node_modules/@josui/vue/dist/**/*.js'],
  darkMode: 'class',
  theme: {
    extend: { colors },
  },
};
```

## Component Override

```vue
<Button class="bg-brand-500 hover:bg-brand-600">Custom</Button>
```

## Variables

| Variable            | Purpose                        |
| ------------------- | ------------------------------ |
| `--color-primary-*` | Primary colors (500, 600, 700) |
| `--color-gray-*`    | Neutrals (50-900)              |
| `--color-error-*`   | Error states                   |
| `--radius-*`        | Border radius                  |
