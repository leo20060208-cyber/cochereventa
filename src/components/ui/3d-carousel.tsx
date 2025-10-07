"use client"

import { memo, useEffect, useLayoutEffect, useMemo, useState } from "react"
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion"
import { X, MapPin, Calendar, Gauge, Fuel, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

type UseMediaQueryOptions = {
  defaultValue?: boolean
  initializeWithValue?: boolean
}

const IS_SERVER = typeof window === "undefined"

export function useMediaQuery(
  query: string,
  {
    defaultValue = false,
    initializeWithValue = true,
  }: UseMediaQueryOptions = {}
): boolean {
  const getMatches = (query: string): boolean => {
    if (IS_SERVER) {
      return defaultValue
    }
    return window.matchMedia(query).matches
  }

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(query)
    }
    return defaultValue
  })

  const handleChange = () => {
    setMatches(getMatches(query))
  }

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query)
    handleChange()

    matchMedia.addEventListener("change", handleChange)

    return () => {
      matchMedia.removeEventListener("change", handleChange)
    }
  }, [query])

  return matches
}

interface Car {
  id: string
  name: string
  price: number
  year: number
  mileage: number
  location: string
  fuel: string
  seats: number
  description: string
  images: string[]
  features: string[]
}

const cars: Car[] = [
  {
    id: "1",
    name: "Audi A4 2020",
    price: 18500,
    year: 2020,
    mileage: 70000,
    location: "Alemania",
    fuel: "Gasolina",
    seats: 5,
    description: "Audi A4 en excelente estado, mantenimiento completo en concesionario oficial. Interior impecable y motor en perfectas condiciones.",
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop&auto=format&q=80"
    ],
    features: ["Aire acondicionado", "Navegador GPS", "Bluetooth", "Sensores de aparcamiento", "Cámara trasera"]
  },
  {
    id: "2", 
    name: "BMW Serie 3 2019",
    price: 21000,
    year: 2019,
    mileage: 80000,
    location: "Francia",
    fuel: "Diésel",
    seats: 5,
    description: "BMW Serie 3 con motor diésel eficiente. Equipamiento premium y conducción deportiva. Historial completo de mantenimiento.",
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop&auto=format&q=80"
    ],
    features: ["Asientos deportivos", "Sistema de sonido premium", "Control de crucero", "Faros LED", "Volante multifunción"]
  },
  {
    id: "3",
    name: "Volkswagen Golf 2018", 
    price: 15200,
    year: 2018,
    mileage: 60000,
    location: "Italia",
    fuel: "Gasolina",
    seats: 5,
    description: "Volkswagen Golf en perfecto estado. Ideal para ciudad y carretera. Consumo eficiente y gran fiabilidad.",
    images: [
      "https://images.unsplash.com/photo-1549317336-206569e8475c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1549317336-206569e8475c?w=800&h=600&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1549317336-206569e8475c?w=800&h=600&fit=crop&auto=format&q=80"
    ],
    features: ["Aire acondicionado", "Radio CD", "Elevalunas eléctricos", "Cierre centralizado", "ABS"]
  },
  {
    id: "4",
    name: "Mercedes C-Class 2021",
    price: 28500,
    year: 2021,
    mileage: 45000,
    location: "Alemania", 
    fuel: "Híbrido",
    seats: 5,
    description: "Mercedes C-Class híbrida con tecnología de vanguardia. Confort premium y eficiencia energética excepcional.",
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop&auto=format&q=80"
    ],
    features: ["Sistema híbrido", "Pantalla táctil", "Asistente de conducción", "Climatizador automático", "Sistema de sonido Burmester"]
  },
  {
    id: "5",
    name: "Porsche 911 2017",
    price: 45000,
    year: 2017,
    mileage: 35000,
    location: "Alemania",
    fuel: "Gasolina",
    seats: 4,
    description: "Porsche 911 en estado de colección. Motor boxer de 6 cilindros. Conducción deportiva pura y diseño atemporal.",
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop&auto=format&q=80"
    ],
    features: ["Motor boxer", "Transmisión manual", "Suspensión deportiva", "Frenos de cerámica", "Interior de cuero"]
  }
]

const duration = 0.15
const transition = { duration, ease: [0.32, 0.72, 0, 1], filter: "blur(4px)" }
const transitionOverlay = { duration: 0.5, ease: [0.32, 0.72, 0, 1] }

