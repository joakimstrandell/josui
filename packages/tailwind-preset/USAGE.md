# @josui/tailwind-preset – Usage

## CSS Import

Import in your CSS entry point:

```css
@import "@josui/tailwind-preset";
```

This single import provides Tailwind CSS v4, design tokens, and sensible body defaults.

## What It Provides

- **Tailwind CSS v4** – Full framework including Preflight reset
- **Design tokens** – CSS custom property tokens (from `tokens.css`)
- **Body defaults** – font-family, color, background-color (from `base.css`)
- **Dark mode** – `.dark` class on `<html>` and `prefers-color-scheme` media query
- **Theme view transition** – Iris wipe animation, scoped to `html.vt-theme`

## Dark Mode

Dark mode tokens are defined in `tokens.css` with two selectors:

- `@media (prefers-color-scheme: dark) { :root:not(.light) { ... } }` – system preference (blocked by `.light` class override)
- `:root.dark { ... }` – explicit class toggle

The `themeState` manager in `@josui/core-web` handles adding/removing `.dark` / `.light` classes.
