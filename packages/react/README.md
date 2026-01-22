# @josui/react

React components for josui.

## Installation

```bash
npm install @josui/react
```

## Usage

```tsx
import { Button, Card } from '@josui/react';
import '@josui/react/styles.css';

function App() {
  return (
    <Card>
      <Button variant="primary">Click me</Button>
    </Card>
  );
}
```

## Claude Code Integration

This package includes skills for Claude Code to help you use the components.

To set up:

```bash
mkdir -p .claude/skills
cp -r node_modules/@josui/react/skills/* .claude/skills/
```

The skills will help Claude understand how to use josui components in your project.
