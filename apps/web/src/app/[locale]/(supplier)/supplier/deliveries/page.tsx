import { AppShell } from '@/components/common/appShell';
import {
  FeatureChecklist,
  FeatureMetricGrid,
  FeatureRecordList,
} from '@/components/common/featureDashboard';
import { supplierChecklist, supplierDeliveryRecords } from '@/lib/sampleWorkflows';

export default function SupplierDeliveriesPage() {
  return (
    <AppShell
      description="Delivery ETA, proof of delivery, courier details, and delay notes."
      surface="supplier"
      title="Supplier deliveries"
    >
      <FeatureMetricGrid
        items={[
          { description: 'Currently with courier', label: 'In transit', value: '4' },
          { description: 'Need delay reason', label: 'Delayed', value: '1' },
          { description: 'Awaiting station confirmation', label: 'POD pending', value: '2' },
          { description: 'Delivered this week', label: 'Delivered', value: '12' },
        ]}
      />

      <FeatureRecordList
        description="Supplier delivery tracking keeps station staff and customers aware of parts ETAs before service completion is affected."
        items={supplierDeliveryRecords}
        title="Delivery status queue"
      />

      <FeatureChecklist
        description="Production readiness requires ETA change history, proof-of-delivery storage, and customer-visible delay rules."
        items={supplierChecklist}
        title="Delivery implementation checklist"
      />
    </AppShell>
  );
}
