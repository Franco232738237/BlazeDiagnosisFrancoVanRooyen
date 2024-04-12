import type { BaseEntity } from '../../../shared/types/common';
import type { UserRole } from '../../../shared/store/in-memory-db';

export type UserStatus = 'INVITED' | 'ACTIVE' | 'SUSPENDED';

export interface UserPreferences {
  locale?: string;
  timezone?: string;
  defaultBranchId?: string;
}

export interface UserEntity extends BaseEntity {
  tenantId: string;
  branchId?: string;
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  title?: string;
  passwordHash: string;
  role: UserRole;
  isActive: boolean;
  status: UserStatus;
  inviteAcceptedAt?: Date;
  lastLoginAt?: Date;
  preferences?: UserPreferences;
}

export interface PublicUserEntity extends Omit<UserEntity, 'passwordHash'> {}
