import { AppShell } from '@/components/common/appShell';
import {
  FeatureChecklist,
  FeatureMetricGrid,
  FeatureRecordList,
} from '@/components/common/featureDashboard';
import { supplierChecklist, supplierOrderRecords } from '@/lib/sampleWorkflows';

export default function SupplierOrdersPage() {
  return (
    <AppShell
      description="Accepted parts orders awaiting dispatch, in transit, delayed, or delivered."
      surface="supplier"
      title="Supplier orders"
    >
      <FeatureMetricGrid
        items={[
          { description: 'Ready for dispatch', label: 'To dispatch', value: '3' },
          { description: 'Already collected', label: 'In transit', value: '4' },
          { description: 'Late vs original ETA', label: 'Delayed', value: '1' },
          { description: 'Completed this week', label: 'Delivered', value: '12' },
        ]}
      />

      <FeatureRecordList
        description="Orders show supplier work that has already been accepted by a service station and now needs delivery execution."
        items={supplierOrderRecords}
        title="Order fulfilment queue"
      />

      <FeatureChecklist
        description="Next production work should add status mutation buttons and proof-of-delivery uploads."
        items={supplierChecklist}
        title="Order implementation checklist"
      />
    </AppShell>
  );
}
