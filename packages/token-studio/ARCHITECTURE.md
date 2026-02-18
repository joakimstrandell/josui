# Architecture — @josui/token-studio

Installable CLI + local web UI for CRUD on DTCG token category files.

## Current Architecture (v1)

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

## Known limitation (v1)

`dev` mode does not provide frontend HMR yet. UI is served from built assets (`dist/web`).

## Roadmap

### Next up (v1.1)

1. **Developer HMR mode**
   - Run Vite dev server and API server in parallel.
   - Add CLI dev mode that proxies API and serves frontend with hot reload.
   - Keep production runtime unchanged (`dist/web` static serving).

### Short-term (v1.2)

1. **Change safety improvements**
   - Add optional "preview diff before save" mode.
   - Add undo stack for token edits in the UI session.

2. **Schema ergonomics**
   - Add richer field widgets for color and font-family editing.
   - Improve reference picker/autocomplete across all loaded categories.

### Medium-term

1. **Distribution polish**
   - Add templates for config bootstrap (`josui-token-studio init`).
   - Add docs for non-monorepo and non-josui folder layouts.

2. **Extended DTCG coverage**
   - Support more token types beyond current v1 set.
