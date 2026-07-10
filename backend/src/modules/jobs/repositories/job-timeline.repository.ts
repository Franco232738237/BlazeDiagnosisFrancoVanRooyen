import { JobTimelineEntity } from '../entities/job-timeline.entity';

export class JobTimelineRepository {

    private readonly history: JobTimelineEntity[] = [];

    create(entry: JobTimelineEntity) {

        this.history.push(entry);

        return entry;

    }

    list(jobId: string) {

        return this.history.filter(h => h.jobId === jobId);

    }

}