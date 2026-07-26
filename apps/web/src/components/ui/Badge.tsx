import type { ReactNode } from 'react';

export function Badge({ children, tone = 'green' }: { children: ReactNode; tone?: 'green' | 'gold' }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}
