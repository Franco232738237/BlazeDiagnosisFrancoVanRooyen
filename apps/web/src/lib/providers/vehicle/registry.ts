import { MockVehicleLookupProvider } from './implementations/mock';
import { VinDecoderProvider } from './implementations/vindecoder';
import type { IVehicleLookupProvider, VehicleProviderResult } from './types';

const vehicleProviders: IVehicleLookupProvider[] = [];

export function getVehicleProviders(): IVehicleLookupProvider[] {
  if (vehicleProviders.length === 0) {
    const apiKey = process.env.VIN_DECODER_API_KEY;

    if (apiKey) {
      vehicleProviders.push(new VinDecoderProvider(apiKey));
    }

    vehicleProviders.push(new MockVehicleLookupProvider());
    vehicleProviders.sort((a, b) => a.priority - b.priority);
  }

  return vehicleProviders;
}

export async function lookupVehicleByVin(
  vin: string,
): Promise<VehicleProviderResult> {
  const providers = getVehicleProviders();

  for (const provider of providers) {
    if (!(await provider.isAvailable())) {
      continue;
    }

    const result = await provider.lookupByVin(vin);
    if (result.success) {
      return result;
    }
  }

  return {
    success: false,
    error: {
      code: 'ALL_PROVIDERS_FAILED',
      message: 'No vehicle provider returned a successful result.',
    },
    source: 'registry',
  };
}
