# Development

## Key Settings

- `strict: true` in base config
- `noEmit: true` – type-checking only (bundlers handle emit)
- `allowImportingTsExtensions: true` in node config

## Constraints

- All project configs extend `base.json`
- No emit – TypeScript is used for type-checking only
