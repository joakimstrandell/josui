# Agent Instructions

This is a multi-framework design system monorepo. Follow these guidelines when working on this codebase.

## Before Making Changes

1. Run `pnpm install` if dependencies are missing
2. Run `pnpm build` to ensure all packages build successfully
3. Check which package you're working in — each has its own config

## Build Order

Packages must build in this order due to dependencies:

```
tokens → tailwind-config → react/vue → storybook apps
```

Always rebuild upstream packages if you modify them.

## Code Style

- Use TypeScript for all code
- Use named exports, not default exports
- Prefer `const` over `let`
- Use template literals for string interpolation
- No semicolons (Prettier handles this)
- Single quotes for strings

## Component Development

When creating or modifying components:

1. Implement in both `packages/react` and `packages/vue` with identical APIs
2. Use Tailwind CSS classes from `@josui/tailwind-config`
3. Support these common props: `variant`, `size`, `className`
4. Export from the package's `src/index.ts`

## Testing Changes

```bash
pnpm lint                 # Must pass before committing
pnpm build                # Must succeed
pnpm --filter @josui/storybook-react dev  # Visual verification
pnpm --filter @josui/storybook-vue dev    # Visual verification
```

## Commit Guidelines

- Commits are auto-linted via husky pre-commit hook
- Write clear, concise commit messages
- Use present tense ("Add feature" not "Added feature")

## Package-Specific Instructions

Each package has its own `AGENTS.md` with specific guidance. The closest `AGENTS.md` to the file you're editing takes precedence.

## Common Pitfalls

- **ESLint errors**: Each package has its own `eslint.config.ts` with `tsconfigRootDir`
- **TypeScript errors**: Check that `tsconfig.json` extends the correct base config
- **Build failures**: Ensure tokens are built first (`pnpm --filter @josui/tokens build`)
- **Import errors**: Use workspace protocol (`workspace:*`) for internal dependencies
