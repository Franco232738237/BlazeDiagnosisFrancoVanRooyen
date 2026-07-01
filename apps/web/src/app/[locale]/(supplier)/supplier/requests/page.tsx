import { AppShell } from '@/components/common/appShell';
import {
  FeatureChecklist,
  FeatureMetricGrid,
  FeatureRecordList,
} from '@/components/common/featureDashboard';
import { supplierChecklist, supplierRequestRecords } from '@/lib/sampleWorkflows';

export default function SupplierRequestsPage() {
  return (
    <AppShell
      description="Incoming station parts requests that need price, stock, and delivery confirmation."
      surface="supplier"
      title="Supplier requests"
    >
      <FeatureMetricGrid
        items={[
          { description: 'Need supplier response', label: 'New requests', value: '5' },
          { description: 'Opened but not quoted', label: 'Viewed', value: '2' },
          { description: 'Station needs today', label: 'Urgent', value: '3' },
          { description: 'Alternative suggestions', label: 'Alternatives', value: '4' },
        ]}
      />

      <FeatureRecordList
        description="Suppliers can prioritize incoming requests and respond with price, stock, ETA, delivery fee, and alternatives."
        items={supplierRequestRecords}
        title="Incoming request queue"
      />

      <FeatureChecklist
        description="Next production step is turning request responses into persisted supplier quote records."
        items={supplierChecklist}
        title="Supplier request checklist"
      />
    </AppShell>
  );
}
