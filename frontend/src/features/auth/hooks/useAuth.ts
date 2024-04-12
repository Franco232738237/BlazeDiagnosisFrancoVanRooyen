'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { authApi } from '../api/auth.api';
import type { AuthSessionState, LoginPayload } from '../types/auth.types';
import { clearAuthSession, createSessionState, loadAuthSession, saveAuthSession } from '../utils/auth-storage';

export function useAuth() {
  const [session, setSession] = useState<AuthSessionState | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  const applySession = useCallback((nextSession: AuthSessionState) => {
    saveAuthSession(nextSession);
    setSession(nextSession);
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    setError(undefined);
    try {
      if (session?.refreshToken) {
        await authApi.logout(session.refreshToken);
      }
    } catch (caughtError) {
      const message = caughtError instanceof Error ? caughtError.message : 'Unable to log out cleanly.';
      setError(message);
    } finally {
      clearAuthSession();
      setSession(undefined);
      setIsLoading(false);
    }
  }, [session?.refreshToken]);

  const refresh = useCallback(async () => {
    if (!session?.refreshToken) {
      return undefined;
    }

    const response = await authApi.refresh({ refreshToken: session.refreshToken });
    const nextSession = createSessionState(response);
    applySession(nextSession);
    return nextSession;
  }, [applySession, session?.refreshToken]);

  useEffect(() => {
    async function bootstrap() {
      const existing = loadAuthSession();
      if (!existing?.accessToken) {
        setIsBootstrapping(false);
        return;
      }

      try {
        let activeSession = existing;
        if (existing.expiresAt && existing.expiresAt <= Date.now() && existing.refreshToken) {
          const response = await authApi.refresh({ refreshToken: existing.refreshToken });
          activeSession = createSessionState(response);
          applySession(activeSession);
        } else {
          setSession(existing);
        }

        const me = await authApi.me(activeSession.accessToken as string);
        applySession({ ...activeSession, user: me });
      } catch {
        clearAuthSession();
        setSession(undefined);
      } finally {
        setIsBootstrapping(false);
      }
    }

    void bootstrap();
  }, [applySession]);

  async function login(payload: LoginPayload) {
    setIsLoading(true);
    setError(undefined);
    try {
      const response = await authApi.login(payload);
      const nextSession = createSessionState(response);
      applySession(nextSession);
      const me = await authApi.me(nextSession.accessToken as string);
      const hydratedSession = { ...nextSession, user: me };
      applySession(hydratedSession);
      return hydratedSession;
    } catch (caughtError) {
      const message = caughtError instanceof Error ? caughtError.message : 'Unable to log in.';
      setError(message);
      throw caughtError;
    } finally {
      setIsLoading(false);
    }
  }

  return useMemo(() => ({
    session,
    isLoading,
    isBootstrapping,
    error,
    isAuthenticated: Boolean(session?.accessToken),
    login,
    logout,
    refresh,
  }), [session, isLoading, isBootstrapping, error, logout, refresh]);
}
