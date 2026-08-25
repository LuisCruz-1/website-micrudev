
---
order: 3

title: "ANVYS"

subtitle: "Un asistente de voz con IA conectado a datos reales del colegio"

excerpt: "Una Alexa Skill que combina lenguaje natural, OpenAI y la API de Idukay para convertir la voz en una interfaz inteligente de consulta sobre información institucional."

type: "Voice AI assistant"

year: 2024

client: "Colegio ANAVI"

image: "../../../assets/img-projects/alexa.png"

imageAlt: "Dispositivo inteligente conectado a servicios de inteligencia artificial"

tech: ["Alexa Skills Kit", "Node.js", "BuildShip", "OpenAI Assistants API", "Idukay API"]

featured: false
---

Anvys nació a partir de una idea sencilla:

**¿Qué pasaría si consultar información del colegio pudiera ser tan natural como hacer una pregunta en voz alta?**

Las Alexa Skills tradicionales suelen depender de intents, frases predefinidas y estructuras relativamente rígidas.

Quería construir algo diferente.

Una habilidad que pudiera mantener una conversación abierta, interpretar preguntas mediante inteligencia artificial y, cuando fuera necesario, consultar información real almacenada en los sistemas del colegio.

El resultado fue **Anvys**, un asistente de voz construido sobre Alexa, OpenAI, BuildShip e Idukay.

## El problema que quería resolver

Una interfaz administrativa funciona bien cuando el usuario sabe dónde está la información que necesita.

Pero muchas consultas cotidianas comienzan simplemente con una pregunta.

Por ejemplo:

> ¿Cuál es el correo del representante de este estudiante?

> ¿Qué información tenemos registrada sobre este alumno?

En una plataforma tradicional, responder puede implicar iniciar sesión, buscar el módulo correcto, localizar al estudiante y revisar diferentes campos.

La idea detrás de Anvys era eliminar esa navegación cuando no fuera necesaria.

`Pregunta → información`

en lugar de:

`Pregunta → abrir sistema → buscar módulo → aplicar filtros → localizar registro → obtener información`

La voz podía convertirse en una nueva interfaz para acceder a los datos.

## Lo que construí

Desarrollé una **Alexa Skill personalizada** capaz de recibir preguntas abiertas y enviarlas a un asistente de OpenAI.

La diferencia frente a una skill convencional era que la conversación no dependía exclusivamente de una colección de comandos previamente programados.

Después de activar Anvys, el usuario podía realizar una pregunta utilizando lenguaje natural.

El flujo principal era:

`Usuario`

↓

`Alexa`

↓

`Alexa Skill`

↓

`BuildShip`

↓

`OpenAI Assistant`

↓

`Respuesta`

↓

`Alexa`

Pero la arquitectura tenía una segunda capacidad mucho más interesante.

OpenAI también podía determinar cuándo una pregunta necesitaba información proveniente de un sistema externo.

En esos casos, el backend ejecutaba funciones conectadas con la **API de Idukay**, la plataforma de gestión académica utilizada por el Colegio ANAVI.

El flujo entonces cambiaba:

`Pregunta por voz`

↓

`Alexa Skill`

↓

`BuildShip`

↓

`OpenAI Assistant`

↓

`Function Calling`

↓

`Idukay API`

↓

`Datos del colegio`

↓

`OpenAI`

↓

`Respuesta conversacional`

↓

`Alexa`

Esto permitía utilizar la misma interfaz tanto para preguntas generales como para consultas relacionadas con información institucional.

## De comandos rígidos a lenguaje natural

Uno de los objetivos principales del proyecto era evitar que el usuario tuviera que memorizar comandos específicos.

Una Alexa Skill convencional podría requerir expresiones diseñadas previamente como:

`buscar estudiante`

o:

`consultar representante`

Anvys utilizaba un enfoque distinto.

La skill capturaba la consulta del usuario y delegaba su interpretación al asistente de OpenAI.

Esto permitía formular una misma intención de distintas maneras.

La lógica dejó de depender exclusivamente de:

`frase → intent`

y comenzó a funcionar como:

`lenguaje natural → interpretación → acción`

Ese cambio hizo que la experiencia se sintiera mucho más cercana a conversar con un asistente que a utilizar un menú mediante voz.

## Decisión clave: separar la interfaz de voz de la inteligencia

No quería colocar toda la lógica dentro de la Alexa Skill.

