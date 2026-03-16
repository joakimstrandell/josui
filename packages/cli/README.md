# @josui/cli

CLI tool for linking josui packages and skills to external projects.

## Installation

```bash
pnpm add @josui/cli
```

## Usage

```bash
pnpm josui link packages
pnpm josui link skills
```

Or with npx:

```bash
npx josui link packages
```

### Running from source

If you're developing josui locally, you can run the CLI directly:

```bash
node <path-to-josui>/packages/cli/dist/index.js
```

Replace `<path-to-josui>` with the relative path to your josui checkout (e.g., `../josui`).

## Commands

### Link packages

Link `@josui/*` packages from your local josui checkout:

```bash
josui link packages
```

This replaces npm-installed packages in `node_modules/@josui/` with symlinks to your local josui packages, enabling hot reload during development.

### Link skills

Link Claude Code skills from josui packages:

```bash
josui link skills
```

This creates symlinks in `.claude/skills/` for selected skills from josui packages.

## Configuration

The CLI saves your settings to `.josui.json` in your project root:

```json
{
  "josuiPath": "../josui",
  "linkedPackages": ["core", "core-web", "react", "tailwind", "tokens"],
  "linkedSkills": [{ "source": "react", "skills": ["use-react-components"] }]
}
```

When you run the CLI again, it offers to re-link using the saved config.

## How It Works

1. `pnpm install` creates a clean lockfile with npm versions
2. The CLI replaces `node_modules/@josui/*` with symlinks to local packages
3. The lockfile stays unchanged — CI works with the committed lockfile
4. Config is saved for quick re-linking after future installs
