# Micrudev Design System & Prompt Style Guide

> **Estética: "Premium Dark Developer-Tool" & "Cinematic Deep Space Aurora"**
> Esta guía documenta el sistema de diseño iterado para Micrudev. Está diseñada para servir como un "prompt maestro" que permite a cualquier desarrollador o IA replicar exactamente el mismo estilo visual y componentes sin ambigüedades.

---

## 1. Filosofía de Diseño

El diseño encarna el ADN visual de las herramientas para desarrolladores de primer nivel (estilo Vercel, Linear, Stripe). Combina la precisión técnica del diseño suizo con profundidad tridimensional táctil y una iluminación cinematográfica profunda tipo "espacio exterior".

- **Espacio Profundo Cinematográfico (Deep Space):** El fondo no es un color plano; es un universo con un canvas base azul muy oscuro, luces de aurora flotantes, una cuadrícula técnica sutil y un halo de luz superior.
- **Profundidad Táctil (Keycaps & Glassmorphism):** Los botones principales simulan teclas físicas de teclado mecánico, mientras que los contenedores secundarios flotan como paneles de cristal esmerilado.
- **Precisión Matemática:** Tipografías monoespaciadas para metadatos, ausencia total de cursivas y alineación estricta.
- **Polaridad Dinámica (Dark/Light):** Un sistema basado en tokens (variables CSS) donde los colores invierten su polaridad, manteniendo la misma estructura de clases HTML para que el sitio soporte Modo Claro y Oscuro de forma impecable.

---

## 2. Sistema de Color (Tokens)

Todo el sitio utiliza variables nativas inyectadas en `@theme` de Tailwind CSS v4. **No se usan colores crudos en el HTML** (como `bg-black` o `text-white`), siempre se recurre a las variables mapeadas.

### Paleta Base (Definida en `:root` y `:root.dark`)
| Token | Modo Oscuro (`.dark`) | Modo Claro | Rol |
|-------|----------------------|------------|-----|
| `--color-canvas` | `#040B1F` (Deep Space Navy) | `#F6F8FC` (Soft Gray) | Fondo base del viewport |
| `--color-white` | `#ffffff` | `#06132F` | Texto principal, iconos, títulos |
| `--color-black` | `#000000` | `#ffffff` | Sombras, fondos inversos |
| `--color-muted` | `#8B9BB4` | `#637089` | Texto secundario, subtítulos |

### Aurora Accent Colors (Paleta Corporativa)
- `--color-crimson`: `#003DCC` (Azul corporativo profundo)
- `--color-coral`: `#0253FD` (Azul brillante principal)
- `--color-amber`: `#4C84FF` (Azul claro cristalino)

### Aurora Blade Tokens (Para el fondo Deep Space)
- `--theme-aurora-1`: `#0253FD`
- `--theme-aurora-2`: `#4C84FF`
- `--theme-aurora-3`: `#001A66` (Azul espacial casi negro)
- `--theme-aurora-4`: `#003DCC`
- `--theme-aurora-5`: `#6B9DFF`

---

## 3. Tipografía y Jerarquía

**Familias Tipográficas:**
1. **Inter** (`font-body`): Para títulos (H1-H6), párrafos, botones y UI general.
2. **Geist Mono** o JetBrains Mono (`font-mono`): EXCLUSIVAMENTE para etiquetas técnicas, comandos CLI, "eyebrows", atajos de teclado y pie de página.

**Reglas Estrictas:**
- 🚫 **PROHIBIDO EL USO DE CURSIVAS:** Ninguna palabra, span o título debe usar la clase `italic`.
- **Títulos de Sección:** Uniformes en todo el sitio. Deben usar: `text-4xl md:text-5xl font-[600] tracking-tight`.
- **Subtítulos de Sección:** `text-lg font-[400] text-[var(--color-muted)] max-w-[640px] leading-relaxed`.

---

## 4. Componentes Insignia (Signature Elements)

### A. The Deep Space Aurora Background (Sistema Completo)
El fondo del sitio es un ecosistema de 6 capas apiladas con aislamiento propio (`isolation: isolate`). Todas las capas son `position: absolute inset-0 pointer-events-none`.

**Orden estricto de la pila (de fondo a frente):**

