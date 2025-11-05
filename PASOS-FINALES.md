# 🎯 Pasos Finales para Desplegar en Vercel

## 📋 Resumen de la Situación

✅ **Local funciona**: Las variables de entorno están en `.env.local`
❌ **Vercel falla**: Necesitas copiar las variables a Vercel

---

## 🚀 ACCIÓN REQUERIDA: Configurar Variables en Vercel

### Opción 1: Dashboard de Vercel (MÁS FÁCIL)

1. **Abre**: https://vercel.com/dashboard
2. **Selecciona** tu proyecto: `cochereventa`
3. **Ve a**: Settings → Environment Variables
4. **Agrega estas 2 variables**:

```
NEXT_PUBLIC_SUPABASE_URL
Valor: https://zilsjfaudkckrfoymptu.supabase.co
Ambientes: ✅ Production ✅ Preview ✅ Development

NEXT_PUBLIC_SUPABASE_ANON_KEY
Valor: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppbHNqZmF1ZGtja3Jmb3ltcHR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4ODk1NTcsImV4cCI6MjA3NjQ2NTU1N30.cGyjK1EpvelYIn5GOy9GaZ2x0Mmm7sFo5saAZdHJAWY
Ambientes: ✅ Production ✅ Preview ✅ Development
```

5. **Guarda** cada variable
6. **Ve a**: Deployments
7. **Redeploy**: Click en "..." → "Redeploy"

### Opción 2: Terminal (Alternativa)

```bash
# Asegúrate de estar en el directorio del proyecto
cd c:/Users/Emil/cochereventa/cochereventa

# Agrega las variables
vercel env add NEXT_PUBLIC_SUPABASE_URL production
# Pega: https://zilsjfaudkckrfoymptu.supabase.co

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
# Pega: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppbHNqZmF1ZGtja3Jmb3ltcHR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4ODk1NTcsImV4cCI6MjA3NjQ2NTU1N30.cGyjK1EpvelYIn5GOy9GaZ2x0Mmm7sFo5saAZdHJAWY

# Redesplegar
vercel --prod
```

---

## 📝 Otras Tareas Pendientes

### 1. Arreglar Permisos de Supabase (Para que funcione el Admin)

**Ejecuta en Supabase SQL Editor**:

```sql
-- Deshabilitar RLS para que el admin pueda editar
ALTER TABLE cars DISABLE ROW LEVEL SECURITY;
ALTER TABLE reservations DISABLE ROW LEVEL SECURITY;
ALTER TABLE videos DISABLE ROW LEVEL SECURITY;
ALTER TABLE faqs DISABLE ROW LEVEL SECURITY;
ALTER TABLE clients DISABLE ROW LEVEL SECURITY;
ALTER TABLE who_we_are DISABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings DISABLE ROW LEVEL SECURITY;
```

**Dónde ejecutar**:
1. Ve a: https://supabase.com/dashboard
2. Selecciona tu proyecto
3. SQL Editor (menú lateral)
4. Pega el código de arriba
5. Click en "Run"

### 2. Verificar el Esquema de la Base de Datos

Asegúrate de que todas las tablas existan ejecutando: `supabase-schema.sql`

---

## ✅ Checklist Final

- [ ] 1️⃣ Agregar variables de entorno en Vercel
- [ ] 2️⃣ Redesplegar en Vercel
- [ ] 3️⃣ Ejecutar script SQL en Supabase (deshabilitar RLS)
- [ ] 4️⃣ Verificar que el sitio funcione: https://tu-sitio.vercel.app
- [ ] 5️⃣ Probar el admin: https://tu-sitio.vercel.app/admin

---

## 🎉 Resultado Esperado

Después de completar estos pasos:

✅ La web se desplegará correctamente en Vercel
✅ Los datos de Supabase se mostrarán en la web
✅ El admin podrá editar, crear y eliminar elementos
✅ Todo funcionará tanto en local como en producción

---

## 📞 Archivos de Referencia

- **Configurar Vercel**: [CONFIGURAR-VERCEL.md](CONFIGURAR-VERCEL.md)
- **Arreglar Admin**: [SOLUCION-ADMIN-SUPABASE.md](SOLUCION-ADMIN-SUPABASE.md)
- **Script SQL**: [fix-supabase-policies.sql](fix-supabase-policies.sql)
- **Variables de ejemplo**: [.env.example](.env.example)

---

## 🆘 Necesitas Ayuda?

Si algo no funciona:
1. Revisa la consola de Vercel para ver errores específicos
2. Verifica que las variables estén exactamente como se muestran arriba
3. Asegúrate de marcar TODOS los ambientes (Production, Preview, Development)
