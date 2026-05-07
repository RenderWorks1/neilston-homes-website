'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const baseLinks = [
  { href: '/homes-for-sale', label: 'Homes for Sale' },
  { href: '/completed-homes', label: 'Completed Homes' },
  { href: '/build-updates', label: 'Build Updates' },
  { href: '/about', label: 'About Us' },
];

function heroScrollSolid(): boolean {
  if (typeof window === 'undefined') return false;
  const heroHeight = window.innerHeight;
  return window.scrollY > heroHeight - 80;
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isHome = pathname === '/';
  const [solidBar, setSolidBar] = useState(!isHome);

  useEffect(() => {
    if (!isHome) {
      setSolidBar(true);
      return;
    }
    const update = () => setSolidBar(heroScrollSolid());
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [isHome]);

  const transparentHero = isHome && !solidBar && !open;
  const links = isHome ? baseLinks : [{ href: '/', label: 'Home' }, ...baseLinks];

  return (
    <header
      className={cn(
        'sticky top-0 z-50 text-white transition-colors duration-300',
        transparentHero ? 'bg-transparent' : 'bg-black',
      )}
    >
      <div className="container-x flex items-center h-20 gap-6 lg:gap-8">
        <Link href="/" aria-label="Neilston Homes" className="flex shrink-0 items-center">
          <Image
            src="/logos/Neilston Homes - White Logo Transparent.png"
            alt="Neilston Homes"
            width={200}
            height={48}
            className="h-10 w-auto"
            priority
          />
        </Link>

        <nav className="hidden min-w-0 flex-1 lg:flex items-center justify-evenly gap-4 xl:gap-6 tracking-nav px-2">
          {links.map((l) => {
            const active = l.href === '/' ? pathname === '/' : pathname === l.href || pathname.startsWith(l.href + '/');
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  'shrink-0 text-center text-sm transition-opacity hover:opacity-100',
                  active ? 'opacity-60' : 'opacity-100',
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 lg:block">
          <Link href="/contact" className="btn-outline-white text-sm whitespace-nowrap">
            Contact Us
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          className="ml-auto p-2 lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-black border-t border-white/20">
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
