import { apiClient } from '../../../lib/api-client';
import { endpoints } from '../../../services/endpoints';
import type { JobRecord } from '../types/jobs.types';

export const jobsApi = {
  list: (tenantId: string) => apiClient<JobRecord[]>(`${endpoints.jobs}?tenantId=${tenantId}`),
  create: (payload: Omit<JobRecord, 'id' | 'referenceNumber' | 'status' | 'statusHistory'>) => apiClient<JobRecord>(endpoints.jobs, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }),
  updateStatus: (jobId: string, status: string, changedByUserId: string) => apiClient<JobRecord>(`${endpoints.jobs}/${jobId}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status, changedByUserId }),
  }),
};
