import { AppShell } from '@/components/common/appShell';
import {
  FeatureChecklist,
  FeatureMetricGrid,
  FeatureRecordList,
} from '@/components/common/featureDashboard';
import { platformChecklist, platformTenantRecords } from '@/lib/sampleWorkflows';

export default function PlatformTenantsPage() {
  return (
    <AppShell
      description="Platform tenant directory with branding, domains, status, and configuration entry points."
      surface="platform"
      title="Tenants"
    >
      <FeatureMetricGrid
        items={[
          { description: 'Ready for operational use', label: 'Active tenants', value: '1' },
          { description: 'Need setup completion', label: 'Onboarding', value: '1' },
          { description: 'Custom domain candidates', label: 'Domains', value: '2' },
          { description: 'Support checks required', label: 'Needs review', value: '1' },
        ]}
      />

      <FeatureRecordList
        description="Platform administrators can track which service stations are configured, active, blocked, or ready for pilot use."
        items={platformTenantRecords}
        title="Tenant directory"
      />

      <FeatureChecklist
        description="Production work should add tenant creation, suspension, subscription, and support controls."
        items={platformChecklist}
        title="Tenant management checklist"
      />
    </AppShell>
  );
}
