/* GET /api/premium-status?device=<deviceId> -> { premium, configured }
   Requires env vars: SUPABASE_URL, SUPABASE_SERVICE_KEY. Returns configured:false gracefully
   (never an error) so the free app works normally before monetization is set up. */
const { createClient } = require('@supabase/supabase-js');

module.exports = async (req, res) => {
  const deviceId = (req.query && req.query.device) || '';
  if (!deviceId) { res.status(400).json({ error: 'device required' }); return; }
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    res.status(200).json({ premium: false, configured: false });
    return;
  }
  try {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
    const { data } = await supabase.from('entitlements').select('premium').eq('device_id', deviceId).maybeSingle();
    res.status(200).json({ premium: !!(data && data.premium), configured: true });
  } catch {
    res.status(200).json({ premium: false, configured: true, error: true });
  }
};
