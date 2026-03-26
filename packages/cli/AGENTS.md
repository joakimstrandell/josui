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
│   ├── link-packages.ts      # Link @josui/* packages for local dev
│   └── link-skills.ts        # Link Claude Code skills
└── utils/
    └── config.ts             # Configuration utilities
```

## Commands

| Command               | Description                                   |
| --------------------- | --------------------------------------------- |
| `josui link packages` | Link @josui/\* packages for local development |
| `josui link skills`   | Link Claude Code skills from josui            |
| `josui link`          | Interactive link menu                         |
| `josui`               | Interactive main menu                         |

## Guidelines

- Uses `@inquirer/prompts` for interactive prompts
- All commands support both direct invocation and interactive selection
- Handle `ExitPromptError` for graceful Ctrl+C cancellation
