"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, Phone, Mail, User, Car, Calendar, DollarSign, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import Component from "@/components/ui/asd";

const WHATSAPP_NUMBER = "34640337898";

type ViewType = "initial" | "import" | "sell" | "learn";
type ContactPreference = "Llamada" | "WhatsApp";

interface FormData {
  nombre: string;
  telefono: string;
  email: string;
  // Import service fields
  necesitaAsesoria?: boolean;
  tieneModeloClaro?: boolean;
  marca?: string;
  año?: string;
  presupuesto?: string;
  fechaEntrega?: string;
  preferencia?: ContactPreference;
  descripcionNecesidades?: string;
  // Sell car fields
  descripcion?: string;
  // Additional info
  informacionAdicional?: string;
}

export function PopupInicio() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>("initial");
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    telefono: "",
    email: "",
  });
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    // Limpiar localStorage para que siempre aparezca
    localStorage.removeItem("hasSeenPopup");
    
    // Small delay for better UX
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    // Prevent closing without selecting an option
    if (currentView === "initial") {
      return;
    }
    setIsOpen(false);
    localStorage.setItem("hasSeenPopup", "true");
  };

  const handleOptionSelect = (view: ViewType) => {
    setCurrentView(view);
  };

  const handleBack = () => {
    setCurrentView("initial");
    setFormData({
      nombre: "",
      telefono: "",
      email: "",
    });
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let message = "";
    
    switch (currentView) {
      case "import":
        if (formData.necesitaAsesoria === true) {
          message = `Hola, quiero contratar el servicio de importación de coche a la puerta de mi casa.
Nombre: ${formData.nombre}
Teléfono: ${formData.telefono}
Correo: ${formData.email}

✅ Necesito asesoría gratuita para escoger el modelo.

Descripción de lo que necesito:
${formData.descripcionNecesidades || "No especificado"}

Prefiero contacto por ${formData.preferencia || "WhatsApp"}.`;
        } else if (formData.tieneModeloClaro === true) {
          message = `Hola, quiero contratar el servicio de importación de coche a la puerta de mi casa.
Nombre: ${formData.nombre}
Teléfono: ${formData.telefono}
Correo: ${formData.email}

✅ Tengo claro el modelo que quiero.

Coche deseado: ${formData.marca || "No especificado"}
Año aproximado: ${formData.año || "No especificado"}
Presupuesto: ${formData.presupuesto || "No especificado"}
Fecha deseada: ${formData.fechaEntrega || "No especificada"}${formData.informacionAdicional ? `

Información adicional:
${formData.informacionAdicional}` : ""}

Prefiero contacto por ${formData.preferencia || "WhatsApp"}.`;
        } else {
          message = `Hola, quiero contratar el servicio de importación de coche a la puerta de mi casa.
Nombre: ${formData.nombre}
Teléfono: ${formData.telefono}
Correo: ${formData.email}

Prefiero contacto por ${formData.preferencia || "WhatsApp"}.`;
        }
        break;
        
      case "sell":
        message = `Hola, quiero vender mi coche.
Nombre: ${formData.nombre}
Teléfono: ${formData.telefono}
Correo: ${formData.email}
Descripción del coche: ${formData.descripcion || "No especificada"}`;
        break;
        
      case "learn":
        message = `Hola, quiero aprender sobre la importación de coches.
Nombre: ${formData.nombre}
Teléfono: ${formData.telefono}
Correo: ${formData.email}`;
        break;
    }
    
    // Show redirecting message
    setIsRedirecting(true);
    
    // Redirect to WhatsApp after a short delay
    setTimeout(() => {
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
      
      // Close popup and mark as seen
      setIsOpen(false);
      localStorage.setItem("hasSeenPopup", "true");
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop con shader de fondo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
            onClick={handleClose}
          >
            <Component />
          </motion.div>
          
          {/* Popup */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl shadow-2xl pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button - only show if not on initial view */}
              {currentView !== "initial" && (
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all hover:scale-110 z-10 shadow-lg border border-white/20"
                  aria-label="Cerrar"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              )}
              
              {/* Back button - show on form views */}
              {currentView !== "initial" && (
                <button
                  onClick={handleBack}
                  className="absolute top-4 left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all hover:scale-110 z-10 shadow-lg border border-white/20"
                  aria-label="Volver"
                >
                  <ArrowLeft className="w-5 h-5 text-white" />
                </button>
              )}
              
              <div className="p-8 md:p-12">
                <AnimatePresence mode="wait">
                  {currentView === "initial" ? (
                    <InitialView key="initial" onSelect={handleOptionSelect} />
                  ) : isRedirecting ? (
                    <RedirectingView key="redirecting" />
                  ) : (
                    <FormView
                      key={currentView}
                      viewType={currentView}
                      formData={formData}
                      onInputChange={handleInputChange}
                      onSubmit={handleSubmit}
                    />
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

// Initial view with three options
function InitialView({ onSelect }: { onSelect: (view: ViewType) => void }) {
  const options = [
    {
      id: "import" as ViewType,
      title: "Servicio de importación de coche a la puerta de tu casa",
      icon: Car,
      gradient: "from-blue-500 to-blue-600",
      hoverGradient: "hover:from-blue-600 hover:to-blue-700",
    },
    {
      id: "sell" as ViewType,
      title: "Quiero vender mi coche",
      icon: DollarSign,
      gradient: "from-green-500 to-green-600",
      hoverGradient: "hover:from-green-600 hover:to-green-700",
    },
    {
      id: "learn" as ViewType,
      title: "Quiero aprender sobre importación de coches",
      icon: MessageCircle,
      gradient: "from-purple-500 to-purple-600",
      hoverGradient: "hover:from-purple-600 hover:to-purple-700",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="text-center"
    >
      {/* Logo with glow effect */}
      <div className="flex justify-center mb-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-blue-400/30 rounded-full blur-xl"></div>
          <img
            src="/LOGO.jpg"
            alt="Logo"
            className="relative w-24 h-24 rounded-full object-cover shadow-2xl ring-4 ring-blue-400/30"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </motion.div>
      </div>
      
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
        ¿Qué te interesa?
      </h2>
      <p className="text-white/80 mb-8 text-lg font-medium">
        Elige una opción para continuar
      </p>
      
      <div className="space-y-4">
        {options.map((option, index) => {
          const Icon = option.icon;
          return (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onSelect(option.id)}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "group relative w-full p-6 rounded-2xl text-white font-semibold text-left overflow-hidden",
                "transition-all duration-300",
                "shadow-xl hover:shadow-2xl",
                "bg-gradient-to-r",
                option.gradient,
                option.hoverGradient
              )}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              
              <div className="relative flex items-center gap-4">
                <div className="p-3 bg-white/30 backdrop-blur-sm rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7" />
                </div>
                <span className="text-lg flex-1">{option.title}</span>
                <motion.div
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  className="text-white/80"
                >
                  →
                </motion.div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

// Form view for each option
function FormView({
  viewType,
  formData,
  onInputChange,
  onSubmit,
}: {
  viewType: ViewType;
  formData: FormData;
  onInputChange: (field: keyof FormData, value: string | boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  const titles: Record<Exclude<ViewType, "initial">, string> = {
    import: "Servicio de importación",
    sell: "Vender mi coche",
    learn: "Aprender sobre importación",
  };

  // This should never happen, but TypeScript needs the check
  if (viewType === "initial") return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Logo pequeño en formularios con efecto */}
      <div className="flex justify-center pt-4 mb-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-lg"></div>
          <img
            src="/LOGO.jpg"
            alt="Logo"
            className="relative w-16 h-16 rounded-full object-cover shadow-xl ring-2 ring-blue-400/40"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </motion.div>
      </div>
      
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
        {titles[viewType]}
      </h2>
      
      <form onSubmit={onSubmit} className="space-y-5">
        {/* Common fields */}
        <div className="space-y-2">
          <Label htmlFor="nombre" className="flex items-center gap-2 text-white/90 font-semibold">
            <User className="w-4 h-4 text-blue-400" />
            Nombre *
          </Label>
          <Input
            id="nombre"
            type="text"
            required
            value={formData.nombre}
            onChange={(e) => onInputChange("nombre", e.target.value)}
            placeholder="Tu nombre completo"
            className="h-12 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:ring-blue-400/20 transition-all"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="telefono" className="flex items-center gap-2 text-white/90 font-semibold">
            <Phone className="w-4 h-4 text-blue-400" />
            Teléfono *
          </Label>
          <Input
            id="telefono"
            type="tel"
            required
            value={formData.telefono}
            onChange={(e) => onInputChange("telefono", e.target.value)}
            placeholder="600123456"
            className="h-12 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:ring-blue-400/20 transition-all"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2 text-white/90 font-semibold">
            <Mail className="w-4 h-4 text-blue-400" />
            Correo electrónico *
          </Label>
          <Input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => onInputChange("email", e.target.value)}
            placeholder="tu@email.com"
            className="h-12 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:ring-blue-400/20 transition-all"
          />
        </div>
        
        {/* Import service specific fields */}
        {viewType === "import" && (
          <>
            {/* Pregunta 1: ¿Necesita asesoría? */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-white/90 font-semibold">
                ¿Te interesa asesoría gratuita para escoger el modelo?
              </Label>
              <div className="flex gap-4">
                <motion.button
                  type="button"
                  onClick={() => onInputChange("necesitaAsesoria", true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "flex-1 py-3 px-4 rounded-xl border-2 transition-all font-semibold",
                    formData.necesitaAsesoria === true
                      ? "border-blue-500 bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                      : "border-white/20 bg-white/10 text-white/80 hover:border-white/30 hover:bg-white/20"
                  )}
                >
                  Sí
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => onInputChange("necesitaAsesoria", false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "flex-1 py-3 px-4 rounded-xl border-2 transition-all font-semibold",
                    formData.necesitaAsesoria === false
                      ? "border-blue-500 bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                      : "border-white/20 bg-white/10 text-white/80 hover:border-white/30 hover:bg-white/20"
                  )}
                >
                  No
                </motion.button>
              </div>
            </div>

            {/* Si necesita asesoría, mostrar campo de descripción */}
            {formData.necesitaAsesoria === true && (
              <div className="space-y-2">
                <Label htmlFor="descripcionNecesidades" className="text-white/90 font-semibold">
                  Describe aquí qué es lo que necesitas (servicio, preferencias, etc.)
                </Label>
                <Textarea
                  id="descripcionNecesidades"
                  value={formData.descripcionNecesidades || ""}
                  onChange={(e) => onInputChange("descripcionNecesidades", e.target.value)}
                  placeholder="Ej: Busco un coche familiar, automático, con bajo consumo, presupuesto hasta 30.000€..."
                  className="min-h-[120px] bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:ring-blue-400/20 transition-all"
                />
              </div>
            )}

            {/* Pregunta 2: ¿Tiene el modelo claro? */}
            {formData.necesitaAsesoria === false && (
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-white/90 font-semibold">
                  ¿Tienes claro el modelo?
                </Label>
                <div className="flex gap-4">
                  <motion.button
                    type="button"
                    onClick={() => onInputChange("tieneModeloClaro", true)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "flex-1 py-3 px-4 rounded-xl border-2 transition-all font-semibold",
                      formData.tieneModeloClaro === true
                        ? "border-blue-500 bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                        : "border-white/20 bg-white/10 text-white/80 hover:border-white/30 hover:bg-white/20"
                    )}
                  >
                    Sí
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => onInputChange("tieneModeloClaro", false)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "flex-1 py-3 px-4 rounded-xl border-2 transition-all font-semibold",
                      formData.tieneModeloClaro === false
                        ? "border-blue-500 bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                        : "border-white/20 bg-white/10 text-white/80 hover:border-white/30 hover:bg-white/20"
                    )}
                  >
                    No
                  </motion.button>
                </div>
              </div>
            )}

            {/* Si tiene el modelo claro, mostrar campos específicos */}
            {formData.necesitaAsesoria === false && formData.tieneModeloClaro === true && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="marca" className="flex items-center gap-2 text-white/90 font-semibold">
                    <Car className="w-4 h-4 text-blue-400" />
                    Marca y modelo deseados
                  </Label>
                  <Input
                    id="marca"
                    type="text"
                    value={formData.marca || ""}
                    onChange={(e) => onInputChange("marca", e.target.value)}
                    placeholder="Ej: BMW X3"
                    className="h-12 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:ring-blue-400/20 transition-all"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="año" className="flex items-center gap-2 text-white/90 font-semibold">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    Año aproximado
                  </Label>
                  <Input
                    id="año"
                    type="text"
                    value={formData.año || ""}
                    onChange={(e) => onInputChange("año", e.target.value)}
                    placeholder="Ej: 2020"
                    className="h-12 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:ring-blue-400/20 transition-all"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="presupuesto" className="flex items-center gap-2 text-white/90 font-semibold">
                    <DollarSign className="w-4 h-4 text-blue-400" />
                    Presupuesto
                  </Label>
                  <Input
                    id="presupuesto"
                    type="text"
                    value={formData.presupuesto || ""}
                    onChange={(e) => onInputChange("presupuesto", e.target.value)}
                    placeholder="Ej: 25000 €"
                    className="h-12 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:ring-blue-400/20 transition-all"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fechaEntrega" className="flex items-center gap-2 text-white/90 font-semibold">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    Fecha deseada de entrega
                  </Label>
                  <Input
                    id="fechaEntrega"
                    type="text"
                    value={formData.fechaEntrega || ""}
                    onChange={(e) => onInputChange("fechaEntrega", e.target.value)}
                    placeholder="Ej: diciembre 2025"
                    className="h-12 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:ring-blue-400/20 transition-all"
                  />
                </div>
              </>
            )}

            {/* Campo adicional al final si tiene modelo claro */}
            {formData.necesitaAsesoria === false && formData.tieneModeloClaro === true && (
              <div className="space-y-2">
                <Label htmlFor="informacionAdicional" className="text-white/90 font-semibold">
                  Información adicional (opcional)
                </Label>
                <Textarea
                  id="informacionAdicional"
                  value={formData.informacionAdicional || ""}
                  onChange={(e) => onInputChange("informacionAdicional", e.target.value)}
                  placeholder="Cualquier otra cosa que debamos saber sobre el coche, servicio u otras preferencias..."
                  className="min-h-[100px] bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:ring-blue-400/20 transition-all"
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-white/90 font-semibold">
                <MessageCircle className="w-4 h-4 text-blue-400" />
                Preferencia de contacto
              </Label>
              <div className="flex gap-4">
                <motion.button
                  type="button"
                  onClick={() => onInputChange("preferencia", "Llamada")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "flex-1 py-3 px-4 rounded-xl border-2 transition-all font-semibold",
                    formData.preferencia === "Llamada"
                      ? "border-blue-500 bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                      : "border-white/20 bg-white/10 text-white/80 hover:border-white/30 hover:bg-white/20"
                  )}
                >
                  📞 Llamada
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => onInputChange("preferencia", "WhatsApp")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "flex-1 py-3 px-4 rounded-xl border-2 transition-all font-semibold",
                    formData.preferencia === "WhatsApp" || !formData.preferencia
                      ? "border-green-500 bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
                      : "border-white/20 bg-white/10 text-white/80 hover:border-white/30 hover:bg-white/20"
                  )}
                >
                  💬 WhatsApp
                </motion.button>
              </div>
            </div>
          </>
        )}
        
        {/* Sell car specific fields */}
        {viewType === "sell" && (
          <div className="space-y-2">
            <Label htmlFor="descripcion" className="text-white/90 font-semibold">
              Descripción del coche (marca, modelo, año, estado, km, precio deseado)
            </Label>
            <Textarea
              id="descripcion"
              value={formData.descripcion || ""}
              onChange={(e) => onInputChange("descripcion", e.target.value)}
              placeholder="Ej: Audi A3 2018, 85.000 km, buen estado. Precio deseado: 15.000 €"
              className="min-h-[120px] bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:ring-blue-400/20 transition-all"
            />
          </div>
        )}
        
        {/* Submit button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            type="submit"
            className="group relative w-full h-14 text-lg font-bold bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 hover:from-green-600 hover:via-green-700 hover:to-emerald-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all overflow-hidden"
          >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            
            <span className="relative flex items-center justify-center gap-2">
              <MessageCircle className="w-5 h-5" />
              {viewType === "learn" ? "Contactadme por WhatsApp" : "Enviar por WhatsApp"}
            </span>
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
}

// Redirecting view
function RedirectingView() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="text-center py-16"
    >
      {/* WhatsApp icon with pulse animation */}
      <motion.div 
        className="mb-8 relative"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="absolute inset-0 bg-green-400/30 rounded-full blur-2xl"></div>
        <div className="relative w-24 h-24 mx-auto bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl">
          <MessageCircle className="w-12 h-12 text-white" />
        </div>
      </motion.div>
      
      {/* Loading spinner */}
      <div className="mb-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 mx-auto border-4 border-green-500 border-t-transparent rounded-full"
        />
      </div>
      
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
        Redirigiéndote a WhatsApp...
      </h3>
      <p className="text-white/80 text-lg">
        En un momento te abriremos WhatsApp con tu mensaje preparado
      </p>
    </motion.div>
  );
}
 