# Agent Instructions — @josui/token-studio

Local CLI + web editor for DTCG token CRUD.

## Development

```bash
pnpm --filter @josui/token-studio build
pnpm --filter @josui/token-studio dev
```

## Key constraints

- Keep `@josui/tokens` as source-of-truth for token data.
- Writes must remain validate-first and atomic.
- Maintain file/root-key naming parity (e.g. `animation.json` -> `animation`).
- Keep Terrazzo token list sync idempotent.
