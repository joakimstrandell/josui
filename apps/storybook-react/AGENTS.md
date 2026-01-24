# Agent Instructions — @josui/storybook-react

Storybook for React components.

## Development

```bash
pnpm --filter @josui/storybook-react dev
```

Runs at http://localhost:6006

## Build

```bash
pnpm --filter @josui/storybook-react build
```

## Stories Location

Stories are colocated with components in `packages/react/src/components/ComponentName/ComponentName.stories.tsx`.

This app only serves as a Storybook runner — it does not contain story files.

## Dependencies

Requires `@josui/react` and `@josui/tailwind` to be built first.
