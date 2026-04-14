import { cn } from '@/lib/utils';

interface Props {
  eyebrow?: string;
  title: string;
  as?: 'h1' | 'h2';
  align?: 'left' | 'center';
  className?: string;
  children?: React.ReactNode;
}

export function SectionHeading({ eyebrow, title, as = 'h2', align = 'left', className, children }: Props) {
  const Tag = as;
  return (
    <div className={cn('mb-10', align === 'center' && 'text-center', className)}>
      {eyebrow && <div className="eyebrow mb-3">{eyebrow}</div>}
      <Tag className={as === 'h1' ? 'page-title' : 'section-title'}>{title}</Tag>
      {children && <div className="mt-4 max-w-2xl text-charcoal">{children}</div>}
    </div>
  );
}
