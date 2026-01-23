# @josui/vue

Vue 3 component library for the Josui design system.

## Installation

```bash
pnpm add @josui/vue @josui/tailwind-config
```

## Setup

```css
@import '@josui/tailwind-config/styles.css';
```

## Usage

```vue
<script setup>
import { Button, Card, CardContent } from '@josui/vue';
</script>

<template>
  <Card>
    <CardContent>
      <Button variant="primary">Click me</Button>
    </CardContent>
  </Card>
</template>
```

## Components

Button, Input, Card, Badge, Typography, Avatar, Spinner, Alert

## Importing Source Files

For projects with their own build setup, you can import TypeScript source directly:

```ts
import { Button } from '@josui/vue/src';
```

This enables better tree-shaking and lets your bundler optimize the code.

## Development

```bash
pnpm --filter @josui/vue build       # Build
pnpm --filter @josui/vue test        # Run tests
pnpm --filter @josui/vue test:watch  # Run tests in watch mode
```

## Claude Code Integration

```bash
mkdir -p .claude/skills
cp -r node_modules/@josui/vue/skills/* .claude/skills/
```
