import type { JobEntity } from '../../jobs/entities/job.entity';

export interface DashboardSummaryDto {
  totalJobs: number;
  draftJobs: number;
  activeJobs: number;
  waitingJobs: number;
  completedJobs: number;
}

export interface WorkshopBoardDto {
  draft: JobEntity[];
  active: JobEntity[];
  waiting: JobEntity[];
  completed: JobEntity[];
}
