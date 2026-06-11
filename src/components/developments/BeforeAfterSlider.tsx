'use client';

import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';
import { MoveHorizontal } from 'lucide-react';
import type { RenderRealityPair } from '@/lib/types';

function Slider({ pair, alt }: { pair: RenderRealityPair; alt: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const draggingRef = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (draggingRef.current) setFromClientX(e.clientX);
  };
  const onPointerUp = () => {
    draggingRef.current = false;
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') setPosition((p) => Math.max(0, p - 4));
    if (e.key === 'ArrowRight') setPosition((p) => Math.min(100, p + 4));
  };

  return (
    <figure>
      <div
        ref={containerRef}
        className="relative aspect-[16/10] w-full overflow-hidden bg-grey-light select-none touch-none cursor-ew-resize"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {/* Reality (full, underneath) */}
        <Image
          src={pair.reality}
          alt={`${alt} — completed`}
          fill
          sizes="(max-width: 1024px) 100vw, 80vw"
          className="object-cover"
        />
        <span className="absolute bottom-4 right-4 z-10 bg-charcoal/80 text-white text-[11px] uppercase tracking-[0.12em] font-semibold px-3 py-1 rounded-full">
          Reality
        </span>

        {/* Render (full-size, clipped to the left of the handle — clip-path avoids distortion) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={pair.render}
            alt={`${alt} — render`}
            fill
            sizes="(max-width: 1024px) 100vw, 80vw"
            className="object-cover"
          />
          <span className="absolute bottom-4 left-4 bg-copper text-white text-[11px] uppercase tracking-[0.12em] font-semibold px-3 py-1 rounded-full">
            Render
          </span>
        </div>

        {/* Handle */}
        <div
          role="slider"
          aria-label={`Reveal ${alt} render versus reality`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="absolute top-0 bottom-0 z-20 -ml-px w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.1)] focus:outline-none"
          style={{ left: `${position}%` }}
        >
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-charcoal rounded-full p-2 shadow-lg">
            <MoveHorizontal size={20} />
          </span>
        </div>
      </div>
      {pair.label && <figcaption className="mt-3 text-sm text-charcoal/70">{pair.label}</figcaption>}
    </figure>
  );
}

export function BeforeAfterSlider({ pairs, alt }: { pairs: RenderRealityPair[]; alt: string }) {
  if (!pairs.length) return null;
  return (
    <div className="space-y-10">
      {pairs.map((pair, i) => (
        <Slider key={i} pair={pair} alt={alt} />
      ))}
    </div>
  );
}
