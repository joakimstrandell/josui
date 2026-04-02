import type { KnipConfig } from "knip";

export default {
  workspaces: {
    ".": {
      entry: ["scripts/*.ts"],
      project: ["scripts/**/*.ts"],
    },
    "packages/tokens": {
      entry: ["terrazzo.config.mjs"],
    },
    "packages/tailwind": {
      ignore: ["**/*"],
    },
    "config/typescript-config": {
      ignore: ["**/*"],
    },
    "apps/docs": {
      ignore: ["**/*"],
    },
    "apps/portfolio": {
      ignore: ["**/*"],
    },
    "apps/awkwardgroup": {
      ignore: ["**/*"],
    },
    "packages/*": {},
    "apps/*": {},
  },
  compilers: {
    // Handle CSS @import and @plugin (Tailwind v4), skip @source
    css: (text: string) => {
      return [...text.matchAll(/@(?:import|plugin)\s+["']([^"']+)["']/g)]
        .map(([, dep]) => (dep.startsWith(".") ? "" : `import "${dep}";`))
        .filter(Boolean)
        .join("\n");
    },
  },
  ignore: ["**/dist/**", "**/storybook-static/**"],
  //ignoreDependencies: ['@josui/typescript-config'], // used via tsconfig extends
} satisfies KnipConfig;
