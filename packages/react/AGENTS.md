# Agent Instructions — @josui/react

React component library using Tailwind CSS.

## Build

No build step — consumers import TypeScript source directly via `main: "./src/index.ts"`.

## Structure

Components live in `src/components/ComponentName/`:

```
ComponentName/
├── ComponentName.tsx        # Component implementation
├── ComponentName.test.tsx   # Vitest tests
├── ComponentName.stories.tsx # Storybook stories
└── index.ts                 # Barrel export
```

## Component Conventions

- Named exports (no default exports)
- Use `forwardRef` for ref forwarding
- Extend `React.ComponentPropsWithoutRef<'element'>` for HTML props
- Support `className` prop for customization
- Use `cn()` from `@josui/core-web` for class merging

```tsx
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
```

## Styling

Components use Tailwind CSS classes. Define variant/size styles as objects:

```tsx
const variantStyles = {
  primary: "bg-primary-500 text-white hover:bg-primary-600",
  secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
};

const sizeStyles = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};
```

## Creating a Component

1. Create folder `src/components/ComponentName/`
2. Create `ComponentName.tsx` with `forwardRef`
3. Create `ComponentName.test.tsx` using `@testing-library/react`
4. Create `ComponentName.stories.tsx`
5. Create `index.ts` exporting component and props type
6. Add exports to `src/index.ts`
7. Update `skills/use-react-components/SKILL.md` with usage docs

## Important

When modifying components (adding/removing props, changing API), update:

- `AGENTS.md` — Component table, conventions
- `skills/use-react-components/SKILL.md` — Component usage examples
- `README.md` — If architecture or setup changes

## Testing

```bash
pnpm --filter @josui/react test        # Run once
pnpm --filter @josui/react test:watch  # Watch mode
```

Uses Vitest with `@testing-library/react`.

## Components

### Core

| Component    | Variants                                        | Sizes      |
| ------------ | ----------------------------------------------- | ---------- |
| Button       | primary, secondary, outline, ghost, destructive | sm, md, lg |
| Card         | —                                               | —          |
| Input        | —                                               | sm, md, lg |
| Badge        | default, primary, success, warning, error       | sm, md, lg |
| Typography   | —                                               | —          |
| Avatar       | —                                               | sm, md, lg |
| Spinner      | —                                               | sm, md, lg |
| Alert        | info, success, warning, error                   | —          |
| CustomCursor | —                                               | —          |
| CellGrid     | —                                               | —          |
| ThemeToggle  | —                                               | sm, md, lg |

Card is a compound component with sub-components (CardHeader, CardTitle, CardDescription, CardContent, CardFooter).

### Simple

| Component  | Description                      |
| ---------- | -------------------------------- |
| Label      | Form label (Radix)               |
| Separator  | Visual divider (Radix)           |
| Skeleton   | Loading placeholder              |
| Textarea   | Multi-line text input            |
| Table      | Data table (compound)            |
| Pagination | Page navigation (compound)       |
| Breadcrumb | Breadcrumb navigation (compound) |

### Radix Primitives

| Component   | Description                   |
| ----------- | ----------------------------- |
| AspectRatio | Fixed aspect ratio container  |
| Checkbox    | Checkbox input                |
| Progress    | Progress bar                  |
| RadioGroup  | Radio button group            |
| ScrollArea  | Custom scrollbar container    |
| Slider      | Range slider                  |
| Switch      | Toggle switch                 |
| Toggle      | Toggle button                 |
| ToggleGroup | Group of toggle buttons       |
| Tabs        | Tab navigation                |
| Collapsible | Expandable/collapsible region |

### Overlays

| Component      | Description          |
| -------------- | -------------------- |
| Tooltip        | Hover tooltip        |
| Popover        | Floating content     |
| Dialog         | Modal dialog         |
| AlertDialog    | Confirmation dialog  |
| Sheet          | Slide-out panel      |
| HoverCard      | Hover-triggered card |
| DropdownMenu   | Dropdown menu        |
| ContextMenu    | Right-click menu     |
| Menubar        | Horizontal menu bar  |
| NavigationMenu | Site navigation menu |
| Select         | Select dropdown      |

### Compound

| Component | Description                  |
| --------- | ---------------------------- |
| Accordion | Expandable sections          |
| Command   | Command palette (cmdk)       |
| Toaster   | Toast notifications (sonner) |
| InputOTP  | One-time password input      |
| Resizable | Resizable panels             |

### Heavy Dependencies

| Component | Description                    |
| --------- | ------------------------------ |
| Calendar  | Date picker (react-day-picker) |
| Carousel  | Carousel (embla)               |
| Chart     | Charts (recharts)              |
| Drawer    | Bottom drawer (vaul)           |
| Sidebar   | App sidebar (compound)         |

### Layout

| Component | Description          |
| --------- | -------------------- |
| Container | Responsive container |
| Page      | Page layout          |

### Animation

| Component      | Description          |
| -------------- | -------------------- |
| RotatingText   | Text rotation effect |
| AnimateContent | Content animation    |

### Misc

| Component     | Description          |
| ------------- | -------------------- |
| BracketButton | Bracket-style button |
| Checklist     | Checklist component  |

## Hooks

| Hook                | Purpose                                  |
| ------------------- | ---------------------------------------- |
| useIsTouchDevice    | Detect touch-capable devices             |
| useInteractiveState | Subscribe to cursor interactive state    |
| useScrollDirection  | Track scroll direction (up/down)         |
| useTheme            | Manage theme state (light/dark/system)   |
| useKeyboardShortcut | Add keyboard shortcuts with auto-cleanup |
| useScrollProgress   | Track scroll progress (0–1)              |

## Skills

This package includes a `use-react-components` skill for AI-assisted development.

**For package consumers:** Copy the skill to your project to enhance agentic coding:

```bash
cp -r node_modules/@josui/react/skills/use-react-components .claude/skills/
```

The skill helps AI assistants correctly use components with proper props, variants, and patterns.
