import { MapPin } from 'lucide-react';
import type { Development } from '@/lib/types';

export function LocationMap({ development }: { development: Development }) {
  const { lat, lng } = development.location;
  const src = `https://www.google.com/maps?ll=${lat},${lng}&z=15&t=m&output=embed`;

  return (
    <div className="grid md:grid-cols-2 gap-10 items-start">
      <div className="relative aspect-[4/3] bg-grey-light border border-border-grey overflow-hidden">
        <iframe
          src={src}
          title={`Map of ${development.name}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full border-0"
          style={{ filter: 'grayscale(1) brightness(0.98) contrast(0.95)' }}
        />
        <div className="absolute inset-0 pointer-events-none bg-copper/10 mix-blend-multiply" />
        <div
          className="absolute left-1/2 top-1/2 pointer-events-none"
          style={{ transform: 'translate(-50%, -100%)' }}
        >
          <MapPin className="w-10 h-10 text-copper" fill="currentColor" strokeWidth={1.5} stroke="white" />
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="font-serif italic text-copper text-2xl md:text-3xl">About {development.suburb}</h3>
        {development.suburbHighlights.map((text, i) => (
          <p key={i} className="text-charcoal text-sm md:text-base leading-relaxed">
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}
