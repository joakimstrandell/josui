import baseConfig from './index.ts';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

const reactRules = {
  files: ['**/*.{jsx,tsx}'],
  plugins: {
    react,
    'react-hooks': reactHooks,
  },
  languageOptions: {
    parserOptions: {
      ecmaFeatures: { jsx: true },
    },
  },
  settings: {
    react: { version: 'detect' },
  },
  rules: {
    ...react.configs.recommended.rules,
    ...reactHooks.configs.recommended.rules,
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
  },
};

/** ESLint config for React packages (raw array) */
const reactConfig: object[] = [...baseConfig, reactRules];

/** Factory to create React ESLint config with tsconfigRootDir */
export function createReactConfig(tsconfigRootDir: string): object[] {
  return [
    ...reactConfig,
    {
      languageOptions: {
        parserOptions: {
          tsconfigRootDir,
        },
      },
    },
  ];
}

export default reactConfig;
