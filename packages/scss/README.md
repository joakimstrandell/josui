# @josui/scss

Base styles and SCSS utilities for the Josui design system.

## Installation

```bash
pnpm add @josui/scss @josui/tokens
```

## Usage

### Base Styles (Reset + Fonts)

```scss
// Import tokens first, then base
@use '@josui/tokens/css';
@use '@josui/scss/base';
```

### SCSS Mixins and Functions

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

### Combined Import

```scss
@use '@josui/scss' as *; // Includes base + mixins
```

## Functions

| Function               | Example                 | Output                             |
| ---------------------- | ----------------------- | ---------------------------------- |
| `color($name)`         | `color('primary-500')`  | `var(--color-primary-500)`         |
| `spacing($scale)`      | `spacing('4')`          | `var(--spacing-4)`                 |
| `radius($size)`        | `radius('md')`          | `var(--radius-md)`                 |
| `shadow($size)`        | `shadow('md')`          | `var(--shadow-md)`                 |
| `font-size($size)`     | `font-size('sm')`       | `var(--font-size-sm)`              |
| `font-weight($weight)` | `font-weight('medium')` | `var(--font-weight-medium)`        |
| `duration($speed)`     | `duration('fast')`      | `var(--animation-duration-fast)`   |
| `easing($type)`        | `easing('ease-out')`    | `var(--animation-easing-ease-out)` |
| `z-index($layer)`      | `z-index('modal')`      | `var(--z-index-modal)`             |

## Mixins

| Mixin                        | Purpose                                |
| ---------------------------- | -------------------------------------- |
| `focus-ring($color)`         | Focus outline                          |
| `focus-visible-ring($color)` | Focus outline on keyboard only         |
| `disabled-state`             | Opacity + no pointer events            |
| `transition-colors`          | Color property transitions             |
| `transition-all`             | Common property transitions            |
| `interactive-base`           | Cursor, transitions, disabled handling |
| `visually-hidden`            | Screen reader only                     |
| `reset-button`               | Reset native button styles             |
| `truncate`                   | Single line text truncation            |
| `line-clamp($lines)`         | Multi-line text truncation             |

## Base Styles

The base reset includes:

- Modern CSS reset (box-sizing, margins, padding)
- Typography defaults using token fonts
- Form element normalization
- Image and media defaults
- Smooth scrolling (respects reduced-motion preference)
