import { useTokens } from "./lib/useTokens.ts";
import { SCOPE_CLASS } from "./lib/readTokens.ts";
import { ColorScales } from "./sections/ColorScales.tsx";
import { Typography } from "./sections/Typography.tsx";
import { Spacing } from "./sections/Spacing.tsx";

export function TokensPreview() {
  const { groups, tokens, version } = useTokens();

  const color = groups.get("color");
  const typography = groups.get("typography");
  const spacing = groups.get("spacing");

  return (
    <div className={`${SCOPE_CLASS} flex min-h-screen flex-col`}>
      <header
        className="flex items-baseline justify-between border-b px-6 py-4"
        style={{ borderColor: "var(--tp-border)" }}
      >
        <h1 className="text-base font-medium">Tokens Preview</h1>
        <div className="tp-muted text-[11px]">
          {tokens.length} tokens · v{version}
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 p-6">
        {color && <ColorScales group={color} />}
        {typography && <Typography group={typography} />}
        {spacing && <Spacing group={spacing} />}
        {tokens.length === 0 && (
          <p className="tp-muted">No tokens found. Check the --input path.</p>
        )}
      </main>
    </div>
  );
}
