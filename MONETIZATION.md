# 💶 Monetización: gratis + anuncios, Premium para el punto de equilibrio

Filosofía: el curso sigue siendo **100% gratuito para siempre**. Los anuncios pagan lo básico; el
Premium (compra única barata) cubre el resto y financia contenido nuevo. Todo lo que se puede
construir sin tus cuentas personales ya está listo en el código; solo faltan los pasos de abajo, que
requieren tu identidad/pago.

**Nota:** este proyecto es hermano de [nederlands-voor-brazilianen](https://github.com/Cloesick/nederlands-voor-brazilianen)
(la versión en portugués), pero es una app y un dominio **completamente separados**. Nada de Stripe,
Supabase, AdSense o GA4 de esa app debe reutilizarse aquí (mezclaría datos/tráfico no relacionado en
sus paneles) — cada cuenta/proyecto de abajo debe crearse específicamente para
`nederlands-para-hispanos.vercel.app`.

## ✅ Lo que ya está listo en el código
- `db/entitlements.sql` — tabla de Supabase que guarda quién es Premium
- `api/checkout.js` — crea la sesión de pago en Stripe
- `api/stripe-webhook.js` — recibe la confirmación de Stripe y activa el Premium
- `api/premium-status.js` — la app consulta esto para saber si es Premium
- Pantalla `#/premium` en la app con la lista de beneficios y botón de compra
- Espacio de anuncio (`adSlotHTML`) que solo aparece si configuras AdSense Y el usuario no es Premium
- Aviso de cookies con Google Consent Mode v2 (`assets/consent-init.js` + `initConsent()` en `app.js`)
- `config.js` — las 2-3 líneas que editas cuando tengas las cuentas (actualmente todo en `null`/`false`)

## 🔲 Paso 1 — Supabase (guardar quién es Premium)
1. Crea un proyecto **nuevo** en [supabase.com](https://supabase.com/dashboard) específico para esta app
2. Ejecuta `db/entitlements.sql` en el SQL Editor del proyecto
3. Copia la **Project URL** y la **service_role key** (Project Settings → API — no la anon key)

## 🔲 Paso 2 — Stripe (recibir el pago)
1. Crea la cuenta en [dashboard.stripe.com/register](https://dashboard.stripe.com/register) (o usa tu
   cuenta Stripe existente y añade un producto nuevo)
2. Products → Add product → "Nederlands! Premium" → precio único (sugerencia: **€ 4,99**)
3. Copia el **Price ID** (empieza con `price_...`)
4. Copia la **Secret key** en Developers → API keys (empieza con `sk_live_...`)
5. Developers → Webhooks → Add endpoint → URL: `https://nederlands-para-hispanos.vercel.app/api/stripe-webhook`
   → evento: `checkout.session.completed` → copia el **Signing secret** (`whsec_...`)

## 🔲 Paso 3 — variables de entorno en Vercel
En el panel del proyecto en Vercel → Settings → Environment Variables, añade:

| Nombre | Valor |
|---|---|
| `STRIPE_SECRET_KEY` | `sk_live_...` |
| `STRIPE_PRICE_ID` | `price_...` |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` |
| `SUPABASE_URL` | la Project URL del paso 1 |
| `SUPABASE_SERVICE_KEY` | la service_role key del paso 1 |

Después, edita `config.js`: cambia `PREMIUM_ENABLED: false` a `true`, haz commit y push.

## 🔲 Paso 4 — Google AdSense (anuncios en el plan gratuito)
1. En el [dashboard de AdSense](https://www.google.com/adsense/) → Sites → Add site, usa
   `nederlands-para-hispanos.vercel.app` y espera la aprobación de este sitio específico
2. Después de aprobado, crea un bloque de anuncio y copia el **Slot ID**
3. Copia también el **Publisher ID** (`ca-pub-...`) — puede ser el mismo de otra cuenta AdSense tuya
   si ya tienes una aprobada, solo el sitio necesita aprobación propia
4. Edita `config.js`: `ADSENSE_CLIENT: "ca-pub-..."` y `ADSENSE_SLOT: "..."`, commit y push

Los anuncios no personalizados aparecen para todos en cuanto esto esté configurado (no requieren
consentimiento). Los anuncios personalizados (CPM más alto) solo se activan para quienes lo elijan
explícitamente en el aviso de cookies.

## 🔲 Paso 5 — Google Analytics 4 (estadísticas de uso, opcional)
1. En [analytics.google.com](https://analytics.google.com/), crea una **propiedad nueva** específica
   para este sitio
2. Crea un flujo de datos tipo "Web", URL `https://nederlands-para-hispanos.vercel.app`
3. En Configuración de datos → Retención, cambia de 14 meses (por defecto) a **2 meses** (minimización
   de datos, alineado con el GDPR)
4. Copia el **Measurement ID** (`G-XXXXXXXXXX`)
5. Edita `config.js`: `GA4_MEASUREMENT_ID: "G-..."`, commit y push

El script de GA4 solo se carga para quienes activen "estadísticas" en el aviso de cookies.

## 📊 Cuenta del punto de equilibrio
- Costo fijo: depende de qué tiendas de apps se usen (ver `STORES.md` si se adapta ese documento)
- Premium a € 4,99: pocas decenas de ventas cubren cualquier costo fijo típico
- Anuncios: ingreso pasivo continuo sobre los usuarios gratuitos

## 🔐 Seguridad
El navegador nunca habla directamente con Stripe/Supabase — solo con `/api/*`, que corre en el
servidor de Vercel. `api/checkout.js` usa una lista fija de orígenes permitidos (no derivada de
headers de la petición) para evitar redirecciones abiertas.
