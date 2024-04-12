import { db, type JobStatusHistoryRecord } from '../../../shared/store/in-memory-db';
import type { JobEntity } from '../entities/job.entity';

export class JobsRepository {
  listByTenant(tenantId: string): JobEntity[] {
    return db.jobs.filter((job) => job.tenantId === tenantId);
  }

  findById(id: string): JobEntity | undefined {
    return db.jobs.find((job) => job.id === id);
  }

  create(job: JobEntity): JobEntity {
    db.jobs.push(job);
    return job;
  }

  update(id: string, updates: Partial<JobEntity>): JobEntity {
    const job = this.findById(id);
    if (!job) {
      throw new Error('Job not found.');
    }

    Object.assign(job, updates, { updatedAt: new Date() });
    return job;
  }

  addStatusHistory(record: JobStatusHistoryRecord): JobStatusHistoryRecord {
    db.jobStatusHistory.push(record);
    return record;
  }

  listStatusHistory(jobId: string): JobStatusHistoryRecord[] {
    return db.jobStatusHistory.filter((record) => record.jobId === jobId);
  }
}
