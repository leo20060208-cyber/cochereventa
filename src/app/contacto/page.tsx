"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Calendar, ArrowLeft, Car, Clock, User, Mail, Phone } from "lucide-react";
import Link from "next/link";
import Component from "@/components/ui/asd";
import { addReservation } from "@/lib/data";

export default function ContactPage() {
  const [contactMethod, setContactMethod] = useState<"whatsapp" | "meet" | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    carType: "",
    budget: "",
    preferences: "",
    urgency: ""
  });
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleWhatsApp = () => {
    const message = `Hola, me interesa importar un coche desde Europa. Mi nombre es ${formData.name || 'cliente'}.`;
    
    // Save reservation to data store
    if (formData.name && formData.phone) {
      addReservation({
        carId: 0, // General inquiry
        carName: "Consulta General",
        customerName: formData.name,
        email: formData.email || "",
        phone: formData.phone,
        method: "whatsapp",
        message: `Consulta WhatsApp: ${message}`,
        status: "pending"
      });
    }
    
    window.open(`https://wa.me/34600000000?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleMeetSubmit = () => {
    // Save reservation to data store
    if (formData.name && formData.email && formData.phone && selectedDate && selectedTime) {
      addReservation({
        carId: 0, // General inquiry
        carName: "Consulta General",
        customerName: formData.name,
        email: formData.email,
        phone: formData.phone,
        method: "meet",
        date: selectedDate,
        time: selectedTime,
        message: `Cita agendada. Tipo de coche: ${formData.carType || 'No especificado'}. Presupuesto: ${formData.budget || 'No especificado'}. Preferencias: ${formData.preferences || 'No especificadas'}. Urgencia: ${formData.urgency || 'No especificada'}.`,
        status: "pending"
      });
      
      alert(`Cita agendada para ${selectedDate} a las ${selectedTime}. Te contactaremos pronto.`);
    } else {
      alert("Por favor, completa todos los campos obligatorios.");
    }
  };

  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"
  ];

  const availableDates = [
    "2024-01-15", "2024-01-16", "2024-01-17", "2024-01-18", "2024-01-19"
  ];

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
              ¿Cómo prefieres que te contactemos?
            </h1>
            <p className="text-white/80">
              Elige la opción que mejor se adapte a ti
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!contactMethod && (
              <motion.div
                key="method-selection"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid md:grid-cols-2 gap-6"
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

                {/* Meet Option */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setContactMethod("meet")}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 cursor-pointer hover:bg-white/15 transition-all duration-300"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="h-8 w-8 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Agendar Meet</h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      Videollamada personalizada. Ideal para explicarte todo el proceso y resolver todas tus dudas.
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

            {contactMethod === "meet" && (
              <motion.div
                key="meet-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8"
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-8 w-8 text-blue-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Agendar Videollamada</h2>
                  <p className="text-white/80">Completa el formulario y elige tu horario preferido</p>
                </div>

                <div className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid md:grid-cols-2 gap-4">
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
                      <label className="block text-white/90 text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
                        placeholder="tu@email.com"
                      />
                    </div>
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

                  {/* Car Information */}
                  <div className="border-t border-white/20 pt-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <Car className="h-5 w-5 mr-2 text-blue-400" />
                      Información del Coche
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/90 text-sm font-medium mb-2">¿Qué tipo de coche buscas?</label>
                        <input
                          type="text"
                          name="carType"
                          value={formData.carType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
                          placeholder="Ej: Audi A4, BMW Serie 3..."
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
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/90 text-sm font-medium mb-2">¿Cómo lo quieres? (año, km, características...)</label>
                    <textarea
                      name="preferences"
                      value={formData.preferences}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors resize-none"
                      placeholder="Ej: Coche de 2019-2021, menos de 80.000km, automático, color negro o gris..."
                    />
                  </div>

                  <div>
                    <label className="block text-white/90 text-sm font-medium mb-2">¿Cuándo lo necesitas?</label>
                    <select
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-colors"
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="urgent">Lo antes posible</option>
                      <option value="1month">En 1 mes</option>
                      <option value="2-3months">En 2-3 meses</option>
                      <option value="flexible">Soy flexible</option>
                    </select>
                  </div>

                  {/* Calendar Section */}
                  <div className="border-t border-white/20 pt-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-blue-400" />
                      Selecciona Fecha y Hora
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Date Selection */}
                      <div>
                        <label className="block text-white/90 text-sm font-medium mb-2">Fecha disponible</label>
                        <div className="grid grid-cols-2 gap-2">
                          {availableDates.map((date) => (
                            <button
                              key={date}
                              onClick={() => setSelectedDate(date)}
                              className={`p-3 rounded-xl text-sm transition-colors ${
                                selectedDate === date
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-white/10 text-white/80 hover:bg-white/20'
                              }`}
                            >
                              {new Date(date).toLocaleDateString('es-ES', { 
                                weekday: 'short', 
                                day: 'numeric',
                                month: 'short'
                              })}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Time Selection */}
                      <div>
                        <label className="block text-white/90 text-sm font-medium mb-2">Hora disponible</label>
                        <div className="grid grid-cols-2 gap-2">
                          {timeSlots.map((time) => (
                            <button
                              key={time}
                              onClick={() => setSelectedTime(time)}
                              className={`p-3 rounded-xl text-sm transition-colors ${
                                selectedTime === time
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-white/10 text-white/80 hover:bg-white/20'
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setContactMethod(null)}
                      className="flex-1 px-6 py-3 border border-white/30 text-white rounded-xl hover:bg-white/10 transition-colors"
                    >
                      Volver
                    </button>
                    <button
                      onClick={handleMeetSubmit}
                      disabled={!selectedDate || !selectedTime}
                      className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-xl transition-colors flex items-center justify-center"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Agendar Cita
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
