import type { Home } from '@/lib/types';

function formatPrice(price?: number): string {
  if (typeof price !== 'number' || !Number.isFinite(price)) return 'Price on application';
  return new Intl.NumberFormat('en-NZ', {
    style: 'currency',
    currency: 'NZD',
    maximumFractionDigits: 0,
  }).format(price);
}

export function AvailableHomesTable({ homes }: { homes: Home[] }) {
  if (homes.length === 0) {
    return (
      <p className="text-charcoal">
        No homes currently available — get in touch to register your interest in the next release.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-charcoal">
        <thead>
          <tr className="text-xs uppercase tracking-wider text-charcoal/70">
            <th className="text-left font-semibold py-3 pr-4 border-b border-border-grey">Lot</th>
            <th className="text-left font-semibold py-3 pr-4 border-b border-border-grey">Address</th>
            <th className="text-left font-semibold py-3 pr-4 border-b border-border-grey">Beds</th>
            <th className="text-left font-semibold py-3 pr-4 border-b border-border-grey">Baths</th>
            <th className="text-left font-semibold py-3 pr-4 border-b border-border-grey">Carpark</th>
            <th className="text-right font-semibold py-3 pl-4 border-b border-border-grey">Price</th>
          </tr>
        </thead>
        <tbody>
          {homes.map((h) => (
            <tr key={h.id} className="hover:bg-grey-light/50 transition-colors">
              <td className="py-3 pr-4 border-b border-border-grey font-semibold">{h.lot}</td>
              <td className="py-3 pr-4 border-b border-border-grey">{h.address || '—'}</td>
              <td className="py-3 pr-4 border-b border-border-grey">{h.bedrooms ?? '—'}</td>
              <td className="py-3 pr-4 border-b border-border-grey">{h.bathrooms ?? '—'}</td>
              <td className="py-3 pr-4 border-b border-border-grey">{h.carparks ?? '—'}</td>
              <td className="py-3 pl-4 border-b border-border-grey text-right font-semibold text-copper">
                {formatPrice(h.price)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
