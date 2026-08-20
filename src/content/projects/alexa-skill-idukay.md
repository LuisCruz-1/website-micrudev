---
order: 4
title: "Alexa Skill · Idukay"
subtitle: "Acceso por voz a datos de estudiantes mediante Alexa e IA"
excerpt: "Una experiencia de voz que conecta Alexa, OpenAI Assistant e Idukay para consultar información estudiantil de forma dinámica."
type: "Voice app"
year: 2024
client: "Colegio ANAVI"
image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=85"
imageAlt: "Imagen representativa de tecnología e integraciones"
tech: ["Alexa Skills Kit", "Node.js", "Idukay API"]
featured: false
---

Este proyecto consistió en el desarrollo de una Alexa Skill personalizada para proporcionar acceso por voz a información de estudiantes del Colegio ANAVI.

## Una consulta que comienza con la voz

La experiencia transforma una solicitud hablada en una consulta capaz de recuperar información de forma dinámica. Para lograrlo, la skill coordina distintos servicios dentro de un mismo flujo conversacional.

## Flujo de la integración

1. El usuario inicia una consulta mediante un comando de voz en Alexa.
2. Alexa Skills Kit recibe la intención y la envía a la lógica de la aplicación.
3. La integración con OpenAI Assistant ayuda a interpretar la solicitud.
4. La API de Idukay proporciona los datos requeridos para construir la respuesta.
5. Alexa devuelve el resultado dentro de la conversación.

## Piezas de la solución

- **Alexa Skills Kit** como interfaz de voz.
- **Node.js** para coordinar la lógica e integraciones.
- **OpenAI Assistant** para procesar consultas en lenguaje natural.
- **Idukay API** como fuente dinámica de información.

La propuesta demuestra cómo una interfaz de voz puede conectarse con sistemas existentes sin obligar al usuario a recorrer una interfaz administrativa tradicional.
