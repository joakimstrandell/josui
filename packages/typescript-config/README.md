# @josui/typescript-config

Shared TypeScript configurations for josui projects.

## Installation

```bash
pnpm add -D @josui/typescript-config
```

## What's included

- `base.json` – Shared strict settings
- `browser.json` – Browser/bundler projects (DOM libs)
- `node.json` – Node.js projects (NodeNext)
- `react.json` – React projects (extends browser)

## Usage

```json
{
  "extends": "@josui/typescript-config/react.json"
}
```

## Development

See [DEVELOPMENT.md](DEVELOPMENT.md) for key settings and constraints.
