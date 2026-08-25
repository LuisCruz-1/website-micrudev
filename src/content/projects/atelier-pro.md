
---
order: 1

title: "AtelierPro"

subtitle: "De cotizaciones en Excel a un sistema integral de gestión para producción textil"

excerpt: "Una aplicación que comenzó automatizando cotizaciones y evolucionó hasta conectar clientes, producción, talleres, inventario y datos operativos en una sola plataforma."

type: "Business app"

year: 2020

client: "Proyecto privado"

image: "../../../assets/img-projects/atelier.png"

imageAlt: "Plataforma digital de gestión y control operativo"

tech: ["FlutterFlow", "Supabase", "Power Apps"]

featured: true
---

AtelierPro comenzó en 2020 con una pregunta bastante sencilla:

**¿Por qué generar una cotización tenía que tomar tantos pasos?**

La empresa utilizaba una plantilla de Excel que debía buscarse, completarse manualmente, convertirse en PDF, almacenarse y posteriormente enviarse por correo electrónico.

Funcionaba, pero cada nueva cotización añadía otro archivo a un sistema que dependía cada vez más de carpetas, correos y conocimiento individual para encontrar información.

Mi primera solución fue construir una aplicación para reemplazar ese proceso.

Con el tiempo descubrí que el verdadero problema no eran las cotizaciones.

Era que **toda la operación estaba fragmentada**.

## El problema que resuelve

El flujo comercial y productivo estaba distribuido entre diferentes herramientas y registros.

Una cotización podía comenzar en Excel y terminar almacenada como PDF en algún correo. Cuando era aprobada, la información debía volver a trasladarse al proceso de producción.

Después aparecían nuevas preguntas:

- ¿Qué prendas pertenecen a esta producción?
- ¿En qué taller están?
- ¿Qué operación se está realizando?
- ¿Qué materiales fueron entregados?
- ¿Cuánto inventario queda?
- ¿Qué unidades regresaron del taller?
- ¿Cuánto se ha pagado?
- ¿Qué prendas ya fueron entregadas al cliente?

Responderlas implicaba consultar diferentes archivos, personas o registros.

El problema podía resumirse así:

`Información existente → múltiples herramientas → registros duplicados → poca trazabilidad`

AtelierPro busca convertir ese escenario en:

`Una sola fuente de información → procesos conectados → trazabilidad completa`

## Lo que construí

Construí una plataforma que conecta el ciclo comercial con el ciclo de producción de una empresa de confección.

El flujo comienza con un cliente y una cotización, pero puede continuar hasta la fabricación y entrega final del producto:

`Cliente`

↓

`Cotización`

↓

`Aprobación`

↓

`Orden de Producción`

↓

`Unidades de Producción`

↓

`Órdenes de Trabajo`

↓

`Talleres`

↓

`Recepción`

↓

`Entrega al cliente`

Alrededor de este flujo funcionan otros componentes como inventario, compras, materiales, medidas, proveedores, pagos y generación de documentos.

La intención no fue crear módulos aislados.

Fue conseguir que **la información registrada en una etapa pudiera continuar siendo utilizada durante las siguientes**.

## Empezar pequeño

La primera versión de AtelierPro fue construida en **Microsoft Power Apps**.

En ese momento el alcance era mucho más reducido: reemplazar el proceso manual utilizado para elaborar cotizaciones.

Antes:

`Buscar Excel → completar → guardar → PDF → email → archivar`

Después:

`Crear cotización → generar documento → conservar registro`

Esta primera versión permitió validar que centralizar el proceso tenía valor real.

Pero también reveló algo más importante.

Una cotización contiene prácticamente el punto de partida de una producción: cliente, productos, cantidades, tallas, precios y especificaciones.

Si esa información ya estaba dentro del sistema, **no tenía sentido volver a introducirla cuando comenzara la fabricación**.

Ahí empezó a cambiar el alcance de AtelierPro.

## De una app de cotizaciones a un sistema operativo

La siguiente decisión fue conectar la cotización con la producción.

Una cotización aprobada puede transformarse directamente en una **Orden de Producción**, reutilizando la información que ya existe.

Pero una orden que dice:

`50 camisas`

todavía es demasiado abstracta para controlar una producción real.

Por eso diseñé el concepto de **Unidad de Producción**.

AtelierPro convierte esas 50 camisas en 50 registros individuales.

Cada prenda puede tener su propia:

- persona asignada,
- talla,
- tipo de prenda,
- imagen,
- medidas,
- estado dentro del proceso.

