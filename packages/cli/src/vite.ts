import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { readdirSync } from "node:fs";
import type { Plugin } from "vite";

interface JosuiDevOptions {
  /** Path to the josui monorepo. Overrides .josui.json and default. */
  josuiPath?: string;
}

interface JosuiConfig {
  josuiPath?: string;
}

const PACKAGE_DIRS: Record<string, string> = {
  core: "packages/core",
  "core-web": "packages/core-web",
  react: "packages/react",
  "tailwind-preset": "packages/tailwind-preset",
  "token-studio": "packages/token-studio",
  cli: "packages/cli",
};

function readJosuiConfig(cwd: string): JosuiConfig | null {
  const configPath = join(cwd, ".josui.json");
  if (!existsSync(configPath)) return null;
  try {
    return JSON.parse(readFileSync(configPath, "utf-8"));
  } catch {
    return null;
  }
}

function discoverPackages(josuiRoot: string): Record<string, string> {
  const aliases: Record<string, string> = {};

  // Check known package dirs
  for (const [name, dir] of Object.entries(PACKAGE_DIRS)) {
    const srcIndex = join(josuiRoot, dir, "src", "index.ts");
    if (existsSync(srcIndex)) {
      aliases[`@josui/${name}`] = srcIndex;
    }
  }

  // Also check config/ for packages like eslint-config, prettier-config, typescript-config
  const configDir = join(josuiRoot, "config");
  if (existsSync(configDir)) {
    for (const entry of readdirSync(configDir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const srcIndex = join(configDir, entry.name, "src", "index.ts");
      if (existsSync(srcIndex)) {
        aliases[`@josui/${entry.name}`] = srcIndex;
      }
    }
  }

  return aliases;
}

export function josuiDev(options: JosuiDevOptions = {}): Plugin {
  const cwd = process.cwd();

  // Resolve josui path: param > .josui.json > default
  const config = readJosuiConfig(cwd);
  const rawPath = options.josuiPath ?? config?.josuiPath ?? "../josui";
  const josuiRoot = resolve(cwd, rawPath);

  if (!existsSync(josuiRoot)) {
    console.warn(`[josui-dev] josui path not found: ${josuiRoot} — plugin disabled`);
    return { name: "josui-dev" };
  }

  const packagesDir = join(josuiRoot, "packages");
  if (!existsSync(packagesDir)) {
    console.warn(`[josui-dev] No packages/ dir at ${josuiRoot} — plugin disabled`);
    return { name: "josui-dev" };
  }

  const aliases = discoverPackages(josuiRoot);
  const packageNames = Object.keys(aliases);

  if (packageNames.length === 0) {
    console.warn("[josui-dev] No packages discovered — plugin disabled");
    return { name: "josui-dev" };
  }

  console.log(`[josui-dev] Aliasing ${packageNames.length} packages from ${rawPath}`);

  return {
    name: "josui-dev",
    config() {
      return {
        resolve: {
          alias: aliases,
          dedupe: ["react", "react-dom"],
        },
        server: {
          fs: {
            allow: [josuiRoot],
          },
        },
        optimizeDeps: {
          exclude: packageNames,
        },
        ssr: {
          noExternal: packageNames,
        },
      };
    },
  };
}
