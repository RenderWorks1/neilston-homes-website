import Image from 'next/image';
import Link from 'next/link';
import { StatusBadge } from './StatusBadge';
import type { Development, DevelopmentStatus } from '@/lib/types';

interface Props {
  image: string;
  name: string;
  address: string;
  specs?: string;
  status?: DevelopmentStatus;
  statusLabel?: string;
  buildPhase?: string;
  estimatedCompletion?: string;
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
  estimatedCompletion,
  actualCompletion,
  href,
}: Props) {
  return (
    <Link
      href={href}
      className="group bg-white border border-border-grey flex flex-col overflow-hidden transition-all hover:shadow-lg hover:border-copper/40 h-full"
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-grey-light">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {status && (
          <div className="absolute top-4 right-4">
            <StatusBadge status={status} label={statusLabel} />
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
        {(estimatedCompletion || actualCompletion) && (
          <dl className="mt-2 text-sm space-y-1">
            {estimatedCompletion && (
              <div className="flex justify-between gap-3">
                <dt className="text-charcoal/70">Estimated Completion</dt>
                <dd className="text-charcoal font-medium">{estimatedCompletion}</dd>
              </div>
            )}
            {actualCompletion && (
              <div className="flex justify-between gap-3">
                <dt className="text-charcoal/70">Actual Completion</dt>
                <dd className="text-copper font-semibold">{actualCompletion}</dd>
              </div>
            )}
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
