# @josui/vue

Vue 3 component library for the Josui design system.

> **Note:** This package is a proof of concept. It will be refactored to use SCSS instead of Tailwind CSS to demonstrate how design tokens can be centralized and consumed in different styling approaches.

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
