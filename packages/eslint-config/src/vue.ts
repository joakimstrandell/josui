import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import vue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';

/** ESLint config for Vue packages (raw array) */
export const vueConfig: object[] = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...vue.configs['flat/recommended'],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        sourceType: 'module',
        projectService: true,
        extraFileExtensions: ['.vue'],
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
      'vue/multi-word-component-names': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/html-self-closing': 'off',
      'vue/require-default-prop': 'off',
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

/** Factory to create Vue ESLint config with tsconfigRootDir */
export function createVueConfig(tsconfigRootDir: string): object[] {
  return [
    ...vueConfig,
    {
      languageOptions: {
        parserOptions: {
          tsconfigRootDir,
        },
      },
    },
  ];
}

export default vueConfig;
