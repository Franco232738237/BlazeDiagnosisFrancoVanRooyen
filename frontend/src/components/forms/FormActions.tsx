import type { PropsWithChildren } from 'react';

export function FormActions({ children }: PropsWithChildren) {
  return <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>{children}</div>;
}
