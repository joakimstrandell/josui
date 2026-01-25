// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';

import { createVueConfig } from '@josui/eslint-config/vue';

const config: object[] = [
  ...createVueConfig(import.meta.dirname),
  ...storybook.configs['flat/recommended'],
];
export default config;
