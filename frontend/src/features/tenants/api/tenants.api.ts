import { apiClient } from '../../../lib/api-client';
import type { Tenant } from '../types/tenants.types';

export const tenantsApi = {
  list: () => apiClient<Tenant[]>('/api/tenants'),
  getById: (id: string) => apiClient<Tenant>(`/api/tenants/${id}`),
};
