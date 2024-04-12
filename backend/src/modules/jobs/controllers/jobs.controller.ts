import { ok } from '../../../shared/utils/response';
import { JobsService } from '../services/jobs.service';
import { validateCreateJobInput, validateUpdateJobStatusInput } from '../validators/jobs.validator';

export class JobsController {
  constructor(private readonly service = new JobsService()) {}

  list(tenantId: string) {
    return ok(this.service.list(tenantId));
  }

  getById(id: string) {
    return ok(this.service.getById(id));
  }

  create(payload: unknown) {
    return ok(this.service.create(validateCreateJobInput(payload)));
  }

  updateStatus(jobId: string, payload: unknown) {
    return ok(this.service.updateStatus(jobId, validateUpdateJobStatusInput(payload)));
  }
}
