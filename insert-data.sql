-- =============================================
-- INSERTAR DATOS INICIALES
-- Ejecuta este script en el SQL Editor de Supabase
-- =============================================

-- Desactivar temporalmente RLS para insertar datos
ALTER TABLE cars DISABLE ROW LEVEL SECURITY;
ALTER TABLE videos DISABLE ROW LEVEL SECURITY;
ALTER TABLE faqs DISABLE ROW LEVEL SECURITY;
ALTER TABLE clients DISABLE ROW LEVEL SECURITY;
ALTER TABLE who_we_are DISABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings DISABLE ROW LEVEL SECURITY;

-- =============================================
-- INSERTAR COCHES
-- =============================================
INSERT INTO cars (brand, model, year, price, mileage, fuel, transmission, location, image, images, features, description, status) VALUES
('Audi', 'A4', 2020, 18500, 70000, 'Diesel', 'Automático', 'Alemania',
 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop',
 '["https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1549317336-206569e8475c?w=800&h=600&fit=crop"]'::jsonb,
 '["Climatizador","Navegador","Bluetooth","Cámara trasera"]'::jsonb,
 'Audi A4 en excelente estado, mantenimiento completo en concesionario oficial.',
 'available'),

('BMW', 'Serie 3', 2019, 21000, 80000, 'Gasolina', 'Manual', 'Francia',
 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop',
 '["https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop"]'::jsonb,
 '["Techo solar","Asientos deportivos","Sistema de sonido premium"]'::jsonb,
 'BMW Serie 3 con equipamiento deportivo, único propietario.',
 'available'),

('Volkswagen', 'Golf', 2018, 15200, 60000, 'Diesel', 'Automático', 'Italia',
 'https://images.unsplash.com/photo-1549317336-206569e8475c?w=800&h=600&fit=crop',
 '["https://images.unsplash.com/photo-1549317336-206569e8475c?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop"]'::jsonb,
 '["Sensores de aparcamiento","Cruise control","USB/Aux"]'::jsonb,
 'Volkswagen Golf familiar, perfecto estado de conservación.',
 'available'),

('Mercedes', 'Clase C', 2021, 28500, 45000, 'Híbrido', 'Automático', 'Alemania',
 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop',
 '["https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop"]'::jsonb,
 '["Asistente de conducción","CarPlay/Android Auto","LED"]'::jsonb,
 'Mercedes Clase C híbrido, tecnología de última generación.',
 'available'),

('Audi', 'Q5', 2019, 32000, 75000, 'Diesel', 'Automático', 'Francia',
 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop',
 '["https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop"]'::jsonb,
 '["Tracción integral","Maletero grande","Suspensión neumática"]'::jsonb,
 'Audi Q5 SUV familiar, ideal para viajes y ciudad.',
 'available'),

('BMW', 'X3', 2020, 35000, 65000, 'Gasolina', 'Automático', 'Alemania',
 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop',
 '["https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1549317336-206569e8475c?w=800&h=600&fit=crop"]'::jsonb,
 '["Techo panorámico","Asientos calefactables","Navegador"]'::jsonb,
 'BMW X3 con equipamiento premium, mantenimiento BMW.',
 'available');

-- =============================================
-- INSERTAR VIDEOS
-- =============================================
INSERT INTO videos (title, url, description, active, type) VALUES
('Vídeo Hero - Importación de Coches',
 'https://www.youtube.com/embed/3igSQXJBm6E',
 'Vídeo principal en la sección hero explicando el proceso de importación',
 true,
 'hero'),

('Vídeo Qué Hacemos Por Ti',
 'https://www.youtube.com/embed/3igSQXJBm6E',
 'Vídeo explicativo en la sección de servicios',
 true,
 'what-we-do');

-- =============================================
-- INSERTAR FAQs
-- =============================================
INSERT INTO faqs (question, answer, active, "order") VALUES
('¿Cuánto tiempo tarda el proceso completo?',
 'El proceso completo suele tardar entre 4-6 semanas desde que adquirimos el vehículo hasta que te lo entregamos en casa. Esto incluye el transporte, homologación, ITV y matriculación.',
 true, 1),

('¿Qué garantías ofrecen?',
 'Todos nuestros vehículos pasan por una inspección exhaustiva antes de la compra. Además, incluyen garantía de 12 meses y seguro durante todo el proceso. Si no cumple las condiciones acordadas, te devolvemos el dinero.',
 true, 2),

('¿Necesito adelantar dinero antes de recibir el coche?',
 'Solo se requiere una señal del 20% al firmar el contrato. El resto se paga cuando recibes el coche y verificas que cumple con lo acordado. Todo a través de transferencia bancaria segura.',
 true, 3),

('¿Qué documentación necesito?',
 'Solo necesitas tu DNI, carnet de conducir y comprobante de ingresos (nómina o declaración de hacienda). Nos encargamos de todo lo demás: papeles del vehículo, homologación, ITV y matriculación.',
 true, 4),

('¿Puedo ver el coche antes de comprarlo?',
 'Por supuesto. Te proporcionamos fotos detalladas y videos del estado del vehículo. Además, puedes hablar directamente con el vendedor europeo si tienes alguna duda específica.',
 true, 5),

