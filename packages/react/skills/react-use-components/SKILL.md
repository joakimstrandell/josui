---
name: use-components
description: Use @josui/react components. Use when asked to add, use, or implement josui React components like Button, Card, Input, Badge, Avatar, Alert, or Spinner.
---

# Use Components

## Setup

```bash
npm install @josui/react
```

```tsx
// Import styles in app entry
import '@josui/react/styles.css';
```

## Components

```tsx
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
} from '@josui/react';
```

## Button

```tsx
<Button variant="primary" size="md" isLoading={false} leftIcon={<Icon />}>
  Click me
</Button>
```

Variants: `primary`, `secondary`, `outline`, `ghost`, `destructive`
Sizes: `sm`, `md`, `lg`

## Card

```tsx
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

```tsx
<Input type="email" placeholder="Email" disabled={false} />
```

## TypeScript

All components export prop types:

```tsx
import { Button, type ButtonProps } from '@josui/react';
```
