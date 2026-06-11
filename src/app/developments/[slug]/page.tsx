import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { KeyFactsBar } from '@/components/developments/KeyFactsBar';
import { PhotoCarousel } from '@/components/developments/PhotoCarousel';
import { FloorPlans } from '@/components/developments/FloorPlans';
import { LocationMap } from '@/components/developments/LocationMap';
import { EnquiryForm } from '@/components/developments/EnquiryForm';
import { StatusBadge } from '@/components/developments/StatusBadge';
import { AvailableHomesTable } from '@/components/developments/AvailableHomesTable';
import { AvailabilityBar } from '@/components/developments/AvailabilityBar';
import { DevelopmentResources } from '@/components/developments/DevelopmentResources';
import { BuildProgress } from '@/components/developments/BuildProgress';
import { CompletedDevelopment } from '@/components/developments/CompletedDevelopment';
import { developments } from '@/lib/mock-data';
import { getDevelopment } from '@/lib/developments';
import { getBuildUpdate } from '@/lib/build-updates';
import { getAvailableHomesForDevelopment, getSalesSummary } from '@/lib/homes';

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

export default async function DevelopmentPage({ params }: { params: { slug: string } }) {
  const d = await getDevelopment(params.slug);
  if (!d) notFound();

  const [buildUpdate, availableHomes, salesSummary] = await Promise.all([
    getBuildUpdate(d.slug),
    getAvailableHomesForDevelopment(d.slug),
    getSalesSummary(d.slug),
  ]);

  const isCompleted = d.status === 'Completed';
  if (isCompleted) {
    return <CompletedDevelopment development={d} buildUpdate={buildUpdate} />;
  }

  const showEnquiry = !isCompleted;
  const showHomesTable = !isCompleted && availableHomes.length > 0;
  const hasDescription = d.description?.some((p) => p.trim().length > 0);
  const hasGallery = d.gallery?.length > 0;
  const hasFloorPlans = d.floorPlans?.length > 0;
  const hasSitePlan = Boolean(d.sitePlanImage);
  const hasBuildUpdates = buildUpdate && buildUpdate.updates.length > 0;
  const hasLocation = Boolean(d.location?.lat && d.location?.lng);

  return (
    <article>
      <section className="grid md:grid-cols-2 bg-white">
        <div className="px-8 md:px-16 lg:px-24 py-20 md:py-28 lg:py-32 flex flex-col justify-center">
          <StatusBadge status={d.status} className="mb-6 self-start" />
          <h1 className="font-serif italic text-copper text-3xl md:text-4xl lg:text-5xl leading-[1.05]">{d.name}</h1>
          <p className="mt-3 text-base md:text-lg text-charcoal">{d.address}</p>
          <div className="mt-10">
            <KeyFactsBar development={d} />
          </div>
        </div>
        <div className="relative aspect-[4/3] md:aspect-auto min-h-[420px] bg-grey-light">
          {d.heroImage ? (
            <Image
              src={d.heroImage}
              alt={d.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center border-2 border-dashed border-border-grey">
              <span className="text-charcoal/50 text-sm uppercase tracking-wider font-semibold">No Image Yet</span>
            </div>
          )}
          {showEnquiry && (
            <a href="#enquire" className="absolute bottom-6 right-6 btn-enquire">
              Enquire Now
            </a>
          )}
        </div>
      </section>

      <AvailabilityBar percentSold={salesSummary.percentSold} bedPrices={salesSummary.bedPrices} />

      {(() => {
        const sections: { key: string; id?: string; content: React.ReactNode }[] = [];
        if (hasDescription) {
          sections.push({
            key: 'about',
            content: (
              <div className="grid lg:grid-cols-3 gap-10 lg:gap-16 items-start">
                <div className="prose-neilston lg:col-span-2">
                  <h2 className="section-title mb-6">About {d.name}</h2>
                  {d.description.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <DevelopmentResources development={d} />
              </div>
            ),
          });
        }
        if (hasGallery) {
          sections.push({
            key: 'gallery',
            content: (
              <>
                <h2 className="section-title mb-8">Photos & Renders</h2>
                <PhotoCarousel images={d.gallery} alt={d.name} />
              </>
            ),
          });
        }
        if (hasSitePlan) {
          sections.push({
            key: 'site-plan',
            content: (
              <>
                <h2 className="section-title mb-3">Site Plan</h2>
                <p className="text-charcoal mb-8 max-w-2xl">
                  {salesSummary.available} of {salesSummary.total} homes available.
                </p>
                <div className="relative w-full aspect-[16/10] bg-grey-light border border-border-grey overflow-hidden">
                  <Image
                    src={d.sitePlanImage!}
                    alt={`${d.name} site plan`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 80vw"
                    className="object-contain"
                  />
                </div>
              </>
            ),
          });
        }
        if (showHomesTable) {
          sections.push({
            key: 'homes',
            content: (
              <>
                <h2 className="section-title mb-3">Available Homes</h2>
                <p className="text-charcoal mb-8">
                  {availableHomes.length} of {d.totalHomes} {availableHomes.length === 1 ? 'home' : 'homes'} still available. Pricing live from our sales system.
                </p>
                <AvailableHomesTable homes={availableHomes} />
              </>
            ),
          });
        }
        if (hasFloorPlans) {
          sections.push({
            key: 'floorplans',
            content: (
              <>
                <h2 className="section-title mb-8">Floor Plans</h2>
                <FloorPlans plans={d.floorPlans} />
              </>
            ),
          });
        }
        if (hasBuildUpdates) {
          sections.push({
            key: 'build-progress',
            content: (
              <>
                <h2 className="section-title mb-8">Build Progress</h2>
                <BuildProgress updates={buildUpdate!.updates} name={d.name} />
              </>
            ),
          });
        }
        if (hasLocation) {
          sections.push({
            key: 'location',
            content: (
              <>
                <h2 className="section-title mb-8">Location</h2>
                <LocationMap development={d} />
              </>
            ),
          });
        }
        if (showEnquiry) {
          sections.push({
            key: 'enquire',
            id: 'enquire',
            content: (
              <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 items-start">
                <div>
                  <h2 className="section-title mb-6">Enquire about {d.name}</h2>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative w-20 h-20 shrink-0 rounded-full overflow-hidden bg-copper/10">
                      <Image
                        src="/images/teampics/SaraDaji.jpg"
                        alt="Sara, Operations Manager at Neilston Homes"
                        fill
                        sizes="80px"
                        className="object-cover"
                        style={{ objectPosition: 'center 20%' }}
                      />
                    </div>
                    <div>
                      <div className="font-serif italic text-copper text-xl">Sara</div>
                      <div className="text-charcoal/70 text-sm uppercase tracking-wider">Operations Manager</div>
                    </div>
                  </div>
                  <p className="text-charcoal leading-relaxed max-w-md">
                    Leave your details and Sara will be in touch within one business day with more
                    information, floor plans, and available homes.
                  </p>
                </div>
                <div className="bg-white border border-border-grey p-6 md:p-10">
                  <EnquiryForm developmentSlug={d.slug} developmentName={d.name} />
                </div>
              </div>
            ),
          });
        }
        return sections.map((s, idx) => (
          <section
            key={s.key}
            id={s.id}
            className={`py-16 md:py-24 ${idx % 2 === 0 ? 'bg-grey-light' : 'bg-white'}`}
          >
            <Container>{s.content}</Container>
          </section>
        ));
      })()}
    </article>
  );
}
