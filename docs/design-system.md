# Micrudev Design System

> **Versión 3.0 - Especificación canónica**
> **Dirección visual:** Developer-tool comercial, precisión suiza y atmósfera Deep Space.
> **Última revisión:** 23 de agosto de 2026.

Esta guía documenta el sistema que está implementado actualmente en el sitio. No describe una propuesta futura. Su objetivo es permitir que una persona o una IA extienda Micrudev sin convertirlo en una plantilla genérica ni romper su coherencia visual, comercial o técnica.

Cuando esta guía y el código no coincidan, las fuentes de verdad tienen este orden:

1. `src/styles/global.css` para tokens y utilidades globales.
2. `src/layouts/Layout.astro` para tema, fondo y capas globales.
3. Los componentes activos de `src/components/` para patrones concretos.
4. Este documento como explicación y contrato de mantenimiento.

## Contenido

1. [Identidad y tesis visual](#1-identidad-y-tesis-visual)
2. [Arquitectura técnica y fuentes de verdad](#2-arquitectura-técnica-y-fuentes-de-verdad)
3. [Sistema de color](#3-sistema-de-color)
4. [Tipografía y contenido](#4-tipografía-y-contenido)
5. [Layout, espaciado y geometría](#5-layout-espaciado-y-geometría)
6. [Sistema Deep Space](#6-sistema-deep-space)
7. [Primitivas visuales](#7-primitivas-visuales)
8. [Navegación y footer](#8-navegación-y-footer)
9. [Hero y selector de rutas](#9-hero-y-selector-de-rutas)
10. [Servicios](#10-servicios)
11. [Proyectos](#11-proyectos)
12. [Tech Stack y modal](#12-tech-stack-y-modal)
13. [Planes](#13-planes)
14. [Páginas de detalle](#14-páginas-de-detalle)
15. [Composición de páginas](#15-composición-de-páginas)
16. [Movimiento e interacción](#16-movimiento-e-interacción)
17. [Responsive](#17-responsive)
18. [Accesibilidad](#18-accesibilidad)
19. [Rendimiento](#19-rendimiento)
20. [Reglas para nuevas implementaciones](#20-reglas-para-nuevas-implementaciones)
21. [Checklist](#21-checklist)

---

## 1. Identidad y tesis visual

### 1.1 Qué comunica el sitio

Micrudev vende dos formas de construir soluciones digitales:

| Ruta | Promesa | Representación visual |
|---|---|---|
| Web con alcance definido | Precio, plazo y entregables claros | Tarjetas comerciales, niveles, tablas y especificaciones |
| Software a medida | Diagnóstico y solución alrededor de una operación | Consolas, rutas, casos de proyecto y metadatos técnicos |

El diseño debe comunicar capacidad técnica sin obligar al cliente a interpretar una interfaz para desarrolladores. La estética técnica organiza información comercial; nunca debe ocultarla.

### 1.2 Tesis visual

La identidad combina cinco ideas:

| Pilar | Aplicación |
|---|---|
| Deep Space | Canvas azul profundo o gris muy claro, auroras, micro-grid y halo superior |
| Herramienta técnica | Consolas, labels monoespaciados, índices, estados y divisores de un píxel |
| Precisión suiza | Alineaciones estrictas, grillas claras, espacios medidos y poca ornamentación |
| Tacto | Botones tipo keycap, superficies de cristal y respuestas físicas moderadas |
| Claridad comercial | Precios, modalidades, tiempos y acciones visibles sin lenguaje ambiguo |

### 1.3 Firma visual

La firma del sitio no es un gradiente aislado. Es la combinación de:

- Fondo Deep Space extendido a lo largo de toda la página.
- Micro-grid técnico de `60px`.
- Superficies translúcidas tipo command bar.
- Metadatos en Geist Mono, mayúsculas y tracking amplio.
- Azul brillante reservado para foco, ruta activa, estados y acciones.
- Botones principales con relieve de tecla física.

### 1.4 Principios

1. La estructura debe explicar el contenido.
2. El azul tiene función, no es relleno decorativo.
3. La densidad se controla con jerarquía, no escondiendo información esencial.
4. Los elementos interactivos deben parecer interactivos.
5. Las animaciones ambientales pueden ser lentas; las respuestas de UI deben ser rápidas.
6. El modo claro y el oscuro son dos polaridades del mismo sistema, no dos diseños distintos.
7. Una pantalla puede ser asimétrica, pero sus líneas, columnas y ritmos deben sentirse calculados.

### 1.5 Lo que no pertenece al sistema

- Gradientes multicolor ajenos a la paleta azul.
- Glassmorphism intenso en todos los elementos.
- Cápsulas para cada texto o categoría.
- Cards grandes e idénticas cuando una lista o consola comunica mejor la jerarquía.
- Sombras negras pesadas sobre superficies comerciales. El marquee y los backdrops pueden usar negro neutro para dar profundidad.
- Titulares con serif, cursiva o pesos superiores a 600.
- Números `01 / 02 / 03` usados solo como decoración. Deben representar nivel, secuencia, índice o conteo real.
- Animaciones de entrada dispersas en cada sección.
- Fondos Deep Space fijados al viewport.

---

## 2. Arquitectura técnica y fuentes de verdad

### 2.1 Stack de interfaz

| Tecnología | Versión o regla |
|---|---|
| Astro | `^7.0.9` |
| Tailwind CSS | `^4.3.2` |
| Integración Tailwind | `@tailwindcss/vite` |
| Node.js | `>=22.12.0` |
| JavaScript cliente | Vanilla TypeScript dentro de componentes Astro |
| Contenido | Astro Content Collections con validación Zod |

No hay framework cliente hidratado. La interacción del menú, tema, FAQ heredado y modal de tecnologías se resuelve con scripts pequeños del navegador.

### 2.2 Archivos canónicos

| Responsabilidad | Archivo |
|---|---|
| Tokens, utilidades y auroras | `src/styles/global.css` |
| Documento HTML, tema y Deep Space | `src/layouts/Layout.astro` |
| Navegación compartida | `src/lib/navigation.ts` |
| Navbar desktop y móvil | `src/components/Navbar.astro` |
| Footer | `src/components/Footer.astro` |
| Hero | `src/components/Hero.astro` |
| Servicios | `src/components/Services.astro` |
| Proyectos | `ProjectCard.astro`, `ProjectsPreview.astro`, `ProjectDetail.astro` |
| Tecnologías | `src/components/TechStack.astro` |
| Planes | `Pricing.astro`, `PlanCards.astro`, `PlanComparison.astro`, `PlanDetail.astro` |
| CTA de diagnóstico | `src/components/CustomQuote.astro` |
| Contenido de proyectos y planes | `src/content/projects/`, `src/content/plans/` |
| Esquemas de contenido | `src/content.config.ts` |
| Consultas y formato de planes | `src/lib/plans.ts` |
| Consultas de proyectos | `src/lib/projects.ts` |
| Enlaces de contacto | `src/lib/contact.ts` |

### 2.3 Componentes heredados no canónicos

Los siguientes archivos no se importan desde páginas activas y conservan nombres de tokens anteriores como `--color-blue`, `glass-panel` o `font-heading`:

| Archivo | Estado |
|---|---|
| `src/components/Button.astro` | Heredado. No usar como base para botones nuevos. |
| `src/components/CTA.astro` | Heredado. `CustomQuote.astro` es el CTA activo. |
| `src/components/FAQ.astro` | Heredado y fuera de la composición actual. |
| `src/components/Stats.astro` | Heredado y fuera de la composición actual. |

Si alguno vuelve a utilizarse, debe migrarse primero a los tokens y patrones descritos aquí.

### 2.4 Datos antes que markup duplicado

- Los planes se guardan como JSON y se validan con la colección `plans`.
- Los proyectos se guardan como Markdown y se validan con la colección `projects`.
- `getPlans()` y `getProjects()` ordenan por `data.order`.
- `getFeaturedProjects()` alimenta el home y usa un límite predeterminado de tres.
- `PlanCards.astro` se reutiliza en home y `/planes`.
- Navbar y footer comparten `navigationItems`.
- Los enlaces de WhatsApp se construyen mediante `getWhatsAppUrl()` o `getPlanInquiryUrl()`.

No copiar listas de planes, proyectos o navegación dentro de una página nueva.

---

## 3. Sistema de color

### 3.1 Mapeo semántico de Tailwind v4

El sistema redefine nombres de color de Tailwind para que clases como `text-white` respondan al tema:

```css
@theme {
  --font-body: 'Inter', system-ui, sans-serif;
  --font-mono: 'Geist Mono', monospace;

  --color-canvas: var(--theme-canvas);
  --color-white: var(--theme-white);
  --color-black: var(--theme-black);
  --color-muted: var(--theme-muted);

  --color-crimson: var(--theme-crimson);
  --color-coral: var(--theme-coral);
  --color-amber: var(--theme-amber);

  --color-keycap-bg: var(--theme-keycap-bg);
  --color-keycap-text: var(--theme-keycap-text);
}
```

`text-white` significa "texto principal". En modo claro produce navy, no blanco literal. Lo mismo aplica a `bg-white/5`, `border-white/10` y variantes con opacidad.

### 3.2 Tokens base

| Token semántico | Claro | Oscuro | Función |
|---|---|---|---|
| `--color-canvas` | `#F6F8FC` | `#040B1F` | Canvas global y fondo interno de celdas |
| `--color-white` | `#06132F` | `#FFFFFF` | Texto principal, títulos e iconos |
| `--color-black` | `#FFFFFF` | `#000000` | Polaridad inversa y fondos de código |
| `--color-muted` | `#637089` | `#8B9BB4` | Texto secundario y metadata |
| `--color-crimson` | `#003DCC` | `#003DCC` | Extremo profundo del gradiente |
| `--color-coral` | `#0253FD` | `#0253FD` | Azul de acción y selección |
| `--color-amber` | `#4C84FF` | `#4C84FF` | Azul claro, foco y acento luminoso |

Los nombres `crimson`, `coral` y `amber` son nombres históricos de la API. Actualmente los tres representan intensidades de azul. No deben reinterpretarse como rojo, coral o amarillo.

### 3.3 Tokens de aurora

| Token | Valor | Papel |
|---|---|---|
| `--theme-aurora-1` | `#0253FD` | Luz principal y letterbox |
| `--theme-aurora-2` | `#4C84FF` | Luz lateral clara |
| `--theme-aurora-3` | `#001A66` | Profundidad navy |
| `--theme-aurora-4` | `#003DCC` | Luz central profunda |
| `--theme-aurora-5` | `#6B9DFF` | Luz superior secundaria |
| `--theme-aurora-glow` | `rgba(2,83,253,0.18)` claro / `0.22` oscuro | Glow semántico disponible |

### 3.4 Tokens de superficie

| Token | Claro | Oscuro |
|---|---|---|
| `--theme-nav-bg` | `rgba(255,255,255,0.8)` | `rgba(4,11,31,0.7)` |
| `--theme-nav-border` | `rgba(6,19,47,0.1)` | `rgba(255,255,255,0.1)` |
| `--theme-nav-shadow` | Highlight blanco + sombra navy sutil | Highlight blanco tenue + sombra negra |
| `--theme-cmd-bg` | `rgba(255,255,255,0.85)` | `rgba(7,12,28,0.7)` |
| `--theme-cmd-border` | `rgba(6,19,47,0.08)` | `rgba(255,255,255,0.08)` |
| `--theme-cmd-shadow` | Glow azul `0.05` + highlight interior | Glow azul `0.08` + highlight interior |

### 3.5 Tokens del botón keycap

| Token | Claro | Oscuro |
|---|---|---|
| `--theme-keycap-bg` | `#FFFFFF` | `#E7EFFF` |
| `--theme-keycap-text` | `#06132F` | `#0F1B37` |
| `--theme-keycap-shadow` | Borde navy, sombra corta, relieve inferior | Anillo negro, glow blanco, highlights internos |
| `--theme-keycap-shadow-active` | Versión comprimida | Versión comprimida |

### 3.6 Convenciones de opacidad

| Patrón | Uso típico |
|---|---|
| `border-white/5` | División entre secciones |
| `border-white/8` | División interna de cards y consolas |
| `border-white/10` | Contorno visible de controles o celdas |
| `bg-white/[0.018]` a `bg-white/[0.025]` | Superficie apenas elevada |
| `bg-[var(--color-coral)]/10` | Badge o selección activa |
| `color-mix(... var(--color-coral) 5-8% ...)` | Hover o superficie enfatizada |

Los valores RGBA directos se reservan para luces, sombras, velos fotográficos y el fondo Deep Space. Texto, bordes y superficies funcionales deben usar tokens.

### 3.7 Gradiente de marca

```css
.text-warm-gradient {
  background-image: linear-gradient(
    to right,
    var(--color-amber),
    var(--color-coral),
    var(--color-crimson)
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
```

Usarlo para una frase corta dentro del titular. No aplicar el gradiente a párrafos completos, cards ni iconos funcionales.

---

## 4. Tipografía y contenido

### 4.1 Familias

| Rol | Familia | Pesos cargados |
|---|---|---|
| Cuerpo, títulos y controles | Inter | 400, 500, 600 |
| Metadatos, estados e índices | Geist Mono | 400, 500 |

```html
<link
  href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&family=Inter:wght@400;500;600&display=swap"
  rel="stylesheet"
>
```

No agregar una tercera familia sin redefinir la dirección de marca.

### 4.2 Escala real

| Nivel | Implementación habitual | Uso |
|---|---|---|
| Hero H1 | `46px`, `56px`, `68px`; `1.02`; tracking `-0.045em` | Home |
| H1 de índice | `40px` a `64px` o `48px` a `60px` | `/proyectos`, `/planes` |
| H1 de detalle | `38px` a `50-52px`; tracking `-0.04em` | Plan o proyecto individual |
| H2 de sección | `36px` móvil, `48px` desktop; peso 600 | Secciones del home |
| H2 interno | `27px` a `35px` mediante `clamp()` | Detalles extensos |
| H3 principal | `20px` a `24px`; peso 600 | Cards y módulos |
| Body destacado | `17px` a `18px` | Introducciones |
| Body | `14px` a `16px`; line-height `1.6-1.8` | Descripciones |
| Metadata mono | `8px` a `11px`; uppercase | Estados, niveles, conteos |

### 4.3 Reglas tipográficas

- Peso máximo habitual: 600.
- Subtítulos y descripciones usan peso 400. No ponerlos en negrita.
- `font-medium` se reserva para valores, enlaces y labels con función.
- No usar cursiva.
- Los títulos usan `tracking-tight` o tracking negativo explícito.
- El cuerpo usa `leading-relaxed`; el contenido editorial puede llegar a `line-height: 1.8`.
- Geist Mono siempre usa mayúsculas cuando actúa como metadata.
- El tracking de metadata se mueve entre `0.05em` (`tracking-wider`) y `0.18em`.
- Las frases de marca pueden terminar en punto; los labels técnicos normalmente no.

### 4.4 Eyebrow estándar

El eyebrow normal no es una cápsula. Es una fila mínima con punto vivo y texto mono:

```astro
<div class="mb-6 inline-flex items-center gap-2">
  <span class="h-2 w-2 rounded-full bg-[var(--color-amber)] animate-pulse"></span>
  <span class="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-muted)]">
    Nombre de sección
  </span>
</div>
```

El hero sí usa una variante encapsulada con borde, fondo translúcido y shimmer. No trasladar esa cápsula a todas las secciones.

### 4.5 Voz y microcopy

| Contexto | Regla |
|---|---|
| Titulares | Beneficio específico, una idea por título |
| CTAs | Verbo + resultado: `Ver planes web`, `Cotizar proyecto`, `Comparar todos los planes` |
| Metadata | Descriptiva, breve y verificable |
| Planes | Precio, alcance, tiempos y condiciones sin eufemismos |
| Proyectos | Problema, operación y solución antes que adjetivos promocionales |
| Tecnología | Nombrar herramientas reales, no conceptos vagos |

---

## 5. Layout, espaciado y geometría

### 5.1 Breakpoints

Se usan los breakpoints estándar de Tailwind:

| Nombre | Inicio | Papel principal |
|---|---:|---|
| `sm` | 640px | CTAs en fila, grids de dos, detalles secundarios |
| `md` | 768px | Secciones de dos columnas, paddings mayores, tablas |
| `lg` | 1024px | Navbar desktop, hero dividido, grids de tres |
| `xl` | 1280px | Labels complementarios y gaps más amplios |

El navbar desktop empieza en `lg`, no en `md`, para evitar colisiones en tablets.

### 5.2 Anchos de contenedor

| Ancho | Uso |
|---|---|
| `max-w-[1200px]` | Índices, grids de cards, footer y comparativas |
| `max-w-[1180px]` | Hero |
| `max-w-[1100px]` | Servicios y páginas de detalle |
| `max-w-[1000px]` | CTA de diagnóstico |
| `max-w-[720-780px]` | Encabezados y prosa principal |

Patrón general:

```astro
<div class="container mx-auto max-w-[1200px] px-6">
  <!-- contenido -->
</div>
```

El padding lateral base es `24px` (`px-6`) incluso en móvil.

### 5.3 Ritmo vertical

| Contexto | Valor habitual |
|---|---|
| Sección estándar | `py-24` |
| Sección compacta en móvil | `py-16 md:py-24` |
| CTA final | `py-20 md:py-24` |
| Footer | `py-12 md:py-14` |
| Páginas índice bajo navbar | `pt-40 pb-24` |
| Detalles bajo navbar | `pt-32 md:pt-36` |
| Separación intro/contenido | `mb-12` a `mb-14` |
| Gap de cards | `gap-6` |

El sistema no exige `py-24` de forma ciega. Las secciones densas pueden reducir el espacio móvil si mantienen respiración y claridad.

### 5.4 Radios

| Radio | Uso |
|---|---|
| `8px` | Keycaps y controles compactos |
| `12px` | Filas, details, chips grandes |
| `14px` | `.command-bar-mockup` |
| `16-18px` | CTAs destacados y modal |
| `9999px` | Pills, estados, botones circulares |

No convertir todas las superficies en pills. Las pills indican control, estado o categoría breve.

### 5.5 Divisores y grillas internas

- Toda sección principal comienza normalmente con `border-t border-white/5`.
- Dentro de una consola se usa `border-white/8`.
- Las cuadrículas de celdas usan `gap-px` y un fondo de borde compartido.
- Evitar sombras entre filas internas; usar líneas.
- Preferir `minmax(0, 1fr)` en columnas con texto para evitar overflow.

---

## 6. Sistema Deep Space

### 6.1 Invariante principal

La clase del contenedor debe mantenerse exactamente así:

```html
class="deep-space-bg absolute inset-0 overflow-hidden pointer-events-none z-0"
```

No sustituir `absolute` por `fixed`. El fondo debe cubrir la altura completa del documento y sus fuentes de luz deben distribuirse según la altura de cada página. Solo la línea superior es `fixed`.

### 6.2 Estructura exacta

Esta es la estructura activa de `Layout.astro`:

```astro
<!-- Deep Space Background System -->
<div
  class="deep-space-bg absolute inset-0 overflow-hidden pointer-events-none z-0"
  style="isolation: isolate;"
>
  <!-- Layer 1: Base Canvas with radial depth gradients -->
  <div class="deep-space-base absolute inset-0"></div>

  <!-- Layer 2: Aurora Blades (5 layered light sources) -->
  <div class="absolute inset-0">
    <div class="aurora-blade blade-1"></div>
    <div class="aurora-blade blade-2"></div>
    <div class="aurora-blade blade-3"></div>
    <div class="aurora-blade blade-4"></div>
    <div class="aurora-blade blade-5"></div>
  </div>

  <!-- Layer 3: Subtle Grid Overlay -->
  <svg
    class="deep-space-grid absolute inset-0 w-full h-full"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    <defs>
      <pattern id="microGrid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
        <path
          d="M 60 0 L 0 0 0 60"
          fill="none"
          stroke="#003DCC"
          stroke-width="0.6"
          class="grid-stroke"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#microGrid)" />
  </svg>

  <!-- Layer 4: Vignette Overlay -->
  <div class="deep-space-vignette absolute inset-0"></div>
</div>

<!-- Layer 5: Top Edge Highlight -->
<div class="deep-space-letterbox fixed top-0 left-0 right-0 z-[60] pointer-events-none"></div>
```

No retirar ninguna de las cinco blades, el SVG, la vignette ni `isolation: isolate`.

### 6.3 Canvas base

```css
.deep-space-base {
  background:
    radial-gradient(ellipse 80% 60% at 50% 0%, rgba(2, 83, 253, 0.4), transparent 60%),
    radial-gradient(ellipse 60% 50% at 100% 100%, rgba(76, 132, 255, 0.3), transparent 60%),
    radial-gradient(ellipse 50% 50% at 0% 80%, rgba(0, 26, 102, 0.5), transparent 60%),
    var(--color-canvas);
}
```

| Fuente | Posición | Función |
|---|---|---|
| Azul principal | `50% 0%` | Halo superior central |
| Azul claro | `100% 100%` | Profundidad inferior derecha |
| Navy | `0% 80%` | Contrapeso inferior izquierdo |

### 6.4 Aurora blades

Base compartida:

```css
.aurora-blade {
  position: absolute;
  filter: blur(100px);
  border-radius: 50%;
  will-change: transform, opacity;
  contain: layout style paint;
  pointer-events: none;
}
```

| Blade | Tamaño desktop | Posición | Duración | Token |
|---|---|---|---:|---|
| 1 | `55vw` | `top: -15%; left: -10%` | 24s | `aurora-1` |
| 2 | `50vw` | `top: 25%; right: -15%` | 30s | `aurora-2` |
| 3 | `60vw` | `bottom: -20%; left: 15%` | 20s | `aurora-3` |
| 4 | `35vw` | `top: 50%; left: 40%` | 35s | `aurora-4` |
| 5 | `40vw` | `top: 5%; right: 20%` | 28s | `aurora-5` |

Todas usan gradiente radial hacia transparente y `infinite alternate ease-in-out`. Los keyframes varían traslación, rotación, escala y opacidad. No sincronizar sus tiempos: la irregularidad evita un movimiento mecánico.

En `max-width: 768px`, el blur baja a `70px` y los tamaños pasan a `80vw`, `70vw`, `85vw`, `50vw` y `55vw` respectivamente.

### 6.5 Micro-grid

```css
.deep-space-grid {
  opacity: 0.2;
  mask-image: radial-gradient(ellipse 80% 80% at 50% 30%, #000 0%, transparent 75%);
  -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 30%, #000 0%, transparent 75%);
}

html:not(.dark) .deep-space-grid {
  opacity: 0.2;
}

html:not(.dark) .grid-stroke { stroke: #003DCC; }
html.dark .grid-stroke { stroke: #4C84FF; }
```

La opacidad vigente es `0.2` en ambos temas. La celda mide `60px`, el stroke `0.6px` y la máscara concentra la cuadrícula alrededor del centro superior.

### 6.6 Vignette y letterbox

```css
.deep-space-vignette {
  background: radial-gradient(circle at center, transparent 0%, var(--color-canvas) 100%);
  opacity: 0.7;
}

.deep-space-letterbox {
  height: 3px;
  background: linear-gradient(
    to right,
    transparent 0%,
    var(--theme-aurora-1) 50%,
    transparent 100%
  );
  opacity: 1;
  box-shadow:
    0 0 20px var(--theme-aurora-1),
    0 0 40px var(--theme-aurora-1),
    0 0 80px var(--theme-aurora-1);
}
```

La letterbox es hermana del fondo para no quedar recortada por `overflow-hidden`.

### 6.7 Orden de capas

| Elemento | Capa |
|---|---:|
| Deep Space base, blades, grid, vignette | `z-0` aislado |
| Contenido principal | `z-10` |
| Backdrop del menú móvil | `z-30` |
| Panel del menú móvil | `z-40` |
| Navbar | `z-50` |
| Letterbox superior | `z-[60]`, sin pointer events |
| Skip link | `z-[100]` |
| `<dialog>` | Top layer nativo del navegador |

---

## 7. Primitivas visuales

### 7.1 Command-bar surface

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

Esta es la superficie principal para cards, comparativas, hero selector, CTA y encabezados de detalle. Su anatomía habitual incluye:

- Header con `border-b border-white/8`.
- Body dividido por líneas, no por cards anidadas innecesarias.
- Footer técnico con `bg-white/[0.02]`.
- Glow azul localizado, nunca sobre toda la superficie.

### 7.2 Keycap button

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
  transition:
    transform 0.1s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.1s cubic-bezier(0.4, 0, 0.2, 1);
}

.keycap-btn:active {
  transform: translateY(2px);
  box-shadow: var(--theme-keycap-shadow-active);
}
```

Uso: acción primaria de una vista o de una card comercial. En móvil puede ocupar todo el ancho con `w-full justify-center`.

### 7.3 Ghost pill

```css
.ghost-pill {
  background: transparent;
  border: 1px solid color-mix(in srgb, var(--color-white) 15%, transparent);
  color: var(--color-muted);
  border-radius: 9999px;
  padding: 8px 16px;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
}
```

Uso: acción secundaria, correo, exploración o navegación complementaria. No debe competir visualmente con un keycap.

### 7.4 Nav pill

```css
.nav-pill {
  background: var(--theme-nav-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--theme-nav-border);
  box-shadow: var(--theme-nav-shadow);
}
```

Se usa en el navbar principal y en el panel móvil para mantener continuidad material.

### 7.5 Chips y metadata

Los chips usan:

- Borde `white/8` a `white/10`.
- Fondo `white/[0.025]` o canvas translúcido.
- Radio de `0.35rem` a `0.5rem`.
- Geist Mono de `8px` a `10px`.
- Uppercase y tracking entre `0.05em` y `0.15em`.

No usar un chip cuando el texto necesita más de una línea.

### 7.6 Filas interactivas

Para opciones de consola, servicios relacionados o tarjetas compactas:

- Toda la fila es el enlace.
- El icono vive en una celda cuadrada con borde.
- El texto usa `min-w-0`.
- La flecha está dentro de un círculo de `28-32px`.
- Hover: fondo azul al `5-8%`, borde azul y traslado de flecha de `2-4px`.
- Focus: outline interior con offset negativo cuando la fila ocupa todo el ancho.

### 7.7 Foco visible

Patrón general:

```html
class="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-amber)]"
```

Keycap y ghost pill reciben el foco globalmente con `outline-offset: 3px`. Otros controles pueden usar un cambio explícito de fondo y texto, como `plan-nav-link`, pero todo foco debe ser perceptible.

---

## 8. Navegación y footer

### 8.1 Fuente compartida

Navbar y footer leen la misma lista:

```ts
export const navigationItems = [
  { label: 'Servicios', href: '/#servicios' },
  { label: 'Proyectos', href: '/proyectos', activePath: '/proyectos' },
  { label: 'Planes', href: '/planes', activePath: '/planes' },
  { label: 'Tecnología', href: '/#stack' },
];
```

Agregar, renombrar o quitar una ruta se hace en `src/lib/navigation.ts`.

### 8.2 Navbar desktop

| Propiedad | Valor actual |
|---|---|
| Posición móvil/tablet | `top-3` |
| Posición desktop | `lg:top-5` |
| Ancho | `calc(100% - 1.5rem)` |
| Máximo | `1160px` |
| Breakpoint desktop | `lg` / 1024px |
| Altura total aproximada | `62px` |

El navbar es un dock rectangular de radio `16px`, no una cápsula. La ruta activa usa una superficie tenue y `aria-current`; en el home, `IntersectionObserver` sincroniza Servicios y Tecnología con la sección visible. Al desplazarse, el borde y la sombra ganan definición.

### 8.3 Menú móvil

- Navbar principal en `z-50`.
- Backdrop con canvas al `45%`, blur de `2px` y `z-30`.
- Panel rectangular en `z-40`, debajo del dock principal.
- El selector de tema vive directamente en el dock, junto al botón del menú.
- Ancho `calc(100% - 1.5rem)`, máximo `640px`.
- Entrada con `translateY(-12px)` a `0` y opacidad.
- El panel cerrado usa `inert`, `aria-hidden="true"` y `pointer-events-none`.
- El panel no repite controles de apariencia; termina con el CTA `Cotizar proyecto`.
- El body recibe `mobile-menu-open` para bloquear scroll.
- Cierra por botón, enlace, backdrop, click externo o `Escape`.
- Al cerrar con backdrop o Escape, el foco regresa al botón hamburguesa.
- Al cruzar a `min-width: 1024px`, el menú se cierra automáticamente.

### 8.4 Tema

`Layout.astro` carga `<html class="dark">` y ejecuta un script inline antes del render visible:

1. Lee `localStorage.theme` si existe.
2. Si no existe, consulta `prefers-color-scheme`.
3. Agrega o retira `.dark` en `<html>`.
4. El toggle guarda `dark` o `light` en `localStorage`.

Esto evita FOUC y hace que `dark:` dependa de clase mediante:

```css
@custom-variant dark (&:where(.dark, .dark *));
```

### 8.5 Footer

El footer vive en una superficie única con tres columnas y una barra inferior:

| Nivel | Contenido |
|---|---|
| Principal | Marca y disponibilidad, navegación, contacto directo |
| Inferior | Copyright y `Volver arriba` |

En móvil las tres columnas se apilan. Todos los targets mantienen altura táctil suficiente.

---

## 9. Hero

### 9.1 Estructura

El hero es una composición centrada y deliberadamente breve: eyebrow descriptivo, H1, una explicación, dos acciones y una sola línea comercial verificable. No incluye mockups, tarjetas de ruta, estados técnicos ni repite proyectos que ya aparecen en la sección siguiente.

La sección usa `min-h-[100svh]` y `items-center` para ocupar el viewport y centrar el contenido. En móvil aplica `pt-20` para separarlo del dock y desplazar ligeramente su centro visual; desde `lg` vuelve a `pt-0`. El contenido mantiene `max-w-[1040px]` y `px-6`.

### 9.2 Eyebrow del hero

Usa texto mono de `9px` entre dos líneas amber de `32px`. Describe el servicio sin lenguaje técnico interno.

### 9.3 Acciones

La acción primaria lleva a `#servicios`; la secundaria a `#contacto`. Debajo se muestra únicamente información comercial útil: precio inicial de planes y disponibilidad de diagnóstico.

### 9.4 CTA de exploración

Los CTAs se apilan en móvil y vuelven a una fila desde `sm`.

---

## 10. Servicios

### 10.1 Narrativa

El título vigente es `Dos formas de llevar una idea a producción.`. La sección explica cuatro capacidades dentro de dos modalidades.

| Modalidad | Capacidades |
|---|---|
| Ruta directa | Desarrollo web con plan definido |
| Ruta personalizada | Aplicaciones web, automatizaciones e integraciones de IA |

### 10.2 Service console

La sección usa un solo panel compacto:

- En móvil se apila.
- Desde `lg` usa columnas `0.78fr / 1.22fr`.
- Desarrollo Web ocupa la columna destacada con glow localizado y keycap.
- Las tres capacidades a medida son filas completas e interactivas.
- En móvil las filas a medida muestran solo el título; desde `sm` recuperan la descripción.
- Los formatos web se ocultan por debajo de `sm` para reducir altura.
- El CTA web ocupa el ancho completo en móvil y vuelve a `w-fit` desde `sm`.

La sección usa `py-12 md:py-16`, no cuatro cards de gran altura.

---

## 11. Proyectos

### 11.1 ProjectCard

`ProjectCard.astro` tiene una única prop de variante:

```ts
interface Props {
  project: Project;
  compact?: boolean;
}
```

| Variante | Contexto | Extracto |
|---|---|---|
| `compact` | Home | No se renderiza |
| Completa | `/proyectos` | Se muestra con `line-clamp-3` |

El subtítulo siempre usa peso regular.

### 11.2 Anatomía de card

1. Imagen de `208px` móvil y `224px` desde `md`.
2. Badge de tipo y año sobre la imagen.
3. Cliente en mono azul.
4. Título, subtítulo regular y extracto opcional.
5. Chips de tecnología.
6. Footer con `Ver proyecto` y flecha circular.

### 11.3 Movimiento de card

- Imagen inicia con saturación `0.65` y escala `1.01`.
- Hover recupera saturación, escala imagen a `1.055` y card a `translateY(-4px)`.
- El velo fotográfico mantiene legibilidad de badges.
- En reduced motion se eliminan las transformaciones.

### 11.4 Preview del home

- Obtiene hasta tres proyectos destacados.
- Presenta un caso dominante y dos casos secundarios apilados desde `sm`.
- En móvil muestra solo el caso dominante y el enlace a la colección para evitar una lista larga.
- Renderiza la composición editorial directamente; `ProjectCard` permanece para el índice.
- Alturas: `350-430px` para el caso principal y `225px` para secundarios.

### 11.5 Índice de proyectos

`/proyectos` usa H1 de `40px` a `64px`, introducción centrada y cards completas. El contenido proviene de Markdown validado, no de arrays locales.

---

## 12. Tech Stack y modal

### 12.1 Marquee

La vista ambiental mantiene dos filas en sentidos opuestos:

- 21 tecnologías en `stackData`.
- Primera fila: elementos `0-10`.
- Segunda fila: elementos `11-20`.
- Tres copias para continuidad visual.
- Duración `30s linear infinite`.
- Segunda fila usa dirección inversa.
- Hover pausa cada fila.
- Máscara horizontal desvanece los extremos.
- Celdas compactas de `84px`; iconos en grayscale y opacidad `0.55`, hover recupera color y escala.
- En móvil los nombres permanecen visibles; en desktop aparecen con hover.
- Las copias adicionales usan `aria-hidden="true"`.

### 12.2 Botón `Ver todas`

El footer técnico muestra el total de nodos y un botón con:

- `min-h-11`.
- Borde y fondo tenue.
- `aria-haspopup="dialog"`.
- `aria-controls="tech-stack-dialog"`.
- `aria-expanded` sincronizado.

### 12.3 Modal

El modal usa `<dialog>` nativo, no una capa improvisada:

| Propiedad | Valor |
|---|---|
| Ancho | `calc(100% - 2rem)` |
| Máximo | `960px` |
| Altura máxima | `calc(100dvh - 2rem)` |
| Radio | `18px` |
| Backdrop | Navy `0.7` + blur `8px` |
| Grid | 2 columnas, 3 desde `sm`, 5 desde `md` |
| Celdas | Mínimo `112px` |

El modal presenta las 21 tecnologías en una sola cuadrícula. No separarlas en grupos arbitrarios.

### 12.4 Deep link e historial

La URL canónica del modal es:

```text
/#tecnologias
```

Comportamiento requerido:

1. Acceder directamente a `/#tecnologias` abre el modal.
2. Abrirlo con el botón agrega `#tecnologias` mediante `history.pushState()`.
3. Cerrar limpia el hash.
4. Atrás cierra el modal.
5. Adelante vuelve a abrirlo.
6. Escape, botón y click exterior cierran el modal.
7. El body bloquea scroll con `tech-stack-modal-open`.
8. El foco entra al botón de cierre y vuelve al trigger.

### 12.5 Reduced motion

Con `prefers-reduced-motion: reduce`, ambos marquees quedan estáticos y la animación de entrada del dialog se elimina.

---

## 13. Planes

### 13.1 Arquitectura reutilizable

| Componente | Función | Dónde se usa |
|---|---|---|
| `PlanCards.astro` | Cards comerciales extensas | `/planes` |
| `Pricing.astro` | Tres resúmenes compactos | Home |
| `PlanComparison.astro` | Tabla y condiciones compartidas | `/planes` |
| `PlanDetail.astro` | Ficha comercial completa | `/planes/[plan]` |

El home no duplica las cards extensas ni la comparativa. En móvil, los resúmenes se recorren en un carrusel horizontal con snap; en desktop forman tres columnas.

### 13.2 PlanCard

Anatomía:

1. Nivel e indicador `Más elegido` opcional.
2. Nombre, modalidad y descripción.
3. Precio con USD en metadata mono.
4. Renovación y dominio.
5. Especificaciones de entrega y alcance.
6. Lista de highlights.
7. Keycap a detalle y consulta secundaria.

La card destacada usa borde azul al `45%`, glow azul y línea superior en gradiente. Todas las cards suben `4px` en hover salvo reduced motion.

### 13.3 Comparativa

- Vive dentro de `command-bar-mockup`.
- Tabla mínima de `780px`.
- En móvil se desplaza horizontalmente dentro de un `role="region"` enfocable.
- Muestra la indicación `Desliza para comparar` por debajo de `md`.
- Condiciones comunes usan grid de una, dos o tres columnas.

### 13.4 Página `/planes`

Orden:

1. Header centrado.
2. `PlanCards`.
3. `PlanComparison` con `mt-20`.
4. `CustomQuote`.
5. Footer.

### 13.5 Detalle de plan

El detalle es una ficha comercial compacta, no una landing duplicada:

- Header tipo command bar con título, código, nivel y modalidad.
- Columna de inversión y forma de pago.
- Barra de cinco especificaciones.
- Navegación horizontal por anclas.
- Secciones con bordes superiores, no cards gigantes.
- `<details>` para alcance completo y términos extensos.
- Cards comerciales solo donde comparar información económica lo exige.
- CTA final y dos planes relacionados.

Las clases locales `section-eyebrow`, `section-heading`, `body-copy`, `commercial-card`, `detail-note` y `plan-nav-link` pertenecen a esta ficha. No promoverlas a globales hasta que exista un segundo consumidor real.

---

## 14. Páginas de detalle

### 14.1 Patrón compartido

Planes y proyectos individuales comparten:

- `max-w-[1100px]`.
- `pt-32 md:pt-36`.
- Enlace de regreso en Geist Mono.
- Header `command-bar-mockup`.
- Metadata técnica separada por líneas.
- Contenido principal de ancho controlado.
- Dos elementos relacionados al final.

### 14.2 Detalle de proyecto

El encabezado divide contenido e imagen desde `lg`:

```text
minmax(0, 1fr) | 400px
```

Incluye tipo, título, subtítulo, extracto, CTA externo opcional, imagen, cliente, año y tecnologías.

### 14.3 Prosa editorial

`ProjectDetail.astro` estiliza el Markdown dentro de `.project-prose`:

| Elemento | Tratamiento |
|---|---|
| `h2` | `clamp(1.75rem, 4vw, 2.25rem)`, scroll margin de 7rem |
| Párrafo | `1.05rem`, line-height `1.8`, color muted |
| Lista simple | Punto coral de `0.4rem` |
| Lista ordenada | Contador `01`, `02`, Geist Mono |
| Blockquote | Borde coral de 2px y fondo coral al 7% |
| Imagen | Ancho completo, borde y radio `0.875rem` |
| Código | Geist Mono y bloque con overflow horizontal |
| Secuencia vertical | Nodos numerados, tarjetas compactas y conectores amber |
| Tabla | Display block y overflow horizontal |

Si el Markdown contiene H2, aparece una tabla de contenido sticky en desktop. No se muestra en móvil. El índice tiene scroll interno cuando supera la altura visible y revela automáticamente el enlace activo. Un scrollspy cliente calcula el H2 cuya posición ya alcanzó el marcador de lectura, aplica `project-toc-link--active`, eleva el peso a `600`, cambia el número a `--color-amber` y sincroniza `aria-current="location"`. El estado también se actualiza al hacer click en un enlace del índice.

---

## 15. Composición de páginas

### 15.1 Home `/`

Orden vigente:

1. `Hero`
2. `Services`
3. `ProjectsPreview`
4. `TechStack`
5. `Pricing`
6. `CustomQuote`
7. `Footer`

### 15.2 Proyectos

| Ruta | Composición |
|---|---|
| `/proyectos` | Header + grid completo + footer |
| `/proyectos/[project]` | `ProjectDetail` + footer |

### 15.3 Planes

| Ruta | Composición |
|---|---|
| `/planes` | Header + cards + comparativa + diagnóstico + footer |
| `/planes/[plan]` | `PlanDetail` + footer |

### 15.4 Layout global

Todas las rutas pasan por `Layout.astro`, que aporta:

- `lang="es"`.
- Meta viewport, favicon, generator y description.
- Fuentes.
- Inicialización de tema.
- Skip link.
- Deep Space.
- Letterbox.
- Navbar.
- Wrapper `#contenido-principal` con `tabindex="-1"`.

---

## 16. Movimiento e interacción

### 16.1 Escala temporal

| Tipo | Duración |
|---|---:|
| Presión keycap | 100ms |
| Estado activo de navegación | 180ms |
| Dialog | 180ms |
| Hover de filas y cards | 180-240ms |
| Menú móvil | 300ms |
| Imagen de proyecto | 500-700ms |
| Marquee | 30s |
| Aurora | 20-35s |

### 16.2 Curvas y desplazamientos

- UI general: `ease` o `ease-out`.
- Imágenes y dialog: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Keycap: `cubic-bezier(0.4, 0, 0.2, 1)`.
- Cards: máximo `translateY(-4px)`.
- Rutas internas: máximo `translateY(-2px)`.
- Flechas: `2-4px` según jerarquía.

La respuesta debe sentirse precisa, no elástica.

### 16.3 Regla de movimiento reducido

El fallback global fuerza:

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }

  *, *::before, *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  .aurora-blade {
    animation: none !important;
  }
}
```

Las cards principales neutralizan explícitamente sus transformaciones. El fallback global vuelve casi instantáneas las transiciones restantes, aunque un icono puede resolver inmediatamente en su estado transformado.

---

## 17. Responsive

### 17.1 Móvil, hasta 639px

- Padding lateral de `24px`.
- Navbar a `top-3`, ancho `calc(100% - 1.5rem)`.
- CTAs principales a ancho completo cuando la decisión lo requiere.
- Solo hero y stack usan headers centrados; el resto conserva lectura editorial a la izquierda.
- El preview muestra un solo proyecto principal y remite a la colección.
- Los resúmenes de planes usan scroll horizontal con snap.
- Servicios se apila, oculta chips y reduce las descripciones secundarias.
- Tech labels visibles sin hover.
- Footer apilado.

### 17.2 Tablet, 640px a 1023px

- Menú móvil permanece activo.
- Servicios cambia a dos columnas desde `lg`.
- Proyectos muestra dos secundarios desde `sm` y adopta layout asimétrico desde `lg`.
- Modal de tecnologías usa tres columnas desde `sm` y siete desde `md`.
- No forzar navbar desktop en 768px.

### 17.3 Desktop, desde 1024px

- Navbar completo.
- Hero centrado y de una sola columna.
- Planes usa tres columnas; proyectos usa un caso dominante y dos secundarios.
- Servicios en dos modalidades laterales.
- Sidebars sticky de detalle disponibles.
- Labels secundarios de acciones pueden aparecer.

### 17.4 Viewports de validación

Toda modificación visual significativa debe comprobarse al menos en:

| Ancho | Caso |
|---:|---|
| 390px | Teléfono |
| 800px | Tablet |
| 1024px | Inicio exacto de navbar desktop |
| 1440px | Desktop amplio |

Validar claro y oscuro, contenido corto y largo, y ausencia de overflow en `documentElement`.

---

## 18. Accesibilidad

### 18.1 Reglas obligatorias

- Todos los controles de icono tienen `aria-label`.
- Los SVG decorativos usan `aria-hidden="true"`.
- Los controles de icono y navegación principal miden al menos `44px`; los enlaces de texto conservan padding suficiente.
- El foco usa outline de `2px` en `--color-amber` o un cambio de superficie igualmente perceptible.
- La ruta activa usa `aria-current="page"`.
- El menú cerrado usa `inert`.
- El modal usa `<dialog>` y devuelve foco.
- El contenido tiene skip link a `#contenido-principal`.
- Las regiones con overflow horizontal son enfocables y tienen nombre accesible.
- Los `<details>` conservan `<summary>` nativo.
- Las tablas usan `caption`, `th scope="col"` y `th scope="row"`.
- Las imágenes informativas reciben `alt`; las miniaturas redundantes usan `alt=""`.

### 18.2 Scroll y anclas

- `html` usa smooth scroll.
- Reduced motion lo desactiva.
- Secciones bajo navbar usan `scroll-mt-20`, `scroll-mt-24` o `scroll-mt-28` según contexto.
- `#tecnologias` es a la vez ancla semántica y estado de modal.

### 18.3 Contraste

El texto principal se resuelve por polaridad mediante `--color-white`. El texto muted no debe usarse por debajo de `8px`, ni para información crítica sin una señal visual adicional.

---

## 19. Rendimiento

### 19.1 Fondo

- `will-change` solo en aurora blades.
- `contain: layout style paint` aísla su repintado.
- El fondo usa `pointer-events: none`.
- El SVG de grid es inline y no genera request.
- En móvil se reduce blur.
- Reduced motion detiene animaciones.

### 19.2 Imágenes

- Cards usan `loading="lazy"`.
- Iconos externos del stack usan `loading="lazy"` y `decoding="async"`.
- Los iconos de tecnologías conservan sus colores oficiales al pasar el cursor; son una excepción controlada a la paleta de la interfaz.
- La imagen principal de un proyecto usa `fetchpriority="high"`.
- Mantener dimensiones de contenedor para evitar layout shift.

### 19.3 JavaScript

- No añadir framework cliente para interacciones pequeñas.
- Mantener scripts junto al componente que controlan.
- Evitar listeners duplicados globales.
- Bloquear scroll solo durante menú o modal abierto.
- Preferir APIs nativas: `<dialog>`, `<details>`, `matchMedia`, History API.

### 19.4 Contenido estático

Astro genera actualmente 11 páginas estáticas. Los datos se resuelven en build y no requieren solicitudes cliente para planes o proyectos.

---

## 20. Reglas para nuevas implementaciones

### 20.1 Receta de sección estándar

```astro
<section class="relative z-10 border-t border-white/5 py-20 md:py-24">
  <div class="container mx-auto max-w-[1200px] px-6">
    <header class="mx-auto mb-12 max-w-[720px] text-center">
      <div class="mb-5 inline-flex items-center gap-2">
        <span class="h-2 w-2 rounded-full bg-[var(--color-amber)] animate-pulse"></span>
        <span class="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-muted)]">
          Etiqueta
        </span>
      </div>

      <h2 class="mb-5 text-4xl font-[600] tracking-tight text-white md:text-5xl">
        Mensaje específico con <span class="text-warm-gradient">un solo acento.</span>
      </h2>

      <p class="mx-auto max-w-[650px] text-lg leading-relaxed text-[var(--color-muted)]">
        Explicación concreta del contenido que sigue.
      </p>
    </header>

    <!-- Módulo elegido según la jerarquía real -->
  </div>
</section>
```

### 20.2 Cómo elegir estructura

| Contenido | Patrón correcto |
|---|---|
| Opciones equivalentes | Grid de cards |
| Una opción principal y varias secundarias | Consola asimétrica |
| Comparación tabular | Tabla con overflow contenido |
| Texto contractual extenso | `<details>` |
| Secuencia editorial | Lista numerada real |
| Metadatos | `dl` o celdas técnicas |
| Contenido ambiental difícil de inspeccionar | Vista dinámica + modal estático |

No empezar automáticamente con cards.

### 20.3 Reutilización

- Extraer un componente cuando dos páginas rendericen el mismo markup o comportamiento.
- Mantener estilos locales si solo pertenecen a una ficha compleja.
- No añadir props de compatibilidad sin consumidor real.
- Obtener contenido de colecciones o helpers, no copiar arrays entre páginas.
- Reutilizar `navigationItems`, `PlanCards` y helpers de contacto.

### 20.4 Reglas de color

- Usar `text-white` como texto principal semántico.
- Usar `text-[var(--color-muted)]` para contenido secundario.
- Usar coral para acción y amber para foco/luz.
- Limitar el gradiente a fragmentos de titulares.
- Usar RGBA directo solo en efectos sistémicos bien justificados.

### 20.5 Reglas de densidad

- Si cuatro cards repiten el mismo CTA, considerar filas dentro de una consola.
- Si el contenido detallado existe en otra ruta, el home debe resumirlo.
- Ocultar metadata no esencial en móvil antes de reducir tipografía por debajo de lo legible.
- Usar `line-clamp` solo en previews, nunca en contenido contractual.
- Mantener títulos y CTAs visibles sin hover.

---

## 21. Checklist

### Identidad

- [ ] El fondo conserva `deep-space-bg absolute inset-0`.
- [ ] Siguen presentes base, cinco blades, grid, vignette y letterbox.
- [ ] El micro-grid mantiene `60px`, stroke `0.6px` y opacidad `0.2`.
- [ ] La interfaz usa la familia de azules definida; logos, fotografías e iconos de tecnologías pueden conservar colores de marca.
- [ ] El modo claro y oscuro comparten estructura.

### Tipografía

- [ ] Solo se usan Inter y Geist Mono.
- [ ] Los títulos no superan peso 600.
- [ ] Subtítulos y descripciones usan peso regular.
- [ ] No hay cursivas.
- [ ] La metadata mono representa información real.

### Layout

- [ ] El contenido usa un ancho máximo intencional.
- [ ] El padding lateral móvil es al menos `24px`.
- [ ] La sección tiene divisor superior si corresponde.
- [ ] La estructura elegida refleja la jerarquía, no una cuadrícula por defecto.
- [ ] No existe overflow horizontal del documento.

### Componentes

- [ ] La acción primaria usa keycap.
- [ ] La secundaria usa ghost pill o enlace discreto.
- [ ] Las superficies principales usan command-bar cuando corresponde.
- [ ] Los planes reutilizan `PlanCards`.
- [ ] Navbar y footer leen `navigationItems`.
- [ ] No se copiaron componentes heredados sin migrarlos.

### Interacción

- [ ] Todo control tiene hover, active o focus según corresponda.
- [ ] Los controles de icono y navegación principal miden al menos `44px`.
- [ ] Escape cierra overlays.
- [ ] El foco se restaura al cerrar menú o modal.
- [ ] El body solo se bloquea mientras un overlay está abierto.
- [ ] Reduced motion detiene loops ambientales y vuelve inmediatas las transiciones restantes.

### Responsive

- [ ] Validado a 390px.
- [ ] Validado a 800px.
- [ ] Validado a 1024px.
- [ ] Validado a 1440px.
- [ ] Validado en claro y oscuro.

### Código y contenido

- [ ] Los datos viven en la colección o helper correcto.
- [ ] Los iconos inline usan `currentColor`.
- [ ] Las imágenes tienen `alt`, lazy loading o prioridad apropiada.
- [ ] Los enlaces externos usan `target="_blank" rel="noopener noreferrer"`.
- [ ] `npm run build` termina correctamente.

---

## Glosario

| Término | Definición |
|---|---|
| Deep Space | Sistema completo de canvas, auroras, grid, vignette y letterbox |
| Blade | Cada fuente de luz radial animada del fondo |
| Letterbox | Línea fija de luz azul en el borde superior del viewport |
| Command bar | Superficie translúcida inspirada en una paleta de comandos |
| Keycap | Botón primario con relieve de tecla física |
| Ghost pill | Botón secundario transparente y redondeado |
| Eyebrow | Label corto que contextualiza una sección |
| Route chip | Metadata compacta que describe una ruta o modalidad |
| Polaridad | Cambio claro/oscuro mediante tokens semánticos |
| Marquee | Fila infinita de tecnologías en movimiento horizontal |
| Node | Unidad visual individual del stack tecnológico |
| FOUC | Flash de contenido con tema incorrecto antes de inicializar estilos |

---

> **Mantenimiento:** toda modificación estructural del fondo, tokens, navegación, cards, modal, breakpoints o composición de páginas debe actualizar este documento en el mismo cambio.
> **Contacto de marca:** `hola@micrudev.com`.
