# @josui/core-web – Development

## Structure

```
src/
├── cn.ts              # Tailwind class merging
├── utils.ts           # isTouchDevice, getCssVariable, resolveColor
├── keyboard.ts        # Keyboard shortcuts (on @tanstack/react-hotkeys)
├── theme.ts           # Theme singleton, SSR script, view transitions
├── custom-cursor.ts   # GSAP-powered custom cursor
├── interactive.ts     # Interactive element detection
└── cell-grid/         # Canvas cell grid (controller, manager, renderer)
```

## Constraints

- Framework-agnostic – no React/Vue imports
- Browser environment assumed (DOM APIs are fine)
- Workspace dependency of `@josui/react`
