# @josui/react

React component library for the Josui design system.

## Installation

```bash
pnpm add @josui/react @josui/tailwind-config
```

## Setup

```css
@import '@josui/tailwind-config/styles.css';
```

## Usage

```tsx
import { Button, Card, CardContent } from '@josui/react';

<Card>
  <CardContent>
    <Button variant="primary">Click me</Button>
  </CardContent>
</Card>;
```

## Components

Button, Input, Card, Badge, Typography, Avatar, Spinner, Alert

## Importing Source Files

For projects with their own build setup, you can import TypeScript source directly:

```tsx
import { Button } from '@josui/react/src';
```

This enables better tree-shaking and lets your bundler optimize the code.

## Testing

```bash
pnpm test        # Run tests once
pnpm test:watch  # Watch mode
```

Uses Vitest with React Testing Library.

## Claude Code Integration

```bash
mkdir -p .claude/skills
cp -r node_modules/@josui/react/skills/* .claude/skills/
```
