import path from 'node:path';

export function normalizeCategoryName(name: string): string {
  return name.trim().toLowerCase();
}

export function categoryFileName(name: string): string {
  return `${name}.json`;
}

export function validateCategoryName(name: string): string | null {
  if (!name) {
    return 'Category name is required';
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) {
    return 'Category name must be kebab-case';
  }

  return null;
}

export function resolveDefaultPaths(cwd: string): {
  tokensDir: string;
  terrazzoPath: string;
} {
  return {
    tokensDir: path.join(cwd, 'packages/tokens/src/tokens'),
    terrazzoPath: path.join(cwd, 'packages/tokens/terrazzo.config.mjs'),
  };
}

export function inferTerrazzoPathFromTokensDir(tokensDir: string, fallback: string): string {
  const normalized = path.normalize(tokensDir);
  const suffix = path.normalize(path.join('src', 'tokens'));

  if (normalized.endsWith(suffix)) {
    return path.join(normalized, '..', '..', 'terrazzo.config.mjs');
  }

  return fallback;
}
