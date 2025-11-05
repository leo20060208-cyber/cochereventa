# 🚀 Guía de Configuración de Supabase para Coche Reventa

## 📋 Índice
1. [Crear cuenta y proyecto en Supabase](#1-crear-cuenta-y-proyecto-en-supabase)
2. [Crear las tablas de la base de datos](#2-crear-las-tablas-de-la-base-de-datos)
3. [Instalar dependencias](#3-instalar-dependencias)
4. [Configurar variables de entorno](#4-configurar-variables-de-entorno)
5. [Conectar tu aplicación a Supabase](#5-conectar-tu-aplicación-a-supabase)
6. [Migrar datos existentes](#6-migrar-datos-existentes-opcional)

---

## 1. Crear cuenta y proyecto en Supabase

### Paso 1.1: Crear cuenta
1. Ve a [https://supabase.com](https://supabase.com)
2. Haz clic en **"Start your project"** o **"Sign Up"**
3. Puedes registrarte con GitHub, Google o email

### Paso 1.2: Crear nuevo proyecto
1. Una vez dentro, haz clic en **"New Project"**
2. Completa los campos:
   - **Name**: `cochereventa` (o el nombre que prefieras)
   - **Database Password**: Crea una contraseña segura (¡guárdala!)
   - **Region**: Elige la región más cercana a tus usuarios (ej: Europe West)
   - **Pricing Plan**: Selecciona "Free" para empezar
3. Haz clic en **"Create new project"**
4. Espera 1-2 minutos mientras se crea el proyecto

---

## 2. Crear las tablas de la base de datos

### Paso 2.1: Acceder al SQL Editor
1. En tu proyecto de Supabase, ve al menú lateral izquierdo
2. Haz clic en **"SQL Editor"**
3. Haz clic en **"New query"**

### Paso 2.2: Ejecutar el script SQL
1. Abre el archivo `supabase-schema.sql` que está en la raíz de tu proyecto
2. **Copia TODO el contenido** del archivo
3. **Pega** el contenido en el editor SQL de Supabase
4. Haz clic en el botón **"Run"** (o presiona Ctrl+Enter)
5. Deberías ver un mensaje de éxito: ✅ Success. No rows returned

### Paso 2.3: Verificar las tablas
1. Ve a **"Table Editor"** en el menú lateral
2. Deberías ver estas 7 tablas:
   - ✅ cars
   - ✅ reservations
   - ✅ videos
   - ✅ faqs
   - ✅ clients
   - ✅ who_we_are
   - ✅ site_settings

---

## 3. Instalar dependencias

Abre tu terminal en la raíz del proyecto y ejecuta:

```bash
npm install @supabase/supabase-js
```

---

## 4. Configurar variables de entorno

### Paso 4.1: Obtener las credenciales de Supabase
1. En tu proyecto de Supabase, ve a **"Settings"** (icono de engranaje en el menú lateral)
2. Haz clic en **"API"**
3. Encontrarás dos valores importantes:
   - **Project URL**: algo como `https://xxxxxxxxxxxxx.supabase.co`
   - **anon/public key**: una clave larga que empieza con `eyJ...`

### Paso 4.2: Crear archivo de variables de entorno
1. En la raíz de tu proyecto, crea un archivo llamado `.env.local`
2. Añade las siguientes líneas (reemplaza con tus valores):

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.tu-clave-anon...
```

### Paso 4.3: Agregar .env.local al .gitignore
Asegúrate de que tu archivo `.gitignore` incluya:
```
.env.local
.env*.local
```

---

## 5. Conectar tu aplicación a Supabase

### Paso 5.1: Crear el cliente de Supabase

Crea un archivo `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### Paso 5.2: Crear funciones de API

Crea un archivo `src/lib/api.ts` con funciones para interactuar con la base de datos:

```typescript
import { supabase } from './supabase'
import { Car, Reservation, Video, FAQ, Client, WhoWeAre, SiteSettings } from './data'

// ==================== CARS ====================

export async function getCars() {
  const { data, error } = await supabase
    .from('cars')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Car[]
}

export async function getCarById(id: number) {
  const { data, error } = await supabase
    .from('cars')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data as Car
}

export async function createCar(car: Omit<Car, 'id'>) {
  const { data, error } = await supabase
    .from('cars')
    .insert([car])
    .select()
    .single()

  if (error) throw error
  return data as Car
}

export async function updateCar(id: number, updates: Partial<Car>) {
  const { data, error } = await supabase
    .from('cars')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Car
}

export async function deleteCar(id: number) {
  const { error } = await supabase
    .from('cars')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// ==================== RESERVATIONS ====================

export async function getReservations() {
  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Reservation[]
}

export async function createReservation(reservation: Omit<Reservation, 'id'>) {
  const { data, error } = await supabase
    .from('reservations')
    .insert([reservation])
    .select()
    .single()

  if (error) throw error
  return data as Reservation
}

export async function updateReservation(id: number, updates: Partial<Reservation>) {
  const { data, error } = await supabase
    .from('reservations')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Reservation
}

export async function deleteReservation(id: number) {
  const { error } = await supabase
    .from('reservations')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// ==================== VIDEOS ====================

export async function getVideos() {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Video[]
}

export async function createVideo(video: Omit<Video, 'id'>) {
  const { data, error } = await supabase
    .from('videos')
    .insert([video])
    .select()
    .single()

  if (error) throw error
  return data as Video
}

export async function updateVideo(id: number, updates: Partial<Video>) {
  const { data, error } = await supabase
    .from('videos')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Video
}

export async function deleteVideo(id: number) {
  const { error } = await supabase
    .from('videos')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// ==================== FAQs ====================

export async function getFAQs() {
  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .order('order', { ascending: true })

  if (error) throw error
  return data as FAQ[]
}

export async function createFAQ(faq: Omit<FAQ, 'id'>) {
  const { data, error } = await supabase
    .from('faqs')
    .insert([faq])
    .select()
    .single()

  if (error) throw error
  return data as FAQ
}

export async function updateFAQ(id: number, updates: Partial<FAQ>) {
  const { data, error } = await supabase
    .from('faqs')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as FAQ
}

export async function deleteFAQ(id: number) {
  const { error } = await supabase
    .from('faqs')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// ==================== CLIENTS ====================

export async function getClients() {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .order('order', { ascending: true })

  if (error) throw error
  return data as Client[]
}

export async function createClient(client: Omit<Client, 'id'>) {
  const { data, error } = await supabase
    .from('clients')
    .insert([client])
    .select()
    .single()

  if (error) throw error
  return data as Client
}

export async function updateClient(id: number, updates: Partial<Client>) {
  const { data, error } = await supabase
    .from('clients')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Client
}

export async function deleteClient(id: number) {
  const { error } = await supabase
    .from('clients')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// ==================== WHO WE ARE ====================

export async function getWhoWeAre() {
  const { data, error } = await supabase
    .from('who_we_are')
    .select('*')
    .eq('id', 1)
    .single()

  if (error) throw error
  return data as WhoWeAre
}

export async function updateWhoWeAre(updates: Partial<WhoWeAre>) {
  const { data, error } = await supabase
    .from('who_we_are')
    .update(updates)
    .eq('id', 1)
    .select()
    .single()

  if (error) throw error
  return data as WhoWeAre
}

// ==================== SITE SETTINGS ====================

export async function getSiteSettings() {
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .eq('id', 1)
    .single()

  if (error) throw error
  return data as SiteSettings
}

export async function updateSiteSettings(updates: Partial<SiteSettings>) {
  const { data, error } = await supabase
    .from('site_settings')
    .update(updates)
    .eq('id', 1)
    .select()
    .single()

  if (error) throw error
  return data as SiteSettings
}
```

---

## 6. Migrar datos existentes (opcional)

Si ya tienes datos en localStorage que quieres migrar a Supabase:

### Opción A: Usar el Admin Panel
1. Ejecuta tu aplicación localmente: `npm run dev`
2. Ve a `/admin`
3. Abre la consola del navegador (F12)
4. Copia y ejecuta este script:

```javascript
// Exportar todos los datos de localStorage
const exportData = () => {
  const data = {
    cars: JSON.parse(localStorage.getItem('cars') || '[]'),
    reservations: JSON.parse(localStorage.getItem('reservations') || '[]'),
    videos: JSON.parse(localStorage.getItem('videos') || '[]'),
    faqs: JSON.parse(localStorage.getItem('faqs') || '[]'),
    clients: JSON.parse(localStorage.getItem('clients') || '[]'),
    whoWeAre: JSON.parse(localStorage.getItem('whoWeAre') || 'null'),
    siteSettings: JSON.parse(localStorage.getItem('siteSettings') || 'null'),
  }

  console.log('Datos exportados:', data)

  // Copiar al portapapeles
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'localstorage-backup.json'
  a.click()
}

exportData()
```

5. Esto descargará un archivo `localstorage-backup.json`
6. Podrás importar estos datos manualmente desde el Table Editor de Supabase

### Opción B: Script de migración automática
Crea un archivo `scripts/migrate-to-supabase.ts` y ejecuta un script de migración (necesitarás implementarlo según tus necesidades).

---

## 🔒 Seguridad

### Habilitar autenticación para el Admin Panel

Para proteger tu panel de administración:

1. **Configurar Supabase Auth**:
   - En Supabase, ve a **Authentication** > **Providers**
   - Habilita "Email" o el proveedor que prefieras

2. **Crear usuario admin**:
   - Ve a **Authentication** > **Users**
   - Haz clic en **"Add user"**
   - Añade un email y contraseña para tu admin

3. **Proteger rutas del admin**:
   - Implementa middleware de Next.js para verificar autenticación
   - Redirige a login si no está autenticado

---

## 📚 Recursos adicionales

- **Documentación de Supabase**: [https://supabase.com/docs](https://supabase.com/docs)
- **Supabase con Next.js**: [https://supabase.com/docs/guides/getting-started/quickstarts/nextjs](https://supabase.com/docs/guides/getting-started/nextstarts/nextjs)
- **Row Level Security**: [https://supabase.com/docs/guides/auth/row-level-security](https://supabase.com/docs/guides/auth/row-level-security)

---

## ❓ Preguntas frecuentes

**P: ¿Cuántos registros puedo tener en el plan gratuito?**
R: El plan gratuito incluye hasta 500 MB de base de datos y 2 GB de transferencia de datos al mes.

**P: ¿Necesito tarjeta de crédito?**
R: No para el plan gratuito.

**P: ¿Los datos están seguros?**
R: Sí, Supabase usa PostgreSQL con encriptación y backups automáticos.

**P: ¿Puedo cambiar de plan más adelante?**
R: Sí, puedes actualizar a un plan de pago en cualquier momento sin perder datos.

---

## 🚨 Solución de problemas

### Error: "relation does not exist"
- Verifica que ejecutaste el script SQL completo
- Comprueba que las tablas existen en el Table Editor

### Error: "Invalid API key"
- Verifica que copiaste correctamente la ANON key
- Asegúrate de que el archivo .env.local está en la raíz del proyecto
- Reinicia el servidor de desarrollo (`npm run dev`)

### Error: "Row Level Security policy violation"
- Las políticas RLS están activadas
- Para testing, puedes desactivarlas temporalmente en cada tabla
- Para producción, implementa autenticación adecuada

---

¡Listo! Ahora tu aplicación está conectada a Supabase. 🎉
