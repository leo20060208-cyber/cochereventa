"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, Car, Calendar, Fuel, Gauge, Users, MapPin, Euro, MessageSquare, Play, Pause, CreditCard, Clock, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Component from "@/components/ui/asd";
import { getCars, addReservation, type Car } from "@/lib/data";

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [currentCarIndex, setCurrentCarIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedType, setSelectedType] = useState("TODOS");

  // Load cars from data store
  useEffect(() => {
    setCars(getCars());
  }, []);

  // Filter cars by type
  const filteredCars = cars.filter(car => {
    if (selectedType === "TODOS") return true;
    if (selectedType === "SEDÁN") return car.model.toLowerCase().includes("a4") || car.model.toLowerCase().includes("serie") || car.model.toLowerCase().includes("clase");
    if (selectedType === "SUV") return car.model.toLowerCase().includes("q5") || car.model.toLowerCase().includes("x3");
    if (selectedType === "DEPORTIVO") return car.model.toLowerCase().includes("golf") || car.model.toLowerCase().includes("clio");
    return true;
  });

  // Update current car when filter changes
  useEffect(() => {
    if (filteredCars.length > 0) {
      setCurrentCarIndex(0);
      setCurrentImageIndex(0);
    }
  }, [selectedType, filteredCars.length]);

  // Show all cars in catalog
  const catalogCars = cars;

  const currentCar = filteredCars[currentCarIndex];

  const nextCar = () => {
    setCurrentCarIndex((prev) => (prev + 1) % filteredCars.length);
    setCurrentImageIndex(0);
  };

  const prevCar = () => {
    setCurrentCarIndex((prev) => (prev - 1 + filteredCars.length) % filteredCars.length);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (currentCar) {
      setCurrentImageIndex((prev) => (prev + 1) % currentCar.images.length);
    }
  };

  const prevImage = () => {
    if (currentCar) {
      setCurrentImageIndex((prev) => (prev - 1 + currentCar.images.length) % currentCar.images.length);
    }
  };

  const handleWhatsApp = (car: Car) => {
    const message = `Hola, me interesa el ${car.brand} ${car.model} ${car.year} por ${car.price.toLocaleString()}€. ¿Podrían darme más información?`;
    
    // Save reservation to data store
    addReservation({
      carId: car.id,
      carName: `${car.brand} ${car.model} ${car.year}`,
      customerName: "Cliente Web",
      email: "",
      phone: "",
      method: "whatsapp",
      message: message,
      status: "pending"
    });
    
    window.open(`https://wa.me/34600000000?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleDeposit = (car: Car) => {
    // Save reservation to data store
    addReservation({
      carId: car.id,
      carName: `${car.brand} ${car.model} ${car.year}`,
      customerName: "Cliente Web",
      email: "",
      phone: "",
      method: "meet",
      message: `Reserva con fianza de ${car.brand} ${car.model} ${car.year}`,
      status: "pending"
    });
    
    // In a real app, this would redirect to a payment gateway
    alert(`Redirigiendo al pago de fianza para ${car.brand} ${car.model} ${car.year}`);
  };

  if (!currentCar) {
    return (
      <div className="min-h-screen w-full relative flex items-center justify-center">
        <Component />
        <div className="relative z-10 text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Cargando catálogo...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full relative">
      {/* Grid Shader Background */}
      <Component />
      
      {/* Header */}
      <div className="relative z-10 pt-20 pb-8">
        <div className="container mx-auto px-4">
          <Link href="/" className="absolute top-4 left-4 text-white/80 hover:text-white transition-colors flex items-center">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span className="hidden sm:inline">Volver al inicio</span>
          </Link>

          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Nuestro <span className="text-blue-400">Catálogo</span>
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Descubre nuestra selección de coches importados de Europa
            </p>
          </div>
        </div>
      </div>

      {/* Car Banner - Porsche Style */}
      <div className="relative z-10 min-h-screen">
        <motion.div
          key={currentCarIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative min-h-screen flex flex-col"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <Image
                  src={currentCar.images[currentImageIndex]}
                  alt={`${currentCar.brand} ${currentCar.model}`}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Content Overlay */}
          <div className="relative z-10 flex-1 flex flex-col">
            {/* Top Navigation */}
            <div className="flex items-center justify-between p-4 sm:p-6 md:p-8">
              <div className="flex items-center space-x-4">
                <div className="text-white/60 text-xs sm:text-sm font-medium">IMPORTACIÓN EUROPEA</div>
              </div>
              
              <div className="hidden sm:flex items-center space-x-4 md:space-x-6 text-white/80 text-xs sm:text-sm">
                <button className="hover:text-white transition-colors">CATÁLOGO</button>
                <button className="hover:text-white transition-colors">SERVICIOS</button>
                <button className="hover:text-white transition-colors">CONTACTO</button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex items-center">
              <div className="container mx-auto px-4 sm:px-6 md:px-8">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  {/* Left Side - Car Info */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="space-y-8"
                  >
                    {/* Car Type Filter */}
                    <div className="flex flex-wrap gap-2 sm:gap-4 text-white/60 text-xs sm:text-sm font-medium">
                      <button 
                        onClick={() => setSelectedType("TODOS")}
                        className={`px-3 py-1 rounded-full transition-colors ${
                          selectedType === "TODOS" 
                            ? "text-white bg-white/20 border border-white/30" 
                            : "hover:text-white"
                        }`}
                      >
                        TODOS
                      </button>
                      <button 
                        onClick={() => setSelectedType("SEDÁN")}
                        className={`px-3 py-1 rounded-full transition-colors ${
                          selectedType === "SEDÁN" 
                            ? "text-white bg-white/20 border border-white/30" 
                            : "hover:text-white"
                        }`}
                      >
                        SEDÁN
                      </button>
                      <button 
                        onClick={() => setSelectedType("SUV")}
                        className={`px-3 py-1 rounded-full transition-colors ${
                          selectedType === "SUV" 
                            ? "text-white bg-white/20 border border-white/30" 
                            : "hover:text-white"
                        }`}
                      >
                        SUV
                      </button>
                      <button 
                        onClick={() => setSelectedType("DEPORTIVO")}
                        className={`px-3 py-1 rounded-full transition-colors ${
                          selectedType === "DEPORTIVO" 
                            ? "text-white bg-white/20 border border-white/30" 
                            : "hover:text-white"
                        }`}
                      >
                        DEPORTIVO
                      </button>
                    </div>

                    {/* Car Model */}
                    <div className="space-y-4">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-white/40 text-lg font-light"
                      >
                        FROM € {currentCar.price.toLocaleString()}
                      </motion.div>
                      
                      <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white leading-none"
                      >
                        {currentCar.brand}
                        <br />
                        <span className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl">{currentCar.model}</span>
                      </motion.h1>
                    </div>

                    {/* Performance Stats */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                      className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8"
                    >
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
                        </div>
                        <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">{currentCar.fuel}</div>
                        <div className="text-white/60 text-xs sm:text-sm">COMBUSTIBLE</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <Gauge className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
                        </div>
                        <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">{currentCar.mileage.toLocaleString()}</div>
                        <div className="text-white/60 text-xs sm:text-sm">KILÓMETROS</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
                        </div>
                        <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">{currentCar.year}</div>
                        <div className="text-white/60 text-xs sm:text-sm">AÑO</div>
                      </div>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.9 }}
                      className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                    >
                      <button
                        onClick={() => handleWhatsApp(currentCar)}
                        className="bg-white text-black font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-full hover:bg-white/90 transition-colors flex items-center justify-center text-sm sm:text-base"
                      >
                        <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                        CONTACTAR
                      </button>
                      
                      <button
                        onClick={() => handleDeposit(currentCar)}
                        className="border-2 border-white text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-full hover:bg-white hover:text-black transition-colors flex items-center justify-center text-sm sm:text-base"
                      >
                        <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                        PAGAR FIANZA
                      </button>
                    </motion.div>
                  </motion.div>

                  {/* Right Side - Car Image */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="relative"
                  >
                    <div className="relative">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="relative z-10"
                      >
                        <Image
                          src={currentCar.images[currentImageIndex]}
                          alt={`${currentCar.brand} ${currentCar.model}`}
                          width={600}
                          height={400}
                          className="object-contain w-full h-auto"
                          priority
                        />
                      </motion.div>
                      
                      {/* 360 View Button */}
                      <motion.button
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 1 }}
                        className="absolute bottom-8 right-8 w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                      >
                        <span className="text-xs font-bold">360°</span>
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Bottom Navigation */}
            <div className="p-4 sm:p-6 md:p-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
                {/* Page Indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="text-white/60 text-lg sm:text-2xl font-light order-2 sm:order-1"
                >
                  {String(currentCarIndex + 1).padStart(2, '0')} / {String(filteredCars.length).padStart(2, '0')}
                </motion.div>

                {/* Car Selection */}
                <div className="flex items-center space-x-2 sm:space-x-4 order-1 sm:order-2 overflow-x-auto max-w-xs sm:max-w-none">
                  {catalogCars.map((car, index) => {
                    const filteredIndex = filteredCars.findIndex(filteredCar => filteredCar.id === car.id);
                    const isActive = filteredIndex === currentCarIndex && filteredCars.includes(car);
                    
                    return (
                      <motion.button
                        key={car.id}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 1.3 + index * 0.1 }}
                        onClick={() => {
                          if (filteredCars.includes(car)) {
                            setCurrentCarIndex(filteredIndex);
                            setCurrentImageIndex(0);
                          }
                        }}
                        className={`w-12 h-8 sm:w-16 sm:h-10 rounded-lg overflow-hidden transition-all duration-300 flex-shrink-0 ${
                          isActive
                            ? 'ring-2 ring-white scale-110' 
                            : filteredCars.includes(car)
                            ? 'opacity-70 hover:opacity-100'
                            : 'opacity-30'
                        }`}
                      >
                        <Image
                          src={car.image}
                          alt={car.brand}
                          width={64}
                          height={40}
                          className="object-cover w-full h-full"
                        />
                      </motion.button>
                    );
                  })}
                </div>

                {/* Navigation Arrows */}
                <div className="flex items-center space-x-2 sm:space-x-4 order-3">
                  <button
                    onClick={prevCar}
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                  
                  <button
                    onClick={nextCar}
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  >
                    <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Image Navigation */}
          {currentCar.images.length > 1 && (
            <div className="absolute top-1/2 right-4 sm:right-8 -translate-y-1/2 flex flex-col space-y-2">
              {currentCar.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-1.5 h-6 sm:w-2 sm:h-8 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>

    </div>
  );
}