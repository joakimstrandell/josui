# @josui/cli

CLI tools and Vite plugin for local development with josui packages.

## Installation

```bash
pnpm add -D @josui/cli
```

## Vite Plugin

Resolve `@josui/*` imports to local source during development. Add to your `vite.config.ts`:

```ts
import { josuiDev } from "@josui/cli/vite";

export default defineConfig({
  plugins: [josuiDev()],
});
```

The plugin auto-discovers all packages in your local josui repo and creates Vite aliases so imports resolve to the raw TypeScript source. This gives you HMR and avoids the symlink/node_modules pitfalls.

It also configures `resolve.dedupe` (React singleton), `server.fs.allow`, `optimizeDeps.exclude`, and `ssr.noExternal` automatically.

### Path resolution

The plugin finds your josui repo in this order:

1. **Param**: `josuiDev({ josuiPath: '../josui' })`
2. **Config file**: `josuiPath` in `.josui.json`
3. **Default**: `../josui`

If the path doesn't exist, the plugin silently disables itself (safe for CI/production).

## CLI

### Link skills

Symlink Claude Code skills from josui packages into your project:

```bash
npx josui link skills
```

Creates symlinks in `.claude/skills/` pointing to skill directories in josui packages. Re-running removes deprecated skills and re-links the current selection.

### Running from source

```bash
node <path-to-josui>/packages/cli/dist/index.mjs link skills
```

## Configuration

Settings are saved to `.josui.json` (add to `.gitignore`):

```json
{
  "josuiPath": "../josui",
  "linkedSkills": [{ "source": "react", "skills": ["use-react-components"] }]
}
```
