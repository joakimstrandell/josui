import { defineConfig } from "@terrazzo/cli";
import css from "@terrazzo/plugin-css";
import js from "@terrazzo/plugin-js";
import tailwind from "@terrazzo/plugin-tailwind";

export default defineConfig({
  tokens: [
    "./tokens/color.json",
    "./tokens/font.json",
    "./tokens/spacing.json",
    "./tokens/radius.json",
    "./tokens/shadow.json",
    "./tokens/animation.json",
    "./tokens/z-index.json",
    "./tokens/breakpoint.json",
  ],
  outDir: "./generated/",
  plugins: [
    css({
      filename: "css/variables.css",
      variableName: (token) => `--${token.id.replace(/\./g, "-")}`,
      modeSelectors: [
        {
          mode: "light",
          selectors: ['[data-theme="light"]', ".light"],
        },
        {
          mode: "dark",
          selectors: ['[data-theme="dark"]', ".dark"],
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
      modeVariants: [{ variant: "dark", mode: "dark" }],
      theme: {
        // Colors
        color: ["color.*"],
        // Typography
        font: ["font.family.*"],
        text: ["font.size.*"],
        "font-weight": ["font.weight.*"],
        tracking: ["font.tracking.*"],
        // Spacing & Layout
        spacing: ["spacing.*"],
        radius: ["radius.*"],
        // Shadows
        "drop-shadow": ["shadow.*"],
        // Animation
        duration: ["animation.duration.*"],
        "*": ["animation.easing.*"],
        // Z-index
        z: ["z-index.*"],
        // Breakpoints
        breakpoint: ["breakpoint.*"],
      },
    }),
  ],
});
