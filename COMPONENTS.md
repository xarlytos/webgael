# Componentes - Guía de uso

## Componentes base

### Navbar
Navegación sticky con glassmorphism y menú responsive.

```tsx
import { Navbar } from './components/Navbar';

<Navbar currentPath="/" />
```

**Props:**
- `currentPath?: string` - Ruta actual para destacar en menú (default: '/')

**Características:**
- Sticky top con backdrop blur
- Menú hamburguesa en mobile
- Subrayado animado en item activo
- CTA "Sube tu diseño" destacado
- Toggle de tema integrado

---

### Footer
Footer completo con enlaces, newsletter y redes sociales.

```tsx
import { Footer } from './components/Footer';

<Footer />
```

**Sin props**

**Características:**
- 4 columnas: Brand, Enlaces rápidos, Recursos, Newsletter
- Iconos sociales
- Formulario de newsletter
- Links a política de privacidad y términos

---

### ThemeToggle
Toggle para alternar entre dark/light mode.

```tsx
import { ThemeToggle } from './components/ThemeToggle';

<ThemeToggle />
```

**Sin props**

**Características:**
- Persiste preferencia en localStorage
- Iconos animados (Sun/Moon)
- Transiciones suaves
- Aplica `data-theme` al html

---

## Componentes de hero

### HeroSplit3D
Hero principal con animación de partículas y CTA.

```tsx
import { HeroSplit3D } from './components/HeroSplit3D';

<HeroSplit3D />
```

**Sin props**

**Características:**
- Animación de partículas con Canvas
- Visualización 3D estilizada
- Badge de estado con ping animation
- CTAs primario y secundario
- Estadísticas (2000+ piezas, 24-48h, 15+ materiales)
- Gradientes radiales de fondo
- Responsive grid

---

## Componentes de contenido

### TechTabs
Tabs para mostrar tecnologías de impresión (FDM/SLA).

```tsx
import { TechTabs } from './components/TechTabs';

<TechTabs />
```

**Sin props**

**Características:**
- Tabs con iconos animados
- Panel con descripción, ventajas y tolerancias
- Grid de materiales disponibles
- Link a materiales especiales
- Transiciones suaves entre tabs

**Estructura de datos:**
```typescript
{
  id: 'fdm' | 'sla',
  name: string,
  icon: Component,
  description: string,
  advantages: string[],
  tolerances: string,
  materials: string[]
}
```

---

### Steps5
Timeline de 5 pasos del proceso de pedido.

```tsx
import { Steps5 } from './components/Steps5';

<Steps5 />
```

**Sin props**

**Características:**
- Timeline conectada (línea horizontal en desktop)
- Iconos grandes con badges numerados
- Hover scale en cards
- CTA al final de la sección
- Responsive (vertical en mobile, horizontal en desktop)

**Pasos:**
1. Sube tu diseño
2. Revisión técnica
3. Producción
4. Control de calidad
5. Entrega

---

### MaterialsMasonry
Grid de materiales con filtros FDM/SLA.

```tsx
import { MaterialsMasonry } from './components/MaterialsMasonry';

<MaterialsMasonry />
```

**Sin props**

**Características:**
- Filtros animados (Todos/FDM/SLA)
- Cards con hover scale
- Barras de propiedades (resistencia, detalle, flexibilidad, temperatura)
- Paleta de colores disponibles
- Tags de aplicaciones
- Transiciones suaves al filtrar

**Estructura de material:**
```typescript
{
  name: string,
  type: 'FDM' | 'SLA',
  properties: {
    strength: number,      // 0-10
    detail: number,        // 0-10
    flexibility: number,   // 0-10
    temperature: number    // 0-10
  },
  colors: string[],        // Hex codes
  icon: Component,
  description: string,
  applications: string[]
}
```

---

### ShowcaseCarousel
Carrusel de proyectos destacados con navegación.

```tsx
import { ShowcaseCarousel } from './components/ShowcaseCarousel';

<ShowcaseCarousel />
```

**Sin props**

**Características:**
- Navegación prev/next
- Auto-advance opcional
- Indicadores de progreso tipo slider
- Imagen con zoom en hover
- Especificaciones en cards (material, tiempo, dimensiones)
- Grid responsive (stack en mobile)

**Estructura de item:**
```typescript
{
  id: number,
  title: string,
  category: string,
  material: string,
  time: string,
  size: string,
  image: string,
  description: string
}
```

---

### FAQ
Acordeón de preguntas frecuentes.

```tsx
import { FAQ } from './components/FAQ';

<FAQ />
```

