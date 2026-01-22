# @josui/tokens

Design tokens in DTCG format, built with Style Dictionary v5.

## Installation

```bash
pnpm add @josui/tokens
```

## Usage

```css
/* CSS variables */
@import '@josui/tokens/css';

.custom {
  color: var(--color-primary-500);
}
```

```ts
// JavaScript
import { tokens } from '@josui/tokens';
```

## Tokens

- **Colors** — OKLCH format
- **Typography** — Inter, JetBrains Mono
- **Spacing** — 0-24 scale
- **Radius** — none to full
- **Shadows** — sm to xl
