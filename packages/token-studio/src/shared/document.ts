import type { SupportedTokenType, TokenItem } from './types';

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function asSupportedType(value: unknown): SupportedTokenType | undefined {
  if (
    value === 'color' ||
    value === 'dimension' ||
    value === 'duration' ||
    value === 'cubicBezier' ||
    value === 'fontFamily' ||
    value === 'number' ||
    value === 'string'
  ) {
    return value;
  }

  return undefined;
}

export function flattenTokens(document: Record<string, unknown>): TokenItem[] {
  const rootKeys = Object.keys(document);
  if (rootKeys.length !== 1) {
    return [];
  }

  const [rootKey] = rootKeys;
  const root = document[rootKey];
  if (!isObject(root)) {
    return [];
  }

  const tokens: TokenItem[] = [];

  function walk(
    node: Record<string, unknown>,
    currentPath: string,
    inheritedType?: SupportedTokenType
  ): void {
    const localType = asSupportedType(node.$type) ?? inheritedType;

    if (Object.prototype.hasOwnProperty.call(node, '$value') && localType) {
      const entry: TokenItem = {
        path: currentPath,
        type: localType,
        description: typeof node.$description === 'string' ? node.$description : undefined,
        value: node.$value,
        hasMode: false,
      };

      if (isObject(node.$extensions) && isObject(node.$extensions.mode)) {
        entry.hasMode = true;
        entry.mode = {
          light: node.$extensions.mode.light,
          dark: node.$extensions.mode.dark,
        };
      }

      tokens.push(entry);
    }

    for (const [key, value] of Object.entries(node)) {
      if (key.startsWith('$')) {
        continue;
      }
      if (!isObject(value)) {
        continue;
      }
      walk(value, `${currentPath}.${key}`, localType);
    }
  }

  walk(root, rootKey, asSupportedType(root.$type));

  return tokens.sort((a, b) => a.path.localeCompare(b.path));
}

function ensureObject(parent: Record<string, unknown>, key: string): Record<string, unknown> {
  const existing = parent[key];
  if (isObject(existing)) {
    return existing;
  }

  const created: Record<string, unknown> = {};
  parent[key] = created;
  return created;
}

export interface UpsertTokenInput {
  path: string;
  type: SupportedTokenType;
  description?: string;
  value: unknown;
  mode?: {
    light?: unknown;
    dark?: unknown;
  };
}

export function upsertToken(
  document: Record<string, unknown>,
  input: UpsertTokenInput
): Record<string, unknown> {
  const cloned = structuredClone(document);
  const segments = input.path.split('.').filter(Boolean);
  if (segments.length < 2) {
    return cloned;
  }

  let cursor = cloned as Record<string, unknown>;
  for (let index = 0; index < segments.length; index += 1) {
    const segment = segments[index];
    const isLeaf = index === segments.length - 1;
    if (!isLeaf) {
      cursor = ensureObject(cursor, segment);
      continue;
    }

    const leaf = ensureObject(cursor, segment);
    leaf.$type = input.type;
    leaf.$value = input.value;

    if (input.description) {
      leaf.$description = input.description;
    } else {
      delete leaf.$description;
    }

    if (input.mode && (input.mode.light !== undefined || input.mode.dark !== undefined)) {
      leaf.$extensions = {
        mode: {
          ...(input.mode.light !== undefined ? { light: input.mode.light } : {}),
          ...(input.mode.dark !== undefined ? { dark: input.mode.dark } : {}),
        },
      };
    } else {
      delete leaf.$extensions;
    }
  }

  return cloned;
}

export function deleteToken(
  document: Record<string, unknown>,
  tokenPath: string
): Record<string, unknown> {
  const cloned = structuredClone(document);
  const segments = tokenPath.split('.').filter(Boolean);
  if (segments.length < 2) {
    return cloned;
  }

  const [rootKey] = segments;
  const rootNode = cloned[rootKey];
  if (!isObject(rootNode)) {
    return cloned;
  }

  function removePath(node: Record<string, unknown>, index: number): boolean {
    const key = segments[index];
    const value = node[key];

    if (!isObject(value)) {
      return false;
    }

    if (index === segments.length - 1) {
      delete node[key];
      return Object.keys(node).filter((candidate) => !candidate.startsWith('$')).length === 0;
    }

    const shouldPrune = removePath(value, index + 1);
    if (shouldPrune) {
      delete node[key];
    }

    return Object.keys(node).filter((candidate) => !candidate.startsWith('$')).length === 0;
  }

  removePath(rootNode, 1);

  return cloned;
}
