import clsx, { type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

const nzd = new Intl.NumberFormat('en-NZ', {
  style: 'currency',
  currency: 'NZD',
  maximumFractionDigits: 0,
});

/** Format a number as NZD with no decimals (e.g. 769000 → "$769,000"). */
export function formatNZD(price: number): string {
  return nzd.format(price);
}
