import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { DevelopmentCard, developmentSpecsLine } from '@/components/developments/DevelopmentCard';
import { DevelopmentGrid } from '@/components/developments/DevelopmentGrid';
import { activeDevelopments } from '@/lib/developments';

export const metadata: Metadata = {
  title: 'Homes for Sale',
  description: 'Current Neilston Homes developments available to buy across Auckland.',
};

export default async function HomesForSalePage() {
  const items = await activeDevelopments();
  return (
    <div className="py-20 md:py-24">
      <Container>
        <SectionHeading as="h1" title="Homes for Sale">
          <p>A current view of every Neilston Homes development available to buy. Click through for floor plans, renders, build progress and to enquire.</p>
        </SectionHeading>
        {items.length === 0 ? (
          <p className="text-charcoal">New developments launching soon. Get in touch to be the first to hear.</p>
        ) : (
          <DevelopmentGrid count={items.length}>
            {items.map((d) => (
              <DevelopmentCard
                key={d.slug}
                image={d.heroImage}
                name={d.name}
                address={d.address}
                specs={developmentSpecsLine(d)}
                status={d.status}
                href={`/developments/${d.slug}`}
              />
            ))}
          </DevelopmentGrid>
        )}
      </Container>
    </div>
  );
}
