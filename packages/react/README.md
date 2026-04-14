# @josui/react

React components and hooks for the Josui design system. Built on Radix primitives.

## What's inside

```bash
pnpm add @josui/react
```

- **Core UI** – Button, Card, Input, Badge, Typography, Avatar, Alert, Spinner
- **Layout** – Container, Page, Sidebar, Resizable
- **Feedback** – Dialog, Popover, Tooltip, Sheet, Drawer, Toaster
- **Form** – Checkbox, RadioGroup, Slider, Switch, Select, Textarea, InputOTP
- **Navigation** – Tabs, Accordion, Breadcrumb, NavigationMenu, Menubar, Pagination
- **Data Display** – DropdownMenu, ContextMenu, Table, HoverCard, Command
- **Interactive** – RotatingText, AnimateContent, CustomCursor, CellGrid, Carousel, Calendar, Chart
- **Hooks** – useTheme, useKeyboardShortcut, useScrollDirection, useScrollProgress, useElementState, useIsTouchDevice

```tsx
import { Button } from "@josui/react";

<Button variant="primary">Click me</Button>;
```

Components follow WAI-ARIA patterns. See [USAGE.md](./USAGE.md) for setup, hooks reference, and component patterns. Run `pnpm storybook` for interactive docs.

## Development

See [DEVELOPMENT.md](./DEVELOPMENT.md).
