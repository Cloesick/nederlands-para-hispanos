/* POST /api/checkout { deviceId } -> { url }
   Creates a Stripe Checkout session for the one-time Premium unlock.
   Requires env vars: STRIPE_SECRET_KEY, STRIPE_PRICE_ID (set in Vercel project settings). */
const Stripe = require('stripe');

// Pinned allowlist, not derived from request headers: req.headers.origin/host are
// attacker-controlled when this endpoint is hit directly (not through the browser UI),
// so trusting them to build the Stripe redirect URL would be an open redirect.
const ALLOWED_ORIGINS = [
  'https://nederlands-para-hispanos.vercel.app',
];

module.exports = async (req, res) => {
  if (req.method !== 'POST') { res.status(405).json({ error: 'method not allowed' }); return; }
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_PRICE_ID) {
    res.status(503).json({ error: 'not_configured', message: 'Stripe ainda não foi configurado. Veja MONETIZATION.md.' });
    return;
  }
  const deviceId = (req.body && req.body.deviceId) || '';
  if (!deviceId) { res.status(400).json({ error: 'deviceId required' }); return; }

  try {
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    const requestedOrigin = req.headers.origin || '';
    const origin = ALLOWED_ORIGINS.includes(requestedOrigin) ? requestedOrigin : ALLOWED_ORIGINS[0];
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
      success_url: `${origin}/index.html#/premium?success=1`,
      cancel_url: `${origin}/index.html#/premium?canceled=1`,
      client_reference_id: deviceId,
      metadata: { deviceId },
    });
    res.status(200).json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: String((e && e.message) || e) });
  }
};
