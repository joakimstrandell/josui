import type { KnipConfig } from 'knip';

export default {
  workspaces: {
    '.': {
      entry: ['scripts/*.ts'],
      project: ['scripts/**/*.ts'],
    },
    'packages/tokens': {
      entry: ['terrazzo.config.mjs'],
    },
    'packages/scss': {
      ignore: ['**/*'],
    },
    'packages/tailwind': {
      ignore: ['**/*'],
    },
    'packages/typescript-config': {
      ignore: ['**/*'],
      ignoreDependencies: ['vue'], // referenced in vue.json types
    },
    'apps/docs': {
      ignore: ['**/*'],
    },
    'packages/vue': {
      ignoreDependencies: ['vue-tsc'], // CLI tool for type-checking
    },
    'packages/*': {},
    'apps/*': {},
  },
  compilers: {
    // Handle CSS @import and @plugin (Tailwind v4), skip @source
    css: (text: string) => {
      return [...text.matchAll(/@(?:import|plugin)\s+["']([^"']+)["']/g)]
        .map(([, dep]) => (dep.startsWith('.') ? '' : `import "${dep}";`))
        .filter(Boolean)
        .join('\n');
    },
    // Handle SCSS @import and @use
    scss: (text: string) => {
      return [...text.matchAll(/@(?:import|use)\s+["']([^"']+)["']/g)]
        .map(([, dep]) => (dep.startsWith('.') ? '' : `import "${dep}";`))
        .filter(Boolean)
        .join('\n');
    },
  },
  ignore: ['**/dist/**', '**/storybook-static/**'],
  //ignoreDependencies: ['@josui/typescript-config'], // used via tsconfig extends
} satisfies KnipConfig;
