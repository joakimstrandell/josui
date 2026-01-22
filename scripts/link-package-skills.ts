#!/usr/bin/env npx tsx

import { readdir, mkdir, symlink, rm, lstat } from 'node:fs/promises';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..');
const PACKAGES_DIR = join(PROJECT_ROOT, 'packages');
const TARGET_DIR = join(PROJECT_ROOT, '.claude/skills');

async function getPackagesWithSkills(): Promise<string[]> {
  const entries = await readdir(PACKAGES_DIR, { withFileTypes: true });
  return entries
    .filter((e) => e.isDirectory())
    .filter((e) => existsSync(join(PACKAGES_DIR, e.name, 'skills')))
    .map((e) => e.name);
}

async function getSkillDirs(packageName: string): Promise<string[]> {
  const skillsDir = join(PACKAGES_DIR, packageName, 'skills');
  const entries = await readdir(skillsDir, { withFileTypes: true });
  return entries.filter((e) => e.isDirectory()).map((e) => e.name);
}

async function linkPackageSkills(): Promise<void> {
  if (!existsSync(TARGET_DIR)) {
    await mkdir(TARGET_DIR, { recursive: true });
  }

  // Remove existing josui-linked-* symlinks
  const existing = await readdir(TARGET_DIR, { withFileTypes: true });
  const removed: string[] = [];
  for (const entry of existing) {
    if (entry.name.startsWith('josui-linked-')) {
      const entryPath = join(TARGET_DIR, entry.name);
      const stat = await lstat(entryPath);
      if (stat.isSymbolicLink()) {
        await rm(entryPath);
        removed.push(entry.name);
      }
    }
  }
  if (removed.length > 0) {
    console.log(`Removed ${removed.length} existing symlink(s)\n`);
  }

  const packages = await getPackagesWithSkills();

  if (packages.length === 0) {
    console.log('No packages with skills found');
    return;
  }

  console.log(`Found ${packages.length} package(s) with skills: ${packages.join(', ')}\n`);

  let linked = 0;

  for (const pkg of packages) {
    const skills = await getSkillDirs(pkg);

    for (const skill of skills) {
      const sourcePath = join(PACKAGES_DIR, pkg, 'skills', skill);
      const destName = `josui-linked-${pkg}-${skill}`;
      const destPath = join(TARGET_DIR, destName);
      const relativePath = relative(TARGET_DIR, sourcePath);

      await symlink(relativePath, destPath);
      console.log(`  ${destName}/ -> ${relativePath}`);
      linked++;
    }
  }

  console.log(`\nLinked ${linked} skill(s) to .claude/skills/`);
}

linkPackageSkills().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
