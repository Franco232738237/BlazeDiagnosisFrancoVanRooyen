import type { BaseEntity } from '../../../shared/types/common';

export type TenantType = 'SERVICE_STATION' | 'SUPPLIER';

export interface TenantSettings {
  timezone: string;
  currencyCode: string;
  countryCode: string;
  taxRatePercent: number;
  dateFormat: string;
  requirePaymentBeforeCollection: boolean;
}

export interface TenantEntity extends BaseEntity {
  name: string;
  slug: string;
  type: TenantType;
  isActive: boolean;
  contactEmail?: string;
  contactPhone?: string;
  legalName?: string;
  registrationNumber?: string;
  defaultBranchId?: string;
  settings: TenantSettings;
}
