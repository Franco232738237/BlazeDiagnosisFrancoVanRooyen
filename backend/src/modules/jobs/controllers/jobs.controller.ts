import { JobsService } from '../services/jobs.service';

export class JobsController {

  constructor(

    private readonly service = new JobsService()

  ) {}

  create(body: any) {

    return this.service.create(body);

  }

  list(tenantId: string) {

    return this.service.list(tenantId);

  }

  get(id: string) {

    return this.service.get(id);

  }

  updateStatus(id: string, body: any) {

    return this.service.updateStatus(id, body);

  }

  timeline(jobId: string) {

    return (this.service as any).timeline(jobId);

  }

}
