import { permanentRedirect } from 'next/navigation';

export default function BuildUpdatesSlugRedirect({ params }: { params: { slug: string } }) {
  permanentRedirect(`/developments/${params.slug}`);
}
