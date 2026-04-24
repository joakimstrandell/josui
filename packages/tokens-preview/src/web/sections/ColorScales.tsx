import type { TokenGroup } from "../lib/groupTokens.ts";
import { Swatch } from "./Swatch.tsx";

export function ColorScales({ group }: { group: TokenGroup }) {
  if (group.scales.length === 0 && group.singles.length === 0) return null;

  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-lg font-medium">Colors</h2>

      {group.scales.map((scale) => (
        <div key={scale.name} className="flex flex-col gap-2">
          <h3 className="text-sm tp-muted">{scale.name}</h3>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] gap-3">
            {scale.steps.map(({ token }) => (
              <Swatch key={token.name} token={token} />
            ))}
          </div>
        </div>
      ))}

      {group.singles.length > 0 && (
        <div className="flex flex-col gap-2">
          <h3 className="text-sm tp-muted">Semantic</h3>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-3">
            {group.singles.map((token) => (
              <Swatch key={token.name} token={token} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
