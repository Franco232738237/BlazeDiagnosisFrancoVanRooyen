import { AppShell } from '@/components/common/appShell';
import {
  FeatureChecklist,
  FeatureMetricGrid,
  FeatureRecordList,
} from '@/components/common/featureDashboard';
import { stationChecklist, stationReportMetrics } from '@/lib/sampleWorkflows';

const reportRecords = [
  {
    description: 'Tracks quotes sent, approved, partially approved, declined, and converted into invoices.',
    id: 'report-quotes',
    meta: 'Approval rate: 71% · Avg approved value: R4,280',
    status: 'Available',
    statusTone: 'success' as const,
    title: 'Quote approval report',
  },
  {
    description: 'Shows jobs delayed by customer approval, parts ETA, quality check, and invoice/payment blockers.',
    id: 'report-delays',
    meta: 'Current delayed jobs: 3 · Oldest blocker: 2 days',
    status: 'Available',
    statusTone: 'success' as const,
    title: 'Delayed jobs report',
  },
  {
    description: 'Highlights supplier response time, delivery accuracy, and late delivery reasons.',
    id: 'report-supplier',
    meta: 'Avg response: 2h 14m · Delivery reliability: 84%',
    status: 'Pilot',
    statusTone: 'info' as const,
    title: 'Supplier performance report',
  },
];

export default function StationReportsPage() {
  return (
    <AppShell
      description="Operational reports for revenue, delayed jobs, quotes, suppliers, and invoice exposure."
      surface="station"
      title="Reports"
    >
      <FeatureMetricGrid items={stationReportMetrics} />

      <FeatureRecordList
        description="Reports are intentionally action-oriented so service-station users can identify what needs attention."
        items={reportRecords}
        title="Available reports"
      />

      <FeatureChecklist
        description="Reporting must become database-backed before production pilot sign-off."
        items={stationChecklist}
        title="Reporting implementation checklist"
      />
    </AppShell>
  );
}
