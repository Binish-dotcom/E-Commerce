import { PublicCTA, PublicFooter, PublicNavbar } from "../../../shared/components";
import AboutHero from "../components/AboutHero";
import AboutIntro from "../components/AboutIntro";
import AboutStats from "../components/AboutStats";
import MissionCards from "../components/MissionCards";
import WhyShopWithUs from "../components/WhyShopWithUs";

const About = () => {
  return (
    <main className="min-h-screen bg-[#fbfdfc] text-[#17233f]">
      <PublicNavbar activePage="About" />
      <AboutHero />
      <AboutIntro />
      <MissionCards />
      <AboutStats />
      <WhyShopWithUs />
      <PublicCTA
        heading="Start shopping with confidence."
        subtitle="Explore thousands of quality products from trusted sellers on ShopEase."
      />
      <PublicFooter />
    </main>
  );
};

export default About;
