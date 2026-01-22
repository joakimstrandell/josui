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

## Adding Stories

Stories live in `src/stories/`. Each component should have a story file:

```ts
// ComponentName.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3';
import { ComponentName } from '@josui/vue';

const meta: Meta<typeof ComponentName> = {
  component: ComponentName,
};
export default meta;

type Story = StoryObj<typeof ComponentName>;

export const Default: Story = {
  args: {
    /* props */
  },
};
```

## Dependencies

Requires `@josui/vue` and `@josui/tailwind-config` to be built first.
