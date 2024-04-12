import type { AuthSessionState, LoginResponse } from '../types/auth.types';

const AUTH_STORAGE_KEY = 'vehicle-service-platform.auth';

export function createSessionState(input: LoginResponse): AuthSessionState {
  return {
    user: input.user,
    accessToken: input.accessToken,
    refreshToken: input.refreshToken,
    expiresAt: Date.now() + input.expiresInSeconds * 1000,
  };
}

export function saveAuthSession(session: AuthSessionState): void {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
}

export function loadAuthSession(): AuthSessionState | undefined {
  if (typeof window === 'undefined') {
    return undefined;
  }

  const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) {
    return undefined;
  }

  try {
    return JSON.parse(raw) as AuthSessionState;
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return undefined;
  }
}

export function clearAuthSession(): void {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}
