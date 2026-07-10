import { ok } from '../../../shared/utils/response';
import { requireAuth } from '../../../shared/middleware/auth';
import { AuthService } from '../services/auth.service';
import {
  validateForgotPasswordInput,
  validateLoginInput,
  validateRefreshTokenInput,
  validateResetPasswordInput,
} from '../validators/auth.validator';

export class AuthController {
  constructor(private readonly service = new AuthService()) {}

  login(payload: unknown) {
    return ok(this.service.login(validateLoginInput(payload)));
  }

  me(authorizationHeader?: string) {
    const auth = requireAuth(authorizationHeader);
    return ok(this.service.me(auth.userId));
  }

  refresh(payload: unknown) {
    return ok(this.service.refresh(validateRefreshTokenInput(payload)));
  }

  logout(payload: unknown) {
    const refreshToken = validateRefreshTokenInput(payload).refreshToken;
    return ok(this.service.logout(refreshToken));
  }

  forgotPassword(payload: unknown) {
    return ok(this.service.forgotPassword(validateForgotPasswordInput(payload)));
  }

  resetPassword(payload: unknown) {
    return ok(this.service.resetPassword(validateResetPasswordInput(payload)));
  }
}
