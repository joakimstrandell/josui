# @josui/vue

Vue components for josui.

## Installation

```bash
npm install @josui/vue
```

## Usage

```vue
<script setup>
import { Button, Card } from '@josui/vue';
import '@josui/vue/styles.css';
</script>

<template>
  <Card>
    <Button variant="primary">Click me</Button>
  </Card>
</template>
```

## Claude Code Integration

This package includes skills for Claude Code to help you use the components.

To set up:

```bash
mkdir -p .claude/skills
cp -r node_modules/@josui/vue/skills/* .claude/skills/
```

The skills will help Claude understand how to use josui components in your project.
