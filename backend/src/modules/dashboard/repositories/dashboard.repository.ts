import { db } from '../../../shared/store/in-memory-db';
import type { JobEntity } from '../../jobs/entities/job.entity';

export class DashboardRepository {
  listJobs(tenantId: string): JobEntity[] {
    return db.jobs.filter((job) => job.tenantId === tenantId);
  }
}
