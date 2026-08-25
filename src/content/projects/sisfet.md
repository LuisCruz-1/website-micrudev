
---
order: 5

title: "SISFET · Federación Ecuatoriana de Tenis"

subtitle: "Afiliaciones, torneos y ranking nacional conectados en una sola plataforma"

excerpt: "Un sistema desarrollado para digitalizar el ciclo del tenis federado: desde la afiliación de jugadores hasta las inscripciones, listas de aceptación, partidos, resultados y actualización del ranking nacional."

type: "Sports Management Platform"

year: 2024

client: "Federación Ecuatoriana de Tenis"

image: "../../../assets/img-projects/sisfet.png"

imageAlt: "Cancha de tenis representativa de la gestión de torneos y jugadores federados"

tech: ["Laravel", "PHP", "MySQL", "Blade", "Tailwind CSS", "PayPal API", "WordPress Plugin"]

featured: true
---

Gestionar una federación deportiva implica mucho más que publicar un calendario de torneos.

Un jugador necesita afiliarse, mantener información y documentación actualizada, realizar pagos, cumplir requisitos para determinadas categorías, inscribirse en competencias y posteriormente acumular resultados que afectan su posición dentro del ranking.

Al mismo tiempo, cada torneo tiene sus propias fechas, categorías, cuadros, inscripciones, listas de aceptación, partidos, resultados y reglas.

El objetivo de SISFET fue convertir todos esos procesos relacionados en **un solo sistema conectado para la Federación Ecuatoriana de Tenis**.

## El problema que resuelve

Gran parte de la operación de una federación depende de información que cambia constantemente.

Un jugador puede estar habilitado para competir hoy y no estarlo posteriormente.

Su categoría depende de características como edad y género.

Su acceso a un torneo puede depender de su afiliación.

Su posición en una lista de aceptación puede depender del ranking que tenía exactamente al momento del cierre.

Y el resultado de un torneo puede modificar nuevamente ese ranking.

Esto genera una cadena de dependencias:

`Jugador`

↓

`Afiliación`

↓

`Elegibilidad`

↓

`Torneo`

↓

`Inscripción`

↓

`Lista de aceptación`

↓

`Partidos`

↓

`Resultados`

↓

`Puntos`

↓

`Ranking`

El reto era conseguir que esos procesos dejaran de funcionar como registros independientes y se convirtieran en partes de un mismo ciclo.

## Lo que construí

Desarrollé SISFET, una plataforma en **Laravel y MySQL** para administrar el ciclo operativo de jugadores y torneos de la Federación Ecuatoriana de Tenis.

El sistema tiene dos grandes experiencias.

Por un lado, el jugador puede gestionar su afiliación, consultar su información, inscribirse en torneos para los que sea elegible, administrar pagos y revisar su actividad deportiva.

Por otro, el equipo administrativo puede controlar afiliados, roles, permisos, torneos, inscripciones, listas de aceptación, partidos, pagos, configuraciones y ranking.

Pero la parte más importante no son los módulos por separado.

Es que **una acción realizada en una parte del sistema puede convertirse en la entrada de la siguiente**.

## Decisión clave: modelar al jugador como una identidad única

El jugador es el centro del sistema.

Su expediente reúne información que posteriormente utilizan diferentes procesos:

- Datos personales.
- Fecha de nacimiento.
- Ubicación.
- Información de contacto.
- Tipo de afiliación.
- IPIN / NPID.
- Documentos.
- Estado de afiliación.
- Pagos.
- Torneos.
- Partidos.
- Ranking.

Esto evita mantener una versión diferente del mismo jugador para cada área.

La misma identidad puede participar en diferentes contextos:

+ `Perfil`

+ `Afiliación`

+ `Pagos`

+ `Torneos`

+ `Ranking`

El resultado es un expediente que permite entender no solamente quién es el jugador, sino también **su relación completa con la Federación**.

## Afiliación como puerta de entrada

Antes de participar en determinados procesos, el jugador necesita completar su afiliación.

Diseñé este proceso como un registro progresivo donde se recopilan los datos necesarios, documentación y pago correspondiente.

Conceptualmente:

`Crear cuenta`

↓

`Información personal`

↓

`Información de contacto`

↓

`Documentación`

↓

`Tipo de afiliación`

↓

`Pago`

↓

`Afiliación activa`

La plataforma puede manejar diferentes tipos de afiliación con sus propias condiciones y valores.

Una vez completado el proceso, la afiliación pasa a convertirse en una regla que otras partes de SISFET pueden consultar.

Por ejemplo, antes de permitir una inscripción a un torneo, el sistema puede verificar automáticamente si el jugador mantiene una afiliación válida.

## Decisión clave: convertir reglas deportivas en reglas de software

