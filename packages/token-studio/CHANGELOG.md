# @josui/token-studio

## 0.2.0

### Minor Changes

- BREAKING: Consolidate tokens into token-studio, rename tailwind to tailwind-preset
  - Removed `@josui/tokens` package - tokens are now generated locally via token-studio
  - Renamed `@josui/tailwind` to `@josui/tailwind-preset` - now standalone with baked-in tokens
  - Added token templates to token-studio for the init command

  Migration:
  - Replace `@josui/tailwind` with `@josui/tailwind-preset` in your dependencies
  - Replace `@import '@josui/tailwind'` with `@import '@josui/tailwind-preset'`
  - Remove `@josui/tokens` from your dependencies (no longer needed)
