export interface QuoteLineDto {
  type: 'LABOR' | 'PART';
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface CreateQuoteDto {
  tenantId: string;
  jobId: string;
  discountAmount?: number;
  taxRate?: number;
  lines: QuoteLineDto[];
}
