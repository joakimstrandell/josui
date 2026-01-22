# Agent Instructions — @josui/react

React component library for the Josui design system.

## Build

```bash
pnpm --filter @josui/react build
```

Uses tsup for bundling. Outputs ESM, CJS, and type definitions to `dist/`.

## Component Structure

Components live in `src/components/ComponentName/`. Each component folder contains:

- `ComponentName.tsx` — Component implementation
- `ComponentName.test.tsx` — Unit tests
- `index.ts` — Barrel export

Components:

- Are named exports (no default exports)
- Use Tailwind CSS classes
- Support `className` prop for customization
- Have TypeScript props interface

## Creating a Component

1. Create `src/components/ComponentName/ComponentName.tsx`
2. Create `src/components/ComponentName/ComponentName.test.tsx`
3. Create `src/components/ComponentName/index.ts` with exports
4. Export from `src/index.ts`
5. Create matching component in `@josui/vue` with identical API
6. Add story in `apps/storybook-react`

## Props Conventions

- `variant` — Visual style (primary, secondary, etc.)
- `size` — Size scale (sm, md, lg)
- `className` — Additional CSS classes
- Use `React.ComponentPropsWithoutRef<'element'>` for HTML props

## Testing

Unit tests use Vitest with React Testing Library.

```bash
pnpm --filter @josui/react test        # Run tests once
pnpm --filter @josui/react test:watch  # Watch mode
```

Test files live alongside components: `src/components/ComponentName/ComponentName.test.tsx`

### Writing Tests

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });
});
```

### Storybook

```bash
pnpm --filter @josui/storybook-react dev
```

Visually verify in Storybook at http://localhost:6006

## Important

Keep APIs identical to `@josui/vue` for cross-framework consistency.
