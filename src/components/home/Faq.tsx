import { Plus } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FadeIn } from '@/components/ui/FadeIn';

const faqs = [
  {
    q: 'How do I reserve a Neilston home?',
    a: 'Get in touch via the enquiry form on any development page and one of our team will be in contact within one business day to walk you through availability, pricing, and the reservation process.',
  },
  {
    q: 'What deposit do I need?',
    a: 'A small refundable deposit holds your preferred home while contracts are prepared. Your full deposit is then paid on signing, with the balance due on settlement at completion.',
  },
  {
    q: 'Are Neilston homes eligible for KiwiSaver and the First Home Grant?',
    a: 'Most of our homes fall within the price caps for the First Home Grant and qualify for the KiwiSaver first-home withdrawal. We can confirm eligibility for any specific home on request.',
  },
  {
    q: 'How long does a build take?',
    a: 'Typical build timeframes are 9–14 months depending on the development. Each home page lists an estimated completion date, and we send monthly photo updates throughout the build.',
  },
  {
    q: 'Can I customise finishes or layouts?',
    a: 'Layouts are fixed, but depending on the build stage there may be options to choose between selected finish palettes. Talk to the team to find out what\'s still available on your home.',
  },
  {
    q: 'What warranty comes with a Neilston home?',
    a: 'Every Neilston home is backed by a 10-year structural guarantee in addition to all statutory builder warranties.',
  },
];

export function Faq() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <Container>
        <FadeIn>
          <SectionHeading title="Frequently Asked Questions" align="center" />
        </FadeIn>
        <div className="max-w-3xl mx-auto mt-12 md:mt-16 divide-y divide-border-grey border-y border-border-grey">
          {faqs.map((item, i) => (
            <FadeIn key={item.q} delay={i * 0.08}>
              <details className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left">
                  <span className="font-serif italic text-charcoal text-lg md:text-xl">{item.q}</span>
                  <Plus
                    size={22}
                    className="shrink-0 text-copper transition-transform duration-200 group-open:rotate-45"
                  />
                </summary>
                <p className="mt-4 text-charcoal leading-relaxed">{item.a}</p>
              </details>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
