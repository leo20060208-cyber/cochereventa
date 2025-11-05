# 🚀 Guía Rápida de Migración

## Pasos para migrar tus datos a Supabase

### 1. Configura tus credenciales en `.env.local`

Abre el archivo `.env.local` y añade tus credenciales de Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Para obtenerlas:
1. Ve a [supabase.com](https://supabase.com)
2. Abre tu proyecto
3. Ve a **Settings** > **API**
4. Copia el **Project URL** y el **anon/public key**

---

### 2. Crea las tablas en Supabase

1. En tu proyecto de Supabase, ve a **SQL Editor**
2. Haz clic en **New query**
3. Copia TODO el contenido del archivo `supabase-schema.sql`
4. Pégalo en el editor
5. Haz clic en **Run** (o presiona Ctrl+Enter)

Deberías ver: ✅ **Success. No rows returned**

---

### 3. Ejecuta el script de migración

Abre tu terminal en la carpeta `cochereventa` y ejecuta:

```bash
npm run migrate
```

Verás algo como esto:

```
🚀 Iniciando migración a Supabase...

📦 Insertando coches...
✅ 6 coches insertados correctamente

📹 Insertando videos...
✅ 2 videos insertados correctamente

❓ Insertando FAQs...
✅ 6 FAQs insertadas correctamente

👥 Insertando testimonios de clientes...
✅ 5 clientes insertados correctamente

👤 Actualizando sección "Quiénes Somos"...
✅ Sección "Quiénes Somos" actualizada correctamente

⚙️ Actualizando configuración del sitio...
✅ Configuración del sitio actualizada correctamente

🎉 ¡Migración completada exitosamente!
```

---

### 4. Verifica los datos

1. Ve a tu proyecto en Supabase
2. Haz clic en **Table Editor**
3. Verifica que las tablas tienen datos:
   - **cars**: 6 coches
   - **videos**: 2 videos
   - **faqs**: 6 preguntas
   - **clients**: 5 testimonios
   - **who_we_are**: 1 registro
   - **site_settings**: 1 registro

---

### 5. ¡Listo!

Ahora tu base de datos está lista. Los datos de la web estarán sincronizados con la base de datos de Supabase.

---

## ❓ Solución de problemas

### Error: "Faltan las variables de entorno de Supabase"
- Verifica que el archivo `.env.local` existe en la raíz del proyecto
- Asegúrate de que las variables están bien escritas (sin espacios)
- Reinicia tu terminal

### Error: "relation does not exist"
- No has ejecutado el script SQL en Supabase
- Ve al paso 2 y ejecuta `supabase-schema.sql`

### Error: "duplicate key value violates unique constraint"
- Ya tienes datos en la base de datos
- Si quieres volver a migrar, primero borra los datos:
  1. En Supabase, ve a **SQL Editor**
  2. Ejecuta: `TRUNCATE cars, reservations, videos, faqs, clients CASCADE;`
  3. Vuelve a ejecutar `npm run migrate`

---

## 📝 Datos que se migrarán

### Coches (6):
- Audi A4 2020
- BMW Serie 3 2019
- Volkswagen Golf 2018
- Mercedes Clase C 2021
- Audi Q5 2019
- BMW X3 2020

### Videos (2):
- Vídeo Hero
- Vídeo "Qué Hacemos Por Ti"

### FAQs (6):
- Tiempo del proceso
- Garantías
- Dinero adelantado
- Documentación
- Ver el coche
- Problemas

### Clientes (5):
- María García
- Javier Martín
- Laura Rodríguez
- Carlos López
- Ana Ruiz

### Otros:
- Sección "Quiénes Somos"
- Configuración del sitio (contacto, redes sociales, footer)

---

¿Necesitas ayuda? Revisa la guía completa en `SUPABASE-SETUP.md`
