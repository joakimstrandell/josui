# Changesets

This project uses [Changesets](https://github.com/changesets/changesets) for versioning and publishing.

## Creating a Changeset

When you make a change that should be released, run:

```bash
pnpm changeset
```

Follow the prompts to:

1. Select which packages changed
2. Choose bump type (patch/minor/major)
3. Write a summary (this goes into the CHANGELOG)

## Release Process (Automated)

Releases are handled automatically by CI:

1. **Push to main** with changesets → CI creates a "Version Packages" PR
2. **Merge the PR** → CI publishes to npm

## Manual Release (if needed)

```bash
pnpm version-packages  # Bump versions
pnpm release           # Publish to npm
```

## What Gets Published

- ✅ `@josui/core`, `@josui/core-web`, `@josui/tokens`, `@josui/tailwind-config`, `@josui/react`, `@josui/vue`
- ❌ Apps (docs, storybooks) and internal configs (eslint, typescript) are ignored
