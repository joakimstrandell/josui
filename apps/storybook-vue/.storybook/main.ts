import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import type { StorybookConfig } from '@storybook/vue3-vite';
import vue from '@vitejs/plugin-vue';

const config: StorybookConfig = {
  stories: ['../../../packages/vue/src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [getAbsolutePath('@storybook/addon-links'), getAbsolutePath('@storybook/addon-docs')],
  framework: {
    name: getAbsolutePath('@storybook/vue3-vite'),
    options: {},
  },
  docs: {},
  viteFinal: async (config) => {
    config.plugins = config.plugins || [];
    config.plugins.push(vue());
    return config;
  },
};

export default config;

function getAbsolutePath(value: string): any {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
