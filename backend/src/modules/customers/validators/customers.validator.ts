import { assertBoolean, assertOptionalString, assertRequiredString, isObject } from '../../../shared/utils/validation';
import type { CreateCustomerDto, UpdateCustomerDto } from '../dto/customers.dto';

function buildCustomerPayload(input: Record<string, unknown>) {
  return {
    tenantId: assertRequiredString(input.tenantId, 'tenantId'),
    fullName: assertRequiredString(input.fullName, 'fullName'),
    mobileNumber: assertRequiredString(input.mobileNumber, 'mobileNumber'),
    alternateNumber: assertOptionalString(input.alternateNumber, 'alternateNumber'),
    email: assertOptionalString(input.email, 'email'),
    address: assertOptionalString(input.address, 'address'),
    companyName: assertOptionalString(input.companyName, 'companyName'),
    taxNumber: assertOptionalString(input.taxNumber, 'taxNumber'),
    preferredCommunicationChannel: assertOptionalString(input.preferredCommunicationChannel, 'preferredCommunicationChannel') as CreateCustomerDto['preferredCommunicationChannel'],
    marketingConsent: assertBoolean(input.marketingConsent, 'marketingConsent', false),
  };
}

export function validateCreateCustomerInput(input: unknown): CreateCustomerDto {
  if (!isObject(input)) {
    throw new Error('Customer payload is required.');
  }

  return buildCustomerPayload(input);
}

export function validateUpdateCustomerInput(input: unknown): UpdateCustomerDto {
  if (!isObject(input)) {
    throw new Error('Customer payload is required.');
  }

  const payload = input as Record<string, unknown>;
  return {
    tenantId: assertOptionalString(payload.tenantId, 'tenantId'),
    fullName: assertOptionalString(payload.fullName, 'fullName'),
    mobileNumber: assertOptionalString(payload.mobileNumber, 'mobileNumber'),
    alternateNumber: assertOptionalString(payload.alternateNumber, 'alternateNumber'),
    email: assertOptionalString(payload.email, 'email'),
    address: assertOptionalString(payload.address, 'address'),
    companyName: assertOptionalString(payload.companyName, 'companyName'),
    taxNumber: assertOptionalString(payload.taxNumber, 'taxNumber'),
    preferredCommunicationChannel: assertOptionalString(payload.preferredCommunicationChannel, 'preferredCommunicationChannel') as UpdateCustomerDto['preferredCommunicationChannel'],
    marketingConsent: payload.marketingConsent === undefined ? undefined : assertBoolean(payload.marketingConsent, 'marketingConsent'),
  };
}
