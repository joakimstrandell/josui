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

## Claude Code Integration

```bash
mkdir -p .claude/skills
cp -r node_modules/@josui/vue/skills/* .claude/skills/
```
