import type { Metadata } from 'next';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StatsBar } from '@/components/home/StatsBar';
import { homePage, teamMembers } from '@/lib/mock-data';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Meet the Auckland-based team behind Neilston Homes.',
};

export default function AboutPage() {
  return (
    <>
      <div className="py-20 md:py-24">
        <Container>
          <SectionHeading as="h1" title="About Us" />
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="prose-neilston max-w-none">
              <p>
                Neilston Homes is built on the idea that all New Zealanders should have a chance to connect with a little piece of our beautiful country. A place to raise a family and call their own.
              </p>
              <p>
                That&rsquo;s why our homes are built to be modern, affordable, sustainable and to a quality Kiwi&rsquo;s expect. Every project is led out of our Auckland office by a team who have been designing and building homes across the region for decades.
              </p>
              <p>
                We&rsquo;re proud Master Builders, and every Neilston home is backed by a 10-year guarantee.
              </p>
            </div>
            <div className="relative aspect-[4/3] bg-grey-light overflow-hidden">
              <Image
                src="/images/Neilston-team-pic.jpeg"
                alt="The Neilston Homes team"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </div>

      <section className="py-20 md:py-24 bg-grey-light">
        <Container>
          <SectionHeading eyebrow="Our Team" title="The People Behind Your Home" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {teamMembers.map((m) => (
              <div key={m.name} className="text-center md:text-left">
                <div className="relative aspect-square bg-copper/10 mb-5 flex items-center justify-center">
                  <span className="font-serif italic text-copper text-5xl">
                    {m.name.split(' ').map((n) => n[0]).join('')}
                  </span>
                </div>
                <h3 className="font-serif italic text-copper text-2xl">{m.name}</h3>
                <p className="text-charcoal/70 text-sm uppercase tracking-wider mb-2">{m.role}</p>
                <p className="text-charcoal text-sm leading-relaxed">{m.bio}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-24 bg-white">
        <Container>
          <SectionHeading eyebrow="What We Believe" title="Our Values" align="center" />
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Transparency', body: 'From first enquiry to handover, you see what\'s happening. Monthly photo updates are standard on every project.' },
              { title: 'Quality', body: 'Master Build warranty, high-performance building envelopes, and premium specifications — because your home deserves it.' },
              { title: 'Affordability', body: 'Thoughtful design and efficient delivery mean Kiwi families can still find a modern home they can afford.' },
            ].map((v) => (
              <div key={v.title} className="p-8 border border-border-grey bg-grey-light">
                <h3 className="font-serif italic text-copper text-3xl mb-3">{v.title}</h3>
                <p className="text-charcoal leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <StatsBar delivered={homePage.homesDelivered} underConstruction={homePage.underConstruction} />
    </>
  );
}
