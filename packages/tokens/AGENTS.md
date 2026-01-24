# Agent Instructions — @josui/tokens

Design tokens package using Terrazzo CLI with DTCG format.

## Build

```bash
pnpm --filter @josui/tokens build
```

Outputs:

- `dist/css/variables.css` — CSS custom properties
- `dist/js/index.js` — JavaScript accessor function
- `dist/tailwind/theme.css` — Tailwind v4 theme configuration
- `dist/scss/index.scss` — Type-safe SCSS token function

## Token Files

Tokens are in `src/tokens/` as JSON files in strict DTCG object format:

| File               | Contents                                                            |
| ------------------ | ------------------------------------------------------------------- |
| `colors.json`      | OKLCH color palettes (primary, secondary, tertiary, gray, semantic) |
| `typography.json`  | Font families, sizes, weights, line-height, tracking                |
| `spacing.json`     | Spacing scale (0-96)                                                |
| `radius.json`      | Border radius values                                                |
| `shadows.json`     | Box shadow definitions                                              |
| `animation.json`   | Duration and easing tokens                                          |
| `z-index.json`     | Z-index layering scale                                              |
| `breakpoints.json` | Responsive breakpoints                                              |
| `opacity.json`     | Opacity scale                                                       |

## DTCG Format

Tokens use strict DTCG object format (not shorthand strings):

```json
// Colors - use colorSpace and components
{
  "color": {
    "$type": "color",
    "primary": {
      "500": {
        "$value": { "colorSpace": "oklch", "components": [0.85, 0.17, 72] },
        "$description": "Primary brand color"
      }
    }
  }
}

// Dimensions - use value and unit
{
  "spacing": {
    "$type": "dimension",
    "4": {
      "$value": { "value": 1, "unit": "rem" },
      "$description": "16px spacing"
    }
  }
}

// Durations - use value and unit
{
  "animation": {
    "duration": {
      "$type": "duration",
      "fast": {
        "$value": { "value": 100, "unit": "ms" }
      }
    }
  }
}
```

## Adding Tokens

1. Add to the appropriate JSON file in `src/tokens/`
2. Use strict DTCG object format (see examples above)
3. Run `pnpm build` to regenerate outputs
4. Update `terrazzo.config.mjs` if adding new token categories

## Terrazzo Config

Configuration is in `terrazzo.config.mjs`:

- **CSS plugin** — Generates CSS custom properties
- **JS plugin** — Generates JavaScript accessor and TypeScript types
- **Tailwind plugin** — Generates Tailwind v4 `@theme` configuration
- **Sass plugin** — Generates type-safe SCSS `token()` function

## Exports

| Export     | Import Path              | Use Case                      |
| ---------- | ------------------------ | ----------------------------- |
| JavaScript | `@josui/tokens`          | Runtime token access          |
| CSS        | `@josui/tokens/css`      | Direct CSS variable usage     |
| Tailwind   | `@josui/tokens/tailwind` | Tailwind v4 theme             |
| SCSS       | `@josui/tokens/scss`     | Type-safe SCSS with `token()` |

## Integration with @josui/scss

The `@josui/scss` package uses the SCSS export for type-safe token access:

```scss
@use '@josui/tokens/scss' as tokens;

.example {
  color: tokens.token('color.primary.500');
}
```

Invalid token names cause compile-time errors, not runtime CSS variable failures.

## Dependencies

This package must build before:

- `@josui/tailwind-config` (imports `@josui/tokens/tailwind`)
- `@josui/scss` (imports `@josui/tokens/scss`)
- `@josui/react` and `@josui/vue` (use tokens via CSS/SCSS)
