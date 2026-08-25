# Portfolio de Agustín Garate

Landing personal construida con Next.js y publicada en Cloudflare Workers.

URL pública: <https://agustingarate.agarateprof.workers.dev>

## Requisitos

- Node.js 20 o superior.
- `npm`.
- Una cuenta de Cloudflare autenticada con Wrangler para previsualizar o desplegar.

Instalación inicial:

```bash
npm install
npx wrangler login
```

## Comandos

| Comando              | Uso                                                                               |
| -------------------- | --------------------------------------------------------------------------------- |
| `npm run dev`        | Inicia Next.js en desarrollo, con recarga rápida.                                 |
| `npm run lint`       | Ejecuta ESLint sobre el código fuente.                                            |
| `npm run build`      | Genera el build de producción de Next.js.                                         |
| `npm start`          | Sirve el último build de Next.js localmente. Ejecutar después de `npm run build`. |
| `npm run preview`    | Construye con OpenNext y prueba el sitio en el runtime local de Cloudflare.       |
| `npm run deploy`     | Construye y publica el Worker configurado.                                        |
| `npm run cf-typegen` | Regenera `cloudflare-env.d.ts` al cambiar las variables de `wrangler.jsonc`.      |

Flujo recomendado antes de publicar:

```bash
npm run lint
npm run build
npm run deploy
```

## Estructura

| Ruta                           | Responsabilidad                                                                  |
| ------------------------------ | -------------------------------------------------------------------------------- |
| `src/app/page.tsx`             | Compone la landing.                                                              |
| `src/app/api/contact/route.ts` | Endpoint seguro del formulario de contacto.                                      |
| `src/components/atoms`         | Componentes base: botón, icono, chip y contenedor.                               |
| `src/components/molecules`     | Combinaciones reutilizables: títulos, tarjetas y reveal.                         |
| `src/components/organisms`     | Secciones y componentes complejos de la landing.                                 |
| `src/content/portfolio.ts`     | Todo el contenido y enlaces editables, incluido el Sitekey público de Turnstile. |
| `src/styles`                   | Tokens de diseño y animaciones globales.                                         |
| `src/hooks`                    | Lógica reutilizable del cliente.                                                 |
| `src/lib/webgl`                | Shader del hero.                                                                 |

El sistema visual sigue Atomic Design: atoms → molecules → organisms. Evitá insertar contenido fijo directamente en componentes; agregalo o modificalo en `src/content/portfolio.ts`.

## Editar contenido y diseño

- Textos, servicios, trayectoria, tecnologías, links sociales y datos de contacto: `src/content/portfolio.ts`.
- Colores, espaciado, radios y tipografía: `src/styles/tokens.css`.
- Animaciones globales: `src/styles/animations.css`.
- Shader del hero: `src/lib/webgl/shader-source.ts`.

El Sitekey de Turnstile es público y está en `portfolioContent.contact.turnstileSiteKey`. Si se reemplaza el widget, actualizar ese valor y volver a desplegar.

## Cloudflare Workers

La integración usa:

- **OpenNext** para adaptar Next.js a Cloudflare Workers.
- **Wrangler** para autenticación, build, preview y deploy.
- `wrangler.jsonc` para declarar el Worker `agustingarate`, assets estáticos y variables no secretas.

Variables actuales:

| Nombre                 | Tipo                | Dónde configurarla                                               | Uso                                        |
| ---------------------- | ------------------- | ---------------------------------------------------------------- | ------------------------------------------ |
| `CONTACT_EMAIL`        | Variable de entorno | `wrangler.jsonc`                                                 | Destino de los mensajes del formulario.    |
| `RESEND_API_KEY`       | Secret              | Cloudflare Dashboard → Worker → Settings → Variables and Secrets | Autentica los envíos con Resend.           |
| `TURNSTILE_SECRET_KEY` | Secret              | Cloudflare Dashboard → Worker → Settings → Variables and Secrets | Valida los tokens anti-bot en el servidor. |

Los secrets nunca deben estar en el repositorio. Para cargarlos desde terminal:

```bash
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put TURNSTILE_SECRET_KEY
```

También se pueden crear desde el panel: **Workers & Pages → agustingarate → Settings → Variables and Secrets → Add → Secret**.

Para desarrollo local, copiar `.env.example` a `.env` y completar los valores. `.env` está ignorado por Git.

## Formulario de contacto

El formulario envía una solicitud a `/api/contact`. El Worker:

1. valida nombre, email, mensaje, origen y límites de tamaño;
2. descarta bots que llenan el honeypot;
3. valida obligatoriamente el token de Cloudflare Turnstile;
4. envía la consulta con Resend a `CONTACT_EMAIL`.

Sin dominio propio, Resend usa `onboarding@resend.dev` como remitente de prueba y solo puede entregar a la dirección asociada a la cuenta de Resend. Cuando haya un dominio, verificarlo en Resend y reemplazar el remitente del endpoint.

## Referencias de diseño

- `docs/design.md`: tokens y criterios visuales.
- `stitch/reference/`: referencias desktop/mobile, shader, animación y accesibilidad.
- `stitch/assets/`: assets de referencia.

Son fuentes de implementación; no se sirven directamente desde la aplicación.

# portfolio
