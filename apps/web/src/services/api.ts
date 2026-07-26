const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api';

export type ApiEnvelope<T, M = never> = {
  data: T;
  meta: M;
};

export class ApiError extends Error {
  constructor(public readonly status: number, message: string, public readonly errors?: Array<{ field: string; message: string }>) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function apiRequest<T>(path: string, options: RequestInit = {}, token?: string) {
  const body = await request(path, options, token);
  return body.data as T;
}

export async function apiRequestEnvelope<T, M>(path: string, options: RequestInit = {}, token?: string) {
  const body = await request(path, options, token);
  return { data: body.data as T, meta: body.meta as M };
}

async function request(path: string, options: RequestInit, token?: string) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  if (response.status === 204) return { data: undefined };
  const body = await response.json();
  if (!response.ok) throw new ApiError(response.status, body.message ?? 'Request gagal.', body.errors);
  return body;
}
