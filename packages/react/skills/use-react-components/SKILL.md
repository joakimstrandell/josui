---
name: use-react-components
description: Use @josui/react components. Use when asked to add, use, or implement josui React components like Button, Card, Input, Badge, Avatar, Alert, Spinner, Typography, CustomCursor, or CellGrid.
---

# Use @josui/react Components

## Setup

```bash
pnpm add @josui/react @josui/tailwind
```

```css
/* styles.css */
@import '@josui/tailwind';
@source '../node_modules/@josui/react/dist';
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

## CustomCursor

Custom cursor that follows the mouse. Automatically hidden on touch devices.

```tsx
import { CustomCursor } from '@josui/react';

// In your layout/root component
<CustomCursor />

// With custom styling
<CustomCursor className="h-8 w-8 rounded-full bg-secondary-500" />
```

| Prop      | Values                      |
| --------- | --------------------------- |
| className | `string` (Tailwind classes) |
| options   | `CustomCursorOptions`       |

## CellGrid

Interactive canvas background that highlights cells under the cursor.

```tsx
import { CellGrid } from '@josui/react';

<CellGrid
  cellSize={24}
  fadeRate={0.045}
  maxCells={200}
  gridColor="color-foreground"
  gridOpacity={0.1}
  cellColor="color-primary-500"
  cellOpacity={0.3}
>
  <YourContent />
</CellGrid>;
```

| Prop        | Values                                                            |
| ----------- | ----------------------------------------------------------------- |
| cellSize    | `number` (default: 24)                                            |
| fadeRate    | `number` (default: 0.045)                                         |
| maxCells    | `number` (default: 200)                                           |
| gridColor   | `string` — token name or CSS color (default: "color-foreground")  |
| gridOpacity | `number` — 0-1 (default: 0.1)                                     |
| cellColor   | `string` — token name or CSS color (default: "color-primary-500") |
| cellOpacity | `number` — 0-1 (default: 0.3)                                     |
| className   | `string`                                                          |
| children    | `ReactNode` (content on grid)                                     |

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
import { CustomCursor, type CustomCursorProps } from '@josui/react';
import { CellGrid, type CellGridProps } from '@josui/react';
```

## Customization

All components accept `className` for custom styles:

```tsx
<Button className="rounded-full" variant="primary">
  Custom Button
</Button>
```