const Carousel = memo(
  ({
    handleClick,
    controls,
    cars,
    isCarouselActive,
  }: {
    handleClick: (car: Car, index: number) => void
    controls: any
    cars: Car[]
    isCarouselActive: boolean
  }) => {
    const isScreenSizeSm = useMediaQuery("(max-width: 640px)")
    const cylinderWidth = isScreenSizeSm ? 1100 : 1800
    const faceCount = cars.length
    const faceWidth = cylinderWidth / faceCount
    const radius = cylinderWidth / (2 * Math.PI)
    const rotation = useMotionValue(0)
    const transform = useTransform(
      rotation,
      (value) => `rotate3d(0, 1, 0, ${value}deg)`
    )

    return (
      <div
        className="flex h-full items-center justify-center"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <motion.div
          drag={isCarouselActive ? "x" : false}
          className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
          style={{
            transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          onDrag={(_, info) =>
            isCarouselActive &&
            rotation.set(rotation.get() + info.offset.x * 0.05)
          }
          onDragEnd={(_, info) =>
            isCarouselActive &&
            controls.start({
              rotateY: rotation.get() + info.velocity.x * 0.05,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 30,
                mass: 0.1,
              },
            })
          }
          animate={controls}
        >
          {cars.map((car, i) => (
            <motion.div
              key={`key-${car.id}-${i}`}
              className="absolute flex h-full origin-center items-center justify-center rounded-xl p-2"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${
                  i * (360 / faceCount)
                }deg) translateZ(${radius}px)`,
              }}
              onClick={() => handleClick(car, i)}
            >
              <div className="relative group">
                <motion.img
                  src={car.images[0]}
                  alt={car.name}
                  layoutId={`img-${car.id}`}
                  className="pointer-events-none w-full rounded-xl object-cover aspect-square shadow-2xl"
                  initial={{ filter: "blur(4px)" }}
                  layout="position"
                  animate={{ filter: "blur(0px)" }}
                  transition={transition}
                />
                <div className="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-lg font-bold">{car.name}</h3>
                    <p className="text-2xl font-bold text-blue-400">{car.price.toLocaleString()}€</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    )
  }
)

function CarPopup({ car, onClose }: { car: Car; onClose: () => void }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="grid md:grid-cols-2 gap-6 p-6">
            {/* Imágenes */}
            <div className="space-y-4">
              <div className="aspect-square rounded-xl overflow-hidden">
                <img
                  src={car.images[currentImageIndex]}
                  alt={car.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex space-x-2">
                {car.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-16 h-16 rounded-lg overflow-hidden ${
                      currentImageIndex === index ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${car.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Información */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{car.name}</h2>
                <p className="text-4xl font-bold text-blue-600 mb-4">{car.price.toLocaleString()}€</p>
                <p className="text-gray-600 leading-relaxed">{car.description}</p>
              </div>

              {/* Características */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <span className="text-sm text-gray-600">{car.year}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Gauge className="h-5 w-5 text-gray-500" />
                  <span className="text-sm text-gray-600">{car.mileage.toLocaleString()} km</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <span className="text-sm text-gray-600">{car.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Fuel className="h-5 w-5 text-gray-500" />
                  <span className="text-sm text-gray-600">{car.fuel}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-gray-500" />
                  <span className="text-sm text-gray-600">{car.seats} plazas</span>
                </div>
              </div>

              {/* Equipamiento */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Equipamiento</h3>
                <div className="grid grid-cols-2 gap-2">
                  {car.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botones */}
              <div className="flex space-x-4 pt-4">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Solicitar Información
                </Button>
                <Button variant="outline" className="flex-1">
                  Agendar Visita
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ThreeDCarCarousel() {
  const [activeCar, setActiveCar] = useState<Car | null>(null)
  const [isCarouselActive, setIsCarouselActive] = useState(true)
  const controls = useAnimation()

  const handleClick = (car: Car) => {
    setActiveCar(car)
    setIsCarouselActive(false)
    controls.stop()
  }

  const handleClose = () => {
    setActiveCar(null)
    setIsCarouselActive(true)
  }

  return (
    <motion.div layout className="relative">
      <AnimatePresence mode="sync">
        {activeCar && (
          <CarPopup car={activeCar} onClose={handleClose} />
        )}
      </AnimatePresence>
      <div className="relative h-[500px] w-full overflow-hidden">
        <Carousel
          handleClick={handleClick}
          controls={controls}
          cars={cars}
          isCarouselActive={isCarouselActive}
        />
      </div>
    </motion.div>
  )
}

export { ThreeDCarCarousel }


