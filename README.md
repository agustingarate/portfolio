# Portfolio de Agustín Garate

Landing personal construida con Next.js y publicada en Cloudflare Workers.

URL pública: <https://agustingarate.agarateprof.workers.dev>

## Requisitos

- Node.js 20 o superior.
- `pnpm` 11.20.0 (Corepack puede instalarlo automáticamente).
- Una cuenta de Cloudflare autenticada con Wrangler para previsualizar o desplegar.

Instalación inicial:

```bash
pnpm install
pnpm exec wrangler login
```

## Comandos

| Comando                     | Uso                                                                            |
| --------------------------- | ------------------------------------------------------------------------------ |
| `pnpm dev`                  | Inicia Next.js en desarrollo, con recarga rápida.                              |
| `pnpm lint`                 | Ejecuta ESLint sobre el código fuente.                                         |
| `pnpm build`                | Genera el build de producción de Next.js.                                      |
| `pnpm start`                | Sirve el último build de Next.js localmente. Ejecutar después de `pnpm build`. |
| `pnpm preview`              | Construye con OpenNext y prueba el sitio en el runtime local de Cloudflare.    |
| `pnpm deploy`               | Construye y publica el Worker configurado.                                     |
| `pnpm cf-typegen`           | Regenera `cloudflare-env.d.ts` al cambiar las variables de `wrangler.jsonc`.   |
| `pnpm studio:dev`           | Inicia el panel de Sanity localmente.                                          |
| `pnpm studio:build`         | Comprueba que el panel de Sanity puede compilarse.                             |
| `pnpm studio:deploy`        | Publica el panel en el hosting administrado de Sanity (`*.sanity.studio`).     |
| `pnpm studio:deploy:worker` | Construye y publica el panel en el Worker de `admin.agustingarate.com`.        |

Flujo recomendado antes de publicar:

```bash
pnpm lint
pnpm build
pnpm deploy
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

## Blog y CMS con Sanity

El blog público está disponible en `/blog` y `/en/blog`. Los artículos comparten un
slug y tienen sus campos editoriales en español e inglés. El Studio —el panel de
administración— vive en `studio/` para poder desplegarse de forma independiente.

### Conexión inicial

1. Crear un proyecto en [Sanity Manage](https://sanity.io/manage) con un dataset
   público llamado `production`.
2. Copiar `.env.example` a `.env` y completar `NEXT_PUBLIC_SANITY_PROJECT_ID`.
3. Copiar `studio/.env.example` a `studio/.env`, con el mismo Project ID.
4. Ejecutar `pnpm studio:dev`, iniciar sesión con Sanity y crear las categorías y
   artículos desde el panel.
5. Elegir dónde alojar el panel: el subdominio administrado por Sanity o el
   subdominio propio detallado a continuación.

### Panel de administración en `admin.agustingarate.com`

El Studio es una aplicación estática independiente del sitio público. Para
servirlo desde un dominio propio se publica en un segundo Worker con Static
Assets y se registra su URL en Sanity.

#### Configuración inicial (una sola vez)

Esta parte se realiza solo al crear el panel de administración. No es necesario
repetirla al actualizar el Studio.

1. En Cloudflare Dashboard, abrir **Websites → agustingarate.com → DNS →
   Records**. Comprobar que no exista un registro llamado `admin`.

   - Si no existe, continuar.
   - Si existe y no se usa, eliminarlo desde Cloudflare antes de continuar.
   - Si se usa, no eliminarlo: primero hay que decidir cómo migrar ese servicio.

   El Worker necesita que `admin.agustingarate.com` esté libre porque Cloudflare
   creará y administrará ese registro DNS automáticamente.

2. Confirmar que `agustingarate.com` aparece como una zona **Active** en
   Cloudflare. El archivo `studio/wrangler.jsonc` ya declara el Worker separado
   `admin`, sus archivos estáticos y el dominio
   `admin.agustingarate.com`.

3. Iniciar sesión en Cloudflare desde la raíz del repositorio:

   ```bash
   pnpm exec wrangler login
   ```

4. Crear el Worker y su dominio con el primer despliegue:

   ```bash
   pnpm studio:deploy:worker
   ```

   Si todavía no existen, Cloudflare crea el Worker `admin`, el Custom Domain
   `admin.agustingarate.com` y el certificado HTTPS. Si ya se crearon desde el
   dashboard, esta orden actualiza ese mismo Worker con los archivos del Studio
   y conserva el dominio asociado. Abrir `https://admin.agustingarate.com` para
   comprobar que aparece la pantalla de inicio de sesión de Sanity.

