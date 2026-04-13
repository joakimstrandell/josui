# @josui/typescript-config

Shared TypeScript configurations for josui projects.

## Installation

```bash
pnpm add -D @josui/typescript-config
```

## Configs

- `base.json` — Shared strict settings
- `browser.json` — Browser/bundler projects (DOM libs)
- `node.json` — Node.js projects (NodeNext)
- `react.json` — React projects (extends browser)

## Usage

```json
{
  "extends": "@josui/typescript-config/react.json"
}
```

```json
{
  "extends": "@josui/typescript-config/node.json"
}
```

## Key Settings

- `strict: true` in base config
- `noEmit: true` — type-checking only (bundlers handle emit)
- `allowImportingTsExtensions: true` in node config
