"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function BenefitsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const benefits = [
    {
      icon: "€",
      title: "Mejor precio",
      description: "Audi A4 2020 → Alemania: 18.500€ | España: 23.900€",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: "🔧",
      title: "Mejor cuidado",
      description: "Los coches europeos suelen tener menos desgaste y mejor mantenimiento.",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: "🚗",
      title: "Más variedad",
      description: "Acceso a modelos y configuraciones difíciles de encontrar en España.",
      color: "from-purple-400 to-violet-500"
    },
    {
      icon: "✅",
      title: "Todo incluido",
      description: "Revisión, papeles, ITV y entrega en tu casa.",
      color: "from-orange-400 to-red-500"
    }
  ];

  return (
        <section id="benefits" ref={ref} className="w-full py-12 md:py-24 lg:py-32 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto border border-slate-200 rounded-3xl bg-white/80 backdrop-blur-sm"
        >
          <div className="flex flex-col items-center justify-center space-y-4 text-center py-10 px-6">
            <div className="space-y-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="inline-block rounded-3xl bg-blue-50 px-3 py-1 text-sm text-blue-600"
              >
                Beneficios
              </motion.div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-black">
                ¿Por qué importar un coche?
              </h2>
              <p className="mx-auto max-w-[900px] text-slate-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Descubre las ventajas de elegir un vehículo importado de Europa
              </p>
            </div>
          </div>
          
          <div className="grid gap-6 py-12 px-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              <div className="relative p-6 bg-white/90 backdrop-blur-sm rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200 overflow-hidden">
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                {/* Icon */}
                <motion.div 
                  className="text-4xl mb-4 relative z-10"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {benefit.icon}
                </motion.div>
                
                {/* Content */}
                <h3 className="text-xl font-bold mb-3 text-black relative z-10">
                  {benefit.title}
                </h3>
                <p className="text-slate-600 leading-relaxed relative z-10 text-sm">
                  {benefit.description}
                </p>
                
                {/* Hover effect */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent group-hover:via-blue-500 transition-colors duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
        
          {/* Stats section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 py-12 px-6 max-w-4xl mx-auto"
          >
            {[
              { number: "500+", label: "Coches importados" },
              { number: "98%", label: "Clientes satisfechos" },
              { number: "3-4", label: "Semanas de entrega" },
              { number: "100%", label: "Legalizado" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl md:text-3xl font-bold text-black mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-600 font-medium text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
