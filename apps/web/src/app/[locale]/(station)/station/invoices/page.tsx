import type { Route } from 'next';
import Link from 'next/link';
import { FilePlus2 } from 'lucide-react';

import { AppShell } from '@/components/common/appShell';
import { FeatureMetricGrid } from '@/components/common/featureDashboard';
import { StatusBadge } from '@/components/common/statusBadge';
import {
  ResponsiveTable,
  tableCellClassName,
  tableHeadClassName,
} from '@/components/data-display';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatCurrencyFromCents, stationInvoiceRows } from '@/lib/sampleWorkflows';

export default function StationInvoicesPage() {
  const outstandingTotal = stationInvoiceRows
    .filter((invoice) => invoice.status !== 'PAID')
    .reduce((total, invoice) => total + invoice.totalCents, 0);

  return (
    <AppShell
      actions={
        <Button asChild variant="accent">
          <Link href={'/en/station/quotes' as Route}>
            <FilePlus2 className="size-4" />
            Create from quote
          </Link>
        </Button>
      }
      description="Issue branded invoices, track payment status, and follow up on outstanding workshop revenue."
      surface="station"
      title="Invoices"
    >
      <FeatureMetricGrid
        items={[
          { description: 'Invoices needing payment follow-up', label: 'Outstanding', value: '2' },
          { description: 'Total unpaid value', label: 'Exposure', value: formatCurrencyFromCents(outstandingTotal) },
          { description: 'Past due date', label: 'Overdue', value: '1' },
          { description: 'Settled this week', label: 'Paid', value: '1' },
        ]}
      />

      <Card>
        <CardHeader>
          <CardTitle>Station invoice register</CardTitle>
          <CardDescription>
            This keeps invoice management inside the shared station layout with responsive table behavior and consistent card styling.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveTable>
            <thead>
              <tr className={tableHeadClassName}>
                <th className={tableCellClassName}>Invoice</th>
                <th className={tableCellClassName}>Customer</th>
                <th className={tableCellClassName}>Vehicle</th>
                <th className={tableCellClassName}>Job card</th>
                <th className={tableCellClassName}>Due</th>
                <th className={`${tableCellClassName} text-right`}>Total</th>
                <th className={tableCellClassName}>Status</th>
                <th className={`${tableCellClassName} text-right`}>Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {stationInvoiceRows.map((invoice) => (
                <tr className="transition hover:bg-muted/40" key={invoice.id}>
                  <td className={`${tableCellClassName} font-mono font-semibold`}>
                    {invoice.invoiceNumber}
                  </td>
                  <td className={tableCellClassName}>{invoice.customer}</td>
                  <td className={`${tableCellClassName} text-muted-foreground`}>
                    {invoice.vehicle}
                  </td>
                  <td className={`${tableCellClassName} font-mono text-muted-foreground`}>
                    {invoice.jobCard}
                  </td>
                  <td className={`${tableCellClassName} text-muted-foreground`}>
                    {invoice.dueDate}
                  </td>
                  <td className={`${tableCellClassName} text-right font-mono font-semibold`}>
                    {formatCurrencyFromCents(invoice.totalCents)}
                  </td>
                  <td className={tableCellClassName}>
                    <StatusBadge tone={invoice.statusTone}>{invoice.status}</StatusBadge>
                  </td>
                  <td className={`${tableCellClassName} text-right`}>
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/en/station/invoices/${invoice.id}` as Route}>
                        View
                      </Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </ResponsiveTable>
        </CardContent>
      </Card>
    </AppShell>
  );
}
