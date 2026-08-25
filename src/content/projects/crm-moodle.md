
---
order: 4

title: "CRM Académico · Moodle"

subtitle: "La capa comercial y financiera que conecta leads, matrículas, pagos y Moodle"

excerpt: "Un CRM desarrollado a medida que conecta el proceso comercial con Moodle, automatizando matrículas, planes de cuotas, pagos, comunicaciones y autogestión del estudiante."

type: "Academic CRM"

year: 2025

client: "Proyecto privado"

image: "../../../assets/img-projects/moodle.png"

imageAlt: "Plataforma digital para gestión académica, comercial y financiera"

tech: ["Laravel", "MySQL", "Moodle API", "Docker"]

featured: false
---

Moodle es una plataforma muy completa para administrar el aprendizaje.

Permite gestionar cursos, docentes, estudiantes, evaluaciones, contenidos y prácticamente toda la experiencia académica.

Pero había una parte importante del negocio que Moodle no resolvía.

**¿Qué ocurre antes de que una persona se convierta en estudiante y qué ocurre financieramente después de matricularla?**

Ese fue el punto de partida del proyecto.

Construí una plataforma que funciona como una capa comercial, administrativa y financiera alrededor de Moodle, conectando desde la gestión de un prospecto hasta su matrícula, creación de cuotas, registro de pagos y acceso al aula virtual.

## El problema que resuelve

Para una academia, matricular a un estudiante no consiste solamente en añadirlo a un curso.

Antes existe un proceso comercial:

`Prospecto → seguimiento → decisión → matrícula`

Después comienza otro proceso:

`Matrícula → cuotas → pagos → deuda → seguimiento`

Y paralelamente existe Moodle:

`Estudiante → curso → contenido académico`

El problema era que estos tres mundos no estaban necesariamente conectados.

Moodle sabía que un estudiante estaba matriculado en un curso.

Pero no necesariamente sabía:

- Cuánto debía pagar.
- Si existía una matrícula inicial.
- Si el curso tenía mensualidades.
- Cuántas mensualidades correspondían.
- Cuándo vencía cada cuota.
- Cuánto había pagado.
- Si tenía deuda pendiente.
- De qué proceso comercial provenía.
- Qué comprobantes había presentado.

La información académica existía por un lado y la comercial-financiera por otro.

La solución buscaba conectar ambas.

## Lo que construí

Desarrollé un CRM académico y financiero utilizando **Laravel y MySQL**, integrado directamente con Moodle mediante su API.

La plataforma incorporaba su propia base de datos y mantenía sincronizada la información necesaria entre ambos sistemas.

El flujo completo podía comenzar mucho antes de la matrícula:

`Lead`

↓

`Pipeline comercial`

↓

`Etapas`

↓

`Oportunidad ganada`

↓

`Matrícula`

↓

`Creación o sincronización en Moodle`

↓

`Generación del plan financiero`

↓

`Acceso del estudiante`

↓

`Pagos y seguimiento`

El objetivo era que convertir un prospecto en estudiante no implicara ejecutar manualmente varios procesos independientes.

## Decisión clave: Moodle debía seguir haciendo lo que hace bien

Una de las primeras decisiones fue **no intentar reemplazar Moodle**.

No tenía sentido reconstruir funcionalidades que Moodle ya resolvía correctamente:

- Cursos.
- Contenido.
- Evaluaciones.
- Docentes.
- Actividades.
- Seguimiento académico.

El nuevo sistema debía encargarse de aquello que faltaba.

Conceptualmente, la arquitectura quedó dividida así:

`CRM → relación comercial`

`Sistema financiero → cuotas y pagos`

`Moodle → experiencia académica`

Pero las tres partes debían sentirse como un único ecosistema.

## Del lead a la matrícula

Uno de los módulos principales era un sistema de **tableros comerciales configurables**.

El administrador podía crear diferentes pipelines y definir libremente sus etapas.

Por ejemplo:

`Nuevo lead`

↓

`Contactado`

↓

