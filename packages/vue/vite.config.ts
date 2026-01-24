import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      include: ['src/**/*.ts', 'src/**/*.vue'],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'JosuiVue',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
    },
    cssCodeSplit: false,
    rollupOptions: {
      external: ['vue', 'lucide-vue-next', 'reka-ui', /^reka-ui\/.*/],
      output: {
        globals: {
          vue: 'Vue',
          'lucide-vue-next': 'LucideVueNext',
          'reka-ui': 'RekaUI',
        },
        assetFileNames: (assetInfo) => {
          // Rename the CSS output to styles.css for consistency
          if (assetInfo.name?.endsWith('.css')) {
            return 'styles.css';
          }
          return assetInfo.name ?? 'asset';
        },
      },
    },
    sourcemap: true,
  },
});