| # | Capa | Descripción |
|---|------|-------------|
| 1 | `.deep-space-base` | Canvas base con 3 gradientes radiales elípticos (azul superior, azul claro inferior derecho, azul espacial inferior izquierdo) sobre el color canvas. |
| 2 | `.aurora-blade` × 5 | Luces radiales difuminadas con `filter: blur(100px)`, animaciones de traslación/rotación desfasadas. |
| 3 | `.deep-space-grid` | Cuadrícula técnica SVG de 60x60px con `mask-image` radial que la difumina hacia los bordes. |
| 4 | `.deep-space-vignette` | Viñeta radial sutil que oscurece los bordes. |
| 5 | `.deep-space-letterbox` | Línea de luz superior (3px) con triple `box-shadow` de resplandor. |

**Especificaciones de las 5 Aurora Blades:**
- Posicionamiento absoluto con dimensiones en `vw` (responsive).
- Cada una con su propio color, posición, rotación y velocidad de animación.
- Animaciones: `drift-1` (24s), `drift-2` (30s), `drift-3` (20s), `drift-4` (35s), `drift-5` (28s).
- Todas usan `infinite alternate ease-in-out` con `will-change: transform, opacity`.
- En móvil (`max-width: 768px`): se reduce el blur a 70px y se ajustan las dimensiones.
- En `prefers-reduced-motion: reduce`: se desactivan todas las animaciones.

**Micro-Grid (Capas 3) - Adaptación por tema:**
- **Modo Oscuro:** Stroke `#4C84FF`, opacidad `0.6`.
- **Modo Claro:** Stroke `#003DCC`, opacidad `0.8`.
- Se controla mediante clase `.grid-stroke` con selectores `html.dark` y `html:not(.dark)`.

**Letterbox Superior (Capa 5):**
- Altura: `3px`.
- Gradiente: `linear-gradient(to right, transparent, var(--theme-aurora-1), transparent)`.
- Triple resplandor: `box-shadow: 0 0 20px, 0 0 40px, 0 0 80px`.
- Opacidad: `1`.

### B. Standardized Eyebrows (Etiquetas Superiores)
Toda sección principal debe estar precedida por un "Eyebrow" sobre el título principal.
- **Estructura Base:** `inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 mb-8`.
- **Indicador Visual:** Un punto azul pulsante a la izquierda: `<span class="w-2 h-2 rounded-full bg-[var(--color-blue-400)] animate-pulse"></span>`.
- **Tipografía:** `font-mono text-[11px] text-[var(--color-white)] uppercase tracking-wider`.
- **Efecto (Especial Hero):** En cabeceras destacadas, se incluye un pseudo-elemento con máscara de gradiente absoluto y animación `@keyframes shimmer`.

### C. Tactile Keycap Buttons (Botones Principales)
Los botones de acción primaria simulan teclas físicas de un teclado mecánico.
- **Clase principal:** `.keycap-btn`.
- **Sombras (El Secreto):** Utilizan una pila compleja de sombras CSS que varían según el tema (`--theme-keycap-shadow`), incluyendo un anillo oscuro exterior, un resplandor exterior suave y brillos interiores (inset) superiores e inferiores para crear relieve físico.
- **Interacción:** Al hacer clic (`:active`), se hunden físicamente (`translateY(2px)`) y la sombra se comprime.

### D. Command-Bar Mockup (Glassmorphism)
Paneles translúcidos de estética UI macOS/Raycast. Usados en vistas previas o en el Hero.
- **Contenedor:** Fuerte desenfoque de fondo (`backdrop-blur(24px)`), bordes sutiles de 1px y sombras tintadas. Todo administrado vía variables CSS (`--theme-cmd-bg`).
- **Estados Activos:** Las filas seleccionadas llevan borde izquierdo marcado (`border-l-2`) y fondo teñido.
- **Metadatos:** Uso intensivo de pequeñas píldoras con fuente monoespaciada para atajos de teclado (ej. `Cmd+K`).

### E. Infinite Tech Marquee (Carrusel de Stack)
Presentación de tecnologías sin bordes rígidos.
- **Estructura:** Contenedor ancho con filas que se desplazan infinitamente (`animate-marquee`).
- **Máscara de Difuminado:** Uso de `mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent)` para que los elementos se desvanezcan hacia los extremos izquierdo y derecho.
- **Interacción:** Hover pausa el contenedor (`group-hover:[animation-play-state:paused]`) e ilumina los iconos.

