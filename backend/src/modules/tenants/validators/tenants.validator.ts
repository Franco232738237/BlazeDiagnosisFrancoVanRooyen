import { assertBoolean, assertEmail, assertOptionalString, assertRequiredString, isObject } from '../../../shared/utils/validation';
import type { CreateTenantDto, TenantSettingsDto, UpdateTenantDto } from '../dto/tenants.dto';

function assertTenantType(value: unknown): 'SERVICE_STATION' | 'SUPPLIER' {
  const type = assertRequiredString(value, 'type');
  if (type !== 'SERVICE_STATION' && type !== 'SUPPLIER') {
    throw new Error('type must be SERVICE_STATION or SUPPLIER.');
  }
  return type;
}

function validateSettings(input: unknown, defaults?: TenantSettingsDto): Partial<TenantSettingsDto> | undefined {
  if (input === undefined) {
    return undefined;
  }
  if (!isObject(input)) {
    throw new Error('settings must be an object.');
  }

  const taxRateRaw = input.taxRatePercent;
  const taxRatePercent = taxRateRaw === undefined ? defaults?.taxRatePercent : Number(taxRateRaw);
  if (taxRatePercent !== undefined && Number.isNaN(taxRatePercent)) {
    throw new Error('settings.taxRatePercent must be a valid number.');
  }

  return {
    timezone: input.timezone ? assertRequiredString(input.timezone, 'settings.timezone') : defaults?.timezone,
    currencyCode: input.currencyCode ? assertRequiredString(input.currencyCode, 'settings.currencyCode').toUpperCase() : defaults?.currencyCode,
    countryCode: input.countryCode ? assertRequiredString(input.countryCode, 'settings.countryCode').toUpperCase() : defaults?.countryCode,
    taxRatePercent,
    dateFormat: input.dateFormat ? assertRequiredString(input.dateFormat, 'settings.dateFormat') : defaults?.dateFormat,
    requirePaymentBeforeCollection:
      typeof input.requirePaymentBeforeCollection === 'boolean'
        ? input.requirePaymentBeforeCollection
        : defaults?.requirePaymentBeforeCollection,
  };
}

export function validateCreateTenantInput(input: unknown): CreateTenantDto {
  if (!isObject(input)) {
    throw new Error('Tenant payload is required.');
  }

  return {
    name: assertRequiredString(input.name, 'name'),
    slug: assertRequiredString(input.slug, 'slug').toLowerCase(),
    type: assertTenantType(input.type),
    contactEmail: input.contactEmail ? assertEmail(input.contactEmail, 'contactEmail') : undefined,
    contactPhone: assertOptionalString(input.contactPhone, 'contactPhone'),
    legalName: assertOptionalString(input.legalName, 'legalName'),
    registrationNumber: assertOptionalString(input.registrationNumber, 'registrationNumber'),
    defaultBranchId: assertOptionalString(input.defaultBranchId, 'defaultBranchId'),
    isActive: assertBoolean(input.isActive, 'isActive', true),
    settings: validateSettings(input.settings),
  };
}

export function validateUpdateTenantInput(input: unknown): UpdateTenantDto {
  if (!isObject(input)) {
    throw new Error('Tenant payload is required.');
  }

  return {
    name: assertOptionalString(input.name, 'name'),
    slug: assertOptionalString(input.slug, 'slug')?.toLowerCase(),
    type: input.type ? assertTenantType(input.type) : undefined,
    contactEmail: input.contactEmail ? assertEmail(input.contactEmail, 'contactEmail') : undefined,
    contactPhone: assertOptionalString(input.contactPhone, 'contactPhone'),
    legalName: assertOptionalString(input.legalName, 'legalName'),
    registrationNumber: assertOptionalString(input.registrationNumber, 'registrationNumber'),
    defaultBranchId: assertOptionalString(input.defaultBranchId, 'defaultBranchId'),
    isActive: typeof input.isActive === 'boolean' ? input.isActive : undefined,
    settings: validateSettings(input.settings),
  };
}
