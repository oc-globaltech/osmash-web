import { CarouselProvider } from "@/components/home/CarouselProvider";
import { HomeJsonLd } from "@/components/home/HomeJsonLd";
import { SiteFooter } from "@/components/home/chrome/SiteFooter";
import { TopBar } from "@/components/home/chrome/TopBar";
import { SceneCanvas } from "@/components/home/scene/SceneCanvas";
import { CloseUp } from "@/components/home/sections/CloseUp";
import { HowItWorks } from "@/components/home/sections/HowItWorks";
import { PhotoStage } from "@/components/home/sections/PhotoStage";
import { PlayerPoints } from "@/components/home/sections/PlayerPoints";
import { RingStage } from "@/components/home/sections/RingStage";
import { ShuttleHero } from "@/components/home/sections/ShuttleHero";

export default function HomePage() {
  return (
    <CarouselProvider>
      <HomeJsonLd />
      <main>
        <TopBar />
        <ShuttleHero />
        <CloseUp />
        <PlayerPoints />
        <PhotoStage />
        <RingStage />
        <HowItWorks />
        <SceneCanvas />
      </main>
      <SiteFooter />
    </CarouselProvider>
  );
}