5. En [Sanity Manage](https://sanity.io/manage), abrir el proyecto → **API →
   CORS Origins**, agregar `https://admin.agustingarate.com` y habilitar las
   credenciales autenticadas.

6. Registrar esa URL en Sanity y publicar el esquema desde la raíz del
   repositorio:

   ```bash
   pnpm --dir studio exec sanity deploy --external --url https://admin.agustingarate.com
   ```

   Este comando no publica el panel: solo le informa a Sanity que el panel vive
   en esa URL y mantiene el esquema disponible para Dashboard, Media Library y
   las demás herramientas de Sanity.

#### Publicar una nueva versión del panel

Una vez terminada la configuración inicial, para actualizar el Studio solo hay
que ejecutar estas dos órdenes desde la raíz del repositorio:

```bash
pnpm studio:deploy:worker
pnpm --dir studio exec sanity deploy --external --url https://admin.agustingarate.com
```

La primera reconstruye `studio/dist` y actualiza los archivos del Worker. La
segunda actualiza el esquema registrado en Sanity. No se modifican DNS, dominio
ni CORS durante estas actualizaciones.

La orden de Sanity requiere una sesión iniciada con `sanity login`. El acceso al
panel continúa protegido por los usuarios y roles configurados en Sanity; no se
deben guardar tokens de edición en el repositorio.

### Automatización opcional del panel

El workflow actual puede publicar también el Studio como un segundo job tras el
deploy del Worker principal en `main`. Ese job ejecutaría
`pnpm studio:deploy:worker` y luego registraría el esquema con
`sanity deploy --external`. Para esto se requieren:

- Los secretos existentes `CLOUDFLARE_API_TOKEN` y `CLOUDFLARE_ACCOUNT_ID`, con
  permiso de edición sobre Workers y DNS.
- Un secreto nuevo `SANITY_DEPLOY_TOKEN`, creado en Sanity Manage → **API**, que
  el job expondrá como `SANITY_AUTH_TOKEN`.

Conviene activar esta automatización después de completar una publicación manual
exitosa, así quedan confirmados el Worker, el dominio y los permisos.

El Project ID y el dataset son valores públicos de solo lectura. No se necesita
ningún token para mostrar contenido publicado. Los tokens de escritura o de vista
previa no deben añadirse a `.env.example`, `wrangler.jsonc` ni al repositorio.

Mientras `NEXT_PUBLIC_SANITY_PROJECT_ID` no esté configurado, las rutas del blog
siguen funcionando y muestran un estado vacío. Los artículos publicados se
actualizan como máximo cada cinco minutos en la web pública y se incluyen en el
sitemap cuando Sanity está conectado.

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
pnpm exec wrangler secret put RESEND_API_KEY
pnpm exec wrangler secret put TURNSTILE_SECRET_KEY
```

También se pueden crear desde el panel: **Workers & Pages → agustingarate → Settings → Variables and Secrets → Add → Secret**.

Para desarrollo local, copiar `.env.example` a `.env` y completar los valores. `.env` está ignorado por Git.

## CI/CD con GitHub Actions

El workflow `.github/workflows/ci-cd.yml` ejecuta `pnpm format:check`, `pnpm lint` y `pnpm build` en pull requests y pushes a `development` o `main`.

Al hacer merge o push a `main`, solo si esas validaciones pasan, publica automáticamente el Worker de producción. La rama `development` no publica producción: es el entorno de integración previo al merge.

Antes del primer deploy automático, crear estos **Repository secrets** en GitHub: **Settings → Secrets and variables → Actions**.

| Secret                  | Valor                                                                     |
| ----------------------- | ------------------------------------------------------------------------- |
| `CLOUDFLARE_API_TOKEN`  | API Token de Cloudflare con permiso de edición de Workers para la cuenta. |
| `CLOUDFLARE_ACCOUNT_ID` | ID de la cuenta de Cloudflare propietaria del Worker.                     |

No copies `RESEND_API_KEY` ni `TURNSTILE_SECRET_KEY` a GitHub: ya están guardados como secretos del Worker y Wrangler los preserva al desplegar. Para exigir aprobación manual antes de producción, configurar reviewers en el Environment `production` de GitHub.

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
