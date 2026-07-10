import { db } from '../../../shared/store/in-memory-db';
import type { TenantEntity } from '../entities/tenant.entity';

export class TenantsRepository {
  list(): TenantEntity[] {
    return [...db.tenants];
  }

  findById(id: string): TenantEntity | undefined {
    return db.tenants.find((tenant) => tenant.id === id);
  }

  findBySlug(slug: string): TenantEntity | undefined {
    return db.tenants.find((tenant) => tenant.slug.toLowerCase() === slug.toLowerCase());
  }

  create(input: TenantEntity): TenantEntity {
    db.tenants.push(input);
    return input;
  }

  update(id: string, updates: Partial<TenantEntity>): TenantEntity {
    const tenant = this.findById(id);
    if (!tenant) {
      throw new Error('Tenant not found.');
    }
    Object.assign(tenant, updates, { updatedAt: new Date() });
    return tenant;
  }
}
