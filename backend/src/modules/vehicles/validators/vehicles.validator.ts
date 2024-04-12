import { assertOptionalNumber, assertOptionalString, assertRequiredString, isObject } from '../../../shared/utils/validation';
import type { CreateVehicleDto, UpdateVehicleDto } from '../dto/vehicles.dto';

export function validateCreateVehicleInput(input: unknown): CreateVehicleDto {
  if (!isObject(input)) {
    throw new Error('Vehicle payload is required.');
  }

  return {
    tenantId: assertRequiredString(input.tenantId, 'tenantId'),
    customerId: assertRequiredString(input.customerId, 'customerId'),
    registrationNumber: assertRequiredString(input.registrationNumber, 'registrationNumber').toUpperCase(),
    vin: assertOptionalString(input.vin, 'vin'),
    make: assertRequiredString(input.make, 'make'),
    model: assertRequiredString(input.model, 'model'),
    variant: assertOptionalString(input.variant, 'variant'),
    year: assertOptionalNumber(input.year, 'year'),
    engineType: assertOptionalString(input.engineType, 'engineType'),
    fuelType: assertOptionalString(input.fuelType, 'fuelType'),
    transmission: assertOptionalString(input.transmission, 'transmission'),
    odometer: assertOptionalNumber(input.odometer, 'odometer'),
    color: assertOptionalString(input.color, 'color'),
  };
}

export function validateUpdateVehicleInput(input: unknown): UpdateVehicleDto {
  if (!isObject(input)) {
    throw new Error('Vehicle payload is required.');
  }

  return {
    tenantId: assertOptionalString(input.tenantId, 'tenantId'),
    customerId: assertOptionalString(input.customerId, 'customerId'),
    registrationNumber: assertOptionalString(input.registrationNumber, 'registrationNumber')?.toUpperCase(),
    vin: assertOptionalString(input.vin, 'vin'),
    make: assertOptionalString(input.make, 'make'),
    model: assertOptionalString(input.model, 'model'),
    variant: assertOptionalString(input.variant, 'variant'),
    year: assertOptionalNumber(input.year, 'year'),
    engineType: assertOptionalString(input.engineType, 'engineType'),
    fuelType: assertOptionalString(input.fuelType, 'fuelType'),
    transmission: assertOptionalString(input.transmission, 'transmission'),
    odometer: assertOptionalNumber(input.odometer, 'odometer'),
    color: assertOptionalString(input.color, 'color'),
  };
}
