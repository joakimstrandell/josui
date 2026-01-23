# Agent Instructions

This is a multi-framework design system monorepo. Follow these guidelines when working on this codebase.

## Before Making Changes

1. Run `pnpm install` if dependencies are missing
2. Run `pnpm build` to ensure all packages build successfully
3. Check which package you're working in — each has its own config

## Build Order

Packages must build in this order due to dependencies:

```
tokens → tailwind-config → core → core-web → react/vue → storybook apps
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

When creating or modifying components in `@josui/react`:

1. Use Tailwind CSS classes from `@josui/tailwind-config`
2. Support these common props: `variant`, `size`, `className`
3. Export from the package's `src/index.ts`
4. Add tests and Storybook stories

Note: `@josui/vue` is a proof of concept for SCSS-based token consumption and does not require feature parity.

## Testing Changes

```bash
pnpm lint                 # Must pass before committing
pnpm build                # Must succeed
pnpm --filter @josui/storybook-react dev  # Visual verification
pnpm --filter @josui/storybook-vue dev    # Visual verification
```

## Commit Guidelines

Use [Conventional Commits](https://www.conventionalcommits.org/) with package scopes.

### Format

```
<type>(<scope>): <description>
```

### Types

- `feat` — New feature
- `fix` — Bug fix
- `refactor` — Code change that neither fixes a bug nor adds a feature
- `docs` — Documentation only
- `chore` — Maintenance (deps, config, etc.)
- `test` — Adding or updating tests

### Scopes

Use the package name without `@josui/` prefix:

- `core-web`, `react`, `vue`, `tokens`, `tailwind-config`

For changes spanning multiple packages, list them: `feat(react, vue): ...`

For repo-wide changes, omit scope: `chore: update CI workflow`

### Examples

```
feat(core-web): add custom cursor utility
fix(react): resolve Button focus ring on Safari
refactor(vue, react): extract shared Card styles
docs(tokens): update color usage examples
chore: upgrade TypeScript to 5.8
```

## Package-Specific Instructions

Each package has its own `AGENTS.md` with specific guidance. The closest `AGENTS.md` to the file you're editing takes precedence.

## Common Pitfalls

- **ESLint errors**: Each package has its own `eslint.config.ts` with `tsconfigRootDir`
- **TypeScript errors**: Check that `tsconfig.json` extends the correct base config
- **Build failures**: Ensure tokens are built first (`pnpm --filter @josui/tokens build`)
- **Import errors**: Use workspace protocol (`workspace:*`) for internal dependencies
