import * as React from 'react';
import { getHealth } from '../lib/api';

export function SettingsPage() {
  const [health, setHealth] = React.useState<{ tokensDir: string; terrazzoPath: string } | null>(
    null
  );
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    getHealth()
      .then((value) => {
        setHealth(value);
        setError(null);
      })
      .catch((reason: Error) => {
        setError(reason.message);
      });
  }, []);

  return (
    <section className="space-y-3">
      <h2 className="text-xl">Settings</h2>
      <p className="text-sm opacity-75">Runtime paths for this local editor session.</p>

      {error ? (
        <p className="rounded border border-red-300 bg-red-50 p-3 text-sm">{error}</p>
      ) : null}

      {health ? (
        <dl className="grid gap-2 rounded border border-[var(--line)] bg-white p-3 text-sm">
          <div>
            <dt className="font-semibold">Tokens directory</dt>
            <dd className="font-mono text-xs">{health.tokensDir}</dd>
          </div>
          <div>
            <dt className="font-semibold">Terrazzo config</dt>
            <dd className="font-mono text-xs">{health.terrazzoPath}</dd>
          </div>
        </dl>
      ) : (
        <p className="text-sm">Loading server settings...</p>
      )}
    </section>
  );
}
