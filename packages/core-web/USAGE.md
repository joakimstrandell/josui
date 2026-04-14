# @josui/core-web – Usage

## Class Merging

```ts
import { cn } from "@josui/core-web";

const className = cn("px-4 py-2", isActive && "bg-blue-500", className);
```

`cn()` wraps clsx + tailwind-merge so conflicting Tailwind classes resolve correctly.

## Custom Cursor

```ts
import { createCustomCursor } from "@josui/core-web";

const cursor = createCustomCursor(element, { interactiveScale: 2.5 });
```

Creates a GSAP-powered cursor that scales when hovering interactive elements. Requires a browser environment.

## Cell Grid

```ts
import { createCellGridController } from "@josui/core-web";

const controller = createCellGridController(canvas, { cellSize: 24 });
controller.start();
```

Renders an interactive canvas background with a cell grid pattern.

## Theme

```ts
import { themeState } from "@josui/core-web";
```

Light/dark theme singleton with localStorage persistence and SSR flash prevention. Manages `.dark` / `.light` classes on `<html>` and supports view transitions (iris wipe, scoped to `html.vt-theme`).

## Keyboard Shortcuts

```ts
import { parseShortcut, formatShortcut } from "@josui/core-web";
```

Listener, parser, and platform-aware display formatting for keyboard shortcuts. Built on @tanstack/react-hotkeys with ARIA support.

## DOM Helpers

```ts
import { isTouchDevice, getCssVariable, resolveColor } from "@josui/core-web";
```

- `isTouchDevice()` – detect touch-capable devices
- `getCssVariable()` – read CSS custom property values
- `resolveColor()` – resolve design token colors
