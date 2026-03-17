# Agent Instructions — @josui/prettier-config

Internal Prettier configuration for the josui monorepo. **Not published to npm.**

## Purpose

Provides shared Prettier settings for all packages and apps in this monorepo. This ensures consistent code formatting across the codebase.

## Structure

- `index.mjs` — Base Prettier config
- `tailwind.mjs` — Config with Tailwind CSS plugin for class sorting

## Usage (monorepo only)

In `package.json` of any package/app:

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

## Important

- This package is private and not published to npm
- External projects consuming @josui packages should use their own Prettier config
- Only packages/ contents are published; config/ is internal tooling
