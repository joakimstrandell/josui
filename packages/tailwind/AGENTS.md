# Agent Instructions — @josui/tailwind

Tailwind CSS v4 configuration package.

## Structure

- `styles.css` — Main stylesheet with `@theme` directive
- Imports tokens from `@josui/tokens`

## Usage

This is a CSS-only package. No build step required.

Consumers import via:

```css
@import '@josui/tailwind/styles.css';
```

## Modifying Styles

1. Edit `styles.css`
2. Test in a Storybook app to verify changes
3. Tailwind v4 uses CSS-first configuration via `@theme`

## Dependencies

Requires `@josui/tokens` to be built first for CSS variables.
