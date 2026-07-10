import { JobsService } from '../services/jobs.service';

describe('Jobs Service', () => {

  const service = new JobsService();

  it('should create a job', () => {

    const job = service.create({

      tenantId: 'tenant-1',

      customerId: 'customer-1',

      vehicleId: 'vehicle-1',

      customerComplaint: 'Vehicle will not start'

    });

    expect(job.status).toBe('DRAFT');

    expect(job.referenceNumber).toContain('JOB');

  });

});
