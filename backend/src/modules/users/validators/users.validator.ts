import { assertBoolean, assertEmail, assertOptionalString, assertRequiredString, isObject } from '../../../shared/utils/validation';
import type { UserRole } from '../../../shared/store/in-memory-db';
import type { CreateUserDto, UpdateUserDto } from '../dto/users.dto';
import type { UserPreferences, UserStatus } from '../entities/user.entity';

function assertRole(value: unknown): UserRole {
  const role = assertRequiredString(value, 'role') as UserRole;
  const allowed: UserRole[] = ['OWNER', 'ADMIN', 'ADVISOR', 'MECHANIC', 'CASHIER', 'SUPPLIER_ADMIN', 'SUPPLIER_SALES', 'SUPPLIER_WAREHOUSE', 'POS_OPERATOR'];
  if (!allowed.includes(role)) {
    throw new Error('role is invalid.');
  }
  return role;
}

function assertStatus(value: unknown): UserStatus {
  const status = assertRequiredString(value, 'status') as UserStatus;
  const allowed: UserStatus[] = ['INVITED', 'ACTIVE', 'SUSPENDED'];
  if (!allowed.includes(status)) {
    throw new Error('status is invalid.');
  }
  return status;
}

function assertPassword(value: unknown): string {
  const password = assertRequiredString(value, 'password');
  if (password.length < 8) {
    throw new Error('password must be at least 8 characters.');
  }
  return password;
}

function validatePreferences(input: unknown): UserPreferences | undefined {
  if (input === undefined) {
    return undefined;
  }
  if (!isObject(input)) {
    throw new Error('preferences must be an object.');
  }

  return {
    locale: assertOptionalString(input.locale, 'preferences.locale'),
    timezone: assertOptionalString(input.timezone, 'preferences.timezone'),
    defaultBranchId: assertOptionalString(input.defaultBranchId, 'preferences.defaultBranchId'),
  };
}

export function validateCreateUserInput(input: unknown): CreateUserDto {
  if (!isObject(input)) {
    throw new Error('User payload is required.');
  }

  const firstName = assertOptionalString(input.firstName, 'firstName');
  const lastName = assertOptionalString(input.lastName, 'lastName');
  const fullName = assertRequiredString(input.fullName, 'fullName');

  return {
    tenantId: assertRequiredString(input.tenantId, 'tenantId'),
    branchId: assertOptionalString(input.branchId, 'branchId'),
    fullName,
    firstName: firstName ?? fullName.split(' ')[0] ?? fullName,
    lastName: lastName ?? fullName.split(' ').slice(1).join(' '),
    email: assertEmail(input.email, 'email'),
    phone: assertOptionalString(input.phone, 'phone'),
    title: assertOptionalString(input.title, 'title'),
    password: assertPassword(input.password),
    role: assertRole(input.role),
    status: input.status ? assertStatus(input.status) : undefined,
    isActive: assertBoolean(input.isActive, 'isActive', true),
    preferences: validatePreferences(input.preferences),
  };
}

export function validateUpdateUserInput(input: unknown): UpdateUserDto {
  if (!isObject(input)) {
    throw new Error('User payload is required.');
  }

  return {
    branchId: assertOptionalString(input.branchId, 'branchId'),
    fullName: assertOptionalString(input.fullName, 'fullName'),
    firstName: assertOptionalString(input.firstName, 'firstName'),
    lastName: assertOptionalString(input.lastName, 'lastName'),
    email: input.email ? assertEmail(input.email, 'email') : undefined,
    phone: assertOptionalString(input.phone, 'phone'),
    title: assertOptionalString(input.title, 'title'),
    role: input.role ? assertRole(input.role) : undefined,
    status: input.status ? assertStatus(input.status) : undefined,
    isActive: typeof input.isActive === 'boolean' ? input.isActive : undefined,
    preferences: validatePreferences(input.preferences),
  };
}
