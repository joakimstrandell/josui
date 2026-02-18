import fs from 'node:fs/promises';
import path from 'node:path';

const CONFIG_FILE_NAMES = ['token-studio.config.json', '.token-studio.json'] as const;

export interface TokenStudioConfig {
  tokensDir?: string;
  terrazzoPath?: string;
}

async function exists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function findConfigFile(startDir: string): Promise<string | null> {
  let currentDir = path.resolve(startDir);

  while (true) {
    for (const fileName of CONFIG_FILE_NAMES) {
      const candidate = path.join(currentDir, fileName);
      if (await exists(candidate)) {
        return candidate;
      }
    }

    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) {
      break;
    }

    currentDir = parentDir;
  }

  return null;
}

export async function readConfig(configPath: string): Promise<TokenStudioConfig> {
  const content = await fs.readFile(configPath, 'utf8');
  const parsed = JSON.parse(content) as TokenStudioConfig;
  return parsed;
}

export async function findNearestTokensRoot(startDir: string): Promise<string | null> {
  let currentDir = path.resolve(startDir);

  while (true) {
    const candidate = path.join(currentDir, 'packages/tokens/src/tokens');
    if (await exists(candidate)) {
      return candidate;
    }

    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) {
      break;
    }

    currentDir = parentDir;
  }

  return null;
}