('¿Qué pasa si el coche tiene algún problema?',
 'Si detectamos cualquier problema no mencionado anteriormente, te informamos inmediatamente antes de proceder. Tienes derecho a rechazar el vehículo y buscar una alternativa sin coste adicional.',
 true, 6);

-- =============================================
-- INSERTAR CLIENTES (TESTIMONIOS)
-- =============================================
INSERT INTO clients (name, testimonial, rating, avatar, location, car_bought, completed_at, active, "order") VALUES
('María García',
 'Un proceso increíblemente fácil para comprar mi Audi A4 desde Alemania. El equipo es muy profesional y transparente en cada paso. Ahora disfruto de mi coche todos los días.',
 5,
 'https://images.unsplash.com/photo-1494790108755-2616b612b18c?w=150&h=150&fit=crop&crop=face',
 'Madrid',
 'Audi A4 2019',
 '2023-11-15',
 true, 1),

('Javier Martín',
 'Llevaba meses buscando un BMW Serie 3 con las especificaciones exactas. Estos chicos lo encontraron en Francia y me lo trajeron en perfecto estado. ¡Altamente recomendado!',
 5,
 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
 'Barcelona',
 'BMW Serie 3 2020',
 '2023-12-03',
 true, 2),

('Laura Rodríguez',
 'Servicio excelente y precio increíble para el Mercedes Clase C que quería. El proceso fue completamente transparente y sin sorpresas desagradables. Definitivamente repetiré.',
 5,
 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
 'Valencia',
 'Mercedes Clase C 2021',
 '2024-01-10',
 true, 3),

('Carlos López',
 'Ideal para quienes buscan una alternativa confiable a los concesionarios tradicionales. Ahorré 8.000€ en mi Volkswagen Golf y el servicio fue impecable desde el primer día.',
 5,
 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
 'Sevilla',
 'Volkswagen Golf 2018',
 '2023-10-22',
 true, 4),

('Ana Ruiz',
 'Profesionales, honestos y eficientes. Mi Audi Q5 llegó exactamente como estaba descrito, con toda la documentación en orden. Sin duda la mejor experiencia de compra de coche.',
 5,
 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
 'Bilbao',
 'Audi Q5 2019',
 '2024-02-05',
 true, 5);

-- =============================================
-- INSERTAR QUIÉNES SOMOS
-- =============================================
INSERT INTO who_we_are (id, image, description) VALUES
(1,
 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
 'Somos tres chicos jóvenes de Barcelona, de 20, 22 y 23 años, apasionados por el mundo del motor. Desde siempre nos han fascinado los coches y todo lo que los rodea, y decidimos transformar esa pasión en un proyecto real y profesional.')
ON CONFLICT (id) DO UPDATE SET
  image = EXCLUDED.image,
  description = EXCLUDED.description;

-- =============================================
-- INSERTAR CONFIGURACIÓN DEL SITIO
-- =============================================
INSERT INTO site_settings (id, company_name, company_logo, contact_email, contact_phone, contact_address, whatsapp_number, instagram_url, facebook_url, twitter_url, linkedin_url, youtube_url, footer_copyright, footer_description) VALUES
(1,
 'CarImport',
 'https://via.placeholder.com/40x40/3B82F6/FFFFFF?text=CI',
 'info@carimport.com',
 '+34 640 337 898',
 'Carrer de la Marina 123, Barcelona',
 '+34640337898',
 'https://instagram.com/carimport',
 'https://facebook.com/carimport',
 'https://twitter.com/carimport',
 'https://linkedin.com/company/carimport',
 'https://youtube.com/@carimport',
 'CarImport. Todos los derechos reservados.',
 'Tu socio de confianza para importar coches de alta calidad desde Europa. Sin complicaciones, sin sorpresas.')
ON CONFLICT (id) DO UPDATE SET
  company_name = EXCLUDED.company_name,
  company_logo = EXCLUDED.company_logo,
  contact_email = EXCLUDED.contact_email,
  contact_phone = EXCLUDED.contact_phone,
  contact_address = EXCLUDED.contact_address,
  whatsapp_number = EXCLUDED.whatsapp_number,
  instagram_url = EXCLUDED.instagram_url,
  facebook_url = EXCLUDED.facebook_url,
  twitter_url = EXCLUDED.twitter_url,
  linkedin_url = EXCLUDED.linkedin_url,
  youtube_url = EXCLUDED.youtube_url,
  footer_copyright = EXCLUDED.footer_copyright,
  footer_description = EXCLUDED.footer_description;

-- =============================================
-- REACTIVAR RLS
-- =============================================
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE who_we_are ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- =============================================
-- VERIFICAR DATOS INSERTADOS
-- =============================================
SELECT 'Coches insertados:' as tabla, COUNT(*) as total FROM cars
UNION ALL
SELECT 'Videos insertados:', COUNT(*) FROM videos
UNION ALL
SELECT 'FAQs insertadas:', COUNT(*) FROM faqs
UNION ALL
SELECT 'Clientes insertados:', COUNT(*) FROM clients
UNION ALL
SELECT 'Quiénes Somos:', COUNT(*) FROM who_we_are
UNION ALL
SELECT 'Configuración:', COUNT(*) FROM site_settings;
