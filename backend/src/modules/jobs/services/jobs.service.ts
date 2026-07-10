import { randomUUID } from 'crypto';

import { CreateJobDto, UpdateJobStatusDto } from '../dto/jobs.dto';

import { JobEntity } from '../entities/job.entity';

import { JobsRepository } from '../repositories/jobs.repository';

class TimelineRepository {
  create(entry: any) {
    return entry;
  }
}

export class JobsService {

  constructor(

    private readonly repository = new JobsRepository(),
    private readonly timelineRepository = new TimelineRepository()

  ) { }

  create(input: CreateJobDto): JobEntity {

    const job: JobEntity = {
  id: randomUUID(),

  tenantId: input.tenantId,

  customerId: input.customerId,

  vehicleId: input.vehicleId,

  assignedMechanicId: input.assignedMechanicId,

  customerComplaint: input.customerComplaint,

  diagnosisSummary: input.diagnosisSummary,

  referenceNumber: `JOB-${Date.now()}`,

  status: 'DRAFT',

  estimatedCompletionAt: input.estimatedCompletionAt,

  createdAt: new Date(),

  updatedAt: new Date()
};

this.timelineRepository.create({
    jobId: job.id,
    status: 'DRAFT',
    changedBy: 'SYSTEM',
    createdAt: new Date()
});

    return this.repository.create(job);
    
 

  }
  
  list(tenantId: string) {

    return this.repository.listByTenant(tenantId);

  }

  get(id: string) {

    return this.repository.findById(id);

  }

  updateStatus(id: string, input: UpdateJobStatusDto) {

    return this.repository.update(id, {

      status: input.status as JobEntity['status']

    });

  }

}







