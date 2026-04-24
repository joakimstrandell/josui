import path from "node:path";
import process from "node:process";
import fs from "node:fs";
import { Command } from "commander";
import open from "open";
import { startServer } from "./server/index.ts";

async function run(): Promise<void> {
  const program = new Command();

  program
    .name("josui-tokens-preview")
    .description("Preview Tailwind tokens in the browser with live reload")
    .requiredOption("--input <path>", "Path to a tokens.css file")
    .option("--cwd <path>", "Working directory", process.cwd())
    .option("--port <number>", "Port to run local server", "4599")
    .option("--no-open", "Do not open browser automatically");

  program.parse(process.argv);
  const options = program.opts<{
    input: string;
    cwd: string;
    port: string;
    open: boolean;
  }>();

  const cwd = path.resolve(options.cwd);
  const inputPath = path.resolve(cwd, options.input);

  if (!fs.existsSync(inputPath)) {
    process.stderr.write(`Input file not found: ${inputPath}\n`);
    process.exit(1);
  }

  const server = startServer({
    inputPath,
    port: Number(options.port),
    webDir: path.resolve(import.meta.dirname, "..", "dist", "web"),
  });

  process.stdout.write(`Tokens Preview running at ${server.url}\n`);
  process.stdout.write(`input: ${inputPath}\n`);

  if (options.open) {
    await open(server.url);
  }

  const shutdown = async (): Promise<void> => {
    await server.stop();
    process.exit(0);
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

void run();