Uno de los retos más interesantes fue que no todos los jugadores pueden inscribirse en todos los eventos.

La plataforma necesita interpretar reglas propias del tenis federado.

Antes de habilitar una inscripción, SISFET puede analizar condiciones como:

- Afiliación activa.
- Categoría.
- Edad.
- Género.
- Inscripciones existentes.
- Restricciones específicas según el tipo o grado del torneo.

El usuario no necesita conocer la implementación de estas reglas.

Simplemente ve si puede participar y, cuando no puede hacerlo, el sistema conoce la razón.

Esto convierte parte del reglamento operativo en lógica verificable por software.

## El torneo como un ciclo de vida

El módulo central del proyecto es la gestión de torneos.

Un torneo no es simplemente un registro con nombre y fecha.

Puede contener:

- Sede.
- Club.
- Fechas.
- Director.
- Supervisor.
- Coordinador.
- Información logística.
- Tipo.
- Grado.
- Categorías.
- Eventos.
- Tamaño de cuadros.
- Cupos para Wildcards.
- Fechas límite de inscripción y retiro.

A partir de esa configuración comienza un ciclo completo:

`Crear torneo`

↓

`Publicar`

↓

`Recibir inscripciones`

↓

`Cerrar inscripciones`

↓

`Procesar listas`

↓

`Gestionar partidos`

↓

`Registrar resultados`

↓

`Cerrar puntos`

↓

`Actualizar ranking`

La aplicación fue diseñada alrededor de este ciclo y no solamente alrededor del CRUD del torneo.

## Decisión clave: congelar el ranking al cierre

Este fue uno de los problemas de negocio más interesantes del proyecto.

El ranking nacional cambia con el tiempo.

Pero una lista de aceptación debe construirse utilizando la posición que cada jugador tenía **cuando cerraron las inscripciones**, no necesariamente la posición que tenga varios días después.

Para resolverlo implementé un patrón de **snapshot**.

Cuando se procesan las listas, SISFET guarda:

`ranking_al_cierre`

y:

`puntos_al_cierre`

para cada inscripción.

De esta manera:

`Ranking actual del jugador`

↓

`Cierre de inscripciones`

↓

`Snapshot`

↓

`Ranking del torneo queda congelado`

Aunque posteriormente cambie el ranking nacional, la lógica utilizada para construir aquella lista de aceptación permanece reproducible.

Esto agrega trazabilidad a una decisión deportiva importante.

## Procesamiento automático de listas de aceptación

Una vez cerradas las inscripciones, el sistema puede procesar automáticamente a los jugadores utilizando su ranking congelado.

El flujo simplificado es:

`Inscritos`

↓

`Ordenar por ranking`

↓

`Asignar cupos`

↓

`Main Draw / Qualy / Alternantes`

Los jugadores mejor posicionados ocupan los cupos disponibles del cuadro principal.

Los siguientes pueden pasar a **Qualy**.

El resto queda organizado como **Alternantes**.

El resultado genera automáticamente las principales condiciones de entrada:

- **DA** — Direct Acceptance.
- **Q** — Qualy.
- **ALT** — Alternante.
- **WC** — Wildcard.
- **SE** — Special Exempt.

Esto transforma lo que podría ser un proceso manual de revisar rankings, ordenar jugadores y distribuir cupos en una operación reproducible por el sistema.

## Decisión clave: permitir intervención sin perder la lógica

Automatizar una lista no significa eliminar las decisiones administrativas.

Después de procesarla, los responsables todavía necesitan gestionar situaciones especiales.

Por ejemplo, existen cupos de **Wildcard**.

SISFET permite seleccionar un jugador de la lista de alternantes y convertir su condición en WC.

También puede existir una baja que libere un cupo.

En esos casos, el sistema puede reorganizar las posiciones para mantener la consistencia de Main Draw, Qualy y Alternantes.

La idea fue encontrar un equilibrio:

**automatizar las reglas repetibles sin impedir las decisiones deportivas que necesitan intervención humana.**

## Del torneo a los partidos

Una vez definidas las listas, la operación continúa dentro de la misma plataforma.

El panel de partidos permite administrar encuentros, rondas, resultados y ganadores.

El sistema contempla además situaciones propias de una competencia, como los **BYE**, donde un jugador puede avanzar automáticamente.

Esto significa que la información no termina cuando se publica una lista.

Continúa avanzando:

`Lista de aceptación`

↓

`Cuadro`

↓

`Partidos`

↓

`Rondas`

↓

`Resultados`

↓

`Puntos`

## Decisión clave: el torneo debía alimentar automáticamente el ranking

El ranking nacional no debía convertirse en otro archivo independiente que alguien actualizara manualmente después de cada competencia.

