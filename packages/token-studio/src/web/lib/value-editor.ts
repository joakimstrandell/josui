import type { SupportedTokenType } from '../../shared/types';

export interface TokenFormState {
  path: string;
  type: SupportedTokenType;
  description: string;
  valueMode: 'literal' | 'reference';
  reference: string;
  colorSpace: 'oklch' | 'rgb' | 'hsl';
  colorComponents: string;
  dimensionValue: string;
  dimensionUnit: string;
  durationValue: string;
  durationUnit: string;
  cubicBezier: string;
  fontFamily: string;
  numberValue: string;
  stringValue: string;
  hasMode: boolean;
  modeLight: string;
  modeDark: string;
}

export const initialTokenFormState: TokenFormState = {
  path: '',
  type: 'string',
  description: '',
  valueMode: 'literal',
  reference: '{category.token}',
  colorSpace: 'oklch',
  colorComponents: '1, 0, 0',
  dimensionValue: '1',
  dimensionUnit: 'rem',
  durationValue: '200',
  durationUnit: 'ms',
  cubicBezier: '0.25, 0.1, 0.25, 1',
  fontFamily: 'system-ui',
  numberValue: '1',
  stringValue: 'value',
  hasMode: false,
  modeLight: '',
  modeDark: '',
};

function parseNumericList(input: string): number[] {
  return input
    .split(',')
    .map((part) => Number(part.trim()))
    .filter((entry) => !Number.isNaN(entry));
}

export function buildLiteralValue(form: TokenFormState): unknown {
  if (form.valueMode === 'reference') {
    return form.reference.trim();
  }

  switch (form.type) {
    case 'color':
      return {
        colorSpace: form.colorSpace,
        components: parseNumericList(form.colorComponents),
      };
    case 'dimension':
      return {
        value: Number(form.dimensionValue),
        unit: form.dimensionUnit,
      };
    case 'duration':
      return {
        value: Number(form.durationValue),
        unit: form.durationUnit,
      };
    case 'cubicBezier':
      return parseNumericList(form.cubicBezier).slice(0, 4);
    case 'fontFamily': {
      const parts = form.fontFamily
        .split(',')
        .map((part) => part.trim())
        .filter(Boolean);
      return parts.length > 1 ? parts : (parts[0] ?? '');
    }
    case 'number':
      return Number(form.numberValue);
    case 'string':
      return form.stringValue;
    default:
      return form.stringValue;
  }
}

function parseLooseModeValue(value: string): unknown {
  const trimmed = value.trim();
  if (!trimmed) {
    return undefined;
  }
  if (/^\{[a-z0-9.-]+(?:\.[a-z0-9.-]+)*\}$/i.test(trimmed)) {
    return trimmed;
  }

  try {
    return JSON.parse(trimmed);
  } catch {
    return trimmed;
  }
}

export function buildModeValue(form: TokenFormState):
  | {
      light?: unknown;
      dark?: unknown;
    }
  | undefined {
  if (!form.hasMode) {
    return undefined;
  }

  const light = parseLooseModeValue(form.modeLight);
  const dark = parseLooseModeValue(form.modeDark);

  if (light === undefined && dark === undefined) {
    return undefined;
  }

  return {
    ...(light !== undefined ? { light } : {}),
    ...(dark !== undefined ? { dark } : {}),
  };
}
