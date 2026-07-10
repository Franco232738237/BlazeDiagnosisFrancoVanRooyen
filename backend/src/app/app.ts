import { AuthController } from '../modules/auth/controllers/auth.controller';
import { CustomersController } from '../modules/customers/controllers/customers.controller';
import { JobsController } from '../modules/jobs/controllers/jobs.controller';
import { QuotesController } from '../modules/quotes/controllers/quotes.controller';
import { TenantsController } from '../modules/tenants/controllers/tenants.controller';
import { UsersController } from '../modules/users/controllers/users.controller';
import { VehiclesController } from '../modules/vehicles/controllers/vehicles.controller';

export function createApp() {
  const auth = new AuthController();
  const customers = new CustomersController();
  const vehicles = new VehiclesController();
  const jobs = new JobsController();
  const quotes = new QuotesController();
  const tenants = new TenantsController();
  const users = new UsersController();

  return {
    controllers: { auth, customers, vehicles, jobs, quotes, tenants, users },
    listen: (port: string | number, cb: () => void) => {
      cb();
      return {
        port,
        routes: [
          '/api/auth/login',
          '/api/auth/me',
          '/api/auth/refresh',
          '/api/auth/logout',
          '/api/auth/forgot-password',
          '/api/auth/reset-password',
          '/api/customers',
          '/api/vehicles',
          '/api/jobs',
          '/api/quotes',
          '/api/tenants',
          '/api/users',
        ],
      };
    },
  };
}