La responsabilidad de Alexa debía mantenerse relativamente sencilla:

- Capturar la voz.
- Obtener la consulta.
- Enviarla al backend.
- Reproducir la respuesta.

La lógica más compleja quedó en **BuildShip**.

Esto permitió separar claramente las responsabilidades:

`Alexa = interfaz`

`BuildShip = orquestación`

`OpenAI = interpretación`

`Idukay = datos`

La skill realizaba una petición HTTP al workflow de BuildShip incluyendo información como la consulta, el identificador del asistente y el thread de conversación.

BuildShip podía entonces coordinar el resto del proceso sin convertir el código de Alexa en una capa excesivamente compleja.

## Decisión clave: mantener el contexto de la conversación

Cuando el usuario activaba Anvys, la skill creaba un nuevo **thread** para la conversación con OpenAI.

Las siguientes consultas continuaban utilizando ese mismo contexto.

Esto permitía que la interacción no estuviera compuesta únicamente por preguntas aisladas.

El asistente podía mantener continuidad durante la sesión.

Conceptualmente:

`Activar Anvys`

↓

`Crear thread`

↓

`Pregunta 1`

↓

`Respuesta`

↓

`Pregunta 2`

↓

`Mismo contexto`

↓

`Respuesta`

La voz dejaba así de ser una sucesión de comandos independientes y pasaba a comportarse como una conversación.

## Decisión clave: usar IA solo cuando tenía sentido

Conectar OpenAI con Idukay no significaba enviar todas las consultas directamente al sistema académico.

El asistente debía determinar qué herramienta necesitaba utilizar.

Una pregunta general podía resolverse directamente mediante OpenAI.

Una pregunta relacionada con información del colegio podía requerir una función.

Por ejemplo:

`Pregunta general`

↓

`OpenAI`

↓

`Respuesta`

Mientras que:

`Pregunta sobre un estudiante`

↓

`OpenAI detecta la necesidad de datos`

↓

`Ejecutar función`

↓

`Consultar Idukay API`

↓

`Devolver datos`

↓

`OpenAI construye respuesta`

Esta separación era importante porque permitía mantener una única experiencia conversacional mientras diferentes sistemas trabajaban detrás de ella.

El usuario no necesitaba saber qué API estaba siendo utilizada.

Simplemente hacía una pregunta.

## El reto más interesante: Alexa no puede esperar indefinidamente

Uno de los principales desafíos técnicos apareció por la naturaleza de una interfaz de voz.

Una aplicación web puede mostrar un loader mientras espera.

Alexa necesita responder dentro de una ventana de tiempo limitada.

Pero una consulta que involucraba:

`Alexa → BuildShip → OpenAI → función → Idukay → OpenAI → BuildShip → Alexa`

podía ocasionalmente tardar más de lo deseado.

Esperar indefinidamente no era una opción porque la solicitud de Alexa terminaría fallando.

La solución fue diseñar un mecanismo específico para manejar respuestas lentas.

## Diseñar alrededor del timeout

En la skill implementé un límite de aproximadamente **7.5 segundos** para las peticiones al backend.

Si BuildShip respondía dentro de ese tiempo, el funcionamiento era normal:

`Pregunta`

↓

`Procesamiento`

↓

`Respuesta inmediata`

Pero si la petición superaba ese límite, la skill abortaba la espera y Alexa respondía:

> Estoy procesando tu respuesta, consúltala en unos segundos.

La conversación no terminaba en un error.

El sistema simplemente cambiaba de estrategia.

`Pregunta`

↓

`Procesamiento supera el límite`

↓

`Alexa informa que continúa procesándose`

↓

`Respuesta queda pendiente`

↓

`Usuario consulta nuevamente`

↓

`Sistema recupera respuesta`

Este comportamiento convirtió una limitación técnica en un estado válido dentro de la experiencia.

## Respuestas pendientes

Para soportar ese flujo desarrollé una lógica específica dentro de la skill.

El sistema mantenía información sobre:

- El thread activo.
- La cantidad de mensajes.
- Si existía una respuesta pendiente.
- La posición del mensaje pendiente.

Cuando Alexa había dejado de esperar una respuesta, el usuario podía posteriormente solicitar comprobarla.

La skill realizaba entonces una nueva llamada a BuildShip utilizando un modo diferente:

`checkPendingResponse = true`

