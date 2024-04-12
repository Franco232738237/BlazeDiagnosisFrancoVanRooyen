import { ok } from '../../../shared/utils/response';
import { TenantsService } from '../services/tenants.service';
import { validateCreateTenantInput, validateUpdateTenantInput } from '../validators/tenants.validator';

export class TenantsController {
  constructor(private readonly service = new TenantsService()) {}

  list() {
    return ok(this.service.list());
  }

  getById(id: string) {
    return ok(this.service.getById(id));
  }

  create(payload: unknown) {
    return ok(this.service.create(validateCreateTenantInput(payload)));
  }

  update(id: string, payload: unknown) {
    return ok(this.service.update(id, validateUpdateTenantInput(payload)));
  }
}
