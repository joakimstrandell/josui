import type {
  CategoryDocument,
  CategorySummary,
  CreateCategoryRequest,
  SaveCategoryRequest,
  ValidateRequest,
  ValidationResult,
} from '../../shared/types';

async function request<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const response = await fetch(input, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => ({}))) as { error?: string };
    throw new Error(payload.error ?? `Request failed (${response.status})`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export async function getCategories(): Promise<CategorySummary[]> {
  const payload = await request<{ categories: CategorySummary[] }>('/api/categories');
  return payload.categories;
}

export async function getCategory(name: string): Promise<CategoryDocument> {
  return request<CategoryDocument>(`/api/categories/${name}`);
}

export async function createCategory(payload: CreateCategoryRequest): Promise<CategoryDocument> {
  return request<CategoryDocument>('/api/categories', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function saveCategory(
  name: string,
  payload: SaveCategoryRequest
): Promise<CategoryDocument> {
  return request<CategoryDocument>(`/api/categories/${name}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export async function deleteCategory(name: string): Promise<void> {
  await request<void>(`/api/categories/${name}`, {
    method: 'DELETE',
  });
}

export async function validateCategory(payload: ValidateRequest): Promise<ValidationResult> {
  return request<ValidationResult>('/api/validate', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function getHealth(): Promise<{ tokensDir: string; terrazzoPath: string }> {
  return request<{ status: string; tokensDir: string; terrazzoPath: string }>('/api/health');
}
