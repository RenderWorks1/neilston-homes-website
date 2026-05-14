import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { siteSettings } from '@/lib/mock-data';

const quickLinks = [
  { href: '/homes-for-sale', label: 'Homes for Sale' },
  { href: '/completed-homes', label: 'Completed Homes' },
  { href: '/build-updates', label: 'Build Updates' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact Us' },
];

export function Footer() {
  return (
    <footer className="bg-grey-dark text-white mt-24">
      <div className="container-x py-16 flex flex-col md:flex-row md:justify-between gap-10 md:gap-16">
        <div className="md:max-w-md">
          <Image
            src="/logos/Neilston Homes - White Logo Transparent.png"
            alt="Neilston Homes"
            width={220}
            height={50}
            className="h-12 w-auto mb-6"
          />
          <p className="text-white/70 max-w-sm leading-relaxed">
            Modern, affordable homes for New Zealanders. Proudly designing and building across Auckland.
          </p>
          <div className="flex gap-3 mt-6">
            {siteSettings.socialLinks.facebook && (
              <a href={siteSettings.socialLinks.facebook} aria-label="Facebook" className="p-2 border border-white/30 hover:border-copper hover:text-copper transition-colors">
                <Facebook size={18} />
              </a>
            )}
            {siteSettings.socialLinks.instagram && (
              <a href={siteSettings.socialLinks.instagram} aria-label="Instagram" className="p-2 border border-white/30 hover:border-copper hover:text-copper transition-colors">
                <Instagram size={18} />
              </a>
            )}
            {siteSettings.socialLinks.linkedin && (
              <a href={siteSettings.socialLinks.linkedin} aria-label="LinkedIn" className="p-2 border border-white/30 hover:border-copper hover:text-copper transition-colors">
                <Linkedin size={18} />
              </a>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-10 sm:gap-16 lg:gap-24">
          <div>
            <h4 className="font-serif italic text-copper text-2xl mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/80 hover:text-copper transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif italic text-copper text-2xl mb-4">Get in Touch</h4>
            <ul className="space-y-3 text-white/80">
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-copper mt-0.5 shrink-0" />
                <a href={`tel:${siteSettings.contactPhone.replace(/\s+/g, '')}`}>{siteSettings.contactPhone}</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-copper mt-0.5 shrink-0" />
                <a href={`mailto:${siteSettings.contactEmail}`}>{siteSettings.contactEmail}</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-copper mt-0.5 shrink-0" />
                <span>{siteSettings.address}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-5 text-sm text-white/60 flex justify-between flex-wrap gap-2">
          <span>{siteSettings.footerText}</span>
          <span>{new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
