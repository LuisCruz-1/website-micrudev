
---
order: 6

title: "Aromia"

subtitle: "Inventario, distribución y ventas conectados en un ERP para retail"

excerpt: "Un ERP/POS desarrollado para controlar el recorrido completo de productos: desde el ingreso por lotes a bodega hasta su distribución, venta en sucursales y análisis de rentabilidad."

type: "ERP / POS"

year: 2025

client: "Proyecto privado"

image: "../../../assets/img-projects/aromia.png"

imageAlt: "Perfumes representativos de un sistema de inventario, distribución y ventas"

tech: ["React", "TypeScript", "Supabase", "PostgreSQL", "Vite", "Tailwind CSS"]

featured: false
---

Aromia nació para responder una pregunta que parece sencilla:

**¿Cómo saber exactamente qué ocurre con un producto desde que entra a la empresa hasta que termina vendido en una sucursal?**

En un negocio con bodega central, diferentes puntos de venta, vendedores y múltiples lotes de un mismo producto, registrar únicamente entradas y ventas no es suficiente.

También es necesario entender:

- De qué lote provino una unidad.
- Cuánto costó.
- A qué sucursal fue enviada.
- Cuánto stock queda disponible.
- Cuánto está reservado.
- Quién realizó la venta.
- Cómo se pagó.
- Qué margen generó.
- Cuánto corresponde al vendedor, gerente y empresa.

Aromia fue construido para conectar todas esas piezas dentro de un mismo sistema.

## El problema que resuelve

Un sistema básico de inventario podría representar un perfume así:

`Perfume X → Stock: 100`

Pero esa representación pierde información importante.

Las 100 unidades podrían haber llegado en momentos diferentes.

Podrían tener costos de importación diferentes.

Podrían incluso venderse con estructuras de márgenes distintas.

Y parte de ellas podría encontrarse físicamente en diferentes sucursales.

La realidad se parece más a esto:

`Perfume X`

├── `Lote A · 40 unidades · costo $35`

├── `Lote B · 30 unidades · costo $38`

└── `Lote C · 30 unidades · costo $42`

Y después:

`Bodega Central`

↓

`Transferencias`

↓

`Sucursal A / Sucursal B / Sucursal C`

↓

`Ventas`

El reto era preservar esa trazabilidad sin convertir la operación diaria en algo complicado para quien utiliza el sistema.

## Lo que construí

Construí un **ERP/POS interno para una empresa dedicada a la comercialización de perfumes**.

La aplicación conecta diferentes áreas de la operación:

`Productos`

↓

`Bodega`

↓

`Lotes`

↓

`Transferencias`

↓

`Sucursales`

↓

`Inventario local`

↓

`Ventas`

↓

`Pagos`

↓

`Rentabilidad`

↓

`Dashboard y reportes`

Sobre este flujo existen además usuarios, roles, clientes y permisos que determinan qué información puede consultar y qué operaciones puede realizar cada persona.

## Decisión clave: separar producto de inventario

Una de las decisiones de modelado más importantes fue no almacenar el stock directamente dentro del perfume.

El producto responde:

**¿Qué estamos vendiendo?**

Mientras que el inventario responde:

**¿Cuántas unidades tenemos, de dónde provienen y bajo qué condiciones económicas ingresaron?**

Por eso la estructura separa:

`perfumes`

de:

`bodega_stock`

Un perfume puede tener múltiples lotes.

Cada lote conserva información propia como:

- Código de lote.
- Fecha de llegada.
- Cantidad inicial.
- Cantidad disponible.
- Cantidad reservada.
- Costo unitario de importación.
- Precio de venta.
- Márgenes.
- Notas.

Esto permite manejar el inventario con mucha más precisión que utilizando un único contador global por producto.

## Decisión clave: conservar la trazabilidad del lote

Cuando una unidad sale de la bodega y llega a una sucursal, no pierde su origen.

El stock de sucursal mantiene la relación con el lote del cual provino.

Conceptualmente:

`Perfume`

↓

`Lote`

↓

`Bodega`

↓

`Transferencia`

↓