Esto permite pasar de controlar simplemente una cantidad a saber **qué está sucediendo con cada unidad que se está fabricando**.

## Modelar el proceso real

Una de las decisiones más importantes del proyecto fue no diseñar la aplicación alrededor de pantallas, sino alrededor de cómo funciona realmente la producción.

Una prenda puede necesitar pasar por:

`Corte → Bordado → Confección → Acabado`

Cada una de esas etapas se convierte en una **Orden de Trabajo**.

La Orden de Trabajo conecta tres elementos:

`Prenda + Operación + Taller`

De esta manera, el sistema puede conocer qué unidades están siendo procesadas, quién las tiene y qué operación se está realizando.

Cuando las prendas regresan del taller, se registra su recepción y automáticamente vuelven a quedar disponibles para la siguiente etapa.

Esto evita que una misma unidad pueda estar asignada simultáneamente a procesos incompatibles.

## Decisión clave: mantener una sola fuente de verdad

Uno de los principios que terminó guiando todo el producto fue:

**Registrar una vez, reutilizar después.**

La información de un cliente registrada durante una cotización vuelve a utilizarse en producción.

Los materiales configurados en inventario aparecen posteriormente en compras y entregas a talleres.

Los proveedores tienen asociados los materiales que realmente suministran.

Las prendas creadas durante una producción son las mismas unidades que posteriormente pasan por talleres y finalmente aparecen disponibles en las actas de entrega.

La aplicación intenta evitar que el usuario tenga que volver a crear información que el sistema ya conoce.

## Decisión clave: no perder el historial

En muchas aplicaciones internas, editar significa reemplazar.

En AtelierPro decidí que esto no debía suceder con las cotizaciones.

Cuando una propuesta cambia, la versión anterior permanece intacta y el sistema solicita un comentario antes de generar una nueva versión.

Por ejemplo:

`Cotización #21 · V1`

↓

`Cliente solicita cambio de material`

↓

`Cotización #21 · V2`

Esto permite reconstruir la evolución de una negociación y entender por qué una propuesta terminó siendo diferente de la original.

El mismo principio de trazabilidad aparece en otras áreas del sistema, especialmente en inventario, producción y pagos.

## Decisión clave: controlar unidades, no solo órdenes

Otra decisión importante fue trabajar con prendas individuales.

Una orden puede contener decenas o cientos de unidades, pero en una producción personalizada no todas necesariamente siguen exactamente el mismo recorrido.

Una persona puede necesitar otra talla.

Una prenda puede requerir medidas específicas.

Algunas unidades pueden regresar de un taller antes que otras.

Un cliente puede recibir una entrega parcial.

Controlar cada unidad individualmente permite representar estas situaciones sin perder la relación con la orden general.

## Decisión clave: conectar inventario con operaciones reales

El inventario tampoco funciona como un registro independiente.

Cuando una compra cambia al estado **Recibido**, AtelierPro genera automáticamente una entrada en el Kardex.

Cuando se entrega material a un taller para una Orden de Trabajo, se registra una salida asociada a esa operación.

Cuando existe una merma, devolución o diferencia física, puede generarse un ajuste identificado y documentado.

De esta manera:

`Compra → Inventario → Taller → Producción`

forma parte del mismo flujo de información.

El Kardex conserva la trazabilidad de cada movimiento, incluyendo cantidad, origen y usuario responsable.

## Decisión clave: diseñar para confección personalizada

La confección tiene necesidades particulares que un sistema genérico de inventario o ventas no necesariamente contempla.

Una de ellas es la toma de medidas.

Por eso construí un sistema donde pueden definirse **plantillas de medidas** con nombre, alias, instrucciones e incluso una imagen que explique cómo tomar cada medida.

Después esas medidas pueden asociarse a diferentes tipos de prendas.

Por ejemplo:

`Camisa`

→ Cuello  
→ Pecho  
→ Manga  
→ Largo

Mientras que otro tipo de prenda puede requerir un conjunto completamente diferente.

Esto permite estandarizar un proceso que normalmente depende del conocimiento de quien está tomando las medidas.

## Decisión clave: hacer que la búsqueda sea parte del producto

Centralizar información genera un nuevo problema:

**en algún momento habrá demasiada información para navegar manualmente.**

Por eso desarrollé dos niveles de búsqueda.

La búsqueda tradicional permite escribir cualquier término y encontrar coincidencias.

Pero también incorporé una búsqueda estructurada utilizando:

`campo:valor`

Por ejemplo:

