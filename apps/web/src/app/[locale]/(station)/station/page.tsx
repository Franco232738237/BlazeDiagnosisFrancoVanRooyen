import { CircleDollarSign, FileClock, PackageSearch, Wrench } from 'lucide-react';

import { AppShell } from '@/components/common/appShell';
import { FeatureChecklist, FeatureRecordList } from '@/components/common/featureDashboard';
import { StatCard } from '@/components/common/statCard';
import { stationChecklist, stationJobRecords, stationPartsRecords } from '@/lib/sampleWorkflows';

export default function StationDashboardPage() {
  return (
    <AppShell
      description="Operational command centre for workshop queues, approvals, parts blockers, and invoicing."
      surface="station"
      title="Service-station dashboard"
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard description="Across all service stages" icon={<Wrench className="size-4" />} label="Open jobs" value="18" />
        <StatCard description="Customer action required" icon={<FileClock className="size-4" />} label="Awaiting approval" value="6" />
        <StatCard description="Supplier dependency" icon={<PackageSearch className="size-4" />} label="Awaiting parts" value="5" />
        <StatCard description="Requires follow-up" icon={<CircleDollarSign className="size-4" />} label="Outstanding invoices" value="R38,420" />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <FeatureRecordList
          description="The most urgent job cards for floor managers, mechanics, and reception staff."
          items={stationJobRecords.slice(0, 2)}
          title="Workshop attention queue"
        />
        <FeatureRecordList
          description="Parts blockers that may affect customer completion dates and quote decisions."
          items={stationPartsRecords}
          title="Parts attention queue"
        />
      </div>

      <FeatureChecklist
        description="The dashboard is now a functional entry point while the production data layer is connected."
        items={stationChecklist}
        title="Station production checklist"
      />
    </AppShell>
  );
}
