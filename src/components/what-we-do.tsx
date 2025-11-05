"use client"

import { motion } from "framer-motion"
import { Car, Shield, Globe, CheckCircle, Clock, Award } from "lucide-react"
import { ArrowRight } from "lucide-react"
import { useMemo } from "react"
import { type Video } from "@/lib/data"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemFadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

interface WhatWeDoProps {
  videos: Video[]
}

export function WhatWeDo({ videos }: WhatWeDoProps) {
  // Find the active what-we-do video from props
  const whatWeDoVideo = useMemo(() => {
    const whatWeDoVideoData = videos.find(v => v.type === "what-we-do" && v.active);
    return whatWeDoVideoData?.url || "https://www.youtube.com/embed/3igSQXJBm6E";
  }, [videos])
  
  // Ensure autoplay & mute for better UX with proper YouTube embed parameters
  // Fix YouTube connection issues by properly handling embed URLs
  const autoplayVideoSrc = useMemo(() => {
    const baseUrl = whatWeDoVideo;
    // Extract video ID if it's a full YouTube URL
    let videoId = '';
    
    if (baseUrl.includes('youtube.com/embed/')) {
      // Already an embed URL, extract ID
      const match = baseUrl.match(/youtube\.com\/embed\/([^?&#]+)/);
      videoId = match ? match[1] : '';
    } else if (baseUrl.includes('youtu.be/')) {
      // Short URL format
      videoId = baseUrl.split('youtu.be/')[1]?.split('?')[0]?.split('&')[0] || '';
    } else if (baseUrl.includes('watch?v=')) {
      // Full watch URL format
      videoId = baseUrl.split('watch?v=')[1]?.split('&')[0] || '';
    }
    
    // Always rebuild the embed URL with proper parameters to avoid connection issues
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1&rel=0&controls=1&showinfo=0&modestbranding=1&fs=1&iv_load_policy=3&cc_load_policy=0&enablejsapi=1`;
    }
    
    // Fallback: if URL is already an embed URL, clean it and add parameters
    if (baseUrl.includes('youtube.com/embed/')) {
      const cleanUrl = baseUrl.split('?')[0]; // Remove existing params
      return `${cleanUrl}?autoplay=1&mute=1&playsinline=1&rel=0&controls=1&showinfo=0&modestbranding=1&fs=1&iv_load_policy=3&cc_load_policy=0&enablejsapi=1`;
    }
    
    // Last resort: add parameters to existing URL
    const hasQuery = baseUrl.includes("?");
    const params = "autoplay=1&mute=1&playsinline=1&rel=0&controls=1&showinfo=0&modestbranding=1&fs=1&iv_load_policy=3&cc_load_policy=0&enablejsapi=1";
    return `${baseUrl}${hasQuery ? "&" : "?"}${params}`;
  }, [whatWeDoVideo]);

  return (
        <section id="what-we-do" className="w-full py-3 md:py-6 lg:py-8 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="max-w-7xl mx-auto rounded-3xl bg-transparent backdrop-blur-sm"
        >
          <div className="flex flex-col items-center justify-center space-y-1 text-center py-2 px-6">
            <div className="space-y-1">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl text-white"
              >
                Qué Hacemos Por Ti
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mx-auto max-w-[900px] text-white/90 text-xs md:text-sm/relaxed lg:text-xs/relaxed xl:text-sm/relaxed"
              >
                Nos encargamos de todo el proceso de importación para que tú solo tengas que disfrutar de tu nuevo coche
              </motion.p>
            </div>
          </div>

          {/* Video Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative mx-6 mb-3 rounded-2xl overflow-hidden border-2 border-slate-200"
          >
            <div className="relative aspect-video">
              <iframe
                className="w-full h-full"
                src={autoplayVideoSrc}
                title="Vídeo de servicios"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-3 py-3 px-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
          >
            {[
              {
                icon: <Car className="h-10 w-10 text-blue-600" />,
                title: "Búsqueda y Selección",
                description:
                  "Encontramos el coche perfecto para ti en Alemania, Francia o Italia. Revisamos su historial y estado.",
              },
              {
                icon: <Shield className="h-10 w-10 text-blue-400" />,
                title: "Inspección Completa",
                description:
                  "Nuestros técnicos revisan cada detalle del vehículo antes de la compra para garantizar su calidad.",
              },
              {
                icon: <Globe className="h-10 w-10 text-blue-400" />,
                title: "Gestión de Documentos",
                description:
                  "Nos encargamos de todos los trámites legales, homologación y matriculación en España.",
              },
              {
                icon: <CheckCircle className="h-10 w-10 text-blue-400" />,
                title: "ITV y Legalización",
                description: "Pasamos la ITV y completamos todos los trámites para que tu coche esté 100% legal.",
              },
              {
                icon: <Clock className="h-10 w-10 text-blue-400" />,
                title: "Entrega a Domicilio",
                description:
                  "Te entregamos tu coche en casa, listo para conducir, en solo 3-4 semanas desde la compra.",
              },
              {
                icon: <Award className="h-10 w-10 text-blue-400" />,
                title: "Garantía Total",
                description: "Ofrecemos garantía completa en todo el proceso y soporte post-venta.",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                variants={itemFadeIn}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group relative overflow-hidden rounded-xl p-3 shadow-sm transition-all hover:shadow-lg bg-white/10 backdrop-blur-sm border border-white/20"
              >
                <div className="relative space-y-2">
                  <div className="mb-1">{service.icon}</div>
                  <h3 className="text-base font-bold text-white">{service.title}</h3>
                  <p className="text-white/80 leading-relaxed text-xs">{service.description}</p>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs font-medium text-blue-400 underline-offset-4 hover:underline cursor-pointer">
                    Saber más
                  </span>
                  <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                    <ArrowRight className="h-4 w-4 text-blue-400" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
