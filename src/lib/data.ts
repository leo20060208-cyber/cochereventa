// Global data store for the application
// In a real app, this would be connected to a database

export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: string;
  transmission: string;
  location: string;
  image: string;
  images: string[];
  features: string[];
  description: string;
  status: "available" | "reserved" | "sold";
}

export interface Reservation {
  id: number;
  carId: number;
  carName: string;
  customerName: string;
  email: string;
  phone: string;
  method: "whatsapp";
  date?: string;
  time?: string;
  message: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
}

export interface Video {
  id: number;
  title: string;
  url: string;
  description: string;
  active: boolean;
  type: "hero" | "what-we-do";
}

export interface WhoWeAreData {
  id: number;
  image: string;
  description: string;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  active: boolean;
  order: number;
}

export interface Client {
  id: number;
  name: string;
  testimonial: string;
  rating: number;
  avatar: string;
  location?: string;
  carBought?: string;
  completedAt?: string;
  active: boolean;
  order: number;
}

export interface SiteSettings {
  companyName: string;
  companyLogo: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  whatsappNumber: string;
  instagramUrl: string;
  facebookUrl: string;
  twitterUrl: string;
  linkedinUrl: string;
  youtubeUrl: string;
  footerCopyright: string;
  footerDescription: string;
}


// Utility functions for localStorage
const saveToStorage = <T = unknown>(key: string, data: T) => {
  if (typeof window !== 'undefined') {
    try {
      const serializedData = JSON.stringify(data);
      localStorage.setItem(key, serializedData);
      console.log(`✅ Saved ${key} to localStorage (${serializedData.length} chars)`);
    } catch (error) {
      console.error(`❌ Error saving ${key} to localStorage:`, error);
      // Fallback: try to save data without some fields
      try {
        const limitedData = (data as unknown[]).slice ? (data as unknown[]).slice(0, 10) : Object.keys(data as object).length > 5 ? Object.fromEntries(Object.entries(data as object).slice(0, 5)) : data;
        localStorage.setItem(`${key}_backup`, JSON.stringify(limitedData));
        console.log(`⚠️ Saved limited ${key} backup to localStorage`);
      } catch (backupError) {
        console.error(`❌ Backup save failed for ${key}:`, backupError);
      }
    }
  }
};

const loadFromStorage = <T = unknown>(key: string, fallback: T): T => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        const parsed = JSON.parse(stored);
        console.log(`📄 Loaded ${key} from localStorage (${parsed.length || Object.keys(parsed).length} items)`);
        return parsed;
      } else {
        console.log(`🔍 No ${key} found in localStorage, using fallback`);
        return fallback;
      }
    } catch (error) {
      console.error(`❌ Error loading ${key} from localStorage:`, error);
      console.log(`Using fallback data for ${key}`);
      return fallback;
    }
  }
  return fallback;
};

// Global data storage
let cars: Car[] = loadFromStorage('cars', [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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
]);

let reservations: Reservation[] = loadFromStorage('reservations', []);

let videos: Video[] = loadFromStorage('videos', [
  {
    id: 1,
    title: "Vídeo Hero - Importación de Coches",
    url: "https://www.youtube.com/embed/3igSQXJBm6E",
    description: "Vídeo principal en la sección hero explicando el proceso de importación",
    active: true,
    type: "hero"
  },
  {
    id: 2,
    title: "Vídeo Qué Hacemos Por Ti",
    url: "https://www.youtube.com/embed/3igSQXJBm6E",
    description: "Vídeo explicativo en la sección de servicios",
    active: true,
    type: "what-we-do"
  }
]);

let whoWeAreData: WhoWeAreData = loadFromStorage('whoWeAre', {
  id: 1,
  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
  description: "Somos tres chicos jóvenes de Barcelona, de 20, 22 y 23 años, apasionados por el mundo del motor. Desde siempre nos han fascinado los coches y todo lo que los rodea, y decidimos transformar esa pasión en un proyecto real y profesional."
});

