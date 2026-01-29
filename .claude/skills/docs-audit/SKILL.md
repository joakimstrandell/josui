---
name: docs-audit
description: Audit documentation content for accuracy. Use when asked to check if documentation matches code (AGENTS.md, README.md, CLAUDE.md, skills) or verify Storybook coverage for components.
---

# Documentation Audit

Verify that documentation content matches current code.

## Scope

Audit documentation content in:

- `**/AGENTS.md` - Agent instructions
- `**/README.md` - User-facing docs
- `**/CLAUDE.md` - Should point to AGENTS.md
- `**/skills/**/SKILL.md` - Skill definitions

For package registry consistency (README table, changeset config), use `package-audit` instead.

## Audit Process

### 1. Gather Documentation Files

```bash
find . -name "AGENTS.md" -o -name "README.md" -o -name "CLAUDE.md" -o -name "SKILL.md" | grep -v node_modules
```

### 2. Structural Completeness

Every package in `packages/` and app in `apps/` must have:

- [ ] README.md
- [ ] AGENTS.md
- [ ] CLAUDE.md (containing only `See [AGENTS.md](./AGENTS.md)`)

### 3. AGENTS.md Content Audit

**Header format:**

```markdown
# Agent Instructions — {package-name}
```

**Required sections:**

- [ ] Build instructions with correct filter: `pnpm --filter {package} build`
- [ ] Structure section describing key directories
- [ ] Testing instructions (if package has tests)

**For component libraries (@josui/react, @josui/vue):**

```bash
grep -E "^export" packages/{package}/src/index.ts
```

Verify:

- [ ] All exported components listed in table
- [ ] Variants/sizes match component source
- [ ] No removed components still documented

### 4. Skill Content Audit

**Frontmatter required:**

```yaml
---
name: skill-name
description: What it does. When to use (triggers).
---
```

**For component skills:**

- [ ] All components have usage examples
- [ ] Props tables match actual component interfaces
- [ ] Import statements are correct
- [ ] No deprecated APIs documented

### 5. README.md Content Audit

- [ ] Package name in header matches package.json name
- [ ] Installation command: `pnpm add {package-name}`
- [ ] Import examples match actual exports

### 6. Cross-Reference Audit

- AGENTS.md component tables ↔ Skill component coverage
- AGENTS.md build commands ↔ package.json scripts
- README.md features list ↔ Actual exports

### 7. Storybook Audit (@josui/react, @josui/vue)

Every exported component must have complete story coverage.

**Check story files exist:**

```bash
# React - list components without stories
for comp in $(ls packages/react/src/components/); do
  if [ ! -f "packages/react/src/components/$comp/$comp.stories.tsx" ]; then
    echo "Missing: $comp.stories.tsx"
  fi
done

# Vue - list components without stories
for comp in $(ls packages/vue/src/components/); do
  if [ ! -f "packages/vue/src/components/$comp/$comp.stories.ts" ]; then
    echo "Missing: $comp.stories.ts"
  fi
done
```

**For each component, verify:**

- [ ] Story file exists (`ComponentName.stories.tsx` / `.stories.ts`)
- [ ] Meta has `tags: ['autodocs']` for auto-generated docs
- [ ] Meta has `args` with defaults for controls panel
- [ ] All variants have dedicated stories
- [ ] All sizes have dedicated stories (or shown in single story with controls)

**Extract variants/sizes from component:**

```bash
# Find variant types in React component
grep -E "variant\?.*'[^']+'" packages/react/src/components/Button/Button.tsx

# Find size types
grep -E "size\?.*'[^']+'" packages/react/src/components/Button/Button.tsx
```

**Verify stories cover variants:**

```bash
# List story exports
grep -E "^export const" packages/react/src/components/Button/Button.stories.tsx
```

**Story completeness checklist:**

| Component | Stories File | autodocs | args | All Variants | All Sizes |
| --------- | ------------ | -------- | ---- | ------------ | --------- |
| Button    | ✓/✗          | ✓/✗      | ✓/✗  | ✓/✗          | ✓/✗       |
| Card      | ✓/✗          | ✓/✗      | ✓/✗  | ✓/✗          | ✓/✗       |
| ...       | ...          | ...      | ...  | ...          | ...       |

## Output Format

```markdown
## Docs Audit Report

### Missing Files

- [ ] `packages/foo/CLAUDE.md` — missing

### Outdated Content

- [ ] `packages/react/AGENTS.md:45` — Component table missing `Typography`
- [ ] `packages/vue/skills/use-vue-components/SKILL.md:12` — Setup imports outdated

### Inconsistencies

- [ ] `@josui/react` exports 10 components, AGENTS.md lists 8

### Storybook Coverage

| Package | Component | Stories | autodocs | args | Variants | Sizes |
| ------- | --------- | ------- | -------- | ---- | -------- | ----- |
| react   | Button    | ✓       | ✓        | ✓    | 5/5      | 3/3   |
| react   | Input     | ✓       | ✗        | ✗    | —        | 0/3   |
| vue     | Dialog    | ✗       | —        | —    | —        | —     |

### Suggested Fixes

1. Add Typography to AGENTS.md component table
2. Update skill setup section
3. Add autodocs tag to Input stories
4. Create Dialog.stories.ts for Vue
```

## Quick Commands

```bash
# List component exports (React)
grep -E "^export \{|^export type" packages/react/src/index.ts

# List component exports (Vue)
grep -E "^export \{|^export type" packages/vue/src/index.ts

# Check skill frontmatter
head -5 .claude/skills/*/SKILL.md packages/*/skills/*/SKILL.md 2>/dev/null

# Find CLAUDE.md files not pointing to AGENTS.md
grep -L "AGENTS.md" */CLAUDE.md packages/*/CLAUDE.md apps/*/CLAUDE.md 2>/dev/null

# List all story files (React)
find packages/react/src/components -name "*.stories.tsx"

# List all story files (Vue)
find packages/vue/src/components -name "*.stories.ts"

# Check stories have autodocs tag
grep -L "autodocs" packages/react/src/components/*/*.stories.tsx 2>/dev/null

# Check stories have meta args
grep -L "args:" packages/react/src/components/*/*.stories.tsx 2>/dev/null
```
