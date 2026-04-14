# Development

## Adding Utilities

1. Create `src/utility-name.ts`
2. Export from `src/index.ts`

## Constraints

- No browser APIs (`window`, `document`, `navigator`) – this package must work in Node.js and SSR
- Pure functions – no side effects where possible
- Minimal dependencies – only well-maintained, focused libraries
- Used as a dependency by `@josui/core-web`
