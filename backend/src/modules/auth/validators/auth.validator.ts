import { assertEmail, assertRequiredString, isObject } from '../../../shared/utils/validation';
import type { ForgotPasswordDto, LoginDto, RefreshTokenDto, ResetPasswordDto } from '../dto/auth.dto';

function assertMinLength(value: string, fieldName: string, minLength: number): string {
  if (value.trim().length < minLength) {
    throw new Error(`${fieldName} must be at least ${minLength} characters.`);
  }

  return value.trim();
}

export function validateLoginInput(input: unknown): LoginDto {
  if (!isObject(input)) {
    throw new Error('Login payload is required.');
  }

  return {
    email: assertEmail(input.email, 'email'),
    password: assertRequiredString(input.password, 'password'),
  };
}

export function validateForgotPasswordInput(input: unknown): ForgotPasswordDto {
  if (!isObject(input)) {
    throw new Error('Forgot password payload is required.');
  }

  return {
    email: assertEmail(input.email, 'email'),
  };
}

export function validateResetPasswordInput(input: unknown): ResetPasswordDto {
  if (!isObject(input)) {
    throw new Error('Reset password payload is required.');
  }

  return {
    token: assertRequiredString(input.token, 'token'),
    newPassword: assertMinLength(assertRequiredString(input.newPassword, 'newPassword'), 'newPassword', 8),
  };
}

export function validateRefreshTokenInput(input: unknown): RefreshTokenDto {
  if (!isObject(input)) {
    throw new Error('Refresh token payload is required.');
  }

  return {
    refreshToken: assertRequiredString(input.refreshToken, 'refreshToken'),
  };
}
