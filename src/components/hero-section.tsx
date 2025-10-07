"use client";

import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { motion } from "framer-motion";
import { getVideos } from "@/lib/data";
import { useState, useEffect } from "react";

export function HeroSection() {
  const [heroVideo, setHeroVideo] = useState("https://www.youtube.com/embed/3igSQXJBm6E");

  useEffect(() => {
    const loadVideo = () => {
      const videos = getVideos();
      const heroVideoData = videos.find(v => v.type === "hero" && v.active);
      if (heroVideoData) {
        setHeroVideo(heroVideoData.url);
      }
    };
    
    loadVideo();
    
    // Refresh every 2 seconds to catch updates from moderation
    const interval = setInterval(loadVideo, 2000);
    
    return () => clearInterval(interval);
  }, []);

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <ContainerScroll
        titleComponent={
          <div className="relative z-10 container mx-auto px-2 sm:px-4 md:px-6">
            <div className="max-w-2xl sm:max-w-3xl md:max-w-4xl mx-auto text-center">
              <motion.div
                custom={0}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                className="pt-4 sm:pt-6 md:pt-8 lg:pt-10 pb-12 sm:pb-16 md:pb-20 lg:pb-24"
              >
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  El coche que quieres está en Europa. <br />
                  <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mt-1 leading-none text-blue-400">
                    Nosotros lo traemos hasta tu puerta.
                  </span>
                </h1>
                <motion.div
                  custom={1}
                  variants={fadeUpVariants}
                  initial="hidden"
                  animate="visible"
                  className="mt-4 text-center"
                >
                  <p className="text-xs sm:text-sm md:text-base text-white/80 italic max-w-xl mx-auto px-4 leading-relaxed">
                    <span className="text-white/60">(</span>La conversa que tiene todo el mundo, y la pregunta del millón: ¿por qué no lo hace todo el mundo si es más rentable? 
                    Nosotros siempre decimos lo mismo: <span className="text-blue-400">"Mira, no lo sé, pero mejor menos competencia, más barato"</span><span className="text-white/60">)</span>
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        }
      >
        <div className="relative w-full h-full overflow-hidden">
              <iframe
                className="absolute top-1/2 left-1/2 w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2 border-0"
                src={`${heroVideo}?autoplay=0&mute=1&loop=1&playlist=${heroVideo.split('/').pop()}&controls=1&showinfo=0&rel=0&modestbranding=1&fs=1&iv_load_policy=3&cc_load_policy=0&start=0&end=0`}
                title="Vídeo de importación de coches"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                style={{ 
                  margin: 0, 
                  padding: 0,
                  border: 'none',
                  outline: 'none',
                  boxShadow: 'none'
                }}
              ></iframe>
        </div>
      </ContainerScroll>
    </section>
  );
}