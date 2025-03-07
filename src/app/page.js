import BannerImageCarousel from "@/components/homePage/BannerImageCarousel";
import ClientSuccessStory from "@/components/homePage/ClientSuccessStory";
import OurCoverArea from "@/components/homePage/OurCoverArea";
import OurServices from "@/components/homePage/OurServices";
import WelcomeToTBC from "@/components/homePage/WelcomeToTBC";
import WorldMap from "@/components/homePage/WorldMap";

export default function Home() {
  return (
    <div className="relative">
      <BannerImageCarousel />
      <OurCoverArea />
      <WelcomeToTBC />
      <ClientSuccessStory />
      <WorldMap />
      <OurServices />
    </div>
  );
}
