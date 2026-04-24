import path from "node:path";
import fs from "node:fs/promises";
import { Hono } from "hono";
import { serveStatic } from "@hono/node-server/serve-static";
import { streamSSE } from "hono/streaming";
import { scopeTokensCss } from "./scope.ts";
import type { watchFile } from "./watch.ts";

type Watcher = ReturnType<typeof watchFile>;

export function createApi(options: { inputPath: string; webDir: string; watcher: Watcher }): Hono {
  const app = new Hono();

  app.get("/api/health", (context) => context.json({ status: "ok", input: options.inputPath }));

  app.get("/tokens.css", async (context) => {
    try {
      const source = await fs.readFile(options.inputPath, "utf8");
      const scoped = scopeTokensCss(source);
      return context.body(scoped, 200, {
        "content-type": "text/css; charset=utf-8",
        "cache-control": "no-store",
      });
    } catch (error) {
      return context.text(
        `/* failed to read ${options.inputPath}: ${(error as Error).message} */`,
        500,
        {
          "content-type": "text/css; charset=utf-8",
        },
      );
    }
  });

  app.get("/events", (context) =>
    streamSSE(context, async (stream) => {
      const unsubscribe = options.watcher.subscribe(() => {
        void stream.writeSSE({ event: "change", data: String(Date.now()) });
      });

      await stream.writeSSE({ event: "ready", data: String(Date.now()) });

      await new Promise<void>((resolve) => {
        stream.onAbort(() => {
          unsubscribe();
          resolve();
        });
      });
    }),
  );

  app.use("*", serveStatic({ root: options.webDir }));
  app.get("*", async (context) => {
    const requestPath = context.req.path;
    if (
      requestPath.startsWith("/api/") ||
      requestPath === "/events" ||
      requestPath === "/tokens.css"
    ) {
      return context.notFound();
    }
    if (path.extname(requestPath)) {
      return context.notFound();
    }
    const indexPath = path.join(options.webDir, "index.html");
    try {
      const html = await fs.readFile(indexPath, "utf8");
      return context.html(html);
    } catch {
      return context.text(
        "Tokens Preview web assets are missing. Run `pnpm --filter @josui/tokens-preview build` first.",
        503,
      );
    }
  });

  return app;
}
