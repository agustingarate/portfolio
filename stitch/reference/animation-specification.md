# Especificaciones Técnicas de Animación e Interacción - Portfolio Agus Garate

Este documento detalla la lógica de movimiento, estados interactivos y comportamientos dinámicos implementados en el portfolio. Está diseñado para servir como referencia técnica para la implementación frontend.

---

## 1. Hero Section: WebGL Shader Background

- **Tipo:** WebGL Shader (Fragment/Vertex).
- **Comportamiento:** Fondo orgánico fluido con movimiento continuo.
- **Paleta de Colores:** Basada en {{DATA:DESIGN_SYSTEM:DESIGN_SYSTEM_1}} con degradados suaves.
- **Interactividad:**
  - Movimiento autónomo (velocidad: lenta, fluida).
  - Reactividad leve al scroll (desplazamiento de fase).
- **Accesibilidad:** Debe respetar `prefers-reduced-motion` pausando la animación o simplificándola.

## 2. Hero: Efecto Machine-Type (Máquina de Escribir)

- **Elemento:** Título principal (H1).
- **Lógica:**
  - Secuencia de texto: "Agus Garate" -> "Mobile Engineer" -> "Product Thinking".
  - Comportamiento: Escribe letra por letra, espera 2s, borra letra por letra.
  - Indicador: Cursor vertical parpadeante (`|`) al final del texto activo.

## 3. Navegación Global: Cursor Follower Light

- **Efecto:** Luz radial con gradiente que sigue las coordenadas del ratón (`clientX`, `clientY`).
- **Estilo:** `mix-blend-mode` suave (screen o overlay) sobre el lienzo general.
- **Lógica:**
  - Radio: ~300px.
  - Fallback: Desactivado en dispositivos táctiles (Mobile).
  - Accesibilidad: Desactivado si `prefers-reduced-motion: reduce`.

## 4. Navegación (TopAppBar): Scroll-Spy & Active State

- **Comportamiento:** El menú detecta la sección visible mediante `Intersection Observer`.
- **Estado Activo:** El link correspondiente en el menú superior se resalta en azul (#4c32ff) con un borde inferior de 2px.
- **Transición:** Cambio suave de color y posición del indicador.

## 5. Experiencia Profesional & Servicios: Scroll Entrance

- **Animación:** `fade-in-up`.
- **Parámetros:**
  - Desplazamiento vertical: 30px.
  - Duración: 0.6s.
  - Easing: `ease-out`.
- **Stagger (Escalonado):** Retraso de 0.1s entre cada card/item consecutivo dentro de la misma sección.

## 6. Ciclo de Vida del Proyecto: Interactive Gantt (Core Logic)

Esta es la sección más compleja técnicamente, requiriendo un "Scroll Lock" personalizado.

### A. Mecánica de Bloqueo de Scroll

- **Trigger:** Cuando el contenedor `#project-lifecycle` llega al centro del viewport.
- **Acción:** El scroll de la página se bloquea (`body { overflow: hidden }` o similar manejado vía JS).
- **Progreso:** El scroll del usuario ahora controla el eje X del "Selector de Día" (línea roja vertical).

### B. Interacciones del Gantt

- **Escalado de Burbujas:** A medida que la línea roja cruza una fase (Discovery, Kick-off, etc.), la burbuja correspondiente debe escalar suavemente (1.0 -> 1.25) y recuperar su tamaño al salir.
- **Aparición de Descripciones:** La descripción detallada de la fase actual debe aparecer lateralmente con un fade-in coordinado con el paso del selector.
- **Habilitación de Salida:** Una vez el selector llega al final de la última fase ("Despliegue"), el scroll de la página se rehabilita automáticamente.

## 7. Stack Tecnológico: Animated Carousel

- **Movimiento:** Scroll horizontal infinito (Marquee).
- **Pausa:** El carrusel se detiene al hacer `hover`.
- **Tooltips:** Al posar el cursor sobre un icono:
  - Aparece un tooltip flotante con el nombre de la tecnología.
  - El icono recibe un ligero escalado y foco visual.

---

**Nota para el Desarrollador:** Priorizar el uso de `Intersection Observer` para el disparo de animaciones y asegurar que todos los `eventListeners` de scroll estén optimizados para evitar "jank".
