# @josui/token-studio

Local CRUD editor for DTCG token category files.

See architecture and roadmap: `ARCHITECTURE.md`.

## Usage

### In this monorepo (development)

```bash
pnpm --filter @josui/token-studio build
pnpm --filter @josui/token-studio exec josui-token-studio
```

### In any project (installed package consumer)

Install:

```bash
npm install -D @josui/token-studio
```

Run:

```bash
npx josui-token-studio
# or
npm exec josui-token-studio
# or
pnpm exec josui-token-studio
```

Global install is also supported:

```bash
npm install -g @josui/token-studio
josui-token-studio
```

### CLI options

- `--cwd <path>`: project root (defaults to current directory)
- `--config <path>`: explicit config file path
- `--tokens-dir <path>`: override token category folder
- `--port <number>`: local server port
- `--no-open`: do not open browser automatically

## Config File

Token Studio auto-discovers a config file by walking upward from the current directory:

- `token-studio.config.json`
- `.token-studio.json`

Example:

```json
{
  "tokensDir": "packages/tokens/src/tokens",
  "terrazzoPath": "packages/tokens/terrazzo.config.mjs"
}
```

Create this file at your project root (or pass `--config <path>`).

`--tokens-dir` still takes precedence over config values.

## Routes

- `/categories`
- `/categories/$name`
- `/changes`
- `/settings`
