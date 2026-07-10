// Production-only error monitoring (Sentry). Skips localhost/dev to avoid noise.
// DSN is a public key by design (Sentry client SDKs always ship it in frontend code).
// Loaded as an external file (not inline) so the CSP can require script-src 'self'
// without needing 'unsafe-inline', which meaningfully reduces XSS blast radius.
(function () {
  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') return;
  var s = document.createElement('script');
  s.src = 'https://browser.sentry-cdn.com/8.55.0/bundle.min.js';
  s.crossOrigin = 'anonymous';
  s.onload = function () {
    Sentry.init({
      dsn: 'https://c64fea4aeda87f083db705e3a2ed34bc@o4511688081539072.ingest.de.sentry.io/4511698980307024',
      environment: location.hostname.includes('vercel.app') ? 'production' : 'github-pages',
      tracesSampleRate: 0,
    });
  };
  document.head.appendChild(s);
})();
