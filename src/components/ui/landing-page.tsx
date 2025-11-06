"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Mail,
  MapPin,
  Phone,
  Instagram,
  Twitter,
  Linkedin,
  Facebook,
  ArrowUpRight,
  Car,
  Shield,
  Clock,
  CheckCircle,
  Star,
  Users,
  Award,
  Globe,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

// Animation variants
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

export function CarImportSections() {

  return (
    <div className="flex min-h-screen flex-col">
      {/* Client Logos Section */}
      <section id="clients" className="w-full py-12 md:py-16 lg:py-20 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="container px-4 md:px-6 border border-slate-200 rounded-3xl bg-white/80 backdrop-blur-sm"
        >
          <div className="flex flex-col items-center justify-center space-y-4 text-center py-10">
            <div className="space-y-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-block rounded-3xl bg-blue-50 px-3 py-1 text-sm text-blue-600"
              >
                Confiado por
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-black"
              >
                Nuestros Clientes
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mx-auto max-w-[700px] text-slate-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
              >
                Más de 500 familias han confiado en nosotros para importar su coche desde Europa
              </motion.p>
            </div>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mx-auto grid grid-cols-2 items-center gap-3 py-8 md:grid-cols-3 lg:grid-cols-6"
          >
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                variants={itemFadeIn}
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-center"
              >
                <div className="rounded-3xl border border-slate-200 p-6 bg-white/80 hover:shadow-md transition-all">
                  <div className="w-24 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                    <span className="text-slate-400 text-xs font-medium">Cliente {i + 1}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="w-full py-12 md:py-24 lg:py-32 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="container px-4 md:px-6 border border-slate-200 rounded-3xl bg-white/80 backdrop-blur-sm"
        >
          <div className="flex flex-col items-center justify-center space-y-4 text-center py-10">
            <div className="space-y-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-block rounded-3xl bg-blue-50 px-3 py-1 text-sm text-blue-600"
              >
                Servicios
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-black"
              >
                Qué Hacemos Por Ti
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mx-auto max-w-[900px] text-slate-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
              >
                Nos encargamos de todo el proceso de importación para que tú solo tengas que disfrutar de tu nuevo coche
              </motion.p>
            </div>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mx-auto grid max-w-5xl items-center gap-3 py-12 md:grid-cols-2 lg:grid-cols-3"
          >
            {[
              {
                icon: <Car className="h-10 w-10 text-blue-600" />,
                title: "Búsqueda y Selección",
                description:
                  "Encontramos el coche perfecto para ti en Alemania, Francia o Italia. Revisamos su historial y estado.",
              },
              {
                icon: <Shield className="h-10 w-10 text-blue-600" />,
                title: "Inspección Completa",
                description:
                  "Nuestros técnicos revisan cada detalle del vehículo antes de la compra para garantizar su calidad.",
              },
              {
                icon: <Globe className="h-10 w-10 text-blue-600" />,
                title: "Gestión de Documentos",
                description:
                  "Nos encargamos de todos los trámites legales, homologación y matriculación en España.",
              },
              {
                icon: <CheckCircle className="h-10 w-10 text-blue-600" />,
                title: "ITV y Legalización",
                description: "Pasamos la ITV y completamos todos los trámites para que tu coche esté 100% legal.",
              },
              {
                icon: <Clock className="h-10 w-10 text-blue-600" />,
                title: "Entrega a Domicilio",
                description:
                  "Te entregamos tu coche en casa, listo para conducir, en solo 3-4 semanas desde la compra.",
              },
              {
                icon: <Award className="h-10 w-10 text-blue-600" />,
                title: "Garantía Total",
                description: "Ofrecemos garantía completa en todo el proceso y soporte post-venta.",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                variants={itemFadeIn}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 p-6 shadow-sm transition-all hover:shadow-md bg-white/80"
              >
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-all duration-300"></div>
                <div className="relative space-y-3">
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-black">{service.title}</h3>
                  <p className="text-slate-600">{service.description}</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-600 underline-offset-4 hover:underline">
                    Saber más
                  </span>
                  <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                    <ArrowRight className="h-4 w-4 text-blue-600" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Portfolio/Work Bento Grid */}
      <section id="work" className="w-full py-12 md:py-24 lg:py-32 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="container px-4 md:px-6 border border-slate-200 rounded-3xl bg-white/80 backdrop-blur-sm"
        >
          <div className="flex flex-col items-center justify-center space-y-4 text-center py-10">
            <div className="space-y-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-block rounded-3xl bg-blue-50 px-3 py-1 text-sm text-blue-600"
              >
                Nuestro Trabajo
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-black"
              >
                Coches en Stock
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mx-auto max-w-[900px] text-slate-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
              >
                Algunos de los coches que tenemos disponibles para importación inmediata
              </motion.p>
            </div>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mx-auto grid max-w-7xl gap-3 py-12 md:grid-cols-4 md:grid-rows-2 lg:gap-3"
          >
            {/* Bento Grid Items */}
            <motion.div
              variants={itemFadeIn}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="group relative overflow-hidden rounded-3xl md:col-span-2 md:row-span-2 h-[400px] md:h-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
              <Image
                src="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&h=800&fit=crop&crop=center"
                alt="BMW Serie 3"
                fill
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white opacity-0 transition-opacity group-hover:opacity-100">
                <h3 className="text-xl font-bold">BMW Serie 3 320d</h3>
                <p className="text-sm">2022 • 45.000 km • Automático</p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-3"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-3xl bg-white/20 backdrop-blur-sm border-white/40 text-white hover:bg-white/30"
                  >
                    Ver Detalles <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              variants={itemFadeIn}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="group relative overflow-hidden rounded-3xl h-[200px]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
              <Image
                src="https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=600&fit=crop&crop=center"
                alt="Audi A4"
                fill
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white opacity-0 transition-opacity group-hover:opacity-100">
                <h3 className="text-xl font-bold">Audi A4 Avant</h3>
                <p className="text-sm">2021 • 38.000 km</p>
              </div>
            </motion.div>
            <motion.div
              variants={itemFadeIn}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="group relative overflow-hidden rounded-3xl h-[200px]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
              <Image
                src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=600&fit=crop&crop=center"
                alt="Mercedes C-Class"
                fill
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white opacity-0 transition-opacity group-hover:opacity-100">
                <h3 className="text-xl font-bold">Mercedes C-Class</h3>
                <p className="text-sm">2023 • 25.000 km</p>
              </div>
            </motion.div>
            <motion.div
              variants={itemFadeIn}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="group relative overflow-hidden rounded-3xl h-[200px]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
              <Image
                src="https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=600&fit=crop&crop=center"
                alt="Volkswagen Golf"
                fill
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white opacity-0 transition-opacity group-hover:opacity-100">
                <h3 className="text-xl font-bold">Volkswagen Golf</h3>
                <p className="text-sm">2022 • 42.000 km</p>
              </div>
            </motion.div>
            <motion.div
              variants={itemFadeIn}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="group relative overflow-hidden rounded-3xl md:col-span-2 h-[200px]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
              <Image
                src="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&h=600&fit=crop&crop=center"
                alt="Porsche Macan"
                fill
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white opacity-0 transition-opacity group-hover:opacity-100">
                <h3 className="text-xl font-bold">Porsche Macan S</h3>
                <p className="text-sm">2023 • 15.000 km • Premium</p>
              </div>
            </motion.div>
          </motion.div>
          <div className="flex justify-center pb-10">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="rounded-3xl group bg-blue-600 hover:bg-blue-700">
                Ver Todos los Coches
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </motion.span>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* About/Team Section */}
      <section id="about" className="w-full py-12 md:py-24 lg:py-32 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="container px-4 md:px-6 border border-slate-200 rounded-3xl bg-white/80 backdrop-blur-sm"
        >
          <div className="grid gap-3 lg:grid-cols-2 lg:gap-3">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4 p-6"
            >
              <div className="inline-block rounded-3xl bg-blue-50 px-3 py-1 text-sm text-blue-600">Nuestra Historia</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-black">Quiénes Somos</h2>
              <p className="text-slate-600 md:text-xl/relaxed">
                Desde 2018, hemos ayudado a más de 500 familias a importar su coche ideal desde Europa. 
                Nuestro equipo de expertos conoce cada detalle del proceso de importación y legalización.
              </p>
              <p className="text-slate-600 md:text-xl/relaxed">
                Creemos que todo el mundo merece acceder a los mejores coches europeos sin las complicaciones 
                del proceso de importación. Por eso nos encargamos de todo.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button variant="outline" size="lg" className="rounded-3xl border-blue-200 text-blue-600 hover:bg-blue-50">
                  Nuestro Proceso
                </Button>
                <Button variant="outline" size="lg" className="rounded-3xl border-blue-200 text-blue-600 hover:bg-blue-50">
                  Únete al Equipo
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center"
            >
              <div className="relative h-[350px] w-full md:h-[450px] lg:h-[500px] overflow-hidden rounded-3xl">
              <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop&crop=center"
                  alt="Equipo"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
          <div className="mt-16 px-6 pb-10">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold tracking-tighter sm:text-3xl text-black"
            >
              Conoce a Nuestro Equipo
            </motion.h3>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            >
              {[
                { name: "Carlos Rodríguez", role: "Fundador & CEO" },
                { name: "Ana Martínez", role: "Directora de Operaciones" },
                { name: "David López", role: "Especialista en Importación" },
                { name: "María García", role: "Responsable de Calidad" },
              ].map((member, index) => (
                <motion.div
                  key={index}
                  variants={itemFadeIn}
                  whileHover={{ y: -10 }}
                  className="group relative overflow-hidden rounded-3xl"
                >
                  <Image
                    src={`https://images.unsplash.com/photo-${1500000000000 + index}?w=300&h=400&fit=crop&crop=face`}
                    alt={member.name}
                    width={300}
                    height={400}
                    className="h-[300px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
                    <h4 className="font-bold">{member.name}</h4>
                    <p className="text-sm">{member.role}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-12 md:py-24 lg:py-32 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="container px-4 md:px-6 border border-slate-200 rounded-3xl bg-white/80 backdrop-blur-sm"
        >
          <div className="flex flex-col items-center justify-center space-y-4 text-center py-10">
            <div className="space-y-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-block rounded-3xl bg-blue-50 px-3 py-1 text-sm text-blue-600"
              >
                Testimonios
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-black"
              >
                Lo Que Dicen Nuestros Clientes
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mx-auto max-w-[900px] text-slate-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
              >
                Más de 500 familias han confiado en nosotros. Descubre sus experiencias
              </motion.p>
            </div>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mx-auto grid max-w-5xl gap-3 py-12 lg:grid-cols-2"
          >
            {[
              {
              quote:
                  "El proceso fue increíblemente fácil. En 3 semanas tenía mi BMW en casa, completamente legalizado. Nuestro equipo se encargó de todo.",
                author: "Sara Jiménez",
                company: "Madrid",
              },
              {
                quote:
                  "Ahorré más de 8.000€ comparado con comprarlo en España. El coche estaba en perfecto estado y la documentación impecable.",
                author: "Miguel Torres",
                company: "Barcelona",
              },
              {
                quote:
                  "La transparencia del proceso me convenció desde el primer día. Sabía exactamente en qué punto estaba mi coche en cada momento.",
                author: "Laura Ruiz",
                company: "Valencia",
              },
              {
              quote:
                  "Los recomiendo a todo el mundo. Profesionales, rápidos y con un servicio post-venta excepcional.",
                author: "Roberto Silva",
                company: "Sevilla",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemFadeIn}
                whileHover={{ y: -10 }}
                className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div>
                  <div className="flex gap-0.5 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-current"
                      />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-lg font-medium leading-relaxed text-black">&quot;{testimonial.quote}&quot;</blockquote>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium text-black">{testimonial.author}</p>
                    <p className="text-sm text-slate-600">{testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full py-12 md:py-24 lg:py-32 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="container grid items-center gap-3 px-4 md:px-6 lg:grid-cols-2 border border-slate-200 rounded-3xl bg-white/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-3 p-6"
          >
            <div className="inline-block rounded-3xl bg-blue-50 px-3 py-1 text-sm text-blue-600">Contacto</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-black">¿Listo para tu Coche Ideal?</h2>
            <p className="max-w-[600px] text-slate-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Contacta con nosotros y te ayudaremos a encontrar el coche perfecto para ti. 
              Consulta gratuita sin compromiso.
            </p>
            <div className="mt-8 space-y-4">
              <motion.div whileHover={{ x: 5 }} className="flex items-start gap-3">
                <div className="rounded-3xl bg-blue-50 p-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-black">Nuestra Oficina</h3>
                  <p className="text-sm text-slate-600">Madrid, España</p>
                </div>
              </motion.div>
              <motion.div whileHover={{ x: 5 }} className="flex items-start gap-3">
                <div className="rounded-3xl bg-blue-50 p-2">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-black">Email</h3>
                  <p className="text-sm text-slate-600">hola@rkmgroup.es</p>
                </div>
              </motion.div>
              <motion.div whileHover={{ x: 5 }} className="flex items-start gap-3">
                <div className="rounded-3xl bg-blue-50 p-2">
                  <Phone className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-black">Teléfono</h3>
                  <p className="text-sm text-slate-600">+34 900 123 456</p>
                </div>
              </motion.div>
            </div>
            <div className="mt-8 flex space-x-3">
              {[
                { icon: <Instagram className="h-5 w-5" />, label: "Instagram" },
                { icon: <Twitter className="h-5 w-5" />, label: "Twitter" },
                { icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn" },
                { icon: <Facebook className="h-5 w-5" />, label: "Facebook" },
              ].map((social, index) => (
                <motion.div key={index} whileHover={{ y: -5, scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Link
                    href="#"
                    className="rounded-3xl border border-slate-200 p-2 text-slate-600 hover:text-blue-600 hover:border-blue-200 transition-colors"
                  >
                    {social.icon}
                    <span className="sr-only">{social.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h3 className="text-xl font-bold text-black">Envíanos un Mensaje</h3>
            <p className="text-sm text-slate-600">
              Completa el formulario y nos pondremos en contacto contigo en menos de 24 horas.
            </p>
            <form className="mt-6 space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="first-name"
                    className="text-sm font-medium leading-none text-black"
                  >
                    Nombre
                  </label>
                  <Input id="first-name" placeholder="Tu nombre" className="rounded-3xl" />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="last-name"
                    className="text-sm font-medium leading-none text-black"
                  >
                    Apellidos
                  </label>
                  <Input id="last-name" placeholder="Tus apellidos" className="rounded-3xl" />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium leading-none text-black"
                >
                  Email
                </label>
                <Input id="email" type="email" placeholder="tu@email.com" className="rounded-3xl" />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium leading-none text-black"
                >
                  Mensaje
                </label>
                <Textarea id="message" placeholder="Cuéntanos qué coche buscas..." className="min-h-[120px] rounded-3xl" />
              </div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button type="submit" className="w-full rounded-3xl bg-blue-600 hover:bg-blue-700">
                  Enviar Mensaje
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}



