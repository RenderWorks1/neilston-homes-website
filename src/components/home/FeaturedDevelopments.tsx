import { DevelopmentCard, developmentSpecsLine } from '@/components/developments/DevelopmentCard';
import { DevelopmentGrid } from '@/components/developments/DevelopmentGrid';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Container } from '@/components/ui/Container';
import { featuredDevelopments } from '@/lib/mock-data';

export function FeaturedDevelopments() {
  const items = featuredDevelopments();
  if (!items.length) return null;

  return (
    <section className="py-20 md:py-28 bg-grey-light">
      <Container>
        <SectionHeading title="Featured Developments">
          <p>Our latest homes — designed for modern Kiwi living and built to a standard we stand behind.</p>
        </SectionHeading>
        <DevelopmentGrid count={items.length}>
          {items.map((d) => (
            <DevelopmentCard
              key={d.slug}
              image={d.heroImage}
              name={d.name}
              address={d.address}
              specs={developmentSpecsLine(d)}
              status={d.status}
              href={`/homes-for-sale/${d.slug}`}
            />
          ))}
        </DevelopmentGrid>
      </Container>
    </section>
  );
}