Los resultados finales de los torneos se almacenan como información estructurada y posteriormente alimentan el motor de ranking.

El sistema trabaja con una ventana móvil de **52 semanas** y aplica una regla de **Mejor de 4**, utilizando los mejores resultados correspondientes para calcular los puntos acumulados.

Conceptualmente:

`Resultados de torneos`

↓

`Ventana de 52 semanas`

↓

`Seleccionar mejores resultados`

↓

`Calcular puntos`

↓

`Generar ranking`

De esta forma, el ranking deja de ser una tabla aislada y se convierte en el resultado de todo lo ocurrido anteriormente en SISFET.

## El ranking también influye en el futuro

Existe además una relación circular interesante.

Los torneos generan resultados.

Los resultados generan puntos.

Los puntos generan ranking.

Y ese ranking posteriormente vuelve a utilizarse para las listas de aceptación de futuros torneos.

`Torneos`

↓

`Resultados`

↓

`Ranking`

↓

`Nuevos torneos`

↓

`Listas de aceptación`

↓

`Resultados`

↓

`Ranking`

Diseñar correctamente ese ciclo fue mucho más importante que cualquiera de sus pantallas individuales.

## Retiros, penalidades y excepciones

Los procesos deportivos tampoco siguen siempre el camino ideal.

Un jugador puede retirarse antes o después de una fecha límite.

SISFET distingue esos escenarios.

Un retiro dentro del plazo puede registrarse sin penalidad.

Un retiro tardío puede generar una sanción o penalidad.

Pero también existe una excepción: el jugador puede presentar una justificación médica.

El flujo puede convertirse entonces en:

`Retiro tardío`

↓

`Penalidad`

↓

`Jugador carga justificación`

↓

`Administrador revisa`

↓

`Aprobar / Rechazar`

↓

`Mantener o eliminar penalidad`

Este tipo de procesos fue importante porque el sistema debía representar no solo la regla general, sino también las excepciones previstas por la operación real.

## Portal del jugador

El jugador cuenta con su propia experiencia dentro de SISFET.

Desde allí puede gestionar aspectos como:

- Perfil.
- Datos de acceso.
- Afiliación.
- Documentos.
- Pagos.
- Torneos disponibles.
- Torneos inscritos.
- Retiros.
- Justificaciones.
- Partidos jugados.
- Ranking.

Al consultar un torneo, el sistema analiza automáticamente si el jugador cumple las condiciones necesarias para participar.

Si aplica, puede realizar su inscripción desde la misma plataforma.

Esto reduce la dependencia de procesos externos para pasar de:

`Quiero participar`

a:

`Estoy registrado en el torneo`

## Gestión de pagos

Los pagos forman parte tanto del proceso de afiliación como de los torneos.

El sistema mantiene un historial financiero relacionado directamente con cada jugador.

En los casos donde corresponde, el usuario puede cargar un comprobante y el administrador posteriormente aprobar o rechazar el pago.

Esto permite que el estado financiero forme parte de las mismas reglas que utiliza el resto del sistema.

Por ejemplo:

`Pago`

↓

`Afiliación activa`

↓

`Jugador habilitado`

↓

`Inscripción`

No se trata únicamente de registrar una transacción, sino de utilizarla como parte del estado operativo del jugador.

## Roles y permisos

Una federación tiene diferentes tipos de usuarios administrativos y no todos deben tener acceso a las mismas acciones.

Por eso SISFET incorpora un sistema de roles y permisos configurables.

En lugar de depender únicamente de perfiles fijos escritos en el código, es posible relacionar usuarios con roles y establecer qué operaciones puede realizar cada uno.

Esto permite separar responsabilidades sobre áreas como:

- Afiliados.
- Torneos.
- Inscripciones.
- Ranking.
- Pagos.
- Configuración.

La autorización se convierte así en parte del propio modelo administrativo.

## Una capa pública separada del sistema administrativo

Otra decisión importante fue no limitar los datos de SISFET al panel interno.

La plataforma expone información mediante una **API**, permitiendo que otras interfaces puedan consumir datos relacionados con jugadores y torneos.

Sobre esta idea también desarrollé un **plugin para WordPress**.

El plugin permite instalar una capa de presentación sobre un sitio WordPress y utilizar shortcodes para mostrar información proveniente del ecosistema FET.

Entre otros casos, pueden mostrarse:

- Listados de torneos.
- Información de un torneo.
- Fichas de jugadores.
- Información pública relacionada con competencias.
- Order of Play.

La separación puede entenderse así:

`SISFET`

↓

`API / datos`

↓

`Plugin WordPress`

↓

`Sitio público FET`

Esto permitió mantener la lógica operativa dentro del sistema principal mientras el sitio institucional funcionaba como una capa de publicación.

