# @josui/prettier-config

Shared Prettier configuration for Josui projects.

## Installation

```bash
pnpm add -D @josui/prettier-config prettier
```

## Usage

### Base Config

In your `package.json`:

```json
{
  "prettier": "@josui/prettier-config"
}
```

### With Tailwind CSS

For projects using Tailwind CSS (includes automatic class sorting):

```json
{
  "prettier": "@josui/prettier-config/tailwind"
}
```

## What's Included

- Consistent formatting rules across all Josui packages
- Tailwind CSS plugin for automatic class sorting (in `/tailwind` export)
