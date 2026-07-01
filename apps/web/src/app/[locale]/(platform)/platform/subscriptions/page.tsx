import { AppShell } from '@/components/common/appShell';
import {
  FeatureChecklist,
  FeatureMetricGrid,
  FeatureRecordList,
} from '@/components/common/featureDashboard';
import { platformChecklist, platformSubscriptionRecords } from '@/lib/sampleWorkflows';

export default function PlatformSubscriptionsPage() {
  return (
    <AppShell
      description="Tenant plan status, billing readiness, trials, and suspension workflows."
      surface="platform"
      title="Subscriptions"
    >
      <FeatureMetricGrid
        items={[
          { description: 'Validation stage accounts', label: 'Pilot tenants', value: '1' },
          { description: 'Prepaid or invoiced customers', label: 'Paid tenants', value: '0' },
          { description: 'Trials in onboarding', label: 'Trial tenants', value: '1' },
          { description: 'Billing issues', label: 'Suspended', value: '0' },
        ]}
      />

      <FeatureRecordList
        description="This page prepares the SaaS billing model even before payment-provider integration is enabled."
        items={platformSubscriptionRecords}
        title="Subscription readiness"
      />

      <FeatureChecklist
        description="Billing remains disabled until plan rules, invoices, provider callbacks, and support processes are ready."
        items={platformChecklist}
        title="Subscription implementation checklist"
      />
    </AppShell>
  );
}
