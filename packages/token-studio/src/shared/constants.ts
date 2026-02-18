import type { SupportedTokenType } from './types';

export const SUPPORTED_TYPES: SupportedTokenType[] = [
  'color',
  'dimension',
  'duration',
  'cubicBezier',
  'fontFamily',
  'number',
  'string',
];

export const DEFAULT_TOKENS_RELATIVE_DIR = 'packages/tokens/src/tokens';
export const DEFAULT_TERRAZZO_RELATIVE_PATH = 'packages/tokens/terrazzo.config.mjs';
