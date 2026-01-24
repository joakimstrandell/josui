# @josui/tokens

Design tokens in DTCG format, built with Terrazzo CLI.

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
import token from '@josui/tokens';

// Function-based accessor
token('color.primary.500');
```

## Tokens

- **Colors** — OKLCH format (primary, secondary, tertiary, gray, semantic)
- **Typography** — Inter, JetBrains Mono
- **Spacing** — 0-24 scale
- **Radius** — none to full
- **Shadows** — sm to xl
- **Animation** — durations and easing functions
- **Z-index** — layering scale
- **Breakpoints** — responsive breakpoints
- **Opacity** — 0-100 scale
