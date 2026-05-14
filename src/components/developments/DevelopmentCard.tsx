import Image from 'next/image';
import Link from 'next/link';
import type { Development, DevelopmentStatus } from '@/lib/types';

const statusBgColors: Record<DevelopmentStatus, string> = {
  Available: 'bg-copper',
  'Under Offer': 'bg-status-under-offer',
  Sold: 'bg-status-sold',
  'Sold Out': 'bg-status-sold',
  Completed: 'bg-charcoal',
};

const statusLabels: Record<DevelopmentStatus, string> = {
  Available: 'For Sale',
  'Under Offer': 'Under Offer',
  Sold: 'Sold Out',
  'Sold Out': 'Sold Out',
  Completed: 'Completed',
};

interface Props {
  image: string;
  name: string;
  address: string;
  specs?: string;
  status?: DevelopmentStatus;
  statusLabel?: string;
  buildPhase?: string;
  actualCompletion?: string;
  href: string;
}

export function DevelopmentCard({
  image,
  name,
  address,
  specs,
  status,
  statusLabel,
  buildPhase,
  actualCompletion,
  href,
}: Props) {
  return (
    <Link
      href={href}
      className="group bg-white border border-border-grey flex flex-col overflow-hidden transition-all hover:shadow-lg hover:border-copper/40 h-full"
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-grey-light">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-grey-light border-2 border-dashed border-border-grey">
            <span className="text-charcoal/50 text-sm uppercase tracking-wider font-semibold">No Image Yet</span>
          </div>
        )}
        {status && (
          <div
            className={`absolute top-5 right-0 ${statusBgColors[status]} text-white text-[11px] uppercase tracking-[0.15em] font-bold py-2 pl-6 pr-4 shadow-md`}
            style={{ clipPath: 'polygon(0.65rem 0%, 100% 0%, 100% 100%, 0.65rem 100%, 0% 50%)' }}
          >
            {statusLabels[status]}
          </div>
        )}
        {statusLabel && (
          <div className="absolute top-4 left-4">
            <span className="inline-block bg-white/95 text-charcoal uppercase text-[11px] tracking-[0.12em] font-semibold rounded-full px-3 py-1 shadow-sm">
              {statusLabel}
            </span>
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col gap-2 flex-grow">
        <h3 className="card-title">{name}</h3>
        <p className="text-charcoal">{address}</p>
        {specs && <p className="text-charcoal/80 text-sm">{specs}</p>}
        {buildPhase && (
          <p className="text-copper text-xs uppercase tracking-wider font-semibold">{buildPhase}</p>
        )}
        {actualCompletion && (
          <dl className="mt-2 text-sm space-y-1">
            <div className="flex justify-between gap-3">
              <dt className="text-charcoal/70">Completion Date</dt>
              <dd className="text-copper font-semibold">{actualCompletion}</dd>
            </div>
          </dl>
        )}
        <div className="flex-grow" />
        <div className="mt-5 btn-learn-more">Learn More</div>
      </div>
    </Link>
  );
}

export function developmentSpecsLine(dev: Development) {
  return `${dev.totalHomes} Homes; ${dev.bedrooms} Bedrooms`;
}
