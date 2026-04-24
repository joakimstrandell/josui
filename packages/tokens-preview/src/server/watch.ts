import chokidar, { type FSWatcher } from "chokidar";

export type ChangeListener = () => void;

export function watchFile(inputPath: string): {
  subscribe: (listener: ChangeListener) => () => void;
  close: () => Promise<void>;
} {
  const listeners = new Set<ChangeListener>();
  const watcher: FSWatcher = chokidar.watch(inputPath, {
    ignoreInitial: true,
    awaitWriteFinish: { stabilityThreshold: 50, pollInterval: 20 },
  });

  const emit = (): void => {
    for (const listener of listeners) {
      listener();
    }
  };

  watcher.on("change", emit);
  watcher.on("add", emit);

  return {
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    async close() {
      listeners.clear();
      await watcher.close();
    },
  };
}
