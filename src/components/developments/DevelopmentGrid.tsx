import { cn } from '@/lib/utils';

export function DevelopmentGrid({ count, children }: { count: number; children: React.ReactNode }) {
  let gridClass = 'grid gap-10';
  if (count === 1) gridClass += ' grid-cols-1 max-w-xl mx-auto';
  else if (count === 2) gridClass += ' grid-cols-1 md:grid-cols-2';
  else gridClass += ' grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
  return <div className={cn(gridClass)}>{children}</div>;
}
