import { MapPin, Check } from 'lucide-react';
import type { Development } from '@/lib/types';

export function LocationMap({ development }: { development: Development }) {
  const { lat, lng } = development.location;
  const src = `https://www.google.com/maps?ll=${lat},${lng}&z=15&t=m&output=embed`;
  const amenities = development.amenities ?? [];

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
      <div className="space-y-5">
        <h3 className="font-serif italic text-copper text-2xl md:text-3xl">
          {amenities.length ? 'Amenities Nearby' : `About ${development.suburb}`}
        </h3>
        {amenities.length ? (
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
            {amenities.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-charcoal text-sm md:text-base">
                <Check className="text-copper shrink-0 mt-0.5" size={18} strokeWidth={2.5} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          development.suburbHighlights.map((text, i) => (
            <p key={i} className="text-charcoal text-sm md:text-base leading-relaxed">
              {text}
            </p>
          ))
        )}
      </div>
    </div>
  );
}
