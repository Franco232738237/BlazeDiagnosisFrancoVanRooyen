import { apiClient } from '../../../lib/api-client';
import { endpoints } from '../../../services/endpoints';
import type {
  ForgotPasswordResponse,
  LoginPayload,
  LoginResponse,
  LogoutResponse,
  RefreshPayload,
  ResetPasswordPayload,
  AuthUser,
} from '../types/auth.types';

export const authApi = {
  login: (payload: LoginPayload) => apiClient<LoginResponse>(endpoints.auth.login, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }),
  me: (accessToken: string) => apiClient<AuthUser>(endpoints.auth.me, {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
  }),
  refresh: (payload: RefreshPayload) => apiClient<LoginResponse>(endpoints.auth.refresh, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }),
  logout: (refreshToken: string) => apiClient<LogoutResponse>(endpoints.auth.logout, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  }),
  forgotPassword: (email: string) => apiClient<ForgotPasswordResponse>(endpoints.auth.forgotPassword, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  }),
  resetPassword: (payload: ResetPasswordPayload) => apiClient<{ success: boolean; message: string }>(endpoints.auth.resetPassword, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }),
};
