# @josui/react

React component library for the Josui design system.

## Installation

```bash
pnpm add @josui/react
```

## Setup

### 1. Import Tailwind styles

```css
/* app.css or globals.css */
@import "@josui/tailwind-preset";
```

### 2. Configure Tailwind source scanning

Add the `@source` directive to your CSS to ensure Tailwind scans the component library for class names:

```css
/* app.css or globals.css */
@import "@josui/tailwind-preset";
@source '../node_modules/@josui/react/src';
```

This tells Tailwind v4 to include the component library's source folder when scanning for utility classes. Without this, component styles may be purged from your production build.

## Architecture

No build step — consumers import TypeScript source directly via `main: "./src/index.ts"`.

### Component Structure

Components live in `src/components/ComponentName/`:

```
ComponentName/
├── ComponentName.tsx        # Implementation
├── ComponentName.test.tsx   # Vitest tests
├── ComponentName.stories.tsx # Storybook stories
└── index.ts                 # Barrel export
```

### Tailwind CSS Styling

Components use Tailwind CSS classes with the `cn()` utility from `@josui/core-web` for class merging. All components support the `className` prop for customization:

```tsx
<Button className="my-custom-class" variant="primary">
  Click me
</Button>
```

### Accessibility

Components follow WAI-ARIA patterns with proper roles, labels, and keyboard navigation.

## Components

Core UI (Button, Card, Input, Badge, etc.), form controls (Checkbox, RadioGroup, Slider, Switch), overlays (Dialog, Popover, Tooltip, Sheet, DropdownMenu), layout (Container, Page), and animation (RotatingText, AnimateContent). Many built on Radix primitives.

See Storybook for the full catalog with interactive examples.

## AI-Assisted Development

This package includes a skill for AI coding assistants. Copy it to your project:

```bash
cp -r node_modules/@josui/react/skills/use-react-components .claude/skills/
```

The skill helps AI assistants correctly use components with proper props and patterns.

## Constraints

- Named exports only (no default exports)
- Use `forwardRef` for ref forwarding
- Extend `React.ComponentPropsWithoutRef<'element'>` for HTML props
- All components support `className` prop; use `cn()` from `@josui/core-web` for class merging
- Define variant/size styles as objects, not inline conditionals
- When modifying components, update `skills/use-react-components/SKILL.md` with usage docs
