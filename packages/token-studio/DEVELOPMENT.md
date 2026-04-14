# Development – @josui/token-studio

## Architecture

- **CLI**: `src/cli.ts` (`josui-token-studio`)
- **API server**: Hono (`src/server/*`)
- **UI**: React + TanStack Router (`src/web/*`)
- **Validation**: Zod request validation + custom DTCG validators (`src/shared/*`)
- **Write safety**: validate-first, atomic JSON write (temp + rename)
- **Config**: supports `token-studio.config.json` / `.token-studio.json` discovery

## Supported UX (v1)

- Category file CRUD in `packages/tokens/src/tokens`
- Token CRUD for: `color`, `dimension`, `duration`, `cubicBezier`, `fontFamily`, `number`, `string`
- Token references (`{path.to.token}`)
- Optional mode values (`$extensions.mode.light` / `dark`)
- Terrazzo token-list sync in `packages/tokens/terrazzo.config.mjs`

## Known limitations

`dev` mode does not provide frontend HMR yet. UI is served from built assets (`dist/web`).

## Constraints

- `@josui/tokens` is source-of-truth for token data
- Writes must be validate-first and atomic
- Maintain file/root-key naming parity (e.g. `animation.json` -> `animation`)
- Keep Terrazzo token list sync idempotent

## Roadmap

### Next up (v1.1)

1. **Developer HMR mode** – Run Vite dev server and API server in parallel with CLI dev mode that proxies API and serves frontend with hot reload. Keep production runtime unchanged.

### Short-term (v1.2)

1. **Change safety** – Optional "preview diff before save" mode, undo stack for token edits in UI session.
2. **Schema ergonomics** – Richer field widgets for color and font-family editing, improved reference picker/autocomplete.

### Medium-term

1. **Distribution polish** – Config bootstrap templates (`josui-token-studio init`), docs for non-monorepo layouts.
2. **Extended DTCG coverage** – Support more token types beyond current v1 set.
