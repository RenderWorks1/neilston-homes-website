'use client';

import Image from 'next/image';
import { Lightbox, useLightbox } from './Lightbox';

export function PhotoGallery({ images, alt }: { images: string[]; alt: string }) {
  const lightbox = useLightbox(images.length);
  if (!images.length) return null;
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
        {images.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => lightbox.open(i)}
            aria-label={`View ${alt} photo ${i + 1} larger`}
            className="relative aspect-[4/3] bg-grey-light overflow-hidden group cursor-pointer"
          >
            <Image
              src={src}
              alt={`${alt} — photo ${i + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>
      <Lightbox
        images={images}
        alt={alt}
        index={lightbox.index}
        onClose={lightbox.close}
        onNext={lightbox.next}
        onPrev={lightbox.prev}
      />
    </>
  );
}
