import type { AuthContext } from '../auth/context';
import type { Permission } from '../auth/permissions';

export function requirePermission(context: AuthContext, permission: Permission): AuthContext {
  if (!context.permissions.includes(permission)) {
    throw new Error(`Permission denied. Missing permission: ${permission}.`);
  }
  return context;
}

export function requireAnyPermission(context: AuthContext, permissions: Permission[]): AuthContext {
  const allowed = permissions.some((permission) => context.permissions.includes(permission));
  if (!allowed) {
    throw new Error(`Permission denied. Requires one of: ${permissions.join(', ')}.`);
  }
  return context;
}
