import type {
  ForgotPasswordDto,
  LoginDto,
  LoginResponseDto,
  RefreshTokenDto,
  ResetPasswordDto,
} from '../dto/auth.dto';
import { AuthRepository } from '../repositories/auth.repository';
import { nextEntityId } from '../../../shared/store/in-memory-db';
import { hashPassword, verifyPassword } from '../../../shared/auth/password';
import { signToken, verifyToken } from '../../../shared/auth/token';
import { TenantsRepository } from '../../tenants/repositories/tenants.repository';

const ACCESS_TOKEN_TTL_MS = 1000 * 60 * 60;
const REFRESH_TOKEN_TTL_MS = 1000 * 60 * 60 * 24 * 14;
const RESET_TOKEN_TTL_MS = 1000 * 60 * 30;

export class AuthService {
  constructor(
    private readonly repository = new AuthRepository(),
    private readonly tenantsRepository = new TenantsRepository(),
  ) {}

  login(input: LoginDto): LoginResponseDto {
    const user = this.repository.findByEmail(input.email);

    if (!user || !verifyPassword(input.password, user.passwordHash)) {
      throw new Error('Invalid email or password.');
    }
    if (!user.isActive) {
      throw new Error('This user account is inactive.');
    }

    const tenant = this.tenantsRepository.findById(user.tenantId);
    if (!tenant || !tenant.isActive) {
      throw new Error('This tenant account is inactive.');
    }

    this.repository.touchLastLogin(user.id);
    return this.createLoginResponse(user.id);
  }

  me(userId: string) {
    const user = this.repository.findById(userId);
    if (!user) {
      throw new Error('Authenticated user not found.');
    }

    const tenant = this.tenantsRepository.findById(user.tenantId);

    return {
      id: user.id,
      tenantId: user.tenantId,
      branchId: user.branchId,
      fullName: user.fullName,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      title: user.title,
      role: user.role,
      status: user.status,
      isActive: user.isActive,
      lastLoginAt: user.lastLoginAt?.toISOString(),
      preferences: user.preferences,
      tenant: tenant
        ? {
            id: tenant.id,
            name: tenant.name,
            slug: tenant.slug,
            type: tenant.type,
            isActive: tenant.isActive,
            settings: tenant.settings,
          }
        : undefined,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }

  refresh(input: RefreshTokenDto): LoginResponseDto {
    const session = this.repository.findSessionByRefreshToken(input.refreshToken);
    if (!session || session.expiresAt.getTime() <= Date.now() || session.revokedAt) {
      throw new Error('Refresh session is invalid or expired.');
    }

    const payload = verifyToken(session.refreshToken);
    if (payload.type !== 'refresh') {
      throw new Error('Refresh token is invalid.');
    }

    this.repository.revokeSessionByRefreshToken(input.refreshToken);
    return this.createLoginResponse(payload.sub);
  }

  logout(refreshToken: string) {
    const revoked = this.repository.revokeSessionByRefreshToken(refreshToken);
    return {
      revoked,
      message: revoked ? 'Session revoked successfully.' : 'Session was already inactive.',
    };
  }

  forgotPassword(input: ForgotPasswordDto) {
    const user = this.repository.findByEmail(input.email);

    if (!user) {
      return {
        email: input.email,
        userExists: false,
        message: 'If the account exists, a reset email would be queued here.',
      };
    }

    const expiresAt = new Date(Date.now() + RESET_TOKEN_TTL_MS);
    const token = signToken({
      sub: user.id,
      tenantId: user.tenantId,
      email: user.email,
      role: user.role,
      branchId: user.branchId,
      tenantType: this.tenantsRepository.findById(user.tenantId)?.type,
      type: 'reset',
      exp: expiresAt.getTime(),
    });

    this.repository.createPasswordReset({
      id: nextEntityId('pwdreset'),
      userId: user.id,
      tenantId: user.tenantId,
      token,
      createdAt: new Date(),
      expiresAt,
    });

    return {
      email: input.email,
      userExists: true,
      message: 'Password reset token created and email would be queued here.',
      resetToken: token,
      expiresAt: expiresAt.toISOString(),
    };
  }

  resetPassword(input: ResetPasswordDto) {
    const resetRecord = this.repository.findPasswordResetByToken(input.token);
    if (!resetRecord || resetRecord.expiresAt.getTime() <= Date.now()) {
      throw new Error('Reset token is invalid or expired.');
    }

    const payload = verifyToken(input.token);
    if (payload.type !== 'reset') {
      throw new Error('Reset token type is invalid.');
    }

    this.repository.updatePassword(payload.sub, hashPassword(input.newPassword));
    this.repository.markPasswordResetUsed(input.token);
    this.repository.revokeUserSessions(payload.sub);

    return {
      success: true,
      message: 'Password updated successfully.',
    };
  }

  private createLoginResponse(userId: string): LoginResponseDto {
    const user = this.repository.findById(userId);
    if (!user) {
      throw new Error('User not found.');
    }

    const tenant = this.tenantsRepository.findById(user.tenantId);
    const accessTokenExpiry = Date.now() + ACCESS_TOKEN_TTL_MS;
    const refreshTokenExpiry = new Date(Date.now() + REFRESH_TOKEN_TTL_MS);

    const accessToken = signToken({
      sub: user.id,
      tenantId: user.tenantId,
      email: user.email,
      role: user.role,
      branchId: user.branchId,
      tenantType: tenant?.type,
      type: 'access',
      exp: accessTokenExpiry,
    });

    const refreshToken = signToken({
      sub: user.id,
      tenantId: user.tenantId,
      email: user.email,
      role: user.role,
      branchId: user.branchId,
      tenantType: tenant?.type,
      type: 'refresh',
      exp: refreshTokenExpiry.getTime(),
    });

    this.repository.createSession({
      id: nextEntityId('session'),
      userId: user.id,
      tenantId: user.tenantId,
      refreshToken,
      createdAt: new Date(),
      expiresAt: refreshTokenExpiry,
    });

    return {
      user: {
        id: user.id,
        tenantId: user.tenantId,
        branchId: user.branchId,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      },
      accessToken,
      refreshToken,
      expiresInSeconds: Math.floor(ACCESS_TOKEN_TTL_MS / 1000),
    };
  }
}
