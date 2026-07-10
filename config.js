/* Public, safe-to-commit config. No secrets here (this file ships to every browser).
   Fill these in once you have real accounts — see MONETIZATION.md for exact steps. */
window.NL_CONFIG = {
  // Google AdSense. Client ID reused from the existing approved account (also used on Onbudsman) -
  // still requires: (1) adding this site as a property in the AdSense dashboard and waiting for
  // per-site approval, (2) creating an ad unit for it and pasting its Slot ID below. Ads stay off
  // (adSlotHTML renders nothing) until both ADSENSE_CLIENT and ADSENSE_SLOT are set. Personalization
  // itself is driven by the cookie-consent banner (Google Consent Mode v2, see consent-init.js) -
  // non-personalized ads always run once these are set (no consent needed for those); personalized
  // ads only activate for visitors who explicitly opt in via the banner.
  ADSENSE_CLIENT: null, // new site: do NOT reuse another site's AdSense client ID (mixes unrelated traffic)
  ADSENSE_SLOT: null, // paste the ad unit's data-ad-slot value here once created in AdSense
  // Google Analytics 4. Use a NEW property/data stream created specifically for this site (do not
  // reuse another site's GA4 ID - mixing unrelated traffic into one property breaks its reporting).
  // Only loads at all if the visitor grants analytics consent in the cookie banner.
  GA4_MEASUREMENT_ID: null, // e.g. "G-XXXXXXXXXX"
  // Set to true once Stripe checkout is wired (see /api/checkout.js + MONETIZATION.md)
  PREMIUM_ENABLED: false,
};
