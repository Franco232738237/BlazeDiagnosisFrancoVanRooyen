import { ok } from '../../../shared/utils/response';
import { UsersService } from '../services/users.service';
import { validateCreateUserInput, validateUpdateUserInput } from '../validators/users.validator';

export class UsersController {
  constructor(private readonly service = new UsersService()) {}

  list(tenantId: string) {
    return ok(this.service.list(tenantId));
  }

  getById(id: string) {
    return ok(this.service.getById(id));
  }

  create(payload: unknown) {
    return ok(this.service.create(validateCreateUserInput(payload)));
  }

  update(id: string, payload: unknown) {
    return ok(this.service.update(id, validateUpdateUserInput(payload)));
  }
}
