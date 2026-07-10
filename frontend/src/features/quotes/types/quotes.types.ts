export interface QuoteLineRecord {
  id: string;
  type: 'LABOR' | 'PART';
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface QuoteRecord {
  id: string;
  tenantId: string;
  jobId: string;
  version: number;
  status: string;
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  total: number;
  publicToken?: string;
  lines?: QuoteLineRecord[];
}
