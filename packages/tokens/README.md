# @josui/tokens

Design tokens in DTCG format, built with Terrazzo CLI.

## Installation

```bash
pnpm add @josui/tokens
```

## Usage

### CSS Variables

```css
@import '@josui/tokens/css';

.custom {
  color: var(--color-primary-500);
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
}
```

### Tailwind CSS v4

```css
/* Automatically configures Tailwind theme from tokens */
@import '@josui/tokens/tailwind';

/* Then use standard Tailwind classes */
/* bg-primary-500, text-secondary-700, p-4, etc. */
```

### SCSS (Type-Safe)

```scss
@use '@josui/tokens/scss' as tokens;

.custom {
  // Compile-time validated token access
  color: tokens.token('color.primary.500');
  padding: tokens.token('spacing.4');
}
```

### JavaScript

```ts
import token from '@josui/tokens';

// Function-based accessor
const primaryColor = token('color.primary.500');
const spacing = token('spacing.4');
```

## Color System

All colors use OKLCH color space for perceptual uniformity.

| Palette   | Base (500)             | Use Case                 |
| --------- | ---------------------- | ------------------------ |
| Primary   | `oklch(0.85 0.17 72)`  | Warm amber - brand color |
| Secondary | `oklch(0.62 0.26 295)` | Purple - accents         |
| Tertiary  | `oklch(0.6 0.22 260)`  | Blue-violet - highlights |
| Gray      | Neutral scale          | Text, backgrounds        |
| Success   | Green                  | Positive feedback        |
| Warning   | Yellow                 | Caution states           |
| Error     | Red                    | Error states             |
| Info      | Blue                   | Informational            |

Each palette has 11 shades: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950.

## Token Categories

| Category    | Examples                                   | Description            |
| ----------- | ------------------------------------------ | ---------------------- |
| Colors      | `--color-primary-500`                      | OKLCH color palettes   |
| Typography  | `--font-size-base`, `--font-weight-medium` | Font properties        |
| Spacing     | `--spacing-4`                              | 0-96 scale (rem-based) |
| Radius      | `--radius-md`                              | Border radius values   |
| Shadows     | `--shadow-lg`                              | Box shadow definitions |
| Animation   | `--animation-duration-fast`                | Timing values          |
| Z-index     | `--z-index-modal`                          | Layering scale         |
| Breakpoints | `--breakpoint-md`                          | Responsive breakpoints |
| Opacity     | `--opacity-50`                             | Opacity scale          |

## Exports

| Export     | Path                     | Description              |
| ---------- | ------------------------ | ------------------------ |
| JavaScript | `@josui/tokens`          | Token accessor function  |
| CSS        | `@josui/tokens/css`      | CSS custom properties    |
| Tailwind   | `@josui/tokens/tailwind` | Tailwind v4 theme        |
| SCSS       | `@josui/tokens/scss`     | Type-safe SCSS functions |
