import Image from 'next/image';
import { Download } from 'lucide-react';
import type { FloorPlan } from '@/lib/types';

export function FloorPlans({ plans }: { plans: FloorPlan[] }) {
  if (!plans.length) return null;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {plans.map((plan) => (
        <figure key={plan.label} className="bg-white border border-border-grey">
          <div className="relative aspect-[4/3] bg-grey-light">
            <Image src={plan.image} alt={plan.label} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain p-6" />
          </div>
          <figcaption className="p-5 flex items-center justify-between gap-4 border-t border-border-grey">
            <span className="font-serif italic text-copper text-xl">{plan.label}</span>
            {plan.pdf ? (
              <a
                href={plan.pdf}
                className="inline-flex items-center gap-2 text-charcoal hover:text-copper text-sm font-semibold"
                download
              >
                <Download size={16} /> Download PDF
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 text-charcoal/40 text-sm font-semibold">
                <Download size={16} /> PDF coming soon
              </span>
            )}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
