import { Download, CalendarClock } from 'lucide-react';
import type { Development } from '@/lib/types';

const downloads = [
  { key: 'infoPackPdf', label: 'Download Info Pack' },
  { key: 'floorPlansPdf', label: 'Download Floor Plans' },
  { key: 'coloursSpecsPdf', label: 'Download Colours & Specs' },
] as const;

export function DevelopmentResources({ development }: { development: Development }) {
  const available = downloads
    .map((d) => ({ ...d, href: development[d.key] }))
    .filter((d): d is typeof d & { href: string } => Boolean(d.href));
  const completion = development.actualCompletion || development.completionEstimate;
  const showCompletion = completion && completion !== 'TBC';

  if (!available.length && !showCompletion) return null;

  return (
    <aside className="border border-border-grey bg-white p-6 md:p-8 flex flex-col gap-4">
      {available.map((d) => (
        <a
          key={d.key}
          href={d.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between gap-4 border border-border-grey px-4 py-3 hover:border-copper hover:bg-copper/5 transition-colors"
        >
          <span className="font-semibold text-charcoal text-sm">{d.label}</span>
          <Download className="text-copper shrink-0" size={18} />
        </a>
      ))}
      {showCompletion && (
        <div className="flex items-start gap-3 pt-1">
          <CalendarClock className="text-copper shrink-0 mt-0.5" size={20} strokeWidth={1.75} />
          <div>
            <div className="text-xs uppercase tracking-wider text-charcoal/70">Expected Completion</div>
            <div className="font-semibold text-charcoal">{completion}</div>
          </div>
        </div>
      )}
    </aside>
  );
}
