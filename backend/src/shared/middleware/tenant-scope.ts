import type { AuthContext } from '../auth/context';

export interface TenantScopeContext {
  tenantId: string;
  userId?: string;
}

export interface TenantScopedRecord {
  tenantId?: string;
}

export function enforceTenantScope(context: AuthContext, requestedTenantId?: string): TenantScopeContext {
  if (requestedTenantId && requestedTenantId !== context.tenantId) {
    throw new Error('Cross-tenant access denied.');
  }

  return {
    tenantId: context.tenantId,
    userId: context.userId,
  };
}

export function ensureRecordInTenant<T extends TenantScopedRecord>(context: AuthContext, record?: T): T {
  if (!record) {
    throw new Error('Record not found.');
  }
  if (record.tenantId && record.tenantId !== context.tenantId) {
    throw new Error('Cross-tenant record access denied.');
  }
  return record;
}

export function injectTenantScope<T extends Record<string, unknown>>(context: AuthContext, payload: T): T & { tenantId: string } {
  const requestedTenantId = payload.tenantId;
  if (typeof requestedTenantId === 'string' && requestedTenantId !== context.tenantId) {
    throw new Error('Payload tenantId does not match authenticated tenant.');
  }

  return {
    ...payload,
    tenantId: context.tenantId,
  };
}
