import { DashboardRepository } from '../repositories/dashboard.repository';
import type {
  DashboardSummaryDto,
  WorkshopBoardDto,
} from '../dto/dashboard.dto';

export class DashboardService {
  constructor(
    private readonly repository = new DashboardRepository(),
  ) {}

  getSummary(tenantId: string): DashboardSummaryDto {
    const jobs = this.repository.listJobs(tenantId);

    return {
      totalJobs: jobs.length,

      draftJobs: jobs.filter((job) => job.status === 'DRAFT').length,

      activeJobs: jobs.filter(
        (job) => job.status === 'IN_PROGRESS',
      ).length,

      waitingJobs: jobs.filter(
        (job) => job.status === 'WAITING_FOR_PARTS',
      ).length,

      completedJobs: jobs.filter(
        (job) => job.status === 'COMPLETED',
      ).length,
    };
  }

  getWorkshopBoard(tenantId: string): WorkshopBoardDto {
    const jobs = this.repository.listJobs(tenantId);

    return {
      draft: jobs.filter((job) => job.status === 'DRAFT'),

      active: jobs.filter(
        (job) => job.status === 'IN_PROGRESS',
      ),

      waiting: jobs.filter(
        (job) => job.status === 'WAITING_FOR_PARTS',
      ),

      completed: jobs.filter(
        (job) => job.status === 'COMPLETED',
      ),
    };
  }
}
