import Image from 'next/image';
import Link from 'next/link';
import type { HomePageContent } from '@/lib/types';

export function HeroSection({ content }: { content: HomePageContent }) {
  return (
    <section className="relative w-full h-[90vh] min-h-[600px] text-white overflow-hidden">
      <Image
        src={content.heroImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
      <div className="relative h-full container-x flex flex-col justify-center">
        <div className="max-w-2xl">
          <h1 className="font-serif italic text-copper drop-shadow-lg" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', lineHeight: 1 }}>
            {content.heroHeadline}
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-white/95 max-w-xl drop-shadow">
            {content.heroSubheadline}
          </p>
          <div className="mt-10">
            <Link href="/homes-for-sale" className="btn-primary">
              View Homes for Sale
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
