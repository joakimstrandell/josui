import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

/** Base ESLint config array (without tsconfigRootDir) */
export const baseConfig: object[] = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        projectService: true,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/.storybook/**',
      '**/storybook-static/**',
      '**/coverage/**',
    ],
  },
];

/** Factory to create ESLint config with tsconfigRootDir */
export function createConfig(tsconfigRootDir: string): object[] {
  return [
    ...baseConfig,
    {
      languageOptions: {
        parserOptions: {
          tsconfigRootDir,
        },
      },
    },
  ];
}

export default baseConfig;
