import { AppShell } from '../../../components/layout/AppShell';
import { CustomersPanel } from '../components/CustomersPanel';

export default function CustomersPage() {
  return (
    <AppShell title="Customers">
      <CustomersPanel />
    </AppShell>
  );
}
