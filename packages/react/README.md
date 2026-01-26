# @josui/react

React component library for the Josui design system.

## Installation

```bash
pnpm add @josui/react
```

## Setup

Import the Tailwind styles in your app entry:

```tsx
// App.tsx or main.tsx
import '@josui/react/tailwind.css';
```

## Architecture

### Tailwind CSS Styling

Components use Tailwind CSS classes with the `cn()` utility from `@josui/core-web` for class merging. All components support the `className` prop for customization:

```tsx
<Button className="my-custom-class" variant="primary">
  Click me
</Button>
```

### Accessibility

Components follow WAI-ARIA patterns with proper roles, labels, and keyboard navigation.

## Customizing Styles

### Override with className

All components accept a `className` prop that merges with default styles:

```tsx
<Button className="rounded-full" variant="primary">
  Rounded Button
</Button>
```

### Tailwind Configuration

Extend your Tailwind config to customize the design tokens:

```js
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#your-color',
          600: '#your-hover-color',
        },
      },
    },
  },
};
```

## Components

- **Button** — Primary actions with variants, sizes, loading state
- **Card** — Container with header, content, footer sections
- **Input** — Form input field
- **Badge** — Status indicators and labels
- **Typography** — Text styling component
- **Avatar** — User profile images
- **Spinner** — Loading indicator
- **Alert** — Notification messages

## Hooks

- **useIsTouchDevice** — Detect touch-capable devices
- **useInteractiveState** — Subscribe to cursor over interactive element state
- **useScrollDirection** — Track scroll direction (up/down)

## AI-Assisted Development

This package includes a skill for AI coding assistants. Copy it to your project:

```bash
cp -r node_modules/@josui/react/skills/use-react-components .claude/skills/
```

The skill helps AI assistants correctly use components with proper props and patterns.

See Storybook for interactive examples and full API documentation.
