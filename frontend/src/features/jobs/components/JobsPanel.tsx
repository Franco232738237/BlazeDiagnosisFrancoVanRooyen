import { StatusBadge } from '../../../components/status/StatusBadge';
import { Timeline } from '../../../components/timeline/Timeline';
import type { JobRecord } from '../types/jobs.types';

const demoJob: JobRecord = {
  id: 'job_demo_1',
  tenantId: 'tenant_demo',
  customerId: 'cust_demo_1',
  vehicleId: 'veh_demo_1',
  referenceNumber: 'JOB-1001',
  status: 'AWAITING_CUSTOMER_APPROVAL',
  customerComplaint: 'Brake pads worn and service light on.',
  diagnosisSummary: 'Front pads and minor service required.',
  statusHistory: [
    {
      id: 'jsh_demo_1',
      fromStatus: 'QUOTATION_IN_PROGRESS',
      toStatus: 'AWAITING_CUSTOMER_APPROVAL',
      changedByUserId: 'user_admin_demo',
      createdAt: new Date().toISOString(),
    },
  ],
};

export function JobsPanel() {
  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <div style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <strong>{demoJob.referenceNumber}</strong>
          <StatusBadge value={demoJob.status} />
        </div>
        <p>{demoJob.customerComplaint}</p>
        <p>{demoJob.diagnosisSummary}</p>
      </div>
      <Timeline
        items={(demoJob.statusHistory ?? []).map((item) => ({
          id: item.id,
          title: `${item.fromStatus ?? 'START'} → ${item.toStatus}`,
          subtitle: `Changed by ${item.changedByUserId}`,
        }))}
      />
    </div>
  );
}
