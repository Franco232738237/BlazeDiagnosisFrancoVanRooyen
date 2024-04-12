import { JOB_STATUSES, type JobStatus } from '../../../shared/constants/job-status';
import { assertOptionalString, assertRequiredString, isObject } from '../../../shared/utils/validation';
import type { CreateJobDto, UpdateJobStatusDto } from '../dto/jobs.dto';

export function validateCreateJobInput(input: unknown): CreateJobDto {
  if (!isObject(input)) {
    throw new Error('Job payload is required.');
  }

  return {
    tenantId: assertRequiredString(input.tenantId, 'tenantId'),
    customerId: assertRequiredString(input.customerId, 'customerId'),
    vehicleId: assertRequiredString(input.vehicleId, 'vehicleId'),
    assignedMechanicId: assertOptionalString(input.assignedMechanicId, 'assignedMechanicId'),
    customerComplaint: assertRequiredString(input.customerComplaint, 'customerComplaint'),
    diagnosisSummary: assertOptionalString(input.diagnosisSummary, 'diagnosisSummary'),
    estimatedCompletionAt: assertOptionalString(input.estimatedCompletionAt, 'estimatedCompletionAt'),
  };
}

export function validateUpdateJobStatusInput(input: unknown): UpdateJobStatusDto {
  if (!isObject(input)) {
    throw new Error('Job status payload is required.');
  }

  const status = assertRequiredString(input.status, 'status') as JobStatus;
  if (!JOB_STATUSES.includes(status)) {
    throw new Error('Invalid job status.');
  }

  return {
    status,
    changedByUserId: assertRequiredString(input.changedByUserId, 'changedByUserId'),
  };
}
