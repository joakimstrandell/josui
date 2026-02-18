import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { syncTerrazzoTokens } from '../src/server/terrazzo';

describe('syncTerrazzoTokens', () => {
  it('adds and removes token file entries idempotently', async () => {
    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'token-studio-'));
    const terrazzoPath = path.join(tempDir, 'terrazzo.config.mjs');

    await fs.writeFile(
      terrazzoPath,
      `export default {\n  tokens: [\n    './src/tokens/color.json',\n  ],\n};\n`,
      'utf8'
    );

    await syncTerrazzoTokens(terrazzoPath, './src/tokens/animation.json', 'add');
    await syncTerrazzoTokens(terrazzoPath, './src/tokens/animation.json', 'add');

    let content = await fs.readFile(terrazzoPath, 'utf8');
    expect(content.match(/animation\.json/g)?.length ?? 0).toBe(1);

    await syncTerrazzoTokens(terrazzoPath, './src/tokens/animation.json', 'remove');
    content = await fs.readFile(terrazzoPath, 'utf8');
    expect(content.includes('animation.json')).toBe(false);
  });
});
