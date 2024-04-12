import { AppShell } from '../../../components/layout/AppShell';
import { QuotesPanel } from '../components/QuotesPanel';

export default function QuotesPage() {
  return (
    <AppShell title="Quotes">
      <QuotesPanel />
    </AppShell>
  );
}
