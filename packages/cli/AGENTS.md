# Agent Instructions — @josui/cli

CLI tools for local development with josui packages.

## Build

```bash
pnpm --filter @josui/cli build
```

Uses tsup to bundle to `dist/`. The `bin` entry (`josui`) points to `dist/index.js`.

## Structure

```
src/
├── index.ts                  # Entry point, interactive menu
├── commands/
│   ├── watch.ts              # Watch & copy @josui/* src files to consumer node_modules
│   └── link-skills.ts        # Link Claude Code skills
└── utils/
    └── config.ts             # Configuration utilities (.josui.json)
```

## Commands

| Command             | Description                                                   |
| ------------------- | ------------------------------------------------------------- |
| `josui watch`       | Copy & watch @josui/\* src files into consumer's node_modules |
| `josui link skills` | Link Claude Code skills from josui                            |
| `josui`             | Interactive main menu                                         |

### Watch

Reads `.josui.json` in the consumer project for `josuiPath` and `linkedPackages`. On start, does a full copy of each package's `src/` into `node_modules/@josui/<pkg>/src/`, then watches for file changes using `fs.watch` (recursive). Run from the consumer project:

```bash
npx ../josui/packages/cli watch
```

## Guidelines

- Uses `@inquirer/prompts` for interactive prompts
- All commands support both direct invocation and interactive selection
- Handle `ExitPromptError` for graceful Ctrl+C cancellation
