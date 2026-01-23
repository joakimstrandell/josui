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

## Releasing

This project uses [Changesets](https://github.com/changesets/changesets) for versioning and publishing.

### Important

**Do NOT create changesets automatically.** Only create a changeset when:

- The user explicitly asks you to
- You ask the user and they confirm

### When to Create a Changeset

Create a changeset when you make changes that should be released to npm:

- New features
- Bug fixes
- Breaking changes

Do NOT create changesets for:

- Documentation-only changes
- Internal tooling/config changes
- Changes to apps (docs, storybooks)

### How to Create a Changeset

```bash
pnpm changeset
```

Follow the prompts to:

1. Select which packages changed
2. Choose bump type (`patch` for fixes, `minor` for features, `major` for breaking)
3. Write a summary (this goes into the CHANGELOG)

Commit the changeset file (in `.changeset/`) along with your code.

### Release Process

Releases are automated via CI:

1. Push to main with changesets → CI creates a "Version Packages" PR
2. Merge the "Version Packages" PR → CI publishes to npm

### Published Packages

- `@josui/core`, `@josui/core-web`, `@josui/tokens`, `@josui/tailwind-config`, `@josui/react`, `@josui/vue`

### Ignored (not published)

- Apps: `@josui/docs`, `@josui/storybook-react`, `@josui/storybook-vue`
- Internal configs: `@josui/eslint-config`, `@josui/typescript-config`

**Note:** When adding new packages, update `.changeset/config.json` to add them to `linked` (if published) or `ignore` (if internal).

## Package-Specific Instructions

Each package has its own `AGENTS.md` with specific guidance. The closest `AGENTS.md` to the file you're editing takes precedence.

## Common Pitfalls

- **ESLint errors**: Each package has its own `eslint.config.ts` with `tsconfigRootDir`
- **TypeScript errors**: Check that `tsconfig.json` extends the correct base config
- **Build failures**: Ensure tokens are built first (`pnpm --filter @josui/tokens build`)
- **Import errors**: Use workspace protocol (`workspace:*`) for internal dependencies
