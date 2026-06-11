'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export function useLightbox(count: number) {
  const [index, setIndex] = useState<number | null>(null);
  const open = useCallback((i: number) => setIndex(i), []);
  const close = useCallback(() => setIndex(null), []);
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % count)),
    [count],
  );
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + count) % count)),
    [count],
  );
  return { index, open, close, next, prev };
}

interface Props {
  images: string[];
  alt: string;
  index: number | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function Lightbox({ images, alt, index, onClose, onNext, onPrev }: Props) {
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') onNext();
      else if (e.key === 'ArrowLeft') onPrev();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [index, onClose, onNext, onPrev]);

  if (index === null) return null;
  const multiple = images.length > 1;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${alt} image viewer`}
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 md:p-10"
      onClick={onClose}
    >
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 text-white/80 hover:text-white p-2"
      >
        <X className="w-7 h-7 md:w-8 md:h-8" />
      </button>

      {multiple && (
        <button
          aria-label="Previous image"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 md:p-4 transition-colors"
        >
          <ChevronLeft className="w-7 h-7 md:w-9 md:h-9" />
        </button>
      )}

      <div
        className="relative w-[92vw] h-[80vh] md:w-[85vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[index]}
          alt={`${alt} — image ${index + 1}`}
          fill
          sizes="92vw"
          className="object-contain"
          priority
        />
      </div>

      {multiple && (
        <button
          aria-label="Next image"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 md:p-4 transition-colors"
        >
          <ChevronRight className="w-7 h-7 md:w-9 md:h-9" />
        </button>
      )}

      {multiple && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/80 text-sm tracking-wider">
          {index + 1} / {images.length}
        </div>
      )}
    </div>
  );
}
