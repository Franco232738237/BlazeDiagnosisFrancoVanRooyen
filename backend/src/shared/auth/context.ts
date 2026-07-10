import type { Permission } from './permissions';
import type { TenantType, UserRole } from '../store/in-memory-db';

export interface AuthContext {
  userId: string;
  tenantId: string;
  email: string;
  role: UserRole;
  permissions: Permission[];
  branchId?: string;
  tenantType?: TenantType;
}
