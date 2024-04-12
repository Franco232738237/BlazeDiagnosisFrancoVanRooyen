import { createAuditTimestamps, nextEntityId } from '../../../shared/store/in-memory-db';
import type { CreateTenantDto, UpdateTenantDto } from '../dto/tenants.dto';
import type { TenantEntity, TenantSettings } from '../entities/tenant.entity';
import { TenantsRepository } from '../repositories/tenants.repository';

const DEFAULT_TENANT_SETTINGS: TenantSettings = {
  timezone: 'Africa/Johannesburg',
  currencyCode: 'ZAR',
  countryCode: 'ZA',
  taxRatePercent: 15,
  dateFormat: 'YYYY-MM-DD',
  requirePaymentBeforeCollection: true,
};

export class TenantsService {
  constructor(private readonly repository = new TenantsRepository()) {}

  list(): TenantEntity[] {
    return this.repository.list();
  }

  getById(id: string): TenantEntity {
    const tenant = this.repository.findById(id);
    if (!tenant) {
      throw new Error('Tenant not found.');
    }
    return tenant;
  }

  create(input: CreateTenantDto): TenantEntity {
    if (this.repository.findBySlug(input.slug)) {
      throw new Error('Tenant slug already exists.');
    }

    return this.repository.create({
      id: nextEntityId('tenant'),
      ...createAuditTimestamps(),
      name: input.name,
      slug: input.slug,
      type: input.type,
      isActive: input.isActive ?? true,
      contactEmail: input.contactEmail,
      contactPhone: input.contactPhone,
      legalName: input.legalName,
      registrationNumber: input.registrationNumber,
      defaultBranchId: input.defaultBranchId,
      settings: {
        ...DEFAULT_TENANT_SETTINGS,
        ...input.settings,
      },
    });
  }

  update(id: string, input: UpdateTenantDto): TenantEntity {
    const existing = this.getById(id);
    if (input.slug && input.slug !== existing.slug) {
      const conflicting = this.repository.findBySlug(input.slug);
      if (conflicting && conflicting.id !== id) {
        throw new Error('Tenant slug already exists.');
      }
    }
    return this.repository.update(id, {
      ...input,
      settings: input.settings
        ? {
            ...existing.settings,
            ...input.settings,
          }
        : undefined,
    });
  }
}
