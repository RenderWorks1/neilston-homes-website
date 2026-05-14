import { permanentRedirect } from 'next/navigation';

export default function HomesForSaleSlugRedirect({ params }: { params: { slug: string } }) {
  permanentRedirect(`/developments/${params.slug}`);
}
