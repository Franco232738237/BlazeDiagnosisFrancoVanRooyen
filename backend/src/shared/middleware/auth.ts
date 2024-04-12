import type { AuthContext } from '../auth/context';
import { getRolePermissions } from '../auth/permissions';
import { verifyToken } from '../auth/token';

export function getBearerToken(authorizationHeader?: string): string {
  if (!authorizationHeader) {
    throw new Error('Authorization header is required.');
  }

  const [scheme, token] = authorizationHeader.split(' ');
  if (scheme !== 'Bearer' || !token) {
    throw new Error('Authorization header must use Bearer token format.');
  }

  return token;
}

export function requireAuth(authorizationHeader?: string): AuthContext {
  const token = getBearerToken(authorizationHeader);
  const payload = verifyToken(token);
  if (payload.type !== 'access') {
    throw new Error('Access token is required.');
  }

  return {
    userId: payload.sub,
    tenantId: payload.tenantId,
    email: payload.email,
    role: payload.role,
    permissions: getRolePermissions(payload.role),
    branchId: payload.branchId,
    tenantType: payload.tenantType,
  };
}
