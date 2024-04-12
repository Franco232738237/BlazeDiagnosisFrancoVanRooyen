import { createAuditTimestamps, nextEntityId } from '../../../shared/store/in-memory-db';
import type { CreateVehicleDto, UpdateVehicleDto } from '../dto/vehicles.dto';
import type { VehicleEntity } from '../entities/vehicle.entity';
import { VehiclesRepository } from '../repositories/vehicles.repository';

export class VehiclesService {
  constructor(private readonly repository = new VehiclesRepository()) {}

  list(tenantId: string, query?: string) {
    return this.repository.search(tenantId, query);
  }

  getById(id: string) {
    const vehicle = this.repository.findById(id);
    if (!vehicle) {
      throw new Error('Vehicle not found.');
    }

    return vehicle;
  }

  create(input: CreateVehicleDto): VehicleEntity {
    return this.repository.create({
      id: nextEntityId('veh'),
      ...createAuditTimestamps(),
      tenantId: input.tenantId,
      customerId: input.customerId,
      registrationNumber: input.registrationNumber,
      vin: input.vin,
      make: input.make,
      model: input.model,
      variant: input.variant,
      year: input.year,
      engineType: input.engineType,
      fuelType: input.fuelType,
      transmission: input.transmission,
      odometer: input.odometer,
      color: input.color,
    });
  }

  update(id: string, input: UpdateVehicleDto): VehicleEntity {
    return this.repository.update(id, input);
  }
}
