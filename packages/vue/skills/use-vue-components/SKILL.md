---
name: use-vue-components
description: Use @josui/vue components. Use when asked to add, use, or implement josui Vue components like Button, Card, Dialog, Checkbox, Badge, or Icon.
---

# Use @josui/vue Components

## Setup

```bash
pnpm add @josui/vue @josui/scss
```

```ts
// main.ts
import '@josui/scss';
```

## Button

```vue
<script setup>
import { Button } from '@josui/vue';
</script>

<template>
  <Button variant="primary" size="md" :isLoading="false">Click me</Button>
</template>
```

| Prop      | Values                                                    |
| --------- | --------------------------------------------------------- |
| variant   | `primary`, `secondary`, `outline`, `ghost`, `destructive` |
| size      | `sm`, `md`, `lg`                                          |
| isLoading | `boolean`                                                 |
| disabled  | `boolean`                                                 |
| type      | `button`, `submit`, `reset`                               |

Slots: `default`, `icon` (left), `iconRight`

## Card

```vue
<script setup>
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@josui/vue';
</script>

<template>
  <Card variant="default" padding="md">
    <CardHeader>
      <CardTitle as="h2">Title</CardTitle>
      <CardDescription>Description</CardDescription>
    </CardHeader>
    <CardContent>Content</CardContent>
    <CardFooter>Footer</CardFooter>
  </Card>
</template>
```

| Prop    | Values                            |
| ------- | --------------------------------- |
| variant | `default`, `bordered`, `elevated` |
| padding | `none`, `sm`, `md`, `lg`          |

## Dialog

```vue
<script setup>
import { ref } from 'vue';
import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Button,
} from '@josui/vue';

const open = ref(false);
</script>

<template>
  <Button @click="open = true">Open</Button>

  <Dialog v-model:open="open">
    <DialogOverlay />
    <DialogContent size="md">
      <DialogClose />
      <DialogHeader>
        <DialogTitle>Title</DialogTitle>
        <DialogDescription>Description</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="outline" @click="open = false">Cancel</Button>
        <Button @click="open = false">Confirm</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
```

DialogContent sizes: `sm`, `md`, `lg`, `xl`, `full`

## Checkbox

```vue
<script setup>
import { ref } from 'vue';
import { Checkbox } from '@josui/vue';

const checked = ref(false);
</script>

<template>
  <label>
    <Checkbox v-model="checked" size="md" />
    Accept terms
  </label>
</template>
```

| Prop       | Values                         |
| ---------- | ------------------------------ |
| modelValue | `boolean` or `'indeterminate'` |
| size       | `sm`, `md`, `lg`               |
| disabled   | `boolean`                      |
| id         | `string`                       |
| name       | `string`                       |
| required   | `boolean`                      |

## Badge

```vue
<script setup>
import { Badge } from '@josui/vue';
</script>

<template>
  <Badge variant="success" size="md">Active</Badge>
</template>
```

| Prop    | Values                                              |
| ------- | --------------------------------------------------- |
| variant | `default`, `primary`, `success`, `warning`, `error` |
| size    | `sm`, `md`, `lg`                                    |

## Icon

Requires `lucide-vue-next`:

```bash
pnpm add lucide-vue-next
```

```vue
<script setup>
import { Icon } from '@josui/vue';
import { Check, X, AlertCircle } from 'lucide-vue-next';
</script>

<template>
  <Icon :icon="Check" size="md" color="success" label="Completed" />
</template>
```

| Prop  | Values                                                      |
| ----- | ----------------------------------------------------------- |
| icon  | Lucide component (required)                                 |
| size  | `xs`, `sm`, `md`, `lg`, `xl`                                |
| color | `current`, `primary`, `gray`, `success`, `warning`, `error` |
| label | `string` (for accessibility, omit for decorative icons)     |

## TypeScript

```ts
import { Button, type ButtonProps } from '@josui/vue';
import { Card, type CardProps } from '@josui/vue';
import { Dialog, type DialogProps } from '@josui/vue';
import { Checkbox, type CheckboxProps } from '@josui/vue';
import { Badge, type BadgeProps } from '@josui/vue';
import { Icon, type IconProps } from '@josui/vue';
```
