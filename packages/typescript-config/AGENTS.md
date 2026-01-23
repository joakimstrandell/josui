# Agent Instructions — @josui/typescript-config

Shared TypeScript configurations for the monorepo.

## Configs

- `base.json` — Shared strict settings (all packages extend this)
- `browser.json` — Browser projects (DOM libs, bundler resolution)
- `node.json` — Node.js projects (NodeNext module resolution)
- `react.json` — React projects (extends browser, adds JSX)
- `vue.json` — Vue projects (extends browser, adds Vue types)

## Usage

Packages extend the appropriate config:

```json
{
  "extends": "@josui/typescript-config/react.json"
}
```

## Key Settings

- `strict: true` in base config
- `noEmit: true` for type-checking only (bundlers handle emit)
- `allowImportingTsExtensions: true` in node config

## Modifying Configs

1. Edit the appropriate JSON file
2. Run `pnpm lint` to verify TypeScript still resolves correctly
3. Changes affect all packages extending that config

## Important

Changes affect all packages extending these configs. Test with `pnpm lint` from root.
