import type { SupportedTokenType, ValidationResult } from './types';
import { SUPPORTED_TYPES } from './constants';

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isReferenceValue(value: unknown): boolean {
  return typeof value === 'string' && /^\{[a-z0-9.-]+(?:\.[a-z0-9.-]+)*\}$/i.test(value);
}

function isSupportedType(type: unknown): type is SupportedTokenType {
  return typeof type === 'string' && SUPPORTED_TYPES.includes(type as SupportedTokenType);
}

function validateTypedLiteral(type: SupportedTokenType, value: unknown): string | null {
  if (isReferenceValue(value)) {
    return null;
  }

  switch (type) {
    case 'color': {
      if (!isObject(value)) {
        return 'Color value must be an object';
      }
      if (typeof value.colorSpace !== 'string') {
        return 'Color value needs colorSpace';
      }
      if (!Array.isArray(value.components) || value.components.some((c) => typeof c !== 'number')) {
        return 'Color value needs numeric components array';
      }
      return null;
    }
    case 'dimension':
    case 'duration': {
      if (!isObject(value)) {
        return `${type} value must be an object`;
      }
      if (typeof value.value !== 'number') {
        return `${type} value needs numeric value`;
      }
      if (typeof value.unit !== 'string') {
        return `${type} value needs unit`;
      }
      return null;
    }
    case 'cubicBezier': {
      if (!Array.isArray(value) || value.length !== 4 || value.some((n) => typeof n !== 'number')) {
        return 'cubicBezier value must be an array of four numbers';
      }
      return null;
    }
    case 'fontFamily': {
      if (typeof value === 'string') {
        return null;
      }
      if (Array.isArray(value) && value.every((part) => typeof part === 'string')) {
        return null;
      }
      return 'fontFamily value must be string or string[]';
    }
    case 'number': {
      if (typeof value !== 'number') {
        return 'number token must have numeric value';
      }
      return null;
    }
    case 'string': {
      if (typeof value !== 'string') {
        return 'string token must have string value';
      }
      return null;
    }
    default:
      return 'Unsupported token type';
  }
}

interface TraverseContext {
  inheritedType?: SupportedTokenType;
}

export function validateCategoryDocument(
  name: string,
  document: Record<string, unknown>
): ValidationResult {
  const issues: ValidationResult['issues'] = [];

  const rootKeys = Object.keys(document);
  if (rootKeys.length !== 1) {
    issues.push({ path: '$', message: 'Document must contain exactly one root key' });
    return { valid: false, issues };
  }

  const [rootKey] = rootKeys;
  if (rootKey !== name) {
    issues.push({ path: '$', message: `Root key must match category name "${name}"` });
  }

  const rootValue = document[rootKey];
  if (!isObject(rootValue)) {
    issues.push({ path: rootKey, message: 'Root value must be an object' });
    return { valid: false, issues };
  }

  function traverse(node: Record<string, unknown>, path: string, context: TraverseContext): void {
    const localType = isSupportedType(node.$type) ? node.$type : context.inheritedType;
    const hasValue = Object.prototype.hasOwnProperty.call(node, '$value');

    if (hasValue) {
      if (!localType) {
        issues.push({
          path,
          message: 'Token must define $type directly or inherit one from parent',
        });
      } else {
        const typedIssue = validateTypedLiteral(localType, node.$value);
        if (typedIssue) {
          issues.push({ path: `${path}.$value`, message: typedIssue });
        }
      }

      if (Object.prototype.hasOwnProperty.call(node, '$extensions')) {
        const extensions = node.$extensions;
        if (!isObject(extensions)) {
          issues.push({ path: `${path}.$extensions`, message: '$extensions must be an object' });
        } else if (Object.prototype.hasOwnProperty.call(extensions, 'mode')) {
          const mode = extensions.mode;
          if (!isObject(mode)) {
            issues.push({ path: `${path}.$extensions.mode`, message: 'mode must be an object' });
          } else {
            for (const modeKey of ['light', 'dark'] as const) {
              if (Object.prototype.hasOwnProperty.call(mode, modeKey) && localType) {
                const typedIssue = validateTypedLiteral(localType, mode[modeKey]);
                if (typedIssue) {
                  issues.push({
                    path: `${path}.$extensions.mode.${modeKey}`,
                    message: typedIssue,
                  });
                }
              }
            }
          }
        }
      }
    }

    for (const [key, value] of Object.entries(node)) {
      if (key.startsWith('$')) {
        continue;
      }

      if (!isObject(value)) {
        issues.push({ path: `${path}.${key}`, message: 'Group/token nodes must be objects' });
        continue;
      }

      traverse(value, `${path}.${key}`, {
        inheritedType: localType,
      });
    }
  }

  traverse(rootValue, rootKey, {
    inheritedType: isSupportedType(rootValue.$type) ? rootValue.$type : undefined,
  });

  return {
    valid: issues.length === 0,
    issues,
  };
}
