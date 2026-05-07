import { DevelopmentCard, developmentSpecsLine } from '@/components/developments/DevelopmentCard';
import { DevelopmentGrid } from '@/components/developments/DevelopmentGrid';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Container } from '@/components/ui/Container';
import { FadeIn } from '@/components/ui/FadeIn';
import { featuredDevelopments } from '@/lib/developments';

export async function FeaturedDevelopments() {
  const items = await featuredDevelopments();
  if (!items.length) return null;

  return (
    <section className="py-20 md:py-28 bg-grey-light">
      <Container>
        <FadeIn>
          <SectionHeading title="Featured Developments">
            <p>Our latest homes — designed for modern Kiwi living and built to a standard we stand behind.</p>
          </SectionHeading>
        </FadeIn>
        <DevelopmentGrid count={items.length}>
          {items.map((d, i) => (
            <FadeIn key={d.slug} delay={i * 0.12} className="h-full">
              <DevelopmentCard
                image={d.heroImage}
                name={d.name}
                address={d.address}
                specs={developmentSpecsLine(d)}
                status={d.status}
                statusLabel={d.statusLabel}
                buildPhase={d.buildPhase}
                href={`/homes-for-sale/${d.slug}`}
              />
            </FadeIn>
          ))}
        </DevelopmentGrid>
      </Container>
    </section>
  );
}
