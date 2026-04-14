---
name: docs-audit
description: Audit documentation content for accuracy. Use when asked to check if documentation matches code (README.md, DEVELOPMENT.md, USAGE.md, CLAUDE.md). For Storybook coverage, use storybook-audit. For skill accuracy against source code, use skill-audit.
---

# Documentation Audit

Verify that documentation content matches current code.

## Documentation Layers

| File             | Scope                  | Content                                                           |
| ---------------- | ---------------------- | ----------------------------------------------------------------- |
| `README.md`      | Per package/app + root | Landing page – what it is, install, exports, short usage, links   |
| `USAGE.md`       | Per package (optional) | Setup guides, configuration, extended examples                    |
| `DEVELOPMENT.md` | Per package/app + root | Structure, constraints, patterns. Root: code style, commits, etc. |
| `CLAUDE.md`      | Per package/app + root | References DEVELOPMENT.md, agent-specific rules                   |
| `SKILL.md`       | Per skill              | Teachable knowledge for AI assistants                             |

No AGENTS.md or ARCHITECTURE.md files should exist anywhere.

## Audit Process

### 1. Gather Documentation Files

```bash
find . \( -name "README.md" -o -name "DEVELOPMENT.md" -o -name "USAGE.md" -o -name "CLAUDE.md" -o -name "AGENTS.md" -o -name "ARCHITECTURE.md" -o -name "SKILL.md" \) | grep -v node_modules
```

### 2. Structural Completeness

Every package in `packages/` and app in `apps/` must have:

- [ ] README.md
- [ ] DEVELOPMENT.md
- [ ] CLAUDE.md

Root must have:

- [ ] README.md
- [ ] DEVELOPMENT.md
- [ ] CLAUDE.md

Flag violations:

- [ ] No AGENTS.md files exist anywhere (replaced by DEVELOPMENT.md)
- [ ] No ARCHITECTURE.md files exist (merged into DEVELOPMENT.md)
- [ ] USAGE.md exists for complex packages (react, core-web, tailwind-preset, token-studio)

### 3. README.md Content Audit

- [ ] Package name in header matches package.json name
- [ ] Installation command matches package name (packages only, not apps)
- [ ] Links to DEVELOPMENT.md
- [ ] Links to USAGE.md (if USAGE.md exists)
- [ ] Key exports mentioned (category-level, not exhaustive)

**Check against `.claude/rules/documentation.md` anti-patterns:**

- [ ] No development content in README (structure trees, constraints belong in DEVELOPMENT.md)
- [ ] No extended usage examples in README (belong in USAGE.md)
- [ ] No exhaustive per-function/component export lists
- [ ] No component props documented
- [ ] No Installation section on apps
- [ ] No duplicate of root DEVELOPMENT.md content (commit conventions, tooling, code style)

### 4. DEVELOPMENT.md Content Audit

- [ ] Constraints reflect current implementation
- [ ] No outdated patterns or removed features documented
- [ ] Structure tree (if present) matches actual file layout

### 5. USAGE.md Content Audit

If a package has a USAGE.md:

- [ ] Import examples match actual exports
- [ ] Setup instructions are accurate
- [ ] No removed exports still documented

### 6. CLAUDE.md Content Audit

- [ ] References DEVELOPMENT.md
- [ ] References USAGE.md (if USAGE.md exists for that package)
- [ ] Agent-specific rules (if any) are still relevant

### 7. Root DEVELOPMENT.md Audit

Should contain only repo-wide development guidelines:

- [ ] Code style conventions
- [ ] Commit format
- [ ] Release process
- [ ] Tooling details
- [ ] Pre-commit behavior

Flag if it contains:

- Package-specific instructions (belongs in package DEVELOPMENT.md)
- Content discoverable from code (package.json scripts, file structure)
- Rules a linter would catch

### 8. Skill Structure Check

Verify skill files have valid frontmatter (`name` + `description`). For deep accuracy auditing of skill content against source code, use `skill-audit` instead.

## Output Format

Report findings grouped by: Missing Files, Violations, Outdated Content, Anti-pattern Violations, Suggested Fixes. Use checklist format with file paths and brief descriptions.
