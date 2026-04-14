import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { articles, getArticle } from '@/lib/mock-data';

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const a = getArticle(params.slug);
  return a ? { title: a.title, description: a.excerpt } : { title: 'Article' };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <article className="py-20 md:py-24">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="eyebrow mb-3">{article.categories.join(' · ')}</div>
          <h1 className="page-title">{article.title}</h1>
          <p className="mt-4 text-charcoal/70 text-sm">
            {new Date(article.publishedAt).toLocaleDateString('en-NZ', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <div
            className="mt-10 aspect-[16/9] flex items-end p-8"
            style={{ backgroundColor: article.placeholderBg ?? '#C47A2A' }}
          >
            <span className="font-serif italic text-white text-4xl">{article.title}</span>
          </div>
          <div className="mt-10 prose-neilston">
            {article.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-20 pt-12 border-t border-border-grey">
          <h2 className="font-serif italic text-copper text-3xl mb-6">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map((a) => (
              <Link
                key={a.slug}
                href={`/tips-and-resources/${a.slug}`}
                className="block p-6 border border-border-grey hover:border-copper transition-colors"
              >
                <div className="font-serif italic text-copper text-xl">{a.title}</div>
                <p className="text-sm text-charcoal mt-2">{a.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </article>
  );
}
