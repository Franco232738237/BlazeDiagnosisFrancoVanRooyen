export type PartsFitmentResult = {
  success: boolean;
  data?: {
    partNumber: string;
    description: string;
    compatibleVehicles: Array<{
      make: string;
      model: string;
      year: number;
      notes?: string;
    }>;
  };
  error?: {
    code: string;
    message: string;
  };
  source: string;
  cached?: boolean;
};

export interface IPartsFitmentProvider {
  name: string;
  priority: number;
  isAvailable(): Promise<boolean>;
  lookupByPartNumber(partNumber: string): Promise<PartsFitmentResult>;
  searchByVehicle?(make: string, model: string, year: number): Promise<PartsFitmentResult>;
}
