import { db } from '../../../shared/store/in-memory-db';
import type { VehicleEntity } from '../entities/vehicle.entity';

export class VehiclesRepository {
  listByTenant(tenantId: string): VehicleEntity[] {
    return db.vehicles.filter((vehicle) => vehicle.tenantId === tenantId);
  }

  search(tenantId: string, query?: string): VehicleEntity[] {
    const normalizedQuery = query?.trim().toLowerCase();
    const vehicles = this.listByTenant(tenantId);

    if (!normalizedQuery) {
      return vehicles;
    }

    return vehicles.filter((vehicle) =>
      [vehicle.registrationNumber, vehicle.vin, vehicle.make, vehicle.model]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(normalizedQuery))
    );
  }

  findById(id: string): VehicleEntity | undefined {
    return db.vehicles.find((vehicle) => vehicle.id === id);
  }

  create(vehicle: VehicleEntity): VehicleEntity {
    db.vehicles.push(vehicle);
    return vehicle;
  }

  update(id: string, updates: Partial<VehicleEntity>): VehicleEntity {
    const vehicle = this.findById(id);
    if (!vehicle) {
      throw new Error('Vehicle not found.');
    }

    Object.assign(vehicle, updates, { updatedAt: new Date() });
    return vehicle;
  }
}
