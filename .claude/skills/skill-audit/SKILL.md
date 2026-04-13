---
name: skill-audit
description: Audit skills for accuracy against current code. Use when asked to check if skills are up to date, verify skill content matches source code, or audit skill accuracy. Reads actual source files to verify imports, props, APIs, and examples in skills are correct.
---

# Skill Audit

Verify that skill content is accurate against current source code. This goes beyond docs-audit — it reads actual code to catch drift.

## Scope

All skills in:

- `.claude/skills/*/SKILL.md` — project-level skills
- `packages/*/skills/*/SKILL.md` — package-published skills

## Audit Process

### 1. Discover Skills

```bash
find .claude/skills packages/*/skills -name "SKILL.md" 2>/dev/null | grep -v node_modules
```

### 2. Per-Skill Verification

For each skill, read the SKILL.md then verify against source code:

**Frontmatter:**

- [ ] `name` and `description` fields present
- [ ] Description accurately reflects what the skill does
- [ ] Trigger conditions in description match the skill's actual scope

**Imports and exports:**

- [ ] All `import { X } from "@josui/..."` statements resolve to real exports
- [ ] No imports reference removed or renamed exports

```bash
# For each import in the skill, verify it exists
grep -E "^export" packages/{package}/src/index.ts
```

**Component/function APIs:**

- [ ] Props tables match actual TypeScript interfaces
- [ ] Variant and size values match source definitions
- [ ] Default values are correct
- [ ] No documented props that were removed
- [ ] No missing props that were added

```bash
# Check component interface
grep -A 20 "export interface" packages/react/src/components/{Component}/{Component}.tsx
```

**Code examples:**

- [ ] Examples use current API (no deprecated patterns)
- [ ] Import paths are correct
- [ ] Props in examples exist on the component

**Cross-references:**

- [ ] Referenced skills exist (e.g., "use storybook-audit instead")
- [ ] Referenced files exist (e.g., "see ARCHITECTURE.md")

### 3. Coverage Check

For package-published skills (e.g., `use-react-components`):

- [ ] All exported components/utilities are documented in the skill
- [ ] No removed exports still documented

```bash
# Compare skill coverage to actual exports
grep -E "^export" packages/{package}/src/index.ts
grep "^## " packages/{package}/skills/*/SKILL.md
```

## Output Format

```markdown
## Skill Audit Report

### {skill-name}

**Status:** Needs update / Up to date

#### Stale Content

- [ ] `Button` props table lists `leftIcon`/`rightIcon` — removed in source
- [ ] Import example uses `@josui/tailwind` — package renamed to `@josui/tailwind-preset`

#### Missing Coverage

- [ ] `ThemeToggle` component exported but not documented in skill
- [ ] `useKeyboardShortcut` hook exported but not documented

#### Invalid References

- [ ] References `storybook-audit` skill — does not exist at expected path

### Summary

| Skill                | Status       | Issues |
| -------------------- | ------------ | ------ |
| use-react-components | Needs update | 3      |
| write-docs           | Up to date   | 0      |
| docs-audit           | Up to date   | 0      |
```
