import { apiClient } from '../../../lib/api-client';
import { endpoints } from '../../../services/endpoints';
import type { QuoteRecord } from '../types/quotes.types';

export const quotesApi = {
  listByJob: (jobId: string) => apiClient<QuoteRecord[]>(`${endpoints.quotes}?jobId=${jobId}`),
  create: (payload: {
    tenantId: string;
    jobId: string;
    discountAmount?: number;
    taxRate?: number;
    lines: Array<{ type: 'LABOR' | 'PART'; description: string; quantity: number; unitPrice: number }>;
  }) => apiClient<QuoteRecord>(endpoints.quotes, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }),
  approve: (token: string) => apiClient<QuoteRecord>(`/api/public/quotes/${token}/approve`, {
    method: 'POST',
  }),
};
