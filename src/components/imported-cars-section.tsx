"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Sparkles } from "lucide-react"

const accordionData = [
  {
    title: "Por qué los coches importados están mejor cuidados",
    content: [
      "Carreteras en mejor estado: en países como Alemania, Holanda o Japón, las carreteras están en excelente estado, lo que reduce el desgaste de frenos, suspensión y neumáticos.",
      "Mantenimiento más riguroso: los propietarios cumplen con revisiones oficiales en tiempo y forma, siguiendo los estándares del fabricante.",
      "Condiciones de conducción más favorables: menor tráfico agresivo, conducción más estable y combustibles de calidad ayudan a conservar los motores en mejor estado.",
      "Historial verificado y documentación completa: los vehículos cuentan con registros de mantenimiento, kilometraje certificado y controles técnicos actualizados."
    ]
  },
  {
    title: "Por qué los coches de gama alta son más rentables",
    content: [
      "Conservan mejor su valor: los coches premium mantienen su precio más estable a lo largo del tiempo, especialmente con historial oficial y procedencia extranjera.",
      "Alta demanda y exclusividad: los modelos de gama alta importados tienen fuerte demanda por su calidad, diseño y fiabilidad, lo que facilita su reventa.",
      "Rentabilidad elevada y segura: en este segmento se pueden obtener beneficios de 4.000 a 10.000 euros por coche, con gestión completa por 1.500 euros, incluyendo transporte, documentación y papeleo integral."
    ]
  },
  {
    title: "Dificultades sin experiencia",
    content: [
      "Trámites y homologaciones complejas: el proceso de importación requiere conocimiento de normativas, impuestos y traducción de documentos.",
      "Riesgo de sobrepago o fraude: sin experiencia es fácil pagar de más o adquirir vehículos con historial manipulado. Trabajar con profesionales garantiza seguridad y ahorro."
    ]
  },
  {
    title: "Por qué importar un coche también es una decisión económica",
    content: [
      "Mayor valor por tu inversión: en coches de 5.000 a 15.000 euros, se pueden obtener márgenes de entre 200 y 2.500 euros, con servicio completo por 1.000 euros. En coches de alta gama, los beneficios pueden llegar a 4.000 – 10.000 euros, con gestión total por 1.500 euros.",
      "Ahorro en mantenimiento futuro: gracias a su mejor conservación y procedencia, estos vehículos requieren menos reparaciones y gastos imprevistos a largo plazo.",
      "Oportunidad de rentabilidad continua: ya sea para uso personal o reventa, importar un coche permite combinar disfrute y beneficio, generando un ingreso extra mensual o una inversión de retorno rápido."
    ]
  }
]

function ScrollingBanner() {
  const message = "Subimos a Alemania cada 15 días, te bajamos un coche a ti también si quieres"

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-600/10 via-blue-500/5 to-blue-600/10 backdrop-blur-sm border border-blue-500/20 rounded-lg py-2.5 mb-10">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: [0, -1200],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 15,
            ease: "linear",
          },
        }}
      >
        {[...Array(12)].map((_, i) => (
          <span
            key={i}
            className="inline-block px-6 text-sm sm:text-base font-semibold text-white/90"
          >
            {message} <span className="text-blue-400">•</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

function AccordionItem({ title, content, isOpen, onClick }: {
  title: string
  content: string[]
  isOpen: boolean
  onClick: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative"
    >
      {/* Glow effect on hover */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-500 ${isOpen ? 'opacity-30' : ''}`} />

      <div className="relative border border-white/10 rounded-xl overflow-hidden bg-black/20 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300">
        <button
          onClick={onClick}
          className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-3 flex-1 pr-4">
            <div className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-blue-400' : 'bg-white/30'} transition-colors`} />
            <h3 className="text-base sm:text-lg font-semibold text-white">
              {title}
            </h3>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex-shrink-0"
          >
            <ChevronDown className={`w-5 h-5 transition-colors ${isOpen ? 'text-blue-400' : 'text-white/60'}`} />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 pt-2 space-y-3 bg-white/5">
                {content.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.08, duration: 0.3 }}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    </div>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                      {item}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function ImportedCarsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Banner animado */}
        <ScrollingBanner />

        {/* Título de la sección */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">Información sobre importación</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Coches <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Importados</span>
          </h2>
          <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto">
            Descubre por qué importar un coche de Europa es una decisión inteligente
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-3"
        >
          {accordionData.map((item, index) => (
            <AccordionItem
              key={index}
              title={item.title}
              content={item.content}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 text-center"
        >
          <p className="text-white/60 mb-6 text-sm sm:text-base">
            ¿Listo para importar tu próximo coche?
          </p>
          <a
            href="/contacto"
            className="inline-block relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full blur opacity-50 group-hover:opacity-75 transition duration-300" />
            <div className="relative bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-xl">
              Contáctanos
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
