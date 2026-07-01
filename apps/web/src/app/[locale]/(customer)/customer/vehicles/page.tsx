import { AppShell } from '@/components/common/appShell';
import {
  FeatureChecklist,
  FeatureMetricGrid,
  FeatureRecordList,
} from '@/components/common/featureDashboard';
import { customerChecklist, customerVehicleRecords } from '@/lib/sampleWorkflows';

export default function CustomerVehiclesPage() {
  return (
    <AppShell
      description="Customer-owned vehicle profiles with registration, mileage, and service-history entry points."
      surface="customer"
      title="Vehicles"
    >
      <FeatureMetricGrid
        items={[
          { description: 'Linked to this account', label: 'Vehicles', value: '2' },
          { description: 'Currently inside the workshop', label: 'In service', value: '1' },
          { description: 'Documents and inspection photos', label: 'Files', value: '8' },
          { description: 'Upcoming reminders', label: 'Next services', value: '1' },
        ]}
      />

      <FeatureRecordList
        description="Customers see clear vehicle summaries and can jump directly into service progress or history."
        items={customerVehicleRecords}
        title="My vehicles"
      />

      <FeatureChecklist
        description="Production work still required after auth and tenant data are connected."
        items={customerChecklist}
        title="Customer vehicle readiness"
      />
    </AppShell>
  );
}
