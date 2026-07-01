import { AppShell } from '@/components/common/appShell';
import {
  FeatureChecklist,
  FeatureMetricGrid,
  FeatureRecordList,
} from '@/components/common/featureDashboard';
import { customerChecklist, customerQuoteRecords } from '@/lib/sampleWorkflows';

export default function CustomerQuotesPage() {
  return (
    <AppShell
      description="Mobile-first quote review with item-level approvals and approval history."
      surface="customer"
      title="Quotes"
    >
      <FeatureMetricGrid
        items={[
          { description: 'Waiting for a decision', label: 'Approval required', value: '1' },
          { description: 'Approved quote items', label: 'Approved', value: '8' },
          { description: 'Declined but retained in history', label: 'Declined', value: '2' },
          { description: 'Available to invoice', label: 'Approved value', value: 'R4,920' },
        ]}
      />

      <FeatureRecordList
        description="Customers can review active quotes and see exactly which items are approved, declined, or still pending."
        items={customerQuoteRecords}
        title="Quote decisions"
      />

      <FeatureChecklist
        description="The next step is connecting this surface to the production quote approval workflow."
        items={customerChecklist}
        title="Quote approval checklist"
      />
    </AppShell>
  );
}
