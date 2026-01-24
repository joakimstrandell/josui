---
name: docs-audit
description: Audit documentation for drift and inconsistencies. Use when asked to check, audit, verify, or sync documentation (AGENTS.md, README.md, CLAUDE.md, skills).
---

# Documentation Audit

Systematically verify that documentation matches current code.

## Scope

Audit these files:

- `**/AGENTS.md` - Agent instructions
- `**/README.md` - User-facing docs
- `**/CLAUDE.md` - Should point to AGENTS.md
- `**/skills/**/SKILL.md` - Skill definitions

## Audit Process

**Reference:** See `references/checklist.md` for package-specific verification steps.

### 1. Gather Documentation Files

```bash
# Find all documentation files
find . -name "AGENTS.md" -o -name "README.md" -o -name "CLAUDE.md" -o -name "SKILL.md" | grep -v node_modules
```

### 2. Structural Completeness

Every package in `packages/` and every app in `apps/` must have:

- [ ] README.md
- [ ] AGENTS.md
- [ ] CLAUDE.md (containing only `See [AGENTS.md](./AGENTS.md)`)

Report missing files.

### 3. AGENTS.md Content Audit

For each AGENTS.md, verify:

**Header format:**

```markdown
# Agent Instructions — {package-name}
```

**Required sections:**

- [ ] Build instructions with correct filter: `pnpm --filter {package} build`
- [ ] Structure section describing key directories
- [ ] Testing instructions (if package has tests)

**For component libraries (@josui/react, @josui/vue):**

Compare component tables against actual exports:

```bash
# Get actual exports from index.ts
grep -E "^export" packages/{package}/src/index.ts
```

Verify:

- [ ] All exported components listed in table
- [ ] Variants/sizes match component source
- [ ] No removed components still documented

### 4. Skill Content Audit

For each SKILL.md:

**Frontmatter required:**

```yaml
---
name: skill-name
description: What it does. When to use (triggers).
---
```

**For component skills (use-react-components, use-vue-components):**

Compare documented components against actual exports:

```bash
# Check actual component exports
grep -E "^export" packages/react/src/index.ts
```

Verify:

- [ ] All components in skill have usage examples
- [ ] Props tables match actual component interfaces
- [ ] Import statements are correct
- [ ] No deprecated APIs documented

**Cross-reference with AGENTS.md:**

- Components listed in AGENTS.md should match skill coverage

### 5. README.md Content Audit

Verify:

- [ ] Package name in header matches package.json name
- [ ] Installation command: `pnpm add {package-name}`
- [ ] Import examples match actual exports
- [ ] Links to Storybook/docs are valid (if referenced)

### 6. Cross-Reference Audit

Check consistency between:

- AGENTS.md component tables ↔ Skill component coverage
- AGENTS.md build commands ↔ package.json scripts
- README.md features list ↔ Actual exports

## Output Format

Report findings as:

```markdown
## Docs Audit Report

### Missing Files

- [ ] `packages/core/CLAUDE.md` — missing

### Outdated Content

- [ ] `packages/react/AGENTS.md:45` — Component table missing `Typography`
- [ ] `packages/react/skills/use-react-components/SKILL.md:89` — Badge variants outdated

### Inconsistencies

- [ ] `@josui/react` exports 8 components, AGENTS.md lists 7
- [ ] Skill documents `Checkbox` but component not exported

### Suggested Fixes

1. Add Typography to AGENTS.md component table
2. Update Badge variants in skill: add `info` variant
3. Remove Checkbox section from skill (not exported)
```

## Fixing Issues

After presenting the report, ask:

> "Would you like me to fix these issues? I'll update the documentation to match current code."

If approved:

1. Fix in order: CLAUDE.md → AGENTS.md → Skills → README.md
2. Show diff for each change
3. Verify cross-references after updates

## Quick Commands

```bash
# List all component exports (React)
grep -E "^export \{|^export type" packages/react/src/index.ts

# List all component exports (Vue)
grep -E "^export \{|^export type" packages/vue/src/index.ts

# Check skill frontmatter
head -5 .claude/skills/*/SKILL.md packages/*/skills/*/SKILL.md 2>/dev/null

# Find CLAUDE.md files not pointing to AGENTS.md
grep -L "AGENTS.md" */CLAUDE.md packages/*/CLAUDE.md apps/*/CLAUDE.md 2>/dev/null
```
