---
name: release
description: Release packages using changesets. Use when asked to release, version, publish packages, or create a changeset.
---

# Release Packages

This project uses [changesets](https://github.com/changesets/changesets) for versioning and publishing.

## Quick Reference

```bash
pnpm changeset status          # Check pending changesets
pnpm changeset version         # Bump versions, write CHANGELOGs
pnpm publish -r                # Publish to npm
```

## Creating Changesets

**Critical: Create one changeset file per package** for package-specific changelogs. A single combined changeset copies all content to every package's CHANGELOG.

### 1. Identify Changed Packages

Find commits since last release for each package:

```bash
# List release tags
git tag --list | grep "@josui"

# Check commits since last release
git log @josui/react@0.1.0..HEAD --oneline -- packages/react
```

### 2. Create Changeset Files

Create separate files in `.changeset/` with descriptive names:

```markdown
## <!-- .changeset/tokens-terrazzo.md -->

## "@josui/tokens": minor

- Migrated from Style Dictionary to Terrazzo CLI
- Added Tailwind and Sass plugins
```

```markdown
## <!-- .changeset/react-docs.md -->

## "@josui/react": patch

- Documentation updates
```

### 3. Bump Type Guidelines

- **patch** (0.0.X): Bug fixes, docs, internal changes
- **minor** (0.X.0): New features, non-breaking changes
- **major** (X.0.0): Breaking changes

### 4. Version and Commit

```bash
pnpm changeset version    # Consumes changesets, updates package.json + CHANGELOG.md
pnpm install              # Update lockfile if needed
git add .
git commit -m "chore: version packages"
```

## Configuration

Config in `.changeset/config.json`:

- **linked**: Packages that share the same version number
- **ignore**: Private packages excluded from releases (apps, storybooks)

## Troubleshooting

### "Unchanged packages" in interactive CLI

Changesets compares against the versioning commit, not publish tags. This is just a UI hint - you can still select any package.

### New package has no CHANGELOG

New packages create a new `CHANGELOG.md` as an untracked file. Make sure to `git add` it.

### Duplicate CHANGELOG entries

If you revert and re-run `changeset version`, untracked CHANGELOGs (new packages) won't be reverted. Manually clean them.
