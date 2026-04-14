# Usage – @josui/react

## Setup

### 1. Import Tailwind styles

```css
/* app.css or globals.css */
@import "@josui/tailwind-preset";
```

### 2. Configure Tailwind source scanning

Add the `@source` directive so Tailwind scans the component library for class names:

```css
@import "@josui/tailwind-preset";
@source '../node_modules/@josui/react/src';
```

Without this, component styles may be purged from your production build.

## Components

All components support the `className` prop for customization via Tailwind classes. Run `pnpm storybook` for interactive examples and prop documentation.

```tsx
import { Button } from "@josui/react";

<Button variant="primary" size="md" className="my-custom-class">
  Click me
</Button>;
```

## Hooks

### useTheme

Manages theme state (system/light/dark) with optional keyboard shortcut.

```tsx
import { useTheme } from "@josui/react";

const { theme, resolvedTheme, setTheme, toggle } = useTheme({
  toggleShortcut: "ctrl+t", // optional
});
```

**Returns:**

- `theme` – `"system" | "light" | "dark"`
- `resolvedTheme` – `"light" | "dark"` (computed)
- `setTheme(theme)` – set theme directly
- `toggle()` – cycle between themes

### useKeyboardShortcut

Registers a keyboard shortcut with automatic cleanup.

```tsx
import { useKeyboardShortcut } from "@josui/react";

useKeyboardShortcut({
  shortcut: "ctrl+k",
  onTrigger: () => openSearch(),
  enabled: true, // default
  preventDefault: true, // default
});
```

### useScrollDirection

Tracks scroll direction and position.

```tsx
import { useScrollDirection } from "@josui/react";

const { scrolledDown, scrolledUp, isAtTop, scrollY } = useScrollDirection();
```

- `scrolledDown` / `scrolledUp` – current scroll direction
- `isAtTop` – within 10px of top
- `scrollY` – current scroll position

### useScrollProgress

Returns 0–1 progress for how much of an element has scrolled through the viewport.

```tsx
import { useScrollProgress } from "@josui/react";

const ref = useRef<HTMLDivElement>(null);
const progress = useScrollProgress(ref);
// 0 = entering viewport, 1 = leaving viewport
```

### useElementState

Tracks what type of element the cursor is hovering over.

```tsx
import { useElementState } from "@josui/react";

const { type, interactive } = useElementState();
// type: "clickable" | "text" | "idle"
```

### useIsTouchDevice

Detects touch support.

```tsx
import { useIsTouchDevice } from "@josui/react";

const isTouch = useIsTouchDevice();
```

## Accessibility

Components follow WAI-ARIA patterns with proper roles, labels, and keyboard navigation. Focus management, screen reader support, and reduced motion preferences are handled automatically where applicable.
