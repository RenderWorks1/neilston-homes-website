import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { PhotoCarousel } from '@/components/developments/PhotoCarousel';
import { buildUpdates, getBuildUpdate, getDevelopment } from '@/lib/mock-data';

export function generateStaticParams() {
  return buildUpdates.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const d = getDevelopment(params.slug);
  return { title: d ? `Build Update — ${d.name}` : 'Build Update' };
}

export default function BuildUpdatePage({ params }: { params: { slug: string } }) {
  const development = getDevelopment(params.slug);
  const update = getBuildUpdate(params.slug);
  if (!development || !update) notFound();

  const isCompleted = development.status === 'Completed';

  return (
    <div className="py-20 md:py-24">
      <Container>
        <div className="eyebrow mb-3">Build Update</div>
        <h1 className="page-title">{development.name}</h1>
        <p className="mt-2 text-charcoal">{development.address}</p>
        <div className="h-px bg-copper w-24 mt-6 mb-10" />

        {isCompleted && (
          <div className="bg-copper text-white p-6 md:p-8 grid md:grid-cols-2 gap-6 mb-12">
            <div>
              <div className="eyebrow !text-white/80 mb-1">Expected Completion</div>
              <div className="font-serif italic text-3xl">{development.completionEstimate}</div>
            </div>
            <div className="md:border-l md:border-white/30 md:pl-6">
              <div className="eyebrow !text-white/80 mb-1">Actual Completion</div>
              <div className="font-serif italic text-3xl">{development.actualCompletion}</div>
            </div>
          </div>
        )}

        <div className="space-y-16 md:space-y-24">
          {update.updates.map((u) => (
            <section key={u.month}>
              <h2 className="uppercase tracking-[0.15em] font-bold text-charcoal text-lg mb-6">
                {u.month.toUpperCase()}
              </h2>
              <PhotoCarousel images={u.photos} alt={`${development.name} — ${u.month}`} />
              <div className="mt-8">
                <h3 className="font-semibold text-charcoal mb-3">Work completed in the month:</h3>
                <ul className="list-disc pl-6 space-y-1 text-charcoal">
                  {u.workCompleted.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
        </div>
      </Container>
    </div>
  );
}
