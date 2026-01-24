# Agent Instructions — @josui/scss

Base styles and SCSS utilities for non-Tailwind projects.

## Structure

```
src/
├── base.scss    # CSS reset, fonts, global styles
├── mixins.scss  # SCSS functions and mixins
└── index.scss   # Combined entry point
```

## Exports

| Export                  | Purpose                      |
| ----------------------- | ---------------------------- |
| `@josui/scss`           | Tokens + base + mixins       |
| `@josui/scss/base.scss` | Reset and global styles only |
| `@josui/scss/mixins`    | Functions and mixins only    |

## Functions

Token accessor functions return CSS custom property references:

- `color($name)` → `var(--color-{name})`
- `spacing($scale)` → `var(--spacing-{scale})`
- `radius($size)` → `var(--radius-{size})`
- `shadow($size)` → `var(--shadow-{size})`
- `font-size($size)` → `var(--font-size-{size})`
- `font-weight($weight)` → `var(--font-weight-{weight})`
- `duration($speed)` → `var(--animation-duration-{speed})`
- `easing($type)` → `var(--animation-easing-{type})`
- `z-index($layer)` → `var(--z-index-{layer})`

## Mixins

- `focus-ring($color)` — Focus outline
- `focus-visible-ring($color)` — Keyboard-only focus
- `disabled-state` — Disabled styling
- `transition-colors` — Color transitions
- `transition-all` — Common property transitions
- `interactive-base` — Base interactive element styles
- `visually-hidden` — Screen reader only
- `reset-button` — Reset button styles
- `truncate` — Text ellipsis
- `line-clamp($lines)` — Multi-line truncation

## Important

When modifying functions or mixins, update:

- `AGENTS.md` — Function and mixin lists
- `README.md` — Documentation tables
- `@josui/vue` — If it uses affected helpers
