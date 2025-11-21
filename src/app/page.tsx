import HeroSection from "@/components/HeroSection";
import AboutUsSection from "@/components/AboutUsSection";
import ContactUsSection from "@/components/ContactUsSection";

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      <HeroSection />
      <AboutUsSection />
      <ContactUsSection />
    </main>
  );
}
