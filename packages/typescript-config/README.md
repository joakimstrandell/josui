# @josui/typescript-config

Shared TypeScript configurations for the Josui design system.

## Installation

```bash
pnpm add -D @josui/typescript-config typescript
```

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

```json
{
  "extends": "@josui/typescript-config/vue.json"
}
```

```json
{
  "extends": "@josui/typescript-config/node.json"
}
```
