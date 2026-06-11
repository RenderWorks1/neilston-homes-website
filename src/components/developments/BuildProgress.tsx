import { PhotoCarousel } from './PhotoCarousel';
import type { MonthlyUpdate } from '@/lib/types';

export function BuildProgress({ updates, name }: { updates: MonthlyUpdate[]; name: string }) {
  return (
    <div className="space-y-12 md:space-y-16">
      {updates.map((u) => (
        <div key={u.month}>
          <h3 className="uppercase tracking-[0.15em] font-bold text-charcoal text-base md:text-lg mb-5">
            {u.month.toUpperCase()}
          </h3>
          {u.photos.length > 0 && <PhotoCarousel images={u.photos} alt={`${name} — ${u.month}`} />}
          {u.workCompleted.length > 0 && (
            <div className="mt-6">
              <h4 className="font-semibold text-charcoal mb-2">Work completed in the month:</h4>
              <ul className="list-disc pl-6 space-y-1 text-charcoal">
                {u.workCompleted.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
