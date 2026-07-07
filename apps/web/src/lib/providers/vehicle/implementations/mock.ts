import type { IVehicleLookupProvider, VehicleProviderResult, VehicleSpec } from '../types';

const mockDatabase: Record<string, VehicleSpec> = {
  WBADT43452G915206: {
    vin: 'WBADT43452G915206',
    make: 'BMW',
    model: '3 Series',
    year: 2024,
    body: 'Sedan',
    engine: {
      type: 'Inline 4',
      displacement: 2000,
      horsepower: 330,
      fuelType: 'gasoline',
    },
    transmission: {
      type: 'automatic',
      gears: 8,
    },
    drivetrain: 'RWD',
    colors: ['Black', 'Silver', 'Blue'],
  },
  JTBFP5C24A5012345: {
    vin: 'JTBFP5C24A5012345',
    make: 'Toyota',
    model: 'Corolla',
    year: 2022,
    body: 'Sedan',
    engine: {
      type: 'Inline 4',
      displacement: 1598,
      horsepower: 120,
      fuelType: 'gasoline',
    },
    transmission: {
      type: 'automatic',
      gears: 6,
    },
    drivetrain: 'FWD',
    colors: ['White', 'Gray', 'Silver'],
  },
};

export class MockVehicleLookupProvider implements IVehicleLookupProvider {
  name = 'mock';
  priority = 100;

  async isAvailable(): Promise<boolean> {
    return true;
  }

  async lookupByVin(vin: string): Promise<VehicleProviderResult> {
    const spec = mockDatabase[vin];

    if (!spec) {
      return {
        success: false,
        error: {
          code: 'VIN_NOT_FOUND',
          message: `Mock database has no entry for VIN: ${vin}`,
        },
        source: this.name,
      };
    }

    return {
      success: true,
      data: spec,
      source: this.name,
      cached: false,
    };
  }

  async lookupByPlate(
    plate: string,
    country: string,
  ): Promise<VehicleProviderResult> {
    return {
      success: false,
      error: {
        code: 'NOT_SUPPORTED',
        message: 'Mock provider does not support plate lookup',
      },
      source: this.name,
    };
  }
}