### F. Mobile Menu Overlay (Menú Desplegable)
- Botón hamburguesa visible solo en `md:hidden` con icono dinámico (menú ↔ X).
- Overlay full-width con `backdrop-blur-2xl` y animación de `translate-y` con `duration-300 ease-in-out`.
- **Cierre automático:** Al hacer clic fuera del menú, al hacer clic en un enlace, o al presionar la tecla `Escape`.

---

## 5. Espaciado y Layout Uniforme

Para mantener la rigurosidad suiza en la estructura:
- **Separación de Secciones:** TODA sección del sitio debe iniciar con una línea divisoria superior sutil: `border-t border-white/5` (aplicada al contenedor principal de la sección).
- **Padding Vertical:** Se usa rigurosamente `py-24` (96px) en cada `<section>`.
- **Contenedores:** `container mx-auto px-6 max-w-[1200px]`. El contenido nunca debe estar apretado contra los bordes laterales del viewport.
- **Separación Título/Grid:** Un margen constante de `mb-16` entre la cabecera de la sección (Eyebrow + Título + Subtítulo) y las tarjetas de contenido inferior.

---

## 6. Configuración Técnica Clave (Tailwind CSS v4)

La magia técnica para la escalabilidad del tema reside en Tailwind v4:
1. **Inversión Mapeada:** No se usa `dark:bg-black bg-white`. Se usa `bg-[var(--color-canvas)]` y CSS puro se encarga de reasignar los HEX dentro de `:root` y `:root.dark`.
2. **Fijación del Tema:** Para que el botón interruptor del Navbar controle todo sin interferencia del sistema operativo, el modificador `dark:` está reescrito en `global.css` mediante:
   ```css
   @custom-variant dark (&:where(.dark, .dark *));
   ```
3. **Identidad Dual de Logos:** El sitio tiene dos juegos de logos (`Micrudev_Logo_Monochrome_White.svg` para oscuro y `Micrudev_Logo_Primary.svg` para claro) que se renderizan con clases condicionales:
   ```html
   <img src="...Monochrome_White.svg" class="hidden dark:block" />
   <img src="...Primary.svg" class="block dark:hidden" />
   ```
4. **Favicon Dinámico:** El favicon (`public/favicon.svg`) usa `Micrudev_Icon_Monochrome_Navy.svg` con CSS interno que adapta el color mediante `@media (prefers-color-scheme: dark)`.
5. **WhatsApp Universal:** Todos los botones de contacto (`href`) apuntan a `https://wa.me/593998081684` con `target="_blank" rel="noopener noreferrer"`.

---

## 7. Checklist de Construcción para la IA (Prompt Verification)

Si estás generando una nueva página, componente o sección basada en esta guía, DEBES cumplir obligatoriamente lo siguiente:

- [ ] ¿Tiene el Eyebrow estándar con su punto pulsante azul y fuente monoespaciada mayúscula?
- [ ] ¿El título es `text-4xl md:text-5xl font-[600]` y está **totalmente libre de cursivas (`italic`)**?
- [ ] ¿El contenedor principal tiene `py-24` y la línea divisoria superior `border-t border-white/5`?
- [ ] ¿El espacio entre el texto introductorio y la primera fila de tarjetas es de al menos `mt-16` o `mb-16`?
- [ ] ¿Los botones principales de llamada a la acción (CTA) usan la clase `.keycap-btn` o, de ser secundarios, `.ghost-pill`?
- [ ] ¿El componente respeta las variables del tema (`var(--color-white)`, `var(--color-canvas)`) y evita codificar colores crudos (`text-white`, `bg-black`)?
- [ ] ¿Los logos implementan la lógica dual con `hidden dark:block` y `block dark:hidden`?
- [ ] ¿Los enlaces de contacto apuntan a `https://wa.me/593998081684` con `target="_blank"`?
- [ ] ¿El código no contiene clases sobrantes, genéricas o estilos bootstrap? Mantenlo elegante, oscuro y técnico.
- [ ] ¿El fondo Deep Space se mantiene visible con sus 5 capas (base, blades, grid, vignette, letterbox)?