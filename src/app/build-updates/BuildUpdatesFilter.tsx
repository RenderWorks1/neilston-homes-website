'use client';

import { useState, useMemo } from 'react';
import { DevelopmentCard } from '@/components/developments/DevelopmentCard';
import { DevelopmentGrid } from '@/components/developments/DevelopmentGrid';
import { cn } from '@/lib/utils';
import type { Development } from '@/lib/types';

type Filter = 'all' | 'active' | 'completed';

export function BuildUpdatesFilter({ developments }: { developments: Development[] }) {
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = useMemo(() => {
    if (filter === 'active') return developments.filter((d) => d.status === 'Available' || d.status === 'Sold Out');
    if (filter === 'completed') return developments.filter((d) => d.status === 'Completed');
    return developments;
  }, [filter, developments]);

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-10">
        {(['all', 'active', 'completed'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              'px-5 py-2 border text-sm font-semibold uppercase tracking-wider transition-colors',
              filter === f
                ? 'bg-copper text-white border-copper'
                : 'bg-white text-charcoal border-border-grey hover:border-copper',
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <DevelopmentGrid count={filtered.length}>
        {filtered.map((d) => (
          <DevelopmentCard
            key={d.slug}
            image={d.heroImage}
            name={d.name}
            address={d.address}
            status={d.status}
            statusLabel={d.statusLabel}
            href={`/build-updates/${d.slug}`}
          />
        ))}
      </DevelopmentGrid>
    </>
  );
}
