---
name: write-docs
description: Guide for writing and structuring documentation in this monorepo. Use when creating or editing README.md or ARCHITECTURE.md files, scaffolding a new package/app, or when a package's docs are outgrowing its README. Triggers on "write docs", "create readme", "update the readme", "add architecture docs", or when documentation needs restructuring.
---

# Writing Documentation

## Two layers

**README.md** — The baseline. Single source of truth for both humans and AI. What it is, how to use it, constraints. Every package and app must have one.

**ARCHITECTURE.md** — Extended docs. Design decisions, tradeoffs, constraints that aren't obvious from the code. Optional — create when a package has decisions worth explaining beyond what fits in a README.

If something can be inferred from reading the code, it doesn't belong in either file. Every line should earn its place.

## When to escalate from README to ARCHITECTURE.md

README is enough when the package is straightforward — use it, here's the structure, here are the constraints.

Add ARCHITECTURE.md when:

- Design decisions need justification ("why X instead of Y")
- There are constraints driven by external factors (compliance, performance, compatibility)
- The implementation has non-obvious tradeoffs future contributors need to understand
- README constraints section is growing beyond ~10 bullets

Reference it from README: `See [ARCHITECTURE.md](./ARCHITECTURE.md) for design decisions.`

## README structure: Packages

```markdown
# @josui/{name}

One-line description. Works in {environments}.

## Installation

pnpm add @josui/{name}

## Usage

{Minimal code example — 3-5 lines}

## Utilities / Components

{What it exports — brief, not exhaustive. Group by category if >10 items.}

{If no build step: "No build step — consumers import TypeScript source directly."}

## Structure (only if non-obvious)

{File layout tree}

## Constraints

- {Bullet list of rules not enforceable by linters or inferable from code}
```

## README structure: Apps

```markdown
# {Name}

One-line description with tech stack mention.

## Stack

{Tech choices — one line, comma-separated}

## Development / Build

{Commands}

## Structure (optional, only if routing or layout is non-obvious)

## Deployment

{Where and how}

## Constraints

- {Don'ts and gotchas as bullet list}
```

## ARCHITECTURE.md structure

```markdown
# Architecture — @josui/{name}

## Overview

{What this package does and why it exists — 2-3 sentences}

## Decisions

### {Decision title}

**Choice:** {What was chosen}
**Why:** {Rationale — constraints, tradeoffs, external factors}
**Alternatives considered:** {What was rejected and why}

## Constraints

- {Rules driven by design decisions above}
```

## Constraints section guidance

Only include things that are:

- Not enforced by a linter
- Not obvious from reading the code
- Have caused or would cause mistakes

Start each bullet with an imperative verb. Add a brief reason when non-obvious:

```markdown
- Don't manually edit `src/routeTree.gen.ts` — it's auto-generated
- No browser APIs (`window`, `document`) — must work in Node.js and SSR
```

## Anti-patterns

- Don't list every export — that's what `src/index.ts` is for
- Don't document component props — that's what TypeScript and Storybook are for
- Don't duplicate root AGENTS.md content (commit conventions, tooling, code style)
- Don't add a Build section for "no build step" — say it inline after the exports list
- Don't write an Installation section for apps (they aren't published)
- Keep README under ~80 lines; if growing beyond that, split into ARCHITECTURE.md
