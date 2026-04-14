# @josui/tailwind-preset

Shared Tailwind CSS v4 configuration for Josui components.

## What's inside

```bash
pnpm add @josui/tailwind-preset
```

- Tailwind CSS v4 (including Preflight reset)
- Design token CSS variables
- Body defaults (font-family, color, background-color)
- Dark mode via `.dark` class and `prefers-color-scheme`
- Theme view transition animation (iris wipe)

```css
@import "@josui/tailwind-preset";
```

CSS-only package – no build step required. See [USAGE.md](./USAGE.md) for dark mode configuration and what each layer provides.

## Development

See [DEVELOPMENT.md](./DEVELOPMENT.md).
