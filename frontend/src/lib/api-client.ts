interface WrappedApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export async function apiClient<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(path, options);
  let payload: WrappedApiResponse<T> | T | undefined;

  try {
    payload = (await response.json()) as WrappedApiResponse<T> | T;
  } catch {
    payload = undefined;
  }

  if (!response.ok) {
    if (payload && typeof payload === 'object' && 'error' in payload && typeof payload.error === 'string') {
      throw new Error(payload.error);
    }
    throw new Error(`API error: ${response.status}`);
  }

  if (payload && typeof payload === 'object' && 'success' in payload) {
    const typed = payload as WrappedApiResponse<T>;
    if (!typed.success) {
      throw new Error(typed.error || 'Request failed.');
    }
    return typed.data as T;
  }

  return payload as T;
}
