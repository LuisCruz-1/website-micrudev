# Micrudev Design System

> Sistema de diseño minimalista elegante para la marca Micrudev. Basado en principios suizos: grilla estricta, aire generoso, jerarquía tipográfica fuerte y sobriedad.

---

## Filosofía

Minimalismo elegante que transmite **sofisticación y simplicidad funcional**. Cada elemento tiene un propósito claro. Nada es decorativo sin razón.

---

## Paleta de Colores

### Colores primarios (únicos autorizados)

| Token | Valor | Uso |
|-------|-------|-----|
| `navy` | `#06132F` | Modo oscuro, CTA, contraste |
| `blue` | `#0253FD` | Acento principal, links, CTAs |
| `blue-700` | `#003DCC` | Hover de elementos azules |
| `blue-400` | `#4C84FF` | Acento claro, anillos de foco |
| `blue-100` | `#E7EFFF` | Fondos suaves, badges, selección |

### Colores neutros

| Token | Valor | Uso |
|-------|-------|-----|
| `surface` | `#F6F8FC` | Fondo principal (light mode) |
| `ink` | `#0F1B37` | Texto principal, titulares |
| `muted` | `#637089` | Texto secundario, descripciones |
| `white` | `#FFFFFF` | Texto sobre fondos oscuros |

---

## Tipografía

**Familia única:** Inter (400, 500, 600, 700)

### Escala tipográfica

| Nivel | Tamaño | Peso | Uso |
|-------|--------|------|-----|
| Display | `clamp(3rem, 6vw, 5.5rem)` | 700 | H1, hero |
| H2 | `clamp(2.25rem, 4vw, 3.5rem)` | 700 | Títulos de sección |
| H3 | `1.5rem` (24px) | 600 | Títulos de card |
| Body Large | `1.25rem` (20px) | 400 | Descripciones destacadas |
| Body | `1rem` (16px) | 400 | Texto general |
| Small | `0.875rem` (14px) | 400 | Metadata, links |
| Eyebrow | `0.75rem` (12px) | 600 | Etiquetas de sección (uppercase, tracking-wider) |

### Reglas

- `tracking-tight` en titulares
- `leading-relaxed` en cuerpo
- `tracking-wider` en eyebrows (uppercase)

---

## Espaciado (escala base 8px)

| Token | Valor |
|-------|-------|
| `space-1` | 8px |
| `space-2` | 16px |
| `space-3` | 24px |
| `space-4` | 32px |
| `space-5` | 48px |
| `space-6` | 64px |
| `space-8` | 96px |
| `space-10` | 128px |

### Secciones

- Padding vertical: `py-24` (96px) móvil, `py-32` (128px) desktop
- Margen entre header de sección y contenido: `mb-20` (80px)

---

## Radios (sistema de marca)

| Token | Valor | Uso |
|-------|-------|-----|
| `sm` | 10px | Inputs pequeños |
| `md` | 16px (rounded-2xl) | Cards, inputs |
| `lg` | 24px (rounded-3xl) | Paneles, modales |
| `pill` | 9999px (rounded-full) | Botones, badges, nav |

**Regla:** Coherencia total, sin esquinas vivas.

---

## Sombras

```css
--shadow-sm: 0 1px 2px rgba(6, 19, 47, 0.05);
--shadow-md: 0 4px 12px rgba(6, 19, 47, 0.08);
--shadow-lg: 0 12px 32px rgba(6, 19, 47, 0.10);
```

En hover de cards: `hover:-translate-y-1` + intensificación sutil de sombra.

---

## Componentes

### Botones

| Variante | Estilo | Uso |
|----------|--------|-----|
| `primary` | `bg-blue text-white` | Acción principal |
| `outline` | `border-ink/15 text-ink` | Acción secundaria |
| `ghost` | `text-ink` sin fondo | Acción terciaria |

**Estados:**
- Hover primary: `bg-blue-700` + `translate-y-0.5`
- Hover outline: `border-blue text-blue`
- Foco: `ring-blue-400` (2px)

### Cards (glass minimalista)

```
bg-white/70 backdrop-blur-md
border border-ink/8 rounded-2xl
hover:border-blue/30 hover:-translate-y-1
transition-all duration-300
```

### Navbar

- Logo (icono 36px + texto)
- Nav central en píldora glass: `bg-white/70 backdrop-blur-md rounded-full`
- CTA a la derecha

### Footer

- Una sola línea en desktop
- Logo + links + copyright
- Sin columnas múltiples

---

## Animaciones

| Tipo | Duración | Curva |
|------|----------|-------|
| Hover | 200ms | ease |
| Transición general | 300ms | ease |
| Acordeón FAQ | 300ms | ease |

**Regla:** Animaciones sutiles. Nada rebota, nada gira, nada pulsa constantemente. Solo lo necesario.

---

## Layout

### Contenedor

- Max-width: `1200px`
- Padding lateral: `1.5rem` móvil, `2rem` desktop

### Grillas

- Bento servicios: `grid-cols-3` con cards `col-span-2` para destacados
- Stats: `grid-cols-3`
- FAQ: `grid-cols-12` con header `col-span-4` y lista `col-span-8`

---

## Responsive

| Breakpoint | Comportamiento |
|------------|----------------|
| `< 768px` | 1 columna, padding reducido |
| `>= 768px` | Grillas activan, espaciado generoso |
| `>= 1024px` | Layout completo |

---

## Principios de uso

1. **Menos es más.** Si un elemento no aporta, se elimina.
2. **Aire generoso.** El espacio negativo es tan importante como el contenido.
3. **Jerarquía clara.** Máximo 3 niveles tipográficos por vista.
4. **Color con propósito.** El azul solo para acciones y acentos clave.
5. **Consistencia.** Los mismos radios, los mismos espacios, los mismos pesos.
6. **Sin decoración gratuita.** Nada de ruido, nada de texturas innecesarias, nada de brillos exagerados.

---

## No hacer

- No usar más de 2 colores de acento por vista
- No usar gradientes (excepto en casos muy puntuales)
- No usar sombras pesadas
- No usar animaciones de más de 400ms
- No usar texto centrado para descripciones (preferir izquierda)
- No usar mayúsculas excepto en eyebrows
- No usar emojis en la interfaz
