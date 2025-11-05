# 🚀 Configurar Variables de Entorno en Vercel

## ❌ Error Actual

```
Error: Faltan las variables de entorno de Supabase. Verifica tu archivo .env.local
```

Este error ocurre porque Vercel no tiene acceso a tus variables de entorno de Supabase.

---

## ✅ Solución: Agregar Variables de Entorno en Vercel

### Paso 1: Obtener las Credenciales de Supabase

1. **Ve a [Supabase Dashboard](https://supabase.com/dashboard)**
2. **Selecciona tu proyecto**
3. **Click en Settings** (⚙️ en el menú lateral)
4. **Click en "API"**
5. **Copia estos dos valores**:
   - `Project URL` → Esta es tu `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → Esta es tu `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Paso 2: Agregar Variables en Vercel

#### Opción A: Desde el Dashboard de Vercel (RECOMENDADA)

1. **Ve a [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Selecciona tu proyecto** (cochereventa)
3. **Click en "Settings"** (arriba a la derecha)
4. **Click en "Environment Variables"** (menú lateral)
5. **Agrega las siguientes variables**:

   **Variable 1:**
   - Name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: `https://tu-proyecto.supabase.co` (tu URL de Supabase)
   - Environment: ✅ Production, ✅ Preview, ✅ Development

   **Variable 2:**
   - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (tu clave anon de Supabase)
   - Environment: ✅ Production, ✅ Preview, ✅ Development

6. **Click en "Save"** para cada variable

#### Opción B: Desde la Terminal (Alternativa)

```bash
# Instalar Vercel CLI (si no lo tienes)
npm i -g vercel

# Login en Vercel
vercel login

# Agregar variables de entorno
vercel env add NEXT_PUBLIC_SUPABASE_URL
# Pega tu URL cuando te lo pida

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# Pega tu clave anon cuando te lo pida
```

### Paso 3: Redesplegar

Después de agregar las variables, necesitas redesplegar:

**Opción 1: Desde el Dashboard**
- Ve a tu proyecto en Vercel
- Click en "Deployments"
- Click en los 3 puntos (...) del último deployment
- Click en "Redeploy"

**Opción 2: Desde la Terminal**
```bash
vercel --prod
```

---

## 📋 Checklist de Verificación

- [ ] ✅ Obtener URL de Supabase
- [ ] ✅ Obtener Anon Key de Supabase
- [ ] ✅ Agregar `NEXT_PUBLIC_SUPABASE_URL` en Vercel
- [ ] ✅ Agregar `NEXT_PUBLIC_SUPABASE_ANON_KEY` en Vercel
- [ ] ✅ Marcar todos los ambientes (Production, Preview, Development)
- [ ] ✅ Redesplegar el proyecto

---

## 🎯 Resultado Esperado

Después de configurar correctamente:

✅ El build en Vercel se completará exitosamente
✅ La web funcionará en producción
✅ Podrás ver los coches, FAQs, testimonios, etc.
✅ El admin podrá conectarse a Supabase

---

## 📝 Variables de Entorno Necesarias

```env
# En Vercel, agregar estas dos variables:
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**IMPORTANTE**:
- El prefijo `NEXT_PUBLIC_` es necesario para que las variables estén disponibles en el cliente
- Estas variables son seguras de exponer públicamente (la clave "anon" está diseñada para eso)

---

## 🔍 Verificar que Funcione

Después de redesplegar:

1. **Abre tu sitio en Vercel**: `https://tu-sitio.vercel.app`
2. **Revisa que carguen los datos**: Coches, FAQs, testimonios
3. **Abre la consola del navegador** (F12)
4. **No debería haber errores de Supabase**

---

## 🆘 Si Aún Hay Problemas

### Error: "Failed to collect page data"
- Verifica que las variables estén bien escritas (sin espacios extras)
- Asegúrate de haber marcado todos los ambientes
- Intenta redesplegar desde cero

### Error: "Invalid API key"
- Verifica que copiaste la clave completa
- Usa la clave "anon public", NO la "service_role"

### Error: "Project URL invalid"
- La URL debe incluir `https://`
- No debe terminar en `/`
- Formato: `https://xxxxxxxx.supabase.co`

---

## 📞 Recursos Útiles

- [Documentación de Vercel - Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [Documentación de Supabase - API Keys](https://supabase.com/docs/guides/api/api-keys)
- [Dashboard de Vercel](https://vercel.com/dashboard)
- [Dashboard de Supabase](https://supabase.com/dashboard)
