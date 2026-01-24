---
name: package-audit
description: Audit package registry consistency. Use when asked to check if all packages are registered in README, changeset config, or after adding/removing/renaming packages.
---

# Package Registry Audit

Verify all packages are consistently registered across configuration files.

## Scope

Check that every package in `packages/` is registered in:

- Root `README.md` packages table
- `.changeset/config.json` linked array
- Correct folder paths (no stale references after renames)

## Audit Process

### 1. List Actual Packages

```bash
ls packages/
```

### 2. Check README.md Packages Table

```bash
grep -E "^\| \[@josui/" README.md
```

Verify:

- [ ] Every package in `packages/` has a row in the table
- [ ] Package links point to correct folder paths
- [ ] No removed packages still listed

### 3. Check Changeset Config

```bash
cat .changeset/config.json | grep -A 20 '"linked"'
```

Verify:

- [ ] Every package in `packages/` is in the linked array
- [ ] No removed packages still listed

### 4. Check Package Names

```bash
# Verify package.json names match folder structure
for pkg in packages/*/; do
  name=$(cat "$pkg/package.json" | grep '"name"' | head -1)
  echo "$pkg: $name"
done
```

## Output Format

```markdown
## Package Audit Report

### Missing from README.md

- [ ] `@josui/scss` — not in packages table

### Missing from Changeset

- [ ] `@josui/scss` — not in linked array

### Stale References

- [ ] `README.md` links to `./packages/tailwind-config` but folder is `./packages/tailwind`

### Suggested Fixes

1. Add @josui/scss to README.md packages table
2. Add @josui/scss to .changeset/config.json linked array
3. Update tailwind link path in README.md
```

## Quick Commands

```bash
# Compare packages vs README listing
diff <(ls packages/ | sort) <(grep -oE "@josui/[a-z-]+" README.md | sed 's/@josui\///' | sort -u)

# Compare packages vs changeset config
diff <(ls packages/ | sort) <(grep -oE "@josui/[a-z-]+" .changeset/config.json | sed 's/@josui\///' | sort -u)

# Find broken README links
grep -oE "\./packages/[a-z-]+" README.md | while read path; do
  [ ! -d "$path" ] && echo "Broken: $path"
done
```

## When to Run

Run this audit after:

- Adding a new package
- Removing a package
- Renaming a package folder
- Before releasing
