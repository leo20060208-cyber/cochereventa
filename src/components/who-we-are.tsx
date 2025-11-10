"use client";

import { motion } from "framer-motion";
import { type WhoWeAreData } from "@/lib/data";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

interface WhoWeAreProps {
  data: WhoWeAreData | null
}

export function WhoWeAre({ data }: WhoWeAreProps) {
  // Default data in case prop is null
  const whoWeAreData = data || {
    id: 1,
    description: "Somos tres chicos jóvenes de Barcelona, de 20, 22 y 23 años, apasionados por el mundo del motor. Desde siempre nos han fascinado los coches y todo lo que los rodea, y decidimos transformar esa pasión en un proyecto real y profesional."
  };

  return (
    <section id="who-we-are" className="w-full py-8 md:py-16 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="flex justify-center"
        >
          <div className="relative w-full max-w-5xl bg-transparent backdrop-blur-sm rounded-2xl p-6 md:p-8 overflow-hidden">
            {/* Content */}
            <div className="relative z-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight text-center">
                <span className="text-white">¿Quiénes</span>{' '}
                <span className="text-blue-400">
                  Somos?
                </span>
              </h1>
              
              {/* Layout: Text only */}
              <div className="max-w-4xl mx-auto mb-8">
                {/* Text Section */}
                <div className="space-y-4">
                  <div>
                    <p className="text-white/90 text-sm leading-relaxed font-medium mb-4">
                      {whoWeAreData.description}
                    </p>

                    <p className="text-white/90 text-sm leading-relaxed font-medium">
                      Es verdad que en algunos vídeos salimos con máscara, y entendemos que eso puede generar ciertas dudas.
                      Pero tranquilos: cuando hablemos por WhatsApp o nos veamos en persona,
                      nos conoceréis tal como somos. Creemos en el trato cercano, honesto y directo.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white tracking-tight">
                      ¿Por qué confiar en nosotros?
                    </h2>

                    <p className="text-white/90 text-sm leading-relaxed font-medium">
                      Sabemos que importar un coche no es una decisión pequeña, y por eso cuidamos cada detalle para que todo sea claro, legal y seguro desde el primer momento.
                    </p>
                  </div>
                </div>
              </div>

              {/* 4 Apartados debajo */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    icon: "CONTRATO",
                    title: "Contrato y Seguro",
                    description: "Antes de tomar cualquier decisión, todo se formaliza con un contrato y seguro, para que tengas total tranquilidad"
                  },
                  {
                    icon: "SOPORTE",
                    title: "Soporte Completo",
                    description: "Explicamos paso a paso cómo funciona el proceso, resolvemos todas tus dudas y estamos disponibles por llamada, mensaje o en persona"
                  },
                  {
                    icon: "DOCUMENTADO",
                    title: "Proceso Documentado",
                    description: "Puedes ver ejemplos reales de coches ya importados, opiniones de clientes y todo el proceso documentado"
                  },
                  {
                    icon: "SEGURIDAD",
                    title: "Tranquilidad Total",
                    description: "Nuestra prioridad es que te sientas seguro, acompañado y bien informado en todo momento"
                  }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-white/20"
                  >
                    <div className="text-left">
                      <h3 className="font-bold text-white text-base mb-2 tracking-tight">{item.title}</h3>
                      <p className="text-xs text-white/80 leading-relaxed font-medium">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-blue-400 animate-pulse"></div>
            <div className="absolute bottom-4 left-4 w-3 h-3 rounded-full bg-blue-400 animate-pulse"></div>
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-blue-400/10 blur-xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-blue-400/10 blur-xl"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