**Sin props**

**Características:**
- Acordeón con un item abierto por defecto
- Icono chevron animado (rotate 180deg)
- Glass cards
- CTA a página de contacto
- Transiciones suaves

**Estructura de FAQ:**
```typescript
{
  question: string,
  answer: string
}
```

---

## Componentes de conversión

### PricingStrip
Sección CTA con gradiente para conversión.

```tsx
import { PricingStrip } from './components/PricingStrip';

<PricingStrip />
```

**Sin props**

**Características:**
- Background con gradiente signature
- Doble CTA (primario y secundario)
- 3 badges de beneficios (sin mínimos, 24-48h, garantía)
- Efecto glassmorphism
- Centrado y responsive

---

### TrustBar
Barra con rating y logos de clientes.

```tsx
import { TrustBar } from './components/TrustBar';

<TrustBar />
```

**Sin props**

**Características:**
- Rating 5 estrellas animado
- Logos de clientes en grid
- Hover scale en logos
- Split layout (rating izq, logos der)
- Border top/bottom para separación

---

## Utilidades CSS

### Classes glassmorphism

```css
.glass
  /* Background blur con transparencia */

.glass-hover
  /* Hover effect más opaco */
```

### Classes gradient

```css
.gradient-text
  /* Texto con gradiente signature */

.btn-gradient
  /* Botón con gradiente y hover lift */
```

### Classes focus

```css
.focus-ring
  /* Outline visible en :focus-visible */
```

### Classes WordPress

```css
.wp-scope
  /* Wrapper para plugins de WordPress */
  /* Aplica estilos a inputs, buttons, labels */
```

---

## Páginas completas

### Home
```tsx
import { Home } from './pages/Home';
<Home />
```

Incluye todos los componentes en orden:
1. Navbar
2. HeroSplit3D
3. TrustBar
4. TechTabs
5. Steps5
6. MaterialsMasonry
7. ShowcaseCarousel
8. PricingStrip
9. FAQ
10. Footer

---

### Contact
```tsx
import { Contact } from './pages/Contact';
<Contact />
```

**Características:**
- Grid 2 columnas (formulario + info)
- Placeholder para Contact Form 7
- Cards de contacto (email, teléfono, ubicación, horario)
- Badge de tiempo de respuesta
- Placeholder para mapa

---

### UploadDesign
```tsx
import { UploadDesign } from './pages/UploadDesign';
<UploadDesign />
```

**Características:**
- Checklist de preparación STL
- Placeholder para plugin de presupuesto
- Tips útiles en sidebar
- Nota de privacidad
- CTA de ayuda al final

---

### Catalog
```tsx
import { Catalog } from './pages/Catalog';
<Catalog />
```

**Características:**
- Grid de productos (3 columnas desktop)
- ProductCard con imagen, rating, precio
- Placeholder WooCommerce
- CTA a diseño personalizado
- Hover effects en cards

---

## Animaciones incluidas

```css
animate-float       /* Movimiento vertical suave */
animate-glow        /* Pulsación de brillo */
animate-shimmer     /* Efecto shimmer horizontal */
animate-tilt        /* Rotación sutil */
animate-ping        /* Ping animation (dot indicator) */
```

**Uso:**
```tsx
<div className="animate-float">
  {/* Contenido flotante */}
</div>
```

---

## Tokens CSS disponibles

### Colores
```css
--bg, --surface, --surface-hover, --surface-elevated
--brand, --brand-dark, --brand-2, --accent
--text, --text-secondary, --text-tertiary
--border, --border-hover
--success, --warning, --error, --info
```

### Espaciado
```css
--space-xs (0.5rem) hasta --space-3xl (6rem)
```

### Radius
```css
--radius-sm hasta --radius-2xl, --radius-full
```

### Sombras
```css
--shadow-sm, --shadow-md, --shadow-lg, --shadow-glow
```

### Transiciones
```css
--transition-fast (150ms)
--transition-base (250ms)
--transition-slow (350ms)
```

---

## Buenas prácticas

1. **Siempre usar tokens CSS** en lugar de valores hardcoded
2. **Añadir focus-ring** a elementos interactivos
3. **Usar glass + glass-hover** para superficies elevadas
4. **Responsive first:** Mobile → Tablet → Desktop
5. **Lazy load** imágenes con `loading="lazy"`
6. **Accessibility:** aria-labels en iconos, alt en imágenes
7. **Performance:** GPU animations (transform/opacity)

---

**Última actualización:** 2025-10-06
