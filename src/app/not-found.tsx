import Link from 'next/link';
import { Container } from '@/components/ui/Container';

export default function NotFound() {
  return (
    <div className="py-32">
      <Container>
        <h1 className="page-title">Page not found</h1>
        <p className="mt-4 text-charcoal">The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.</p>
        <Link href="/" className="btn-primary mt-8">Back to Home</Link>
      </Container>
    </div>
  );
}
