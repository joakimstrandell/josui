import type { StorybookConfig } from '@storybook/vue3-vite';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';

const config: StorybookConfig = {
  stories: ['../../../packages/vue/src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  docs: {},
  viteFinal: async (config) => {
    config.plugins = config.plugins || [];
    config.plugins.push(tailwindcss());
    config.plugins.push(vue());
    return config;
  },
};

export default config;
