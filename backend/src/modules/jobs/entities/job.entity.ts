export type JobStatus =
  | 'DRAFT'
  | 'IN_PROGRESS'
  | 'WAITING_FOR_PARTS'
  | 'COMPLETED'
  | 'CANCELLED';

export interface JobEntity {
  id: string;
  tenantId: string;

  customerId: string;
  vehicleId: string;

  assignedMechanicId?: string;

  referenceNumber: string;

  customerComplaint: string;

  diagnosisSummary?: string;

  status: JobStatus;

  estimatedCompletionAt?: Date;

  createdAt: Date;

  updatedAt: Date;
}
