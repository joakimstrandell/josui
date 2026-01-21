# Josui Design System

Multi-framework design system monorepo built with Turborepo + pnpm.

## Project Status

**Completed** - All packages built successfully. Published to npm under `@josui/` scope.

## Architecture

```
josui/
├── apps/
│   ├── storybook-react/     # React component docs (port 6006)
│   ├── storybook-vue/       # Vue component docs (port 6007)
│   └── docs/                # Landing page/portfolio
├── packages/
│   ├── tokens/              # @josui/tokens - Style Dictionary + DTCG
│   ├── tailwind-config/     # @josui/tailwind-config - Tailwind v4
│   ├── eslint-config/       # @josui/eslint-config - Shared ESLint configs (internal)
│   ├── react/               # @josui/react - React 18/19 components
│   └── vue/                 # @josui/vue - Vue 3.4+ components
├── .husky/                  # Pre-commit hooks
└── .vscode/                 # Editor settings
```

## Build Chain

`tokens → tailwind-config → react/vue → storybook apps`

## Components (8 total, identical API in React & Vue)

- **Button** - primary, secondary, outline, ghost, destructive variants; sm/md/lg sizes; loading state
- **Input** - label, error, hint, leftAddon, rightAddon; validation states
- **Card** - default, bordered, elevated variants; CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- **Badge** - default, primary, success, warning, error variants
- **Typography** - h1-h6, body, body-sm, caption; weight and color props
- **Avatar** - image with fallback; sm/md/lg/xl sizes
- **Spinner** - sm/md/lg sizes; primary/current/white colors
- **Alert** - info, success, warning, error variants; dismissible

## Tech Stack

- Turborepo ^2.7.0
- pnpm 9.15.0
- Node.js 22+ (required for TypeScript configs)
- Style Dictionary ^5.1.0 (DTCG format, TypeScript config)
- Tailwind CSS ^4.0.0
- Storybook ^8.5.0
- ESLint ^9.39.2 (flat config with projectService)
- Prettier ^3.4.0
- Husky + lint-staged (pre-commit hooks)
- tsup ^8.5.0 (React builds)
- Vite ^6.0.0 (Vue builds, docs)
- Changesets for publishing

## Commands

```bash
pnpm install              # Install dependencies
pnpm build                # Build all packages
pnpm dev                  # Start dev servers
pnpm lint                 # Lint all packages
pnpm format               # Format all files with Prettier

# Individual apps
pnpm --filter @josui/storybook-react dev   # React Storybook :6006
pnpm --filter @josui/storybook-vue dev     # Vue Storybook :6007
pnpm --filter @josui/docs dev              # Landing page

# Publishing
pnpm changeset            # Create changeset
pnpm version-packages     # Bump versions
pnpm release              # Build & publish to npm
```

## ESLint Config (`@josui/eslint-config`)

Shared ESLint configs using flat config format (ESLint 9):

- `@josui/eslint-config` - Base TypeScript config
- `@josui/eslint-config/react` - React + React Hooks
- `@josui/eslint-config/vue` - Vue 3 with vue-eslint-parser

Uses `projectService: true` for automatic tsconfig resolution in monorepo.

## Pre-commit Hooks

Husky + lint-staged runs on every commit:

- `.ts`, `.tsx` files: ESLint fix + Prettier
- `.vue` files: ESLint fix + Prettier
- `.json`, `.md`, `.css` files: Prettier only

## VSCode/Cursor Settings

`.vscode/settings.json` configured for:

- Format on save with Prettier
- ESLint auto-fix on save
- Recommended extensions: Prettier, ESLint, Volar, Tailwind CSS

## Design Tokens (DTCG Format)

Located in `packages/tokens/src/tokens/`:

- colors.json - Primary (blue), gray, success, warning, error, info palettes (OKLCH)
- typography.json - Font families (Inter, JetBrains Mono), sizes, weights, line-heights
- spacing.json - 0-24 scale
- radius.json - none to full
- shadows.json - sm to xl

Outputs:

- CSS variables: `dist/css/variables.css`
- JS/TS: `dist/js/index.js`, `index.d.ts`

## Tailwind Config

CSS-first configuration using `@theme` directive. Import via:

```css
@import '@josui/tailwind-config/styles.css';
```

## Publishing

- Packages publish to npm under `@josui/` scope
- Changesets configured with linked versioning
- GitHub Actions CI/CD in `.github/workflows/ci.yml`
- Requires `NPM_TOKEN` secret for automated publishing
- Node 22 required in CI for TypeScript config support

## GitHub Repository

https://github.com/joakimstrandell/josui
