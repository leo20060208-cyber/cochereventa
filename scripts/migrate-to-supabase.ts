/**
 * Script de migración de localStorage a Supabase
 *
 * Este script toma todos los datos actuales de tu archivo data.ts
 * y los inserta en la base de datos de Supabase
 *
 * Para ejecutar:
 * 1. Asegúrate de que el archivo .env.local esté configurado
 * 2. Ejecuta: npm run migrate
 */

import { config } from 'dotenv'
import { resolve } from 'path'
import { createClient } from '@supabase/supabase-js'

// Cargar variables de entorno desde .env.local
config({ path: resolve(__dirname, '../.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Error: Faltan las variables de entorno de Supabase')
  console.error('Asegúrate de que .env.local está configurado correctamente')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Datos iniciales (copiados de data.ts)
const initialCars = [
  {
    brand: "Audi",
    model: "A4",
    year: 2020,
    price: 18500,
    mileage: 70000,
    fuel: "Diesel",
    transmission: "Automático",
    location: "Alemania",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1549317336-206569e8475c?w=800&h=600&fit=crop"
    ],
    features: ["Climatizador", "Navegador", "Bluetooth", "Cámara trasera"],
    description: "Audi A4 en excelente estado, mantenimiento completo en concesionario oficial.",
    status: "available"
  },
  {
    brand: "BMW",
    model: "Serie 3",
    year: 2019,
    price: 21000,
    mileage: 80000,
    fuel: "Gasolina",
    transmission: "Manual",
    location: "Francia",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop"
    ],
    features: ["Techo solar", "Asientos deportivos", "Sistema de sonido premium"],
    description: "BMW Serie 3 con equipamiento deportivo, único propietario.",
    status: "available"
  },
  {
    brand: "Volkswagen",
    model: "Golf",
    year: 2018,
    price: 15200,
    mileage: 60000,
    fuel: "Diesel",
    transmission: "Automático",
    location: "Italia",
    image: "https://images.unsplash.com/photo-1549317336-206569e8475c?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1549317336-206569e8475c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop"
    ],
    features: ["Sensores de aparcamiento", "Cruise control", "USB/Aux"],
    description: "Volkswagen Golf familiar, perfecto estado de conservación.",
    status: "available"
  },
  {
    brand: "Mercedes",
    model: "Clase C",
    year: 2021,
    price: 28500,
    mileage: 45000,
    fuel: "Híbrido",
    transmission: "Automático",
    location: "Alemania",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop"
    ],
    features: ["Asistente de conducción", "CarPlay/Android Auto", "LED"],
    description: "Mercedes Clase C híbrido, tecnología de última generación.",
    status: "available"
  },
  {
    brand: "Audi",
    model: "Q5",
    year: 2019,
    price: 32000,
    mileage: 75000,
    fuel: "Diesel",
    transmission: "Automático",
    location: "Francia",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop"
    ],
    features: ["Tracción integral", "Maletero grande", "Suspensión neumática"],
    description: "Audi Q5 SUV familiar, ideal para viajes y ciudad.",
    status: "available"
  },
  {
    brand: "BMW",
    model: "X3",
    year: 2020,
    price: 35000,
    mileage: 65000,
    fuel: "Gasolina",
    transmission: "Automático",
    location: "Alemania",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1549317336-206569e8475c?w=800&h=600&fit=crop"
    ],
    features: ["Techo panorámico", "Asientos calefactables", "Navegador"],
    description: "BMW X3 con equipamiento premium, mantenimiento BMW.",
    status: "available"
  }
]

const initialVideos = [
  {
    title: "Vídeo Hero - Importación de Coches",
    url: "https://www.youtube.com/embed/3igSQXJBm6E",
    description: "Vídeo principal en la sección hero explicando el proceso de importación",
    active: true,
    type: "hero"
  },
  {
    title: "Vídeo Qué Hacemos Por Ti",
    url: "https://www.youtube.com/embed/3igSQXJBm6E",
    description: "Vídeo explicativo en la sección de servicios",
    active: true,
    type: "what-we-do"
  }
]

