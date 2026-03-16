# @josui/cli

CLI tool for linking josui packages and skills to external projects.

## Usage

Run the CLI from your project directory:

```bash
node <path-to-josui>/packages/cli/dist/index.js
```

Replace `<path-to-josui>` with the relative path to your josui checkout (e.g., `../josui`).

## Commands

### Link packages

Link `@josui/*` packages from your local josui checkout:

```bash
node <path-to-josui>/packages/cli/dist/index.js link packages
```

This replaces npm-installed packages in `node_modules/@josui/` with symlinks to your local josui packages, enabling hot reload during development.

### Link skills

Link Claude Code skills from josui packages:

```bash
node <path-to-josui>/packages/cli/dist/index.js link skills
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

## Recommended Setup

Add a convenience script to your `package.json`:

```json
{
  "scripts": {
    "link:josui": "node ../josui/packages/cli/dist/index.js link packages"
  }
}
```

**Workflow:**

```bash
pnpm install        # Install from npm (clean, committable lockfile)
pnpm run link:josui # Replace with local symlinks
```

## How It Works

1. `pnpm install` creates a clean lockfile with npm versions
2. The CLI replaces `node_modules/@josui/*` with symlinks to local packages
3. The lockfile stays unchanged — CI works with the committed lockfile
4. Config is saved for quick re-linking after future installs

## Internal Monorepo Use

From within the josui monorepo, run:

```bash
node packages/cli/dist/index.js link skills
```
