import { serve } from "@hono/node-server";
import { createApi } from "./api.ts";
import { watchFile } from "./watch.ts";

export interface StartServerOptions {
  inputPath: string;
  port: number;
  webDir: string;
}

export function startServer(options: StartServerOptions): {
  stop: () => Promise<void>;
  url: string;
} {
  const watcher = watchFile(options.inputPath);
  const app = createApi({
    inputPath: options.inputPath,
    webDir: options.webDir,
    watcher,
  });

  const server = serve({ fetch: app.fetch, port: options.port });

  return {
    url: `http://127.0.0.1:${options.port}`,
    stop: async () => {
      await watcher.close();
      await new Promise<void>((resolve, reject) => {
        server.close((error) => (error ? reject(error) : resolve()));
      });
    },
  };
}