`Interesado`

↓

`Seguimiento`

↓

`Ganado`

La diferencia importante era que una etapa podía configurarse como **etapa ganada** y relacionarse con un curso específico de Moodle.

Esto convirtió un cambio aparentemente comercial en un trigger operativo.

Cuando un asesor desplazaba una oportunidad hasta la etapa ganada, aparecía la opción de matricular al estudiante.

Al confirmar, el sistema podía iniciar automáticamente todo el proceso posterior.

## Decisión clave: una venta debía desencadenar la operación

No quería que ganar una oportunidad significara solamente cambiar el color de una tarjeta dentro de un Kanban.

Si el estudiante acababa de comprar un curso, el sistema ya tenía suficiente información para actuar.

Por eso diseñé el flujo:

`Lead → etapa ganada`

↓

`Confirmar matrícula`

↓

`Crear estudiante si no existe`

↓

`Matricular en Moodle`

↓

`Registrar matrícula en CRM`

↓

`Generar obligaciones financieras`

↓

`Enviar comunicación`

Una acción comercial podía desencadenar automáticamente procesos académicos, financieros y comunicacionales.

Este fue uno de los principios centrales del producto:

**un cambio de estado debía producir consecuencias reales dentro del sistema.**

## Modelar el precio de un curso

Otro de los problemas interesantes era que el precio de un curso no siempre podía representarse mediante un único valor.

Un programa podía tener, por ejemplo:

**Matrícula**

`$100 · pago único`

y:

**Mensualidad**

`$200 · recurrente · mensual · 10 veces`

Por eso diseñé un sistema de **rubros asociados a los cursos**.

Cada rubro podía definir características como:

- Nombre.
- Valor.
- Tipo de cobro.
- Si era único o recurrente.
- Número de recurrencias.
- Periodicidad.

De esta manera, el curso dejaba de tener simplemente un precio.

Tenía una **estructura financiera**.

## Decisión clave: separar matrícula académica de obligaciones financieras

Matricular a alguien en Moodle y crear su plan de pagos son operaciones diferentes, aunque ocurran al mismo tiempo.

Decidí mantener esa separación en el modelo.

Cuando un estudiante se matriculaba:

`Matrícula académica`

y:

`Plan financiero`

se generaban como registros relacionados, pero independientes.

Esto permitía que un mismo estudiante pudiera estar matriculado en varios cursos y que cada matrícula tuviera sus propias obligaciones.

Por ejemplo:

`Luis Cruz`

├── `Programación`

│   ├── Matrícula · $100

│   ├── Mensualidad 1 · $200

│   ├── Mensualidad 2 · $200

│   └── ...

└── `Diseño Web`

    ├── Matrícula · $80

    ├── Cuota 1 · $150

    └── ...

El estado financiero podía entenderse tanto a nivel global del estudiante como a nivel de cada curso.

## Moodle como sistema conectado

Cuando la matrícula era confirmada, la plataforma consultaba Moodle.

Si el usuario todavía no existía:

`Crear usuario en Moodle`

Si ya existía:

`Reutilizar usuario`

Después:

`Matricular en curso correspondiente`

Esto evitaba tener que ingresar manualmente al administrador de Moodle cada vez que se cerraba una inscripción.

La matrícula podía comenzar desde el CRM y terminar automáticamente dentro del LMS.

## Sincronización entre sistemas

Trabajar con dos plataformas implica inevitablemente resolver una pregunta:

**¿qué ocurre cuando la información cambia en uno de los dos lados?**

Para ello construí una capa de sincronización entre la base de datos del CRM y Moodle.

La plataforma permitía ejecutar sincronizaciones manuales y también utilizaba procesos programados mediante **cron jobs**.

Conceptualmente:

`CRM`

↕︎

`Capa de sincronización`

↕︎

`Moodle API`

Esto permitía mantener alineada la información necesaria sin depender exclusivamente de acciones manuales.

La configuración de conexión con Moodle, incluyendo sus credenciales y secretos de integración, podía administrarse desde el propio sistema.

