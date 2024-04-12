export interface User {
  id: string;
  tenantId: string;
  branchId?: string;
  fullName: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  lastLoginAt?: string;
}