let faqs: FAQ[] = loadFromStorage('faqs', [
  {
    id: 1,
    question: "¿Cuánto tiempo tarda el proceso completo?",
    answer: "El proceso completo suele tardar entre 4-6 semanas desde que adquirimos el vehículo hasta que te lo entregamos en casa. Esto incluye el transporte, homologación, ITV y matriculación.",
    active: true,
    order: 1
  },
  {
    id: 2,
    question: "¿Qué garantías ofrecen?",
    answer: "Todos nuestros vehículos pasan por una inspección exhaustiva antes de la compra. Además, incluyen garantía de 12 meses y seguro durante todo el proceso. Si no cumple las condiciones acordadas, te devolvemos el dinero.",
    active: true,
    order: 2
  },
  {
    id: 3,
    question: "¿Necesito adelantar dinero antes de recibir el coche?",
    answer: "Solo se requiere una señal del 20% al firmar el contrato. El resto se paga cuando recibes el coche y verificas que cumple con lo acordado. Todo a través de transferencia bancaria segura.",
    active: true,
    order: 3
  },
  {
    id: 4,
    question: "¿Qué documentación necesito?",
    answer: "Solo necesitas tu DNI, carnet de conducir y comprobante de ingresos (nómina o declaración de hacienda). Nos encargamos de todo lo demás: papeles del vehículo, homologación, ITV y matriculación.",
    active: true,
    order: 4
  },
  {
    id: 5,
    question: "¿Puedo ver el coche antes de comprarlo?",
    answer: "Por supuesto. Te proporcionamos fotos detalladas y videos del estado del vehículo. Además, puedes hablar directamente con el vendedor europeo si tienes alguna duda específica.",
    active: true,
    order: 5
  },
  {
    id: 6,
    question: "¿Qué pasa si el coche tiene algún problema?",
    answer: "Si detectamos cualquier problema no mencionado anteriormente, te informamos inmediatamente antes de proceder. Tienes derecho a rechazar el vehículo y buscar una alternativa sin coste adicional.",
    active: true,
    order: 6
  }
]);

let clients: Client[] = loadFromStorage('clients', [
  {
    id: 1,
    name: "María García",
    testimonial: "Un proceso increíblemente fácil para comprar mi Audi A4 desde Alemania. El equipo es muy profesional y transparente en cada paso. Ahora disfruto de mi coche todos los días.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b18c?w=150&h=150&fit=crop&crop=face",
    location: "Madrid",
    carBought: "Audi A4 2019",
    completedAt: "2023-11-15",
    active: true,
    order: 1
  },
  {
    id: 2,
    name: "Javier Martín",
    testimonial: "Llevaba meses buscando un BMW Serie 3 con las especificaciones exactas. Estos chicos lo encontraron en Francia y me lo trajeron en perfecto estado. ¡Altamente recomendado!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    location: "Barcelona",
    carBought: "BMW Serie 3 2020",
    completedAt: "2023-12-03",
    active: true,
    order: 2
  },
  {
    id: 3,
    name: "Laura Rodríguez",
    testimonial: "Servicio excelente y precio increíble para el Mercedes Clase C que quería. El proceso fue completamente transparente y sin sorpresas desagradables. Definitivamente repetiré.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    location: "Valencia",
    carBought: "Mercedes Clase C 2021",
    completedAt: "2024-01-10",
    active: true,
    order: 3
  },
  {
    id: 4,
    name: "Carlos López",
    testimonial: "Ideal para quienes buscan una alternativa confiable a los concesionarios tradicionales. Ahorré 8.000€ en mi Volkswagen Golf y el servicio fue impecable desde el primer día.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    location: "Sevilla",
    carBought: "Volkswagen Golf 2018",
    completedAt: "2023-10-22",
    active: true,
    order: 4
  },
  {
    id: 5,
    name: "Ana Ruiz",
    testimonial: "Profesionales, honestos y eficientes. Mi Audi Q5 llegó exactamente como estaba descrito, con toda la documentación en orden. Sin duda la mejor experiencia de compra de coche.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
    location: "Bilbao",
    carBought: "Audi Q5 2019",
    completedAt: "2024-02-05",
    active: true,
    order: 5
  }
]);

// Cars API
export const getCars = (): Car[] => {
  return loadFromStorage('cars', cars);
};

export const getCar = (id: number): Car | undefined => {
  const allCars = loadFromStorage('cars', cars);
  return allCars.find(car => car.id === id);
};

export const addCar = (car: Omit<Car, 'id'>): Car => {
  const newCar: Car = {
    ...car,
    id: Date.now() + Math.random()
  };
  const currentCars = loadFromStorage('cars', cars);
  const updatedCars = [...currentCars, newCar];
  cars = updatedCars;
  saveToStorage('cars', updatedCars);
  return newCar;
};

export const updateCar = (id: number, car: Partial<Car>): Car | null => {
  const currentCars = loadFromStorage('cars', cars);
  const index = currentCars.findIndex(c => c.id === id);
  if (index === -1) return null;
  
  currentCars[index] = { ...currentCars[index], ...car };
  cars = currentCars;
  saveToStorage('cars', currentCars);
  return currentCars[index];
};

