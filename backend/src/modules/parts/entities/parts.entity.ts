import { BaseEntity, ID } from '../../../shared/types/common';

export interface PartRequestEntity extends BaseEntity {
  jobId: ID;
  description: string;
  quantity: number;
  costPrice?: number;
  sellPrice?: number;
  supplierReference?: string;
  etaDate?: Date;
  status: 'REQUIRED' | 'PENDING_APPROVAL' | 'READY_TO_ORDER' | 'ORDERED' | 'SHIPPED' | 'RECEIVED' | 'INSTALLED' | 'RETURNED' | 'CANCELLED';
}
