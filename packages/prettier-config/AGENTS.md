# Agent Instructions — @josui/prettier-config

Shared Prettier configuration for the Josui monorepo.

## Structure

- `index.mjs` — Base Prettier config
- `tailwind.mjs` — Config with Tailwind CSS plugin for class sorting

## Usage

In `package.json`:

```json
{
  "prettier": "@josui/prettier-config"
}
```

Or for Tailwind projects:

```json
{
  "prettier": "@josui/prettier-config/tailwind"
}
```

## Guidelines

- No build step required (ships raw `.mjs` files)
- Keep configs minimal and focused
- Tailwind config includes `prettier-plugin-tailwindcss` for class sorting
