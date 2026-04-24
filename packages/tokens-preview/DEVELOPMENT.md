# Development – @josui/tokens-preview

## Architecture

- **CLI**: `src/cli.ts` (`josui-tokens-preview`)
- **Server**: Hono (`src/server/*`) — serves web shell, proxies user CSS, SSE live-reload
- **Web**: React + Tailwind default preset (`src/web/*`) — reads tokens via CSSOM

## How it works

1. CLI resolves `--input` and starts the server
2. `/tokens.css` reads the input file from disk, rewrites `@theme {}` and `:root`
   selectors to a scoped `.tp-preview-scope` class, and serves the result
3. `chokidar` watches the file; `/events` streams SSE messages to the browser
4. On change, the web shell swaps the `<link>` href and bumps a version counter
   so sections re-read CSSOM and render fresh values
5. Grouping is prefix-based (`color-`, `text-`, `spacing-`, …) — agnostic to
   specific token names

## Constraints

- Tool chrome must not use user-supplied tokens — user tokens are scoped to
  `.tp-preview-scope` so preset defaults drive the UI
- Treat `--input` paths as potentially outside the repo — always resolve
  absolute before serving
