# @josui/typescript-config

> Internal package — not published to npm

Shared TypeScript configurations for the josui monorepo.

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
