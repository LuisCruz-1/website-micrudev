
---
order: 2

title: "Plataforma de Reclutamiento · ACM-1"

subtitle: "Un proceso de selección masivo convertido en un workflow digital trazable"

excerpt: "Una plataforma de reclutamiento que gestionó alrededor de 80.000 aspirantes mediante validaciones automáticas, evaluaciones por fases, comunicaciones y herramientas desarrolladas a medida."

type: "Recruitment platform"

year: 2025

client: "Guayaquil Segura EP"

image: "../../../assets/img-projects/acm.png"

imageAlt: "Personas participando en un proceso de selección y evaluación"

tech: ["WordPress", "Gravity Forms", "Gravity Flow", "AWS", "Custom Development"]

featured: true
---

El reto no era crear un formulario de inscripción.

Era construir una plataforma capaz de organizar un **proceso público de reclutamiento con decenas de miles de aspirantes**, múltiples fases de evaluación, reglas de elegibilidad, documentos, evaluadores, citas, resultados y comunicaciones.

La plataforma fue desarrollada para gestionar el proceso de selección de aspirantes a **Agentes de Control Municipal (ACM-1)** y llegó a recibir alrededor de **80.000 postulaciones**.

## El problema que resuelve

Un proceso de selección de esta magnitud genera una cantidad considerable de información.

Cada aspirante debía proporcionar datos personales, demostrar que cumplía determinados requisitos, cargar documentación y posteriormente avanzar por diferentes evaluaciones.

Pero no todos podían pasar automáticamente a la siguiente etapa.

Cada fase tenía sus propias reglas.

Un postulante podía:

`Registrarse → Calificar → Avanzar`

pero también:

`Registrarse → No cumplir requisito → Ser descalificado`

o:

`Ser evaluado → No aprobar → Apelar → Esperar resolución`

A esto se sumaban miles de documentos, resultados, citas, evaluadores y comunicaciones que debían mantenerse asociados correctamente con cada persona.

El problema no era solamente almacenar postulaciones.

Era **mantener el estado correcto de cada aspirante durante todo el proceso**.

## Lo que construimos

Construimos una plataforma web que acompañaba al aspirante desde su primera postulación hasta la publicación final de resultados.

El proceso comenzaba con un pre-registro.

El aspirante ingresaba su número de cédula y el sistema consultaba información del **Registro Civil** para validar sus datos y determinar automáticamente ciertos criterios de elegibilidad, incluyendo la edad.

Si cumplía las condiciones necesarias, podía continuar con el proceso.

A partir de ese momento, cada persona tenía un recorrido dentro de la plataforma.

`Pre-registro`

↓

`Validación`

↓

`Registro de requisitos`

↓

`Evaluaciones`

↓

`Pruebas y entrevistas`

↓

`Resultados`

Cada fase podía habilitar o detener automáticamente el avance hacia la siguiente.

## Diseñar un proceso, no una colección de formularios

Una de las decisiones más importantes fue entender que cada formulario era solamente una parte visible de un workflow mucho más grande.

El verdadero modelo era:

`Aspirante + Fase + Requisitos + Evaluación + Resultado + Estado`

Cada candidato debía encontrarse en un estado determinado del proceso y la plataforma tenía que saber qué acciones estaban disponibles para esa persona.

Si aprobaba una fase:

`Aprobado → habilitar siguiente fase`

Si no aprobaba:

`No aprobado → detener proceso`

Si existía la posibilidad de apelación:

`No aprobado → apelación → revisión → resolución`

Esto permitió convertir un procedimiento administrativo complejo en un flujo digital controlado.

## Decisión clave: filtrar desde el primer punto de entrada

Con decenas de miles de personas intentando participar, no tenía sentido permitir que todos avanzaran para posteriormente revisar manualmente condiciones que podían determinarse desde el inicio.

El pre-registro funcionaba como la primera capa de validación.

A partir de la cédula se realizaban consultas y verificaciones que permitían determinar si el aspirante cumplía condiciones básicas para continuar.

Por ejemplo, la edad podía calcularse y validarse automáticamente.

