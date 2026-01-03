import HeroSection from "@/components/HeroSection";
import AboutUsSection from "@/components/AboutUsSection";
import ContactUsSection from "@/components/ContactUsSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import StatsSection from "@/components/StatsSection";
import { Metadata } from "next";

<meta name="Work in Japan | MStaffing" content="MStaffing нь Японд ажиллах Монгол иргэдийг ажил олгогч нартай холбох технологид суурилсан платформ юм." />
export const metadata: Metadata = {
  title: 'Work in Japan | MStaffing',
  description: 'Ур чадвар, хүсэл мөрөөдлөөрөө тохирсон ажлаа хайж, шинэ боломжуудыг нээцгээе. MStaffing нь Японд ажиллах Монгол иргэдийг ажил олгогч нартай холбох технологид суурилсан платформ юм.',
  keywords: ['Японд ажил хайх', 'Japan job', 'MStaffing', 'Монгол ажил хайгч', 'Ажил олгогч', 'Hiring platform', 'Career in Japan', 'Job search', 'Монгол Япон ажил', 'Remote work Japan', 'Tech jobs Japan', 'Job portal', 'Employment Japan', 'Work in Japan', 'Job listings Japan', 'MStaffing Japan'],
  openGraph: {
    title: 'Японд ажил хайх | MStaffing',
    description: 'MStaffing нь Японд ажиллах Монгол иргэдийг ажил олгогч нартай холбох технологид суурилсан платформ юм.',
    url: 'https://job-connect-chi.vercel.app/',
    siteName: 'MStaffing',
    images: [
      {
        url: 'https://job-connect-chi.vercel.app/',
        width: 1200,
        height: 630,
        alt: 'Job listings Japan - MStaffing',
      },
    ],
    locale: 'mn_MN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://job-connect-chi.vercel.app/',
  },
  authors: [{ name: 'MStaffing Team', url: 'https://job-connect-chi.vercel.app' }],
  creator: 'MStaffing',
  publisher: 'MStaffing',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-32x32.svg',
    apple: '/favicon.svg',
  },
}

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
