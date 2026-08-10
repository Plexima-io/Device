(function () {
  var ENDPOINT = '/api/subscribe';

  var CSS = [
    '.modal-overlay{position:fixed;inset:0;z-index:200;background:rgba(31,23,65,.45);display:flex;align-items:flex-start;justify-content:center;padding:4vh 16px;overflow-y:auto;opacity:0;pointer-events:none;transition:opacity .22s ease}',
    '.modal-overlay.is-open{opacity:1;pointer-events:auto}',
    '.modal{background:var(--white);border-radius:var(--radius-lg);box-shadow:var(--shadow-lg,0 18px 48px -18px rgba(31,23,65,.22));max-width:560px;width:100%;padding:clamp(24px,4vw,40px);position:relative;transform:translateY(14px);transition:transform .22s ease;margin:auto 0}',
    '.modal-overlay.is-open .modal{transform:translateY(0)}',
    '.modal h3{font-size:26px;margin-bottom:8px;padding-right:44px}',
    '.modal .modal-lead{font-size:15px;color:var(--muted);margin-bottom:24px}',
    '.modal-close{position:absolute;top:18px;right:18px;width:44px;height:44px;border:1px solid var(--border);border-radius:var(--radius-sm);background:var(--white);cursor:pointer;font-size:20px;line-height:1;color:var(--ink);transition:background .15s ease}',
    '.modal-close:hover{background:var(--soft)}',
    '.modal-choice{display:flex;flex-direction:column;gap:16px;margin-top:8px}',
    '.modal-choice .btn{width:100%;min-height:54px;font-size:17px}',
    '.modal-choice .btn-ghost{border-color:var(--ink)}',
    '.modal-choice .btn-ghost:hover{background:var(--soft);border-color:var(--ink)}',
    '.modal-back{display:inline-flex;align-items:center;gap:6px;border:none;background:none;font:600 14px/1 var(--font-body);color:var(--muted);cursor:pointer;padding:0;margin-bottom:8px}',
    '.modal-back:hover{color:var(--ink)}',
    '.modal-view{display:none}',
    '.modal-view.is-active{display:block}',
    'body.modal-open{overflow:hidden}',
    '.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}',
    '.form-field{display:flex;flex-direction:column;gap:6px}',
    '.form-field.full{grid-column:1/-1}',
    '.form-field label{font:600 14px/1.4 var(--font-body);color:var(--ink)}',
    '.form-field label .req{color:#D9534F}',
    '.form-field input,.form-field select{min-height:48px;padding:12px 16px;border:1px solid var(--border);border-radius:var(--radius-md);background:var(--soft);color:var(--ink);font:400 16px/1.4 var(--font-body);width:100%}',
    '.form-field input:focus,.form-field select:focus{border-color:var(--blue);outline:2px solid rgba(110,193,228,.25)}',
    '.form-check{grid-column:1/-1;display:flex;align-items:flex-start;gap:10px;font-size:14px;color:var(--muted);cursor:pointer}',
    '.form-check input{width:20px;height:20px;margin-top:1px;accent-color:#FEC710}',
    '.form-check a{color:var(--ink);font-weight:600}',
    '.form-submit{grid-column:1/-1;margin-top:4px;width:100%}',
    '.form-status{grid-column:1/-1;border-radius:var(--radius-md);padding:14px 16px;font-size:14px;border:1px solid}',
    '.form-status.ok{background:rgba(57,181,74,.10);border-color:rgba(57,181,74,.36);color:var(--ink)}',
    '.form-status.err{background:rgba(217,83,79,.10);border-color:rgba(217,83,79,.36);color:var(--ink)}',
    '@media (max-width:767px){.form-grid{grid-template-columns:1fr}}'
  ].join('');

  var MARKUP = [
    '<div class="modal-overlay" id="modal-konzultace" aria-hidden="true">',
    '<div class="modal" role="dialog" aria-modal="true" aria-labelledby="konzultace-title">',
    '<button type="button" class="modal-close" aria-label="Zavřít">✕</button>',
    '<div class="modal-view is-active" id="konzultace-choice">',
    '<h3 id="konzultace-title">Domluvit konzultaci</h3>',
    '<p class="modal-lead">Vyberte, jak se vám to hodí.</p>',
    '<div class="modal-choice">',
    '<button type="button" class="btn btn-primary" id="choice-zavolejte">Zavolejte mi</button>',
    '<a href="#" class="btn btn-ghost" id="choice-calendly">Zobrazit volné termíny</a>',
    '</div></div>',
    '<div class="modal-view" id="konzultace-form">',
    '<button type="button" class="modal-back" id="konzultace-back">← Zpět</button>',
    '<h3>Zavolejte mi</h3>',
    '<p class="modal-lead">Nechte nám kontakt. Ozveme se do jednoho pracovního dne.</p>',
    '<form class="form-grid" data-type="konzultace" novalidate>',
    '<div class="form-field"><label for="k-jmeno">Jméno <span class="req">*</span></label><input type="text" id="k-jmeno" name="jmeno" required autocomplete="name"></div>',
    '<div class="form-field"><label for="k-firma">Firma <span class="req">*</span></label><input type="text" id="k-firma" name="firma" required autocomplete="organization"></div>',
    '<div class="form-field"><label for="k-telefon">Telefon <span class="req">*</span></label><input type="tel" id="k-telefon" name="telefon" required minlength="9" pattern=".{9,}" title="Zadejte alespoň 9 znaků" autocomplete="tel"></div>',
    '<div class="form-field"><label for="k-email">E-mail <span class="req">*</span></label><input type="email" id="k-email" name="email" required autocomplete="email"></div>',
    '<div class="form-field full"><label for="k-pozice">Vaše pozice</label><select id="k-pozice" name="pozice">',
    '<option value="" disabled selected>Vyberte pozici</option>',
    '<option>Majitel / jednatel</option><option>Ředitel</option><option>Vedoucí obchodu</option><option>Vedoucí provozu</option><option>Projektový manažer</option><option>Office / administrativa</option><option>Jiná</option>',
    '</select></div>',
    '<label class="form-check"><input type="checkbox" name="souhlas" required>',
    'Souhlasím se zpracováním osobních údajů za účelem vyřízení poptávky v souladu se <a href="/ochrana-osobnich-udaju" target="_blank" rel="noopener" onclick="event.stopPropagation()">zásadami ochrany osobních údajů</a>. <span class="req">*</span></label>',
    '<button type="submit" class="btn btn-primary form-submit">Odeslat</button>',
    '<p class="form-status" hidden></p>',
    '</form></div></div></div>'
  ].join('');

  var init = function () {
    if (document.getElementById('modal-konzultace')) return;

    var style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    var host = document.createElement('div');
    host.innerHTML = MARKUP;
    var overlay = host.firstChild;
    document.body.appendChild(overlay);

    var choice = overlay.querySelector('#konzultace-choice');
    var formView = overlay.querySelector('#konzultace-form');
    var form = overlay.querySelector('form');
    var status = overlay.querySelector('.form-status');

    var showView = function (view) {
      choice.classList.toggle('is-active', view === 'choice');
      formView.classList.toggle('is-active', view === 'form');
      if (view === 'form') {
        var fi = formView.querySelector('input');
        if (fi) setTimeout(function () { fi.focus(); }, 120);
      }
    };

    var open = function () {
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
    };
    var close = function () {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
      showView('choice');
    };

    document.querySelectorAll('[data-open="modal-konzultace"]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        open();
      });
    });
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
    overlay.querySelector('.modal-close').addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) close();
    });
    overlay.querySelector('#choice-zavolejte').addEventListener('click', function () { showView('form'); });
    overlay.querySelector('#konzultace-back').addEventListener('click', function () { showView('choice'); });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var payload = { type: 'konzultace', page: location.href };
      new FormData(form).forEach(function (v, k) { payload[k] = v; });
      var showStatus = function (ok, msg) {
        status.hidden = false;
        status.classList.remove('ok', 'err');
        status.classList.add(ok ? 'ok' : 'err');
        status.textContent = msg;
      };
      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).then(function (res) {
        if (!res.ok) throw new Error(res.status);
        showStatus(true, 'Odesláno. Ozveme se vám do jednoho pracovního dne.');
        form.reset();
      }).catch(function () {
        showStatus(false, 'Odeslání se nepovedlo. Zkuste to prosím znovu, nebo napište na info@plexima.io.');
      });
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
