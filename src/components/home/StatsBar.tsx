import { Container } from '@/components/ui/Container';
import { FadeIn } from '@/components/ui/FadeIn';

export function StatsBar({ delivered, underConstruction }: { delivered: number; underConstruction: number }) {
  return (
    <section className="bg-grey-dark text-white py-16">
      <Container>
        <div className="grid md:grid-cols-2 gap-10 text-center md:text-left">
          <FadeIn>
            <div className="font-serif italic text-copper text-6xl md:text-7xl">{delivered}+</div>
            <div className="mt-3 uppercase tracking-[0.15em] text-white/80 text-sm">Homes Delivered</div>
          </FadeIn>
          <FadeIn delay={0.15} className="md:border-l md:border-white/15 md:pl-10">
            <div className="font-serif italic text-copper text-6xl md:text-7xl">{underConstruction}</div>
            <div className="mt-3 uppercase tracking-[0.15em] text-white/80 text-sm">Homes Under Construction</div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
