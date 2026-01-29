# Package-Specific Audit Checklist

## Component Libraries

**Packages:** `@josui/react`, `@josui/vue`

### AGENTS.md

- [ ] Component table lists ALL exported components
- [ ] Each component row includes: name, variants, sizes
- [ ] Hooks section lists all exported hooks
- [ ] "Important" section mentions skill updates when adding components

### Skills (use-{framework}-components)

- [ ] Every exported component has a usage section
- [ ] Props tables match TypeScript interfaces:
  ```bash
  # Check interface for a component
  grep -A 20 "interface ButtonProps" packages/react/src/components/Button/Button.tsx
  ```
- [ ] Import statements use correct paths
- [ ] Hooks section covers all exported hooks

### README.md

- [ ] Features list matches exported components

### Storybook Coverage

- [ ] Every component has a `.stories.tsx` / `.stories.ts` file
- [ ] Stories have `tags: ['autodocs']` in meta
- [ ] Stories have `args` in meta for controls panel
- [ ] All variants have stories or are controllable via args
- [ ] All sizes have stories or are controllable via args

```bash
# Check for missing story files (React)
for comp in $(ls packages/react/src/components/); do
  [ ! -f "packages/react/src/components/$comp/$comp.stories.tsx" ] && echo "Missing: $comp"
done

# Check for missing story files (Vue)
for comp in $(ls packages/vue/src/components/); do
  [ ! -f "packages/vue/src/components/$comp/$comp.stories.ts" ] && echo "Missing: $comp"
done

# Check autodocs and args in React stories
for story in packages/react/src/components/*/*.stories.tsx; do
  name=$(basename "$story")
  grep -q "autodocs" "$story" || echo "No autodocs: $name"
  grep -q "args:" "$story" || echo "No args: $name"
done
```

---

## Design Tokens

**Package:** `@josui/tokens`

### AGENTS.md

- [ ] Token categories documented (color, spacing, typography, etc.)
- [ ] Build output files listed (`tokens.css`, `tokens.scss`, etc.)
- [ ] DTCG format explained

### Skills (add-token)

- [ ] Token file structure matches actual `src/` layout
- [ ] Examples use current DTCG object format
- [ ] Build command is correct

### README.md

- [ ] Import examples for each output format
- [ ] Available token categories listed

---

## Config Packages

**Packages:** `@josui/tailwind-config`, `@josui/eslint-config`, `@josui/typescript-config`

### AGENTS.md

- [ ] Exported configs listed
- [ ] Usage examples match package.json exports

### README.md

- [ ] Installation shows peer dependencies
- [ ] Config extension examples are correct

---

## Utility Packages

**Packages:** `@josui/core`, `@josui/core-web`, `@josui/scss`

### AGENTS.md

- [ ] Exported functions/utilities listed
- [ ] For SCSS: mixin names documented

### README.md

- [ ] Import examples match exports
- [ ] For SCSS: @use statements correct

---

## Apps

**Apps:** `docs`, `storybook-react`, `storybook-vue`

### AGENTS.md

- [ ] Dev command documented
- [ ] Build output location noted
- [ ] No published API claims (these are internal)

### README.md

- [ ] Purpose described
- [ ] No npm install instructions (not published)

---

## Cross-Package Checks

### Build Dependencies

Verify AGENTS.md documents build order dependencies:

| Package         | Depends On                              |
| --------------- | --------------------------------------- |
| tailwind-config | tokens                                  |
| react           | tokens, tailwind-config, core, core-web |
| vue             | tokens, tailwind-config, core, core-web |
| scss            | tokens                                  |
| storybook-react | react                                   |
| storybook-vue   | vue                                     |

### Version Consistency

Check package.json versions match any version references in docs:

```bash
# Get all package versions
cat packages/*/package.json | jq -r '.name + ": " + .version'
```

### Export Verification Commands

```bash
# React components
grep -E "^export \{|^export type \{" packages/react/src/index.ts

# Vue components
grep -E "^export \{|^export type \{" packages/vue/src/index.ts

# Core utilities
grep -E "^export" packages/core/src/index.ts

# Core-web utilities
grep -E "^export" packages/core-web/src/index.ts

# SCSS exports (check _index.scss)
grep -E "@forward|@use" packages/scss/src/_index.scss
```

---

## Quick Diff Commands

Compare documented vs actual:

```bash
# Count components in React skill vs actual exports
echo "Skill sections:" && grep -c "^## " packages/react/skills/use-react-components/SKILL.md
echo "Actual exports:" && grep -c "^export \{" packages/react/src/index.ts

# Same for Vue
echo "Skill sections:" && grep -c "^## " packages/vue/skills/use-vue-components/SKILL.md
echo "Actual exports:" && grep -c "^export \{" packages/vue/src/index.ts
```
