import StyleDictionary, { type Config } from 'style-dictionary';

interface ShadowValue {
  offsetX: string;
  offsetY: string;
  blur: string;
  spread: string;
  color: string;
}

type TokenValue = string | number | ShadowValue | ShadowValue[] | string[];

// Helper to flatten token path for CSS variable names
const cssVarName = (token: { path: string[] }) => {
  return `--${token.path.join('-')}`;
};

// Helper to format shadow value
const formatShadow = (value: ShadowValue | ShadowValue[]): string => {
  if (Array.isArray(value)) {
    return value.map(formatShadow).join(', ');
  }
  return `${value.offsetX} ${value.offsetY} ${value.blur} ${value.spread} ${value.color}`;
};

// Helper to format font family
const formatFontFamily = (value: string | string[]): string => {
  if (Array.isArray(value)) {
    return value.map((f: string) => (f.includes(' ') ? `"${f}"` : f)).join(', ');
  }
  return value;
};

// Custom format for CSS variables
StyleDictionary.registerFormat({
  name: 'css/variables-custom',
  format: ({ dictionary }) => {
    const variables = dictionary.allTokens
      .map((token) => {
        let value = token.$value ?? token.value;
        const type = token.$type ?? token.type;

        if (type === 'shadow') {
          value = formatShadow(value);
        } else if (type === 'fontFamily') {
          value = formatFontFamily(value);
        }

        return `  ${cssVarName(token)}: ${value};`;
      })
      .join('\n');

    return `:root {\n${variables}\n}\n`;
  },
});

// Custom format for JS exports - uses flat structure with CSS var names as keys
StyleDictionary.registerFormat({
  name: 'javascript/esm-custom',
  format: ({ dictionary }) => {
    const tokens: Record<string, TokenValue> = {};

    dictionary.allTokens.forEach((token) => {
      const key = token.path.join('-');
      tokens[key] = token.$value ?? token.value;
    });

    return `export const tokens = ${JSON.stringify(tokens, null, 2)};\n\nexport default tokens;\n`;
  },
});

// Custom format for TypeScript declarations - flat structure matching JS export
StyleDictionary.registerFormat({
  name: 'typescript/declarations',
  format: ({ dictionary }) => {
    const entries = dictionary.allTokens.map((token) => {
      const key = token.path.join('-');
      const value = token.$value ?? token.value;
      const type = typeof value === 'number' ? 'number' : 'string';
      return `  "${key}": ${type};`;
    });

    return `export interface Tokens {\n${entries.join('\n')}\n}\n\nexport declare const tokens: Tokens;\nexport default tokens;\n`;
  },
});

const config: Config = {
  source: ['src/tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/css/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables-custom',
        },
      ],
    },
    js: {
      transformGroup: 'js',
      buildPath: 'dist/js/',
      files: [
        {
          destination: 'index.js',
          format: 'javascript/esm-custom',
        },
        {
          destination: 'index.d.ts',
          format: 'typescript/declarations',
        },
      ],
    },
  },
};

export default config;
