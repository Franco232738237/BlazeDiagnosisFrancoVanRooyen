import type { JobStatus } from '../../../shared/constants/job-status';

export interface CreateJobDto {
  tenantId: string;
  customerId: string;
  vehicleId: string;
  assignedMechanicId?: string;
  customerComplaint: string;
  diagnosisSummary?: string;
  estimatedCompletionAt?: string;
}

export interface UpdateJobStatusDto {
  status: JobStatus;
  changedByUserId: string;
}
