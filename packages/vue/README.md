# @josui/vue

Vue 3 component library for the Josui design system.

## Installation

```bash
pnpm add @josui/vue @josui/scss
```

For icons (optional):

```bash
pnpm add lucide-vue-next
```

## Setup

```ts
// main.ts
import '@josui/scss'; // Base reset + CSS tokens
import '@josui/vue/styles.css'; // Component styles
```

## Architecture

### Token-Based Styling

Components are styled using CSS custom properties from `@josui/tokens`. No utility classes or runtime CSS-in-JS — just scoped SCSS that references design tokens:

```css
/* How components consume tokens internally */
.josui-button {
  background: var(--color-primary-500);
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-md);
}
```

This means you can customize the entire look of components by overriding token values.

### Accessibility (WCAG)

Components that require complex accessibility patterns use [reka-ui](https://reka-ui.com) primitives under the hood:

This provides:

- Keyboard navigation (Tab, Escape, Enter)
- Focus trapping in modals
- ARIA attributes (`aria-modal`, `aria-labelledby`, `aria-describedby`, `aria-checked`)
- Screen reader announcements

Components like Button, Card, Badge, and Icon are simple enough to not require reka-ui.

## Customizing Tokens

### Override CSS Variables

The simplest way to customize is overriding CSS custom properties:

```css
:root {
  /* Change primary color */
  --color-primary-500: oklch(0.6 0.2 280);

  /* Adjust spacing scale */
  --spacing-4: 1.25rem;

  /* Modify border radius */
  --radius-md: 0.5rem;
}
```

### Scoped Theming

Apply different tokens to specific sections:

```css
.dark-section {
  --color-gray-900: oklch(0.98 0 0);
  --color-gray-100: oklch(0.2 0 0);
}
```

### Available Tokens

See [@josui/tokens](https://github.com/joakimstrandell/josui/tree/main/packages/tokens) for the complete token reference including colors, spacing, radius, shadows, animation, and z-index.

## Components

- **Button** — Primary actions with variants, sizes, loading state
- **Card** — Container with header, content, footer sections
- **Dialog** — Modal dialogs with overlay and focus trapping
- **Checkbox** — Form input with indeterminate state support
- **Badge** — Status indicators and labels
- **Icon** — Lucide icon wrapper with consistent sizing

See Storybook for interactive examples and full API documentation.
