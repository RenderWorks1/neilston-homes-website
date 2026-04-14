'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

export function PhotoCarousel({ images, alt }: { images: string[]; alt: string }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-1 px-1"
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="relative shrink-0 snap-start w-[85%] md:w-[48%] lg:w-[32%] xl:w-[24%] aspect-[4/3] bg-grey-light overflow-hidden"
          >
            <Image
              src={src}
              alt={`${alt} — image ${i + 1}`}
              fill
              sizes="(max-width: 768px) 85vw, 25vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <button
        aria-label="Previous"
        onClick={() => scroll('left')}
        className="absolute -left-2 top-1/2 -translate-y-1/2 bg-white border border-border-grey shadow-md p-2 hover:bg-copper hover:text-white hover:border-copper transition-colors"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        aria-label="Next"
        onClick={() => scroll('right')}
        className="absolute -right-2 top-1/2 -translate-y-1/2 bg-white border border-border-grey shadow-md p-2 hover:bg-copper hover:text-white hover:border-copper transition-colors"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
