import type { Metadata } from 'next';
import { fontBody, fontHeading } from '@/lib/fonts';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Neilston Homes — Own Your Future',
    template: '%s | Neilston Homes',
  },
  description:
    'Modern, affordable homes for New Zealanders. Explore our current and completed residential developments across Auckland.',
  openGraph: {
    type: 'website',
    locale: 'en_NZ',
    url: 'https://neilstonhomes.co.nz',
    siteName: 'Neilston Homes',
    title: 'Neilston Homes — Own Your Future',
    description: 'Modern, affordable homes for New Zealanders.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fontHeading.variable} ${fontBody.variable}`}>
      <body className="font-sans">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
