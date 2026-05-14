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
          {(() => {
            const tony = teamMembers.find((m) => m.name === 'Tony Houston');
            const others = teamMembers.filter((m) => m.name !== 'Tony Houston');
            return (
              <>
                {tony && (
                  <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center mb-16 md:mb-20">
                    <div className="relative aspect-square bg-copper/10 overflow-hidden max-w-md md:max-w-none mx-auto md:mx-0 w-full">
                      {tony.photo ? (
                        <Image
                          src={tony.photo}
                          alt={tony.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                          style={{ objectPosition: 'top' }}
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="font-serif italic text-copper text-6xl">
                            {tony.name.split(' ').map((n) => n[0]).join('')}
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-serif italic text-copper text-3xl md:text-4xl leading-tight mb-2">{tony.name}</h3>
                      <p className="text-charcoal/70 text-sm uppercase tracking-wider mb-6">{tony.role}</p>
                      <div className="prose-neilston max-w-none">
                        <p>The team behind Neilston Homes brings over 90 years of combined experience in the building industry.</p>
                        <p>
                          Managing Director Tony Houston previously led the company that built the first home in Hobsonville Point and was instrumental in developing the Axis affordable terraced housing model.
                        </p>
                        <p>
                          Since then, Neilston Homes has focused on central Auckland locations and has delivered over 90 new homes in recent years.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                  {others.map((m) => {
                    const objectPosition =
                      {
                        'Sara Daji': 'center 20%',
                        'Matt Wootton': 'center 20%',
                      }[m.name] ?? 'top';
                    return (
                      <div key={m.name} className="text-center md:text-left">
                        <div className="relative aspect-square bg-copper/10 mb-5 overflow-hidden">
                          {m.photo ? (
                            <Image
                              src={m.photo}
                              alt={m.name}
                              fill
                              sizes="(max-width: 768px) 50vw, 33vw"
                              className="object-cover"
                              style={{ objectPosition }}
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="font-serif italic text-copper text-5xl">
                                {m.name.split(' ').map((n) => n[0]).join('')}
                              </span>
                            </div>
                          )}
                        </div>
                        <h3 className="font-serif italic text-copper text-2xl">{m.name}</h3>
                        <p className="text-charcoal/70 text-sm uppercase tracking-wider mb-2">{m.role}</p>
                        {m.bio && <p className="text-charcoal text-sm leading-relaxed">{m.bio}</p>}
                      </div>
                    );
                  })}
                </div>
              </>
            );
          })()}
        </Container>
      </section>

      <StatsBar delivered={homePage.homesDelivered} underConstruction={homePage.underConstruction} />

      <section className="py-20 md:py-24 bg-white">
        <Container>
          <SectionHeading eyebrow="What We Believe" title="Our Values" align="center" />
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Trust and Transparency', body: 'From first enquiry to handover, you can see what\'s happening. Monthly photo updates are standard on every project.' },
              { title: 'Quality and Design', body: 'We build warm, durable, low-maintenance homes designed to last, with layouts that suit real life, not just look good on paper.' },
              { title: 'Long Term Value', body: 'We choose well-connected locations, durable materials, and functional layouts that support lasting appeal.' },
            ].map((v) => (
              <div key={v.title} className="p-8 border border-border-grey bg-grey-light">
                <h3 className="font-serif italic text-copper text-3xl mb-3">{v.title}</h3>
                <p className="text-charcoal leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
