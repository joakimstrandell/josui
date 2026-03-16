import { input, select, checkbox } from '@inquirer/prompts';
import { existsSync } from 'node:fs';
import { rm, symlink, mkdir } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { readConfig, updateConfig } from '../utils/config.js';

const AVAILABLE_PACKAGES = ['core', 'core-web', 'react', 'tailwind', 'tokens'] as const;

export async function linkPackages(): Promise<void> {
  const cwd = process.cwd();
  const config = await readConfig(cwd);

  // Check if we have existing config
  if (config?.josuiPath && config?.linkedPackages?.length) {
    const action = await select({
      message: 'Found existing configuration. What would you like to do?',
      choices: [
        { value: 'relink', name: 'Re-link existing packages' },
        { value: 'modify', name: 'Add or remove packages' },
        { value: 'fresh', name: 'Start fresh' },
      ],
    });

    if (action === 'relink') {
      await performLink(cwd, config.josuiPath, config.linkedPackages);
      return;
    }

    if (action === 'fresh') {
      // Continue to fresh setup
    } else {
      // Modify existing
      const packages = await checkbox({
        message: 'Select packages to link:',
        choices: AVAILABLE_PACKAGES.map((pkg) => ({
          value: pkg,
          name: `@josui/${pkg}`,
          checked: config.linkedPackages?.includes(pkg),
        })),
      });

      if (packages.length === 0) {
        console.log('No packages selected. Exiting.');
        return;
      }

      await updateConfig({ linkedPackages: packages }, cwd);
      await performLink(cwd, config.josuiPath, packages);
      return;
    }
  }

  // Fresh setup
  const defaultPath = config?.josuiPath || '../josui';

  const josuiPath = await input({
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

  const packages = await checkbox({
    message: 'Select packages to link:',
    choices: AVAILABLE_PACKAGES.map((pkg) => ({
      value: pkg,
      name: `@josui/${pkg}`,
      checked: true,
    })),
  });

  if (packages.length === 0) {
    console.log('No packages selected. Exiting.');
    return;
  }

  await updateConfig({ josuiPath, linkedPackages: packages }, cwd);
  await performLink(cwd, josuiPath, packages);
}

async function performLink(cwd: string, josuiPath: string, packages: string[]): Promise<void> {
  const nodeModulesJosui = join(cwd, 'node_modules', '@josui');

  // Ensure @josui directory exists
  if (!existsSync(nodeModulesJosui)) {
    await mkdir(nodeModulesJosui, { recursive: true });
  }

  console.log('');

  for (const pkg of packages) {
    const targetPath = join(nodeModulesJosui, pkg);
    const sourcePath = join(cwd, josuiPath, 'packages', pkg);

    // Remove existing (file, dir, or symlink)
    if (existsSync(targetPath)) {
      await rm(targetPath, { recursive: true, force: true });
    }

    // Create relative symlink
    const relativePath = relative(nodeModulesJosui, sourcePath);
    await symlink(relativePath, targetPath);

    console.log(`  Linked @josui/${pkg} -> ${relativePath}`);
  }

  console.log(`\n✓ Linked ${packages.length} package(s)`);
  console.log('\nConfig saved to .josui.json');
}