`Sucursal`

↓

`Venta`

Gracias a esta relación es posible conocer no solamente qué producto se vendió, sino también **de qué lote salió esa unidad**.

Esto resulta especialmente importante cuando los costos cambian entre diferentes importaciones.

## El flujo del inventario

Toda la mercancía comienza en la bodega central.

Al ingresar un nuevo lote se registra:

+ `Producto`

+ `Cantidad`

+ `Costo`

+ `Precio`

+ `Estructura de márgenes`

+ `Stock de bodega`

Desde allí la mercancía puede ser distribuida hacia las diferentes sucursales mediante transferencias.

La bodega funciona como origen del inventario y cada sucursal mantiene posteriormente su propio stock disponible.

## Decisión clave: reservar antes de transferir

Una transferencia no debía simplemente restar inventario cuando alguien presionara un botón.

Existía un problema de consistencia.

Supongamos:

`Stock disponible: 20`

Una sucursal solicita:

`15 unidades`

Antes de que esas unidades lleguen físicamente a destino, siguen existiendo dentro del proceso logístico, pero ya no deberían poder comprometerse en otra transferencia.

Por eso diseñé el concepto de **stock reservado**.

El flujo es:

`Disponible`

↓

`Reservar`

↓

`En tránsito`

↓

`Recibir`

↓

`Stock de sucursal`

Las operaciones críticas utilizan funciones PostgreSQL ejecutadas mediante RPC, como:

`fn_reservar_stock_transferencia`

y:

`fn_completar_transferencia`

Esto permite mover parte de la lógica sensible del inventario hacia la base de datos.

## Inventario central y stock de sucursal

Aromia distingue explícitamente dos niveles de inventario.

### Bodega central

Representa el stock disponible antes de distribuirse.

### Stock de sucursal

Representa las unidades físicamente disponibles para vender en cada establecimiento.

Esto permite responder preguntas que un único inventario global no podría responder correctamente:

> ¿Cuánto stock tiene la empresa?

> ¿Cuánto queda todavía en bodega?

> ¿Cuántas unidades tiene cada sucursal?

> ¿Qué productos están actualmente reservados para transferencias?

> ¿De qué lote provienen las unidades de esta tienda?

La misma mercancía puede entenderse desde diferentes niveles sin perder trazabilidad.

## Del inventario al punto de venta

La operación culmina en el POS.

Cuando un vendedor inicia sesión, Aromia conoce:

`Usuario`

↓

`Rol`

↓

`Sucursal`

A partir de esta información puede mostrar únicamente el stock disponible correspondiente a ese punto de venta.

El vendedor selecciona los productos, los incorpora al carrito y procesa el cobro.

El flujo principal es:

`Stock de sucursal`

↓

`Carrito`

↓

`Cliente opcional`

↓

`Método de pago`

↓

`Venta`

↓

`Detalle`

↓

`Actualizar inventario`

La intención fue que una operación que internamente afecta diferentes tablas siguiera sintiéndose sencilla para el vendedor.

## Decisión clave: preservar la economía de cada venta

Otro aspecto importante del proyecto fue evitar que una venta histórica dependiera de la configuración actual de un producto.

Cada lote puede tener asociados valores económicos como:

- Costo de importación.
- Precio público.
- Ganancia del vendedor.
- Comisión.
- Ganancia del gerente.

Cuando ocurre una venta, esos valores se copian también al detalle de la transacción.

Esto funciona como un snapshot económico.

Por ejemplo:

`Lote en enero`

`Costo: $40`

`Precio: $80`

↓

`Venta`

↓

`Guardar costo y márgenes utilizados`

Si meses después cambia el costo de una nueva importación, la venta anterior continúa representando correctamente la realidad del momento en que ocurrió.

Esta decisión hace que los reportes históricos sean mucho más confiables.

## Una venta es más que un total

La estructura de una venta está dividida en diferentes niveles.

`Venta`

↓

`Items`

↓

`Pagos`

La cabecera mantiene información general como:

- Sucursal.
- Vendedor.
- Cliente.
- Total.
- Costos.
- Comisiones.
- Ganancias.
- Método de pago.
- Estado.

