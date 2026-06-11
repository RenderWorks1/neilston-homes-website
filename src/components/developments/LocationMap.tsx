import { Check } from 'lucide-react';
import type { Development } from '@/lib/types';

export function LocationMap({ development }: { development: Development }) {
  const { lat, lng } = development.location;
  // Use a place query so Google renders a real marker that stays locked to the
  // location through pan/zoom (a CSS overlay pin would drift off the address).
  const query = development.address?.trim()
    ? encodeURIComponent(development.address)
    : `${lat},${lng}`;
  const src = `https://www.google.com/maps?q=${query}&z=16&output=embed`;
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
        />
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
