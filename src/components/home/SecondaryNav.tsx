import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const items = [
  { href: '/build-updates', label: 'Build Updates', desc: 'Monthly progress photos from every active site' },
  { href: '/about', label: 'About Us', desc: 'Meet the team behind every Neilston home' },
];

export function SecondaryNav() {
  return (
    <section className="bg-copper text-white">
      <div className="container-x grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/20">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group py-6 md:py-8 px-4 md:px-10 flex items-center justify-between gap-4 hover:bg-copper-dark transition-colors"
          >
            <div>
              <div className="font-serif italic text-2xl md:text-3xl">{item.label}</div>
              <div className="text-white/80 text-sm md:text-base">{item.desc}</div>
            </div>
            <ArrowRight className="shrink-0 transition-transform group-hover:translate-x-1" />
          </Link>
        ))}
      </div>
    </section>
  );
}
