const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

function buildHeaders(): HeadersInit {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const token = localStorage.getItem('embryo_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (response.status === 204) return undefined as T;
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body?.error?.message ?? `Error ${response.status}`);
  }
  return body as T;
}

export async function httpGet<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: buildHeaders(),
  });
  return handleResponse<T>(response);
}

export async function httpPost<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: buildHeaders(),
    body: JSON.stringify(body),
  });
  return handleResponse<T>(response);
}

export async function httpPatch<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    method: 'PATCH',
    headers: buildHeaders(),
    body: JSON.stringify(body),
  });
  return handleResponse<T>(response);
}
