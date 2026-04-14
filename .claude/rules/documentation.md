---
paths:
  - "**/*.md"
---

# Documentation Rules

## Layers

1. **README.md** – Landing page. What it is, installation, what's included, short example, accessibility notes, links
2. **USAGE.md** (optional) – Comprehensive reference. Full API docs (every hook, component patterns, composition). For large packages, consider a `docs/` folder instead
3. **DEVELOPMENT.md** – For people changing the code. Structure, constraints, patterns
4. **CLAUDE.md** – References DEVELOPMENT.md (and USAGE.md if it exists). Agent-specific rules if any

README gets you started. USAGE is the full reference. DEVELOPMENT is for contributors.

## When to create USAGE.md

- Package has setup steps beyond a single import
- Multiple hooks or utilities that need documenting
- Component composition patterns worth explaining

Skip when usage is a single import line (e.g. `@josui/core`, `@josui/typescript-config`).

## Templates

### README: Packages

```markdown
# @josui/{name}

One-line description.

## Installation

pnpm add @josui/{name}

## What's included

{Category-level summary of exports}

## Usage

{Short example – 2-3 lines}

## Links

- [Usage guide](./USAGE.md) (if it exists)
- [Development](./DEVELOPMENT.md)
```

### README: Apps

```markdown
# {Name}

One-line description.

## Stack

{Tech choices – one line, comma-separated}

## Development

See [DEVELOPMENT.md](DEVELOPMENT.md) for dev commands, deployment, and constraints.
```

### USAGE.md

Comprehensive reference for consumers. Document every public API.

```markdown
# Usage – @josui/{name}

## Setup

{Step-by-step setup if needed}

## {Category}

{Document each export with signature, description, and example}
```

### DEVELOPMENT.md: Packages

```markdown
# Development – @josui/{name}

## Structure

{File layout tree – only if non-obvious}

## Constraints

- {Rules not enforceable by linters or inferable from code}

## Adding {utilities/components}

{How to add new items}
```

### DEVELOPMENT.md: Apps

```markdown
# Development – {name}

## Development / Build

{Commands}

## Structure

{Routing, layout – only if non-obvious}

## Deployment

{Where and how}

## Constraints

- {Don'ts and gotchas}
```

### CLAUDE.md

```markdown
DEVELOPMENT.md
```

If USAGE.md exists, add `USAGE.md` on a second line. Add agent-specific rules below only if needed.

## Constraints guidance

Only include things that are not enforced by a linter, not obvious from code, and have caused or would cause mistakes. Start each bullet with an imperative verb.

## Anti-patterns

- Don't document component props in markdown – that's what TypeScript and Storybook are for
- Don't duplicate root DEVELOPMENT.md content (commit conventions, tooling, code style)
- Don't add Installation sections for apps
- Don't put development content (structure, constraints) in README – use DEVELOPMENT.md
- No AGENTS.md or ARCHITECTURE.md files – use DEVELOPMENT.md instead
