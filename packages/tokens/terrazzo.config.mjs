import { defineConfig } from "@terrazzo/cli";
import css from "@terrazzo/plugin-css";
import js from "@terrazzo/plugin-js";
import sass from "@terrazzo/plugin-sass";
import tailwind from "@terrazzo/plugin-tailwind";

export default defineConfig({
  tokens: [
    "./src/tokens/color.json",
    "./src/tokens/font.json",
    "./src/tokens/spacing.json",
    "./src/tokens/radius.json",
    "./src/tokens/shadow.json",
    "./src/tokens/animation.json",
    "./src/tokens/z-index.json",
    "./src/tokens/breakpoint.json",
    "./src/tokens/opacity.json",
  ],
  outDir: "./dist/",
  plugins: [
    css({
      filename: "css/variables.css",
      variableName: (token) => `--${token.id.replace(/\./g, "-")}`,
      modeSelectors: [
        {
          mode: "light",
          selectors: [
            '@media (prefers-color-scheme: light)',
            '[data-theme="light"]',
            '.light',
          ],
          scheme: "light",
        },
        {
          mode: "dark",
          selectors: [
            '@media (prefers-color-scheme: dark)',
            '[data-theme="dark"]',
            '.dark',
          ],
          scheme: "dark",
        },
      ],
    }),
    js({
      js: "js/index.js",
      dts: "js/index.d.ts",
      json: "js/tokens.json",
    }),
    tailwind({
      filename: "tailwind/theme.css",
      theme: {
        // Colors
        color: ["color.*"],
        // Typography
        fontFamily: ["font.family.*"],
        fontSize: ["font.size.*"],
        fontWeight: ["font.weight.*"],
        letterSpacing: ["font.tracking.*"],
        // Spacing & Layout
        spacing: ["spacing.*"],
        borderRadius: ["radius.*"],
        // Shadows
        boxShadow: ["shadow.*"],
        // Animation
        transitionDuration: ["animation.duration.*"],
        transitionTimingFunction: ["animation.easing.*"],
        // Z-index
        zIndex: ["z-index.*"],
        // Breakpoints
        screens: ["breakpoint.*"],
        // Opacity
        opacity: ["opacity.*"],
      },
    }),
    sass({
      filename: "scss/index.scss",
    }),
  ],
});
