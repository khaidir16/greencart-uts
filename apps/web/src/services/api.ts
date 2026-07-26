const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api';

export class ApiError extends Error {
  constructor(public readonly status: number, message: string, public readonly errors?: Array<{ field: string; message: string }>) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function apiRequest<T>(path: string, options: RequestInit = {}, token?: string) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  if (response.status === 204) return undefined as T;
  const body = await response.json();
  if (!response.ok) throw new ApiError(response.status, body.message ?? 'Request gagal.', body.errors);
  return body.data as T;
}
