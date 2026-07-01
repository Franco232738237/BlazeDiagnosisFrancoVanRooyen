import Link from 'next/link';

import { StatCard } from '@/components/common/statCard';
import { StatusBadge } from '@/components/common/statusBadge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type {
  FeatureChecklistItem,
  FeatureMetric,
  FeatureRecord,
} from '@/types/featureDashboard';

export function FeatureMetricGrid({ items }: { items: FeatureMetric[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <StatCard
          description={item.description}
          key={item.label}
          label={item.label}
          value={item.value}
        />
      ))}
    </div>
  );
}

export function FeatureRecordList({
  description,
  items,
  title,
}: {
  description?: string;
  items: FeatureRecord[];
  title: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent>
        <div className="divide-y divide-border rounded-xl border border-border bg-card">
          {items.map((item) => (
            <div
              className="grid gap-4 p-4 sm:grid-cols-[1fr_auto] sm:items-center"
              key={item.id}
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  {item.status ? (
                    <StatusBadge tone={item.statusTone}>{item.status}</StatusBadge>
                  ) : null}
                </div>
                <p className="text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
                {item.meta ? (
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {item.meta}
                  </p>
                ) : null}
              </div>
              {item.href ? (
                <Button asChild size="sm" variant="outline">
                  <Link href={item.href}>{item.actionLabel ?? 'Open'}</Link>
                </Button>
              ) : null}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function FeatureChecklist({
  description,
  items,
  title,
}: {
  description?: string;
  items: FeatureChecklistItem[];
  title: string;
}) {
  return (
    <Card variant="muted">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent>
        <ul className="grid gap-3 text-sm sm:grid-cols-2">
          {items.map((item) => (
            <li className="flex items-start gap-3" key={item.label}>
              <span
                aria-hidden="true"
                className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full border border-border bg-card text-xs font-bold"
              >
                {item.completed ? '✓' : '•'}
              </span>
              <span className="leading-6 text-muted-foreground">{item.label}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
