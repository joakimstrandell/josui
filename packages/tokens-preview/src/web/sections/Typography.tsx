import type { TokenGroup } from "../lib/groupTokens.ts";

const SPECIMEN = "The quick brown fox jumps over the lazy dog";

export function Typography({ group }: { group: TokenGroup }) {
  if (group.scales.length === 0 && group.singles.length === 0) return null;

  const fontTokens = group.singles.filter((t) => t.name.startsWith("--font"));
  const trackingTokens = group.singles.filter((t) => t.name.startsWith("--tracking"));
  const textScale = group.scales.find((s) => s.name.startsWith("text"));
  const otherScales = group.scales.filter((s) => s !== textScale);

  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-lg font-medium">Typography</h2>

      {fontTokens.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className="text-sm tp-muted">Font families</h3>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {fontTokens.map((token) => (
              <div key={token.name} className="tp-panel flex flex-col gap-2 p-4">
                <div className="flex items-baseline justify-between gap-4">
                  <code className="text-[11px]">{token.name}</code>
                </div>
                <div style={{ fontFamily: `var(${token.name})`, fontSize: 20 }}>{SPECIMEN}</div>
                <code className="tp-muted text-[11px] truncate" title={token.computed}>
                  {token.computed}
                </code>
              </div>
            ))}
          </div>
        </div>
      )}

      {textScale && (
        <div className="flex flex-col gap-3">
          <h3 className="text-sm tp-muted">{textScale.name}</h3>
          <div className="flex flex-col gap-3">
            {textScale.steps.map(({ step, token }) => (
              <div key={token.name} className="tp-panel flex flex-col gap-1 p-4">
                <div className="flex items-baseline justify-between gap-4">
                  <code className="text-[11px]">{token.name}</code>
                  <code className="tp-muted text-[11px]">{token.computed}</code>
                </div>
                <div style={{ fontSize: `var(${token.name})`, lineHeight: 1.2 }}>
                  {step} — {SPECIMEN}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {otherScales.map((scale) => (
        <div key={scale.name} className="flex flex-col gap-2">
          <h3 className="text-sm tp-muted">{scale.name}</h3>
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2">
            {scale.steps.map(({ token }) => (
              <li key={token.name} className="tp-panel flex justify-between p-3">
                <code className="text-[11px]">{token.name}</code>
                <code className="tp-muted text-[11px]">{token.computed}</code>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {trackingTokens.length > 0 && (
        <div className="flex flex-col gap-2">
          <h3 className="text-sm tp-muted">Tracking</h3>
          <ul className="flex flex-col gap-2">
            {trackingTokens.map((token) => (
              <li key={token.name} className="tp-panel p-3">
                <div className="flex items-baseline justify-between gap-4">
                  <code className="text-[11px]">{token.name}</code>
                  <code className="tp-muted text-[11px]">{token.computed}</code>
                </div>
                <div style={{ letterSpacing: `var(${token.name})` }}>{SPECIMEN}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
