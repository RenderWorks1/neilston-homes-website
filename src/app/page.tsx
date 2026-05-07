import { HeroSection } from '@/components/home/HeroSection';
import { SecondaryNav } from '@/components/home/SecondaryNav';
import { FeaturedDevelopments } from '@/components/home/FeaturedDevelopments';
import { WhyNeilston } from '@/components/home/WhyNeilston';
import { StatsBar } from '@/components/home/StatsBar';
import { Faq } from '@/components/home/Faq';
import { homePage } from '@/lib/mock-data';

export default function HomePage() {
  return (
    <>
      <HeroSection content={homePage} />
      <SecondaryNav />
      <FeaturedDevelopments />
      <WhyNeilston signals={homePage.trustSignals} />
      <StatsBar delivered={homePage.homesDelivered} underConstruction={homePage.underConstruction} />
      <Faq />
    </>
  );
}
