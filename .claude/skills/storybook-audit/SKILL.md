---
name: storybook-audit
description: Audit Storybook story coverage for @josui/react components. Use when asked to check Storybook coverage, verify stories exist for components, or audit story completeness (autodocs, variants, sizes).
---

# Storybook Audit

Verify that every exported component in `@josui/react` has complete Storybook story coverage.

## Audit Process

### 1. List Components Without Stories

```bash
for comp in $(ls packages/react/src/components/); do
  if [ ! -f "packages/react/src/components/$comp/$comp.stories.tsx" ]; then
    echo "Missing: $comp.stories.tsx"
  fi
done
```

### 2. Per-Component Checks

For each component with a story file, verify:

- [ ] Meta has `tags: ['autodocs']` for auto-generated docs
- [ ] Meta has `args` with defaults for controls panel
- [ ] All variants have dedicated stories
- [ ] All sizes have stories (or shown via controls)

**Extract variants/sizes from source:**

```bash
grep -E "variant\?.*'[^']+'" packages/react/src/components/{Component}/{Component}.tsx
grep -E "size\?.*'[^']+'" packages/react/src/components/{Component}/{Component}.tsx
```

**List story exports:**

```bash
grep -E "^export const" packages/react/src/components/{Component}/{Component}.stories.tsx
```

### 3. Bulk Checks

```bash
# Stories missing autodocs
grep -L "autodocs" packages/react/src/components/*/*.stories.tsx 2>/dev/null

# Stories missing meta args
grep -L "args:" packages/react/src/components/*/*.stories.tsx 2>/dev/null
```

## Output Format

```markdown
## Storybook Audit Report

### Missing Stories

- [ ] `Typography` — no story file

### Incomplete Stories

- [ ] `Button` — missing autodocs tag
- [ ] `Input` — missing size variants (has sm, missing md/lg)

### Coverage Summary

| Component | Stories | autodocs | args | Variants | Sizes |
| --------- | ------- | -------- | ---- | -------- | ----- |
| Button    | yes     | yes      | yes  | 5/5      | 3/3   |
| Input     | yes     | no       | no   | —        | 1/3   |
```
