"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Car, 
  Users, 
  Calendar, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Download,
  Upload,
  Save,
  X,
  Check,
  AlertCircle,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Euro,
  Gauge,
  Fuel,
  Calendar as CalendarIcon,
  HelpCircle,
  Star,
  Quote
} from "lucide-react";
import Component from "@/components/ui/asd";
import { 
  getCars, 
  getReservations, 
  getVideos, 
  getWhoWeAreData,
  getFAQs,
  getClients,
  getSiteSettings,
  updateSiteSettings,
  addCar, 
  updateCar, 
  deleteCar,
  addReservation,
  updateReservation,
  deleteReservation,
  addVideo,
  updateVideo,
  deleteVideo,
  updateWhoWeAreData,
  addFAQ,
  updateFAQ,
  deleteFAQ,
  addClient,
  updateClient,
  deleteClient,
  type Car as CarData,
  type Reservation,
  type Video as VideoData,
  type WhoWeAreData,
  type FAQ,
  type Client,
  type SiteSettings
} from "@/lib/data";
import Link from "next/link";

// Utility function to handle paste events
const handlePasteImage = (e: React.ClipboardEvent, callback: (url: string) => void) => {
  e.preventDefault();
  
  // Check if clipboard contains files
  const items = e.clipboardData.items;
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    
    // Handle image files
    if (item.type.indexOf('image') === 0) {
      const file = item.getAsFile();
      if (file) {
        convertFileToBase64(file, callback);
      }
    }
  }
  
  // Check if clipboard contains text (URL)
  const text = e.clipboardData.getData('text');
  if (text && (text.startsWith('http://') || text.startsWith('https://'))) {
    callback(text);
  }
};

// Convert file to base64
const convertFileToBase64 = (file: File, callback: (base64: string) => void) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    if (event.target?.result) {
      callback(event.target.result as string);
    }
  };
  reader.readAsDataURL(file);
};


