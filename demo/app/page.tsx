// Diamond Wrapp homepage — single-page demo.
// Section order locked in brand/site-plan.md §2.0.b.

import { Navigation } from '@/components/Navigation';
import { HeroPosterStack } from '@/components/HeroPosterStack';
import { MarqueeStrip } from '@/components/MarqueeStrip';
import { ServiziCarousel } from '@/components/ServiziCarousel';
import { StatsBlock } from '@/components/StatsBlock';
import { LavoriFirmatiSticky } from '@/components/LavoriFirmatiSticky';
import { WorkshopSplit } from '@/components/WorkshopSplit';
import { PrefooterCTA } from '@/components/PrefooterCTA';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroPosterStack />
        <MarqueeStrip />
        <ServiziCarousel />
        <StatsBlock />
        <MarqueeStrip reverse />
        <LavoriFirmatiSticky />
        <WorkshopSplit />
        <PrefooterCTA />
      </main>
      <Footer />
    </>
  );
}
