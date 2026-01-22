---
name: use-components
description: Use @josui/vue components. Use when asked to add, use, or implement josui Vue components like Button, Card, Input, Badge, Avatar, Alert, or Spinner.
---

# Use Components

## Setup

```bash
npm install @josui/vue
```

```ts
// main.ts
import '@josui/vue/styles.css';
```

## Components

```vue
<script setup lang="ts">
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
  Badge,
  Avatar,
  Spinner,
  Alert,
} from '@josui/vue';
</script>
```

## Button

```vue
<Button variant="primary" size="md" :is-loading="false">
  <template #leftIcon><Icon /></template>
  Click me
</Button>
```

Variants: `primary`, `secondary`, `outline`, `ghost`, `destructive`
Sizes: `sm`, `md`, `lg`

## Card

```vue
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
```

## Input

```vue
<Input v-model="value" type="email" placeholder="Email" :disabled="false" />
```

## TypeScript

```ts
import { Button, type ButtonProps } from '@josui/vue';
```
