import { apiClient } from '../../../lib/api-client';
import { endpoints } from '../../../services/endpoints';
import type { CustomerRecord } from '../types/customers.types';

export const customersApi = {
  list: (tenantId: string, query?: string) => apiClient<CustomerRecord[]>(`${endpoints.customers}?tenantId=${tenantId}${query ? `&q=${encodeURIComponent(query)}` : ''}`),
  create: (payload: Omit<CustomerRecord, 'id'>) => apiClient<CustomerRecord>(endpoints.customers, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }),
};
