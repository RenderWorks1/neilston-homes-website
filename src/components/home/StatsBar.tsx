import { Container } from '@/components/ui/Container';
import { FadeIn } from '@/components/ui/FadeIn';

type Stat = { value: string | number; label: string };

const gridColsClass: Record<number, string> = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
};

export function StatsBar(props: { stats: Stat[] } | { delivered: number; underConstruction: number }) {
  const stats: Stat[] = 'stats' in props
    ? props.stats
    : [
        { value: `${props.delivered}+`, label: 'Homes Delivered' },
        { value: props.underConstruction, label: 'Homes Under Construction' },
      ];

  const cols = gridColsClass[stats.length] ?? 'md:grid-cols-2';

  return (
    <section className="bg-grey-dark text-white py-16">
      <Container>
        <div className={`grid ${cols} gap-10 text-center md:text-left`}>
          {stats.map((s, i) => (
            <FadeIn
              key={s.label}
              delay={i * 0.15}
              className={i > 0 ? 'md:border-l md:border-white/15 md:pl-10' : ''}
            >
              <div className="font-serif italic text-copper text-4xl md:text-5xl">{s.value}</div>
              <div className="mt-2 uppercase tracking-[0.15em] text-white/80 text-xs md:text-sm">{s.label}</div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
