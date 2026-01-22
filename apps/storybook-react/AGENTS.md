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

## Adding Stories

Stories live in `src/stories/`. Each component should have a story file:

```tsx
// ComponentName.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from '@josui/react';

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

Requires `@josui/react` and `@josui/tailwind-config` to be built first.
