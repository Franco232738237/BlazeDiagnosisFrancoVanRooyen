import type { TenantType } from '../entities/tenant.entity';

export interface TenantSettingsDto {
  timezone: string;
  currencyCode: string;
  countryCode: string;
  taxRatePercent: number;
  dateFormat: string;
  requirePaymentBeforeCollection: boolean;
}

export interface CreateTenantDto {
  name: string;
  slug: string;
  type: TenantType;
  isActive?: boolean;
  contactEmail?: string;
  contactPhone?: string;
  legalName?: string;
  registrationNumber?: string;
  defaultBranchId?: string;
  settings?: Partial<TenantSettingsDto>;
}

export interface UpdateTenantDto {
  name?: string;
  slug?: string;
  type?: TenantType;
  isActive?: boolean;
  contactEmail?: string;
  contactPhone?: string;
  legalName?: string;
  registrationNumber?: string;
  defaultBranchId?: string;
  settings?: Partial<TenantSettingsDto>;
}
