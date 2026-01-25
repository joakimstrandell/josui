// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';

import { createReactConfig } from '@josui/eslint-config/react';

const config: object[] = [
  ...createReactConfig(import.meta.dirname),
  ...storybook.configs['flat/recommended'],
];
export default config;
