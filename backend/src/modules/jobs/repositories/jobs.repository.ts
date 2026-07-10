
import { JobEntity } from '../entities/job.entity';

export class JobsRepository {

  private readonly jobs: JobEntity[] = [];

  create(job: JobEntity): JobEntity {

    this.jobs.push(job);

    return job;

  }

  findById(id: string) {

    return this.jobs.find(job => job.id === id);

  }

  listByTenant(tenantId: string) {

    return this.jobs.filter(job => job.tenantId === tenantId);

  }

  update(id: string, updates: Partial<JobEntity>) {

    const job = this.findById(id);

    if (!job) {

      return undefined;

    }

    Object.assign(job, updates);

    job.updatedAt = new Date();

    return job;

  }

  delete(id: string) {

    const index = this.jobs.findIndex(job => job.id === id);

    if (index === -1) {

      return false;

    }

    this.jobs.splice(index,1);

    return true;

  }

}