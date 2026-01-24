# @josui/scss

Base styles and SCSS utilities for the Josui design system.

## Installation

```bash
pnpm add @josui/scss
```

## Usage

```ts
// main.ts
import '@josui/scss';
```

This imports:

- CSS custom properties from `@josui/tokens`
- Modern CSS reset
- Base typography styles

## For Component Authors

SCSS mixins are available for building components:

```scss
@use '@josui/scss/mixins' as *;

.my-component {
  background: color('primary-500');
  padding: spacing('4');
  border-radius: radius('md');
  @include focus-visible-ring;
  @include transition-colors;
}
```

See the [AGENTS.md](./AGENTS.md) for available functions and mixins.
