import * as React from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import type { SupportedTokenType } from '../../shared/types';
import { createCategory, getCategories } from '../lib/api';
import { useChanges } from './changes';

export function CategoriesPage() {
  const navigate = useNavigate();
  const { add } = useChanges();
  const [categories, setCategories] = React.useState<Array<{ name: string; fileName: string }>>([]);
  const [name, setName] = React.useState('');
  const [type, setType] = React.useState<SupportedTokenType>('color');
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const load = React.useCallback(async () => {
    const result = await getCategories();
    setCategories(result);
  }, []);

  React.useEffect(() => {
    load().catch((reason: Error) => {
      setError(reason.message);
    });
  }, [load]);

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl">Token Categories</h2>
        <p className="text-sm opacity-75">Create and manage DTCG category files.</p>
      </div>

      <form
        className="grid gap-3 rounded-xl border border-[var(--line)] bg-white p-3 md:grid-cols-[1fr_auto_auto]"
        onSubmit={async (event) => {
          event.preventDefault();
          setLoading(true);
          setError(null);
          try {
            const created = await createCategory({
              name,
              type,
            });
            add({ level: 'info', message: `Created category ${created.name}` });
            setName('');
            await load();
            await navigate({ to: '/categories/$name', params: { name: created.name } });
          } catch (reason) {
            setError((reason as Error).message);
          } finally {
            setLoading(false);
          }
        }}
      >
        <input
          className="rounded border border-[var(--line)] p-2"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="animation"
          required
        />
        <select
          className="rounded border border-[var(--line)] p-2"
          value={type}
          onChange={(event) => setType(event.target.value as SupportedTokenType)}
        >
          <option value="color">color</option>
          <option value="dimension">dimension</option>
          <option value="duration">duration</option>
          <option value="cubicBezier">cubicBezier</option>
          <option value="fontFamily">fontFamily</option>
          <option value="number">number</option>
          <option value="string">string</option>
        </select>
        <button
          className="rounded bg-[var(--accent)] px-3 py-2 text-white disabled:opacity-60"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create'}
        </button>
      </form>

      {error ? (
        <p className="rounded border border-red-300 bg-red-50 p-3 text-sm">{error}</p>
      ) : null}

      <ul className="grid gap-2 sm:grid-cols-2">
        {categories.map((category) => (
          <li key={category.name}>
            <Link
              to="/categories/$name"
              params={{ name: category.name }}
              className="block rounded border border-[var(--line)] bg-white p-3 hover:border-[var(--accent)]"
            >
              <p className="font-medium">{category.name}</p>
              <p className="font-mono text-xs opacity-70">{category.fileName}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
