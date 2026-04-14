# @josui/react

React components and hooks for the Josui design system. Built on Radix primitives.

## Installation

```bash
pnpm add @josui/react
```

Requires `@josui/tailwind-preset` for styling. See [Usage guide](./USAGE.md) for setup.

## What's included

- **Core UI** – Button, Card, Input, Badge, Typography, Avatar, Alert, Spinner
- **Layout** – Container, Page, Sidebar, Resizable
- **Feedback** – Dialog, Popover, Tooltip, Sheet, Drawer, Toaster
- **Form** – Checkbox, RadioGroup, Slider, Switch, Select, Textarea, InputOTP
- **Navigation** – Tabs, Accordion, Breadcrumb, NavigationMenu, Menubar, Pagination
- **Data Display** – DropdownMenu, ContextMenu, Table, HoverCard, Command
- **Interactive** – RotatingText, AnimateContent, CustomCursor, CellGrid, Carousel, Calendar, Chart
- **Hooks** – useTheme, useKeyboardShortcut, useScrollDirection, useScrollProgress, useElementState, useIsTouchDevice

## Usage

```tsx
import { Button } from "@josui/react";

<Button variant="primary">Click me</Button>;
```

Components follow WAI-ARIA patterns with proper roles, labels, and keyboard navigation.

## Links

- [Usage guide](./USAGE.md) – setup, hooks reference, and component patterns
- [Development](./DEVELOPMENT.md) – structure, constraints, and patterns

Run `pnpm storybook` for interactive component docs.
