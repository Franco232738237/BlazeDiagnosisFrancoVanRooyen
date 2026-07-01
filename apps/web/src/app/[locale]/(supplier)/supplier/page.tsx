import { Clock3, PackageCheck, PackageX, Send } from 'lucide-react';

import { AppShell } from '@/components/common/appShell';
import { FeatureChecklist, FeatureRecordList } from '@/components/common/featureDashboard';
import { StatCard } from '@/components/common/statCard';
import { supplierChecklist, supplierOrderRecords, supplierRequestRecords } from '@/lib/sampleWorkflows';

export default function SupplierDashboardPage() {
  return (
    <AppShell
      description="Supplier workspace for incoming parts requests, quote responses, accepted orders, and delivery exceptions."
      surface="supplier"
      title="Parts supplier dashboard"
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard description="Needs availability and price" icon={<Send className="size-4" />} label="New requests" value="5" />
        <StatCard description="Awaiting station review" icon={<Clock3 className="size-4" />} label="Pending responses" value="2" />
        <StatCard description="Ready for dispatch" icon={<PackageCheck className="size-4" />} label="Orders to dispatch" value="3" />
        <StatCard description="Past original ETA" icon={<PackageX className="size-4" />} label="Delayed deliveries" value="1" />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <FeatureRecordList
          description="Requests ranked by urgency and missing supplier response data."
          items={supplierRequestRecords}
          title="Incoming requests"
        />
        <FeatureRecordList
          description="Accepted orders and delivery work that needs supplier action."
          items={supplierOrderRecords}
          title="Fulfilment queue"
        />
      </div>

      <FeatureChecklist
        description="Supplier pages are now usable surfaces while persistence and notification work is completed."
        items={supplierChecklist}
        title="Supplier production checklist"
      />
    </AppShell>
  );
}
