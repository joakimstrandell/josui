# Agent Instructions — @josui/cli

CLI tools and Vite plugin for local development with josui packages.

## Build

```bash
pnpm --filter @josui/cli build
```

Uses vp to bundle to `dist/`. Two entry points: `src/index.ts` (CLI) and `src/vite.ts` (Vite plugin).

## Structure

```
src/
├── index.ts                  # CLI entry point
├── vite.ts                   # Vite plugin for local package aliasing
├── commands/
│   └── link-skills.ts        # Link Claude Code skills via symlinks
└── utils/
    └── config.ts             # .josui.json read/write utilities
```

## CLI Commands

| Command             | Description                |
| ------------------- | -------------------------- |
| `josui link skills` | Symlink Claude Code skills |
| `josui`             | Interactive main menu      |

## Vite Plugin

Consumers add to their `vite.config.ts`:

```ts
import { josuiDev } from "@josui/cli/vite";

export default defineConfig({
  plugins: [josuiDev()],
});
```

Resolves `@josui/*` imports to local source via Vite aliases. Also configures `resolve.dedupe`, `server.fs.allow`, `optimizeDeps.exclude`, and `ssr.noExternal`.

Path resolution: `josuiPath` param > `.josui.json` > `../josui` default.

## Guidelines

- Uses `@inquirer/prompts` for interactive CLI prompts
- Handle `ExitPromptError` for graceful Ctrl+C cancellation
- `link skills` removes all existing `josui-linked-*` symlinks before creating new ones (cleans up deprecated skills)
