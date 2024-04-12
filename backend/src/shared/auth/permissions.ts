import type { UserRole } from '../store/in-memory-db';

export type Permission =
  | 'auth.login'
  | 'auth.me'
  | 'auth.refresh'
  | 'auth.logout'
  | 'tenant.read'
  | 'tenant.create'
  | 'tenant.update'
  | 'user.read'
  | 'user.create'
  | 'user.update'
  | 'customer.read'
  | 'customer.create'
  | 'customer.update'
  | 'vehicle.read'
  | 'vehicle.create'
  | 'vehicle.update'
  | 'job.read'
  | 'job.create'
  | 'job.update'
  | 'quote.read'
  | 'quote.create'
  | 'quote.update'
  | 'invoice.read'
  | 'invoice.create'
  | 'payment.record'
  | 'collection.update'
  | 'dashboard.read';

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  OWNER: [
    'auth.login', 'auth.me', 'auth.refresh', 'auth.logout',
    'tenant.read', 'tenant.create', 'tenant.update',
    'user.read', 'user.create', 'user.update',
    'customer.read', 'customer.create', 'customer.update',
    'vehicle.read', 'vehicle.create', 'vehicle.update',
    'job.read', 'job.create', 'job.update',
    'quote.read', 'quote.create', 'quote.update',
    'invoice.read', 'invoice.create', 'payment.record', 'collection.update', 'dashboard.read',
  ],
  ADMIN: [
    'auth.login', 'auth.me', 'auth.refresh', 'auth.logout',
    'tenant.read', 'tenant.update',
    'user.read', 'user.create', 'user.update',
    'customer.read', 'customer.create', 'customer.update',
    'vehicle.read', 'vehicle.create', 'vehicle.update',
    'job.read', 'job.create', 'job.update',
    'quote.read', 'quote.create', 'quote.update',
    'invoice.read', 'invoice.create', 'payment.record', 'collection.update', 'dashboard.read',
  ],
  ADVISOR: [
    'auth.login', 'auth.me', 'auth.refresh', 'auth.logout',
    'tenant.read', 'user.read',
    'customer.read', 'customer.create', 'customer.update',
    'vehicle.read', 'vehicle.create', 'vehicle.update',
    'job.read', 'job.create', 'job.update',
    'quote.read', 'quote.create', 'quote.update',
    'invoice.read', 'invoice.create', 'payment.record', 'collection.update', 'dashboard.read',
  ],
  MECHANIC: [
    'auth.login', 'auth.me', 'auth.refresh', 'auth.logout',
    'customer.read', 'vehicle.read', 'job.read', 'job.update', 'quote.read',
  ],
  CASHIER: [
    'auth.login', 'auth.me', 'auth.refresh', 'auth.logout',
    'customer.read', 'vehicle.read', 'job.read', 'invoice.read', 'payment.record', 'collection.update',
  ],
  SUPPLIER_ADMIN: [
    'auth.login', 'auth.me', 'auth.refresh', 'auth.logout',
    'tenant.read', 'tenant.update', 'user.read', 'user.create', 'user.update', 'dashboard.read',
  ],
  SUPPLIER_SALES: ['auth.login', 'auth.me', 'auth.refresh', 'auth.logout', 'user.read', 'dashboard.read'],
  SUPPLIER_WAREHOUSE: ['auth.login', 'auth.me', 'auth.refresh', 'auth.logout', 'user.read'],
  POS_OPERATOR: ['auth.login', 'auth.me', 'auth.refresh', 'auth.logout', 'payment.record'],
};

export function getRolePermissions(role: UserRole): Permission[] {
  return ROLE_PERMISSIONS[role] ?? [];
}

export function hasPermission(role: UserRole, permission: Permission): boolean {
  return getRolePermissions(role).includes(permission);
}