const initialFAQs = [
  {
    question: "¿Cuánto tiempo tarda el proceso completo?",
    answer: "El proceso completo suele tardar entre 4-6 semanas desde que adquirimos el vehículo hasta que te lo entregamos en casa. Esto incluye el transporte, homologación, ITV y matriculación.",
    active: true,
    order: 1
  },
  {
    question: "¿Qué garantías ofrecen?",
    answer: "Todos nuestros vehículos pasan por una inspección exhaustiva antes de la compra. Además, incluyen garantía de 12 meses y seguro durante todo el proceso. Si no cumple las condiciones acordadas, te devolvemos el dinero.",
    active: true,
    order: 2
  },
  {
    question: "¿Necesito adelantar dinero antes de recibir el coche?",
    answer: "Solo se requiere una señal del 20% al firmar el contrato. El resto se paga cuando recibes el coche y verificas que cumple con lo acordado. Todo a través de transferencia bancaria segura.",
    active: true,
    order: 3
  },
  {
    question: "¿Qué documentación necesito?",
    answer: "Solo necesitas tu DNI, carnet de conducir y comprobante de ingresos (nómina o declaración de hacienda). Nos encargamos de todo lo demás: papeles del vehículo, homologación, ITV y matriculación.",
    active: true,
    order: 4
  },
  {
    question: "¿Puedo ver el coche antes de comprarlo?",
    answer: "Por supuesto. Te proporcionamos fotos detalladas y videos del estado del vehículo. Además, puedes hablar directamente con el vendedor europeo si tienes alguna duda específica.",
    active: true,
    order: 5
  },
  {
    question: "¿Qué pasa si el coche tiene algún problema?",
    answer: "Si detectamos cualquier problema no mencionado anteriormente, te informamos inmediatamente antes de proceder. Tienes derecho a rechazar el vehículo y buscar una alternativa sin coste adicional.",
    active: true,
    order: 6
  }
]

const initialClients = [
  {
    name: "María García",
    testimonial: "Un proceso increíblemente fácil para comprar mi Audi A4 desde Alemania. El equipo es muy profesional y transparente en cada paso. Ahora disfruto de mi coche todos los días.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b18c?w=150&h=150&fit=crop&crop=face",
    location: "Madrid",
    car_bought: "Audi A4 2019",
    completed_at: "2023-11-15",
    active: true,
    order: 1
  },
  {
    name: "Javier Martín",
    testimonial: "Llevaba meses buscando un BMW Serie 3 con las especificaciones exactas. Estos chicos lo encontraron en Francia y me lo trajeron en perfecto estado. ¡Altamente recomendado!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    location: "Barcelona",
    car_bought: "BMW Serie 3 2020",
    completed_at: "2023-12-03",
    active: true,
    order: 2
  },
  {
    name: "Laura Rodríguez",
    testimonial: "Servicio excelente y precio increíble para el Mercedes Clase C que quería. El proceso fue completamente transparente y sin sorpresas desagradables. Definitivamente repetiré.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    location: "Valencia",
    car_bought: "Mercedes Clase C 2021",
    completed_at: "2024-01-10",
    active: true,
    order: 3
  },
  {
    name: "Carlos López",
    testimonial: "Ideal para quienes buscan una alternativa confiable a los concesionarios tradicionales. Ahorré 8.000€ en mi Volkswagen Golf y el servicio fue impecable desde el primer día.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    location: "Sevilla",
    car_bought: "Volkswagen Golf 2018",
    completed_at: "2023-10-22",
    active: true,
    order: 4
  },
  {
    name: "Ana Ruiz",
    testimonial: "Profesionales, honestos y eficientes. Mi Audi Q5 llegó exactamente como estaba descrito, con toda la documentación en orden. Sin duda la mejor experiencia de compra de coche.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
    location: "Bilbao",
    car_bought: "Audi Q5 2019",
    completed_at: "2024-02-05",
    active: true,
    order: 5
  }
]

const whoWeAreData = {
  id: 1,
  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
  description: "Somos tres chicos jóvenes de Barcelona, de 20, 22 y 23 años, apasionados por el mundo del motor. Desde siempre nos han fascinado los coches y todo lo que los rodea, y decidimos transformar esa pasión en un proyecto real y profesional."
}

