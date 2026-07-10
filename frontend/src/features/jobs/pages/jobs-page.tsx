import { AppShell } from '../../../components/layout/AppShell';
import { JobsPanel } from '../components/JobsPanel';

export default function JobsPage() {
  return (
    <AppShell title="Jobs">
      <JobsPanel />
    </AppShell>
  );
}
