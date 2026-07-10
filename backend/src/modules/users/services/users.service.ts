import { hashPassword } from '../../../shared/auth/password';
import { createAuditTimestamps, nextEntityId } from '../../../shared/store/in-memory-db';
import type { CreateUserDto, UpdateUserDto } from '../dto/users.dto';
import type { PublicUserEntity, UserEntity } from '../entities/user.entity';
import { UsersRepository } from '../repositories/users.repository';
import { TenantsRepository } from '../../tenants/repositories/tenants.repository';

function toPublicUser(user: UserEntity): PublicUserEntity {
  const { passwordHash, ...rest } = user;
  return rest;
}

export class UsersService {
  constructor(
    private readonly repository = new UsersRepository(),
    private readonly tenantsRepository = new TenantsRepository(),
  ) {}

  list(tenantId: string): PublicUserEntity[] {
    return this.repository.listByTenant(tenantId).map(toPublicUser);
  }

  getById(id: string): PublicUserEntity {
    const user = this.repository.findById(id);
    if (!user) {
      throw new Error('User not found.');
    }
    return toPublicUser(user);
  }

  create(input: CreateUserDto): PublicUserEntity {
    const tenant = this.tenantsRepository.findById(input.tenantId);
    if (!tenant) {
      throw new Error('Tenant not found.');
    }
    if (this.repository.findByEmail(input.email)) {
      throw new Error('User email already exists.');
    }

    const fullName = input.fullName.trim();
    const firstName = input.firstName.trim();
    const lastName = input.lastName.trim();

    const user = this.repository.create({
      id: nextEntityId('user'),
      ...createAuditTimestamps(),
      tenantId: input.tenantId,
      branchId: input.branchId,
      fullName,
      firstName,
      lastName,
      email: input.email,
      phone: input.phone,
      title: input.title,
      passwordHash: hashPassword(input.password),
      role: input.role,
      status: input.status ?? 'ACTIVE',
      isActive: input.isActive ?? true,
      preferences: input.preferences,
      inviteAcceptedAt: input.status === 'INVITED' ? undefined : new Date(),
    });

    return toPublicUser(user);
  }

  update(id: string, input: UpdateUserDto): PublicUserEntity {
    const existing = this.repository.findById(id);
    if (!existing) {
      throw new Error('User not found.');
    }

    if (input.email && input.email !== existing.email) {
      const conflicting = this.repository.findByEmail(input.email);
      if (conflicting && conflicting.id !== id) {
        throw new Error('User email already exists.');
      }
    }

    const fullName = input.fullName?.trim();
    const firstName = input.firstName?.trim();
    const lastName = input.lastName?.trim();

    return toPublicUser(this.repository.update(id, {
      ...input,
      fullName: fullName ?? existing.fullName,
      firstName: firstName ?? existing.firstName,
      lastName: lastName ?? existing.lastName,
      preferences: input.preferences
        ? {
            ...existing.preferences,
            ...input.preferences,
          }
        : existing.preferences,
    }));
  }
}
