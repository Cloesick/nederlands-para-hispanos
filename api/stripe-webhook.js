/* POST /api/stripe-webhook (called by Stripe, not the browser)
   On checkout.session.completed, marks the device premium in Supabase.
   Requires env vars: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, SUPABASE_URL, SUPABASE_SERVICE_KEY.
   Configure this URL in the Stripe Dashboard -> Developers -> Webhooks:
     https://<your-domain>/api/stripe-webhook  (event: checkout.session.completed) */
const Stripe = require('stripe');
const { createClient } = require('@supabase/supabase-js');

module.exports.config = { api: { bodyParser: false } }; // Stripe needs the raw body to verify the signature

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', c => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') { res.status(405).end(); return; }
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    res.status(503).json({ error: 'not_configured' }); return;
  }
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  let event;
  try {
    const raw = await readRawBody(req);
    event = stripe.webhooks.constructEvent(raw, req.headers['stripe-signature'], process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const deviceId = session.client_reference_id || (session.metadata && session.metadata.deviceId);
    if (deviceId && process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY) {
      const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
      await supabase.from('entitlements').upsert({
        device_id: deviceId,
        premium: true,
        stripe_customer_id: session.customer || null,
        stripe_session_id: session.id,
        updated_at: new Date().toISOString(),
      });
    }
  }
  res.status(200).json({ received: true });
};
