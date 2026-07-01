import { AppShell } from '@/components/common/appShell';
import {
  FeatureChecklist,
  FeatureMetricGrid,
  FeatureRecordList,
} from '@/components/common/featureDashboard';
import { customerChecklist, customerServiceRecords } from '@/lib/sampleWorkflows';

export default function CustomerServicesPage() {
  return (
    <AppShell
      description="Customer-visible service milestones, collection readiness, and parts-related delays."
      surface="customer"
      title="Services"
    >
      <FeatureMetricGrid
        items={[
          { description: 'Service currently active', label: 'Active services', value: '1' },
          { description: 'Needs customer approval', label: 'Action required', value: '1' },
          { description: 'Supplier delivery dependency', label: 'Parts ETA', value: '1' },
          { description: 'Finished service records', label: 'Completed', value: '14' },
        ]}
      />

      <FeatureRecordList
        description="This view should reduce phone calls by showing what is happening, what is blocking progress, and what the customer must do next."
        items={customerServiceRecords}
        title="Current and recent services"
      />

      <FeatureChecklist
        description="Keep customer statuses plain-language and separate from internal workshop statuses."
        items={customerChecklist}
        title="Service visibility checklist"
      />
    </AppShell>
  );
}
