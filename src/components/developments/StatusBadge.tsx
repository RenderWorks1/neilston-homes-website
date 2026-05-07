import type { DevelopmentStatus } from '@/lib/types';
import { cn } from '@/lib/utils';

const styles: Record<DevelopmentStatus, string> = {
  Available: 'bg-status-available',
  'Under Offer': 'bg-status-under-offer',
  Sold: 'bg-status-sold',
  'Sold Out': 'bg-status-sold',
  Completed: 'bg-charcoal',
};

export function StatusBadge({
  status,
  label,
  className,
}: {
  status: DevelopmentStatus;
  label?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-block text-white uppercase text-[11px] tracking-[0.12em] font-semibold rounded-full px-3 py-1',
        styles[status],
        className,
      )}
    >
      {label ?? status}
    </span>
  );
}
