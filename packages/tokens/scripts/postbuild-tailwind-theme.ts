import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.resolve(__dirname, '../dist/tailwind/theme.css');

const css = await fs.readFile(filePath, 'utf8');
const updated = css.replace('@import "tailwindcss";\n\n', '').replaceAll('--*-', '--');

await fs.writeFile(filePath, updated);
