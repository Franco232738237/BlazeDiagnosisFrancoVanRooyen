export interface VehicleRecord {
  id: string;
  tenantId: string;
  customerId: string;
  registrationNumber: string;
  vin?: string;
  make: string;
  model: string;
  year?: number;
  fuelType?: string;
  transmission?: string;
  odometer?: number;
}
