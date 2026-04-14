---
paths:
  - "**/*.md"
---

# Documentation Rules

## Layers

1. **README.md** – The way in. What it is, what's inside, how to use it, links
2. **USAGE.md** (optional) – Comprehensive reference. Full API docs, setup guides, composition patterns
3. **DEVELOPMENT.md** – For contributors. Structure, constraints, patterns
4. **CLAUDE.md** – References DEVELOPMENT.md (and USAGE.md if it exists). Agent-specific rules if any

README gets you started. USAGE is the full reference. DEVELOPMENT is for contributors.

## When to create USAGE.md

- Package has setup steps beyond a single import
- Multiple hooks or utilities that need documenting
- Component composition patterns worth explaining

Skip when usage is a single import line.

## Templates

### README: Packages

```markdown
# @josui/{name}

{What it is – one or two sentences}

## What's inside

pnpm add @josui/{name}

{Category-level overview of exports}

{Short usage example – 2-3 lines}

{Links to USAGE.md, Storybook, docs/ if applicable}

## Development

See [DEVELOPMENT.md](DEVELOPMENT.md).
```

### README: Apps

```markdown
# {Name}

{What it is}

## Stack

{Tech choices – one line, comma-separated}

## Development

See [DEVELOPMENT.md](DEVELOPMENT.md).
```

### README: Root

```markdown
# {Name}

{What it is}

## What's inside

{Overview of packages and apps}

{Short dev commands overview}

See [DEVELOPMENT.md](DEVELOPMENT.md).

## Documentation

{How documentation is structured in this repo}
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
