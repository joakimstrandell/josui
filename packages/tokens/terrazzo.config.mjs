import { defineConfig } from '@terrazzo/cli';
import css from '@terrazzo/plugin-css';
import js from '@terrazzo/plugin-js';
import sass from '@terrazzo/plugin-sass';
import tailwind from '@terrazzo/plugin-tailwind';

export default defineConfig({
  tokens: [
    './src/tokens/color.json',
    './src/tokens/font.json',
    './src/tokens/spacing.json',
    './src/tokens/radius.json',
    './src/tokens/shadow.json',
    './src/tokens/animation.json',
    './src/tokens/z-index.json',
    './src/tokens/breakpoint.json',
  ],
  outDir: './dist/',
  plugins: [
    css({
      filename: 'css/variables.css',
      variableName: (token) => `--${token.id.replace(/\./g, '-')}`,
      modeSelectors: [
        {
          mode: 'light',
          selectors: ['[data-theme="light"]', '.light'],
        },
        {
          mode: 'dark',
          selectors: ['[data-theme="dark"]', '.dark'],
        },
      ],
    }),
    js({
      js: 'js/index.js',
      dts: 'js/index.d.ts',
      json: 'js/tokens.json',
    }),
    tailwind({
      filename: 'tailwind/theme.css',
      modeVariants: [{ variant: 'dark', mode: 'dark' }],
      theme: {
        // Colors
        color: ['color.*'],
        // Typography
        font: ['font.family.*'],
        text: ['font.size.*'],
        'font-weight': ['font.weight.*'],
        tracking: ['font.tracking.*'],
        // Spacing & Layout
        spacing: ['spacing.*'],
        radius: ['radius.*'],
        // Shadows
        'drop-shadow': ['shadow.*'],
        // Animation
        '': ['animation.duration.*'],
        '': ['animation.easing.*'],
        // Z-index
        z: ['z-index.*'],
        // Breakpoints
        breakpoint: ['breakpoint.*'],
      },
    }),
    sass({
      filename: 'scss/index.scss',
    }),
  ],
});
