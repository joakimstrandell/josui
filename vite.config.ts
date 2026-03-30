import { defineConfig } from "vite-plus";

export default defineConfig({
  fmt: {
    options: {
      semi: true,
      singleQuote: true,
      tabWidth: 2,
      trailingComma: "es5",
      printWidth: 100,
    },
  },
  lint: {
    options: {
      typeAware: true,
    },
  },
  staged: {
    "*.{ts,tsx,js,jsx}": "vp check --fix",
    "*.{json,md,css}": "vp fmt --write",
  },
});
