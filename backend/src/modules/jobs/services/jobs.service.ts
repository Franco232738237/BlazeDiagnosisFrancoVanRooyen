import { createAuditTimestamps, createReference, nextEntityId } from '../../../shared/store/in-memory-db';
import type { CreateJobDto, UpdateJobStatusDto } from '../dto/jobs.dto';
import type { JobEntity } from '../entities/job.entity';
import { JobsRepository } from '../repositories/jobs.repository';

export class JobsService {
  constructor(private readonly repository = new JobsRepository()) {}

  list(tenantId: string) {
    return this.repository.listByTenant(tenantId).map((job) => ({
      ...job,
      statusHistory: this.repository.listStatusHistory(job.id),
    }));
  }

  getById(id: string) {
    const job = this.repository.findById(id);
    if (!job) {
      throw new Error('Job not found.');
    }

    return {
      ...job,
      statusHistory: this.repository.listStatusHistory(job.id),
    };
  }

  create(input: CreateJobDto): JobEntity {
    const job = this.repository.create({
      id: nextEntityId('job'),
      ...createAuditTimestamps(),
      tenantId: input.tenantId,
      customerId: input.customerId,
      vehicleId: input.vehicleId,
      assignedMechanicId: input.assignedMechanicId,
      referenceNumber: createReference('JOB', this.repository.listByTenant(input.tenantId).length),
      status: 'DRAFT',
      customerComplaint: input.customerComplaint,
      diagnosisSummary: input.diagnosisSummary,
      estimatedCompletionAt: input.estimatedCompletionAt ? new Date(input.estimatedCompletionAt) : undefined,
    });

    this.repository.addStatusHistory({
      id: nextEntityId('jsh'),
      jobId: job.id,
      fromStatus: undefined,
      toStatus: job.status,
      changedByUserId: input.assignedMechanicId ?? 'system',
      createdAt: new Date(),
    });

    return job;
  }

  updateStatus(jobId: string, input: UpdateJobStatusDto) {
    const currentJob = this.repository.findById(jobId);
    if (!currentJob) {
      throw new Error('Job not found.');
    }

    const previousStatus = currentJob.status;
    const updatedJob = this.repository.update(jobId, { status: input.status });

    this.repository.addStatusHistory({
      id: nextEntityId('jsh'),
      jobId,
      fromStatus: previousStatus,
      toStatus: input.status,
      changedByUserId: input.changedByUserId,
      createdAt: new Date(),
    });

    return {
      ...updatedJob,
      statusHistory: this.repository.listStatusHistory(jobId),
    };
  }
}