export const deleteCar = (id: number): boolean => {
  const currentCars = loadFromStorage('cars', cars);
  const index = currentCars.findIndex(c => c.id === id);
  if (index === -1) return false;
  
  currentCars.splice(index, 1);
  cars = currentCars;
  saveToStorage('cars', currentCars);
  return true;
};

// Reservations API
export const getReservations = (): Reservation[] => {
  return loadFromStorage('reservations', reservations);
};

export const getReservation = (id: number): Reservation | undefined => {
  const allReservations = loadFromStorage('reservations', reservations);
  return allReservations.find(res => res.id === id);
};

export const addReservation = (reservation: Omit<Reservation, 'id' | 'createdAt'>): Reservation => {
  const newReservation: Reservation = {
    ...reservation,
    id: Date.now() + Math.random(),
    createdAt: new Date().toISOString()
  };
  const currentReservations = loadFromStorage('reservations', reservations);
  const updatedReservations = [...currentReservations, newReservation];
  reservations = updatedReservations;
  saveToStorage('reservations', updatedReservations);
  return newReservation;
};

export const updateReservation = (id: number, reservation: Partial<Reservation>): Reservation | null => {
  const currentReservations = loadFromStorage('reservations', reservations);
  const index = currentReservations.findIndex(r => r.id === id);
  if (index === -1) return null;
  
  currentReservations[index] = { ...currentReservations[index], ...reservation };
  reservations = currentReservations;
  saveToStorage('reservations', currentReservations);
  return currentReservations[index];
};

export const deleteReservation = (id: number): boolean => {
  const currentReservations = loadFromStorage('reservations', reservations);
  const index = currentReservations.findIndex(r => r.id === id);
  if (index === -1) return false;
  
  currentReservations.splice(index, 1);
  reservations = currentReservations;
  saveToStorage('reservations', currentReservations);
  return true;
};

// Site Settings
let siteSettings: SiteSettings = loadFromStorage('siteSettings', {
  companyName: "CarImport",
  companyLogo: "https://via.placeholder.com/40x40/3B82F6/FFFFFF?text=CI",
  contactEmail: "info@carimport.com",
  contactPhone: "+34 640 337 898",
  contactAddress: "Carrer de la Marina 123, Barcelona",
  whatsappNumber: "+34640337898",
  instagramUrl: "https://instagram.com/carimport",
  facebookUrl: "https://facebook.com/carimport",
  twitterUrl: "https://twitter.com/carimport",
  linkedinUrl: "https://linkedin.com/company/carimport",
  youtubeUrl: "https://youtube.com/@carimport",
  footerCopyright: "CarImport. Todos los derechos reservados.",
  footerDescription: "Tu socio de confianza para importar coches de alta calidad desde Europa. Sin complicaciones, sin sorpresas."
});

// Initialize localStorage if needed
const initializeStorage = () => {
  if (typeof window === 'undefined') return;
  
  const keys = ['cars', 'reservations', 'videos', 'whoWeAreData', 'faqs', 'clients'];
  const hasData = keys.some(key => localStorage.getItem(key));
  
  if (!hasData) {
    console.log('🚀 Initializing localStorage with default data');
    localStorage.setItem('cars', JSON.stringify(cars));
    localStorage.setItem('reservations', JSON.stringify(reservations));
    localStorage.setItem('videos', JSON.stringify(videos));
    localStorage.setItem('whoWeAreData', JSON.stringify(whoWeAreData));
    localStorage.setItem('faqs', JSON.stringify(faqs));
    localStorage.setItem('clients', JSON.stringify(clients));
  }
};

// Call initialization if in browser
if (typeof window !== 'undefined') {
  initializeStorage();
}

// Videos API
export const getVideos = (): Video[] => {
  return loadFromStorage('videos', videos);
};

export const getVideo = (id: number): Video | undefined => {
  const allVideos = loadFromStorage('videos', videos);
  return allVideos.find(video => video.id === id);
};

export const addVideo = (video: Omit<Video, 'id'>): Video => {
  const newVideo: Video = {
    ...video,
    id: Date.now() + Math.random()
  };
  const currentVideos = loadFromStorage('videos', videos);
  const updatedVideos = [...currentVideos, newVideo];
  videos = updatedVideos;
  saveToStorage('videos', updatedVideos);
  return newVideo;
};

export const updateVideo = (id: number, video: Partial<Video>): Video | null => {
  const currentVideos = loadFromStorage('videos', videos);
  const index = currentVideos.findIndex(v => v.id === id);
  if (index === -1) return null;
  
  currentVideos[index] = { ...currentVideos[index], ...video };
  videos = currentVideos;
  saveToStorage('videos', currentVideos);
  return currentVideos[index];
};

