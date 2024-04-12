import { BaseEntity, ID } from '../../../shared/types/common';

export interface QuoteEntity extends BaseEntity {
  jobId: ID;
  version: number;
  status: 'DRAFT' | 'SENT' | 'VIEWED' | 'APPROVED' | 'REJECTED' | 'EXPIRED' | 'SUPERSEDED';
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  total: number;
  publicToken?: string;
  approvedAt?: Date;
  rejectedAt?: Date;
}
