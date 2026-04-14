import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { DevelopmentCard, developmentSpecsLine } from '@/components/developments/DevelopmentCard';
import { DevelopmentGrid } from '@/components/developments/DevelopmentGrid';
import { completedDevelopments } from '@/lib/mock-data';

export const metadata: Metadata = {
  title: 'Completed Homes',
  description: 'A record of Neilston Homes developments delivered to Kiwi families across Auckland.',
};

export default function CompletedHomesPage() {
  const items = completedDevelopments();
  return (
    <div className="py-20 md:py-24">
      <Container>
        <SectionHeading as="h1" title="Completed Homes">
          <p>Delivered on time and to a standard we stand behind. Every completed Neilston development — with estimated and actual completion dates for full transparency.</p>
        </SectionHeading>
        <DevelopmentGrid count={items.length}>
          {items.map((d) => (
            <DevelopmentCard
              key={d.slug}
              image={d.heroImage}
              name={d.name}
              address={d.address}
              specs={developmentSpecsLine(d)}
              estimatedCompletion={d.completionEstimate}
              actualCompletion={d.actualCompletion}
              href={`/build-updates/${d.slug}`}
            />
          ))}
        </DevelopmentGrid>
      </Container>
    </div>
  );
}
