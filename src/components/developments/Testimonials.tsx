import { Quote } from 'lucide-react';
import type { Testimonial } from '@/lib/types';

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials.length) return null;
  const single = testimonials.length === 1;
  return (
    <div className={single ? 'max-w-3xl mx-auto text-center' : 'grid md:grid-cols-2 gap-8 lg:gap-12'}>
      {testimonials.map((t, i) => (
        <figure
          key={i}
          className={single ? '' : 'bg-white border border-border-grey p-8 md:p-10 flex flex-col'}
        >
          <Quote
            className={`text-copper ${single ? 'mx-auto' : ''} mb-5`}
            size={single ? 40 : 32}
            strokeWidth={1.5}
          />
          <blockquote
            className={`font-serif italic text-charcoal leading-relaxed ${
              single ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'
            }`}
          >
            “{t.quote}”
          </blockquote>
          <figcaption className="mt-6 not-italic">
            <span className="font-semibold text-charcoal">{t.author}</span>
            {t.role && <span className="block text-sm text-charcoal/70 mt-1">{t.role}</span>}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
