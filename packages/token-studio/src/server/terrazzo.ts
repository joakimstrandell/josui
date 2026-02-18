import fs from 'node:fs/promises';

function parseTokenArray(
  configContent: string
): { entries: string[]; start: number; end: number } | null {
  const match = /tokens\s*:\s*\[(?<entries>[\s\S]*?)\],/m.exec(configContent);
  if (!match || !match.groups) {
    return null;
  }

  const fullMatch = match[0];
  const start = match.index;
  const end = start + fullMatch.length;
  const entriesBlock = match.groups.entries;

  const entries = Array.from(entriesBlock.matchAll(/'([^']+)'/g), (entry) => entry[1]);

  return {
    entries,
    start,
    end,
  };
}

function formatTokenArray(entries: string[]): string {
  const formattedEntries = entries.map((entry) => `    '${entry}',`).join('\n');
  return `tokens: [\n${formattedEntries}\n  ],`;
}

export async function syncTerrazzoTokens(
  terrazzoPath: string,
  tokenRelativePath: string,
  operation: 'add' | 'remove'
): Promise<void> {
  let configContent: string;
  try {
    configContent = await fs.readFile(terrazzoPath, 'utf8');
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return;
    }
    throw error;
  }

  const parsed = parseTokenArray(configContent);
  if (!parsed) {
    return;
  }

  let nextEntries = parsed.entries;

  if (operation === 'add') {
    if (!nextEntries.includes(tokenRelativePath)) {
      nextEntries = [...nextEntries, tokenRelativePath];
    }
  } else {
    nextEntries = nextEntries.filter((entry) => entry !== tokenRelativePath);
  }

  const replacement = formatTokenArray(nextEntries);
  const nextConfig = `${configContent.slice(0, parsed.start)}${replacement}${configContent.slice(parsed.end)}`;

  if (nextConfig !== configContent) {
    await fs.writeFile(terrazzoPath, nextConfig, 'utf8');
  }
}
