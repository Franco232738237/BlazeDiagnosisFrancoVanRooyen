export interface CreateVehicleDto {
  tenantId: string;
  customerId: string;
  registrationNumber: string;
  vin?: string;
  make: string;
  model: string;
  variant?: string;
  year?: number;
  engineType?: string;
  fuelType?: string;
  transmission?: string;
  odometer?: number;
  color?: string;
}

export interface UpdateVehicleDto extends Partial<CreateVehicleDto> {}
