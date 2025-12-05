import HeroSection from "@/components/HeroSection";
import AboutUsSection from "@/components/AboutUsSection";
import ContactUsSection from "@/components/ContactUsSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import StatsSection from "@/components/StatsSection";


export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      <HeroSection />
      <AboutUsSection />
      <FeaturesSection />
      <HowItWorksSection />
      {/* <StatsSection /> */}
      <ContactUsSection />
    </main>
  );
}
