import * as React from 'react';

interface ChangeLogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'error';
  message: string;
}

interface ChangesContextValue {
  log: ChangeLogEntry[];
  add: (entry: Omit<ChangeLogEntry, 'id' | 'timestamp'>) => void;
  clear: () => void;
}

const ChangesContext = React.createContext<ChangesContextValue | null>(null);

export function ChangesProvider({ children }: { children: React.ReactNode }) {
  const [log, setLog] = React.useState<ChangeLogEntry[]>([]);

  const add = (entry: Omit<ChangeLogEntry, 'id' | 'timestamp'>) => {
    setLog((current) => [
      {
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        ...entry,
      },
      ...current,
    ]);
  };

  const clear = () => setLog([]);

  return <ChangesContext.Provider value={{ log, add, clear }}>{children}</ChangesContext.Provider>;
}

export function useChanges(): ChangesContextValue {
  const context = React.useContext(ChangesContext);
  if (!context) {
    throw new Error('useChanges must be used inside ChangesProvider');
  }
  return context;
}

export function ChangesPage() {
  const { log, clear } = useChanges();

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl">Recent Changes</h2>
        <button
          className="rounded border border-[var(--line)] px-3 py-2"
          type="button"
          onClick={clear}
        >
          Clear
        </button>
      </div>

      {log.length === 0 ? <p className="text-sm opacity-75">No changes captured yet.</p> : null}

      <ul className="space-y-2">
        {log.map((entry) => (
          <li
            key={entry.id}
            className={`rounded border p-3 text-sm ${
              entry.level === 'error' ? 'border-red-300 bg-red-50' : 'border-[var(--line)] bg-white'
            }`}
          >
            <p className="font-medium">{entry.message}</p>
            <p className="opacity-70">{entry.timestamp}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
