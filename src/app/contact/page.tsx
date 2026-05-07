import type { Metadata } from 'next';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { EnquiryForm } from '@/components/developments/EnquiryForm';
import { activeDevelopments } from '@/lib/developments';
import { siteSettings } from '@/lib/mock-data';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the Neilston Homes team — we respond to every enquiry within one business day.',
};

export default async function ContactPage() {
  const options = (await activeDevelopments()).map((d) => ({ slug: d.slug, name: d.name }));

  return (
    <div className="py-20 md:py-24">
      <Container>
        <SectionHeading as="h1" title="Contact Us">
          <p>Talk to our team about any current or upcoming Neilston Homes development. We aim to respond within one business day.</p>
        </SectionHeading>

        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-12">
          <div className="bg-white border border-border-grey p-6 md:p-10">
            <EnquiryForm developmentOptions={options} />
          </div>

          <aside className="space-y-8">
            <div>
              <h3 className="font-serif italic text-copper text-2xl mb-4">Reach Us Directly</h3>
              <ul className="space-y-4 text-charcoal">
                <li className="flex items-start gap-4">
                  <Phone className="text-copper mt-1 shrink-0" size={20} />
                  <div>
                    <div className="text-xs uppercase tracking-wider text-charcoal/60 mb-0.5">Phone</div>
                    <a href={`tel:${siteSettings.contactPhone.replace(/\s+/g, '')}`} className="hover:text-copper">
                      {siteSettings.contactPhone}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Mail className="text-copper mt-1 shrink-0" size={20} />
                  <div>
                    <div className="text-xs uppercase tracking-wider text-charcoal/60 mb-0.5">Email</div>
                    <a href={`mailto:${siteSettings.contactEmail}`} className="hover:text-copper">
                      {siteSettings.contactEmail}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <MapPin className="text-copper mt-1 shrink-0" size={20} />
                  <div>
                    <div className="text-xs uppercase tracking-wider text-charcoal/60 mb-0.5">Office</div>
                    {siteSettings.address}
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-grey-light p-6">
              <h4 className="font-serif italic text-copper text-xl mb-2">Office Hours</h4>
              <p className="text-charcoal text-sm">Monday – Friday · 8:30am – 5:00pm</p>
              <p className="text-charcoal text-sm">Weekend viewings by appointment</p>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
