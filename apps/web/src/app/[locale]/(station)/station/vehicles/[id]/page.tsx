import type { Route } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { AppShell } from '@/components/common/appShell';
import { Button } from '@/components/ui/button';
import { VehicleDetail } from '@/components/vehicles/vehicleDetail';

type VehicleDetailPageProps = {
  params: Promise<{
    id: string;
    locale: string;
  }>;
};

export default async function StationVehicleDetailPage({
  params,
}: VehicleDetailPageProps) {
  const { id, locale } = await params;

  return (
    <AppShell
      actions={
        <Button asChild variant="secondary">
          <Link href={`/${locale}/station/vehicles` as Route}>
            <ArrowLeft className="size-4" />
            Back to vehicles
          </Link>
        </Button>
      }
      description="Review vehicle identity, ownership context, and linked workshop activity."
      surface="station"
      title="Vehicle profile"
    >
      <VehicleDetail vehicleId={id} />
    </AppShell>
  );
}