## Decisión clave: una sola fuente, múltiples interfaces

La integración con el sitio público responde a otro principio que utilicé durante el proyecto:

**la información no debería mantenerse manualmente dos veces.**

Si un torneo ya está registrado en SISFET, no debería ser necesario volver a escribir sus datos en WordPress.

Si el sistema ya conoce la ficha y ranking de un jugador, el sitio público debería poder consumir esa información.

La arquitectura permite entonces tener diferentes interfaces sobre una misma fuente:

`Administrador`

→ SISFET

`Jugador`

→ SISFET

`Sitio web`

→ API / Plugin

pero todos trabajando alrededor de la misma información.

## Configuración en lugar de valores rígidos

Muchas reglas del tenis pueden cambiar según el tipo de competencia.

Por eso una parte importante del sistema se construyó mediante catálogos configurables.

Desde administración pueden gestionarse elementos como:

- Directores.
- Supervisores.
- Coordinadores.
- Clubes.
- Tipos de torneo.
- Categorías.
- Grados.
- Configuración de puntos.
- Penalidades.

Esto permite que el producto represente diferentes escenarios sin necesitar modificar el código cada vez que cambia una característica operativa.

## Trazabilidad

Cuando una decisión afecta la posibilidad de que un jugador participe o su posición dentro de una competencia, es importante poder entender qué ocurrió.

Por eso diferentes acciones críticas del ciclo del torneo generan registros de actividad.

Esto permite responder preguntas como:

> ¿Cuándo se inscribió este jugador?

> ¿Con qué ranking fue procesado?

> ¿Por qué está como alternante?

> ¿Quién realizó esta baja?

> ¿Cuándo se asignó este Wildcard?

El sistema no debía almacenar únicamente el estado actual.

También debía proporcionar suficiente contexto para reconstruir **cómo llegó a ese estado**.

## Arquitectura técnica

SISFET fue desarrollado principalmente como una aplicación web monolítica utilizando:

- **Laravel 11 / PHP** para backend y lógica de negocio.
- **MySQL / MariaDB** como capa de persistencia.
- **Blade** para las vistas.
- **Tailwind CSS** para la interfaz.
- **JavaScript y AJAX** para interacciones dinámicas.
- **PayPal API** para determinados flujos de pago.
- **Laravel Sanctum** para capacidades relacionadas con API.
- **Excel / PDF exports** para documentación y reportes.
- **QR** para credenciales.
- **API propia** para publicación de información.
- **Plugin WordPress** como capa de integración con el sitio público.

El proyecto fue construido alrededor de un modelo relacional donde jugadores, afiliaciones, pagos, torneos, eventos, inscripciones, partidos, resultados y ranking permanecen conectados.

## El resultado

SISFET convirtió diferentes procesos propios del tenis federado en un flujo digital continuo.

Antes de pensar en módulos, el sistema puede resumirse mediante una pregunta:

**¿Cuál es el ciclo completo de un jugador dentro de la Federación?**

La respuesta es:

`Registrarse`

↓

`Afiliarse`

↓

`Mantener perfil y documentación`

↓

`Encontrar torneo`

↓

`Validar elegibilidad`

↓

`Inscribirse`

↓

`Entrar en una lista de aceptación`

↓

`Competir`

↓

`Registrar resultados`

↓

`Obtener puntos`

↓

`Actualizar ranking`

↓

`Utilizar ese ranking en nuevos torneos`

El resultado más importante fue que todos estos pasos dejaron de representar procesos independientes.

Pasaron a formar parte de **un mismo modelo de información**.

## Lo que aprendí

Este proyecto fue especialmente interesante porque obligó a traducir reglas de un deporte a reglas de software.

Conceptos como:

`DA`

`Qualy`

`Alternantes`

`Wildcards`

`BYE`

`ranking al cierre`

`retiro tardío`

`Mejor de 4`

`ventana de 52 semanas`

no son simplemente campos dentro de una base de datos.

Representan reglas que modifican el comportamiento de todo el sistema.

Aprendí que, en productos especializados, entender el dominio puede ser tan importante como elegir la tecnología.

También reforcé una idea que aparece en varios de mis proyectos:

**el verdadero valor aparece cuando los módulos dejan de ser módulos y comienzan a alimentarse entre sí.**

En SISFET:

la afiliación habilita al jugador,

el jugador se inscribe,

el ranking determina su entrada,

el torneo produce resultados,

los resultados producen puntos,

los puntos modifican el ranking,

y el nuevo ranking vuelve a influir en el siguiente torneo.

Ese ciclo es lo que convierte a SISFET de un sistema administrativo en una **plataforma para operar digitalmente una parte importante del ecosistema de la Federación Ecuatoriana de Tenis**.
