import { Container } from '@/components/ui/Container';
import { formatNZD } from '@/lib/utils';
import type { BedPrice } from '@/lib/homes';

export function AvailabilityBar({
  percentSold,
  bedPrices,
}: {
  percentSold: number;
  bedPrices: BedPrice[];
}) {
  const availabilityLabel = percentSold > 0 ? `${percentSold}% Sold` : 'Now Selling';
  const priced = bedPrices.filter((b) => typeof b.from === 'number');

  return (
    <section className="bg-copper text-white">
      <Container>
        <div className="py-8 md:py-10 grid gap-8 md:grid-cols-[auto_1fr] md:items-center md:gap-16">
          <div>
            <div className="eyebrow !text-white/80 mb-1">Availability</div>
            <div className="font-serif italic text-2xl md:text-3xl">{availabilityLabel}</div>
          </div>
          {priced.length > 0 && (
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-12 gap-y-6 md:justify-end">
              {priced.map((b) => (
                <div key={b.beds}>
                  <div className="eyebrow !text-white/80 mb-1">{b.beds} Bedroom from</div>
                  <div className="font-serif italic text-2xl md:text-3xl">{formatNZD(b.from!)}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
