import { AppShell } from '../../../components/layout/AppShell';
import { AuthPanel } from '../components/AuthPanel';

export default function AuthPage() {
  return (
    <AppShell title="Authentication">
      <AuthPanel />
    </AppShell>
  );
}
