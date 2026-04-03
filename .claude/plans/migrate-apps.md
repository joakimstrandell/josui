# Migrate Portfolio + Awkward Group into Josui Monorepo

## Status

Migration complete. All steps done on 2026-04-02.

- Code committed and pushed to main
- Vercel projects reconfigured to build from josui monorepo
- Both apps deployed successfully to production
- Old repos archived on GitHub with READMEs pointing to josui

## What was done (for reference)

- Git subtree added both repos into `apps/portfolio` and `apps/awkwardgroup` (squash merge)
- Package names: `@josui/portfolio`, `@josui/awkwardgroup`
- All `@josui/*` deps now use `workspace:*`
- Removed `@josui/cli` dep from portfolio (josuiDev plugin no longer needed)
- Fixed deprecated package names: `@josui/tailwind` -> `@josui/tailwind-preset`, `@josui/tokens` -> `@josui/token-studio`
- Fixed `@josui/react/src` imports to `@josui/react` (12 files in portfolio)
- tsconfig.json extends `@josui/typescript-config/react.json` in both apps
- Deleted eslint.config.ts, .prettierrc, pnpm-lock.yaml from both apps
- CLAUDE.md renamed to AGENTS.md with updated content
- Awkwardgroup port changed from 3001 to 3002 (avoids playground conflict)
- `__dirname` -> `import.meta.dirname` in both vite configs
- Updated .changeset/config.json ignore list
- Updated knip.config.ts with new app entries
- Added .vinxi to root .gitignore

## Port Map

| App               | Port |
| ----------------- | ---- |
| apps/docs         | 5173 |
| apps/playground   | 3001 |
| apps/portfolio    | 3000 |
| apps/awkwardgroup | 3002 |

## Key Risk: Nitro + Workspace Symlinks

If Nitro's SSR bundler can't resolve `@josui/*` through pnpm symlinks at deploy time, add to vite config:

```ts
ssr: {
  noExternal: ["@josui/core", "@josui/core-web", "@josui/react", "@josui/tailwind-preset"];
}
```
