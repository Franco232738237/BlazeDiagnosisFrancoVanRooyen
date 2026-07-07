import { MockPartsFitmentProvider } from './implementations/mock';
import type { IPartsFitmentProvider, PartsFitmentResult } from './types';

const partsProviders: IPartsFitmentProvider[] = [];

export function getPartsProviders(): IPartsFitmentProvider[] {
  if (partsProviders.length === 0) {
    partsProviders.push(new MockPartsFitmentProvider());
    partsProviders.sort((a, b) => a.priority - b.priority);
  }

  return partsProviders;
}

export async function lookupPartNumber(
  partNumber: string,
): Promise<PartsFitmentResult> {
  const providers = getPartsProviders();

  for (const provider of providers) {
    if (!(await provider.isAvailable())) {
      continue;
    }

    const result = await provider.lookupByPartNumber(partNumber);
    if (result.success) {
      return result;
    }
  }

  return {
    success: false,
    error: {
      code: 'ALL_PARTS_PROVIDERS_FAILED',
      message: 'No parts provider returned a successful result.',
    },
    source: 'registry',
  };
}
