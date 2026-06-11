import { PhotoCarousel } from './PhotoCarousel';
import { PhotoGallery } from './PhotoGallery';
import type { MonthlyUpdate } from '@/lib/types';

interface Props {
  updates: MonthlyUpdate[];
  name: string;
  variant?: 'list' | 'table';
}

export function BuildProgress({ updates, name, variant = 'table' }: Props) {
  if (variant === 'table') {
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-charcoal align-top">
          <thead>
            <tr className="text-xs uppercase tracking-wider text-charcoal/70 text-left">
              <th className="font-semibold py-3 pr-6 border-b border-border-grey whitespace-nowrap">Month</th>
              <th className="font-semibold py-3 pr-6 border-b border-border-grey">Work Completed</th>
              <th className="font-semibold py-3 border-b border-border-grey w-[38%]">Photos</th>
            </tr>
          </thead>
          <tbody>
            {updates.map((u) => (
              <tr key={u.month} className="align-top border-b border-border-grey">
                <td className="py-6 pr-6 font-semibold text-copper whitespace-nowrap">
                  {u.month}
                </td>
                <td className="py-6 pr-6">
                  {u.workCompleted.length > 0 ? (
                    <ul className="list-disc pl-5 space-y-1">
                      {u.workCompleted.map((w, i) => (
                        <li key={i}>{w}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-charcoal/50">—</span>
                  )}
                </td>
                <td className="py-6">
                  {u.photos.length > 0 && (
                    <PhotoGallery images={u.photos} alt={`${name} — ${u.month}`} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

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
