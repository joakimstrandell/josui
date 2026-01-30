# Agent Instructions — @josui/tokens

Design tokens package using Terrazzo CLI with DTCG format. Supports light/dark theming.

**Before modifying tokens, read [ARCHITECTURE.md](./ARCHITECTURE.md) for design decisions and constraints.**

## Build

```bash
pnpm --filter @josui/tokens build
```

Outputs:

- `dist/css/variables.css` — CSS custom properties with light/dark mode support
- `dist/js/index.js` — JavaScript accessor function with mode parameter
- `dist/tailwind/theme.css` — Tailwind v4 theme configuration
- `dist/scss/index.scss` — Type-safe SCSS token function

## Token Files

Tokens are in `src/tokens/` as JSON files in strict DTCG object format:

| File              | Contents                                                            |
| ----------------- | ------------------------------------------------------------------- |
| `color.json`      | OKLCH color palettes (primary, secondary, tertiary, gray, semantic) |
| `font.json`       | Font families, sizes, weights, line-height, tracking                |
| `spacing.json`    | Spacing scale (0-96)                                                |
| `radius.json`     | Border radius values                                                |
| `shadow.json`     | Box shadow definitions                                              |
| `animation.json`  | Duration and easing tokens                                          |
| `z-index.json`    | Z-index layering scale                                              |
| `breakpoint.json` | Responsive breakpoints                                              |

## Theming (Light/Dark Mode)

Semantic color tokens support light and dark modes via `$extensions.mode`:

**Semantic tokens with modes:**

- `background`, `foreground` — Page background/text
- `card.background`, `card.foreground` — Card surfaces
- `popover.background`, `popover.foreground` — Popover surfaces
- `muted.background`, `muted.foreground` — Muted/secondary content
- `accent.background`, `accent.foreground` — Highlighted content
- `destructive.background`, `destructive.foreground` — Destructive actions
- `success.background`, `success.foreground` — Success states
- `warning.background`, `warning.foreground` — Warning states
- `error.background`, `error.foreground` — Error states
- `info.background`, `info.foreground` — Info states
- `border`, `input`, `ring` — Borders and focus states

**Note:** Semantic tokens are nested under their group (e.g., `card.background` → `--color-card-background`).

**Token references:** Semantic tokens use `{path.to.token}` syntax to reference other tokens:

- `"{color.background}"` — References the base background token
- `"{color.gray.50}"` — References a primitive palette value
- `"{color.error.500}"` — References an error palette shade

**CSS activation:**

```css
/* System preference (automatic) */
@media (prefers-color-scheme: dark) { ... }

/* Manual toggle */
[data-theme="dark"] { ... }
.dark { ... }
```

**Usage in HTML:**

```html
<!-- System preference (default) -->
<html>
  <!-- Force light mode -->
  <html data-theme="light">
    <html class="light">
      <!-- Force dark mode -->
      <html data-theme="dark">
        <html class="dark"></html>
      </html>
    </html>
  </html>
</html>
```

**JavaScript access:**

```js
import { token } from '@josui/tokens';
token('color.background'); // Default value
token('color.background', 'light'); // Light mode value
token('color.background', 'dark'); // Dark mode value
```

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

// Colors with modes - use $extensions.mode
{
  "color": {
    "$type": "color",
    "background": {
      "$value": { "colorSpace": "oklch", "components": [1, 0, 0] },
      "$description": "Default background",
      "$extensions": {
        "mode": {
          "light": { "colorSpace": "oklch", "components": [1, 0, 0] },
          "dark": { "colorSpace": "oklch", "components": [0.13, 0, 0] }
        }
      }
    }
  }
}

// Token references - semantic tokens can reference other tokens
{
  "color": {
    "$type": "color",
    "card": {
      "background": {
        "$value": "{color.background}",
        "$description": "Card background",
        "$extensions": {
          "mode": {
            "light": "{color.background}",
            "dark": "{color.background}"
          }
        }
      },
      "foreground": {
        "$value": "{color.foreground}",
        "$description": "Card foreground text",
        "$extensions": {
          "mode": {
            "light": "{color.foreground}",
            "dark": "{color.foreground}"
          }
        }
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
3. For semantic tokens that should change between themes, add `$extensions.mode`
4. Run `pnpm build` to regenerate outputs
5. Update `terrazzo.config.mjs` if adding new token categories

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

## Skills

This package includes an `add-token` skill for AI-assisted token management.

**For package consumers:** Copy the skill to your project to enhance agentic coding:

```bash
cp -r node_modules/@josui/tokens/skills/add-token .claude/skills/
```

The skill helps AI assistants correctly add and customize design tokens using DTCG format.
