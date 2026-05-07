import { Shield, MapPin, Home, Hammer } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FadeIn } from '@/components/ui/FadeIn';
import type { TrustSignal } from '@/lib/types';

const icons = { shield: Shield, 'map-pin': MapPin, home: Home, hammer: Hammer };

export function WhyNeilston({ signals }: { signals: TrustSignal[] }) {
  return (
    <section className="py-20 md:py-28 bg-white">
      <Container>
        <FadeIn>
          <SectionHeading eyebrow="Why Neilston" title="Built for Kiwis, by Kiwis" align="center" />
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 md:mt-16">
          {signals.map((s, i) => {
            const Icon = icons[s.icon];
            return (
              <FadeIn key={s.title} delay={i * 0.12}>
                <div className="text-center md:text-left">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-copper/10 text-copper mb-5 rounded-full">
                    <Icon size={26} />
                  </div>
                  <h3 className="font-serif italic text-copper text-2xl mb-2">{s.title}</h3>
                  <p className="text-charcoal leading-relaxed">{s.description}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
