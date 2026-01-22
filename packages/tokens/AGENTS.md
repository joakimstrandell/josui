# Agent Instructions — @josui/tokens

Design tokens package using Style Dictionary v5 with DTCG format.

## Build

```bash
pnpm --filter @josui/tokens build
```

## Token Files

Tokens are in `src/tokens/` as JSON files in DTCG format:

- `colors.json` — OKLCH color palettes
- `typography.json` — Font families, sizes, weights
- `spacing.json` — Spacing scale (0-24)
- `radius.json` — Border radius values
- `shadows.json` — Box shadow definitions

## Adding Tokens

1. Add to the appropriate JSON file in `src/tokens/`
2. Follow DTCG format: `{ "$value": "...", "$type": "..." }`
3. Run `pnpm build` to regenerate outputs
4. Outputs go to `dist/css/variables.css` and `dist/js/index.js`

## Style Dictionary Config

Configuration is in `style-dictionary.config.ts`. Modify this to change output formats or transformations.

## Important

This package must build before `tailwind-config`, `react`, and `vue` packages.
