export interface RawToken {
  name: string;
  value: string;
  computed: string;
}

const SCOPE_CLASS = "tp-preview-scope";

export function readTokens(): RawToken[] {
  const names = new Set<string>();

  for (const sheet of Array.from(document.styleSheets)) {
    let rules: CSSRuleList;
    try {
      rules = sheet.cssRules;
    } catch {
      continue;
    }
    collectFromRules(rules, names);
  }

  const host = getScopeHost();
  const computedStyle = getComputedStyle(host);

  return Array.from(names)
    .sort()
    .map<RawToken>((name) => {
      const value = host.style.getPropertyValue(name) || readDeclaredValue(name);
      return {
        name,
        value: value.trim(),
        computed: computedStyle.getPropertyValue(name).trim(),
      };
    })
    .filter((t) => t.computed !== "");
}

function collectFromRules(rules: CSSRuleList, names: Set<string>): void {
  for (const rule of Array.from(rules)) {
    if (rule instanceof CSSStyleRule) {
      if (rule.selectorText.includes(SCOPE_CLASS)) {
        for (const name of Array.from(rule.style)) {
          if (name.startsWith("--")) {
            names.add(name);
          }
        }
      }
    } else if ("cssRules" in rule && rule.cssRules) {
      collectFromRules((rule as CSSGroupingRule).cssRules, names);
    }
  }
}

function readDeclaredValue(name: string): string {
  for (const sheet of Array.from(document.styleSheets)) {
    let rules: CSSRuleList;
    try {
      rules = sheet.cssRules;
    } catch {
      continue;
    }
    const found = findDeclaration(rules, name);
    if (found) return found;
  }
  return "";
}

function findDeclaration(rules: CSSRuleList, name: string): string | null {
  for (const rule of Array.from(rules)) {
    if (rule instanceof CSSStyleRule && rule.selectorText.includes(SCOPE_CLASS)) {
      const value = rule.style.getPropertyValue(name);
      if (value) return value;
    } else if ("cssRules" in rule && rule.cssRules) {
      const nested = findDeclaration((rule as CSSGroupingRule).cssRules, name);
      if (nested) return nested;
    }
  }
  return null;
}

function getScopeHost(): HTMLElement {
  const existing = document.querySelector<HTMLElement>(`.${SCOPE_CLASS}`);
  if (existing) return existing;
  const host = document.createElement("div");
  host.className = SCOPE_CLASS;
  host.style.display = "none";
  document.body.appendChild(host);
  return host;
}

export { SCOPE_CLASS };
