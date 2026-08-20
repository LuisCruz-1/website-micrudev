# Micrudev Design System & Prompt Style Guide

> **Versión 2.0 — Documentación Exhaustiva**
> **Estética:** "Premium Dark Developer-Tool" & "Cinematic Deep Space Aurora"
> Esta guía es un contrato técnico y creativo. Está diseñada para servir como un **prompt maestro** que permite a cualquier desarrollador, diseñador o IA replicar exactamente el mismo estilo visual y componentes sin ambigüedades, garantizando coherencia pixel-perfect en todas las implementaciones.

---

## Tabla de Contenidos

1. [Filosofía de Diseño](#1-filosofía-de-diseño)
2. [Sistema de Color (Tokens)](#2-sistema-de-color-tokens)
3. [Tipografía y Jerarquía](#3-tipografía-y-jerarquía)
4. [Sistema de Fondo Deep Space Aurora](#4-sistema-de-fondo-deep-space-aurora)
5. [Componentes Insignia (Signature Elements)](#5-componentes-insignia-signature-elements)
6. [Espaciado, Layout y Ritmo Visual](#6-espaciado-layout-y-ritmo-visual)
7. [Iconografía y Recursos Gráficos](#7-iconografía-y-recursos-gráficos)
8. [Estados, Interacciones y Microanimaciones](#8-estados-interacciones-y-microanimaciones)
9. [Configuración Técnica (Tailwind v4)](#9-configuración-técnica-tailwind-v4)
10. [Reglas de Implementación por Pantalla](#10-reglas-de-implementación-por-pantalla)
11. [Accesibilidad y Performance](#11-accesibilidad-y-performance)
12. [Checklist de Construcción para la IA](#12-checklist-de-construcción-para-la-ia)

---

## 1. Filosofía de Diseño

El diseño encarna el ADN visual de las herramientas para desarrolladores de primer nivel (estilo Vercel, Linear, Stripe). Combina la **precisión técnica del diseño suizo** con **profundidad tridimensional táctil** y una **iluminación cinematográfica profunda tipo espacio exterior**.

### Pilares Fundamentales

| Pilar | Descripción |
|-------|-------------|
| **Espacio Profundo Cinematográfico** | El fondo no es plano; es un universo con canvas azul oscuro, luces aurora flotantes, cuadrícula técnica y halo de luz superior. |
| **Profundidad Táctil** | Los botones simulan teclas físicas de teclado mecánico; los contenedores flotan como cristal esmerilado. |
| **Precisión Matemática** | Tipografías monoespaciadas para metadatos, cero cursivas, alineación estricta. |
| **Polaridad Dinámica** | Sistema de tokens que invierten la polaridad del color sin cambiar las clases HTML. |
| **Performance Invisible** | Todo efecto decorativo debe ser GPU-accelerated o deshabilitarse con `prefers-reduced-motion`. |

### Principios de Uso

1. **Menos es más.** Si un elemento no aporta, se elimina.
2. **Aire generoso.** El espacio negativo es tan importante como el contenido.
3. **Jerarquía clara.** Máximo 3 niveles tipográficos por vista.
4. **Color con propósito.** El azul solo para acciones y acentos clave.
5. **Consistencia.** Los mismos radios, los mismos espacios, los mismos pesos.
6. **Sin decoración gratuita.** Nada de ruido, texturas innecesarias o brillos exagerados.

---

## 2. Sistema de Color (Tokens)

Todo el sitio utiliza variables nativas inyectadas en `@theme` de Tailwind CSS v4. **PROHIBIDO** usar colores crudos en el HTML (como `bg-black`, `text-white`, `bg-[#06132F]`). Siempre se recurre a las variables mapeadas.

### 2.1 Paleta Base (Tokens de Marca)

| Token CSS | Modo Oscuro | Modo Claro | RGB (Oscuro) | Rol Principal |
|-----------|-------------|------------|--------------|---------------|
| `--color-canvas` | `#040B1F` (Deep Space Navy) | `#F6F8FC` (Soft Gray) | `rgb(4, 11, 31)` | Fondo base del viewport |
| `--color-white` | `#ffffff` | `#06132F` | `rgb(255, 255, 255)` | Texto principal, iconos, títulos |
| `--color-black` | `#000000` | `#ffffff` | `rgb(0, 0, 0)` | Sombras, fondos inversos |
| `--color-muted` | `#8B9BB4` | `#637089` | `rgb(139, 155, 180)` | Texto secundario, subtítulos |

### 2.2 Aurora Accent Colors (Paleta Corporativa)

| Token | HEX | RGB | Uso |
|-------|-----|-----|-----|
| `--color-crimson` | `#003DCC` | `rgb(0, 61, 204)` | Azul corporativo profundo, acentos secundarios |
| `--color-coral` | `#0253FD` | `rgb(2, 83, 253)` | Azul brillante principal, CTAs primarios |
| `--color-amber` | `#4C84FF` | `rgb(76, 132, 255)` | Azul claro cristalino, hovers, anillos de foco |

### 2.3 Aurora Blade Tokens (Para el fondo Deep Space)

| Token | HEX | RGB | Posición en fondo | Intensidad |
|-------|-----|-----|-------------------|------------|
| `--theme-aurora-1` | `#0253FD` | `rgb(2, 83, 253)` | Superior izquierda (Blade 1) | 100% |
| `--theme-aurora-2` | `#4C84FF` | `rgb(76, 132, 255)` | Lateral derecho (Blade 2) | 95% |
| `--theme-aurora-3` | `#001A66` | `rgb(0, 26, 102)` | Inferior central (Blade 3) | 100% |
| `--theme-aurora-4` | `#003DCC` | `rgb(0, 61, 204)` | Centro flotante (Blade 4) | 90% |
| `--theme-aurora-5` | `#6B9DFF` | `rgb(107, 157, 255)` | Superior derecha (Blade 5) | 95% |

### 2.4 Tokens de Componentes (Variables de Estado)

| Token | Modo Oscuro | Modo Claro | Rol |
|-------|-------------|------------|-----|
| `--theme-keycap-bg` | `#E7EFFF` | `#ffffff` | Fondo del botón keycap |
| `--theme-keycap-text` | `#0F1B37` | `#06132F` | Texto del botón keycap |
| `--theme-keycap-shadow` | Pila compleja (ver §5.3) | Pila sutil | Sombra exterior + relieves |
| `--theme-keycap-shadow-active` | Pila comprimida | Pila comprimida | Estado presionado |
| `--theme-nav-bg` | `rgba(4, 11, 31, 0.7)` | `rgba(255, 255, 255, 0.8)` | Fondo del navbar (glassmorphism) |
| `--theme-nav-border` | `rgba(255, 255, 255, 0.1)` | `rgba(6, 19, 47, 0.1)` | Borde del navbar |
| `--theme-nav-shadow` | `inset 0 1px 0 rgba(255,255,255,0.05), 0 10px 30px rgba(0,0,0,0.5)` | `inset 0 1px 0 #fff, 0 10px 30px rgba(6,19,47,0.05)` | Sombra del navbar |
| `--theme-cmd-bg` | `rgba(7, 12, 28, 0.7)` | `rgba(255, 255, 255, 0.85)` | Fondo del command-bar mockup |
| `--theme-cmd-border` | `rgba(255, 255, 255, 0.08)` | `rgba(6, 19, 47, 0.08)` | Borde del command-bar |
| `--theme-cmd-shadow` | `0 30px 60px rgba(2,83,253,0.08), inset 0 1px 0 rgba(255,255,255,0.05)` | `0 30px 60px rgba(2,83,253,0.05), inset 0 1px 0 #fff` | Sombra del command-bar |
| `--theme-aurora-glow` | `rgba(2, 83, 253, 0.22)` | `rgba(2, 83, 253, 0.18)` | Resplandor base de la aurora |

### 2.5 Reglas de Polaridad (Dark/Light)

```css
/* En :root → valores para Modo Claro */
/* En :root.dark → valores para Modo Oscuro */
/* La clase .dark se inyecta vía JavaScript en <html> */
```

**Regla:** Ningún color crudo en el HTML. Usar siempre `var(--color-X)`.

---

## 3. Tipografía y Jerarquía

### 3.1 Familias Tipográficas

| Familia | CSS Variable | Pesos Cargados | Uso |
|---------|--------------|----------------|-----|
| **Inter** | `--font-body` | 400, 500, 600 | Títulos, párrafos, botones, UI general |
| **Geist Mono** | `--font-mono` | 400, 500 | Eyebrows, comandos CLI, atajos, footer, datos técnicos |

**Cargadas vía Google Fonts:**
```html
<link href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&family=Inter:wght@400;500;600&display=swap">
```

### 3.2 Escala Tipográfica

| Nivel | Tamaño | Peso | Uso |
|-------|--------|------|-----|
| **Display (H1)** | `text-[40px] md:text-[64px]` | 600 | Solo Hero principal |
| **H2 (Sección)** | `text-4xl md:text-5xl` | 600 | Títulos de sección (UNIFORME en todo el sitio) |
| **H3 (Card)** | `text-xl` (20px) | 600 | Títulos dentro de cards |
| **Subtítulo** | `text-lg` (18px) | 400 | Subtítulos de sección |
| **Body** | `text-base` (16px) | 400 | Texto general |
| **Small** | `text-sm` (14px) | 400 | Metadata, links, botones pequeños |
| **Eyebrow** | `text-[11px]` | 500 | Etiquetas de sección (uppercase, tracking-wider) |
| **Caption (Mono)** | `text-[10-12px]` | 400 | Comandos, atajos, footer |

### 3.3 Reglas Estrictas

- 🚫 **PROHIBIDO EL USO DE CURSIVAS** (`italic`): Ningún elemento debe usar la clase `italic`.
- **Títulos de Sección:** Uniformes en todo el sitio: `text-4xl md:text-5xl font-[600] tracking-tight`.
- **Subtítulos de Sección:** `text-lg font-[400] text-[var(--color-muted)] max-w-[640px] leading-relaxed`.
- **Tracking:** `tracking-tight` en titulares, `tracking-wider` en eyebrows (uppercase).
- **Leading:** `leading-tight` en headings, `leading-relaxed` en body.

---

## 4. Sistema de Fondo Deep Space Aurora

### 4.1 Arquitectura General

El fondo del sitio es un **ecosistema de 6 capas** apiladas con aislamiento propio (`isolation: isolate`). Es la pieza visual más importante del proyecto.

**Estructura HTML obligatoria:**
```html
<body>
  <!-- Contenedor de fondo (Layers 1-4) -->
  <div class="deep-space-bg absolute inset-0 overflow-hidden pointer-events-none z-0" style="isolation: isolate;">
    <div class="deep-space-base absolute inset-0"></div>            <!-- Layer 1 -->
    <div class="absolute inset-0">                                    <!-- Layer 2 wrapper -->
      <div class="aurora-blade blade-1"></div>
      <div class="aurora-blade blade-2"></div>
      <div class="aurora-blade blade-3"></div>
      <div class="aurora-blade blade-4"></div>
      <div class="aurora-blade blade-5"></div>
    </div>
    <svg class="deep-space-grid absolute inset-0 w-full h-full">...</svg> <!-- Layer 3 -->
    <div class="deep-space-vignette absolute inset-0"></div>          <!-- Layer 4 -->
  </div>
  <!-- Layer 5 (sibling, fixed al viewport) -->
  <div class="deep-space-letterbox fixed top-0 left-0 right-0 z-[60] pointer-events-none"></div>
  <Navbar />                                                          <!-- z-50 -->
  <div class="relative z-10"><slot /></div>                           <!-- Contenido -->
</body>
```

### 4.2 Layer 1: Base Canvas (`.deep-space-base`)

**Propósito:** Establecer el color base + 3 gradientes radiales de profundidad ambiental.

```css
.deep-space-base {
  background:
    radial-gradient(ellipse 80% 60% at 50% 0%, rgba(2, 83, 253, 0.4), transparent 60%),
    radial-gradient(ellipse 60% 50% at 100% 100%, rgba(76, 132, 255, 0.3), transparent 60%),
    radial-gradient(ellipse 50% 50% at 0% 80%, rgba(0, 26, 102, 0.5), transparent 60%),
    var(--color-canvas);
}
```

| Gradiente | Posición | Color | Opacidad | Radio |
|-----------|----------|-------|----------|-------|
| #1 | `50% 0%` (superior centro) | `rgba(2, 83, 253, ...)` | 0.4 | ellipse 80% 60% |
| #2 | `100% 100%` (inferior derecho) | `rgba(76, 132, 255, ...)` | 0.3 | ellipse 60% 50% |
| #3 | `0% 80%` (inferior izquierdo) | `rgba(0, 26, 102, ...)` | 0.5 | ellipse 50% 50% |
| Base | Capa final | `var(--color-canvas)` | 100% | — |

**Resultado visual:** Un fondo que respira color azul en los bordes, dejando el centro más limpio para el contenido.

### 4.3 Layer 2: Aurora Blades (5 luces difuminadas)

**Propósito:** Generar profundidad cinemática con luces radiales en movimiento perpetuo.

**Estilos base:**
```css
.aurora-blade {
  position: absolute;
  filter: blur(100px);             /* 70px en móvil */
  border-radius: 50%;
  will-change: transform, opacity;
  contain: layout style paint;
  pointer-events: none;
}
```

**Especificaciones por Blade:**

| # | Color | Posición Desktop | Dimensiones | Rotación | Animación | Opacidad |
|---|-------|------------------|-------------|----------|-----------|----------|
| **blade-1** | `var(--theme-aurora-1)` `#0253FD` | `top: -15%, left: -10%` | `55vw × 55vw` | `-15deg` | `drift-1 24s` | 1.0 |
| **blade-2** | `var(--theme-aurora-2)` `#4C84FF` | `top: 25%, right: -15%` | `50vw × 50vw` | `+20deg` | `drift-2 30s` | 0.95 |
| **blade-3** | `var(--theme-aurora-3)` `#001A66` | `bottom: -20%, left: 15%` | `60vw × 60vw` | `-5deg` | `drift-3 20s` | 1.0 |
| **blade-4** | `var(--theme-aurora-4)` `#003DCC` | `top: 50%, left: 40%` | `35vw × 35vw` | `+10deg` | `drift-4 35s` | 0.9 |
| **blade-5** | `var(--theme-aurora-5)` `#6B9DFF` | `top: 5%, right: 20%` | `40vw × 40vw` | `-25deg` | `drift-5 28s` | 0.95 |

**Mobile (max-width: 768px):**
| # | Dimensiones Móvil |
|---|-------------------|
| blade-1 | `80vw × 80vw` |
| blade-2 | `70vw × 70vw` |
| blade-3 | `85vw × 85vw` |
| blade-4 | `50vw × 50vw` |
| blade-5 | `55vw × 55vw` |

**Animaciones (Keyframes):**
- Todas usan `infinite alternate ease-in-out`.
- Varían `transform: translate(X%, Y%) rotate(deg) scale(value)` y `opacity`.
- Estructura de cada `@keyframes drift-N`: `0%` (estado inicial) → `100%` (estado final), excepto `drift-4` que tiene un punto medio al 50%.

### 4.4 Layer 3: Micro-Grid (Cuadrícula Técnica)

**Propósito:** Añadir la "precisión suiza" del diseño. Es la capa de identidad técnica.

**Implementación SVG inline:**
```html
<svg class="deep-space-grid absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
  <defs>
    <pattern id="microGrid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#003DCC" stroke-width="0.6" class="grid-stroke"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#microGrid)"/>
</svg>
```

**Parámetros:**

| Parámetro | Valor | Notas |
|-----------|-------|-------|
| Tamaño de celda | `60px × 60px` | Constante en todos los viewports |
| Stroke width | `0.6px` | Línea técnica fina |
| Color Modo Oscuro | `#4C84FF` (controlado por `.grid-stroke` con `html.dark`) | Azul claro cristalino |
| Color Modo Claro | `#003DCC` (controlado por `.grid-stroke` con `html:not(.dark)`) | Azul corporativo profundo |
| Opacidad contenedor | `0.6` (dark) / `0.6` (light) | Controlada por `.deep-space-grid` |
| Forma | Solo bordes superior e izquierdo (`M 60 0 L 0 0 0 60`) | Estilo blueprint |
| Máscara | `radial-gradient(ellipse 80% 80% at 50% 30%, #000 0%, transparent 75%)` | Difumina los bordes |

**Reglas de uso:**
- El grid debe ser visible en todas las páginas (es la identidad técnica).
- En modo claro, el `opacity` del contenedor puede reducirse a `0.4-0.6` para no competir con el contenido.
- La máscara radial debe respetarse para mantener la sensación de profundidad (no quitar la máscara).

### 4.5 Layer 4: Vignette (`.deep-space-vignette`)

**Propósito:** Oscurecer sutilmente los bordes para enfocar la atención al centro.

```css
.deep-space-vignette {
  background: radial-gradient(circle at center, transparent 0%, var(--color-canvas) 100%);
  opacity: 0.7;
}
```

| Parámetro | Valor |
|-----------|-------|
| Tipo | `radial-gradient` |
| Centro | `circle at center` |
| Inicio | `transparent 0%` |
| Final | `var(--color-canvas) 100%` |
| Opacidad | `0.7` |

### 4.6 Layer 5: Cinematic Letterbox (`.deep-space-letterbox`)

**Propósito:** Línea de luz superior con resplandor triple que permanece fija al viewport durante el scroll.

**Estructura HTML (sibling de `.deep-space-bg`):**
```html
<div class="deep-space-letterbox fixed top-0 left-0 right-0 z-[60] pointer-events-none"></div>
```

**Estilos:**
```css
.deep-space-letterbox {
  height: 3px;
  background: linear-gradient(to right, transparent 0%, var(--theme-aurora-1) 50%, transparent 100%);
  opacity: 1;
  box-shadow:
    0 0 20px var(--theme-aurora-1),
    0 0 40px var(--theme-aurora-1),
    0 0 80px var(--theme-aurora-1);
}
```

| Parámetro | Valor |
|-----------|-------|
| Altura | `3px` |
| Gradiente | `linear-gradient(to right, transparent → aurora-1 → transparent)` |
| Color | `var(--theme-aurora-1)` `#0253FD` |
| Posición | `fixed top-0` (viewport-relative) |
| Z-index | `z-[60]` (sobre el contenido, bajo modales) |
| Resplandor | Triple: `20px + 40px + 80px` |
| Pointer events | `none` (no interfiere con interactividad) |

**Importante:** Este elemento debe ser **sibling** de `.deep-space-bg`, no hijo, para evitar conflictos con `overflow-hidden` y `isolation: isolate` del padre.

### 4.7 Capas y Z-Index Global

| Capa | Z-Index | Contexto |
|------|---------|----------|
| Background Layers 1-4 | `z-0` | Contenedor con `isolation: isolate` |
| Letterbox | `z-[60]` | `fixed` al viewport |
| Navbar | `z-50` | `fixed` al viewport |
| Contenido principal | `z-10` | Relativo al body |
| Modales/Overlays | `z-[70+]` | Solo si existen |

---

## 5. Componentes Insignia (Signature Elements)

### 5.1 Standardized Eyebrows (Etiquetas Superiores)

Toda sección principal debe estar precedida por un "Eyebrow" sobre el título principal.

**Estructura HTML:**
```html
<div class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 mb-8 relative overflow-hidden">
  <span class="w-2 h-2 rounded-full bg-[var(--color-amber)] animate-pulse"></span>
  <span class="font-mono text-[11px] text-[var(--color-white)] uppercase tracking-wider">ETIQUETA</span>
</div>
```

**Parámetros:**

| Elemento | Clase | Valor |
|----------|-------|-------|
| Contenedor | `inline-flex items-center gap-2 rounded-full` | — |
| Borde | `border border-white/10` | Borde sutil 1px |
| Fondo | `bg-white/5` | Glassmorphism muy sutil |
| Padding | `px-4 py-1.5` | Compacto |
| Margen inferior | `mb-8` | Separación del título |
| Punto pulsante | `w-2 h-2 rounded-full bg-[var(--color-amber)] animate-pulse` | Indicador vivo |
| Texto | `font-mono text-[11px] uppercase tracking-wider` | Geist Mono |

**Variante Hero (con shimmer):** Añadir un pseudo-elemento con gradiente animado:
```html
<div class="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-amber)]/10 to-transparent -translate-x-full animate-[shimmer_2.5s_infinite]"></div>
```

### 5.2 Tactile Keycap Buttons (Botones Principales)

**Clase:** `.keycap-btn`

**Estructura HTML:**
```html
<a href="..." class="keycap-btn">
  <svg>...</svg>
  Texto del botón
</a>
```

**Estilos base:**
```css
.keycap-btn {
  background-color: var(--color-keycap-bg);
  color: var(--color-keycap-text);
  border-radius: 8px;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  box-shadow: var(--theme-keycap-shadow);
  transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.1s cubic-bezier(0.4, 0, 0.2, 1);
}
.keycap-btn:active {
  transform: translateY(2px);
  box-shadow: var(--theme-keycap-shadow-active);
}
```

**Sombras (El Secreto del Relieve):**

| Modo | Sombra Completa |
|------|-----------------|
| **Oscuro** | `0 0 0 2px #000, 0 0 14px rgba(255,255,255,0.19), inset 0 1px 1px rgba(255,255,255,1), inset 0 -1px 1px rgba(0,0,0,0.2)` |
| **Claro** | `0 0 0 2px rgba(6,19,47,0.1), 0 4px 14px rgba(6,19,47,0.05), inset 0 -2px 1px rgba(6,19,47,0.05)` |
| **Active Oscuro** | `0 0 0 2px #000, 0 0 6px rgba(255,255,255,0.1), inset 0 1px 1px rgba(255,255,255,0.5), inset 0 -1px 1px rgba(0,0,0,0.4)` |
| **Active Claro** | `0 0 0 2px rgba(6,19,47,0.1), 0 2px 6px rgba(6,19,47,0.05), inset 0 -1px 1px rgba(6,19,47,0.1)` |

**Anatomía de la sombra (4 capas):**
1. Anillo oscuro exterior (`0 0 0 2px`).
2. Resplandor exterior suave.
3. Highlight superior interno (`inset 0 1px`).
4. Sombra inferior interna (`inset 0 -1px`).

### 5.3 Ghost Pill (Botón Secundario)

**Clase:** `.ghost-pill`

```css
.ghost-pill {
  background: transparent;
  border: 1px solid rgba(var(--color-white), 0.15);
  color: var(--color-muted);
  border-radius: 9999px;
  padding: 8px 16px;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
}
.ghost-pill:hover {
  border-color: rgba(var(--color-white), 0.3);
  color: var(--color-white);
}
```

### 5.4 Command-Bar Mockup (Glassmorphism)

**Clase:** `.command-bar-mockup`

**Estilos:**
```css
.command-bar-mockup {
  background: var(--theme-cmd-bg);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid var(--theme-cmd-border);
  border-radius: 14px;
  box-shadow: var(--theme-cmd-shadow);
}
```

**Anatomía interna:**
- Fila superior (input): `flex items-center px-4 py-4 border-b border-white/5`.
- Filas de resultados: `flex flex-col py-2`.
- Fila activa: `bg-[var(--color-crimson)]/15 border-l-2 border-[var(--color-crimson)]`.
- Filas inactivas: `hover:bg-white/5 border-l-2 border-transparent`.
- Footer hints: `bg-black/30 px-4 py-2 border-t border-white/5`.

### 5.5 Navbar (Píldora Flotante)

**Clase:** `.nav-pill`

```css
.nav-pill {
  background: var(--theme-nav-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--theme-nav-border);
  box-shadow: var(--theme-nav-shadow);
}
```

**Estructura HTML:**
```html
<nav class="fixed top-8 left-1/2 -translate-x-1/2 z-50 nav-pill rounded-full px-4 py-2.5 flex items-center justify-between w-[90%] max-w-[800px]">
  <!-- Logo (dual dark/light) -->
  <a href="/">
    <img src="...White.svg" class="h-5 hidden dark:block" />
    <img src="...Primary.svg" class="h-5 block dark:hidden" />
  </a>
  <!-- Links desktop (hidden md:flex) -->
  <!-- Right actions (theme toggle + CTA) -->
</nav>
```

### 5.6 Infinite Tech Marquee (Carrusel de Stack)

- **Estructura:** Contenedor ancho con filas que se desplazan infinitamente (`animate-marquee`).
- **Máscara de Difuminado:** `mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent)`.
- **Interacción:** Hover pausa el contenedor (`group-hover:[animation-play-state:paused]`).

### 5.7 Mobile Menu Overlay (Menú Desplegable)

- **Botón hamburguesa:** Visible solo en `md:hidden`, con icono dinámico (menú ↔ X).
- **Overlay:** `fixed inset-x-0 top-0 z-40` con `backdrop-blur-2xl` y `transition-all duration-300 ease-in-out`.
- **Animación de entrada:** `translate-y-0 opacity-100 pointer-events-auto`.
- **Animación de salida:** `-translate-y-full opacity-0 pointer-events-none`.
- **Cierre automático:** Click fuera, click en enlace, o tecla `Escape`.

---

## 6. Espaciado, Layout y Ritmo Visual

### 6.1 Reglas de Espaciado

| Elemento | Valor | Notas |
|----------|-------|-------|
| Padding vertical de sección | `py-24` (96px) | RIGUROSO en todo el sitio |
| Padding lateral móvil | `px-6` (24px) | Mínimo para evitar bordes pegados |
| Padding lateral desktop | `px-6` (24px) | Contenido centrado con `max-w-[1200px]` |
| Separación título/grid | `mb-16` (64px) | Constante |
| Margen inferior de eyebrow | `mb-8` (32px) | Antes del título |
| Gap entre cards | `gap-8` (32px) o `gap-12` (48px) | Bento grids |
| Separación entre secciones | `border-t border-white/5` | Línea divisoria sutil obligatoria |

### 6.2 Contenedor Principal

```html
<div class="container mx-auto px-6 max-w-[1200px]">
  <!-- contenido -->
</div>
```

**Regla:** Todo el contenido principal debe estar dentro de este contenedor. Nunca debe exceder `max-w-[1200px]`.

### 6.3 Líneas Divisorias Entre Secciones

**Regla obligatoria:** TODA sección del sitio debe iniciar con una línea divisoria superior sutil.

```html
<section class="py-24 border-t border-white/5">
  <div class="container mx-auto px-6 max-w-[1200px]">
    <!-- contenido -->
  </div>
</section>
```

---

## 7. Iconografía y Recursos Gráficos

### 7.1 Identidad de Logos

| Versión | Archivo | Modo | Clase Tailwind |
|---------|---------|------|----------------|
| Logo Monochrome White | `public/logos/Micrudev_Logo_Monochrome_White.svg` | Oscuro | `hidden dark:block` |
| Logo Primary | `public/logos/Micrudev_Logo_Primary.svg` | Claro | `block dark:hidden` |
| Icon Monochrome White | `public/logos/Micrudev_Icon_Monochrome_White.svg` | Oscuro | `hidden dark:block` |
| Icon Primary | `public/logos/Micrudev_Icon_Primary.svg` | Claro | `block dark:hidden` |
| Icon Monochrome Navy | `public/logos/Micrudev_Icon_Monochrome_Navy.svg` | Favicon | Media query interna |

**Implementación dual (obligatoria):**
```html
<img src="logo-white.svg" alt="..." class="h-5 hidden dark:block" />
<img src="logo-primary.svg" alt="..." class="h-5 block dark:hidden" />
```

### 7.2 Favicon Dinámico

**Archivo:** `public/favicon.svg` (basado en `Micrudev_Icon_Monochrome_Navy.svg`)

**Implementación interna con CSS:**
```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 337 162">
  <style>
    path { fill: #06132F; }
    @media (prefers-color-scheme: dark) {
      path { fill: #ffffff; }
    }
  </style>
  <path d="..." fill-rule="evenodd"/>
</svg>
```

**Comportamiento:**
- Modo claro del sistema: relleno `#06132F` (navy oscuro).
- Modo oscuro del sistema: relleno `#ffffff` (blanco).

### 7.3 Iconografía UI

**Librería:** Lucide-style SVG inline.
- **Stroke width:** 2px (líneas técnicas limpias).
- **Colores:** `currentColor` para heredar el color del texto.
- **Tamaños estándar:** `14px` (inline), `16px` (botones), `18px` (CTAs), `20px` (mobile menu).

---

## 8. Estados, Interacciones y Microanimaciones

### 8.1 Sistema de Animación

| Tipo | Duración | Curva | Uso |
|------|----------|-------|-----|
| Hover general | 200ms | `ease` | Transiciones de color, opacidad |
| Transición componentes | 300ms | `ease-in-out` | Aparición de menús, modales |
| Keycap press | 100ms | `cubic-bezier(0.4, 0, 0.2, 1)` | Active state de botones |
| Aurora drift | 20-35s | `ease-in-out infinite alternate` | Luces de fondo |
| Shimmer (Hero) | 2.5s | `infinite` | Brillo en eyebrow del Hero |

### 8.2 Estados de Botones

| Estado | Modificación |
|--------|--------------|
| **Default** | Sombra completa, sin transformación |
| **Hover** | (Opcional) brillo intensificado |
| **Active** | `transform: translateY(2px)` + sombra comprimida |
| **Focus** | (Opcional) ring azul con `focus-visible:ring-2 focus-visible:ring-[var(--color-amber)]` |

### 8.3 Animaciones de la Aurora

Cada blade tiene su propio `@keyframes drift-N` con:
- `0%`: posición inicial, opacidad baja-media.
- `100%`: posición final con traslación, opacidad diferente.

**Importante:** Todas respetan `prefers-reduced-motion: reduce` desactivándose automáticamente.

### 8.4 Transición de Tema (Dark/Light)

**Sin animaciones bruscas.** El cambio de tema es instantáneo al toggle, aprovechando las variables CSS. Esto es intencional para evitar flashes distractores.

---

## 9. Configuración Técnica (Tailwind v4)

### 9.1 Inversión Mapeada

```css
@theme {
  --color-canvas: var(--theme-canvas);
  --color-white: var(--theme-white);
  /* ... */
}
@layer base {
  :root { --theme-canvas: #F6F8FC; /* ... */ }
  :root.dark { --theme-canvas: #040B1F; /* ... */ }
}
```

**Resultado:** Las clases como `bg-[var(--color-canvas)]` se adaptan automáticamente al tema sin necesidad de `dark:bg-X`.

### 9.2 Fijación del Modo Dark

```css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));
```

**Propósito:** Que el modificador `dark:` de Tailwind obedezca a la clase `.dark` del HTML (controlada por JS) y no a la preferencia del sistema operativo.

### 9.3 JavaScript del Theme Toggle

```javascript
// Inicialización síncrona en <head> (previene FOUC)
const theme = (() => {
  if (localStorage.getItem('theme')) return localStorage.getItem('theme');
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  return 'light';
})();
document.documentElement.classList.toggle('dark', theme === 'dark');

// Toggle
document.querySelectorAll('.theme-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme',
      document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    );
  });
});
```

### 9.4 Contacto Universal (WhatsApp)

**Regla:** Todos los botones de contacto (`href`) apuntan a:
```html
<a href="https://wa.me/593998081684" target="_blank" rel="noopener noreferrer">...</a>
```

---

## 10. Reglas de Implementación por Pantalla

### 10.1 Página de Inicio (`/`)

**Secciones obligatorias en orden:**
1. Hero (eyebrow + título gigante + subtítulo + keycap buttons + install caption + command-bar mockup + ghost pill).
2. Servicios (eyebrow + título + grid de 3-4 cards).
3. Stack / Tech (eyebrow + título + marquee infinito + marquee inverso).
4. Proyectos Preview (eyebrow + título + grid 3 columnas + CTA "Ver más").
5. Pricing (eyebrow + título + grid 3 columnas).
6. Custom Quote / CTA Final (eyebrow + título + keycap button).
7. Footer.

### 10.2 Página de Proyectos (`/proyectos`)

- Hero con título "Proyectos" + grid completo de proyectos.
- Cada proyecto: card con imagen, tags, fecha, título, descripción.
- Diseño consistente con el resto del sitio.

### 10.3 Componentes Reutilizables

- `<Navbar />` — Siempre presente en `Layout.astro`.
- `<Footer />` — Siempre presente al final.
- `<Hero />` — Solo en home.
- `<Services />`, `<TechStack />`, `<ProjectsPreview />`, `<Pricing />`, `<CustomQuote />` — Solo en home.

---

## 11. Accesibilidad y Performance

### 11.1 Accesibilidad

| Regla | Implementación |
|-------|----------------|
| Contraste WCAG | Texto blanco sobre fondo `#040B1F` excede WCAG AAA (21:1). |
| Navegación por teclado | Todos los botones y links son `tab`-navegables. |
| `prefers-reduced-motion` | Aurora y shimmer se desactivan automáticamente. |
| `aria-label` | Botones de íconos (tema, menú) tienen `aria-label` descriptivo. |
| Foco visible | (Opcional) `focus-visible:ring-2 focus-visible:ring-[var(--color-amber)]`. |

### 11.2 Performance

| Técnica | Propósito |
|---------|-----------|
| `will-change: transform, opacity` | GPU acceleration para animaciones. |
| `contain: layout style paint` | Aísla repintados de cada blade. |
| `pointer-events: none` en fondo | No interfiere con interactividad. |
| `isolation: isolate` | Crea contexto de apilamiento propio. |
| SVG inline (no external) | Sin requests adicionales para grid. |
| Dimensiones en `vw` | Escalado fluido sin media queries excesivas. |
| Media query `max-width: 768px` | Reduce blur a 70px en móvil. |

### 11.3 Compatibilidad de Navegadores

| Feature | Soporte |
|---------|---------|
| `backdrop-filter` | Chrome, Firefox, Safari, Edge (modernos). |
| `mask-image` | Chrome, Firefox, Safari (con `-webkit-`), Edge. |
| `radial-gradient` | Universal. |
| `@keyframes` | Universal. |
| CSS Variables | Universal. |
| `isolation: isolate` | Universal (modernos). |

---

## 12. Checklist de Construcción para la IA

Si estás generando una nueva página, componente o sección basada en esta guía, **DEBES** cumplir obligatoriamente lo siguiente:

### 12.1 Identidad y Marca

- [ ] ¿El fondo Deep Space se mantiene con sus 5 capas (base + 5 blades + grid + vignette + letterbox)?
- [ ] ¿Los logos implementan la lógica dual con `hidden dark:block` y `block dark:hidden`?
- [ ] ¿Los enlaces de contacto apuntan a `https://wa.me/593998081684` con `target="_blank" rel="noopener noreferrer"`?
- [ ] ¿El favicon dinámico está configurado en `public/favicon.svg`?

### 12.2 Tipografía y Jerarquía

- [ ] ¿Tiene el Eyebrow estándar con su punto pulsante azul y fuente monoespaciada mayúscula?
- [ ] ¿El título es `text-4xl md:text-5xl font-[600]` y está **totalmente libre de cursivas (`italic`)**?
- [ ] ¿El subtítulo usa `text-lg font-[400] text-[var(--color-muted)] max-w-[640px] leading-relaxed`?
- [ ] ¿No se usan más de 2 familias tipográficas (Inter + Geist Mono)?

### 12.3 Layout y Espaciado

- [ ] ¿El contenedor principal usa `container mx-auto px-6 max-w-[1200px]`?
- [ ] ¿La sección tiene `py-24` y la línea divisoria superior `border-t border-white/5`?
- [ ] ¿El espacio entre el texto introductorio y la primera fila de tarjetas es de al menos `mb-16`?
- [ ] ¿El gap entre cards es consistente (`gap-8` o `gap-12`)?

### 12.4 Color y Tokens

- [ ] ¿El componente respeta las variables del tema (`var(--color-white)`, `var(--color-canvas)`) y evita codificar colores crudos (`text-white`, `bg-black`)?
- [ ] ¿Los botones principales usan `.keycap-btn` o `.ghost-pill`?
- [ ] ¿El modo dark se controla solo con la clase `.dark` en `<html>` (no con `@media (prefers-color-scheme)`)?

### 12.5 Interactividad y Estados

- [ ] ¿Los botones keycap tienen el estado `:active` con `translateY(2px)` y sombra comprimida?
- [ ] ¿El theme toggle funciona en desktop y mobile?
- [ ] ¿El menú móvil se cierra al hacer clic fuera, en un enlace, o con Escape?
- [ ] ¿Los SVGs de iconos usan `currentColor` para heredar el color del texto?

### 12.6 Calidad del Código

- [ ] ¿El código no contiene clases sobrantes, genéricas o estilos bootstrap?
- [ ] ¿Se mantiene la elegancia, oscuridad y precisión técnica del sistema?
- [ ] ¿El responsive está validado (mobile, tablet, desktop)?

---

## Glosario de Términos

| Término | Definición |
|---------|------------|
| **Blade** | Cada una de las 5 luces difuminadas que forman la aurora del fondo. |
| **Aurora** | Sistema de luces radiales animadas que dan profundidad al fondo. |
| **Deep Space** | El sistema completo de fondo del sitio (todas las capas). |
| **Keycap** | Estilo de botón que simula una tecla física de teclado mecánico. |
| **Letterbox** | Línea de luz superior con resplandor que enmarca el viewport. |
| **Eyebrow** | Etiqueta pequeña sobre los títulos de sección, con punto pulsante. |
| **FOUC** | Flash of Unstyled Content; se previene con scripts `is:inline` en `<head>`. |
| **Polaridad** | Inversión de colores dark/light mediante variables CSS. |
| **Marquee** | Carrusel infinito horizontal de elementos (usado en Stack). |

---

> **Última actualización:** Sistema de fondo Deep Space v2.0 con Letterbox fixed.
> **Mantenedor:** Equipo Micrudev.
> **Contacto:** hola@micrudev.com / WhatsApp +593 99 808 1684.
