---
name: docs-audit
description: Audit documentation content for accuracy. Use when asked to check if documentation matches code (README.md, AGENTS.md, skills, ARCHITECTURE.md). For Storybook coverage, use storybook-audit instead.
---

# Documentation Audit

Verify that documentation content matches current code.

## Documentation Layers

| File              | Scope                  | Content                                                |
| ----------------- | ---------------------- | ------------------------------------------------------ |
| `README.md`       | Per package/app        | Single source of truth — structure, constraints, usage |
| `ARCHITECTURE.md` | Per package (optional) | Design decisions, tradeoffs, principles                |
| `AGENTS.md`       | Root only              | Build order, commit format, tooling, pre-commit        |
| `SKILL.md`        | Per skill              | Teachable knowledge for AI assistants                  |

Per-package AGENTS.md files should not exist. All package-level documentation belongs in README.md.

## Audit Process

### 1. Gather Documentation Files

```bash
find . \( -name "README.md" -o -name "ARCHITECTURE.md" -o -name "AGENTS.md" -o -name "SKILL.md" \) | grep -v node_modules
```

### 2. Structural Completeness

Every package in `packages/` and app in `apps/` must have:

- [ ] README.md (use `write-docs` skill for structure guidelines)

Flag violations:

- [ ] No per-package AGENTS.md files exist
- [ ] ARCHITECTURE.md (if present) is referenced from README.md

### 3. README.md Content Audit

- [ ] Package name in header matches package.json name
- [ ] Installation command matches package name (packages only, not apps)
- [ ] Import examples match actual exports
- [ ] Constraints section contains only non-obvious rules (not linter-enforceable)

**For packages that export code:**

```bash
grep -E "^export" packages/{package}/src/index.ts
```

Verify:

- [ ] Key exports mentioned (doesn't need to be exhaustive)
- [ ] No removed exports still documented

### 4. ARCHITECTURE.md Content Audit

If a package has an ARCHITECTURE.md:

- [ ] README.md references it
- [ ] Design decisions reflect current implementation
- [ ] No outdated constraints or removed features documented

### 5. Root AGENTS.md Audit

Should contain only non-discoverable operational info:

- [ ] Build order
- [ ] Code style conventions
- [ ] Commit format
- [ ] Release process
- [ ] Tooling details (Vite+)
- [ ] Pre-commit behavior

Flag if it contains:

- Package-specific instructions (belongs in package README.md)
- Content discoverable from code (package.json scripts, file structure)
- Rules a linter would catch

### 6. Skill Content Audit

**Frontmatter required:**

```yaml
---
name: skill-name
description: What it does. When to use (triggers).
---
```

**For component/package skills:**

- [ ] Props tables match actual component interfaces
- [ ] Import statements are correct
- [ ] No deprecated APIs documented

## Output Format

```markdown
## Docs Audit Report

### Missing Files

- [ ] `apps/foo/README.md` — missing

### Violations

- [ ] `packages/bar/AGENTS.md` — per-package AGENTS.md should not exist

### Outdated Content

- [ ] `packages/react/README.md:20` — references removed export `Foo`

### Suggested Fixes

1. Remove stale export reference
2. Add ARCHITECTURE.md link to README
```
