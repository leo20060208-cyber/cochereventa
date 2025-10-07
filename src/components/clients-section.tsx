"use client";

import { motion } from "framer-motion";
import { Star, Quote, User, MapPin, Car } from "lucide-react";
import { useState, useEffect } from "react";
import { getClients, type Client } from "@/lib/data";

export function ClientsSection() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const loadClients = () => {
      setClients(getClients());
    };
    
    loadClients();
    
    // Refresh every 2 seconds to catch updates from moderation
    const interval = setInterval(loadClients, 2000);
    
    return () => clearInterval(interval);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating
            ? "text-yellow-400 fill-current"
            : "text-white/20"
        }`}
      />
    ));
  };

  return (
    <section id="clients" className="w-full py-8 md:py-16 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-6xl mx-auto bg-transparent rounded-3xl p-4 md:p-8"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-400/10 rounded-2xl mb-6">
              <User className="h-8 w-8 text-blue-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Nuestros <span className="text-blue-400">Clientes</span>
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Conoce las experiencias reales de quienes ya confiaron en nosotros para importar su coche desde Europa
            </p>
          </div>

          {/* Clients Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {clients.map((client, index) => (
              <motion.div
                key={client.id}
                variants={fadeUp}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group relative"
              >
                {/* Client Avatar and Info */}
                <div className="flex items-center mb-4">
                  <img
                    src={client.avatar}
                    alt={client.name}
                    className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-white/20"
                  />
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg">{client.name}</h3>
                    {client.location && (
                      <div className="flex items-center text-white/60 text-sm">
                        <MapPin className="h-3 w-3 mr-1" />
                        {client.location}
                      </div>
                    )}
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex space-x-1 mr-3">
                    {renderStars(client.rating)}
                  </div>
                  <span className="text-white/60 text-sm">
                    {client.rating}/5
                  </span>
                </div>

                {/* Testimonial */}
                <div className="mb-4">
                  <Quote className="h-6 w-6 text-blue-400 mb-3 opacity-50" />
                  <p className="text-white/80 leading-relaxed text-sm md:text-base">
                    "{client.testimonial}"
                  </p>
                </div>

                {/* Car Info */}
                {client.carBought && (
                  <div className="flex items-center text-white/60 text-sm">
                    <Car className="h-4 w-4 mr-2" />
                    <span>{client.carBought}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          >
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                {clients.length}+
              </div>
              <div className="text-white/70">Clientes Satisfechos</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                5/5
              </div>
              <div className="text-white/70">Valoración Promedio</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                100%
              </div>
              <div className="text-white/70">Recomendación</div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-12"
          >
            <p className="text-white/70 mb-6 text-lg">
              ¿Quieres ser nuestro próximo cliente satisfecho?
            </p>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <a
                href="/coches"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-sm md:text-base font-semibold transition-colors duration-200 flex items-center space-x-2"
              >
                <Car className="h-4 w-4" />
                <span>Ver Catálogo</span>
              </a>
              <a
                href="/contacto"
                className="border border-white/30 text-white px-8 py-3 rounded-full text-sm md:text-base font-semibold hover:bg-white/10 transition-colors duration-200"
              >
                Contactar Ahora
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
