---
name: package-audit
description: Audit package registry consistency and health. Use when asked to check packages are correctly registered, have valid dependencies, and proper configuration.
---

# Package Audit

Comprehensive package health check covering registry consistency, dependencies, and configuration.

## Audit Sections

1. **Registry Consistency** — packages listed in README, changeset config
2. **Dependency Health** — workspace deps exist, peer deps satisfied
3. **Config Consistency** — required fields, extends chains valid

## Audit Process

### 1. Registry Consistency

```bash
# List actual packages
ls packages/

# Check README.md packages table
grep -E "^\| \[@josui/" README.md

# Check changeset config
cat .changeset/config.json
```

Verify:

- Every package in `packages/` has a row in README table
- Package links point to correct folder paths
- No removed packages still listed in README or changeset ignore

### 2. Dependency Health

```bash
# Check workspace dependencies resolve
for pkg in packages/*/; do
  echo "=== $pkg ==="
  grep -E '"workspace:\*"' "$pkg/package.json" | while read line; do
    dep=$(echo "$line" | grep -oE '"@josui/[^"]+' | tr -d '"')
    folder=$(echo "$dep" | sed 's/@josui\///')
    [ ! -d "packages/$folder" ] && echo "MISSING: $dep"
  done
done

# Check for version mismatches in shared deps
for dep in typescript eslint vite vitest storybook; do
  echo "=== $dep versions ==="
  grep -r "\"$dep\":" packages/*/package.json | grep -oE '"[0-9^~].*"' | sort -u
done
```

Verify:

- All `workspace:*` dependencies point to existing packages
- Shared devDependencies use consistent versions
- No circular workspace dependencies

### 3. Config Consistency

```bash
# Check package.json required fields
for pkg in packages/*/; do
  name=$(basename "$pkg")
  echo "=== $name ==="

  # Required fields for publishable packages
  jq -r '.name, .version, .main, .types, .exports' "$pkg/package.json" 2>/dev/null
done

# Check tsconfig extends chains
for pkg in packages/*/; do
  [ -f "$pkg/tsconfig.json" ] && echo "$pkg: $(jq -r '.extends // "none"' "$pkg/tsconfig.json")"
done

# Check eslint extends
for pkg in packages/*/; do
  [ -f "$pkg/eslint.config.ts" ] && echo "$pkg: has eslint config"
done
```

Verify:

- Publishable packages have: name, version, main, types, exports
- tsconfig.json extends from @josui/typescript-config
- eslint configs extend from @josui/eslint-config

## Output Format

```markdown
## Package Audit Report

### Registry Issues

- **README.md**: Missing `@josui/new-pkg`
- **changeset**: Stale reference to `@josui/deleted-pkg`

### Dependency Issues

- **@josui/react**: workspace dep `@josui/missing` doesn't exist
- **Version mismatch**: typescript has 3 different versions across packages

### Config Issues

- **@josui/core**: missing `exports` field in package.json
- **@josui/vue**: tsconfig doesn't extend shared config

### Summary

- Registry: 2 issues
- Dependencies: 1 issue
- Config: 2 issues
```

## Quick Commands

```bash
# Compare packages vs README
diff <(ls packages/ | sort) <(grep -oE "@josui/[a-z-]+" README.md | sed 's/@josui\///' | sort -u)

# Find all workspace deps
grep -rh "workspace:" packages/*/package.json | sort -u

# Check for missing peer deps
pnpm ls --depth 0 2>&1 | grep -i "peer"
```

## When to Run

- After adding/removing/renaming packages
- After changing dependencies
- Before releasing
- When CI fails with dependency errors
