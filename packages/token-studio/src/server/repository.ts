import fs from 'node:fs/promises';
import path from 'node:path';
import {
  categoryFileName,
  normalizeCategoryName,
  validateCategoryName,
} from '../shared/path-utils';
import type { CategoryDocument, CategorySummary, SupportedTokenType } from '../shared/types';
import { validateCategoryDocument } from '../shared/validators';
import { flattenTokens } from '../shared/document';
import { ensureDirectory, readJsonFile, removeFileIfExists, writeJsonAtomic } from './fs-utils';
import { syncTerrazzoTokens } from './terrazzo';

export interface RepositoryOptions {
  tokensDir: string;
  terrazzoPath: string;
}

export class TokenRepository {
  constructor(private readonly options: RepositoryOptions) {}

  get tokensDir(): string {
    return this.options.tokensDir;
  }

  get terrazzoPath(): string {
    return this.options.terrazzoPath;
  }

  async listCategories(): Promise<CategorySummary[]> {
    await ensureDirectory(this.tokensDir);

    const entries = await fs.readdir(this.tokensDir, { withFileTypes: true });
    const categories: CategorySummary[] = [];

    for (const entry of entries) {
      if (!entry.isFile() || !entry.name.endsWith('.json')) {
        continue;
      }

      const name = entry.name.replace(/\.json$/, '');
      categories.push({
        name,
        fileName: entry.name,
        path: path.join(this.tokensDir, entry.name),
      });
    }

    return categories.sort((a, b) => a.name.localeCompare(b.name));
  }

  private categoryPath(name: string): string {
    return path.join(this.tokensDir, categoryFileName(name));
  }

  async getCategory(name: string): Promise<CategoryDocument> {
    const normalized = normalizeCategoryName(name);
    const filePath = this.categoryPath(normalized);
    const document = await readJsonFile(filePath);

    return {
      name: normalized,
      document,
      tokens: flattenTokens(document),
    };
  }

  async createCategory(name: string, type: SupportedTokenType): Promise<CategoryDocument> {
    const normalized = normalizeCategoryName(name);
    const nameError = validateCategoryName(normalized);
    if (nameError) {
      throw new Error(nameError);
    }

    const filePath = this.categoryPath(normalized);

    try {
      await fs.access(filePath);
      throw new Error(`Category ${normalized} already exists`);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
        throw error;
      }
    }

    const document: Record<string, unknown> = {
      [normalized]: {
        $type: type,
      },
    };

    const validation = validateCategoryDocument(normalized, document);
    if (!validation.valid) {
      throw new Error(validation.issues[0]?.message ?? 'Validation failed');
    }

    await writeJsonAtomic(filePath, document);
    await syncTerrazzoTokens(
      this.terrazzoPath,
      `./src/tokens/${categoryFileName(normalized)}`,
      'add'
    );

    return {
      name: normalized,
      document,
      tokens: [],
    };
  }

  async saveCategory(name: string, document: Record<string, unknown>): Promise<CategoryDocument> {
    const normalized = normalizeCategoryName(name);
    const validation = validateCategoryDocument(normalized, document);
    if (!validation.valid) {
      throw new Error(
        validation.issues.map((issue) => `${issue.path}: ${issue.message}`).join('\n')
      );
    }

    const filePath = this.categoryPath(normalized);
    await writeJsonAtomic(filePath, document);

    return {
      name: normalized,
      document,
      tokens: flattenTokens(document),
    };
  }

  async deleteCategory(name: string): Promise<void> {
    const normalized = normalizeCategoryName(name);
    await removeFileIfExists(this.categoryPath(normalized));
    await syncTerrazzoTokens(
      this.terrazzoPath,
      `./src/tokens/${categoryFileName(normalized)}`,
      'remove'
    );
  }
}
