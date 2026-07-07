import { db } from '@/db/client';
import { permissionAudits } from '@/db/schema/tenants';
import type { Permission } from '@/lib/constants/roles';

export interface TenantPermissionAuditPayload {
  tenantId: string;
  userId: string;
  resource: string;
  action: string;
  permission: Permission;
  result: 'allowed' | 'denied';
  reason: string;
  ipAddress?: string | null;
  userAgent?: string | null;
  metadata?: Record<string, unknown>;
}

export async function auditTenantPermissionCheck(
  payload: TenantPermissionAuditPayload,
) {
  try {
    await db.insert(permissionAudits).values({
      tenantId: payload.tenantId,
      userId: payload.userId,
      resource: payload.resource,
      action: payload.action,
      permission: payload.permission,
      result: payload.result,
      reason: payload.reason,
      ipAddress: payload.ipAddress ?? null,
      userAgent: payload.userAgent ?? null,
      metadata: payload.metadata ?? {},
    });
  } catch (error) {
    console.error('auditTenantPermissionCheck failed', error);
  }
}
