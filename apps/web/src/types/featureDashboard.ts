import type { Route } from 'next';

import type { StatusTone } from '@/types/ui';

export type FeatureMetric = {
  description?: string;
  label: string;
  value: string;
};

export type FeatureRecord = {
  actionLabel?: string;
  description: string;
  href?: Route;
  id: string;
  meta?: string;
  status?: string;
  statusTone?: StatusTone;
  title: string;
};

export type FeatureChecklistItem = {
  completed?: boolean;
  label: string;
};
