import Link from 'next/link';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'outline-white' | 'learn-more' | 'enquire';

interface Props {
  href?: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
}

const variants: Record<Variant, string> = {
  primary: 'btn-primary',
  'outline-white': 'btn-outline-white',
  'learn-more': 'btn-learn-more',
  enquire: 'btn-enquire',
};

export function Button({ href, variant = 'primary', className, children, type = 'button', onClick, disabled }: Props) {
  const classes = cn(variants[variant], disabled && 'opacity-50 pointer-events-none', className);
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
