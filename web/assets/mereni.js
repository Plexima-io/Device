/*
 * Měření pro memory.plexima.io
 * - dataLayer události: hero_variant, cta_click, calculator_interaction, consultation_booked
 * - A/B test hero (50:50, cookie 30 dní, vynucení ?hero=a / ?hero=b)
 * - UTM a gclid do cookie na 90 dní a jejich předání do odkazů na Calendly
 *
 * Načítá se synchronně v <head>, aby se varianta hero nastavila před vykreslením.
 */
(function () {
  window.dataLayer = window.dataLayer || [];

  var HERO_COOKIE = 'pm_hero';
  var ATTR_COOKIE = 'pm_attr';
  var ATTR_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'];

  var getCookie = function (name) {
    var m = document.cookie.match('(?:^|; )' + name + '=([^;]*)');
    return m ? decodeURIComponent(m[1]) : null;
  };
  var setCookie = function (name, value, days) {
    var exp = new Date(Date.now() + days * 864e5).toUTCString();
    var secure = location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + exp + '; path=/; SameSite=Lax' + secure;
  };

  var params = new URLSearchParams(location.search);

  /* UTM a gclid: při novém příchodu s parametry přepíšeme, jinak ponecháme 90 dní */
  var attr = {};
  try { attr = JSON.parse(getCookie(ATTR_COOKIE) || '{}') || {}; } catch (e) { attr = {}; }
  var incoming = {};
  ATTR_KEYS.forEach(function (k) { var v = params.get(k); if (v) incoming[k] = v.slice(0, 200); });
  if (Object.keys(incoming).length) {
    attr = incoming;
    setCookie(ATTR_COOKIE, JSON.stringify(attr), 90);
  }

  var heroVariant = function () {
    var v = document.documentElement.getAttribute('data-hero') || getCookie(HERO_COOKIE);
    return v === 'a' || v === 'b' ? v : undefined;
  };

  var track = function (event, data) {
    var payload = { event: event };
    var v = heroVariant();
    if (v) payload.hero_variant = v;
    Object.keys(attr).forEach(function (k) { payload[k] = attr[k]; });
    if (data) Object.keys(data).forEach(function (k) { payload[k] = data[k]; });
    window.dataLayer.push(payload);
  };

  /*
   * A/B test hero: jen na stránce, která ho má (<html data-hero-test>).
   * 1. ?v=a / ?v=b má přednost (alias ?hero=) a přepíše cookie,
   * 2. jinak varianta z cookie (30 dní),
   * 3. jinak náhodně 50:50.
   * Běží synchronně v <head> před vykreslením těla, takže hero neproblikne.
   */
  if (document.documentElement.hasAttribute('data-hero-test')) {
    var forced = (params.get('v') || params.get('hero') || '').toLowerCase();
    var variant;
    if (forced === 'a' || forced === 'b') {
      variant = forced;
    } else {
      variant = getCookie(HERO_COOKIE);
      if (variant !== 'a' && variant !== 'b') variant = Math.random() < 0.5 ? 'a' : 'b';
    }
    setCookie(HERO_COOKIE, variant, 30);
    document.documentElement.setAttribute('data-hero', variant);
    // Uživatelská vlastnost pro GA4 (v GTM namapovat na user property hero_variant)
    window.dataLayer.push({ user_properties: { hero_variant: variant }, hero_variant: variant });
    track('hero_view', { hero_variant: variant });
  }

  /* Odkazy na Calendly: doplnit UTM/gclid a variantu hero (do utm_content), měřit kliky */
  var decorate = function (a) {
    try {
      var url = new URL(a.href);
      ATTR_KEYS.forEach(function (k) { if (attr[k]) url.searchParams.set(k, attr[k]); });
      var v = heroVariant();
      if (v) url.searchParams.set('utm_content', (attr.utm_content ? attr.utm_content + '__' : '') + 'hero_' + v);
      a.href = url.toString();
    } catch (e) { /* neplatná URL, necháme být */ }
  };
  var ctaLocation = function (a) {
    if (a.getAttribute('data-cta-location')) return a.getAttribute('data-cta-location');
    var sec = a.closest('section[id], header, footer');
    return sec ? (sec.id || sec.tagName.toLowerCase()) : 'jine';
  };
  // Hrubé umístění pro porovnání: hero / sticky / sekce (podrobnost v cta_location)
  var ctaArea = function (loc) {
    return loc === 'hero' || loc === 'sticky' ? loc : (loc === 'header' ? 'hlavicka' : 'sekce');
  };

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a[href*="calendly.com/"]').forEach(decorate);
  });
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href*="calendly.com/"]');
    if (!a) return;
    var loc = ctaLocation(a);
    track('cta_click', { cta_location: loc, cta_area: ctaArea(loc), cta_text: (a.textContent || '').trim() });
  });

  window.PleximaMereni = { track: track, heroVariant: heroVariant };
})();
