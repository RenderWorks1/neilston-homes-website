import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { articles } from '@/lib/mock-data';

export const metadata: Metadata = {
  title: 'Tips and Resources',
  description: 'Guides, FAQs and resources for first home buyers and anyone considering a new build.',
};

export default function TipsPage() {
  return (
    <div className="py-20 md:py-24">
      <Container>
        <SectionHeading as="h1" title="Tips and Resources">
          <p>Practical guides for first home buyers, new build considerations, and everything in between.</p>
        </SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((a) => (
            <Link
              key={a.slug}
              href={`/tips-and-resources/${a.slug}`}
              className="group flex flex-col overflow-hidden border border-border-grey hover:shadow-lg transition-shadow"
            >
              <div
                className="relative aspect-[4/3] flex items-end p-6"
                style={{ backgroundColor: a.placeholderBg ?? '#C47A2A' }}
              >
                {a.featuredImage && (
                  <Image src={a.featuredImage} alt={a.title} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" />
                )}
                <h3 className="relative font-serif italic text-white text-2xl md:text-3xl z-10 drop-shadow">
                  {a.title}
                </h3>
              </div>
              <div className="p-6 bg-white flex-grow flex flex-col">
                <p className="text-charcoal text-sm flex-grow">{a.excerpt}</p>
                <span className="mt-4 text-copper font-semibold text-sm group-hover:underline">Read article →</span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
