# @josui/typescript-config

Shared TypeScript configurations for the Josui monorepo.

## Configs

- `base.json` — Shared strict settings
- `browser.json` — Browser/bundler projects (DOM libs)
- `node.json` — Node.js projects (NodeNext)
- `react.json` — React projects (extends browser)
- `vue.json` — Vue projects (extends browser)

## Usage

```json
{
  "extends": "@josui/typescript-config/react.json"
}
```

Internal package — not published to npm.
