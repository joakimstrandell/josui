---
name: add-token
description: Extend or customize design tokens when using @josui/tokens. Use when asked to add tokens, add colors, add spacing, customize tokens, or override theme values.
---

# Add Design Token

## Adding Tokens to Source (Preferred)

Add tokens directly to `packages/tokens/src/tokens/*.json` using DTCG format:

```json
// colors.json - add a new color
{
  "color": {
    "brand": {
      "500": {
        "$value": { "colorSpace": "oklch", "components": [0.6, 0.2, 280] },
        "$description": "Brand accent color"
      }
    }
  }
}

// spacing.json - add a new spacing value
{
  "spacing": {
    "18": {
      "$value": { "value": 4.5, "unit": "rem" },
      "$description": "72px spacing"
    }
  }
}
```

Then rebuild: `pnpm --filter @josui/tokens build`

## CSS Custom Properties Override

Import and override at runtime:

```css
@import '@josui/tokens/css';

:root {
  --color-primary-500: oklch(0.85 0.17 72.04);
  --color-brand-500: oklch(0.6 0.2 280);
}
```

## SCSS (Type-Safe)

```scss
@use '@josui/tokens/scss' as tokens;

.custom {
  // Validated at compile time
  color: tokens.token('color.primary.500');
  padding: tokens.token('spacing.4');
}
```

## JavaScript

```ts
import token from '@josui/tokens';

const primaryColor = token('color.primary.500');
const spacing = token('spacing.4');
```

## Tailwind Override

Extend or override using `@theme`:

```css
@import '@josui/tokens/tailwind';

@theme {
  --color-brand-500: oklch(0.6 0.2 280);
}
```

## Token Patterns

| Type       | CSS Variable             | DTCG Path              |
| ---------- | ------------------------ | ---------------------- |
| Color      | `--color-{name}-{shade}` | `color.{name}.{shade}` |
| Spacing    | `--spacing-{size}`       | `spacing.{size}`       |
| Radius     | `--radius-{size}`        | `radius.{size}`        |
| Shadow     | `--shadow-{size}`        | `shadow.{size}`        |
| Z-index    | `--z-index-{name}`       | `z-index.{name}`       |
| Duration   | `--animation-duration-*` | `animation.duration.*` |
| Easing     | `--animation-easing-*`   | `animation.easing.*`   |
| Breakpoint | `--breakpoint-{size}`    | `breakpoint.{size}`    |
| Opacity    | `--opacity-{value}`      | `opacity.{value}`      |
