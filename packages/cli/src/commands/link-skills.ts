import { input, select, checkbox } from '@inquirer/prompts';
import { existsSync } from 'node:fs';
import { readdir, rm, symlink, mkdir, lstat } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { readConfig, updateConfig, type JosuiConfig } from '../utils/config.js';

interface SkillSource {
  path: string;
  skills: string[];
}

export async function linkSkills(): Promise<void> {
  const cwd = process.cwd();
  const config = await readConfig(cwd);

  // Check if we have existing config
  if (config?.linkedSkills?.length) {
    const action = await select({
      message: 'Found existing skill links. What would you like to do?',
      choices: [
        { value: 'relink', name: 'Re-link existing skills' },
        { value: 'modify', name: 'Add or remove skills' },
        { value: 'fresh', name: 'Start fresh' },
      ],
    });

    if (action === 'relink') {
      await performSkillLink(cwd, config.linkedSkills);
      return;
    }

    if (action === 'modify') {
      // For now, just do fresh - could be enhanced later
      console.log('Starting fresh configuration...\n');
    }
  }

  // Fresh setup - ask for source
  const sourceType = await select({
    message: 'Where are the skills you want to link?',
    choices: [
      { value: 'josui', name: 'From josui monorepo' },
      { value: 'package', name: 'From an npm package with skills' },
      { value: 'custom', name: 'Custom path' },
    ],
  });

  let sourcePath: string;

  if (sourceType === 'josui') {
    const defaultPath = config?.josuiPath || '../josui';
    sourcePath = await input({
      message: 'Where is your josui monorepo?',
      default: defaultPath,
      validate: (value) => {
        const packagesPath = join(cwd, value, 'packages');
        if (!existsSync(packagesPath)) {
          return `Could not find packages at ${packagesPath}`;
        }
        return true;
      },
    });

    // Find all packages with skills
    const skillSources = await findSkillsInJosui(cwd, sourcePath);

    if (skillSources.length === 0) {
      console.log('No packages with skills found in josui.');
      return;
    }

    // Flatten all skills for selection
    const allSkills: { value: string; name: string; source: string }[] = [];
    for (const source of skillSources) {
      for (const skill of source.skills) {
        allSkills.push({
          value: `${source.path}:${skill}`,
          name: `${skill} (from ${source.path})`,
          source: source.path,
        });
      }
    }

    const selectedSkills = await checkbox({
      message: 'Select skills to link:',
      choices: allSkills.map((s) => ({
        value: s.value,
        name: s.name,
        checked: true,
      })),
    });

    if (selectedSkills.length === 0) {
      console.log('No skills selected. Exiting.');
      return;
    }

    // Group selected skills by source
    const linkedSkills: JosuiConfig['linkedSkills'] = [];
    for (const selected of selectedSkills) {
      const [sourcePkg, skillName] = selected.split(':');
      const existing = linkedSkills.find((s) => s.source === sourcePkg);
      if (existing) {
        existing.skills.push(skillName);
      } else {
        linkedSkills.push({ source: sourcePkg, skills: [skillName] });
      }
    }

    await updateConfig({ josuiPath: sourcePath, linkedSkills }, cwd);
    await performSkillLink(cwd, linkedSkills, sourcePath);
  } else {
    // Custom path or package - simplified for now
    sourcePath = await input({
      message: 'Enter the path to the skills directory:',
      validate: (value) => {
        if (!existsSync(join(cwd, value))) {
          return `Path does not exist: ${value}`;
        }
        return true;
      },
    });

    const skills = await findSkillsInDir(join(cwd, sourcePath));

    if (skills.length === 0) {
      console.log('No skills found at that path.');
      return;
    }

    const selectedSkills = await checkbox({
      message: 'Select skills to link:',
      choices: skills.map((s) => ({
        value: s,
        name: s,
        checked: true,
      })),
    });

    if (selectedSkills.length === 0) {
      console.log('No skills selected. Exiting.');
      return;
    }

    const linkedSkills = [{ source: sourcePath, skills: selectedSkills }];
    await updateConfig({ linkedSkills }, cwd);
    await performSkillLink(cwd, linkedSkills);
  }
}

async function findSkillsInJosui(cwd: string, josuiPath: string): Promise<SkillSource[]> {
  const packagesDir = join(cwd, josuiPath, 'packages');
  const entries = await readdir(packagesDir, { withFileTypes: true });

  const sources: SkillSource[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const skillsDir = join(packagesDir, entry.name, 'skills');
    if (!existsSync(skillsDir)) continue;

    const skills = await findSkillsInDir(skillsDir);
    if (skills.length > 0) {
      sources.push({ path: entry.name, skills });
    }
  }

  return sources;
}

async function findSkillsInDir(dir: string): Promise<string[]> {
  if (!existsSync(dir)) return [];

  const entries = await readdir(dir, { withFileTypes: true });
  return entries.filter((e) => e.isDirectory()).map((e) => e.name);
}

async function performSkillLink(
  cwd: string,
  linkedSkills: NonNullable<JosuiConfig['linkedSkills']>,
  josuiPath?: string
): Promise<void> {
  const targetDir = join(cwd, '.claude', 'skills');

  // Ensure target directory exists
  if (!existsSync(targetDir)) {
    await mkdir(targetDir, { recursive: true });
  }

  // Remove existing josui-linked-* symlinks
  const existing = await readdir(targetDir, { withFileTypes: true });
  for (const entry of existing) {
    if (entry.name.startsWith('josui-linked-')) {
      const entryPath = join(targetDir, entry.name);
      const stat = await lstat(entryPath);
      if (stat.isSymbolicLink()) {
        await rm(entryPath);
      }
    }
  }

  console.log('');
  let linked = 0;

  for (const source of linkedSkills) {
    for (const skill of source.skills) {
      // Determine the actual source path
      let sourcePath: string;
      if (josuiPath) {
        // Skills from josui packages
        sourcePath = join(cwd, josuiPath, 'packages', source.source, 'skills', skill);
      } else {
        // Direct path
        sourcePath = join(cwd, source.source, skill);
      }

      const destName = `josui-linked-${source.source}-${skill}`;
      const destPath = join(targetDir, destName);
      const relativePath = relative(targetDir, sourcePath);

      await symlink(relativePath, destPath);
      console.log(`  ${destName}/ -> ${relativePath}`);
      linked++;
    }
  }

  console.log(`\n✓ Linked ${linked} skill(s) to .claude/skills/`);
  console.log('\nConfig saved to .josui.json');
}
