# @josui/typescript-config

Shared TypeScript configurations for josui projects.

## What's inside

```bash
pnpm add -D @josui/typescript-config
```

- `base.json` – Shared strict settings
- `browser.json` – Browser/bundler projects (DOM libs)
- `node.json` – Node.js projects (NodeNext)
- `react.json` – React projects (extends browser)

```json
{
  "extends": "@josui/typescript-config/react.json"
}
```

## Development

See [DEVELOPMENT.md](./DEVELOPMENT.md).
