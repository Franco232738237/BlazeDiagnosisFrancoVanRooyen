export interface LoginPayload {
  email: string;
  password: string;
}

export interface RefreshPayload {
  refreshToken: string;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

export interface AuthTenant {
  id: string;
  name: string;
  slug: string;
  type: string;
  isActive: boolean;
}

export interface AuthUser {
  id: string;
  tenantId: string;
  branchId?: string;
  fullName: string;
  email: string;
  role: string;
  isActive: boolean;
  tenant?: AuthTenant;
  createdAt?: string;
  updatedAt?: string;
  lastLoginAt?: string;
}

export interface LoginResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
  expiresInSeconds: number;
}

export interface ForgotPasswordResponse {
  email: string;
  userExists: boolean;
  message: string;
  resetToken?: string;
  expiresAt?: string;
}

export interface LogoutResponse {
  revoked: boolean;
  message: string;
}

export interface AuthSessionState {
  user?: AuthUser;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: number;
}
