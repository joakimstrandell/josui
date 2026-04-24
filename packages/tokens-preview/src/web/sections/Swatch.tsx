import type { RawToken } from "../lib/readTokens.ts";

export function Swatch({ token }: { token: RawToken }) {
  return (
    <div className="flex flex-col gap-1">
      <div
        className="h-14 w-full rounded-md border"
        style={{
          background: `var(${token.name})`,
          borderColor: "var(--tp-border)",
        }}
      />
      <div className="flex flex-col text-[11px]">
        <code className="truncate">{token.name}</code>
        <code className="tp-muted truncate" title={token.computed}>
          {token.computed}
        </code>
      </div>
    </div>
  );
}
