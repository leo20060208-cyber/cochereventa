import { HeroSection } from "@/components/hero-section";
import { WhatIsImport } from "@/components/what-is-import";
import { WhoWeAre } from "@/components/who-we-are";
import { WhatWeDo } from "@/components/what-we-do";
import { StockCars } from "@/components/stock-cars";
import { FAQSection } from "@/components/faq-section";
import { ClientsSection } from "@/components/clients-section";
import { Header1 } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import Component from "@/components/ui/asd";

export default function Home() {
  return (
    <div className="min-h-screen w-full relative">
      {/* Grid Shader Background */}
      <Component />
      
      {/* Header Navigation */}
      <Header1 />
      
      <div className="w-full relative z-10">
        <HeroSection />
        <WhatIsImport />
        <WhoWeAre />
        <WhatWeDo />
        <StockCars />
        <FAQSection />
        <ClientsSection />
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
