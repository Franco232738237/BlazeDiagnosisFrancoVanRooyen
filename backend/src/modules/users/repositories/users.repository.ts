import { db } from '../../../shared/store/in-memory-db';
import type { UserEntity } from '../entities/user.entity';

export class UsersRepository {
  listByTenant(tenantId: string): UserEntity[] {
    return db.users.filter((user) => user.tenantId === tenantId);
  }

  findById(id: string): UserEntity | undefined {
    return db.users.find((user) => user.id === id);
  }

  findByEmail(email: string): UserEntity | undefined {
    return db.users.find((user) => user.email.toLowerCase() === email.toLowerCase());
  }

  create(input: UserEntity): UserEntity {
    db.users.push(input);
    return input;
  }

  update(id: string, updates: Partial<UserEntity>): UserEntity {
    const user = this.findById(id);
    if (!user) {
      throw new Error('User not found.');
    }
    Object.assign(user, updates, { updatedAt: new Date() });
    return user;
  }
}
