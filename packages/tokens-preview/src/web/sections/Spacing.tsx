import type { TokenGroup } from "../lib/groupTokens.ts";

export function Spacing({ group }: { group: TokenGroup }) {
  if (group.scales.length === 0) return null;

  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-lg font-medium">Spacing</h2>
      {group.scales.map((scale) => (
        <div key={scale.name} className="flex flex-col gap-2">
          <h3 className="text-sm tp-muted">{scale.name}</h3>
          <ul className="flex flex-col gap-1">
            {scale.steps.map(({ step, token }) => (
              <li key={token.name} className="flex items-center gap-3 text-[11px]">
                <code className="w-16 shrink-0">{step}</code>
                <div
                  className="h-3 rounded-sm"
                  style={{
                    width: `var(${token.name})`,
                    background: "var(--tp-accent)",
                  }}
                />
                <code className="tp-muted">{token.computed}</code>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
