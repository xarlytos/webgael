import { Navbar } from '../components/Navbar';
import { HeroSplit3D } from '../components/HeroSplit3D';
import { TrustBar } from '../components/TrustBar';
import { TechTabs } from '../components/TechTabs';
import { Steps5 } from '../components/Steps5';
import { MaterialsMasonry } from '../components/MaterialsMasonry';
import { ShowcaseCarousel } from '../components/ShowcaseCarousel';
import { PricingStrip } from '../components/PricingStrip';
import { FAQ } from '../components/FAQ';
import { Footer } from '../components/Footer';

export function Home() {
  return (
    <div className="min-h-screen">
      <Navbar currentPath="/" />
      <HeroSplit3D />
      <TrustBar />
      <TechTabs />
      <Steps5 />
      <MaterialsMasonry />
      <ShowcaseCarousel />
      <PricingStrip />
      <FAQ />
      <Footer />
    </div>
  );
}
