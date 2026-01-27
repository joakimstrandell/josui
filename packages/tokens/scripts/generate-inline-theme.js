import { readFileSync, writeFileSync } from "fs";

const theme = readFileSync("./dist/tailwind/theme.css", "utf-8");
const inline = theme.replace("@theme {", "@theme inline {");
writeFileSync("./dist/tailwind/theme-inline.css", inline);
