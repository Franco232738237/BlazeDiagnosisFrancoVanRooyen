import { apiClient } from '../../../lib/api-client';
import type { User } from '../types/users.types';

export const usersApi = {
  list: (tenantId: string) => apiClient<User[]>(`/api/users?tenantId=${encodeURIComponent(tenantId)}`),
  getById: (id: string) => apiClient<User>(`/api/users/${id}`),
};
