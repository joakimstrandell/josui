export type SupportedTokenType =
  | 'color'
  | 'dimension'
  | 'duration'
  | 'cubicBezier'
  | 'fontFamily'
  | 'number'
  | 'string';

export type TokenValueMode = 'literal' | 'reference';

export interface CategorySummary {
  name: string;
  fileName: string;
  path: string;
}

export interface TokenItem {
  path: string;
  type: SupportedTokenType;
  description?: string;
  value: unknown;
  hasMode: boolean;
  mode?: {
    light?: unknown;
    dark?: unknown;
  };
}

export interface CategoryDocument {
  name: string;
  document: Record<string, unknown>;
  tokens: TokenItem[];
}

export interface CreateCategoryRequest {
  name: string;
  type: SupportedTokenType;
}

export interface SaveCategoryRequest {
  document: Record<string, unknown>;
}

export interface ValidateRequest {
  name: string;
  document: Record<string, unknown>;
}

export interface ValidationIssue {
  path: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  issues: ValidationIssue[];
}
