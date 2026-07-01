import type { Route } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { AppShell } from '@/components/common/appShell';
import { CustomerDetail } from '@/components/customers/customerDetail';
import { Button } from '@/components/ui/button';

type CustomerDetailPageProps = {
  params: Promise<{
    id: string;
    locale: string;
  }>;
};

export default async function StationCustomerDetailPage({
  params,
}: CustomerDetailPageProps) {
  const { id, locale } = await params;

  return (
    <AppShell
      actions={
        <Button asChild variant="secondary">
          <Link href={`/${locale}/station/customers` as Route}>
            <ArrowLeft className="size-4" />
            Back to customers
          </Link>
        </Button>
      }
      description="Review customer contact details, service context, and linked operational activity."
      surface="station"
      title="Customer profile"
    >
      <CustomerDetail customerId={id} />
    </AppShell>
  );
}
