import { DashboardService } from '../services/dashboard.service';

describe('dashboard module', () => {
  it('should create dashboard service', () => {
    const service = new DashboardService();

    expect(service).toBeDefined();
  });
});
