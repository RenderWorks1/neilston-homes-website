import { Home, BedDouble, Bath, Car, CalendarClock } from 'lucide-react';
import type { Development } from '@/lib/types';

export function KeyFactsBar({ development }: { development: Development }) {
  const facts = [
    { icon: Home, label: 'Homes', value: `${development.totalHomes}` },
    { icon: BedDouble, label: 'Bedrooms', value: development.bedrooms },
    { icon: Bath, label: 'Bathrooms', value: development.bathrooms },
    { icon: Car, label: 'Car Parks', value: development.carParks },
    { icon: CalendarClock, label: 'Completion', value: development.completionEstimate },
  ];
  return (
    <ul className="grid grid-cols-2 md:grid-cols-5 gap-6">
      {facts.map((f) => (
        <li key={f.label} className="flex flex-col gap-2">
          <f.icon className="text-copper" size={32} strokeWidth={1.5} />
          <span className="text-xs uppercase tracking-wider text-charcoal/70">{f.label}</span>
          <span className="font-semibold text-charcoal">{f.value}</span>
        </li>
      ))}
    </ul>
  );
}
