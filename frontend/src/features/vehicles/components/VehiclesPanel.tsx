import type { VehicleRecord } from '../types/vehicles.types';

const demoVehicles: VehicleRecord[] = [
  {
    id: 'veh_demo_1',
    tenantId: 'tenant_demo',
    customerId: 'cust_demo_1',
    registrationNumber: 'CA123456',
    vin: 'VINDEMO123456789',
    make: 'Toyota',
    model: 'Corolla',
    year: 2020,
    fuelType: 'Petrol',
    transmission: 'Manual',
    odometer: 84500,
  },
];

export function VehiclesPanel() {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {demoVehicles.map((vehicle) => (
        <div key={vehicle.id} style={{ border: '1px solid #e5e7eb', padding: 16, borderRadius: 12 }}>
          <strong>{vehicle.registrationNumber}</strong>
          <div>{vehicle.make} {vehicle.model}</div>
          <div>{vehicle.year} · {vehicle.odometer} km</div>
        </div>
      ))}
    </div>
  );
}
