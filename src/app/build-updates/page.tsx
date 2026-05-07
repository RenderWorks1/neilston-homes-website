import { Container } from '@/components/ui/Container';
import { getDevelopments } from '@/lib/developments';
import { BuildUpdatesFilter } from './BuildUpdatesFilter';

export const metadata = {
  title: 'Build Updates',
  description: 'Monthly photo updates and progress notes from every Neilston Homes project — active and completed.',
};

export default async function BuildUpdatesHub() {
  const developments = await getDevelopments();
  return (
    <div className="py-20 md:py-24">
      <Container>
        <h1 className="page-title mb-3">Build Updates</h1>
        <p className="max-w-2xl text-charcoal mb-10">
          Monthly photo updates and progress notes from every Neilston Homes project — active and completed.
        </p>
        <BuildUpdatesFilter developments={developments} />
      </Container>
    </div>
  );
}