Mientras que cada item conserva la información económica específica del producto vendido.

Esto permite analizar la venta tanto como transacción comercial como evento financiero.

## Pagos mixtos

El pago también se diseñó como una entidad separada.

Una venta de:

`$100`

puede estar compuesta por:

`$60 efectivo`

+

`$40 tarjeta`

Por eso los pagos no se reducen simplemente a un campo dentro de la venta.

La tabla de pagos permite representar múltiples movimientos asociados con una misma transacción.

Esta estructura facilita crecer posteriormente hacia formas de cobro más complejas sin alterar el modelo principal de ventas.

## Decisión clave: adaptar la plataforma al rol

No todos los usuarios necesitan ver la misma información.

Aromia maneja diferentes perfiles:

- Administrador.
- Gerente.
- Responsable.
- Vendedor.

El administrador necesita una visión global.

Un gerente necesita entender principalmente lo que ocurre en su sucursal.

Un vendedor necesita realizar ventas y conocer sus propios resultados.

Por eso el sistema no utiliza únicamente roles para ocultar páginas.

También modifica **el contexto de la información**.

Por ejemplo, el dashboard puede responder preguntas diferentes según quién haya iniciado sesión.

### Administrador

> ¿Cuánto vende toda la empresa?

> ¿Cuál es el valor total del inventario?

### Gerente o responsable

> ¿Cuánto vendió mi sucursal?

> ¿Cuánto ha generado mi equipo?

### Vendedor

> ¿Cuánto he vendido?

> ¿Cuánto llevo en comisiones?

La misma plataforma se convierte en diferentes herramientas dependiendo del usuario.

## Separar identidad técnica de identidad empresarial

La autenticación utiliza **Supabase Auth**, pero la identidad del usuario dentro del negocio se mantiene en una tabla propia.

Esto separa dos conceptos:

`Supabase Auth`

→ quién puede iniciar sesión

y:

`Usuario de Aromia`

→ qué rol tiene, dónde trabaja y qué puede hacer

La relación se realiza mediante el identificador del usuario autenticado.

Esto permite mantener la autenticación como responsabilidad de Supabase mientras el sistema conserva un modelo empresarial propio.

## Decisión clave: sacar operaciones sensibles del frontend

La aplicación utiliza principalmente una arquitectura:

`React → Supabase`

Sin un backend API tradicional intermedio.

Sin embargo, no toda la lógica debe ejecutarse desde el navegador.

Algunas operaciones sensibles se trasladaron a mecanismos específicos del backend de Supabase.

Por ejemplo:

- Reservar inventario.
- Completar transferencias.
- Liberar reservas.
- Anular ventas.

se apoyan en funciones RPC de PostgreSQL.

Mientras que la creación e invitación de empleados utiliza una **Supabase Edge Function**.

El principio fue:

**la interfaz puede coordinar una operación, pero aquello que necesita consistencia o privilegios especiales debe ejecutarse lo más cerca posible de los datos.**

## Clientes como contexto de venta

Las ventas pueden asociarse opcionalmente con clientes.

El sistema mantiene información básica como:

- Nombre.
- Teléfono.
- Email.

Esto permite empezar a construir historial alrededor de las personas que compran sin convertir el proceso de venta en algo obligatorio o demasiado pesado cuando el cliente no necesita registrarse.

El cliente aporta contexto adicional a la transacción, pero no bloquea el funcionamiento del POS.

## Dashboard y reportes

Toda la información generada por la operación termina alimentando dashboards y reportes.

El sistema puede consolidar métricas como:

- Total de ventas.
- Ingresos.
- Costos.
- Comisiones.
- Ganancia.
- Inventario.
- Rendimiento por vendedor.
- Rendimiento por sucursal.

Los reportes pueden filtrarse por periodos y su alcance cambia según el rol del usuario.

Esto completa un ciclo importante:

`Operación`

↓

`Datos`

↓

`Métricas`

↓

`Decisiones`

El ERP no solamente registra qué ocurrió.

