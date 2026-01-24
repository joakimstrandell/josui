# Agent Instructions — @josui/tokens

Design tokens package using Terrazzo CLI with DTCG format.

## Build

```bash
pnpm --filter @josui/tokens build
```

## Token Files

Tokens are in `src/tokens/` as JSON files in DTCG format:

- `colors.json` — OKLCH color palettes (primary, secondary, tertiary, gray, semantic)
- `typography.json` — Font families, sizes, weights
- `spacing.json` — Spacing scale (0-24)
- `radius.json` — Border radius values
- `shadows.json` — Box shadow definitions
- `animation.json` — Duration and easing tokens
- `z-index.json` — Z-index layering scale
- `breakpoints.json` — Responsive breakpoints
- `opacity.json` — Opacity scale

## Adding Tokens

1. Add to the appropriate JSON file in `src/tokens/`
2. Follow DTCG format: `{ "$value": "...", "$type": "..." }`
3. Run `pnpm build` to regenerate outputs
4. Outputs go to `dist/css/variables.css` and `dist/js/index.js`

## Terrazzo Config

Configuration is in `terrazzo.config.mjs`. Modify this to change output formats or plugins.

## Important

This package must build before `tailwind-config`, `react`, and `vue` packages.