Si el procesamiento todavía no había terminado, Alexa indicaba que la respuesta seguía pendiente.

Si ya estaba disponible, la recuperaba y continuaba normalmente la conversación.

Esto evitaba que una operación lenta rompiera completamente la experiencia.

## Diseñar para degradar con elegancia

Esta fue probablemente una de las decisiones más importantes del proyecto.

En sistemas distribuidos, no todas las dependencias tienen los mismos tiempos de respuesta.

Anvys dependía potencialmente de varias capas:

`Alexa`

`BuildShip`

`OpenAI`

`Idukay`

Un retraso en cualquiera de ellas podía afectar la experiencia completa.

En lugar de asumir que todas las respuestas serían inmediatas, diseñé el sistema considerando que algunas operaciones podían tardar.

La experiencia tenía entonces tres posibles resultados:

**Respuesta disponible**

`Pregunta → respuesta`

**Respuesta todavía procesándose**

`Pregunta → aviso → consultar posteriormente`

**Error real**

`Pregunta → mensaje de recuperación`

Ese enfoque evitaba exponer directamente errores técnicos al usuario.

## BuildShip como capa de orquestación

BuildShip funcionaba como el punto donde convergían las diferentes integraciones.

Desde allí podía procesarse la petición proveniente de Alexa, interactuar con OpenAI y ejecutar consultas adicionales cuando el asistente requería información externa.

Esto permitió desacoplar la interfaz del resto de servicios.

La arquitectura podía entenderse así:

`Alexa Skills Kit`

↓

`Node.js`

↓

`HTTP`

↓

`BuildShip`

↙︎       ↓       ↘︎

`OpenAI` `Lógica` `Idukay API`

↓

`Respuesta`

↓

`Alexa`

La ventaja de este enfoque era que la evolución del asistente no dependía exclusivamente de modificar y desplegar nuevamente toda la lógica de la skill.

## La API de Idukay como herramienta del asistente

La integración con Idukay transformó Anvys de un asistente general en un asistente conectado al contexto real del colegio.

A través de funciones disponibles para OpenAI, el sistema podía ejecutar operaciones específicas para recuperar información académica.

El modelo decidía cuándo era necesario utilizar esas herramientas y utilizaba posteriormente el resultado para formular una respuesta comprensible.

Esto introducía una separación importante entre dos responsabilidades:

**OpenAI entendía la intención.**

**Idukay proporcionaba el dato.**

La respuesta final combinaba ambas capacidades.

## El resultado

Anvys demostró que una interfaz de voz podía utilizarse como una capa inteligente sobre sistemas institucionales existentes.

El proyecto conectó:

+ `Voz`

+ `Lenguaje natural`

+ `Function Calling`

+ `APIs institucionales`

dentro de una única conversación.

El resultado no fue simplemente una Alexa Skill capaz de responder preguntas.

Fue un experimento sobre una forma diferente de interactuar con software empresarial.

En lugar de que el usuario tuviera que aprender dónde está cada función dentro de una aplicación, el sistema intentaba comprender **qué necesitaba hacer el usuario**.

## Lo que aprendí

Uno de los aprendizajes más importantes fue que integrar inteligencia artificial es solamente una parte del problema.

En una experiencia de voz también importan enormemente:

- La latencia.
- Los límites de ejecución.
- El manejo de contexto.
- Los fallos de servicios externos.
- La continuidad de la conversación.
- La forma de comunicar que una operación todavía no terminó.

También confirmé que los modelos de lenguaje se vuelven mucho más útiles cuando pueden conectarse con herramientas.

OpenAI por sí solo podía mantener una conversación.

Pero al proporcionarle funciones conectadas con Idukay podía empezar a **actuar sobre el contexto real de la institución**.

La evolución conceptual del proyecto fue:

`Alexa Skill`

↓

`Preguntas abiertas`

↓

`OpenAI Assistant`

↓

`Conversaciones con contexto`

↓

`Function Calling`

↓

`Idukay API`

↓

`Datos institucionales en tiempo real`

↓

`Manejo de procesos asíncronos`

↓

`Asistente de voz conectado al colegio`

Anvys fue, en esencia, una exploración de cómo **la voz y la inteligencia artificial pueden convertirse en una interfaz universal sobre sistemas que originalmente nunca fueron diseñados para ser utilizados mediante conversación**.
