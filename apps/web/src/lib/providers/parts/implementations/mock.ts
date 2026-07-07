import type { IPartsFitmentProvider, PartsFitmentResult } from '../types';

export class MockPartsFitmentProvider implements IPartsFitmentProvider {
  name = 'mock';
  priority = 100;

  async isAvailable(): Promise<boolean> {
    return true;
  }

  async lookupByPartNumber(partNumber: string): Promise<PartsFitmentResult> {
    return {
      success: true,
      source: this.name,
      data: {
        partNumber,
        description: 'Mock fitment data for development',
        compatibleVehicles: [
          { make: 'Toyota', model: 'Corolla', year: 2022, notes: 'Generic fitment' },
          { make: 'Honda', model: 'Civic', year: 2021, notes: 'Fallback match' },
        ],
      },
    };
  }

  async searchByVehicle(
    make: string,
    model: string,
    year: number,
  ): Promise<PartsFitmentResult> {
    return {
      success: true,
      source: this.name,
      data: {
        partNumber: 'MOCK-1234',
        description: `Mock fitment result for ${make} ${model} ${year}`,
        compatibleVehicles: [{ make, model, year, notes: 'Mock match' }],
      },
    };
  }
}
