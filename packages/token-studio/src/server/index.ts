import { serve } from '@hono/node-server';
import path from 'node:path';
import { createApi } from './api';
import { TokenRepository } from './repository';

export interface StartServerOptions {
  tokensDir: string;
  terrazzoPath: string;
  port: number;
  webDir: string;
}

export function startServer(options: StartServerOptions): {
  stop: () => Promise<void>;
  url: string;
} {
  const repository = new TokenRepository({
    tokensDir: options.tokensDir,
    terrazzoPath: options.terrazzoPath,
  });
  const app = createApi(repository, path.resolve(options.webDir));

  const server = serve({
    fetch: app.fetch,
    port: options.port,
  });

  return {
    url: `http://127.0.0.1:${options.port}`,
    stop: async () => {
      await new Promise<void>((resolve, reject) => {
        server.close((error) => {
          if (error) {
            reject(error);
            return;
          }
          resolve();
        });
      });
    },
  };
}
