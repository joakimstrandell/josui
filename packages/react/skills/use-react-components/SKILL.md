---
name: use-react-components
description: Use @josui/react components. Use when asked to add, use, or implement josui React components like Button, Card, Input, Badge, Avatar, Alert, or Spinner.
---

# Use @josui/react Components

## Setup

```bash
pnpm add @josui/react
```

```tsx
// App.tsx or main.tsx
import '@josui/react/tailwind.css';
```

## Button

```tsx
import { Button } from '@josui/react';

<Button variant="primary" size="md" isLoading={false}>
  Click me
</Button>

// With icons
<Button leftIcon={<Icon />} rightIcon={<Icon />}>
  With Icons
</Button>
```

| Prop      | Values                                                    |
| --------- | --------------------------------------------------------- |
| variant   | `primary`, `secondary`, `outline`, `ghost`, `destructive` |
| size      | `sm`, `md`, `lg`                                          |
| isLoading | `boolean`                                                 |
| leftIcon  | `ReactNode`                                               |
| rightIcon | `ReactNode`                                               |

## Card

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@josui/react';

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>;
```

## Input

```tsx
import { Input } from '@josui/react';

<Input type="email" placeholder="Enter email" size="md" disabled={false} />;
```

| Prop     | Values           |
| -------- | ---------------- |
| size     | `sm`, `md`, `lg` |
| disabled | `boolean`        |

## Badge

```tsx
import { Badge } from '@josui/react';

<Badge variant="success" size="md">
  Active
</Badge>;
```

| Prop    | Values                                              |
| ------- | --------------------------------------------------- |
| variant | `default`, `primary`, `success`, `warning`, `error` |
| size    | `sm`, `md`, `lg`                                    |

## Avatar

```tsx
import { Avatar } from '@josui/react';

<Avatar src="/user.jpg" alt="User name" size="md" fallback="JD" />;
```

| Prop     | Values           |
| -------- | ---------------- |
| src      | `string`         |
| alt      | `string`         |
| size     | `sm`, `md`, `lg` |
| fallback | `string`         |

## Spinner

```tsx
import { Spinner } from '@josui/react';

<Spinner size="md" />;
```

| Prop | Values           |
| ---- | ---------------- |
| size | `sm`, `md`, `lg` |

## Alert

```tsx
import { Alert } from '@josui/react';

<Alert variant="success" title="Success!">
  Your changes have been saved.
</Alert>;
```

| Prop    | Values                                |
| ------- | ------------------------------------- |
| variant | `info`, `success`, `warning`, `error` |
| title   | `string`                              |

## Typography

```tsx
import { Typography } from '@josui/react';

<Typography variant="h1">Heading</Typography>
<Typography variant="body">Body text</Typography>
```

## Hooks

```tsx
import { useIsTouchDevice, useInteractiveState, useScrollDirection } from '@josui/react';

// Detect touch device
const isTouch = useIsTouchDevice();

// Track scroll direction
const scrollDirection = useScrollDirection(); // 'up' | 'down' | null
```

## TypeScript

```tsx
import { Button, type ButtonProps } from '@josui/react';
import { Card, type CardProps } from '@josui/react';
import { Input, type InputProps } from '@josui/react';
import { Badge, type BadgeProps } from '@josui/react';
import { Avatar, type AvatarProps } from '@josui/react';
import { Spinner, type SpinnerProps } from '@josui/react';
import { Alert, type AlertProps } from '@josui/react';
import { Typography, type TypographyProps } from '@josui/react';
```

## Customization

All components accept `className` for custom styles:

```tsx
<Button className="rounded-full" variant="primary">
  Custom Button
</Button>
```
