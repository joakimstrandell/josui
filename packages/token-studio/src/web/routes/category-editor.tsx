import * as React from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { deleteToken, upsertToken } from '../../shared/document';
import type { CategoryDocument, TokenItem } from '../../shared/types';
import { TokenForm } from '../components/token-form';
import { deleteCategory, getCategory, saveCategory, validateCategory } from '../lib/api';
import { useChanges } from './changes';

export function CategoryEditorPage() {
  const navigate = useNavigate();
  const params = useParams({ from: '/categories/$name' });
  const { add } = useChanges();
  const [category, setCategory] = React.useState<CategoryDocument | null>(null);
  const [editing, setEditing] = React.useState<TokenItem | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [saving, setSaving] = React.useState(false);

  const load = React.useCallback(async () => {
    setLoading(true);
    try {
      const result = await getCategory(params.name);
      setCategory(result);
      setError(null);
    } catch (reason) {
      setError((reason as Error).message);
    } finally {
      setLoading(false);
    }
  }, [params.name]);

  React.useEffect(() => {
    load().catch(() => undefined);
  }, [load]);

  if (loading || !category) {
    return <p className="text-sm">Loading category...</p>;
  }

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-xl">{category.name}</h2>
          <p className="font-mono text-xs opacity-75">{category.name}.json</p>
        </div>

        <div className="flex gap-2">
          <button
            className="rounded border border-[var(--line)] px-3 py-2"
            type="button"
            onClick={() => setEditing(null)}
          >
            New token
          </button>
          <button
            className="rounded bg-[var(--accent)] px-3 py-2 text-white disabled:opacity-60"
            type="button"
            disabled={saving}
            onClick={async () => {
              setSaving(true);
              setError(null);
              try {
                const validation = await validateCategory({
                  name: category.name,
                  document: category.document,
                });

                if (!validation.valid) {
                  throw new Error(
                    validation.issues.map((issue) => `${issue.path}: ${issue.message}`).join('\n')
                  );
                }

                const saved = await saveCategory(category.name, {
                  document: category.document,
                });
                setCategory(saved);
                add({ level: 'info', message: `Saved ${category.name}.json` });
              } catch (reason) {
                const message = (reason as Error).message;
                setError(message);
                add({ level: 'error', message: `Save failed for ${category.name}: ${message}` });
              } finally {
                setSaving(false);
              }
            }}
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
          <button
            className="rounded border border-red-300 px-3 py-2 text-red-700"
            type="button"
            onClick={async () => {
              try {
                await deleteCategory(category.name);
                add({ level: 'info', message: `Deleted ${category.name}.json` });
                await navigate({ to: '/categories' });
              } catch (reason) {
                const message = (reason as Error).message;
                setError(message);
                add({ level: 'error', message: `Delete failed: ${message}` });
              }
            }}
          >
            Delete category
          </button>
        </div>
      </div>

      {error ? (
        <pre className="whitespace-pre-wrap rounded border border-red-300 bg-red-50 p-3 text-sm">
          {error}
        </pre>
      ) : null}

      <TokenForm
        rootName={category.name}
        editing={editing}
        onCancel={() => setEditing(null)}
        onSubmit={(payload) => {
          const previousPath = editing?.path;
          const baseDocument =
            previousPath && previousPath !== payload.path
              ? deleteToken(category.document, previousPath)
              : category.document;
          const nextDocument = upsertToken(baseDocument, payload);
          setCategory((current) =>
            current
              ? {
                  ...current,
                  document: nextDocument,
                  tokens: current.tokens
                    .filter((token) => token.path !== payload.path && token.path !== previousPath)
                    .concat({
                      path: payload.path,
                      type: payload.type,
                      description: payload.description,
                      value: payload.value,
                      hasMode: Boolean(payload.mode),
                      mode: payload.mode,
                    })
                    .sort((a, b) => a.path.localeCompare(b.path)),
                }
              : current
          );
          setEditing(null);
        }}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-[var(--line)] text-left">
              <th className="py-2">Path</th>
              <th className="py-2">Type</th>
              <th className="py-2">Value</th>
              <th className="py-2">Mode</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {category.tokens.map((token) => (
              <tr key={token.path} className="border-b border-[var(--line)] align-top">
                <td className="py-2 font-mono text-xs">{token.path}</td>
                <td className="py-2">{token.type}</td>
                <td className="py-2 font-mono text-xs">{JSON.stringify(token.value)}</td>
                <td className="py-2">{token.hasMode ? 'light/dark' : '—'}</td>
                <td className="py-2">
                  <div className="flex gap-2">
                    <button
                      className="rounded border border-[var(--line)] px-2 py-1"
                      type="button"
                      onClick={() => setEditing(token)}
                    >
                      Edit
                    </button>
                    <button
                      className="rounded border border-red-300 px-2 py-1 text-red-700"
                      type="button"
                      onClick={() => {
                        const nextDocument = deleteToken(category.document, token.path);
                        setCategory((current) =>
                          current
                            ? {
                                ...current,
                                document: nextDocument,
                                tokens: current.tokens.filter((entry) => entry.path !== token.path),
                              }
                            : current
                        );
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
