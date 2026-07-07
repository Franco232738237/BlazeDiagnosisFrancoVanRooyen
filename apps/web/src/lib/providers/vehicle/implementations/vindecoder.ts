import type { IVehicleLookupProvider, VehicleProviderResult } from '../types';

export class VinDecoderProvider implements IVehicleLookupProvider {
  name = 'vindecoder';
  priority = 10;
  private apiKey: string;
  private baseUrl = 'https://vindecoder.eu/api/v1';

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('VinDecoder API key is required');
    }
    this.apiKey = apiKey;
  }

  async isAvailable(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/status`, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      });
      return response.ok;
    } catch (error) {
      console.error('[VinDecoder] Availability check failed:', error);
      return false;
    }
  }

  async lookupByVin(vin: string): Promise<VehicleProviderResult> {
    if (!/^[A-HJ-NPR-Z0-9]{17}$/.test(vin)) {
      return {
        success: false,
        error: {
          code: 'INVALID_VIN',
          message: 'VIN format is invalid',
        },
        source: this.name,
      };
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/decode?vin=${encodeURIComponent(vin)}`,
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
          },
        },
      );

      if (!response.ok) {
        return {
          success: false,
          error: {
            code: 'API_ERROR',
            message: `VinDecoder API returned ${response.status}`,
          },
          source: this.name,
        };
      }

      const raw = await response.json();

      return {
        success: true,
        data: {
          vin,
          make: raw.Make || '',
          model: raw.Model || '',
          year: Number(raw.Year) || 0,
          body: raw.Body || '',
          engine: {
            type: raw.EngineType || '',
            displacement: Number(raw.EngineDisplacement) || 0,
            horsepower: raw.Horsepower ? Number(raw.Horsepower) : undefined,
            fuelType: raw.FuelType || 'gasoline',
          },
          transmission: {
            type: (raw.TransmissionType as 'manual' | 'automatic' | 'cvt') ||
              'automatic',
            gears: raw.TransmissionGears
              ? Number(raw.TransmissionGears)
              : undefined,
          },
          drivetrain: raw.Drivetrain || 'FWD',
          colors: raw.Colors || [],
          metadata: raw,
        },
        source: this.name,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: 'Failed to contact VinDecoder provider',
        },
        source: this.name,
      };
    }
  }
}