export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("cars");
  const [cars, setCars] = useState<CarData[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [whoWeAreData, setWhoWeAreData] = useState<WhoWeAreData | null>(null);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [editingCar, setEditingCar] = useState<CarData | null>(null);
  const [editingVideo, setEditingVideo] = useState<VideoData | null>(null);
  const [editingWhoWeAre, setEditingWhoWeAre] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [showAddCar, setShowAddCar] = useState(false);
  const [showAddVideo, setShowAddVideo] = useState(false);
  const [showAddFAQ, setShowAddFAQ] = useState(false);
  const [showAddClient, setShowAddClient] = useState(false);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(getSiteSettings());

  // Load data from data store
  useEffect(() => {
    const loadData = () => {
      setCars(getCars());
      setReservations(getReservations());
      setVideos(getVideos());
      setWhoWeAreData(getWhoWeAreData());
      setFaqs(getFAQs());
      setClients(getClients());
      setSiteSettings(getSiteSettings());
    };
    
    loadData();
    
    // Refresh data every 2 seconds to get updates
    const interval = setInterval(loadData, 2000);
    
    return () => clearInterval(interval);
  }, []);

  // Force reload data from localStorage
  const forceReloadData = () => {
    console.log('🔄 Force reloading all data from localStorage');
    setCars(getCars());
    setReservations(getReservations());
    setVideos(getVideos());
    setWhoWeAreData(getWhoWeAreData());
    setFaqs(getFAQs());
    setClients(getClients());
    setSiteSettings(getSiteSettings());
    console.log('✅ Data reload complete');
  };

  // Get cars from catalog (same logic as /coches page)
  const catalogCars = cars; // All cars 
  
  // Create car grid with empty slots up to 12 slots total
  const createCarGrid = () => {
    const maxSlots = 12;
    const carSlots = [];
    
    // Add real cars first
    catalogCars.forEach((car, index) => {
      carSlots.push({ car, index, isEmpty: false });
    });
    
    // Fill remaining slots with empty slots
    for (let i = catalogCars.length; i < maxSlots; i++) {
      carSlots.push({ car: null, index: i, isEmpty: true });
    }
    
    return carSlots;
  };

  const carGridSlots = createCarGrid();

  const handleSaveCar = (carData: CarData) => {
    if (carData.id) {
      const updatedCar = updateCar(carData.id, carData);
      if (updatedCar) {
        forceReloadData();
      }
    } else {
      const newCar = addCar(carData);
      forceReloadData();
    }
    setEditingCar(null);
    setShowAddCar(false);
  };

  const handleDeleteCar = (id: number) => {
    if (deleteCar(id)) {
      forceReloadData();
    }
  };

  const handleSaveVideo = (videoData: VideoData) => {
    if (videoData.id) {
      const updatedVideo = updateVideo(videoData.id, videoData);
      if (updatedVideo) {
        forceReloadData();
      }
    } else {
      const newVideo = addVideo(videoData);
      forceReloadData();
    }
    setEditingVideo(null);
    setShowAddVideo(false);
  };

  const handleDeleteVideo = (id: number) => {
    if (deleteVideo(id)) {
      forceReloadData();
    }
  };

  const updateReservationStatus = (id: number, status: Reservation["status"]) => {
    const updatedReservation = updateReservation(id, { status });
    if (updatedReservation) {
      setReservations(prevReservations => prevReservations.map(res => 
        res.id === id ? updatedReservation : res
      ));
    }
  };

  const handleSaveFAQ = (faqData: FAQ) => {
    if (faqData.id) {
      const updatedFAQ = updateFAQ(faqData.id, faqData);
      if (updatedFAQ) {
        forceReloadData();
      }
    } else {
      const newFAQ = addFAQ(faqData);
      forceReloadData();
    }
    setEditingFAQ(null);
    setShowAddFAQ(false);
  };

  const handleDeleteFAQ = (id: number) => {
    if (deleteFAQ(id)) {
      forceReloadData();
    }
  };

  const handleSaveClient = (clientData: Client) => {
    if (clientData.id) {
      const updatedClient = updateClient(clientData.id, clientData);
      if (updatedClient) {
        forceReloadData();
      }
    } else {
      const newClient = addClient(clientData);
      forceReloadData();
    }
    setEditingClient(null);
    setShowAddClient(false);
  };

  const handleDeleteClient = (id: number) => {
    if (deleteClient(id)) {
      forceReloadData();
    }
  };

  const handleSaveSiteSettings = (settings: Partial<SiteSettings>) => {
    const updatedSettings = updateSiteSettings(settings);
    setSiteSettings(updatedSettings);
    console.log('✅ Site settings updated:', updatedSettings);
  };

  const exportReservations = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "ID,Coche,Cliente,Email,Teléfono,Método,Fecha,Hora,Estado,Mensaje,Fecha Creación\n" +
      reservations.map(res => 
        `${res.id},"${res.carName}","${res.customerName}","${res.email}","${res.phone}","${res.method}","${res.date || ''}","${res.time || ''}","${res.status}","${res.message}","${new Date(res.createdAt).toLocaleString()}"`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "reservas.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const tabs = [
    { id: "cars", label: "Coches", icon: Car },
    { id: "reservations", label: "Reservas", icon: Users },
    { id: "videos", label: "Videos", icon: Calendar },
    { id: "team", label: "Quiénes Somos", icon: Users },
    { id: "faqs", label: "FAQs", icon: HelpCircle },
    { id: "clients", label: "Clientes", icon: Quote },
    { id: "settings", label: "Configuración", icon: Settings },
  ];

  return (
    <div className="min-h-screen w-full relative">
      {/* Grid Shader Background */}
      <Component />
      
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <div className="bg-black/20 backdrop-blur-sm border-b border-white/20 sticky top-0 z-20">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-white">Panel de Administración</h1>
              <div className="flex items-center space-x-4">
                <span className="text-white/80 text-sm">
                  {reservations.filter(r => r.status === "pending").length} reservas pendientes
                </span>
                <button
                  onClick={exportReservations}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Exportar CSV
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Tabs */}
          <div className="flex space-x-1 mb-8 bg-white/10 backdrop-blur-sm rounded-2xl p-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center px-4 py-3 rounded-xl transition-all ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            {activeTab === "cars" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-white">Gestión de Coches</h2>
                    <p className="text-white/60 text-sm mt-1">
                      Los mismos coches que aparecen en el catálogo público
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAddCar(true)}
                    className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Añadir Coche
                  </button>
                </div>

                {/* Car Grid - Same layout as catalog */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {carGridSlots.map((slot) => (
                    slot.isEmpty ? (
                      // Empty slot that leads to catalog
                      <Link key={`empty-${slot.index}`} href="/coches">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: slot.index * 0.1 }}
                          className="bg-white/5 border border-white/20 rounded-xl p-6 h-48 flex flex-col items-center justify-center hover:bg-white/10 transition-all duration-300 cursor-pointer group"
                        >
                          <Plus className="h-8 w-8 text-white/40 group-hover:text-white/80 mb-3" />
                          <p className="text-white/60 group-hover:text-white/80 text-sm text-center font-medium">
                            Ver más coches<br />en el catálogo
                          </p>
                        </motion.div>
                      </Link>
                    ) : (
                      // Real car slot with edit functionality
                      <motion.div
                        key={slot.car!.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: slot.index * 0.1 }}
                        className="bg-white/5 border border-white/20 rounded-xl p-4 h-48 flex flex-col hover:bg-black/40 hover:border-white/30 transition-all duration-300 group"
                      >
                        {/* Car Image */}
                        <div className="relative mb-3 flex-1">
                          <img
                            src={slot.car!.images?.[0] || slot.car!.image}
                            alt={`${slot.car!.brand} ${slot.car!.model}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          {/* Status Badge */}
                          <div className="absolute top-2 right-2">
                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                              slot.car!.status === "available" ? "bg-green-500/90 text-white" :
                              slot.car!.status === "reserved" ? "bg-yellow-500/90 text-white" :
                              "bg-red-500/90 text-white"
                            }`}>
                              {slot.car!.status === "available" ? "Disponible" :
                               slot.car!.status === "reserved" ? "Reservado" : "Vendido"}
                            </span>
                          </div>
                        </div>
                        
                        {/* Car Info */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-blue-400 transition-colors">
                              {slot.car!.brand} {slot.car!.model}
                            </h3>
                            <p className="text-white/60 text-xs mb-2">
                              {slot.car!.price.toLocaleString()}€ • {slot.car!.mileage.toLocaleString()}km
                            </p>
                            <p className="text-white/50 text-xs">{slot.car!.year} • {slot.car!.location}</p>
                          </div>
                          
                          {/* Actions */}
                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
                            <Link 
                              href="/coches"
                              className="text-blue-400 hover:text-blue-300 text-xs font-medium flex items-center group"
                            >
                              <Eye className="h-3 w-3 mr-1 group-hover:scale-110 transition-transform" />
                              Ver en Catálogo
                            </Link>
                            <div className="flex items-center space-x-1">
                              <button
                                onClick={() => setEditingCar(slot.car!)}
                                className="p-1.5 text-blue-400 hover:bg-blue-400/20 rounded transition-colors group"
                                title="Editar coche"
                              >
                                <Edit className="h-3 w-3 group-hover:scale-110 transition-transform" />
                              </button>
                              <button
                                onClick={() => handleDeleteCar(slot.car!.id)}
                                className="p-1.5 text-red-400 hover:bg-red-400/20 rounded transition-colors group"
                                title="Eliminar coche"
                              >
                                <Trash2 className="h-3 w-3 group-hover:scale-110 transition-transform" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  ))}
                </div>
              </div>
            )}

            {activeTab === "reservations" && (
              <div>
                <h2 className="text-xl font-bold text-white mb-6">Reservas y Contactos</h2>
                
                <div className="grid gap-4">
                  {reservations.map((reservation) => (
                    <motion.div
                      key={reservation.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white/5 border border-white/20 rounded-xl p-6"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">
                            {reservation.customerName}
                          </h3>
                          <div className="grid grid-cols-2 gap-4 text-sm text-white/80">
                            <div className="flex items-center">
                              <Mail className="h-4 w-4 mr-2 text-blue-400" />
                              {reservation.email}
                            </div>
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 mr-2 text-blue-400" />
                              {reservation.phone}
                            </div>
                            <div className="flex items-center">
                              <Car className="h-4 w-4 mr-2 text-blue-400" />
                              {reservation.carName}
                            </div>
                            <div className="flex items-center">
                              <MessageSquare className="h-4 w-4 mr-2 text-blue-400" />
                              {reservation.method === "whatsapp" ? "WhatsApp" : "Videollamada"}
                            </div>
                          </div>
                          {reservation.date && (
                            <div className="flex items-center mt-2 text-sm text-white/80">
                              <CalendarIcon className="h-4 w-4 mr-2 text-blue-400" />
                              {reservation.date} a las {reservation.time}
                            </div>
                          )}
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          reservation.status === "pending" ? "bg-yellow-500/20 text-yellow-400" :
                          reservation.status === "confirmed" ? "bg-blue-500/20 text-blue-400" :
                          reservation.status === "completed" ? "bg-green-500/20 text-green-400" :
                          "bg-red-500/20 text-red-400"
                        }`}>
                          {reservation.status === "pending" ? "Pendiente" :
                           reservation.status === "confirmed" ? "Confirmada" :
                           reservation.status === "completed" ? "Completada" : "Cancelada"}
                        </span>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-white/90 text-sm leading-relaxed">
                          {reservation.message}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-white/60 text-xs">
                          {new Date(reservation.createdAt).toLocaleString()}
                        </span>
                        <div className="flex items-center space-x-2">
                          {reservation.status === "pending" && (
                            <>
                              <button
                                onClick={() => updateReservationStatus(reservation.id, "confirmed")}
                                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-lg transition-colors"
                              >
                                Confirmar
                              </button>
                              <button
                                onClick={() => updateReservationStatus(reservation.id, "cancelled")}
                                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded-lg transition-colors"
                              >
                                Cancelar
                              </button>
                            </>
                          )}
                          {reservation.status === "confirmed" && (
                            <button
                              onClick={() => updateReservationStatus(reservation.id, "completed")}
                              className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded-lg transition-colors"
                            >
                              Completar
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "videos" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Gestión de Videos</h2>
                  <button
                    onClick={() => setShowAddVideo(true)}
                    className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Añadir Video
                  </button>
                </div>

                <div className="grid gap-4">
                  {videos.map((video) => (
                    <motion.div
                      key={video.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white/5 border border-white/20 rounded-xl p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-2">
                            {video.title}
                          </h3>
                          <p className="text-white/80 text-sm mb-2">
                            {video.description}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-white/60">
                            <span>URL: {video.url}</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              video.type === "hero" ? "bg-blue-500/20 text-blue-400" : "bg-purple-500/20 text-purple-400"
                            }`}>
                              {video.type === "hero" ? "Hero" : "Qué Hacemos"}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              video.active ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"
                            }`}>
                              {video.active ? "Activo" : "Inactivo"}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setEditingVideo(video)}
                            className="p-2 text-blue-400 hover:bg-blue-400/20 rounded-lg transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteVideo(video.id)}
                            className="p-2 text-red-400 hover:bg-red-400/20 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "faqs" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Gestión de FAQs</h2>
                  <button
                    onClick={() => setShowAddFAQ(true)}
                    className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Añadir FAQ
                  </button>
                </div>

                <div className="grid gap-4">
                  {faqs.map((faq) => (
                    <motion.div
                      key={faq.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white/5 border border-white/20 rounded-xl p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-2">
                            {faq.question}
                          </h3>
                          <p className="text-white/80 text-sm mb-2 line-clamp-2">
                            {faq.answer}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-white/60">
                            <span>Orden: {faq.order}</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              faq.active ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"
                            }`}>
                              {faq.active ? "Activo" : "Inactivo"}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setEditingFAQ(faq)}
                            className="p-2 text-blue-400 hover:bg-blue-400/20 rounded-lg transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteFAQ(faq.id)}
                            className="p-2 text-red-400 hover:bg-red-400/20 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "clients" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Gestión de Clientes</h2>
                  <button
                    onClick={() => setShowAddClient(true)}
                    className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Añadir Cliente
                  </button>
                </div>

                <div className="grid gap-4">
                  {clients.map((client) => (
                    <motion.div
                      key={client.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white/5 border border-white/20 rounded-xl p-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <img
                            src={client.avatar}
                            alt={client.name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
                          />
                          <div>
                            <h3 className="text-lg font-semibold text-white mb-1">
                              {client.name}
                            </h3>
                            <div className="flex items-center space-x-2 mb-2">
                              <div className="flex space-x-1">
                                {Array.from({ length: 5 }, (_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < client.rating
                                        ? "text-yellow-400 fill-current"
                                        : "text-white/20"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-white/60 text-sm">
                                {client.rating}/5
                              </span>
                            </div>
                            {client.location && (
                              <div className="flex items-center text-white/60 text-sm">
                                <MapPin className="h-3 w-3 mr-1" />
                                {client.location}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setEditingClient(client)}
                            className="p-2 text-blue-400 hover:bg-blue-400/20 rounded-lg transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteClient(client.id)}
                            className="p-2 text-red-400 hover:bg-red-400/20 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <Quote className="h-4 w-4 text-blue-400 mb-2 opacity-50" />
                        <p className="text-white/80 text-sm leading-relaxed">
                          "{client.testimonial}"
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-sm text-white/60">
                        <div className="flex items-center space-x-4">
                          {client.carBought && (
                            <div className="flex items-center">
                              <Car className="h-4 w-4 mr-1" />
                              <span>{client.carBought}</span>
                            </div>
                          )}
                          <span>Orden: {client.order}</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          client.active ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"
                        }`}>
                          {client.active ? "Activo" : "Inactivo"}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "who-we-are" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Gestión de Quiénes Somos</h2>
                  <button
                    onClick={() => setEditingWhoWeAre(true)}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                  </button>
                </div>

                {whoWeAreData && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 border border-white/20 rounded-xl p-6"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Imagen Actual</h3>
                        <img
                          src={whoWeAreData.image}
                          alt="Equipo"
                          className="w-full h-48 object-cover rounded-xl"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Descripción Actual</h3>
                        <p className="text-white/80 text-sm leading-relaxed">
                          {whoWeAreData.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

            {activeTab === "settings" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Configuración del Sitio</h2>
                </div>

                <div className="space-y-8">
                  {/* Información de la Empresa */}
                  <div className="bg-white/5 border border-white/20 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Información de la Empresa</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/90 text-sm font-medium mb-2">Nombre de la Empresa</label>
                        <input
                          type="text"
                          value={siteSettings.companyName}
                          onChange={(e) => handleSaveSiteSettings({ companyName: e.target.value })}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 backdrop-blur-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-white/90 text-sm font-medium mb-2">Logo URL</label>
                        <input
                          type="url"
                          value={siteSettings.companyLogo}
                          onChange={(e) => handleSaveSiteSettings({ companyLogo: e.target.value })}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 backdrop-blur-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contacto */}
                  <div className="bg-white/5 border border-white/20 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Información de Contacto</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/90 text-sm font-medium mb-2">Email</label>
                        <input
                          type="email"
                          value={siteSettings.contactEmail}
                          onChange={(e) => handleSaveSiteSettings({ contactEmail: e.target.value })}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 backdrop-blur-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-white/90 text-sm font-medium mb-2">Teléfono</label>
                        <input
                          type="tel"
                          value={siteSettings.contactPhone}
                          onChange={(e) => handleSaveSiteSettings({ contactPhone: e.target.value })}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 backdrop-blur-sm"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-white/90 text-sm font-medium mb-2">Dirección</label>
                        <input
                          type="text"
                          value={siteSettings.contactAddress}
                          onChange={(e) => handleSaveSiteSettings({ contactAddress: e.target.value })}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 backdrop-blur-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-white/90 text-sm font-medium mb-2">WhatsApp</label>
                        <input
                          type="tel"
                          value={siteSettings.whatsappNumber}
                          onChange={(e) => handleSaveSiteSettings({ whatsappNumber: e.target.value })}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 backdrop-blur-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Redes Sociales */}
                  <div className="bg-white/5 border border-white/20 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Redes Sociales</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/90 text-sm font-medium mb-2">Instagram</label>
                        <input
                          type="url"
                          value={siteSettings.instagramUrl}
                          onChange={(e) => handleSaveSiteSettings({ instagramUrl: e.target.value })}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 backdrop-blur-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-white/90 text-sm font-medium mb-2">Facebook</label>
                        <input
                          type="url"
                          value={siteSettings.facebookUrl}
                          onChange={(e) => handleSaveSiteSettings({ facebookUrl: e.target.value })}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 backdrop-blur-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-white/90 text-sm font-medium mb-2">Twitter</label>
                        <input
                          type="url"
                          value={siteSettings.twitterUrl}
                          onChange={(e) => handleSaveSiteSettings({ twitterUrl: e.target.value })}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 backdrop-blur-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-white/90 text-sm font-medium mb-2">LinkedIn</label>
                        <input
                          type="url"
                          value={siteSettings.linkedinUrl}
                          onChange={(e) => handleSaveSiteSettings({ linkedinUrl: e.target.value })}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 backdrop-blur-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-white/90 text-sm font-medium mb-2">YouTube</label>
                        <input
                          type="url"
                          value={siteSettings.youtubeUrl}
                          onChange={(e) => handleSaveSiteSettings({ youtubeUrl: e.target.value })}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 backdrop-blur-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Pie de Página */}
                  <div className="bg-white/5 border border-white/20 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Pie de Página</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-white/90 text-sm font-medium mb-2">Descripción</label>
                        <textarea
                          value={siteSettings.footerDescription}
                          onChange={(e) => handleSaveSiteSettings({ footerDescription: e.target.value })}
                          rows={3}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 backdrop-blur-sm resize-none"
                        />
                      </div>
                      <div>
                        <label className="block text-white/90 text-sm font-medium mb-2">Copyright</label>
                        <input
                          type="text"
                          value={siteSettings.footerCopyright}
                          onChange={(e) => handleSaveSiteSettings({ footerCopyright: e.target.value })}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 backdrop-blur-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

      {/* Modals */}
      {showAddCar && (
        <CarEditModal
          car={null}
          onSave={handleSaveCar}
          onClose={() => setShowAddCar(false)}
        />
      )}

      {editingCar && (
        <CarEditModal
          car={editingCar}
          onSave={handleSaveCar}
          onClose={() => setEditingCar(null)}
        />
      )}

      {showAddVideo && (
        <VideoEditModal
          video={null}
          onSave={handleSaveVideo}
          onClose={() => setShowAddVideo(false)}
        />
      )}

      {editingVideo && (
        <VideoEditModal
          video={editingVideo}
          onSave={handleSaveVideo}
          onClose={() => setEditingVideo(null)}
        />
      )}

      {editingWhoWeAre && whoWeAreData && (
        <WhoWeAreEditModal
          data={whoWeAreData}
          onSave={(data) => {
            updateWhoWeAreData(data);
            setWhoWeAreData(getWhoWeAreData());
            setEditingWhoWeAre(false);
          }}
          onClose={() => setEditingWhoWeAre(false)}
        />
      )}

      {showAddFAQ && (
        <FAQEditModal
          faq={null}
          onSave={handleSaveFAQ}
          onClose={() => setShowAddFAQ(false)}
        />
      )}

      {editingFAQ && (
        <FAQEditModal
          faq={editingFAQ}
          onSave={handleSaveFAQ}
          onClose={() => setEditingFAQ(null)}
        />
      )}

      {showAddClient && (
        <ClientEditModal
          client={null}
          onSave={handleSaveClient}
          onClose={() => setShowAddClient(false)}
        />
      )}

      {editingClient && (
        <ClientEditModal
          client={editingClient}
          onSave={handleSaveClient}
          onClose={() => setEditingClient(null)}
        />
      )}
    </div>
  );
}

// Car Edit Modal Component
function CarEditModal({ car, onSave, onClose }: {
  car: CarData | null;
  onSave: (car: CarData) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    brand: car?.brand || "",
    model: car?.model || "",
    year: car?.year || new Date().getFullYear(),
    price: car?.price || 0,
    mileage: car?.mileage || 0,
    fuel: car?.fuel || "Gasolina",
    transmission: car?.transmission || "Manual",
    location: car?.location || "",
    image: car?.image || "",
    images: car?.images || [],
    features: car?.features || [],
    description: car?.description || "",
    status: car?.status || "available"
  });

  const [newFeature, setNewFeature] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, id: car?.id || 0 });
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, newFeature.trim()]
      });
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index)
    });
  };

  const addImage = () => {
    const url = newImageUrl.trim();
    if (url && !formData.images.includes(url)) {
      setFormData({ ...formData, images: [...formData.images, url] });
      setNewImageUrl("");
    }
  };

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    });
  };

  const updateImage = (index: number, newUrl: string) => {
    const updatedImages = [...formData.images];
    updatedImages[index] = newUrl;
    setFormData({ ...formData, images: updatedImages });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">
            {car ? "Editar Coche" : "Añadir Coche"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white/90 text-sm font-medium mb-2">Marca</label>
              <input
                type="text"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-white/90 text-sm font-medium mb-2">Modelo</label>
              <input
                type="text"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-white/90 text-sm font-medium mb-2">Año</label>
              <input
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-white/90 text-sm font-medium mb-2">Precio (€)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-white/90 text-sm font-medium mb-2">Kilometraje</label>
              <input
                type="number"
                value={formData.mileage}
                onChange={(e) => setFormData({ ...formData, mileage: parseInt(e.target.value) })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white/90 text-sm font-medium mb-2">Combustible</label>
              <select
                value={formData.fuel}
                onChange={(e) => setFormData({ ...formData, fuel: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-colors"
              >
                <option value="Gasolina">Gasolina</option>
                <option value="Diesel">Diesel</option>
                <option value="Híbrido">Híbrido</option>
                <option value="Eléctrico">Eléctrico</option>
              </select>
            </div>
            <div>
              <label className="block text-white/90 text-sm font-medium mb-2">Transmisión</label>
              <select
                value={formData.transmission}
                onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-colors"
              >
                <option value="Manual">Manual</option>
                <option value="Automático">Automático</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-white/90 text-sm font-medium mb-2">Ubicación</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-white/90 text-sm font-medium mb-2">
              Imagen Principal
              <span className="text-xs text-white/60 ml-2">(Ctrl+V para pegar imagen)</span>
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              onPaste={(e) => handlePasteImage(e, (url) => setFormData({ ...formData, image: url }))}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
              placeholder="Pega aquí una URL o imagen (Ctrl+V)"
              required
            />
            {formData.image && (
              <div className="mt-4">
                <img
                  src={formData.image}
                  alt="Vista previa"
                  className="w-full h-48 object-cover rounded-xl"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-white/90 text-sm font-medium mb-2">
              Imágenes Adicionales
              <span className="text-xs text-white/60 ml-2">(Ctrl+V para pegar imagen)</span>
            </label>
            <div className="space-y-4">
              {formData.images.map((image, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => updateImage(index, e.target.value)}
                    onPaste={(e) => handlePasteImage(e, (url) => updateImage(index, url))}
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
                    placeholder="Pega aquí una URL o imagen (Ctrl+V)"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="p-2 text-red-400 hover:bg-red-400/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  {image && (
                    <div className="w-16 h-12 rounded-lg overflow-hidden">
                      <img
                        src={image}
                        alt={`Imagen ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              ))}
              
              <div className="flex items-center space-x-3">
                <input
                  type="url"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  onPaste={(e) => handlePasteImage(e, (url) => {
                    setNewImageUrl(url);
                    setTimeout(() => addImage(), 100);
                  })}
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
                  placeholder="Pega aquí una URL o imagen (Ctrl+V)"
                />
                <button
                  type="button"
                  onClick={addImage}
                  className="p-2 text-green-400 hover:bg-green-400/20 rounded-lg transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-white/90 text-sm font-medium mb-2">Descripción</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-white/90 text-sm font-medium mb-2">Características</label>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Añadir característica..."
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
              />
              <button
                type="button"
                onClick={addFeature}
                className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.features.map((feature, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 bg-blue-400/20 text-blue-400 text-sm rounded-full"
                >
                  {feature}
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="ml-2 text-blue-400 hover:text-red-400 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-white/90 text-sm font-medium mb-2">Estado</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as CarData["status"] })}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-colors"
            >
              <option value="available">Disponible</option>
              <option value="reserved">Reservado</option>
              <option value="sold">Vendido</option>
            </select>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-white/30 text-white rounded-xl hover:bg-white/10 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              Guardar
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// Video Edit Modal Component
function VideoEditModal({ video, onSave, onClose }: {
  video: VideoData | null;
  onSave: (video: VideoData) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    title: video?.title || "",
    url: video?.url || "",
    description: video?.description || "",
    type: video?.type || "hero",
    active: video?.active || true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, id: video?.id || 0 });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 w-full max-w-lg"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">
            {video ? "Editar Video" : "Añadir Video"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/90 text-sm font-medium mb-2">Título</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-white/90 text-sm font-medium mb-2">Tipo de Video</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as "hero" | "what-we-do" })}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-colors"
            >
              <option value="hero">Hero (Página Principal)</option>
              <option value="what-we-do">Qué Hacemos Por Ti</option>
            </select>
          </div>

          <div>
            <label className="block text-white/90 text-sm font-medium mb-2">URL del Video</label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
              placeholder="https://www.youtube.com/embed/..."
              required
            />
          </div>

          <div>
            <label className="block text-white/90 text-sm font-medium mb-2">Descripción</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors resize-none"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="active"
              checked={formData.active}
              onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
              className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label htmlFor="active" className="ml-2 text-white/90 text-sm">
              Video activo
            </label>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-white/30 text-white rounded-xl hover:bg-white/10 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              Guardar
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// WhoWeAre Edit Modal Component
function WhoWeAreEditModal({ data, onSave, onClose }: {
  data: WhoWeAreData;
  onSave: (data: WhoWeAreData) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    image: data.image,
    description: data.description
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...data, ...formData });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Editar Quiénes Somos</h2>
          <button
            onClick={onClose}
            className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/90 text-sm font-medium mb-2">URL de la Imagen</label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
              placeholder="https://images.unsplash.com/..."
              required
            />
            {formData.image && (
              <div className="mt-4">
                <img
                  src={formData.image}
                  alt="Vista previa"
                  className="w-full h-48 object-cover rounded-xl"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-white/90 text-sm font-medium mb-2">Descripción</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors resize-none"
              required
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-white/30 text-white rounded-xl hover:bg-white/10 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              Guardar
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// FAQ Edit Modal Component
function FAQEditModal({ faq, onSave, onClose }: {
  faq: FAQ | null;
  onSave: (faq: FAQ) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    question: faq?.question || "",
    answer: faq?.answer || "",
    active: faq?.active || true,
    order: faq?.order || 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, id: faq?.id || 0 });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">
            {faq ? "Editar FAQ" : "Añadir FAQ"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white/90 text-sm font-medium mb-2">Orden</label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
                min="1"
                required
              />
            </div>
            <div className="flex items-center pt-6">
              <input
                type="checkbox"
                id="active"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label htmlFor="active" className="ml-2 text-white/90 text-sm">
                FAQ activo
              </label>
            </div>
          </div>

          <div>
            <label className="block text-white/90 text-sm font-medium mb-2">Pregunta</label>
            <input
              type="text"
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-white/90 text-sm font-medium mb-2">Respuesta</label>
            <textarea
              value={formData.answer}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              rows={5}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors resize-none"
              required
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-white/30 text-white rounded-xl hover:bg-white/10 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              Guardar
            </button>
          </div>
        </form>  
      </motion.div>
    </div>
  );
}

// Client Edit Modal Component
function ClientEditModal({ client, onSave, onClose }: {
  client: Client | null;
  onSave: (client: Client) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    name: client?.name || "",
    testimonial: client?.testimonial || "",
    rating: client?.rating || 5,
    avatar: client?.avatar || "",
    location: client?.location || "",
    carBought: client?.carBought || "",
    completedAt: client?.completedAt || "",
    active: client?.active || true,
    order: client?.order || 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, id: client?.id || 0 });
 }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">
            {client ? "Editar Cliente" : "Añadir Cliente"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white/90 text-sm font-medium mb-2">Nombre</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-white/90 text-sm font-medium mb-2">Evaluación (1-5)</label>
              <input
                type="number"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
                min="1"
                max="5"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white/90 text-sm font-medium mb-2">Ubicación</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
              />
            </div>
            <div>
              <label className="block text-white/90 text-sm font-medium mb-2">Coche Comprado</label>
              <input
                type="text"
                value={formData.carBought}
                onChange={(e) => setFormData({ ...formData, carBought: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-white/90 text-sm font-medium mb-2">
              Avatar
              <span className="text-xs text-white/60 ml-2">(Ctrl+V para pegar imagen)</span>
            </label>
            <input
              type="url"
              value={formData.avatar}
              onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
              onPaste={(e) => handlePasteImage(e, (url) => setFormData({ ...formData, avatar: url }))}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
              placeholder="Pega aquí una URL o imagen (Ctrl+V)"
              required
            />
            {formData.avatar && (
              <div className="mt-4">
                <img
                  src={formData.avatar}
                  alt="Vista previa"
                  className="w-24 h-24 object-cover rounded-full"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-white/90 text-sm font-medium mb-2">Testimonio</label>
            <textarea
              value={formData.testimonial}
              onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white/90 text-sm font-medium mb-2">Orden</label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
                min="1"
                required
              />
            </div>
            <div className="flex items-center pt-6">
              <input
                type="checkbox"
                id="active"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label htmlFor="active" className="ml-2 text-white/90 text-sm">
                Cliente activo
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-white/30 text-white rounded-xl hover:bg-white/10 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              Guardar
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
