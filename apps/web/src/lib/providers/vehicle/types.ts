export type VehicleSpec = {
  vin: string;
  make: string;
  model: string;
  year: number;
  body: string;
  engine: {
    type: string;
    displacement: number;
    horsepower?: number;
    fuelType: 'gasoline' | 'diesel' | 'hybrid' | 'electric';
  };
  transmission: {
    type: 'manual' | 'automatic' | 'cvt';
    gears?: number;
  };
  drivetrain: 'FWD' | 'RWD' | 'AWD' | string;
  colors?: string[];
  metadata?: Record<string, unknown>;
};

export type VehicleProviderResult = {
  success: boolean;
  data?: VehicleSpec;
  error?: {
    code: string;
    message: string;
  };
  source: string;
  cached?: boolean;
};

export interface IVehicleLookupProvider {
  name: string;
  priority: number;
  isAvailable(): Promise<boolean>;
  lookupByVin(vin: string): Promise<VehicleProviderResult>;
  lookupByPlate?(plate: string, country: string): Promise<VehicleProviderResult>;
}
