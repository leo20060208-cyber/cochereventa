"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Component from "@/components/ui/asd";
import * as api from "@/lib/api";

export default function ContactPage() {
  const [contactMethod, setContactMethod] = useState<"whatsapp" | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    carType: "",
    budget: "",
    preferences: "",
    urgency: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleWhatsApp = async () => {
    const message = `Hola, me interesa importar un coche desde Europa. Mi nombre es ${formData.name || 'cliente'}.`;

    // Save reservation to Supabase
    if (formData.name && formData.phone) {
      try {
        await api.addReservation({
          carId: 0, // General inquiry
          carName: "Consulta General",
          customerName: formData.name,
          email: formData.email || "",
          phone: formData.phone,
          method: "whatsapp",
          message: `Consulta WhatsApp: ${message}`,
          status: "pending"
        });
      } catch (error) {
        console.error("Error saving reservation:", error);
      }
    }

    window.open(`https://wa.me/34640337898?text=${encodeURIComponent(message)}`, '_blank');
  };


  return (
    <div className="min-h-screen w-full relative">
      {/* Grid Shader Background */}
      <Component />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <Link 
              href="/"
              className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al inicio
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Contáctanos por WhatsApp
            </h1>
            <p className="text-white/80">
              Respuesta inmediata para todas tus consultas
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!contactMethod && (
              <motion.div
                key="method-selection"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-md mx-auto"
              >
                {/* WhatsApp Option */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setContactMethod("whatsapp")}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 cursor-pointer hover:bg-white/15 transition-all duration-300"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="h-8 w-8 text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">WhatsApp</h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      Respuesta inmediata. Perfecto para consultas rápidas y dudas específicas sobre importación de coches.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {contactMethod === "whatsapp" && (
              <motion.div
                key="whatsapp-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8"
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="h-8 w-8 text-green-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Contacto por WhatsApp</h2>
                  <p className="text-white/80">Completa tus datos y te contactaremos inmediatamente</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-white/90 text-sm font-medium mb-2">Nombre completo</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
                      placeholder="Tu nombre completo"
                    />
                  </div>

                  <div>
                    <label className="block text-white/90 text-sm font-medium mb-2">Teléfono</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
                      placeholder="+34 600 000 000"
                    />
                  </div>

                  <div>
                    <label className="block text-white/90 text-sm font-medium mb-2">¿Qué tipo de coche buscas?</label>
                    <input
                      type="text"
                      name="carType"
                      value={formData.carType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
                      placeholder="Ej: Audi A4, BMW Serie 3, Volkswagen Golf..."
                    />
                  </div>

                  <div>
                    <label className="block text-white/90 text-sm font-medium mb-2">Presupuesto aproximado</label>
                    <input
                      type="text"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
                      placeholder="Ej: 15.000€ - 25.000€"
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setContactMethod(null)}
                      className="flex-1 px-6 py-3 border border-white/30 text-white rounded-xl hover:bg-white/10 transition-colors"
                    >
                      Volver
                    </button>
                    <button
                      onClick={handleWhatsApp}
                      className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors flex items-center justify-center"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Abrir WhatsApp
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
