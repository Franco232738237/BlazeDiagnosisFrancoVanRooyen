'use client';

import { useMemo, useState } from 'react';
import { FormActions } from '../../../components/forms/FormActions';
import { FormField } from '../../../components/forms/FormField';
import { useAuth } from '../hooks/useAuth';
import { authApi } from '../api/auth.api';

function isValidEmail(value: string): boolean {
  return value.includes('@') && value.includes('.');
}

export function AuthPanel() {
  const { session, error, isAuthenticated, isLoading, isBootstrapping, login, logout } = useAuth();
  const [mode, setMode] = useState<'login' | 'forgot' | 'reset'>('login');
  const [email, setEmail] = useState('admin@demo-workshop.local');
  const [password, setPassword] = useState('demo1234');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('newPassword123');
  const [statusMessage, setStatusMessage] = useState<string | undefined>(undefined);
  const [localError, setLocalError] = useState<string | undefined>(undefined);

  const canSubmitLogin = useMemo(() => isValidEmail(email) && password.trim().length >= 8, [email, password]);
  const canSubmitForgot = useMemo(() => isValidEmail(email), [email]);
  const canSubmitReset = useMemo(() => resetToken.trim().length > 10 && newPassword.trim().length >= 8, [resetToken, newPassword]);

  async function handleLogin(event?: React.FormEvent) {
    event?.preventDefault();
    setStatusMessage(undefined);
    setLocalError(undefined);
    if (!canSubmitLogin) {
      setLocalError('Enter a valid email and a password with at least 8 characters.');
      return;
    }
    await login({ email, password });
    setStatusMessage('Login successful.');
  }

  async function handleForgotPassword(event?: React.FormEvent) {
    event?.preventDefault();
    setStatusMessage(undefined);
    setLocalError(undefined);
    if (!canSubmitForgot) {
      setLocalError('Enter a valid email address.');
      return;
    }
    const response = await authApi.forgotPassword(email);
    setStatusMessage(response.userExists
      ? `Reset token generated for demo use. Paste it below to test reset. Token: ${response.resetToken}`
      : response.message);
    if (response.resetToken) {
      setResetToken(response.resetToken);
      setMode('reset');
    }
  }

  async function handleResetPassword(event?: React.FormEvent) {
    event?.preventDefault();
    setStatusMessage(undefined);
    setLocalError(undefined);
    if (!canSubmitReset) {
      setLocalError('Paste a valid reset token and use a new password with at least 8 characters.');
      return;
    }
    const response = await authApi.resetPassword({ token: resetToken, newPassword });
    setStatusMessage(response.message);
    setPassword(newPassword);
    setMode('login');
  }

  if (isBootstrapping) {
    return <div style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 16, maxWidth: 520 }}>Loading auth session…</div>;
  }

  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 16, maxWidth: 520, display: 'grid', gap: 12 }}>
      <div>
        <h2>Authentication</h2>
        <p>Complete starter auth flow with login, protected user hydration, forgot password, reset password, and logout.</p>
      </div>

      {isAuthenticated ? (
        <div style={{ display: 'grid', gap: 8 }}>
          <div><strong>Signed in as:</strong> {session?.user?.fullName}</div>
          <div><strong>Email:</strong> {session?.user?.email}</div>
          <div><strong>Role:</strong> {session?.user?.role}</div>
          <div><strong>Tenant:</strong> {session?.user?.tenant?.name || session?.user?.tenantId}</div>
          <div><strong>Last login:</strong> {session?.user?.lastLoginAt || 'Current session'}</div>
          <FormActions>
            <button type="button" onClick={() => void logout()} disabled={isLoading}>Log out</button>
          </FormActions>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button type="button" onClick={() => setMode('login')}>Login</button>
            <button type="button" onClick={() => setMode('forgot')}>Forgot password</button>
            <button type="button" onClick={() => setMode('reset')}>Reset password</button>
          </div>

          <form onSubmit={(event) => {
            if (mode === 'login') return void handleLogin(event);
            if (mode === 'forgot') return void handleForgotPassword(event);
            return void handleResetPassword(event);
          }} style={{ display: 'grid', gap: 12 }}>
            <FormField label="Email" name="email">
              <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
            </FormField>

            {mode === 'login' && (
              <FormField label="Password" name="password">
                <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" />
              </FormField>
            )}

            {mode === 'reset' && (
              <>
                <FormField label="Reset token" name="resetToken">
                  <textarea id="resetToken" value={resetToken} onChange={(event) => setResetToken(event.target.value)} rows={5} />
                </FormField>
                <FormField label="New password" name="newPassword">
                  <input id="newPassword" type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} placeholder="At least 8 characters" />
                </FormField>
              </>
            )}

            <FormActions>
              {mode === 'login' && <button type="submit" disabled={isLoading || !canSubmitLogin}>Sign in</button>}
              {mode === 'forgot' && <button type="submit" disabled={isLoading || !canSubmitForgot}>Generate reset token</button>}
              {mode === 'reset' && <button type="submit" disabled={isLoading || !canSubmitReset}>Update password</button>}
            </FormActions>
          </form>
        </>
      )}

      {statusMessage ? <div style={{ padding: 12, background: '#f0fdf4', borderRadius: 8 }}>{statusMessage}</div> : null}
      {localError ? <div style={{ padding: 12, background: '#fef2f2', borderRadius: 8 }}>{localError}</div> : null}
      {error ? <div style={{ padding: 12, background: '#fef2f2', borderRadius: 8 }}>{error}</div> : null}
    </div>
  );
}
