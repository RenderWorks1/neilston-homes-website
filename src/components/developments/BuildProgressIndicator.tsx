import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { BuildUpdate } from '@/lib/types';

export function BuildProgressIndicator({
  buildUpdate,
  developmentSlug,
}: {
  buildUpdate?: BuildUpdate;
  developmentSlug: string;
}) {
  if (!buildUpdate || buildUpdate.updates.length === 0) {
    return (
      <div className="bg-grey-light border border-border-grey p-8 text-center text-charcoal/70">
        Build updates for this development will be posted here monthly.
      </div>
    );
  }

  const latest = buildUpdate.updates[0];
  return (
    <div className="bg-grey-light p-6 md:p-10 border border-border-grey">
      <div className="flex items-start justify-between gap-6 flex-wrap mb-6">
        <div>
          <div className="eyebrow mb-2">Latest Build Progress</div>
          <h3 className="font-serif italic text-copper text-2xl md:text-3xl">{latest.month}</h3>
        </div>
        <Link
          href={`/build-updates/${developmentSlug}`}
          className="inline-flex items-center gap-2 text-copper font-semibold hover:text-copper-dark"
        >
          View all updates <ArrowRight size={18} />
        </Link>
      </div>
      <ul className="grid md:grid-cols-2 gap-x-8 gap-y-2 list-disc pl-5 text-charcoal">
        {latest.workCompleted.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
