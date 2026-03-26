# Agent Instructions — @josui/tailwind-preset

Tailwind CSS v4 configuration package.

## Structure

```
src/
├── index.css       # Main entry (imports tailwindcss + theme + base + animations)
├── theme.css       # Token definitions via @josui/tokens/tailwind
├── tokens.css      # CSS custom property tokens
├── base.css        # Body defaults (font, color, background)
└── animations.css  # Keyframes and animation utilities (uses tailwindcss-animate plugin)
```

## Usage

This is a CSS-only package. No build step required.

Consumers import via:

```css
@import '@josui/tailwind-preset';
```

This provides:

- Tailwind CSS v4 (including Preflight reset)
- Design token theme from `@josui/tokens`
- Body defaults (font-family, color, background-color)

## Modifying Styles

1. Edit files in `src/`
2. Test in `apps/storybook-react` to verify changes
3. Tailwind v4 uses CSS-first configuration via `@theme`

## Dependencies

Requires `@josui/tokens` to be built first for CSS variables.
