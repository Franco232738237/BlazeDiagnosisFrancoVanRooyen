import { AppShell } from '../../../components/layout/AppShell';
import { VehiclesPanel } from '../components/VehiclesPanel';

export default function VehiclesPage() {
  return (
    <AppShell title="Vehicles">
      <VehiclesPanel />
    </AppShell>
  );
}
