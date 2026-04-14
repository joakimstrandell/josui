# Development – @josui/react

## Architecture

No build step – consumers import TypeScript source directly via `main: "./src/index.ts"`.

## Structure

```
src/components/ComponentName/
  ComponentName.tsx          # Implementation
  ComponentName.test.tsx     # Vitest tests
  ComponentName.stories.tsx  # Storybook stories
  index.ts                   # Barrel export
```

## Patterns

- Use `cn()` from `@josui/core-web` for class merging
- Define variant/size styles as objects, not inline conditionals
- Extend `React.ComponentPropsWithoutRef<'element'>` for HTML props
- Use `forwardRef` for ref forwarding
- Add `data-*` attributes for component state where useful

## Adding components

1. Create `src/components/ComponentName/` with the structure above
2. Export from `src/index.ts`
3. Update `skills/use-react-components/SKILL.md` with usage docs

## Constraints

- Named exports only (no default exports)
- Use `forwardRef` for ref forwarding
- All components must support `className` prop
- When modifying components, update `skills/use-react-components/SKILL.md` with usage docs
