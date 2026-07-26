import { Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="group inline-flex items-center gap-2.5" aria-label="GreenCart beranda">
      <span className="grid size-10 place-items-center rounded-[14px] bg-forest-900 text-white shadow-brand transition-transform group-hover:-rotate-6">
        <Leaf size={19} strokeWidth={2.4} aria-hidden="true" />
      </span>
      {!compact && (
        <span className="font-display text-xl font-bold tracking-[-0.04em] text-forest-950">
          Green<span className="text-leaf-600">Cart</span>
        </span>
      )}
    </Link>
  );
}
