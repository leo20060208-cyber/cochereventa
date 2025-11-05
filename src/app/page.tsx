import { HeroSection } from "@/components/hero-section";
import { WhatIsImport } from "@/components/what-is-import";
import ImportedCarsSection from "@/components/imported-cars-section";
import { WhoWeAre } from "@/components/who-we-are";
import { WhatWeDo } from "@/components/what-we-do";
import { FAQSection } from "@/components/faq-section";
import { Header1 } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import Component from "@/components/ui/asd";
import * as api from "@/lib/api";

export const revalidate = 60; // Revalidar cada 60 segundos

export default async function Home() {
  // Cargar todos los datos de Supabase en paralelo
  const [videos, faqs, whoWeAre, siteSettings] = await Promise.all([
    api.getVideos().catch(() => []),
    api.getFAQs().catch(() => []),
    api.getWhoWeAreData().catch(() => null),
    api.getSiteSettings().catch(() => null),
  ]);

  return (
    <div className="min-h-screen w-full relative">
      {/* Grid Shader Background */}
      <Component />

      {/* Header Navigation */}
      <Header1 />

      <div className="w-full relative z-10">
        <HeroSection videos={videos} />
        <WhatIsImport />
        <ImportedCarsSection />
        <WhoWeAre data={whoWeAre} />
        <WhatWeDo videos={videos} />
        <FAQSection faqs={faqs} />
      </div>

      {/* Footer */}
      <Footer settings={siteSettings} />
    </div>
  );
}
