/* Waiver form -> Loyal Design forms service (email to the academy + private copy in Sanity), with the
 * Google Form kept as a backup copy (field ids come from Sanity → Pages → Waiver → Google Form connection). */
(function () {
  var CFG = (window.__ESA && window.__ESA.waiver) || {};
  function init() {
    var form = document.getElementById('waiver');
    if (!form) return;
    var wrap = form.closest('.w-form');
    var guardian = document.getElementById('wv-guardian');
    var err = form.querySelector('.wv-err');
    var opts = form.querySelectorAll('.vu-opt');
    if (window.ESAForms) window.ESAForms.warm(form);

    // Default "Date signed" to today (local time)
    var d = new Date(), today = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    var sd = form.elements.signedDate; if (sd && !sd.value) sd.value = today;
    form.elements.dob.max = today;

    // Styled radio / checkbox options
    function sync() {
      opts.forEach(function (l) { var i = l.querySelector('input'); l.classList.toggle('is-checked', !!(i && i.checked)); });
      var minor = (form.querySelector('input[name=minor]:checked') || {}).value === 'Yes';
      guardian.hidden = !minor; guardian.disabled = !minor;
      form.querySelector('[data-n=emergency]').textContent = minor ? '03' : '02';
      form.querySelector('[data-n=waiver]').textContent = minor ? '04' : '03';
    }
    form.addEventListener('change', sync);
    form.addEventListener('input', function () { err.hidden = true; });
    sync();

    function ymd(v, key, fd) { var p = String(v || '').split('-'); if (p.length !== 3 || !key) return; fd.append(key + '_year', p[0]); fd.append(key + '_month', String(+p[1])); fd.append(key + '_day', String(+p[2])); }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      err.hidden = true;
      if (!form.checkValidity()) {
        form.reportValidity();
        var bad = form.querySelector(':invalid');
        err.textContent = 'Please complete every required field' + (bad && bad.type === 'checkbox' ? ' and tick the agreement box.' : '.');
        err.hidden = false;
        return;
      }
      var v = function (n) { var el = form.elements[n]; return el ? String(el.value || '').trim() : ''; };
      var minor = v('minor') === 'Yes';
      var us = function (iso) { var p = String(iso || '').split('-'); return p.length === 3 ? +p[1] + '/' + +p[2] + '/' + p[0] : iso; };
      var rows = [
        ['form', 'Signed waiver'],
        ['name', v('name')], ['email', v('email')], ['phone', v('phone')],
        ['Date of birth', us(v('dob'))], ['Home address', v('address')],
        ['Under 18', minor ? 'Yes' : 'No'],
      ];
      if (minor) rows.push(['Parent or guardian', v('guardianName')], ['Relationship', v('guardianRelation')], ['Parent or guardian phone', v('guardianPhone')]);
      rows.push(
        ['Emergency contact', v('emergencyName')], ['Emergency contact phone', v('emergencyPhone')],
        ['Medical conditions', v('medical')],
        ['Agreement', form.elements.agree.value],
        ['Signature (typed name)', v('signature')], ['Date signed', us(v('signedDate'))],
        ['Waiver wording signed', String((window.__ESA && window.__ESA.waiverText) || '').slice(0, 4900)]
      );
      // Backup copy to the Google Form (fire and forget: Google doesn't let the page read its reply)
      var fd = new FormData();
      fd.append('emailAddress', v('email'));
      var put = function (key, val) { if (key) fd.append(key, val); };
      put(CFG.name, v('name')); ymd(v('dob'), CFG.dob, fd); put(CFG.phone, v('phone')); put(CFG.address, v('address'));
      put(CFG.minor, minor ? 'Yes' : 'No');
      if (minor) { put(CFG.guardianName, v('guardianName')); put(CFG.guardianRelation, v('guardianRelation')); put(CFG.guardianPhone, v('guardianPhone')); }
      put(CFG.emergencyName, v('emergencyName')); put(CFG.emergencyPhone, v('emergencyPhone')); put(CFG.medical, v('medical'));
      put(CFG.photo, 'Yes, I consent'); // consent is now part of the signed waiver text
      put(CFG.agree, form.elements.agree.value);
      put(CFG.signature, v('signature')); ymd(v('signedDate'), CFG.signedDate, fd);
      // Google Form sections: 0 participant, 1 guardian (minors only), 2 emergency/medical, 3 waiver
      fd.append('pageHistory', minor ? '0,1,2,3' : '0,2,3');
      fd.append('fvv', '1');

      var btn = form.querySelector('[type=submit]'); btn.disabled = true; btn.textContent = 'Sending…';
      var google = CFG.actionUrl ? fetch(CFG.actionUrl, {method: 'POST', mode: 'no-cors', body: fd}) : Promise.reject(new Error('no google form'));
      var send = window.ESAForms ? window.ESAForms.send(form, rows) : Promise.resolve('off');
      send.then(function (r) { return r === 'sent' ? r : google; }).then(function () {
        form.style.display = 'none';
        var ok = wrap.querySelector('.w-form-done'); ok.style.display = 'block'; ok.focus();
        ok.scrollIntoView({block: 'center', behavior: 'smooth'});
      }).catch(function () {
        var fail = wrap.querySelector('.w-form-fail'); fail.style.display = 'block';
        btn.disabled = false; btn.textContent = 'Try again';
      });
    });
  }
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
