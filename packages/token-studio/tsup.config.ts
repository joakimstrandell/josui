import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/cli.ts'],
  format: ['esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  banner: {
    js: '#!/usr/bin/env node',
  },
  external: [
    'react',
    'react-dom',
    '@tanstack/react-router',
    '@vitejs/plugin-react',
    '@tailwindcss/vite',
    'tailwindcss',
  ],
});
