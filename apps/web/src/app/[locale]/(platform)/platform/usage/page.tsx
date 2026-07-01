import { AppShell } from '@/components/common/appShell';
import {
  FeatureChecklist,
  FeatureMetricGrid,
  FeatureRecordList,
} from '@/components/common/featureDashboard';
import { platformChecklist, platformUsageRecords } from '@/lib/sampleWorkflows';

export default function PlatformUsagePage() {
  return (
    <AppShell
      description="SaaS usage, adoption, storage, and operational telemetry for production readiness."
      surface="platform"
      title="Usage metrics"
    >
      <FeatureMetricGrid
        items={[
          { description: 'Across all tenants', label: 'Monthly active users', value: '42' },
          { description: 'Created this month', label: 'Job cards', value: '118' },
          { description: 'Tenant file storage', label: 'Storage', value: '1.8 GB' },
          { description: 'In-app events generated', label: 'Notifications', value: '426' },
        ]}
      />

      <FeatureRecordList
        description="Usage metrics help platform owners decide whether a tenant is ready for paid rollout, support, or follow-up."
        items={platformUsageRecords}
        title="Usage health signals"
      />

      <FeatureChecklist
        description="Production telemetry must be server-side, tenant-scoped, and exportable for support and billing."
        items={platformChecklist}
        title="Usage implementation checklist"
      />
    </AppShell>
  );
}
