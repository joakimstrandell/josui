import type { RawToken } from "./readTokens.ts";

export type Category =
  | "color"
  | "typography"
  | "spacing"
  | "radius"
  | "shadow"
  | "motion"
  | "zIndex"
  | "breakpoint"
  | "other";

export interface ScaleToken {
  step: string; // "50", "500", "950" or "default"
  token: RawToken;
}

export interface Scale {
  name: string; // e.g. "color-primary"
  steps: ScaleToken[];
}

export interface TokenGroup {
  category: Category;
  scales: Scale[]; // multi-step families (color-primary, spacing)
  singles: RawToken[]; // standalone tokens (font-sans, radius-default)
}

const PREFIX_MAP: Array<{ prefix: string; category: Category }> = [
  { prefix: "color", category: "color" },
  { prefix: "text", category: "typography" },
  { prefix: "font", category: "typography" },
  { prefix: "tracking", category: "typography" },
  { prefix: "spacing", category: "spacing" },
  { prefix: "radius", category: "radius" },
  { prefix: "drop-shadow", category: "shadow" },
  { prefix: "shadow", category: "shadow" },
  { prefix: "duration", category: "motion" },
  { prefix: "ease", category: "motion" },
  { prefix: "linear", category: "motion" },
  { prefix: "z", category: "zIndex" },
  { prefix: "breakpoint", category: "breakpoint" },
];

const STEP_SUFFIX = /-(\d+(?:-\d+)?|px|default|none|full)$/;

function categoryFor(name: string): { category: Category; family: string; step: string | null } {
  const raw = name.replace(/^--/, "");
  for (const { prefix, category } of PREFIX_MAP) {
    if (raw !== prefix && !raw.startsWith(`${prefix}-`)) continue;

    const match = raw.match(STEP_SUFFIX);
    if (match) {
      const step = match[1];
      const familyRaw = raw.slice(0, raw.length - match[0].length);
      const family = familyRaw || prefix;
      return { category, family, step };
    }
    return { category, family: raw, step: null };
  }
  return { category: "other", family: raw, step: null };
}

export function groupTokens(tokens: RawToken[]): Map<Category, TokenGroup> {
  const buckets = new Map<Category, Map<string, Scale>>();
  const singles = new Map<Category, RawToken[]>();
  const groupedByCategory = new Map<Category, TokenGroup>();

  for (const token of tokens) {
    const { category, family, step } = categoryFor(token.name);
    if (step !== null) {
      const scaleMap = buckets.get(category) ?? new Map<string, Scale>();
      buckets.set(category, scaleMap);
      const scale = scaleMap.get(family) ?? { name: family, steps: [] };
      scale.steps.push({ step, token });
      scaleMap.set(family, scale);
    } else {
      const list = singles.get(category) ?? [];
      list.push(token);
      singles.set(category, list);
    }
  }

  const categories = new Set<Category>([...buckets.keys(), ...singles.keys()]);
  for (const category of categories) {
    const scales = Array.from(buckets.get(category)?.values() ?? []).map((s) => ({
      ...s,
      steps: s.steps.sort(compareSteps),
    }));
    scales.sort((a, b) => a.name.localeCompare(b.name));
    groupedByCategory.set(category, {
      category,
      scales,
      singles: (singles.get(category) ?? []).sort((a, b) => a.name.localeCompare(b.name)),
    });
  }

  return groupedByCategory;
}

function compareSteps(a: ScaleToken, b: ScaleToken): number {
  const an = stepOrder(a.step);
  const bn = stepOrder(b.step);
  if (an !== null && bn !== null) return an - bn;
  if (an !== null) return -1;
  if (bn !== null) return 1;
  return a.step.localeCompare(b.step);
}

function stepOrder(step: string): number | null {
  if (step === "px") return 0;
  if (step === "none") return -1;
  if (step === "default") return 0.5;
  if (step === "full") return Number.POSITIVE_INFINITY;
  const compound = step.match(/^(\d+)-(\d+)$/);
  if (compound) return Number(compound[1]) + Number(compound[2]) / 10;
  const num = Number(step);
  return Number.isNaN(num) ? null : num;
}
