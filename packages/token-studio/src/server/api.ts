import path from 'node:path';
import fs from 'node:fs/promises';
import { Hono } from 'hono';
import { serveStatic } from '@hono/node-server/serve-static';
import { createCategorySchema, saveCategorySchema, validateSchema } from '../shared/schemas';
import { validateCategoryDocument } from '../shared/validators';
import type { TokenRepository } from './repository';

export function createApi(repository: TokenRepository, webDir: string): Hono {
  const app = new Hono();

  app.get('/api/health', (context) => {
    return context.json({
      status: 'ok',
      tokensDir: repository.tokensDir,
      terrazzoPath: repository.terrazzoPath,
    });
  });

  app.get('/api/categories', async (context) => {
    const categories = await repository.listCategories();
    return context.json({ categories });
  });

  app.get('/api/categories/:name', async (context) => {
    const name = context.req.param('name');
    try {
      const category = await repository.getCategory(name);
      return context.json(category);
    } catch (error) {
      return context.json({ error: (error as Error).message }, 404);
    }
  });

  app.post('/api/categories', async (context) => {
    const body = await context.req.json();
    const parsed = createCategorySchema.safeParse(body);

    if (!parsed.success) {
      return context.json({ error: parsed.error.issues[0]?.message ?? 'Invalid request' }, 400);
    }

    try {
      const created = await repository.createCategory(parsed.data.name, parsed.data.type);
      return context.json(created, 201);
    } catch (error) {
      return context.json({ error: (error as Error).message }, 400);
    }
  });

  app.put('/api/categories/:name', async (context) => {
    const name = context.req.param('name');
    const body = await context.req.json();
    const parsed = saveCategorySchema.safeParse(body);

    if (!parsed.success) {
      return context.json({ error: parsed.error.issues[0]?.message ?? 'Invalid request' }, 400);
    }

    try {
      const saved = await repository.saveCategory(name, parsed.data.document);
      return context.json(saved);
    } catch (error) {
      return context.json({ error: (error as Error).message }, 400);
    }
  });

  app.delete('/api/categories/:name', async (context) => {
    const name = context.req.param('name');
    await repository.deleteCategory(name);
    return context.body(null, 204);
  });

  app.post('/api/validate', async (context) => {
    const body = await context.req.json();
    const parsed = validateSchema.safeParse(body);
    if (!parsed.success) {
      return context.json({ error: parsed.error.issues[0]?.message ?? 'Invalid request' }, 400);
    }

    const result = validateCategoryDocument(parsed.data.name, parsed.data.document);
    return context.json(result);
  });

  app.use('*', serveStatic({ root: webDir }));
  app.get('*', async (context) => {
    const requestPath = context.req.path;
    if (requestPath.startsWith('/api/')) {
      return context.notFound();
    }
    if (path.extname(requestPath)) {
      return context.notFound();
    }

    const indexPath = path.join(webDir, 'index.html');
    try {
      const html = await fs.readFile(indexPath, 'utf8');
      return context.html(html);
    } catch {
      return context.text(
        'Token Studio web assets are missing. Run `pnpm --filter @josui/token-studio build` first.',
        503
      );
    }
  });

  return app;
}