## Una identidad entre dos plataformas

Otro detalle importante de la experiencia era que, aunque técnicamente existieran dos sistemas, el estudiante no debía sentir que estaba administrando dos identidades completamente independientes.

Desde el panel administrativo era posible gestionar las credenciales y sincronizar cambios de contraseña entre la plataforma y Moodle.

El objetivo era reducir una fricción habitual en ecosistemas compuestos por varias aplicaciones:

> "¿Cuál contraseña era la de esta plataforma?"

La integración debía sentirse lo más transparente posible para el usuario.

## Gestión financiera

Una vez creada una matrícula, el sistema generaba las obligaciones correspondientes según los rubros configurados en el curso.

El administrador podía visualizar la situación financiera del estudiante y registrar pagos sobre las deudas existentes.

El registro de un pago podía incluir:

- Monto.
- Descuento.
- Comprobante.
- Información asociada a la deuda.
- Estado del pago.

Esto permitió convertir la plataforma también en una herramienta para el seguimiento financiero de cada estudiante.

## El comprobante como workflow

Una transferencia bancaria no debía considerarse automáticamente un pago confirmado.

Por eso diseñé un pequeño workflow de conciliación.

Desde su cuenta, el estudiante podía seleccionar una deuda y cargar un comprobante de pago.

El sistema registraba la solicitud:

`Estudiante sube comprobante`

↓

`Pago pendiente de validación`

↓

`Administrador revisa`

↓

`Aprobar / Rechazar`

↓

`Actualizar deuda`

La diferencia entre **reportar un pago** y **confirmar un pago** era importante.

Permitía ofrecer autogestión al estudiante sin perder control administrativo.

## Portal del estudiante

La plataforma también tenía una experiencia específica para el estudiante.

Después de iniciar sesión podía consultar los cursos en los que estaba matriculado y revisar su situación financiera.

Cada curso funcionaba también como punto de acceso al aula virtual.

Al seleccionarlo, el estudiante podía continuar hacia el curso correspondiente en Moodle.

La experiencia buscaba reunir dos perspectivas que normalmente aparecen separadas:

**¿Qué estoy estudiando?**

y:

**¿Qué tengo pendiente de pagar?**

Desde el mismo espacio podía consultar:

- Cursos activos.
- Acceso al aula virtual.
- Obligaciones financieras.
- Deuda pendiente.
- Pagos.
- Comprobantes.

## Comunicaciones automatizadas

Otra parte importante del sistema era evitar que procesos repetitivos dependieran de correos redactados manualmente.

Construí un sistema de **plantillas de correo configurables**.

Las plantillas podían incluir variables que la aplicación reemplazaba automáticamente con información del estudiante, curso o proceso correspondiente.

Por ejemplo, cuando ocurría una matrícula:

`Nueva matrícula`

↓

`Seleccionar template`

↓

`Reemplazar variables`

↓

`Enviar correo`

De esta forma, las comunicaciones se convertían también en consecuencia de eventos dentro de la plataforma.

La misma arquitectura podía utilizarse para diferentes tipos de mensajes relacionados con el ciclo del estudiante.

## Dashboard administrativo

El administrador necesitaba entender lo que estaba ocurriendo sin recorrer estudiante por estudiante.

Por eso la plataforma incorporaba un dashboard que concentraba información relevante de la operación.

El objetivo no era solamente mostrar cifras, sino proporcionar una vista rápida sobre las diferentes dimensiones del negocio:

+ `Comercial`

+ `Académica`

+ `Financiera`

Al combinar estos datos en una misma aplicación era posible tener una perspectiva que Moodle por sí solo no proporcionaba.

## Un expediente alrededor del estudiante

Una de las consecuencias más útiles de conectar todos estos procesos fue que el estudiante dejó de ser simplemente un usuario dentro de Moodle.

Dentro del CRM podía convertirse en una entidad mucho más completa.

Su registro podía relacionar:

`Estudiante`

↓

`Cursos`

↓

