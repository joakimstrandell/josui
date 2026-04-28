# AGENTS

This document is the agent-agnostic entrypoint for working in the `josui` monorepo.

## Purpose

`josui` is a monorepo for:

- Shared design system libraries
- Shared web utility libraries
- Web applications built on top of those libraries

Token tooling is intentionally out of scope for this repository.

## Monorepo Layout

- `packages/` shared libraries (for example `react`, `core`, `core-web`, `tailwind-preset`, `typescript-config`)
- `apps/` web applications (`playground`, `portfolio`, `awkwardgroup`)
- Root configuration for workspace tooling and quality gates

## Core Workflow

1. Install dependencies with `pnpm install`
2. Use root scripts for day-to-day work:
   - `pnpm dev`
   - `pnpm build`
   - `pnpm test`
   - `pnpm check`
3. Prefer touching the smallest relevant package/app and keep changes scoped

## Documentation Contract

- `README.md` project overview and quick start
- `AGENTS.md` agent workflow and architecture context
- `DEVELOPMENT.md` engineering conventions and release process
- Package/app `README.md` and `DEVELOPMENT.md` for local details

If documentation and code disagree, update documentation in the same change.

## Commit and Release Rules

- Follow Conventional Commits: `<type>(<scope>): <description>`
- Run tests/checks before commit when relevant to changed areas
- Do not create changesets unless explicitly requested by the user

## Working Principles for Agents

- Be architecture-aware before proposing broad changes
- Keep edits consistent with existing patterns in the touched package/app
- Prefer incremental, reviewable changes over large rewrites
