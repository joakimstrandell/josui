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
@import '@josui/tailwind';
```

### 2. Configure Tailwind source scanning

Add the `@source` directive to your CSS to ensure Tailwind scans the component library for class names:

```css
/* app.css or globals.css */
@import '@josui/tailwind';
@source '../node_modules/@josui/react/dist';
```

This tells Tailwind v4 to include the component library's dist folder when scanning for utility classes. Without this, component styles may be purged from your production build.

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
- **CustomCursor** — GSAP-powered custom cursor (auto-hidden on touch)
- **CellGrid** — Interactive canvas background with cell highlighting
- **ThemeToggle** — Dark/light/system theme toggle button

## Hooks

- **useIsTouchDevice** — Detect touch-capable devices
- **useInteractiveState** — Subscribe to cursor over interactive element state
- **useScrollDirection** — Track scroll direction (up/down)
- **useTheme** — Manage theme state (light/dark/system) with optional keyboard shortcut
- **useKeyboardShortcut** — Add keyboard shortcuts with auto-cleanup

## AI-Assisted Development

This package includes a skill for AI coding assistants. Copy it to your project:

```bash
cp -r node_modules/@josui/react/skills/use-react-components .claude/skills/
```

The skill helps AI assistants correctly use components with proper props and patterns.

See Storybook for interactive examples and full API documentation.
