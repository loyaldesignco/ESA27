/* Sends a form to Loyal Design's shared forms service (www.loyal.design/api/forms):
 * the academy gets an email through Postmark and a private copy is saved in Sanity (Studio → Form submissions).
 * Settings come from window.__ESA.forms (src/layouts/Layout.astro). */
(function () {
  var C = (window.__ESA && window.__ESA.forms) || {};
  var rc = null;
  function loadRecaptcha() {
    if (!C.recaptchaKey) return Promise.resolve();
    return rc || (rc = new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = 'https://www.google.com/recaptcha/api.js?render=' + encodeURIComponent(C.recaptchaKey);
      s.async = true;
      s.onload = function () { window.grecaptcha.ready(resolve); };
      s.onerror = function () { rc = null; reject(new Error('recaptcha')); };
      document.head.appendChild(s);
    }));
  }
  function token() {
    return loadRecaptcha().then(function () {
      return C.recaptchaKey ? window.grecaptcha.execute(C.recaptchaKey, {action: 'submit'}) : '';
    }).catch(function () { return ''; });
  }
  window.ESAForms = {
    /** Load reCAPTCHA the first time someone touches the form, not on page load. */
    warm: function (form) { form.addEventListener('focusin', function () { loadRecaptcha().catch(function () {}); }, {once: true}); },
    /**
     * rows: [[label, value], ...]. Resolves 'sent' when the service accepted it, 'off' when the service
     * isn't set up for this site yet (caller falls back to Google Forms alone); rejects on any other failure.
     */
    send: function (form, rows) {
      if (!C.endpoint || !C.site) return Promise.resolve('off');
      return token().then(function (t) {
        var fd = new FormData();
        fd.append('site', C.site);
        rows.forEach(function (r) { var v = r[1] == null ? '' : String(r[1]).trim(); if (v) fd.append(r[0], v); });
        var hp = form.querySelector('input[name=_gotcha]');
        if (hp && hp.value) fd.append('_gotcha', hp.value);
        if (t) fd.append('g-recaptcha-response', t);
        return fetch(C.endpoint, {method: 'POST', body: fd, headers: {Accept: 'application/json'}});
      }).then(function (res) {
        if (res.ok) return 'sent';
        // Service not configured for this site (unknown site, origin not listed, email not set up): not the visitor's fault
        if (res.status === 400 || res.status === 403 || res.status === 503) return 'off';
        return res.json().catch(function () { return {}; }).then(function (b) { throw new Error(b.reason || b.error || 'HTTP ' + res.status); });
      }, function (e) { throw e; });
    },
  };
})();
