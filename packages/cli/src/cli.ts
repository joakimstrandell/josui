import { existsSync, readdirSync, statSync, mkdirSync, cpSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import pc from 'picocolors';

const SKILLS_TARGET = '.claude/skills';

interface SkillPackage {
  name: string;
  skillsPath: string;
}

interface Skill {
  name: string;
  description: string;
  path: string;
}

interface SkillMeta {
  name?: string;
  description?: string;
}

/**
 * Find the project root by looking for package.json
 */
function findProjectRoot(): string {
  let dir = process.cwd();
  while (dir !== '/') {
    if (existsSync(join(dir, 'package.json'))) {
      return dir;
    }
    dir = dirname(dir);
  }
  return process.cwd();
}

/**
 * Find all @josui packages in node_modules that have skills
 */
function findJosuiSkillPackages(projectRoot: string): SkillPackage[] {
  const nodeModulesJosui = join(projectRoot, 'node_modules', '@josui');
  const packages: SkillPackage[] = [];

  if (!existsSync(nodeModulesJosui)) {
    return packages;
  }

  const entries = readdirSync(nodeModulesJosui);

  for (const entry of entries) {
    const pkgPath = join(nodeModulesJosui, entry);
    const skillsPath = join(pkgPath, 'skills');

    if (existsSync(skillsPath) && statSync(skillsPath).isDirectory()) {
      packages.push({
        name: `@josui/${entry}`,
        skillsPath,
      });
    }
  }

  return packages;
}

/**
 * List skills in a package's skills directory
 */
function listSkillsInDir(skillsPath: string): Skill[] {
  const skills: Skill[] = [];

  if (!existsSync(skillsPath)) {
    return skills;
  }

  const entries = readdirSync(skillsPath);

  for (const entry of entries) {
    const entryPath = join(skillsPath, entry);
    const skillFile = join(entryPath, 'SKILL.md');

    if (statSync(entryPath).isDirectory() && existsSync(skillFile)) {
      const content = readFileSync(skillFile, 'utf-8');
      const meta = parseSkillMeta(content);
      skills.push({
        name: entry,
        description: meta.description || '',
        path: entryPath,
      });
    }
  }

  return skills;
}

/**
 * Parse SKILL.md frontmatter
 */
function parseSkillMeta(content: string): SkillMeta {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};

  const meta: SkillMeta = {};
  for (const line of match[1].split('\n')) {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      const trimmedKey = key.trim();
      const value = valueParts.join(':').trim();
      if (trimmedKey === 'name') meta.name = value;
      if (trimmedKey === 'description') meta.description = value;
    }
  }
  return meta;
}

/**
 * Copy all skills from @josui packages to .claude/skills/
 * Always overwrites existing skills to keep them in sync with installed packages
 */
function initSkills(): void {
  const projectRoot = findProjectRoot();
  const targetDir = join(projectRoot, SKILLS_TARGET);

  const packages = findJosuiSkillPackages(projectRoot);

  if (packages.length === 0) {
    console.log(pc.yellow('No @josui packages with skills found in node_modules.'));
    console.log(pc.dim('Install a @josui package first: npm install @josui/react'));
    return;
  }

  // Create target directory
  mkdirSync(targetDir, { recursive: true });

  let totalCount = 0;

  for (const pkg of packages) {
    const skills = listSkillsInDir(pkg.skillsPath);

    for (const skill of skills) {
      const namespacedName = `josui-${skill.name}`;
      const destPath = join(targetDir, namespacedName);
      cpSync(skill.path, destPath, { recursive: true, force: true });
      totalCount++;
    }

    if (skills.length > 0) {
      console.log(pc.dim(`  from ${pkg.name}: ${skills.map((s) => `josui-${s.name}`).join(', ')}`));
    }
  }

  if (totalCount > 0) {
    console.log(pc.green(`\nSynced ${totalCount} skills to ${SKILLS_TARGET}`));
  } else {
    console.log(pc.yellow('No skills found in installed @josui packages.'));
  }
}

/**
 * List available skills in installed @josui packages
 */
function listSkills(): void {
  const projectRoot = findProjectRoot();
  const packages = findJosuiSkillPackages(projectRoot);

  if (packages.length === 0) {
    console.log(pc.yellow('No @josui packages with skills found in node_modules.'));
    console.log(pc.dim('Install a @josui package first: npm install @josui/react'));
    return;
  }

  console.log(pc.bold('\nAvailable Skills:\n'));

  for (const pkg of packages) {
    const skills = listSkillsInDir(pkg.skillsPath);

    if (skills.length > 0) {
      console.log(pc.cyan(`  ${pkg.name}`));
      for (const skill of skills) {
        console.log(`    ${pc.green(`josui-${skill.name}`)}`);
        if (skill.description) {
          console.log(pc.dim(`      ${skill.description}`));
        }
      }
      console.log();
    }
  }
}

/**
 * Show help
 */
function showHelp(): void {
  console.log(`
${pc.bold('@josui/cli')} - CLI for josui design system

${pc.yellow('Usage:')}
  npx @josui/cli <command>

${pc.yellow('Commands:')}
  init-skills     Sync skills from installed @josui packages to .claude/skills/
  list-skills     List available skills in installed @josui packages
  help            Show this help message

${pc.yellow('Examples:')}
  npx @josui/cli init-skills
  npx @josui/cli list-skills
`);
}

// Parse arguments
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case 'init-skills':
    initSkills();
    break;
  case 'list-skills':
    listSkills();
    break;
  case 'help':
  case '--help':
  case '-h':
    showHelp();
    break;
  default:
    if (command) {
      console.log(pc.red(`Unknown command: ${command}`));
    }
    showHelp();
    break;
}
