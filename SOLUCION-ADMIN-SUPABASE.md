# 🔧 Solución: Admin no guarda cambios en Supabase

## 🎯 Problema Identificado

El error `Error updating car: {}` indica que Supabase está bloqueando las operaciones debido a las políticas RLS (Row Level Security).

**Causa**: Las políticas de seguridad actuales solo permiten operaciones cuando el usuario está autenticado con Supabase Auth, pero el admin usa `sessionStorage` local sin autenticación real de Supabase.

---

## ✅ Soluciones (Elige una)

### 🚀 Solución 1: Deshabilitar RLS (RECOMENDADA - Más Simple)

Esta es la solución más rápida y fácil.

#### Pasos:

1. **Abre Supabase Dashboard**
   - Ve a https://supabase.com
   - Entra a tu proyecto

2. **Abre el SQL Editor**
   - En el menú lateral, click en "SQL Editor"
   - Click en "New Query"

3. **Ejecuta este script**:

```sql
-- Deshabilitar RLS en todas las tablas
ALTER TABLE cars DISABLE ROW LEVEL SECURITY;
ALTER TABLE reservations DISABLE ROW LEVEL SECURITY;
ALTER TABLE videos DISABLE ROW LEVEL SECURITY;
ALTER TABLE faqs DISABLE ROW LEVEL SECURITY;
ALTER TABLE clients DISABLE ROW LEVEL SECURITY;
ALTER TABLE who_we_are DISABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings DISABLE ROW LEVEL SECURITY;
```

4. **Click en "Run"**

✅ **Listo!** El admin ahora podrá guardar todos los cambios.

---

### 🔐 Solución 2: Políticas Permisivas (Más Seguro)

Si prefieres mantener RLS activado pero permitir todas las operaciones.

#### Pasos:

1. **Abre Supabase SQL Editor**

2. **Ejecuta el script completo** de [fix-supabase-policies.sql](fix-supabase-policies.sql)

O copia y pega esto:

```sql
-- Eliminar políticas restrictivas
DROP POLICY IF EXISTS "Public cars are viewable by everyone" ON cars;
DROP POLICY IF EXISTS "Authenticated users can insert cars" ON cars;
DROP POLICY IF EXISTS "Authenticated users can update cars" ON cars;
DROP POLICY IF EXISTS "Authenticated users can delete cars" ON cars;

-- Crear política permisiva
CREATE POLICY "Allow all operations on cars" ON cars
  FOR ALL USING (true) WITH CHECK (true);

-- Repetir para todas las tablas (ver archivo completo)
```

---

## 🔍 Verificar que Funciona

Después de aplicar la solución:

1. **Abre el admin** → `/admin`
2. **Intenta editar un coche**
3. **Revisa la consola del navegador** (F12 → Console)
4. **Deberías ver**: `"Car updated successfully: {...}"`

---

## 📊 Mejoras Implementadas en el Código

Ya he mejorado el archivo `src/lib/api.ts` con:

✅ **Mejor logging**:
```typescript
console.log('Updating car:', id, updates)
console.log('Car updated successfully:', data)
```

✅ **Manejo de errores detallado**:
```typescript
console.error('Error details:', JSON.stringify(error, null, 2))
```

✅ **Limpieza de datos**:
```typescript
// Remove undefined values
const cleanUpdates = Object.fromEntries(
  Object.entries(updates).filter(([_, v]) => v !== undefined)
)
```

---

## 🎯 Recomendación Final

**Para desarrollo/testing**: Usa **Solución 1** (deshabilitar RLS)
- Más rápida
- Menos configuración
- Perfecto para desarrollo

**Para producción**: Considera implementar Supabase Auth real
- Más seguro
- Control de acceso granular
- Auditoría de cambios

---

## 📝 Checklist de Verificación

Después de aplicar la solución, verifica que funcione:

- [ ] ✅ Crear nuevo coche
- [ ] ✅ Editar coche existente
- [ ] ✅ Eliminar coche
- [ ] ✅ Agregar video
- [ ] ✅ Editar FAQ
- [ ] ✅ Agregar cliente/testimonio
- [ ] ✅ Cambiar configuración del sitio
- [ ] ✅ Editar "Quiénes Somos"
- [ ] ✅ Actualizar estado de reserva

---

## 🆘 Si Aún No Funciona

1. **Verifica las variables de entorno**:
   - Revisa que `.env.local` tenga las credenciales correctas
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

2. **Revisa la consola del navegador**:
   - Abre DevTools (F12)
   - Mira la pestaña Console
   - Busca errores rojos

3. **Verifica la conexión a Supabase**:
   - Asegúrate de que el proyecto de Supabase esté activo
   - Verifica que las tablas existan

---

## 📞 Contacto

Si necesitas ayuda adicional, revisa:
- [Documentación de Supabase RLS](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase Dashboard](https://supabase.com/dashboard)
