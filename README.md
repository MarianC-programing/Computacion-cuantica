# Q-LAB — Computación Cuántica
Parcial N.º 1 · Ingeniería Web · Grupo 1SF134 · 22/09/2026
Facultad de Ingeniería de Sistemas Computacionales — Universidad Tecnológica de Panamá

## Técnica de diseño utilizada
Se usó un **wireframe de baja fidelidad** para planificar la estructura antes de escribir
código. El wireframe (incluido también dentro de `html/acerca.html`, sección "Técnica de
diseño utilizada") define tres bloques repetidos en las páginas del sitio:


A partir de ese wireframe se definió el sistema visual (ver tokens en `css/styles.css`):

- **Color:** fondo casi negro azulado, superficies `#121a2e`/`#182238`,
  acento cian tipo láser, acento violeta de superposición y un
  dorado que evoca el cableado coaxial chapado en oro de los procesadores
  cuánticos reales.
- **Tipografía:** `Space Grotesk` para títulos (geométrica, técnica) y `IBM Plex Sans`
  para texto (guiño tipográfico a IBM, uno de los referentes del sector).
- **Motivo estructural:** los `article` imitan chips de circuito (pines superiores,
  franja de color a la izquierda) y los divisores usan una línea con un "gate" en
  rombo, como en los diagramas de circuitos cuánticos.

## Estructura de carpetas

```
Apellido1-Apellido2/
├── README.md
├── html/
│   ├── index.html      (inicio)
│   ├── computadora-cuantica.html (panorama general y aplicaciones)
│   ├── componentes.html (anatomía interactiva del criostato)
│   ├── acerca.html      (acerca de)
│   └── contacto.html    (contacto con formulario)
├── css/
│   └── styles.css
├── ts/
│   └── script.ts        (fuente TypeScript)
├── js/
│   └── script.js         (compilado — usado por contacto.html)
├── img/
│   ├── logo.svg
│   ├── favicon.svg
│   └── Quantum_Computer_Science.jpg
├── media/                (agregar video-explicativo.mp4, capsula-audio.mp3, capsula-acerca.mp3)
└── data/
    └── envios.json       (se actualiza en el navegador; ver abajo)
```

## Páginas destacadas

- **Computadora cuántica:** explica qué es un procesador cuántico, qué problemas podría ayudar a estudiar y por qué no sustituye a un computador clásico. Desde esta página se accede al recorrido de la arquitectura física.
- **Componentes:** presenta un SVG propio de un criostato de dilución. Al desplazarse, cada una de sus seis capas se resalta junto con la explicación correspondiente.

## Stack
HTML5 semántico + CSS3 (Grid/Flexbox, sin frameworks). El proyecto conserva los archivos JavaScript existentes para la validación del formulario y la interacción del diagrama de componentes.

## Cómo se guardan los datos del formulario
`contacto.html` valida en el cliente al menos 4 campos obligatorios (nombre, correo,
teléfono y mensaje) con reglas propias en `ts/script.ts` (compilado a `js/script.js`).
Al enviar un formulario válido:

1. El envío se agrega a un historial guardado en `localStorage` del navegador
   (clave `qlab_envios`), que persiste entre visitas.
2. Automáticamente se descarga un **archivo de datos JSON** (`envios.json`) con todo
   el historial acumulado, que reemplaza el rol que tendría un archivo `.php`/base de
   datos en el servidor.

