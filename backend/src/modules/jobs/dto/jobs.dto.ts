import type { JobStatus } from '../../../shared/constants/job-status';

export interface CreateJobDto {
  tenantId: string;

  customerId: string;

  vehicleId: string;

  assignedMechanicId?: string;

  customerComplaint: string;

  diagnosisSummary?: string;

  estimatedCompletionAt?: Date;
}
export interface UpdateJobStatusDto {
  status: JobStatus;

  changedByUserId: string;
}
export interface JobResponseDto {
  id: string;

  referenceNumber: string;

  customerId: string;

  vehicleId: string;

  status: JobStatus;
}