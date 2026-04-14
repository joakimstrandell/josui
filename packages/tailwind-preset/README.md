# @josui/tailwind-preset

Shared Tailwind CSS v4 configuration for Josui components.

## Installation

```bash
pnpm add @josui/tailwind-preset
```

## What's Included

- Tailwind CSS v4 (including Preflight reset)
- Design token CSS variables
- Body defaults (font-family, color, background-color)
- Dark mode via `.dark` class and `prefers-color-scheme`
- Theme view transition animation (iris wipe)

CSS-only package – no build step required.

## Usage

```css
@import "@josui/tailwind-preset";
```

## Further Reading

- [USAGE.md](./USAGE.md) – Detailed setup, dark mode configuration, and what each layer provides
- [DEVELOPMENT.md](./DEVELOPMENT.md) – Package structure
