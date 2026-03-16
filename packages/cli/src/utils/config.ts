import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

export interface JosuiConfig {
  josuiPath?: string;
  linkedPackages?: string[];
  linkedSkills?: {
    source: string; // path to josui or package with skills
    skills: string[]; // skill names
  }[];
}

const CONFIG_FILE = '.josui.json';

export function getConfigPath(cwd: string = process.cwd()): string {
  return join(cwd, CONFIG_FILE);
}

export async function readConfig(cwd: string = process.cwd()): Promise<JosuiConfig | null> {
  const configPath = getConfigPath(cwd);

  if (!existsSync(configPath)) {
    return null;
  }

  try {
    const content = await readFile(configPath, 'utf-8');
    return JSON.parse(content) as JosuiConfig;
  } catch {
    return null;
  }
}

export async function writeConfig(config: JosuiConfig, cwd: string = process.cwd()): Promise<void> {
  const configPath = getConfigPath(cwd);
  await writeFile(configPath, JSON.stringify(config, null, 2) + '\n');
}

export async function updateConfig(
  updates: Partial<JosuiConfig>,
  cwd: string = process.cwd()
): Promise<JosuiConfig> {
  const existing = (await readConfig(cwd)) || {};
  const updated = { ...existing, ...updates };
  await writeConfig(updated, cwd);
  return updated;
}