`cliente:acme`

o combinaciones como:

`cliente:acme ; estado:aprobada`

El mismo concepto funciona en cotizaciones, clientes, producción, órdenes de trabajo, proveedores, inventario, materiales y pagos.

No quería que encontrar información dependiera de recorrer cinco pantallas y aplicar varios filtros manualmente.

## Tex AI: otra forma de acceder a los datos

La evolución más reciente de AtelierPro fue preguntarme algo diferente:

**¿Y si el usuario ni siquiera necesitara saber dónde buscar?**

De esa idea nació **Tex AI**, un asistente conectado con la información registrada dentro de AtelierPro.

En lugar de navegar por diferentes módulos, el usuario puede realizar preguntas como:

> ¿Cuál es el estado de la orden de producción 66?

> ¿Qué taller está haciendo la confección de la OP 65?

> ¿Cuánto tenemos de Tela Drill?

> ¿Qué cotizaciones hemos enviado a este cliente?

Tex AI consulta los datos del sistema y devuelve la información mediante una conversación.

El objetivo no fue simplemente añadir IA a la aplicación.

La intención fue utilizarla como una **nueva interfaz para acceder a información que ya estaba correctamente estructurada**.

## Evolución tecnológica

La arquitectura también tuvo que evolucionar junto con el producto.

La primera versión en **Power Apps** fue suficiente para validar rápidamente la idea inicial.

Pero AtelierPro dejó de ser una aplicación de cotizaciones.

La cantidad de entidades, relaciones, procesos y reglas de negocio hizo necesario construir una nueva versión con mayor flexibilidad.

Por eso migré el producto hacia:

- **FlutterFlow** para desarrollar la interfaz y experiencia de aplicación.
- **Supabase** como backend y base central de información.

La migración no fue solamente una decisión técnica.

Representó también el paso entre dos etapas del producto:

`Prototipo funcional para resolver un proceso`

↓

`Plataforma diseñada para administrar una operación`

## Lo que terminó conectando AtelierPro

La versión actual integra dentro del mismo modelo:

- Clientes y contactos.
- Cotizaciones.
- Versiones de cotizaciones.
- Pagos.
- Órdenes de Producción.
- Unidades individuales de producción.
- Personas y medidas.
- Tipos de prendas y tallas.
- Órdenes de Trabajo.
- Operaciones de taller.
- Talleres externos.
- Pagos a talleres.
- Materiales entregados.
- Proveedores de materia prima.
- Compras.
- Inventario.
- Kardex.
- Actas de entrega.
- Reportes PDF y Excel.
- Búsqueda avanzada.
- Tex AI.

Pero el valor del producto no está en la cantidad de módulos.

Está en **las relaciones entre ellos**.

## Resultado

AtelierPro redujo la dependencia de hojas de cálculo, documentos dispersos y registros separados al crear una fuente central de información para la operación.

El cambio principal no puede medirse únicamente en la reducción de pasos necesarios para generar una cotización.

El resultado más importante fue pasar de una operación donde gran parte del contexto estaba distribuido entre archivos y personas a otra donde el sistema puede responder preguntas como:

**¿Qué se vendió?**

**¿Qué se está fabricando?**

**¿Dónde está cada prenda?**

**¿Qué taller la tiene?**

**¿Qué materiales se utilizaron?**

**¿Qué falta por entregar?**

Todo utilizando información relacionada dentro de una misma plataforma.

## Lo que aprendí

AtelierPro me enseñó que automatizar un documento es relativamente sencillo.

Lo complejo —y mucho más interesante— es modelar correctamente todo lo que sucede alrededor de ese documento.

La cotización fue únicamente la puerta de entrada.

Detrás existían clientes, productos, personas, materiales, talleres, inventario, pagos, entregas y diferentes estados que necesitaban relacionarse entre sí.

También aprendí que no siempre es necesario diseñar el sistema completo desde el inicio.

AtelierPro comenzó solucionando un problema pequeño y concreto.

El propio uso del producto fue revelando cuál debía ser el siguiente problema a resolver.

Su evolución puede resumirse así:

`Excel`

↓

`Cotizaciones digitales`

↓

`Datos centralizados`

↓

`Producción`

↓

`Control individual de prendas`

↓

`Talleres e inventario`

↓

`Operación conectada`

↓

`Tex AI`

Lo que comenzó como una aplicación para hacer cotizaciones terminó convirtiéndose en un **sistema de gestión diseñado específicamente alrededor de la operación de una empresa de confección**.
