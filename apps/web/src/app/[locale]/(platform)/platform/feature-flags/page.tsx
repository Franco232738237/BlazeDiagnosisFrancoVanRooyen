import { AppShell } from '@/components/common/appShell';
import {
  FeatureChecklist,
  FeatureMetricGrid,
  FeatureRecordList,
} from '@/components/common/featureDashboard';
import { platformChecklist, platformFeatureFlagRecords } from '@/lib/sampleWorkflows';

export default function PlatformFeatureFlagsPage() {
  return (
    <AppShell
      description="Tenant-specific rollout switches and future plan-based feature controls."
      surface="platform"
      title="Feature flags"
    >
      <FeatureMetricGrid
        items={[
          { description: 'Available to pilot tenants', label: 'Enabled flags', value: '2' },
          { description: 'Limited rollout', label: 'Pilot flags', value: '1' },
          { description: 'Blocked pending review', label: 'Disabled flags', value: '1' },
          { description: 'Require billing tier mapping', label: 'Plan gated', value: '3' },
        ]}
      />

      <FeatureRecordList
        description="Feature flags let the platform roll out production functionality safely across tenant pilots."
        items={platformFeatureFlagRecords}
        title="Feature rollout controls"
      />

      <FeatureChecklist
        description="Next work should persist flags by tenant and connect them to route/API authorization."
        items={platformChecklist}
        title="Feature flag checklist"
      />
    </AppShell>
  );
}
