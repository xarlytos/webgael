# Hazlo en 3D - Guía de integración WordPress

## Resumen

Este proyecto proporciona un diseño moderno y futurista para un servicio de impresión 3D, listo para integrar en WordPress con WooCommerce y plugins personalizados.

## Estructura de archivos

```
src/
├── tokens.css              # Variables CSS y design tokens
├── index.css               # Estilos globales y utilities
├── components/             # Componentes reutilizables
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── HeroSplit3D.tsx
│   ├── TechTabs.tsx
│   ├── Steps5.tsx
│   ├── MaterialsMasonry.tsx
│   ├── ShowcaseCarousel.tsx
│   ├── TrustBar.tsx
│   ├── FAQ.tsx
│   ├── PricingStrip.tsx
│   ├── ThemeToggle.tsx
│   └── WooCommerce.css    # Estilos WooCommerce
└── pages/
    ├── Home.tsx            # Página de inicio
    ├── Contact.tsx         # Página de contacto
    ├── UploadDesign.tsx    # Subir diseño
    └── Catalog.tsx         # Catálogo de productos
```

## Design Tokens

Todos los colores, espaciados y tipografías están definidos en `tokens.css` usando CSS variables:

```css
--bg: #0B0F14
--brand: #59F3C1 (verde menta neón)
--brand-2: #7AA6FF (azul eléctrico)
--accent: #FF7AE0 (magenta suave)
--gradient-primary: linear-gradient(...)
```

## Integración con WordPress

### 1. Plugins de WordPress necesarios

Para integrar correctamente las funcionalidades, necesitarás:

- **Contact Form 7** - Para formularios de contacto
- **WooCommerce** - Para el catálogo y carrito
- **Plugin de presupuesto 3D** (personalizado) - Para cálculo de precios

### 2. Usando shortcodes en componentes

#### Página de contacto (`/contacto`)

En el componente `Contact.tsx`, encontrarás un placeholder para Contact Form 7:

```jsx
<div className="wp-scope">
  <!-- Reemplazar con: -->
  [contact-form-7 id="123" title="Formulario de contacto"]
</div>
```

**Configuración del formulario:**
- Añadir campo para subir archivos STL: `[file file-stl filetypes:stl|obj]`
- Los estilos del formulario heredan automáticamente el diseño gracias a `.wp-scope`

#### Página de subir diseño (`/sube-tu-diseno`)

Placeholder para plugin de presupuesto:

```jsx
<div className="wp-scope">
  <!-- Reemplazar con: -->
  [plugin-presupuesto-3d]
</div>
```

**El plugin debe incluir:**
- Subida de archivos STL/OBJ
- Selector de tecnología (FDM/SLA)
- Selector de material
- Opciones de acabado
- Cantidad de piezas
- Cálculo en tiempo real

#### Catálogo WooCommerce (`/catalogo`)

El archivo `WooCommerce.css` sobrescribe los estilos por defecto de WooCommerce.

**Shortcodes útiles:**
```
[woocommerce_products]
[woocommerce_cart]
[woocommerce_checkout]
[woocommerce_my_account]
```

### 3. Clase `.wp-scope` para aislar estilos

Envuelve cualquier contenido de plugin de WordPress con esta clase para aplicar estilos consistentes:

```html
<div class="wp-scope">
  <!-- Contenido del plugin -->
</div>
```

Esto aplica automáticamente:
- Bordes redondeados (2xl)
- Efecto glassmorphism
- Inputs y botones estilizados
- Colores y tipografía del sistema

## Componentes clave

### HeroSplit3D
Hero con animación de partículas en canvas y visualización 3D.

**Props:** Ninguna
**Características:**
- Animación de partículas con Canvas API
- Efecto glassmorphism
- CTAs primario y secundario
- Estadísticas destacadas

### TechTabs
Tabs para mostrar tecnologías FDM y SLA.

**Props:** Ninguna
**Características:**
- Tabs animados
- Información de materiales
- Tolerancias y ventajas
- Filtros interactivos

### MaterialsMasonry
Grid de materiales con filtros.

**Props:** Ninguna
**Características:**
- Filtros FDM/SLA
- Barras de propiedades animadas
- Colores disponibles
- Aplicaciones típicas

### ShowcaseCarousel
Carrusel de proyectos destacados.

**Props:** Ninguna
**Características:**
- Navegación prev/next
- Indicadores de progreso
- Especificaciones técnicas
- Transiciones suaves

## Dark/Light Mode

El toggle de tema está implementado con localStorage:

```typescript
// Cambiar tema
localStorage.setItem('theme', 'light' | 'dark')
document.documentElement.setAttribute('data-theme', 'light' | 'dark')
```

Los tokens CSS ajustan automáticamente los colores según `data-theme`.

## Estados de pedido WooCommerce

Los estados tienen colores específicos en `WooCommerce.css`:

- **Pendiente**: Amarillo (`--warning`)
- **Procesando**: Azul (`--info`)
- **En espera**: Amarillo
- **Completado**: Verde (`--success`)
- **Cancelado/Fallido**: Rojo (`--error`)

## Accesibilidad

- Todos los botones interactivos tienen `focus-ring` para navegación por teclado
- Textos con contraste mínimo WCAG AA
- Soporte para `prefers-reduced-motion`
- Atributos `aria-label` en iconos y controles

## Microinteracciones

- Hover magnético en botones con `translateY(-2px)`
- Cards con efecto tilt suave
- Animaciones GPU-friendly (transform/opacity)
- Respeta `prefers-reduced-motion`

## Rendimiento

- Lazy loading de imágenes (usar `loading="lazy"` en `<img>`)
- Animaciones con `will-change` cuando sea necesario
- CSS variables para cambios de tema instantáneos
- Componentes modulares para code splitting

## Notas de implementación

1. **Fuentes:** Google Fonts (Space Grotesk + Inter) - considerar self-hosting para producción
2. **Imágenes:** Usar stock photos de Pexels o reemplazar con imágenes propias
3. **SEO:** Añadir meta tags, Open Graph y schema.org en implementación final
4. **Formularios:** Validar archivos STL en servidor (tamaño, formato, geometría)

## Personalización

Para cambiar el esquema de colores, edita `tokens.css`:

```css
:root {
  --brand: #TU_COLOR_PRIMARIO;
  --brand-2: #TU_COLOR_SECUNDARIO;
  --accent: #TU_COLOR_ACENTO;
}
```

Todos los componentes heredarán automáticamente los nuevos colores.

## Próximos pasos

1. Instalar y configurar Contact Form 7 con campo de archivo
2. Configurar WooCommerce con productos
3. Desarrollar o integrar plugin de presupuesto 3D
4. Configurar pasarela de pago
5. Añadir Google Analytics / tracking
6. Optimizar imágenes para web
7. Implementar caché y CDN
8. Testing cross-browser

---

**Versión:** 1.0
**Fecha:** 2025-10-06
**Compatibilidad:** WordPress 6.0+, WooCommerce 8.0+
