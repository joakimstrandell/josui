import { describe, expect, it } from 'vitest';
import { deleteToken, upsertToken } from '../src/shared/document';

describe('document helpers', () => {
  it('upserts token by path', () => {
    const next = upsertToken(
      {
        radius: {
          $type: 'dimension',
        },
      },
      {
        path: 'radius.md',
        type: 'dimension',
        value: { value: 0.5, unit: 'rem' },
      }
    );

    expect(next.radius).toBeDefined();
    expect((next.radius as Record<string, unknown>).md).toBeDefined();
  });

  it('deletes token but keeps root node', () => {
    const next = deleteToken(
      {
        radius: {
          $type: 'dimension',
          md: {
            $value: { value: 0.5, unit: 'rem' },
          },
        },
      },
      'radius.md'
    );

    expect(next.radius).toBeDefined();
    expect((next.radius as Record<string, unknown>).$type).toBe('dimension');
  });
});
