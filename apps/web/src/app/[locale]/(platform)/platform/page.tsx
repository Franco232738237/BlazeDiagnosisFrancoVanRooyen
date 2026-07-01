import { Activity, Building2, Flag, ShieldAlert } from 'lucide-react';

import { AppShell } from '@/components/common/appShell';
import { FeatureChecklist, FeatureRecordList } from '@/components/common/featureDashboard';
import { StatCard } from '@/components/common/statCard';
import { platformChecklist, platformTenantRecords, platformUsageRecords } from '@/lib/sampleWorkflows';

export default function PlatformDashboardPage() {
  return (
    <AppShell
      description="SaaS operations dashboard for tenant lifecycle, subscription readiness, feature flags, and platform audit controls."
      surface="platform"
      title="Platform admin dashboard"
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard description="Provisioned tenants" icon={<Building2 className="size-4" />} label="Active tenants" value="1" />
        <StatCard description="Onboarding pipeline" icon={<Activity className="size-4" />} label="Trial tenants" value="1" />
        <StatCard description="Requires billing/support review" icon={<ShieldAlert className="size-4" />} label="Suspended tenants" value="0" />
        <StatCard description="Tenant-controlled rollout" icon={<Flag className="size-4" />} label="Feature flags" value="3" />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <FeatureRecordList
          description="Tenant health and setup actions for platform owners."
          items={platformTenantRecords}
          title="Tenant operations"
        />
        <FeatureRecordList
          description="Usage signals that show pilot readiness and support risk."
          items={platformUsageRecords}
          title="SaaS usage signals"
        />
      </div>

      <FeatureChecklist
        description="This page is now a usable SaaS operations surface while production telemetry is connected."
        items={platformChecklist}
        title="Platform production checklist"
      />
    </AppShell>
  );
}
