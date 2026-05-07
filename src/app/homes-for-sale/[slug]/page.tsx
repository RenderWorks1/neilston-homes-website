import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { KeyFactsBar } from '@/components/developments/KeyFactsBar';
import { PhotoCarousel } from '@/components/developments/PhotoCarousel';
import { FloorPlans } from '@/components/developments/FloorPlans';
import { BuildProgressIndicator } from '@/components/developments/BuildProgressIndicator';
import { LocationMap } from '@/components/developments/LocationMap';
import { EnquiryForm } from '@/components/developments/EnquiryForm';
import { StatusBadge } from '@/components/developments/StatusBadge';
import { AvailableHomesTable } from '@/components/developments/AvailableHomesTable';
import { developments } from '@/lib/mock-data';
import { getDevelopment } from '@/lib/developments';
import { getBuildUpdate } from '@/lib/build-updates';
import { getAvailableHomesForDevelopment } from '@/lib/homes';

export function generateStaticParams() {
  return developments.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const d = await getDevelopment(params.slug);
  if (!d) return { title: 'Development' };
  return {
    title: d.name,
    description: `${d.totalHomes} ${d.homeType} in ${d.suburb}. ${d.bedrooms} bedroom homes from Neilston Homes.`,
  };
}

export default async function DevelopmentDetailPage({ params }: { params: { slug: string } }) {
  const d = await getDevelopment(params.slug);
  if (!d) notFound();
  const [buildUpdate, availableHomes] = await Promise.all([
    getBuildUpdate(d.slug),
    getAvailableHomesForDevelopment(d.slug),
  ]);
  const showHomesTable = d.status !== 'Completed' && availableHomes.length > 0;

  return (
    <article>
      <section className="grid md:grid-cols-2 bg-white">
        <div className="px-6 md:px-12 lg:px-20 py-14 md:py-20 flex flex-col justify-center">
          <StatusBadge status={d.status} className="mb-6 self-start" />
          <h1 className="page-title">{d.name}</h1>
          <p className="mt-3 text-lg text-charcoal">{d.address}</p>
          <div className="mt-10">
            <KeyFactsBar development={d} />
          </div>
        </div>
        <div className="relative aspect-[4/3] md:aspect-auto min-h-[420px]">
          <Image
            src={d.heroImage}
            alt={d.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          <a href="#enquire" className="absolute bottom-6 right-6 btn-enquire">
            Enquire Now
          </a>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-grey-light">
        <Container>
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12">
            <div className="prose-neilston max-w-none">
              <h2 className="section-title mb-6">About {d.name}</h2>
              {d.description.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div>
              <h3 className="font-serif italic text-copper text-2xl md:text-3xl mb-5">Selling Points</h3>
              <ul className="space-y-3">
                {d.sellingPoints.map((s, i) => (
                  <li key={i} className="flex gap-3 text-charcoal">
                    <span className="text-copper font-bold">—</span> {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <h2 className="section-title mb-8">Photos & Renders</h2>
          <PhotoCarousel images={d.gallery} alt={d.name} />
        </Container>
      </section>

      {showHomesTable && (
        <section className="py-16 md:py-24 bg-grey-light">
          <Container>
            <h2 className="section-title mb-3">Available Homes</h2>
            <p className="text-charcoal mb-8">
              {availableHomes.length} of {d.totalHomes} {availableHomes.length === 1 ? 'home' : 'homes'} still available — pricing live from our sales system.
            </p>
            <AvailableHomesTable homes={availableHomes} />
          </Container>
        </section>
      )}

      {d.floorPlans.length > 0 && (
        <section className="py-16 md:py-24 bg-grey-light">
          <Container>
            <h2 className="section-title mb-8">Floor Plans</h2>
            <FloorPlans plans={d.floorPlans} />
          </Container>
        </section>
      )}

      <section className="py-16 md:py-24">
        <Container>
          <h2 className="section-title mb-8">Build Progress</h2>
          <BuildProgressIndicator buildUpdate={buildUpdate} developmentSlug={d.slug} />
        </Container>
      </section>

      <section className="py-16 md:py-24 bg-grey-light">
        <Container>
          <h2 className="section-title mb-8">Location</h2>
          <LocationMap development={d} />
        </Container>
      </section>

      <section id="enquire" className="py-16 md:py-24">
        <Container>
          <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 items-start">
            <div>
              <h2 className="section-title mb-4">Enquire about {d.name}</h2>
              <p className="text-charcoal leading-relaxed max-w-md">
                Leave your details and one of our team will be in touch within one business day with more information, floor plans, and available homes.
              </p>
            </div>
            <div className="bg-white border border-border-grey p-6 md:p-10">
              <EnquiryForm developmentSlug={d.slug} developmentName={d.name} />
            </div>
          </div>
        </Container>
      </section>
    </article>
  );
}
