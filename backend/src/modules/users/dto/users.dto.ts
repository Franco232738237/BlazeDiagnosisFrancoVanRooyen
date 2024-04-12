import type { UserRole } from '../../../shared/store/in-memory-db';
import type { UserPreferences, UserStatus } from '../entities/user.entity';

export interface CreateUserDto {
  tenantId: string;
  branchId?: string;
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  title?: string;
  password: string;
  role: UserRole;
  status?: UserStatus;
  isActive?: boolean;
  preferences?: UserPreferences;
}

export interface UpdateUserDto {
  branchId?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  title?: string;
  role?: UserRole;
  status?: UserStatus;
  isActive?: boolean;
  preferences?: UserPreferences;
}
