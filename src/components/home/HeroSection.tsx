import Image from 'next/image';
import Link from 'next/link';
import type { HomePageContent } from '@/lib/types';

export function HeroSection({ content }: { content: HomePageContent }) {
  return (
    <section className="relative -mt-20 pt-20 w-full min-h-screen h-dvh text-white overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={content.heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {content.heroVideo ? (
          <video
            className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
            autoPlay
            muted
            loop
            playsInline
            poster={content.heroImage}
            aria-hidden
          >
            <source src={content.heroVideo} type="video/mp4" />
          </video>
        ) : null}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
      <div className="relative h-full container-x flex flex-col justify-center">
        <div className="max-w-2xl">
          <h1 className="font-serif italic text-white drop-shadow-lg" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', lineHeight: 1 }}>
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
