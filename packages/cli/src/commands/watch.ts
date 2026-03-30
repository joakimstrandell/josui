import { watch } from 'node:fs';
import { existsSync } from 'node:fs';
import { cp, mkdir, readdir, rm } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { input, checkbox } from '@inquirer/prompts';
import { readConfig, updateConfig, ensureGitignore } from '../utils/config.js';

const PACKAGE_PATHS: Record<string, string> = {
  core: 'packages/core',
  'core-web': 'packages/core-web',
  react: 'packages/react',
  'tailwind-preset': 'packages/tailwind-preset',
  'token-studio': 'packages/token-studio',
  cli: 'packages/cli',
  'eslint-config': 'config/eslint-config',
  'prettier-config': 'config/prettier-config',
  'typescript-config': 'config/typescript-config',
};

function log(msg: string): void {
  const time = new Date().toLocaleTimeString('en-GB', { hour12: false });
  console.log(`  [${time}] ${msg}`);
}

async function copyDir(src: string, dest: string): Promise<void> {
  if (existsSync(dest)) {
    await rm(dest, { recursive: true, force: true });
  }
  await mkdir(dest, { recursive: true });
  await cp(src, dest, { recursive: true });
}

async function detectInstalledPackages(cwd: string): Promise<string[]> {
  const josuiDir = join(cwd, 'node_modules', '@josui');
  if (!existsSync(josuiDir)) return [];

  const entries = await readdir(josuiDir, { withFileTypes: true });
  return entries.filter((e) => e.isDirectory()).map((e) => e.name);
}

async function setup(cwd: string): Promise<{ josuiPath: string; packages: string[] }> {
  const config = await readConfig(cwd);
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

  // Detect which @josui packages are installed in node_modules
  const installed = await detectInstalledPackages(cwd);

  if (installed.length === 0) {
    console.error('\n  No @josui/* packages found in node_modules. Install them first.\n');
    process.exit(1);
  }

  const packages = await checkbox({
    message: 'Select packages to watch:',
    choices: installed.map((pkg) => ({
      value: pkg,
      name: `@josui/${pkg}`,
      checked: true,
    })),
  });

  if (packages.length === 0) {
    console.log('No packages selected. Exiting.');
    process.exit(0);
  }

  await updateConfig({ josuiPath, watchPackages: packages }, cwd);
  await ensureGitignore(cwd);

  console.log('\n  Config saved to .josui.json\n');

  return { josuiPath, packages };
}

export async function watchPackages(): Promise<void> {
  const cwd = process.cwd();
  const config = await readConfig(cwd);

  let josuiPath: string;
  let packages: string[];

  if (config?.josuiPath && config?.watchPackages?.length) {
    josuiPath = config.josuiPath;
    packages = config.watchPackages;
  } else {
    const result = await setup(cwd);
    josuiPath = result.josuiPath;
    packages = result.packages;
  }

  const josuiRoot = join(cwd, josuiPath);

  if (!existsSync(josuiRoot)) {
    console.error(`\n  josui path not found: ${josuiRoot}\n`);
    process.exit(1);
  }

  console.log(`\n  Watching ${packages.length} package(s)...\n`);

  // Initial full copy
  for (const pkg of packages) {
    const pkgDir = PACKAGE_PATHS[pkg] || `packages/${pkg}`;
    const srcDir = join(josuiRoot, pkgDir, 'src');
    const destDir = join(cwd, 'node_modules', '@josui', pkg, 'src');

    if (!existsSync(srcDir)) {
      log(`skip @josui/${pkg} (no src/ directory)`);
      continue;
    }

    await copyDir(srcDir, destDir);
    log(`copied @josui/${pkg}/src/`);
  }

  console.log('');

  // Watch for changes
  const watchers: ReturnType<typeof watch>[] = [];

  for (const pkg of packages) {
    const pkgDir = PACKAGE_PATHS[pkg] || `packages/${pkg}`;
    const srcDir = join(josuiRoot, pkgDir, 'src');
    const destDir = join(cwd, 'node_modules', '@josui', pkg, 'src');

    if (!existsSync(srcDir)) continue;

    const watcher = watch(srcDir, { recursive: true }, async (_event, filename) => {
      if (!filename) return;

      const srcFile = join(srcDir, filename);
      const destFile = join(destDir, filename);

      if (!existsSync(srcFile)) {
        // File was deleted
        if (existsSync(destFile)) {
          await rm(destFile, { force: true }).catch(() => {});
          log(`deleted @josui/${pkg}/src/${filename}`);
        }
        return;
      }

      // Copy the changed file
      const destFileDir = join(destFile, '..');
      if (!existsSync(destFileDir)) {
        await mkdir(destFileDir, { recursive: true });
      }

      await cp(srcFile, destFile, { recursive: true }).catch(() => {});
      log(`copied @josui/${pkg}/src/${filename}`);
    });

    watchers.push(watcher);
  }

  // Handle shutdown
  const cleanup = () => {
    console.log('\n\n  Stopped watching.\n');
    for (const w of watchers) w.close();
    process.exit(0);
  };

  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);

  // Keep alive
  const rel = relative(cwd, josuiRoot) || '.';
  console.log(`  Watching for changes in ${rel}...`);
  console.log('  Press Ctrl+C to stop.\n');
}
