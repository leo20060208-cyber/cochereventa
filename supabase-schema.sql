-- =============================================
-- SCHEMA DE BASE DE DATOS PARA COCHEREVENTA
-- Para usar con Supabase (PostgreSQL)
-- =============================================

-- 1. TABLA: cars (Gestión de coches)
CREATE TABLE cars (
  id BIGSERIAL PRIMARY KEY,
  brand VARCHAR(100) NOT NULL,
  model VARCHAR(100) NOT NULL,
  year INTEGER NOT NULL CHECK (year > 1900),
  price INTEGER NOT NULL CHECK (price >= 0),
  mileage INTEGER NOT NULL CHECK (mileage >= 0),
  fuel VARCHAR(50) NOT NULL CHECK (fuel IN ('Gasolina', 'Diesel', 'Híbrido', 'Eléctrico')),
  transmission VARCHAR(50) NOT NULL CHECK (transmission IN ('Manual', 'Automático')),
  location VARCHAR(100) NOT NULL,
  image TEXT NOT NULL,
  images JSONB DEFAULT '[]'::jsonb,
  features JSONB DEFAULT '[]'::jsonb,
  description TEXT,
  status VARCHAR(20) DEFAULT 'available' CHECK (status IN ('available', 'reserved', 'sold')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. TABLA: reservations (Reservas de clientes)
CREATE TABLE reservations (
  id BIGSERIAL PRIMARY KEY,
  car_id BIGINT REFERENCES cars(id) ON DELETE SET NULL,
  car_name VARCHAR(200) NOT NULL,
  customer_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  method VARCHAR(20) NOT NULL CHECK (method IN ('whatsapp', 'meet')),
  date VARCHAR(10),
  time VARCHAR(5),
  message TEXT,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. TABLA: videos (Videos del sitio)
CREATE TABLE videos (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  url TEXT NOT NULL,
  description TEXT,
  type VARCHAR(50) NOT NULL CHECK (type IN ('hero', 'what-we-do')),
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. TABLA: faqs (Preguntas frecuentes)
CREATE TABLE faqs (
  id BIGSERIAL PRIMARY KEY,
  question VARCHAR(500) NOT NULL,
  answer TEXT NOT NULL,
  active BOOLEAN DEFAULT true,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. TABLA: clients (Testimonios de clientes)
CREATE TABLE clients (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  testimonial TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  avatar TEXT,
  location VARCHAR(100),
  car_bought VARCHAR(200),
  completed_at VARCHAR(10),
  active BOOLEAN DEFAULT true,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. TABLA: who_we_are (Sección "Quiénes Somos")
CREATE TABLE who_we_are (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  image TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. TABLA: site_settings (Configuración del sitio)
CREATE TABLE site_settings (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  company_name VARCHAR(200) NOT NULL,
  company_logo TEXT,
  contact_email VARCHAR(100) NOT NULL,
  contact_phone VARCHAR(20) NOT NULL,
  contact_address TEXT,
  whatsapp_number VARCHAR(20),
  instagram_url TEXT,
  facebook_url TEXT,
  twitter_url TEXT,
  linkedin_url TEXT,
  youtube_url TEXT,
  footer_copyright VARCHAR(500),
  footer_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- FUNCIONES Y TRIGGERS
-- =============================================

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para todas las tablas
CREATE TRIGGER update_cars_updated_at BEFORE UPDATE ON cars
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reservations_updated_at BEFORE UPDATE ON reservations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_videos_updated_at BEFORE UPDATE ON videos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON faqs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_who_we_are_updated_at BEFORE UPDATE ON who_we_are
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- ÍNDICES PARA OPTIMIZACIÓN
-- =============================================

CREATE INDEX idx_cars_status ON cars(status);
CREATE INDEX idx_cars_brand_model ON cars(brand, model);
CREATE INDEX idx_reservations_status ON reservations(status);
CREATE INDEX idx_reservations_car_id ON reservations(car_id);
CREATE INDEX idx_videos_type ON videos(type);
CREATE INDEX idx_videos_active ON videos(active);
CREATE INDEX idx_faqs_active ON faqs(active);
CREATE INDEX idx_faqs_order ON faqs("order");
CREATE INDEX idx_clients_active ON clients(active);
CREATE INDEX idx_clients_order ON clients("order");

-- =============================================
-- DATOS INICIALES
-- =============================================

-- Insertar configuración inicial del sitio
INSERT INTO site_settings (
  id,
  company_name,
  contact_email,
  contact_phone,
  footer_copyright
) VALUES (
  1,
  'Coche Reventa',
  'info@cochereventa.com',
  '+34 600 000 000',
  '© 2024 Coche Reventa. Todos los derechos reservados.'
) ON CONFLICT (id) DO NOTHING;

-- Insertar contenido inicial de "Quiénes Somos"
INSERT INTO who_we_are (
  id,
  image,
  description
) VALUES (
  1,
  'https://images.unsplash.com/photo-1560179707-f14e90ef3623',
  'Somos una empresa dedicada a la compra y venta de vehículos de ocasión con más de 10 años de experiencia en el sector.'
) ON CONFLICT (id) DO NOTHING;

-- =============================================
-- POLÍTICAS DE SEGURIDAD (ROW LEVEL SECURITY)
-- =============================================

-- Habilitar RLS en todas las tablas
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE who_we_are ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Políticas de lectura pública (todos pueden leer)
CREATE POLICY "Public cars are viewable by everyone" ON cars
  FOR SELECT USING (true);

CREATE POLICY "Public videos are viewable by everyone" ON videos
  FOR SELECT USING (active = true);

CREATE POLICY "Public faqs are viewable by everyone" ON faqs
  FOR SELECT USING (active = true);

CREATE POLICY "Public clients are viewable by everyone" ON clients
  FOR SELECT USING (active = true);

CREATE POLICY "Public who_we_are is viewable by everyone" ON who_we_are
  FOR SELECT USING (true);

CREATE POLICY "Public site_settings are viewable by everyone" ON site_settings
  FOR SELECT USING (true);

-- Políticas de escritura (solo usuarios autenticados)
-- NOTA: Estas políticas deberás ajustarlas según tu sistema de autenticación

CREATE POLICY "Authenticated users can insert cars" ON cars
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update cars" ON cars
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete cars" ON cars
  FOR DELETE USING (auth.role() = 'authenticated');

-- Política para reservations (cualquiera puede crear, solo admin puede ver todas)
CREATE POLICY "Anyone can insert reservations" ON reservations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can view all reservations" ON reservations
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update reservations" ON reservations
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Políticas para el resto de tablas (solo admin)
CREATE POLICY "Authenticated users can manage videos" ON videos
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage faqs" ON faqs
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage clients" ON clients
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage who_we_are" ON who_we_are
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage site_settings" ON site_settings
  FOR ALL USING (auth.role() = 'authenticated');

-- =============================================
-- COMENTARIOS PARA DOCUMENTACIÓN
-- =============================================

COMMENT ON TABLE cars IS 'Tabla principal de vehículos en inventario';
COMMENT ON TABLE reservations IS 'Reservas y consultas de clientes';
COMMENT ON TABLE videos IS 'Videos para hero y sección "Qué hacemos"';
COMMENT ON TABLE faqs IS 'Preguntas frecuentes del sitio';
COMMENT ON TABLE clients IS 'Testimonios de clientes satisfechos';
COMMENT ON TABLE who_we_are IS 'Contenido de la sección Quiénes Somos (registro único)';
COMMENT ON TABLE site_settings IS 'Configuración general del sitio (registro único)';
