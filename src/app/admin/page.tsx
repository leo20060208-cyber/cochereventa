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
  Download,
  Quote,
  Mail,
  Phone,
  MessageSquare,
  Star,
  MapPin,
  X,
  Save,
  HelpCircle,
  LogOut
} from "lucide-react";
import Component from "@/components/ui/asd";
import * as api from "@/lib/api";
import {
  type Car as CarType,
  type Reservation,
  type Video,
  type WhoWeAreData,
  type FAQ,
  type Client,
  type SiteSettings
} from "@/lib/data";
import Link from "next/link";
import { AdminLogin } from "@/components/admin-login";

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("cars");
  const [cars, setCars] = useState<CarType[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [whoWeAreData, setWhoWeAreData] = useState<WhoWeAreData | null>(null);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [editingCar, setEditingCar] = useState<CarType | null>(null);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [editingWhoWeAre, setEditingWhoWeAre] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [showAddCar, setShowAddCar] = useState(false);
  const [showAddVideo, setShowAddVideo] = useState(false);
  const [showAddFAQ, setShowAddFAQ] = useState(false);
  const [showAddClient, setShowAddClient] = useState(false);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);

  // Check authentication on mount
  useEffect(() => {
    const auth = sessionStorage.getItem("admin_authenticated");
    setIsAuthenticated(auth === "true");
    setIsLoading(false);
  }, []);

  // Load data when authenticated or tab changes
  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated, activeTab]);

  const loadData = async () => {
    try {
      await Promise.all([
        loadCars(),
        loadReservations(),
        loadVideos(),
        loadWhoWeAreData(),
        loadFAQs(),
        loadClients(),
        loadSiteSettings()
      ]);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const loadCars = async () => {
    try {
      const data = await api.getCars();
      setCars(data);
    } catch (error) {
      console.error('Error loading cars:', error);
    }
  };

  const loadReservations = async () => {
    try {
      const data = await api.getReservations();
      setReservations(data);
    } catch (error) {
      console.error('Error loading reservations:', error);
    }
  };

  const loadVideos = async () => {
    try {
      const data = await api.getVideos();
      setVideos(data);
    } catch (error) {
      console.error('Error loading videos:', error);
    }
  };

  const loadWhoWeAreData = async () => {
    try {
      const data = await api.getWhoWeAreData();
      setWhoWeAreData(data);
    } catch (error) {
      console.error('Error loading who we are data:', error);
    }
  };

  const loadFAQs = async () => {
    try {
      const data = await api.getAllFAQs();
      setFaqs(data);
    } catch (error) {
      console.error('Error loading FAQs:', error);
    }
  };

  const loadClients = async () => {
    try {
      const data = await api.getAllClients();
      setClients(data);
    } catch (error) {
      console.error('Error loading clients:', error);
    }
  };

  const loadSiteSettings = async () => {
    try {
      const data = await api.getSiteSettings();
      setSiteSettings(data);
    } catch (error) {
      console.error('Error loading site settings:', error);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_authenticated");
    setIsAuthenticated(false);
  };

  // Get cars from catalog (same logic as /coches page)
  const catalogCars = cars; // All cars

  // Create car grid with empty slots up to 12 slots total
  type CarSlot = { car: CarType; index: number; isEmpty: false } | { car: null; index: number; isEmpty: true };

  const createCarGrid = (): CarSlot[] => {
    const maxSlots = 12;
    const carSlots: CarSlot[] = [];

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

  const handleSaveCar = async (carData: CarType) => {
    try {
      if (carData.id) {
        // Update existing car
        await api.updateCar(carData.id, carData);
      } else {
        // Add new car
        const { id, ...carWithoutId } = carData;
        await api.addCar(carWithoutId);
      }
      await loadCars();
      setEditingCar(null);
      setShowAddCar(false);
    } catch (error) {
      console.error('Error saving car:', error);
    }
  };

  const handleDeleteCar = async (id: number) => {
    try {
      await api.deleteCar(id);
      await loadCars();
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  const handleSaveVideo = async (videoData: Video) => {
    try {
      if (videoData.id) {
        await api.updateVideo(videoData.id, videoData);
      } else {
        const { id, ...videoWithoutId } = videoData;
        await api.addVideo(videoWithoutId);
      }
      await loadVideos();
      setEditingVideo(null);
      setShowAddVideo(false);
    } catch (error) {
      console.error('Error saving video:', error);
    }
  };

  const handleDeleteVideo = async (id: number) => {
    try {
      await api.deleteVideo(id);
      await loadVideos();
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  const updateReservationStatus = async (id: number, status: Reservation["status"]) => {
    try {
      await api.updateReservation(id, { status });
      await loadReservations();
    } catch (error) {
      console.error('Error updating reservation status:', error);
    }
  };

  const handleSaveFAQ = async (faqData: FAQ) => {
    try {
      if (faqData.id) {
        await api.updateFAQ(faqData.id, faqData);
      } else {
        const { id, ...faqWithoutId } = faqData;
        await api.addFAQ(faqWithoutId);
      }
      await loadFAQs();
      setEditingFAQ(null);
      setShowAddFAQ(false);
    } catch (error) {
      console.error('Error saving FAQ:', error);
    }
  };

  const handleDeleteFAQ = async (id: number) => {
    try {
      await api.deleteFAQ(id);
      await loadFAQs();
    } catch (error) {
      console.error('Error deleting FAQ:', error);
    }
  };

  const handleSaveClient = async (clientData: Client) => {
    try {
      if (clientData.id) {
        await api.updateClient(clientData.id, clientData);
      } else {
        const { id, ...clientWithoutId } = clientData;
        await api.addClient(clientWithoutId);
      }
      await loadClients();
      setEditingClient(null);
      setShowAddClient(false);
    } catch (error) {
      console.error('Error saving client:', error);
    }
  };

  const handleDeleteClient = async (id: number) => {
    try {
      await api.deleteClient(id);
      await loadClients();
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };

  const handleSaveSiteSettings = async (settings: Partial<SiteSettings>) => {
    try {
      const updatedSettings = await api.updateSiteSettings(settings);
      if (updatedSettings) {
        setSiteSettings(updatedSettings);
      }
    } catch (error) {
      console.error('Error updating site settings:', error);
    }
  };

  const handleSaveWhoWeAre = async (data: WhoWeAreData) => {
    try {
      await api.updateWhoWeAreData(data);
      await loadWhoWeAreData();
      setEditingWhoWeAre(false);
    } catch (error) {
      console.error('Error updating who we are data:', error);
    }
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

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
        <div className="text-white text-xl">Cargando...</div>
      </div>
    );
  }

  // Show login if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

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
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Cerrar Sesión
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
                        className="bg-white/5 border border-white/20 rounded-xl overflow-hidden group relative"
                      >
                        {/* Car Image with overlay buttons */}
                        <div className="relative h-40">
                          <img
                            src={slot.car!.images?.[0] || slot.car!.image}
                            alt={`${slot.car!.brand} ${slot.car!.model}`}
                            className="w-full h-full object-cover"
                          />
                          {/* Dark overlay on hover */}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 p-4">
                            <button
                              onClick={() => setEditingCar(slot.car!)}
                              className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2"
                            >
                              <Edit className="h-5 w-5" />
                              Editar
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`¿Eliminar ${slot.car!.brand} ${slot.car!.model}?`)) {
                                  handleDeleteCar(slot.car!.id);
                                }
                              }}
                              className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2"
                            >
                              <Trash2 className="h-5 w-5" />
                              Eliminar
                            </button>
                          </div>
                          {/* Status Badge */}
                          <div className="absolute top-2 right-2 z-10">
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
                        <div className="p-4">
                          <h3 className="text-white font-semibold text-sm mb-1">
                            {slot.car!.brand} {slot.car!.model}
                          </h3>
                          <p className="text-white/60 text-xs mb-1">
                            {slot.car!.price.toLocaleString()}€ • {slot.car!.mileage.toLocaleString()}km
                          </p>
                          <p className="text-white/50 text-xs">{slot.car!.year} • {slot.car!.location}</p>
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
                              <Calendar className="h-4 w-4 mr-2 text-blue-400" />
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
                          &quot;{client.testimonial}&quot;
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

            {activeTab === "team" && (
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

            {activeTab === "settings" && siteSettings && (
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
          </div>
        </div>
      </div>

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
          onSave={handleSaveWhoWeAre}
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
  car: CarType | null;
  onSave: (car: CarType) => void;
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
  const [newImageUrl, setNewImageUrl] = useState("");

  // Actualizar formData cuando cambia el coche a editar
  useEffect(() => {
    if (car) {
      setFormData({
        brand: car.brand,
        model: car.model,
        year: car.year,
        price: car.price,
        mileage: car.mileage,
        fuel: car.fuel,
        transmission: car.transmission,
        location: car.location,
        image: car.image,
        images: car.images,
        features: car.features,
        description: car.description,
        status: car.status
      });
    }
  }, [car]);

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
              onChange={(e) => setFormData({ ...formData, status: e.target.value as CarType["status"] })}
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
  video: Video | null;
  onSave: (video: Video) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    title: video?.title || "",
    url: video?.url || "",
    description: video?.description || "",
    type: video?.type || "hero" as "hero" | "what-we-do",
    active: video?.active ?? true
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
    description: data.description
  });

  // Actualizar formData cuando cambian los datos
  useEffect(() => {
    if (data) {
      setFormData({
        description: data.description
      });
    }
  }, [data]);

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
            <label className="block text-white/90 text-sm font-medium mb-2">Descripción</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={6}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors resize-none"
              placeholder="Somos tres chicos jóvenes de Barcelona..."
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
    active: faq?.active ?? true,
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
    active: client?.active ?? true,
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
