# Agent Instructions — @josui/typescript-config

Internal TypeScript configuration for the josui monorepo. **Not published to npm.**

## Purpose

Provides shared TypeScript settings for all packages and apps in this monorepo. This ensures consistent compiler options and type-checking across the codebase.

## Configs

- `base.json` — Shared strict settings (all configs extend this)
- `browser.json` — Browser projects (DOM libs, bundler resolution)
- `node.json` — Node.js projects (NodeNext module resolution)
- `react.json` — React projects (extends browser, adds JSX)

## Usage (monorepo only)

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
3. Changes affect all packages in this monorepo

## Important

- This package is private and not published to npm
- External projects consuming @josui packages should use their own tsconfig
- Only packages/ contents are published; config/ is internal tooling
