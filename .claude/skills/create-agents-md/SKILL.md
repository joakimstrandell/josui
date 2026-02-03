---
name: create-agents-md
description: Create AGENTS.md files for AI coding agents. Use when asked to create, add, or write an AGENTS.md file.
---

# Create AGENTS.md

AGENTS.md provides instructions for AI coding agents working on a project. It complements README.md with agent-specific guidance.

## When to Create

- New packages or apps in a monorepo
- Projects that need AI agent guidance
- When asked to "create AGENTS.md" or "add agent instructions"

## File Location

- **Root**: `AGENTS.md` — monorepo-wide guidance
- **Packages**: `packages/*/AGENTS.md` — package-specific guidance
- **Apps**: `apps/*/AGENTS.md` — app-specific guidance

In monorepos, the closest AGENTS.md to the edited file takes precedence.

## Structure

```markdown
# Agent Instructions — {package-name}

Brief description of what this package/project is.

## Build

\`\`\`bash
pnpm --filter {package} build
\`\`\`

## Structure

Describe key directories and files.

## Key Tasks

Step-by-step instructions for common tasks agents will perform.

## Important

Gotchas, dependencies, or critical information.
```

## Content Guidelines

1. **Be actionable** — Include commands agents can run
2. **Be specific** — Avoid generic advice agents already know
3. **Be concise** — Keep under 100 lines per file
4. **Include commands** — Build, test, lint commands
5. **Note dependencies** — What must be built/run first

## Sections to Include

| Section   | Purpose                      |
| --------- | ---------------------------- |
| Build     | How to build the package     |
| Structure | Key files and directories    |
| Key Tasks | Step-by-step for common work |
| Testing   | How to verify changes        |
| Important | Gotchas and dependencies     |

## Example

```markdown
# Agent Instructions — @josui/react

React component library for the Josui design system.

## Build

\`\`\`bash
pnpm --filter @josui/react build
\`\`\`

## Structure

Components live in `src/components/`. Each component:

- Is a named export
- Uses Tailwind CSS classes
- Supports `className` prop

## Creating a Component

1. Create `src/components/ComponentName.tsx`
2. Export from `src/index.ts`
3. Add story in `apps/storybook-react`

## Testing

\`\`\`bash
pnpm --filter @josui/storybook-react dev
\`\`\`

## Important

Keep APIs identical to `@josui/vue` for consistency.
```
