import { BaseEntity, ID } from '../../../shared/types/common';
import { JobStatus } from '../../../shared/constants/job-status';

export interface JobEntity extends BaseEntity {
  customerId: ID;
  vehicleId: ID;
  assignedMechanicId?: ID;
  referenceNumber: string;
  status: JobStatus;
  customerComplaint: string;
  diagnosisSummary?: string;
  estimatedCompletionAt?: Date;
}
