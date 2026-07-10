/* Google Consent Mode v2 default state. Must load and run before ANY Google tag
   (GA4, AdSense) - sets the safe opt-in default (everything denied) so no tracking
   cookie is set until the user actually chooses via the cookie-preferences banner.
   "Basic" implementation: app.js only loads gtag.js/adsbygoogle.js at all once a
   choice is made, so no request reaches Google before consent either way - this
   default is the belt-and-suspenders fallback if that ever changes. */
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
window.gtag = gtag;
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  wait_for_update: 500,
});