Esto permitió trasladar parte de la lógica de selección al propio sistema:

`Dato ingresado → validación → regla de negocio → decisión`

En lugar de:

`Dato ingresado → revisión manual → decisión`

Automatizar estas primeras reglas reducía trabajo posterior y evitaba que candidatos que no cumplían criterios básicos ingresaran innecesariamente a fases más complejas.

## Decisión clave: separar la experiencia del aspirante y del evaluador

La plataforma debía resolver dos experiencias completamente diferentes.

El **aspirante** necesitaba saber:

- En qué fase se encontraba.
- Qué información debía completar.
- Qué documentos debía cargar.
- Si había aprobado.
- Cuál era el siguiente paso.
- Cuándo y dónde debía presentarse.

El **evaluador** necesitaba otra perspectiva:

- Revisar postulantes.
- Validar documentos.
- Registrar observaciones.
- Asignar puntuaciones.
- Aprobar o descalificar.
- Consultar resultados consolidados.

Diseñar estos recorridos de manera independiente permitió reducir complejidad para ambos tipos de usuario.

El candidato veía solamente lo necesario para continuar.

El evaluador veía las herramientas necesarias para tomar una decisión.

## Decisión clave: convertir las fases en un workflow

Para gestionar el proceso utilizamos **Gravity Forms y Gravity Flow**, complementados con desarrollo personalizado.

Gravity Forms permitió construir diferentes puntos de captura de información, mientras que Gravity Flow proporcionó una base para administrar workflows de aprobación.

Sobre esa estructura desarrollamos reglas y comportamientos específicos necesarios para el proceso de selección.

La plataforma terminó funcionando como una máquina de estados:

`Fase actual → evaluación → resultado → acción → siguiente fase`

Esto fue especialmente importante porque las fases no eran solamente formularios consecutivos.

Incluían procesos como:

- Pre-registro.
- Validación documental.
- Evaluaciones académicas.
- Pruebas psicométricas.
- Exámenes médicos.
- Entrevistas psicológicas.
- Declaraciones juramentadas.
- Pruebas físicas.
- Entrevistas personales.
- Publicación de resultados.

Cada etapa tenía sus propias condiciones para determinar quién podía continuar.

## Decisión clave: automatizar la comunicación

En un proceso con decenas de miles de personas, comunicar manualmente cada resultado no era viable.

La plataforma generaba comunicaciones automáticas según las acciones realizadas dentro del workflow.

Por ejemplo:

`Evaluador aprueba`

↓

`Sistema actualiza estado`

↓

`Aspirante recibe notificación`

↓

`Siguiente fase queda disponible`

El mismo principio se utilizaba cuando una persona era rechazada o cuando necesitaba recibir instrucciones adicionales.

Los correos dejaron de ser un proceso paralelo y pasaron a formar parte del propio workflow.

## El reto de las evaluaciones

Algunas fases requerían evaluaciones académicas.

Para resolverlas desarrollamos un **plugin personalizado para WordPress** que permitía administrar un banco de preguntas.

Desde ese banco, el sistema podía construir evaluaciones seleccionando preguntas de forma aleatoria.

El objetivo era evitar que todos los postulantes recibieran necesariamente la misma combinación de preguntas y, al mismo tiempo, permitir que los administradores mantuvieran el contenido de las evaluaciones desde una interfaz centralizada.

El flujo era aproximadamente:

`Banco de preguntas`

↓

`Selección aleatoria`

↓

`Evaluación`

↓

`Respuestas`

↓

`Resultado`

Esta funcionalidad fue desarrollada específicamente para las necesidades del proyecto en lugar de intentar adaptar el proceso completo a un plugin genérico de cuestionarios.

## WordPress más allá de un CMS

Una de las decisiones técnicas interesantes del proyecto fue utilizar **WordPress como base de una aplicación transaccional**, no simplemente como gestor de contenidos.

WordPress proporcionó la plataforma y ecosistema inicial.

Gravity Forms resolvió gran parte de la captura estructurada de datos.

Gravity Flow ayudó a modelar procesos de aprobación.

