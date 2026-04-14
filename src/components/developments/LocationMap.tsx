import type { Development } from '@/lib/types';

export function LocationMap({ development }: { development: Development }) {
  const { lat, lng } = development.location;
  const query = encodeURIComponent(development.address);
  const src = `https://www.google.com/maps?q=${query}&ll=${lat},${lng}&z=15&output=embed`;

  return (
    <div className="grid md:grid-cols-2 gap-10 items-start">
      <div className="aspect-[4/3] bg-grey-light border border-border-grey overflow-hidden">
        <iframe
          src={src}
          title={`Map of ${development.name}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full border-0"
        />
      </div>
      <div className="space-y-4">
        <h3 className="font-serif italic text-copper text-2xl md:text-3xl">About {development.suburb}</h3>
        {development.suburbHighlights.map((text, i) => (
          <p key={i} className="text-charcoal leading-relaxed">
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}