export const deleteVideo = (id: number): boolean => {
  const currentVideos = loadFromStorage('videos', videos);
  const index = currentVideos.findIndex(v => v.id === id);
  if (index === -1) return false;
  
  currentVideos.splice(index, 1);
  videos = currentVideos;
  saveToStorage('videos', currentVideos);
  return true;
};

// WhoWeAre API
export const getWhoWeAreData = (): WhoWeAreData => {
  return loadFromStorage('whoWeAre', whoWeAreData);
};

export const updateWhoWeAreData = (data: Partial<WhoWeAreData>): WhoWeAreData => {
  const currentData = loadFromStorage('whoWeAre', whoWeAreData);
  const updatedData = { ...currentData, ...data };
  whoWeAreData = updatedData;
  saveToStorage('whoWeAre', updatedData);
  return updatedData;
};

// FAQ API
export const getFAQs = (): FAQ[] => {
  const allFaqs = loadFromStorage('faqs', faqs);
  return allFaqs.filter(faq => faq.active).sort((a, b) => a.order - b.order);
};

export const getFAQ = (id: number): FAQ | undefined => {
  const allFaqs = loadFromStorage('faqs', faqs);
  return allFaqs.find(faq => faq.id === id);
};

export const addFAQ = (faq: Omit<FAQ, 'id'>): FAQ => {
  const newFAQ: FAQ = {
    ...faq,
    id: Date.now() + Math.random()
  };
  const currentFaqs = loadFromStorage('faqs', faqs);
  const updatedFaqs = [...currentFaqs, newFAQ];
  faqs = updatedFaqs;
  saveToStorage('faqs', updatedFaqs);
  return newFAQ;
};

export const updateFAQ = (id: number, faq: Partial<FAQ>): FAQ | null => {
  const currentFaqs = loadFromStorage('faqs', faqs);
  const index = currentFaqs.findIndex(f => f.id === id);

  if (index === -1) return null;
  
  currentFaqs[index] = { ...currentFaqs[index], ...faq };
  faqs = currentFaqs;
  saveToStorage('faqs', currentFaqs);
  return currentFaqs[index];
};

export const deleteFAQ = (id: number): boolean => {
  const currentFaqs = loadFromStorage('faqs', faqs);
  const index = currentFaqs.findIndex(f => f.id === id);
  if (index === -1) return false;
  
  currentFaqs.splice(index, 1);
  faqs = currentFaqs;
  saveToStorage('faqs', currentFaqs);
  return true;
};

// Clients API
export const getClients = (): Client[] => {
  const allClients = loadFromStorage('clients', clients);
  return allClients.filter(client => client.active).sort((a, b) => a.order - b.order);
};

export const getClient = (id: number): Client | undefined => {
  const allClients = loadFromStorage('clients', clients);
  return allClients.find(client => client.id === id);
};

export const addClient = (client: Omit<Client, 'id'>): Client => {
  const newClient: Client = {
    ...client,
    id: Date.now() + Math.random()
  };
  const currentClients = loadFromStorage('clients', clients);
  const updatedClients = [...currentClients, newClient];
  clients = updatedClients;
  saveToStorage('clients', updatedClients);
  return newClient;
};

export const updateClient = (id: number, client: Partial<Client>): Client | null => {
  const currentClients = loadFromStorage('clients', clients);
  const index = currentClients.findIndex(c => c.id === id);
  if (index === -1) return null;
  
  currentClients[index] = { ...currentClients[index], ...client };
  clients = currentClients;
  saveToStorage('clients', currentClients);
  return currentClients[index];
};

export const deleteClient = (id: number): boolean => {
  const currentClients = loadFromStorage('clients', clients);
  const index = currentClients.findIndex(c => c.id === id);
  if (index === -1) return false;
  
  currentClients.splice(index, 1);
  clients = currentClients;
  saveToStorage('clients', currentClients);
  return true;
};

// Site Settings API
export const getSiteSettings = (): SiteSettings => {
  return loadFromStorage('siteSettings', siteSettings);
};

export const updateSiteSettings = (settings: Partial<SiteSettings>): SiteSettings => {
  const currentSettings = loadFromStorage('siteSettings', siteSettings);
  const updatedSettings = { ...currentSettings, ...settings };
  siteSettings = updatedSettings;
  saveToStorage('siteSettings', updatedSettings);
  return updatedSettings;
};

const data = {
  saveToStorage,
  loadFromStorage
};

export default data;
