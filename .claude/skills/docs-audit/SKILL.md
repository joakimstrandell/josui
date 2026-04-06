---
name: docs-audit
description: Audit documentation content for accuracy. Use when asked to check if documentation matches code (AGENTS.md, README.md, skills) or verify Storybook coverage for components.
---

# Documentation Audit

Verify that documentation content matches current code.

## Scope

Audit documentation content in:

- `**/AGENTS.md` - Agent instructions (how to work with the code)
- `**/ARCHITECTURE.md` - Design decisions and constraints
- `**/README.md` - User-facing docs
- `**/skills/**/SKILL.md` - Skill definitions

For package registry consistency (README table, changeset config), use `package-audit` instead.

## Documentation File Purposes

| File              | Audience           | Content                                   |
| ----------------- | ------------------ | ----------------------------------------- |
| `AGENTS.md`       | AI agents          | How to build, test, and modify the code   |
| `ARCHITECTURE.md` | AI agents + humans | Design decisions, constraints, principles |
| `README.md`       | Humans             | Installation, usage, API reference        |

**Key distinction:**

- `AGENTS.md` = **How** to work with the code (build commands, file structure, testing)
- `ARCHITECTURE.md` = **Why** decisions were made (constraints, tradeoffs, principles)

## Ownership Principle

Each package/app documents **only its own** concerns. An app's AGENTS.md should NOT document components, classes, or APIs from its dependencies — that belongs in the dependency's own docs.

- `packages/react/AGENTS.md` → documents @josui/react components
- `packages/tailwind-preset/AGENTS.md` → documents copy system, tokens, CSS files
- `apps/portfolio/AGENTS.md` → documents routing, deployment, app-specific config
- `apps/portfolio/AGENTS.md` → does NOT document how to use `copy` classes or `<Button>`

## Audit Process

### 1. Gather Documentation Files

```bash
find . \( -name "AGENTS.md" -o -name "ARCHITECTURE.md" -o -name "README.md" -o -name "SKILL.md" \) | grep -v node_modules
```

### 2. Structural Completeness

Every package in `packages/` and app in `apps/` must have:

- [ ] README.md
- [ ] AGENTS.md (must reference ARCHITECTURE.md if it exists)
- [ ] ARCHITECTURE.md (optional, for packages with design decisions)

### 3. AGENTS.md Content Audit

**Required sections:**

- [ ] Build instructions with correct filter: `pnpm --filter {package} build`
- [ ] Structure section describing key directories and files
- [ ] Testing instructions (if package has tests)

**Scope check — flag if an AGENTS.md documents things that belong elsewhere:**

- App AGENTS.md listing component props/variants from a dependency package
- App AGENTS.md documenting CSS classes from the tailwind preset
- Duplicated instructions that already exist in a dependency's docs

**For packages that export code (e.g. @josui/react):**

```bash
grep -E "^export" packages/{package}/src/index.ts
```

Verify:

- [ ] All exported components listed in table
- [ ] Variants/sizes match component source
- [ ] No removed components still documented

### 4. ARCHITECTURE.md Content Audit

If a package has an ARCHITECTURE.md:

- [ ] AGENTS.md references it near the top
- [ ] Design decisions reflect current implementation
- [ ] No outdated constraints or removed features documented
- [ ] Tradeoffs still apply to current code

**Check AGENTS.md references ARCHITECTURE.md:**

```bash
grep -L "ARCHITECTURE.md" packages/*/AGENTS.md 2>/dev/null | while read f; do
  dir=$(dirname "$f")
  if [ -f "$dir/ARCHITECTURE.md" ]; then
    echo "Missing reference: $f"
  fi
done
```

### 5. Skill Content Audit

**Frontmatter required:**

```yaml
---
name: skill-name
description: What it does. When to use (triggers).
---
```

**For component/package skills:**

- [ ] Props tables match actual component interfaces
- [ ] Import statements are correct (package names, paths)
- [ ] No deprecated APIs documented
- [ ] No removed exports still referenced

### 6. README.md Content Audit

- [ ] Package name in header matches package.json name
- [ ] Installation command: `pnpm add {package-name}`
- [ ] Import examples match actual exports

### 7. Cross-Reference Audit

- AGENTS.md component tables ↔ Skill component coverage
- AGENTS.md build commands ↔ package.json scripts
- AGENTS.md file structure ↔ Actual files on disk
- README.md features list ↔ Actual exports

### 8. Storybook Audit (@josui/react)

Every exported component must have complete story coverage.

**Check story files exist:**

```bash
# React - list components without stories
for comp in $(ls packages/react/src/components/); do
  if [ ! -f "packages/react/src/components/$comp/$comp.stories.tsx" ]; then
    echo "Missing: $comp.stories.tsx"
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

- [ ] `packages/foo/AGENTS.md` — missing

### Outdated Content

- [ ] `packages/react/AGENTS.md:45` — Component table missing `Typography`
- [ ] `packages/react/skills/use-react-components/SKILL.md:12` — Setup imports outdated

### Ownership Violations

- [ ] `apps/portfolio/AGENTS.md:20` — Documents `copy` classes (belongs in tailwind-preset)

### Inconsistencies

- [ ] `@josui/react` exports 10 components, AGENTS.md lists 8

### Storybook Coverage

| Package | Component | Stories | autodocs | args | Variants | Sizes |
| ------- | --------- | ------- | -------- | ---- | -------- | ----- |
| react   | Button    | ✓       | ✓        | ✓    | 5/5      | 3/3   |
| react   | Input     | ✓       | ✗        | ✗    | —        | 0/3   |

### Suggested Fixes

1. Add Typography to AGENTS.md component table
2. Update skill setup section
3. Add autodocs tag to Input stories
```

## Quick Commands

```bash
# List component exports
grep -E "^export \{|^export type" packages/react/src/index.ts

# Check skill frontmatter
head -5 .claude/skills/*/SKILL.md packages/*/skills/*/SKILL.md 2>/dev/null

# List all story files
find packages/react/src/components -name "*.stories.tsx"

# Check stories have autodocs tag
grep -L "autodocs" packages/react/src/components/*/*.stories.tsx 2>/dev/null

# Check stories have meta args
grep -L "args:" packages/react/src/components/*/*.stories.tsx 2>/dev/null
```
