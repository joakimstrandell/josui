const SCOPE_CLASS = "tp-preview-scope";

export function scopeTokensCss(source: string): string {
  let out = source;

  out = out.replace(/@theme\s*(?:[^{]*?)\s*\{/g, `.${SCOPE_CLASS} {`);

  out = out.replace(/:root(\.[a-zA-Z0-9_-]+)?(:not\([^)]+\))?/g, (_, cls, not) => {
    const suffix = [cls, not].filter(Boolean).join("");
    return `.${SCOPE_CLASS}${suffix}`;
  });

  return out;
}

export { SCOPE_CLASS };
