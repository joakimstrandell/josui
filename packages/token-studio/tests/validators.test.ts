import { describe, expect, it } from 'vitest';
import { validateCategoryDocument } from '../src/shared/validators';

describe('validateCategoryDocument', () => {
  it('accepts valid color token', () => {
    const result = validateCategoryDocument('color', {
      color: {
        $type: 'color',
        primary: {
          500: {
            $value: { colorSpace: 'oklch', components: [0.85, 0.17, 72] },
          },
        },
      },
    });

    expect(result.valid).toBe(true);
    expect(result.issues).toHaveLength(0);
  });

  it('rejects root mismatch', () => {
    const result = validateCategoryDocument('animation', {
      animations: {
        $type: 'duration',
      },
    });

    expect(result.valid).toBe(false);
    expect(result.issues[0]?.message).toContain('Root key must match category name');
  });

  it('rejects malformed reference', () => {
    const result = validateCategoryDocument('radius', {
      radius: {
        $type: 'dimension',
        sm: {
          $value: '{bad reference}',
        },
      },
    });

    expect(result.valid).toBe(false);
    expect(result.issues.some((issue) => issue.path.includes('$value'))).toBe(true);
  });
});
