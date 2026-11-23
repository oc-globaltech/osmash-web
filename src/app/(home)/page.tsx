import { Argument } from "@/components/home/Argument";
import { Benefits } from "@/components/home/Benefits";
import { CarouselTags } from "@/components/home/CarouselTags";
import { Faq } from "@/components/home/Faq";
import { FullRange } from "@/components/home/FullRange";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { HomeExperience } from "@/components/home/HomeExperience";
import { Hud } from "@/components/home/Hud";
import { Navbar } from "@/components/home/Navbar";
import { Profile } from "@/components/home/Profile";
import { HomeSceneHost } from "@/components/home/scene/HomeSceneHost";

export default function HomePage() {
  return (
    <HomeExperience>
      <div className="page-wrapper">
        <main className="main-wrapper">
          <Navbar />
          <HeroCarousel />
          <Profile />
          <Benefits />
          <Argument />
          <FullRange />
          <Faq />
          <CarouselTags />
          <Hud />
          <HomeSceneHost />
        </main>
      </div>
    </HomeExperience>
  );
}
