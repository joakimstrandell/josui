import { defineConfig } from "@terrazzo/cli";
import css from "@terrazzo/plugin-css";
import js from "@terrazzo/plugin-js";

export default defineConfig({
  tokens: [
    "./src/tokens/colors.json",
    "./src/tokens/typography.json",
    "./src/tokens/spacing.json",
    "./src/tokens/radius.json",
    "./src/tokens/shadows.json",
    "./src/tokens/animation.json",
    "./src/tokens/z-index.json",
    "./src/tokens/breakpoints.json",
    "./src/tokens/opacity.json",
  ],
  outDir: "./dist/",
  plugins: [
    css({
      filename: "css/variables.css",
      variableName: (token) => `--${token.id.replace(/\./g, "-")}`,
    }),
    js({
      js: "js/index.js",
      dts: "js/index.d.ts",
      json: "js/tokens.json",
    }),
  ],
});