`Matrículas`

↓

`Planes financieros`

↓

`Cuotas`

↓

`Pagos`

↓

`Comprobantes`

↓

`Comunicaciones`

↓

`Cuenta Moodle`

Esto permitió construir una visión administrativa del estudiante complementaria a la visión académica que ya proporcionaba el LMS.

## Decisión clave: integrar en lugar de duplicar

Durante todo el desarrollo existía la tentación de reconstruir funcionalidades que ya existían dentro de Moodle.

Evitarlo fue una decisión importante.

El CRM no necesitaba convertirse también en un LMS.

Necesitaba saber **cómo hablar con uno**.

Eso redujo enormemente el alcance innecesario del producto y permitió concentrar el desarrollo personalizado en aquello que realmente aportaba valor:

- Pipelines.
- Conversión.
- Matrículas.
- Finanzas.
- Pagos.
- Automatización.
- Integración.

La arquitectura se volvió una composición de sistemas especializados en lugar de una aplicación intentando resolver absolutamente todo.

## Arquitectura técnica

El CRM fue desarrollado con **Laravel** y **MySQL**.

La aplicación se desplegó utilizando **Docker**, permitiendo encapsular los diferentes componentes necesarios para ejecutar el sistema.

La integración con Moodle se realizaba mediante su API.

A nivel conceptual:

`Frontend CRM`

↓

`Laravel`

↓

`MySQL`

↙︎        ↘︎

`Moodle API`   `Servicios internos`

↓

`Cron Jobs / Sincronización`

La plataforma mantenía su propia información financiera y comercial mientras sincronizaba con Moodle aquellos datos necesarios para el funcionamiento académico.

## El resultado

El resultado fue una capa que extendía Moodle hacia áreas para las que originalmente no había sido diseñado.

Moodle continuaba siendo el centro de la experiencia académica.

Pero alrededor de él ahora existía un sistema capaz de gestionar:

`Prospectos`

↓

`Oportunidades`

↓

`Conversión`

↓

`Matrícula`

↓

`Plan financiero`

↓

`Moodle`

↓

`Pagos`

↓

`Seguimiento`

↓

`Autogestión`

La mayor mejora no consistía en una funcionalidad individual.

Era eliminar las interrupciones entre estos procesos.

Una venta ya no terminaba con:

> "Ahora alguien debe crear al estudiante en Moodle."

Una matrícula ya no terminaba con:

> "Ahora debemos crear manualmente las cuotas."

Un comprobante ya no dependía de:

> "Envíamelo por WhatsApp y luego revisamos."

Cada evento podía convertirse en el inicio del siguiente proceso.

## Lo que aprendí

Este proyecto reforzó una idea que aparece constantemente al trabajar con software empresarial:

**muchas veces no necesitas reemplazar el sistema principal; necesitas construir correctamente lo que falta alrededor de él.**

Moodle ya resolvía un problema extremadamente complejo: gestionar la experiencia académica.

Intentar reemplazarlo habría significado reconstruir años de funcionalidades que no constituían el verdadero problema.

El reto estaba en conectar Moodle con el ciclo comercial y financiero de una academia.

También fue un proyecto importante para entender cómo modelar procesos recurrentes.

Una mensualidad no es simplemente un pago.

Es una regla que genera obligaciones futuras.

Una matrícula no es simplemente asignar un curso.

Es un evento capaz de desencadenar creación de usuarios, sincronización, generación de deuda y comunicaciones.

Y una oportunidad ganada no es simplemente una tarjeta llegando al final de un Kanban.

Puede ser el evento que pone en marcha todo lo demás.

La evolución conceptual del sistema puede resumirse así:

`Lead`

↓

`CRM`

↓

`Conversión`

↓

`Matrícula`

↓

`Moodle`

↓

`Plan financiero`

↓

`Pagos`

↓

`Portal del estudiante`

El proyecto convirtió Moodle de una plataforma académica aislada en una pieza dentro de un **ecosistema comercial, académico y financiero conectado**.