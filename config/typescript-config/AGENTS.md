# Agent Instructions — @josui/typescript-config

Shared TypeScript configuration package. **Published to npm.**

## Purpose

Provides shared TypeScript settings for josui projects. Ensures consistent compiler options and type-checking.

## Configs

- `base.json` — Shared strict settings (all configs extend this)
- `browser.json` — Browser projects (DOM libs, bundler resolution)
- `node.json` — Node.js projects (NodeNext module resolution)
- `react.json` — React projects (extends browser, adds JSX)

## Usage

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

1. Edit the appropriate JSON file in `src/`
2. Run `pnpm lint` to verify TypeScript still resolves correctly
3. Create a changeset for the version bump