También intenta convertir esos movimientos en información útil para administrar el negocio.

## Arquitectura técnica

Aromia fue desarrollado como una **SPA conectada directamente a Supabase**.

La arquitectura principal es:

`React + TypeScript`

↓

`Hooks por dominio`

↓

`Supabase JS`

↓

`Supabase Auth + PostgreSQL`

con operaciones específicas delegadas a:

`PostgreSQL RPC`

y:

`Supabase Edge Functions`

El frontend está organizado por funcionalidades:

- Bodega.
- Clientes.
- Dashboard.
- Perfumes.
- Reportes.
- Sucursales.
- Transferencias.
- Usuarios.
- Ventas.

Esto permitió mantener separada la lógica de diferentes dominios aunque todos compartieran la misma base de información.

## Un backend sin servidor tradicional

Una decisión relevante del proyecto fue utilizar Supabase como backend en lugar de construir una API convencional con Laravel, Express o NestJS.

La arquitectura quedó aproximadamente así:

`React`

↓

`Supabase SDK`

↓

`PostgreSQL`


+ `Auth`


+ `RPC`


+ `Edge Functions`

Esto redujo la cantidad de infraestructura propia que debía mantenerse y permitió concentrar el desarrollo en las reglas específicas del negocio.

Al mismo tiempo, obligó a pensar cuidadosamente qué operaciones podían ejecutarse directamente desde el frontend y cuáles necesitaban vivir dentro de PostgreSQL o funciones del backend.

## El resultado

Aromia terminó convirtiéndose en una representación digital del recorrido completo de la mercancía.

Desde:

`Llegó una nueva importación`

hasta:

`Esta unidad fue vendida por este vendedor en esta sucursal y generó este margen`

El flujo completo puede resumirse así:

`Perfume`

↓

`Lote`

↓

`Bodega central`

↓

`Reserva`

↓

`Transferencia`

↓

`Sucursal`

↓

`Stock local`

↓

`Venta`

↓

`Pago`

↓

`Rentabilidad`

↓

`Dashboard`

La mayor fortaleza del sistema no está en tener un módulo de bodega o un módulo de ventas.

Está en que **cada etapa conserva suficiente información para alimentar correctamente la siguiente**.

## Retos técnicos

Uno de los aprendizajes del desarrollo fue identificar qué operaciones requieren un nivel mayor de consistencia.

Registrar una venta, por ejemplo, implica varias acciones relacionadas:

`Crear venta`

↓

`Crear items`

↓

`Registrar pagos`

↓

`Descontar stock`

Si una de esas operaciones falla mientras las anteriores ya fueron confirmadas, el sistema puede terminar en un estado parcial.

Por eso una evolución natural de la arquitectura es consolidar este flujo dentro de una operación transaccional en PostgreSQL.

El mismo principio aplica al control de concurrencia.

Validar en el frontend que existe stock suficiente mejora la experiencia del usuario, pero no garantiza por sí solo que dos vendedores no intenten consumir simultáneamente la última unidad disponible.

Estas situaciones hicieron evidente una diferencia importante:

**validar una operación y garantizar una operación no son lo mismo.**

## Lo que aprendí

Aromia reforzó especialmente mi comprensión sobre modelado de inventarios.

Al principio puede parecer suficiente tener:

`Producto + cantidad`

Pero un sistema real rápidamente necesita conocer:

`Producto + lote + ubicación + disponibilidad + reserva + costo + precio + movimiento`

También confirmó la importancia de preservar snapshots históricos.

Un reporte financiero debe explicar cómo era una operación **cuando ocurrió**, no recalcular el pasado utilizando valores actuales.

Y, finalmente, el proyecto me permitió trabajar con una arquitectura donde Supabase no era simplemente una base de datos.

Funcionaba como:

+ `Autenticación`

+ `PostgreSQL`

+ `API de datos`

+ `Funciones transaccionales`

+ `Edge Functions`

Aromia terminó siendo más que un punto de venta.

Es un **ERP de retail que conecta inventario, logística, sucursales, personas, ventas y rentabilidad alrededor del recorrido real de cada producto**.
