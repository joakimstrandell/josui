# @josui/tokens

Design tokens in DTCG format, built with Terrazzo CLI. Supports light/dark theming.

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
@import 'tailwindcss';
@import '@josui/tokens/tailwind';

/* Then use standard Tailwind classes */
/* bg-primary-500, text-secondary-700, p-4, etc. */
```

> **Note:** The tokens export does not include `@import 'tailwindcss'` - you must import Tailwind separately. This allows you to control the import order and disable default Tailwind colors if needed.

### Tailwind No-Prefix Tokens (Contributor Note)

In `terrazzo.config.mjs`, the Tailwind theme key `'*'` is used as a no-prefix marker.

- Example: `'*': ['animation.easing.*']`
- Terrazzo emits variables like `--*-linear`
- Post-build normalization rewrites them to `--linear` in `dist/tailwind/theme.css`

This keeps the config explicit while producing unprefixed CSS variable names in the final output.

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
import { token } from '@josui/tokens';

// Function-based accessor
const primaryColor = token('color.primary.500');
const spacing = token('spacing.4');

// Access mode-specific values
const darkBg = token('color.background', 'dark');
const lightBg = token('color.background', 'light');
```

## Theming (Light/Dark Mode)

Tokens support automatic light/dark theming via system preference and manual toggle.

### Automatic (System Preference)

```html
<!-- Respects prefers-color-scheme automatically -->
<html>
  <body>
    ...
  </body>
</html>
```

### Manual Toggle

```html
<!-- Force dark mode -->
<html data-theme="dark">
  <!-- or -->
  <html class="dark">
    <!-- Force light mode -->
    <html data-theme="light">
      <!-- or -->
      <html class="light"></html>
    </html>
  </html>
</html>
```

### Semantic Tokens

These tokens automatically adapt to light/dark mode:

| Token                            | Light       | Dark       | Use Case            |
| -------------------------------- | ----------- | ---------- | ------------------- |
| `--color-background`             | White       | Near black | Page background     |
| `--color-foreground`             | Near black  | Near white | Primary text        |
| `--color-card-background`        | White       | Near black | Card surfaces       |
| `--color-popover-background`     | White       | Near black | Popover surfaces    |
| `--color-muted-background`       | Light gray  | Dark gray  | Muted backgrounds   |
| `--color-accent-background`      | Light gray  | Dark gray  | Highlighted content |
| `--color-destructive-background` | Red         | Darker red | Destructive actions |
| `--color-success-background`     | Light green | Dark green | Success alerts      |
| `--color-warning-background`     | Light amber | Dark amber | Warning alerts      |
| `--color-error-background`       | Light red   | Dark red   | Error alerts        |
| `--color-info-background`        | Light blue  | Dark blue  | Info alerts         |
| `--color-border`                 | Light gray  | Dark gray  | Borders             |
| `--color-input`                  | Light gray  | Dark gray  | Input borders       |
| `--color-ring`                   | Primary     | Primary    | Focus rings         |

Each semantic token has a `-foreground` variant for text (e.g., `--color-card-foreground`, `--color-success-foreground`).

## Color System

All colors use OKLCH color space for perceptual uniformity.

### Primitive Palettes

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

| Category    | Examples                                      | Description            |
| ----------- | --------------------------------------------- | ---------------------- |
| Colors      | `--color-primary-500`                         | OKLCH color palettes   |
| Typography  | `--font-size-default`, `--font-weight-medium` | Font properties        |
| Spacing     | `--spacing-4`                                 | 0-96 scale (rem-based) |
| Radius      | `--radius-md`                                 | Border radius values   |
| Shadows     | `--shadow-lg`                                 | Box shadow definitions |
| Animation   | `--animation-duration-fast`                   | Timing values          |
| Z-index     | `--z-index-modal`                             | Layering scale         |
| Breakpoints | `--breakpoint-md`                             | Responsive breakpoints |
| Opacity     | `--opacity-50`                                | Opacity scale          |

## Exports

| Export     | Path                     | Description              |
| ---------- | ------------------------ | ------------------------ |
| JavaScript | `@josui/tokens`          | Token accessor function  |
| CSS        | `@josui/tokens/css`      | CSS custom properties    |
| Tailwind   | `@josui/tokens/tailwind` | Tailwind v4 theme        |
| SCSS       | `@josui/tokens/scss`     | Type-safe SCSS functions |

## AI-Assisted Development

This package includes a skill for AI coding assistants. Copy it to your project:

```bash
cp -r node_modules/@josui/tokens/skills/add-token .claude/skills/
```

The skill helps AI assistants correctly add and customize design tokens.
