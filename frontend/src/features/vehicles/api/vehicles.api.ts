import { apiClient } from '../../../lib/api-client';
import { endpoints } from '../../../services/endpoints';
import type { VehicleRecord } from '../types/vehicles.types';

export const vehiclesApi = {
  list: (tenantId: string, query?: string) => apiClient<VehicleRecord[]>(`${endpoints.vehicles}?tenantId=${tenantId}${query ? `&q=${encodeURIComponent(query)}` : ''}`),
  create: (payload: Omit<VehicleRecord, 'id'>) => apiClient<VehicleRecord>(endpoints.vehicles, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }),
};
