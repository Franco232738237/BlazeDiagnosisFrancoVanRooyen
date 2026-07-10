import { ok } from '../../../shared/utils/response';
import { DashboardService } from '../services/dashboard.service';

export class DashboardController {
  constructor(
    private readonly service = new DashboardService(),
  ) {}

  summary(tenantId: string) {
    return ok(this.service.getSummary(tenantId));
  }

  workshopBoard(tenantId: string) {
    return ok(this.service.getWorkshopBoard(tenantId));
  }
}