Y el desarrollo personalizado cubrió aquellas reglas que eran específicas del proceso.

La arquitectura terminó combinando:

+ `WordPress`

+ `Gravity Forms`

+ `Gravity Flow`

+ `Plugins y código personalizado`

+ `AWS`

La clave estuvo en no depender exclusivamente de las capacidades estándar de cada herramienta, sino utilizarlas como piezas de una solución mayor.

## El reto de la escala

El volumen cambió completamente las decisiones del proyecto.

No estábamos construyendo una aplicación para cien o quinientos usuarios.

Durante el proceso se registraron alrededor de **80.000 aspirantes**.

La arquitectura contemplaba además un sistema de autenticación preparado para manejar hasta **100.000 usuarios** y escenarios de miles de postulantes interactuando con la plataforma simultáneamente.

Por esta razón utilizamos infraestructura y servicios de **AWS** para soportar el backend y las necesidades operativas de la solución.

En este proyecto, rendimiento y disponibilidad no eran mejoras futuras.

Eran parte del problema desde el inicio.

## Diseñar también para los casos excepcionales

Un workflow de selección no puede asumir que todos los usuarios simplemente aprueban o reprueban.

También existen excepciones.

Una de ellas eran las **apelaciones**.

Cuando un aspirante no aprobaba una fase determinada, el sistema debía permitir iniciar el proceso correspondiente, conservar la información y posteriormente registrar la resolución.

Esto añadió otra dimensión al workflow:

`Evaluación`

↓

`No aprobado`

↓

`Apelación`

↓

`Revisión`

↓

`Resolución`

↓

`Avanza / Finaliza`

Diseñar estos escenarios fue importante porque un sistema administrativo real no funciona únicamente alrededor del camino ideal.

## Trazabilidad como requisito de producto

El proceso involucraba decisiones que afectaban directamente la continuidad de miles de personas dentro de una convocatoria pública.

Por eso era importante poder reconstruir qué había ocurrido.

La plataforma debía conservar información sobre:

- Datos proporcionados por el aspirante.
- Documentos cargados.
- Fases completadas.
- Evaluaciones realizadas.
- Puntajes.
- Observaciones.
- Estados.
- Resultados.
- Apelaciones.
- Comunicaciones.

Además de facilitar la operación diaria, esta estructura permitía consolidar resultados y generar información para revisión y auditoría.

## El resultado

El resultado fue una plataforma capaz de convertir un proceso administrativo de gran escala en un workflow digital centralizado.

Alrededor de **80.000 aspirantes** pudieron ingresar al proceso a través de una misma solución.

La plataforma permitió conectar:

`Registro`

↓

`Validación`

↓

`Documentación`

↓

`Evaluadores`

↓

`Puntuaciones`

↓

`Aprobaciones`

↓

`Evaluaciones`

↓

`Apelaciones`

↓

`Resultados`

en un único sistema.

Pero el principal resultado no fue simplemente haber digitalizado formularios.

Fue lograr que **cada aspirante tuviera un estado, un historial y un siguiente paso determinado por las reglas del proceso**.

## Lo que aprendí

Este proyecto cambió mi percepción sobre lo que significa construir sobre WordPress.

La complejidad de una aplicación no está necesariamente determinada por el framework utilizado.

Está determinada por los problemas que tiene que resolver.

Aquí el desafío estaba en modelar correctamente un proceso con decenas de miles de usuarios, múltiples actores, reglas de elegibilidad, documentos, evaluaciones, decisiones y excepciones.

También reforzó una idea que posteriormente he aplicado en otros proyectos:

**un workflow bien diseñado puede ser más importante que la interfaz que lo contiene.**

El aspirante veía formularios, estados y resultados.

Detrás existía un sistema encargado de decidir:

`quién puede continuar`

`qué debe hacer después`

`quién debe evaluarlo`

`qué información debe recibir`

`y cuál es el estado actual de su proceso`

Lo que desde fuera podía parecer una plataforma de postulaciones era, en realidad, un **motor de procesos para administrar una convocatoria pública de gran escala**.