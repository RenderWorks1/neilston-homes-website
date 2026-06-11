import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { KeyFactsBar } from './KeyFactsBar';
import { StatusBadge } from './StatusBadge';
import { PhotoGallery } from './PhotoGallery';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { Testimonials } from './Testimonials';
import { BuildProgress } from './BuildProgress';
import type { BuildUpdate, Development } from '@/lib/types';

export function CompletedDevelopment({
  development: d,
  buildUpdate,
}: {
  development: Development;
  buildUpdate: BuildUpdate | undefined;
}) {
  const completionDate = d.actualCompletion || d.completionEstimate;
  const hasGallery = d.gallery?.length > 0;
  const hasRenderReality = (d.renderReality?.length ?? 0) > 0;
  const hasTestimonials = (d.testimonials?.length ?? 0) > 0;
  const hasBuildUpdates = Boolean(buildUpdate && buildUpdate.updates.length > 0);

  const sections: { key: string; content: React.ReactNode }[] = [];
  if (hasGallery) {
    sections.push({
      key: 'photos',
      content: (
        <>
          <h2 className="section-title mb-8">Completed Photos</h2>
          <PhotoGallery images={d.gallery} alt={d.name} />
        </>
      ),
    });
  }
  if (hasRenderReality) {
    sections.push({
      key: 'render-reality',
      content: (
        <>
          <h2 className="section-title mb-3">Render vs Reality</h2>
          <p className="text-charcoal mb-8 max-w-2xl">Drag to compare the original render with the finished home.</p>
          <BeforeAfterSlider pairs={d.renderReality!} alt={d.name} />
        </>
      ),
    });
  }
  if (hasTestimonials) {
    sections.push({
      key: 'testimonials',
      content: (
        <>
          <h2 className="section-title mb-10 text-center">What Our Homeowners Say</h2>
          <Testimonials testimonials={d.testimonials!} />
        </>
      ),
    });
  }
  if (hasBuildUpdates) {
    sections.push({
      key: 'build-progress',
      content: (
        <>
          <h2 className="section-title mb-8">Build Updates</h2>
          <BuildProgress updates={buildUpdate!.updates} name={d.name} />
        </>
      ),
    });
  }

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
          {d.heroVideo ? (
            <video
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster={d.heroImage || undefined}
              aria-label={`${d.name} completed`}
            >
              <source src={d.heroVideo} type="video/mp4" />
            </video>
          ) : d.heroImage ? (
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
        </div>
      </section>

      {completionDate && (
        <section className="bg-copper text-white">
          <Container>
            <div className="py-8 md:py-10">
              <div className="eyebrow !text-white/80 mb-1">Completion Date</div>
              <div className="font-serif italic text-2xl md:text-3xl">{completionDate}</div>
            </div>
          </Container>
        </section>
      )}

      {sections.map((s, idx) => (
        <section
          key={s.key}
          className={`py-16 md:py-24 ${idx % 2 === 0 ? 'bg-grey-light' : 'bg-white'}`}
        >
          <Container>{s.content}</Container>
        </section>
      ))}
    </article>
  );
}
