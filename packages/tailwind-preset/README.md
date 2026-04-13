# @josui/tailwind-preset

Shared Tailwind CSS v4 configuration for Josui components.

## Installation

```bash
pnpm add @josui/tailwind-preset
```

## Usage

Import in your CSS entry point:

```css
@import "@josui/tailwind";
```

This provides Tailwind CSS v4, design tokens, and sensible body defaults.

## What It Provides

- Tailwind CSS v4 (including Preflight reset)
- Design token CSS variables (from `tokens.css`)
- Body defaults (font-family, color, background-color)
- Dark mode via `.dark` class on `<html>` and `prefers-color-scheme` media query
- Theme view transition animation (iris wipe, scoped to `html.vt-theme`)

## Structure

```
src/
├── index.css       # Main entry (imports tailwindcss + theme + base + animations)
├── theme.css       # Tailwind theme overrides (typography, spacing, etc.)
├── tokens.css      # CSS custom property tokens
├── base.css        # Body defaults (font, color, background)
├── copy.css        # Copy/typography utility classes
└── animations.css  # Keyframes and animation utilities
```

CSS-only package — no build step required.

## Dark Mode

Dark mode tokens are defined in `tokens.css` with two selectors:

- `@media (prefers-color-scheme: dark) { :root:not(.light) { ... } }` — system preference (blocked by `.light` class override)
- `:root.dark { ... }` — explicit class toggle

The `themeState` manager in `@josui/core-web` handles adding/removing `.dark`/`.light` classes.
