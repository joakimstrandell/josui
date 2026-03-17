# @josui/tailwind

## 1.0.0

### Major Changes

- BREAKING: Consolidate tokens into token-studio, rename tailwind to tailwind-preset
  - Removed `@josui/tokens` package - tokens are now generated locally via token-studio
  - Renamed `@josui/tailwind` to `@josui/tailwind-preset` - now standalone with baked-in tokens
  - Added token templates to token-studio for the init command

  Migration:
  - Replace `@josui/tailwind` with `@josui/tailwind-preset` in your dependencies
  - Replace `@import '@josui/tailwind'` with `@import '@josui/tailwind-preset'`
  - Remove `@josui/tokens` from your dependencies (no longer needed)

## 0.3.1

### Patch Changes

- Updated dependencies
  - @josui/tokens@0.3.1

## 0.3.0

### Minor Changes

- - Restructure theme imports and reset default colors
  - Add Roboto font family and semantic typography tokens
  - Add inline theme export for Tailwind opacity modifiers

### Patch Changes

- Updated dependencies
  - @josui/tokens@0.3.0

## 0.2.0

### Minor Changes

- - Renamed package from `@josui/tailwind-config` to `@josui/tailwind`
  - Simplified exports structure
  - Removed redundant Preflight reset (handled by @josui/scss)

### Patch Changes

- Updated dependencies
  - @josui/tokens@0.2.0

## 0.1.0

### Minor Changes

- 1a9947f: Initial release of the Josui design system packages.

### Patch Changes

- Updated dependencies [1a9947f]
  - @josui/tokens@0.1.0
