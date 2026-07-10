export interface JobTimelineEntity {

    id: string;

    jobId: string;

    status: string;

    changedBy: string;

    note?: string;

    createdAt: Date;

}