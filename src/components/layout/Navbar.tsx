'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const links = [
  { href: '/homes-for-sale', label: 'Homes for Sale' },
  { href: '/completed-homes', label: 'Completed Homes' },
  { href: '/build-updates', label: 'Build Updates' },
  { href: '/about', label: 'About Us' },
  { href: '/tips-and-resources', label: 'Tips and Resources' },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-grey-mid text-white">
      <div className="container-x flex items-center justify-between h-20">
        <Link href="/" aria-label="Neilston Homes" className="flex items-center">
          <Image
            src="/logos/Neilston Homes - White Logo Transparent.png"
            alt="Neilston Homes"
            width={200}
            height={48}
            className="h-10 w-auto"
            priority
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-8 tracking-nav">
          {links.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + '/');
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn('text-sm transition-opacity hover:opacity-100', active ? 'opacity-60' : 'opacity-100')}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Link href="/contact" className="btn-outline-white text-sm">
            Contact Us
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          className="lg:hidden p-2"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-grey-mid border-t border-white/20">
          <nav className="container-x py-6 flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2 text-base"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="btn-outline-white text-center mt-2"
            >
              Contact Us
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
