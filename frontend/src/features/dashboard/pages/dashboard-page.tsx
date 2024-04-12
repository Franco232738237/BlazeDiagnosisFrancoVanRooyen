import { AppShell } from '../../../components/layout/AppShell';
import { DashboardPanel } from '../components/DashboardPanel';

export default function DashboardPage() {
  return (
    <AppShell title="Workshop Dashboard">
      <DashboardPanel />
    </AppShell>
  );
}
