# PopupInicio Component

Componente de popup inicial para cochereventa que se muestra automáticamente al entrar por primera vez a la web.

## 🎯 Características

- ✅ Se abre automáticamente en la primera visita (controlado por `localStorage`)
- ✅ Bloquea la interacción con la página hasta seleccionar una opción y completar el formulario
- ✅ Tres opciones principales:
  1. **Servicio de importación** - Formulario completo con todos los detalles
  2. **Vender mi coche** - Formulario con descripción del vehículo
  3. **Aprender sobre importación** - Formulario básico de contacto
- ✅ Transiciones suaves con `framer-motion`
- ✅ Diseño responsive y accesible
- ✅ Integración directa con WhatsApp
- ✅ Estilo coherente con TailwindCSS y shadcn/ui

## 📦 Instalación

El componente ya está creado en `src/components/PopupInicio.tsx` y utiliza las dependencias existentes del proyecto.

## 🚀 Uso

### 1. Configurar el número de WhatsApp

Abre el archivo `PopupInicio.tsx` y reemplaza el número de WhatsApp en la línea 14:

```typescript
// Cambia esto:
const WHATSAPP_NUMBER = "346XXXXXXXX";

// Por tu número real (sin espacios ni guiones):
const WHATSAPP_NUMBER = "34612345678";
```

### 2. Integrar en tu aplicación

Añade el componente en tu layout principal o página de inicio:

**Opción A: En el layout principal** (`src/app/layout.tsx`)

```tsx
import { PopupInicio } from "@/components/PopupInicio";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        {children}
        <PopupInicio />
      </body>
    </html>
  );
}
```

**Opción B: En la página de inicio** (`src/app/page.tsx`)

```tsx
import { PopupInicio } from "@/components/PopupInicio";

export default function Home() {
  return (
    <>
      <PopupInicio />
      {/* Resto del contenido */}
    </>
  );
}
```

## 🎨 Personalización

### Colores de los botones

Los colores de los botones principales se pueden modificar en la función `InitialView`:

```typescript
const options = [
  {
    id: "import" as ViewType,
    title: "Servicio de importación...",
    gradient: "from-blue-500 to-blue-600", // Cambia estos colores
    hoverGradient: "hover:from-blue-600 hover:to-blue-700",
  },
  // ...
];
```

### Textos y mensajes

Todos los textos están en español y se pueden modificar directamente en el componente:

- **Título inicial**: Línea 238
- **Subtítulo**: Línea 241
- **Títulos de opciones**: Líneas 246-268
- **Mensajes de WhatsApp**: Función `handleSubmit` (líneas 93-119)

### Tiempo de aparición

El popup aparece después de 500ms. Para cambiar este tiempo, modifica la línea 51:

```typescript
const timer = setTimeout(() => {
  setIsOpen(true);
}, 500); // Cambia este valor (en milisegundos)
```

## 🔧 Funcionalidades técnicas

### Control de visitas

El popup usa `localStorage` para mostrar el popup solo una vez de forma permanente:

- **Primera visita**: El popup se muestra automáticamente
- **Después de completar un formulario**: Se guarda en `localStorage` y no se vuelve a mostrar nunca
- **Visitas posteriores**: El popup no aparece, incluso después de cerrar el navegador

Para probar el popup de nuevo durante el desarrollo, abre la consola del navegador (F12) y ejecuta:
```javascript
localStorage.removeItem('hasSeenPopup');
```
Luego recarga la página.

### Validación de formularios

Los campos marcados con `*` son obligatorios. El formulario no se puede enviar sin completarlos.

### Mensajes de WhatsApp

Los mensajes se construyen automáticamente con los datos del formulario y se envían a través de la API de WhatsApp Web:

```
https://wa.me/NUMERO?text=MENSAJE_CODIFICADO
```

## 📱 Responsive

El componente es completamente responsive:

- **Móvil**: Popup ocupa el 100% del ancho con padding
- **Tablet/Desktop**: Popup con ancho máximo de 2xl (672px)
- **Altura**: Máximo 90vh con scroll interno si es necesario

## ♿ Accesibilidad

- Labels asociados a inputs
- Botones con `aria-label`
- Focus visible en todos los elementos interactivos
- Contraste de colores adecuado
- Navegación por teclado

## 🐛 Solución de problemas

### El popup no aparece

1. Verifica que el componente esté importado correctamente en `layout.tsx`
2. Limpia el `localStorage` del navegador:
   - Abre la consola (F12)
   - Ve a Application > Local Storage > http://localhost:3000
   - Elimina la clave `hasSeenPopup` o ejecuta: `localStorage.removeItem('hasSeenPopup')`
   - Recarga la página
3. Asegúrate de que no haya errores en la consola

### El enlace de WhatsApp no funciona

1. Verifica que el número esté en formato internacional sin espacios: `34612345678`
2. Comprueba que el navegador permita abrir ventanas emergentes
3. Prueba en un dispositivo móvil con WhatsApp instalado

### Estilos no se aplican correctamente

1. Verifica que TailwindCSS esté configurado correctamente
2. Asegúrate de que los componentes de shadcn/ui estén instalados
3. Comprueba que `framer-motion` esté en las dependencias

## 📄 Licencia

Este componente es parte del proyecto cochereventa.