const siteSettings = {
  id: 1,
  company_name: "CarImport",
  company_logo: "https://via.placeholder.com/40x40/3B82F6/FFFFFF?text=CI",
  contact_email: "info@carimport.com",
  contact_phone: "+34 640 337 898",
  contact_address: "Carrer de la Marina 123, Barcelona",
  whatsapp_number: "+34640337898",
  instagram_url: "https://instagram.com/carimport",
  facebook_url: "https://facebook.com/carimport",
  twitter_url: "https://twitter.com/carimport",
  linkedin_url: "https://linkedin.com/company/carimport",
  youtube_url: "https://youtube.com/@carimport",
  footer_copyright: "CarImport. Todos los derechos reservados.",
  footer_description: "Tu socio de confianza para importar coches de alta calidad desde Europa. Sin complicaciones, sin sorpresas."
}

async function migrate() {
  console.log('🚀 Iniciando migración a Supabase...\n')

  try {
    // 1. Migrar coches
    console.log('📦 Insertando coches...')
    const { data: cars, error: carsError } = await supabase
      .from('cars')
      .insert(initialCars)
      .select()

    if (carsError) {
      console.error('❌ Error al insertar coches:', carsError)
    } else {
      console.log(`✅ ${cars?.length || 0} coches insertados correctamente`)
    }

    // 2. Migrar videos
    console.log('\n📹 Insertando videos...')
    const { data: videos, error: videosError } = await supabase
      .from('videos')
      .insert(initialVideos)
      .select()

    if (videosError) {
      console.error('❌ Error al insertar videos:', videosError)
    } else {
      console.log(`✅ ${videos?.length || 0} videos insertados correctamente`)
    }

    // 3. Migrar FAQs
    console.log('\n❓ Insertando FAQs...')
    const { data: faqs, error: faqsError } = await supabase
      .from('faqs')
      .insert(initialFAQs)
      .select()

    if (faqsError) {
      console.error('❌ Error al insertar FAQs:', faqsError)
    } else {
      console.log(`✅ ${faqs?.length || 0} FAQs insertadas correctamente`)
    }

    // 4. Migrar clientes
    console.log('\n👥 Insertando testimonios de clientes...')
    const { data: clients, error: clientsError } = await supabase
      .from('clients')
      .insert(initialClients)
      .select()

    if (clientsError) {
      console.error('❌ Error al insertar clientes:', clientsError)
    } else {
      console.log(`✅ ${clients?.length || 0} clientes insertados correctamente`)
    }

    // 5. Actualizar "Quiénes Somos"
    console.log('\n👤 Actualizando sección "Quiénes Somos"...')
    const { data: whoWeAre, error: whoWeAreError } = await supabase
      .from('who_we_are')
      .upsert(whoWeAreData)
      .select()

    if (whoWeAreError) {
      console.error('❌ Error al actualizar "Quiénes Somos":', whoWeAreError)
    } else {
      console.log('✅ Sección "Quiénes Somos" actualizada correctamente')
    }

    // 6. Actualizar configuración del sitio
    console.log('\n⚙️ Actualizando configuración del sitio...')
    const { data: settings, error: settingsError } = await supabase
      .from('site_settings')
      .upsert(siteSettings)
      .select()

    if (settingsError) {
      console.error('❌ Error al actualizar configuración:', settingsError)
    } else {
      console.log('✅ Configuración del sitio actualizada correctamente')
    }

    console.log('\n🎉 ¡Migración completada exitosamente!')
    console.log('\n📊 Resumen:')
    console.log(`   - Coches: ${cars?.length || 0}`)
    console.log(`   - Videos: ${videos?.length || 0}`)
    console.log(`   - FAQs: ${faqs?.length || 0}`)
    console.log(`   - Clientes: ${clients?.length || 0}`)
    console.log(`   - Quiénes Somos: ✅`)
    console.log(`   - Configuración: ✅`)

  } catch (error) {
    console.error('\n❌ Error durante la migración:', error)
    process.exit(1)
  }
}

// Ejecutar migración
migrate()
