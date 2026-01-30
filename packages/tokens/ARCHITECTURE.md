# Architecture — @josui/tokens

Design decisions and constraints for the token system.

## Design Principles

### No trivial value tokens

Don't create tokens where the value is a direct representation of the name. Tokens must add either:

1. **Semantic meaning** - the name describes purpose, not value
2. **Centralized control** - the value might reasonably change

**Good tokens:**

- `--color-primary-500: oklch(0.85 0.17 72)` - value not obvious from name
- `--spacing-4: 1rem` - establishes a scale convention
- `--z-index-modal: 50` - semantic name, value could change

**Tokens to avoid:**

- `--opacity-50: 0.5` - name encodes the value
- `--opacity-75: 0.75` - same issue

This also prevents conflicts with framework features. For example, custom opacity tokens broke Tailwind's `color-mix()` alpha modifiers because `bg-primary-500/50` resolved to `var(--opacity-50)` (decimal) instead of `50%` (percentage).

### Use `@theme` not `@theme inline`

Tailwind v4's `@theme inline` inlines values directly into utilities without creating CSS variables. This breaks semantic tokens that use `var()` references:

```css
@theme inline {
  --color-info-50: oklch(0.97 0.02 230);
  --color-info-background: var(--color-info-50); /* Broken - var never emitted */
}
```

We use `@theme` (non-inline) so:

- Semantic tokens using `var()` references resolve correctly
- CSS variables are available at runtime for custom CSS
- Alpha modifiers work via `color-mix(in oklab, var(--color-*) 50%, transparent)`

The `@theme inline` approach was removed from this package because it cannot work with semantic token references.

## Build Pipeline

```
src/tokens/*.json (DTCG format)
        ↓
   Terrazzo CLI
        ↓
┌───────────────────────────────┐
│ dist/css/variables.css        │ ← CSS custom properties
│ dist/js/index.js              │ ← JavaScript accessor
│ dist/tailwind/theme.css       │ ← Tailwind @theme block
│ dist/scss/index.scss          │ ← SCSS token function
└───────────────────────────────┘
```

## Color System

All colors use OKLCH color space for:

- Perceptually uniform lightness
- Wide gamut support
- Predictable color manipulation

Semantic tokens reference primitive palette values and switch between light/dark modes via `$extensions.mode`.

## Tailwind Integration

The Tailwind theme maps token categories to Tailwind namespaces:

| Token Category  | Tailwind Namespace |
| --------------- | ------------------ |
| `color.*`       | `--color-*`        |
| `font.family.*` | `--fontFamily-*`   |
| `spacing.*`     | `--spacing-*`      |
| `radius.*`      | `--borderRadius-*` |
| `shadow.*`      | `--boxShadow-*`    |
| `z-index.*`     | `--zIndex-*`       |

Alpha modifiers (`bg-primary-500/50`) work because Tailwind v4 uses `color-mix()` which handles CSS variables correctly.
