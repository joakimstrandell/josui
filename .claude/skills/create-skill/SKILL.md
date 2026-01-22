---
name: create-skill
description: Guide for creating skills in the josui project. Use when asked to create, add, or write a new skill for josui.
---

# Create Skill

## Location

- **Internal**: `.claude/skills/` - for maintainers
- **External**: `packages/{react,vue}/skills/` - shipped to consumers

## Structure

```
skill-name/
├── SKILL.md        (required)
├── scripts/        (optional - executable code)
├── references/     (optional - docs loaded as needed)
└── assets/         (optional - files for output)
```

## Frontmatter

```yaml
---
name: skill-name
description: What the skill does. When to use it (triggers).
---
```

The description is the primary trigger - be specific about when the skill should activate.

## Guidelines

1. Keep SKILL.md under 500 lines
2. Use imperative language
3. Only include what Claude doesn't already know
4. Move detailed content to `references/`

For detailed guidance, check for a global `skill-creator` skill.
