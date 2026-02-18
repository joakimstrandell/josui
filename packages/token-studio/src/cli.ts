import path from 'node:path';
import process from 'node:process';
import { Command } from 'commander';
import open from 'open';
import { DEFAULT_TOKENS_RELATIVE_DIR, DEFAULT_TERRAZZO_RELATIVE_PATH } from './shared/constants';
import { inferTerrazzoPathFromTokensDir } from './shared/path-utils';
import { findConfigFile, findNearestTokensRoot, readConfig } from './shared/config';
import { startServer } from './server/index';

async function run(): Promise<void> {
  const program = new Command();

  program
    .name('josui-token-studio')
    .description('Launch local token CRUD editor')
    .option('--cwd <path>', 'Working directory', process.cwd())
    .option('--config <path>', 'Path to token-studio config JSON')
    .option('--tokens-dir <path>', 'Tokens directory path')
    .option('--port <number>', 'Port to run local server', '4598')
    .option('--no-open', 'Do not open browser automatically');

  program.parse(process.argv);
  const options = program.opts<{
    cwd: string;
    config?: string;
    tokensDir?: string;
    port: string;
    open: boolean;
  }>();

  const cwd = path.resolve(options.cwd);
  const explicitConfigPath = options.config ? path.resolve(cwd, options.config) : null;
  const discoveredConfigPath = explicitConfigPath ?? (await findConfigFile(cwd));
  const config = discoveredConfigPath ? await readConfig(discoveredConfigPath) : {};
  const configBaseDir = discoveredConfigPath ? path.dirname(discoveredConfigPath) : cwd;

  const discoveredTokensDir = await findNearestTokensRoot(cwd);
  const configTokensDir = config.tokensDir
    ? path.resolve(configBaseDir, config.tokensDir)
    : undefined;
  const tokensDir = path.resolve(
    options.tokensDir ??
      configTokensDir ??
      discoveredTokensDir ??
      path.join(cwd, DEFAULT_TOKENS_RELATIVE_DIR)
  );

  const defaultTerrazzoPath = path.resolve(
    config.terrazzoPath
      ? path.resolve(configBaseDir, config.terrazzoPath)
      : path.join(cwd, DEFAULT_TERRAZZO_RELATIVE_PATH)
  );
  const terrazzoPath = inferTerrazzoPathFromTokensDir(tokensDir, defaultTerrazzoPath);

  const server = startServer({
    tokensDir,
    terrazzoPath,
    port: Number(options.port),
    webDir: path.resolve(import.meta.dirname, '..', 'dist', 'web'),
  });

  process.stdout.write(`Token Studio running at ${server.url}\n`);
  if (discoveredConfigPath) {
    process.stdout.write(`config: ${discoveredConfigPath}\n`);
  }
  process.stdout.write(`tokensDir: ${tokensDir}\n`);
  process.stdout.write(`terrazzo: ${terrazzoPath}\n`);

  if (options.open) {
    await open(server.url);
  }

  const shutdown = async (): Promise<void> => {
    await server.stop();
    process.exit(0);
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

void run();
