# @josui/tokens

## 0.3.1

### Patch Changes

- Remove duplicate `@import 'tailwindcss'` from generated Tailwind theme output. This allows consumers to control import order and properly disable default Tailwind colors.

## 0.3.0

### Minor Changes

- - Add dark/light theme support with JS-controlled dark mode (removed CSS media queries)
  - Add Roboto font family and semantic typography tokens
  - Consolidate semantic token naming for better consistency
  - Ensure WCAG AA contrast compliance for all color tokens
  - Use token references for semantic colors (card, popover backgrounds reference color.background)

## 0.2.0

### Minor Changes

- - Migrated from Style Dictionary to Terrazzo CLI for token generation
  - Converted tokens to strict DTCG (Design Tokens Community Group) object format
  - Added Terrazzo Tailwind plugin for automatic theme generation
  - Added Terrazzo Sass plugin for type-safe token access

## 0.1.0

### Minor Changes

- 1a9947f: Initial release of the Josui design system packages.
