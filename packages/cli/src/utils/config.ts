import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const GITIGNORE_ENTRIES = ['# josui local linking config', '.josui.json', 'josui-linked-*'];

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

export async function ensureGitignore(cwd: string = process.cwd()): Promise<boolean> {
  const gitignorePath = join(cwd, '.gitignore');

  const content = existsSync(gitignorePath) ? await readFile(gitignorePath, 'utf-8') : '';

  // Find entries that are missing (skip the comment line for checking)
  const entriesToCheck = GITIGNORE_ENTRIES.filter((e) => !e.startsWith('#'));
  const missingEntries = entriesToCheck.filter((entry) => !content.includes(entry));

  if (missingEntries.length === 0) {
    return false;
  }

  // If all are missing, add the full block with comment
  // Otherwise just add the missing entries
  const toAdd =
    missingEntries.length === entriesToCheck.length ? GITIGNORE_ENTRIES : missingEntries;

  // Append with proper spacing
  const prefix =
    content.length > 0 && !content.endsWith('\n\n') ? (content.endsWith('\n') ? '\n' : '\n\n') : '';

  await writeFile(gitignorePath, content + prefix + toAdd.join('\n') + '\n');
  return true;
}
