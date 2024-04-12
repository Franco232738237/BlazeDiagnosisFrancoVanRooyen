export interface LoginDto {
  email: string;
  password: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  token: string;
  newPassword: string;
}

export interface RefreshTokenDto {
  refreshToken: string;
}

export interface LoginUserDto {
  id: string;
  tenantId: string;
  branchId?: string;
  fullName: string;
  email: string;
  role: string;
  isActive: boolean;
}

export interface LoginResponseDto {
  user: LoginUserDto;
  accessToken: string;
  refreshToken: string;
  expiresInSeconds: number;
}

export interface AuthSessionDto {
  id: string;
  userId: string;
  tenantId: string;
  refreshToken: string;
  createdAt: string;
  expiresAt: string;
}
