'use client';

import { useState, useMemo } from 'react';
import { Container } from '@/components/ui/Container';
import { DevelopmentCard } from '@/components/developments/DevelopmentCard';
import { DevelopmentGrid } from '@/components/developments/DevelopmentGrid';
import { developments } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

type Filter = 'all' | 'active' | 'completed';

export default function BuildUpdatesHub() {
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = useMemo(() => {
    if (filter === 'active') return developments.filter((d) => d.status !== 'Completed');
    if (filter === 'completed') return developments.filter((d) => d.status === 'Completed');
    return developments;
  }, [filter]);

  return (
    <div className="py-20 md:py-24">
      <Container>
        <h1 className="page-title mb-3">Build Updates</h1>
        <p className="max-w-2xl text-charcoal mb-10">Monthly photo updates and progress notes from every Neilston Homes project — active and completed.</p>

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
              href={`/build-updates/${d.slug}`}
            />
          ))}
        </DevelopmentGrid>
      </Container>
    </div>
  );
}
