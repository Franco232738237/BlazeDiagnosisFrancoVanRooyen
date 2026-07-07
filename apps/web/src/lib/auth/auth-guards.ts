import { requireTenantContext as tenantContext } from '@/lib/tenancy/tenantContext';

export const requireTenantContext = tenantContext;

export { requireTenantPermission } from '@/lib/authorization/guards';