import { AppShell } from '@/components/common/appShell';
import {
  FeatureChecklist,
  FeatureMetricGrid,
  FeatureRecordList,
} from '@/components/common/featureDashboard';
import { supplierChecklist, supplierQuoteRecords } from '@/lib/sampleWorkflows';

export default function SupplierQuotesPage() {
  return (
    <AppShell
      description="Supplier quote responses, availability, price, ETA, and alternative parts."
      surface="supplier"
      title="Supplier quotes"
    >
      <FeatureMetricGrid
        items={[
          { description: 'Waiting for station approval', label: 'Pending quotes', value: '2' },
          { description: 'Accepted by station', label: 'Accepted', value: '3' },
          { description: 'Past response expiry', label: 'Expired', value: '1' },
          { description: 'Average quoted margin', label: 'Margin', value: '18%' },
        ]}
      />

      <FeatureRecordList
        description="Supplier users can review what they quoted, update ETA, and manage alternatives before order conversion."
        items={supplierQuoteRecords}
        title="Quote response queue"
      />

      <FeatureChecklist
        description="This flow should become database-backed with audit logs for every price and ETA change."
        items={supplierChecklist}
        title="Supplier quote checklist"
      />
    </AppShell>
  );
}
