# Josui Design System

A multi-framework design system monorepo built with Turborepo and pnpm.

## Packages

| Package | Description |
|---------|-------------|
| `@josui/tokens` | Design tokens in DTCG format, outputs CSS variables and JS/TS |
| `@josui/tailwind-config` | Tailwind CSS v4 configuration with shared theme |
| `@josui/react` | React component library |
| `@josui/vue` | Vue 3 component library |

## Components

Both React and Vue packages include these components with identical APIs:

- **Button** — primary, secondary, outline, ghost, destructive variants
- **Input** — with label, error, hint, and addon support
- **Card** — with header, title, description, content, and footer subcomponents
- **Badge** — status indicators
- **Typography** — h1-h6, body, caption with weight and color props
- **Avatar** — image with fallback initials
- **Spinner** — loading indicator
- **Alert** — info, success, warning, error messages

## Quick Start

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Start Storybook (React)
pnpm --filter @josui/storybook-react dev

# Start Storybook (Vue)
pnpm --filter @josui/storybook-vue dev
```

## Installation

```bash
# React
pnpm add @josui/react @josui/tailwind-config

# Vue
pnpm add @josui/vue @josui/tailwind-config
```

### Setup Tailwind

Import the shared styles in your CSS entry point:

```css
@import "@josui/tailwind-config/styles.css";
```

### Usage

```tsx
// React
import { Button, Card, CardHeader, CardTitle, CardContent } from '@josui/react';

function App() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hello</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="primary">Click me</Button>
      </CardContent>
    </Card>
  );
}
```

```vue
<!-- Vue -->
<script setup>
import { Button, Card, CardHeader, CardTitle, CardContent } from '@josui/vue';
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Hello</CardTitle>
    </CardHeader>
    <CardContent>
      <Button variant="primary">Click me</Button>
    </CardContent>
  </Card>
</template>
```

## Design Tokens

Tokens are defined in DTCG format and built with Style Dictionary v5:

- **Colors** — OKLCH format for perceptual uniformity
- **Typography** — Inter (sans), JetBrains Mono (mono)
- **Spacing** — 0-24 scale
- **Radius** — none to full
- **Shadows** — sm to xl

### Using tokens directly

```css
/* CSS variables */
@import "@josui/tokens/css";

.custom {
  color: var(--color-primary-500);
  padding: var(--spacing-4);
}
```

```ts
// JavaScript
import { tokens } from '@josui/tokens';

console.log(tokens['color-primary-500']); // oklch(0.53 0.19 250)
```

## Project Structure

```
josui/
├── apps/
│   ├── storybook-react/    # React component docs
│   ├── storybook-vue/      # Vue component docs
│   └── docs/               # Landing page
├── packages/
│   ├── tokens/             # Design tokens
│   ├── tailwind-config/    # Tailwind v4 config
│   ├── react/              # React components
│   └── vue/                # Vue components
├── turbo.json              # Build orchestration
└── pnpm-workspace.yaml     # Workspace config
```

## Tech Stack

- [Turborepo](https://turbo.build/) — Monorepo build system
- [pnpm](https://pnpm.io/) — Package manager
- [Style Dictionary](https://styledictionary.com/) v5 — Token transformation
- [Tailwind CSS](https://tailwindcss.com/) v4 — Utility-first CSS
- [Storybook](https://storybook.js.org/) — Component documentation
- [tsup](https://tsup.egoist.dev/) — TypeScript bundler
- [Changesets](https://github.com/changesets/changesets) — Version management

## Development

```bash
# Build tokens (required first)
pnpm --filter @josui/tokens build

# Build all packages
pnpm build

# Run all dev servers
pnpm dev

# Create a changeset for publishing
pnpm changeset
```

## License

MIT
