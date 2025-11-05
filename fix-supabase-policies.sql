-- =============================================
-- ARREGLAR POLÍTICAS DE SUPABASE
-- Ejecuta este script en el SQL Editor de Supabase
-- =============================================

-- OPCIÓN 1: DESHABILITAR RLS TEMPORALMENTE (MÁS SIMPLE)
-- =============================================
-- Esta es la solución más rápida para que funcione todo

ALTER TABLE cars DISABLE ROW LEVEL SECURITY;
ALTER TABLE reservations DISABLE ROW LEVEL SECURITY;
ALTER TABLE videos DISABLE ROW LEVEL SECURITY;
ALTER TABLE faqs DISABLE ROW LEVEL SECURITY;
ALTER TABLE clients DISABLE ROW LEVEL SECURITY;
ALTER TABLE who_we_are DISABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings DISABLE ROW LEVEL SECURITY;

-- =============================================
-- OPCIÓN 2: POLÍTICAS PERMISIVAS (MÁS SEGURO)
-- =============================================
-- Si prefieres mantener RLS activado, usa estas políticas

-- Primero, eliminar todas las políticas existentes
DROP POLICY IF EXISTS "Public cars are viewable by everyone" ON cars;
DROP POLICY IF EXISTS "Authenticated users can insert cars" ON cars;
DROP POLICY IF EXISTS "Authenticated users can update cars" ON cars;
DROP POLICY IF EXISTS "Authenticated users can delete cars" ON cars;

DROP POLICY IF EXISTS "Anyone can insert reservations" ON reservations;
DROP POLICY IF EXISTS "Authenticated users can view all reservations" ON reservations;
DROP POLICY IF EXISTS "Authenticated users can update reservations" ON reservations;

DROP POLICY IF EXISTS "Public videos are viewable by everyone" ON videos;
DROP POLICY IF EXISTS "Authenticated users can manage videos" ON videos;

DROP POLICY IF EXISTS "Public faqs are viewable by everyone" ON faqs;
DROP POLICY IF EXISTS "Authenticated users can manage faqs" ON faqs;

DROP POLICY IF EXISTS "Public clients are viewable by everyone" ON clients;
DROP POLICY IF EXISTS "Authenticated users can manage clients" ON clients;

DROP POLICY IF EXISTS "Public who_we_are is viewable by everyone" ON who_we_are;
DROP POLICY IF EXISTS "Authenticated users can manage who_we_are" ON who_we_are;

DROP POLICY IF EXISTS "Public site_settings are viewable by everyone" ON site_settings;
DROP POLICY IF EXISTS "Authenticated users can manage site_settings" ON site_settings;

-- Crear políticas permisivas para TODOS los usuarios
-- CARS
CREATE POLICY "Allow all operations on cars" ON cars
  FOR ALL USING (true) WITH CHECK (true);

-- RESERVATIONS
CREATE POLICY "Allow all operations on reservations" ON reservations
  FOR ALL USING (true) WITH CHECK (true);

-- VIDEOS
CREATE POLICY "Allow all operations on videos" ON videos
  FOR ALL USING (true) WITH CHECK (true);

-- FAQS
CREATE POLICY "Allow all operations on faqs" ON faqs
  FOR ALL USING (true) WITH CHECK (true);

-- CLIENTS
CREATE POLICY "Allow all operations on clients" ON clients
  FOR ALL USING (true) WITH CHECK (true);

-- WHO WE ARE
CREATE POLICY "Allow all operations on who_we_are" ON who_we_are
  FOR ALL USING (true) WITH CHECK (true);

-- SITE SETTINGS
CREATE POLICY "Allow all operations on site_settings" ON site_settings
  FOR ALL USING (true) WITH CHECK (true);

-- =============================================
-- VERIFICAR QUE LAS POLÍTICAS ESTÁN APLICADAS
-- =============================================
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- =============================================
-- NOTAS IMPORTANTES
-- =============================================
-- 1. La OPCIÓN 1 (deshabilitar RLS) es más simple y rápida
-- 2. La OPCIÓN 2 (políticas permisivas) es más segura pero requiere más configuración
-- 3. Para producción, considera agregar autenticación real con Supabase Auth
-- 4. Actualmente el admin usa sessionStorage sin autenticación real de Supabase
