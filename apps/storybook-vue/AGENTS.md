# Agent Instructions — @josui/storybook-vue

Storybook for Vue components.

## Development

```bash
pnpm --filter @josui/storybook-vue dev
```

Runs at http://localhost:6007

## Build

```bash
pnpm --filter @josui/storybook-vue build
```

## Stories Location

Stories are colocated with components in `packages/vue/src/components/ComponentName/ComponentName.stories.ts`.

This app only serves as a Storybook runner — it does not contain story files.

## Dependencies

Requires `@josui/vue` and `@josui/tailwind-config` to be built first.
