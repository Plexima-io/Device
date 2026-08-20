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
    'body.modal-open{overflow:hidden}',
    '.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}',
    '.form-field{display:flex;flex-direction:column;gap:6px}',
    '.form-field.full{grid-column:1/-1}',
    '.form-field label{font:600 14px/1.4 var(--font-body);color:var(--ink)}',
    '.form-field label .req{color:#D9534F}',
    '.form-field input,.form-field select{min-height:48px;padding:12px 16px;border:1px solid var(--border);border-radius:var(--radius-md);background:var(--soft);color:var(--ink);font:400 16px/1.4 var(--font-body);width:100%}',
    '.form-field input:focus,.form-field select:focus{border-color:var(--blue);outline:2px solid rgba(110,193,228,.25)}',
    '.form-check{grid-column:1/-1;display:flex;align-items:flex-start;gap:10px;font-size:14px;color:var(--muted);cursor:pointer}',
    '.form-check input[type=checkbox]{flex:0 0 20px;width:20px;height:20px;margin:1px 0 0;accent-color:#FEC710}',
    '.form-check .fc-text{flex:1 1 auto}',
    '.form-check .fc-text strong{color:var(--ink);font-weight:700}',
    '.form-check a{color:var(--ink);font-weight:600}',
    '.form-submit{grid-column:1/-1;margin-top:4px;width:100%}',
    '.form-status{grid-column:1/-1;border-radius:var(--radius-md);padding:14px 16px;font-size:14px;border:1px solid}',
    '.form-status.ok{background:rgba(57,181,74,.10);border-color:rgba(57,181,74,.36);color:var(--ink)}',
    '.form-status.err{background:rgba(217,83,79,.10);border-color:rgba(217,83,79,.36);color:var(--ink)}',
    '.form-section{grid-column:1/-1;display:flex;align-items:center;gap:10px;margin-top:8px;font:700 12px/1 var(--font-body);letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}',
    '.form-section::after{content:"";flex:1;height:1px;background:var(--border)}',
    '.form-section:first-child{margin-top:0}',
    '.order-summary{grid-column:1/-1;display:flex;flex-wrap:wrap;align-items:center;gap:12px;padding:14px 16px;border-radius:var(--radius-md);background:var(--soft);border:1px solid var(--border)}',
    '.order-summary .os-left{flex:1 1 150px;display:flex;flex-direction:column;gap:3px}',
    '.order-summary .os-name{font:700 15px/1.3 var(--font-heading);color:var(--ink)}',
    '.order-summary .os-unit{font:400 13px/1.3 var(--font-body);color:var(--muted)}',
    '.os-qty{display:flex;align-items:center;gap:4px}',
    '.os-qty button{width:36px;height:44px;border:1px solid var(--border);border-radius:var(--radius-sm);background:var(--white);color:var(--ink);font:700 18px/1 var(--font-body);cursor:pointer;transition:border-color .15s ease,background .15s ease}',
    '.os-qty button:hover{border-color:var(--blue)}',
    '.os-qty button:focus-visible{outline:2px solid var(--blue);outline-offset:2px}',
    '.os-qty input{width:60px;height:44px;padding:0;text-align:center;border:1px solid var(--border);border-radius:var(--radius-sm);background:var(--white);color:var(--ink);font:700 16px/1 var(--font-body);font-variant-numeric:tabular-nums;-moz-appearance:textfield}',
    '.os-qty input::-webkit-outer-spin-button,.os-qty input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}',
    '.os-qty input:focus{border-color:var(--blue);outline:2px solid rgba(110,193,228,.25)}',
    '.order-summary .os-price{margin-left:auto;font:800 18px/1.2 var(--font-heading);color:var(--ink);font-variant-numeric:tabular-nums;white-space:nowrap}',
    '.billing-fields[hidden]{display:none}',
    '.billing-fields{grid-column:1/-1;display:grid;grid-template-columns:1fr 1fr;gap:16px}',
    '@media (max-width:767px){.form-grid{grid-template-columns:1fr}.billing-fields{grid-template-columns:1fr}}'
  ].join('');

  var init = function () {
    var trigger = document.querySelector('[data-open="modal-objednavka"]');
    if (!trigger || document.getElementById('modal-objednavka')) return;

    var titleEl = document.querySelector('.product-title');
    var priceEl = document.querySelector('.price-value');
    var device = titleEl ? titleEl.textContent.trim() : 'Zařízení';
    var price = priceEl ? priceEl.textContent.trim() : '';
    var digits = price.replace(/[^0-9]/g, '');
    var unitPrice = digits ? parseInt(digits, 10) : 0;
    var formatCzk = function (value) { return value.toLocaleString('cs-CZ') + ' Kč'; };
    var buyLabel = /plaud/i.test(device) ? 'Koupit Plaud' : (/omi/i.test(device) ? 'Koupit Omi' : 'Koupit');

    var MARKUP = [
      '<div class="modal-overlay" id="modal-objednavka" aria-hidden="true">',
      '<div class="modal" role="dialog" aria-modal="true" aria-labelledby="objednavka-title">',
      '<button type="button" class="modal-close" aria-label="Zavřít">✕</button>',
      '<h3 id="objednavka-title">Objednávka</h3>',
      '<p class="modal-lead">Vyplňte údaje a my se do jednoho pracovního dne ozveme s potvrzením a dalšími kroky.</p>',
      '<form class="form-grid" data-type="objednavka" novalidate>',
      '<div class="order-summary">',
      '<span class="os-left"><span class="os-name">' + device + '</span><span class="os-unit">' + (unitPrice ? price + ' / kus' : price) + '</span></span>',
      '<span class="os-qty">',
      '<button type="button" data-step="-1" aria-label="Snížit počet kusů">−</button>',
      '<input type="number" id="o-pocet" name="pocet" value="1" min="1" max="99" step="1" inputmode="numeric" required aria-label="Počet kusů">',
      '<button type="button" data-step="1" aria-label="Zvýšit počet kusů">+</button>',
      '</span>',
      '<span class="os-price" id="o-total">' + price + '</span>',
      '</div>',
      '<div class="form-section">Kontaktní údaje</div>',
      '<div class="form-field"><label for="o-jmeno">Jméno a příjmení <span class="req">*</span></label><input type="text" id="o-jmeno" name="jmeno" required autocomplete="name"></div>',
      '<div class="form-field"><label for="o-firma">Firma <span class="req">*</span></label><input type="text" id="o-firma" name="firma" required autocomplete="organization"></div>',
      '<div class="form-field"><label for="o-telefon">Telefon <span class="req">*</span></label><input type="tel" id="o-telefon" name="telefon" required minlength="9" pattern=".{9,}" title="Zadejte alespoň 9 znaků" autocomplete="tel"></div>',
      '<div class="form-field"><label for="o-email">E-mail <span class="req">*</span></label><input type="email" id="o-email" name="email" required autocomplete="email"></div>',
      '<div class="form-field full"><label for="o-ulice">Ulice a číslo <span class="req">*</span></label><input type="text" id="o-ulice" name="ulice" required autocomplete="street-address"></div>',
      '<div class="form-field"><label for="o-mesto">Město <span class="req">*</span></label><input type="text" id="o-mesto" name="mesto" required autocomplete="address-level2"></div>',
      '<div class="form-field"><label for="o-psc">PSČ <span class="req">*</span></label><input type="text" id="o-psc" name="psc" required inputmode="numeric" autocomplete="postal-code"></div>',
      '<div class="form-section">Fakturační údaje</div>',
      '<label class="form-check"><input type="checkbox" id="o-fakt-stejne"><span class="fc-text">Fakturační údaje jsou stejné jako kontaktní</span></label>',
      '<div class="billing-fields" id="o-billing" hidden>',
      '<div class="form-field full"><label for="o-fakt-firma">Firma <span class="req">*</span></label><input type="text" id="o-fakt-firma" name="fakt_firma" autocomplete="organization"></div>',
      '<div class="form-field"><label for="o-fakt-ico">IČO</label><input type="text" id="o-fakt-ico" name="fakt_ico" inputmode="numeric"></div>',
      '<div class="form-field"><label for="o-fakt-dic">DIČ</label><input type="text" id="o-fakt-dic" name="fakt_dic"></div>',
      '<div class="form-field full"><label for="o-fakt-ulice">Ulice a číslo <span class="req">*</span></label><input type="text" id="o-fakt-ulice" name="fakt_ulice"></div>',
      '<div class="form-field"><label for="o-fakt-mesto">Město <span class="req">*</span></label><input type="text" id="o-fakt-mesto" name="fakt_mesto"></div>',
      '<div class="form-field"><label for="o-fakt-psc">PSČ <span class="req">*</span></label><input type="text" id="o-fakt-psc" name="fakt_psc" inputmode="numeric"></div>',
      '</div>',
      '<label class="form-check"><input type="checkbox" id="o-automatizace" name="automatizace"><span class="fc-text">Mám zájem o nastavení <strong>integrace a automatizace</strong></span></label>',
      '<label class="form-check"><input type="checkbox" name="souhlas" required>',
      '<span class="fc-text">Souhlasím se zpracováním osobních údajů za účelem vyřízení objednávky v souladu se <a href="/ochrana-osobnich-udaju" target="_blank" rel="noopener" onclick="event.stopPropagation()">zásadami ochrany osobních údajů</a>. <span class="req">*</span></span></label>',
      '<button type="submit" class="btn btn-primary form-submit">' + buyLabel + '</button>',
      '<p class="form-status" hidden></p>',
      '</form></div></div>'
    ].join('');

    var style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    var host = document.createElement('div');
    host.innerHTML = MARKUP;
    var overlay = host.firstChild;
    document.body.appendChild(overlay);

    var form = overlay.querySelector('form');
    var status = overlay.querySelector('.form-status');
    var sameCheck = overlay.querySelector('#o-fakt-stejne');
    var billing = overlay.querySelector('#o-billing');
    var billingRequired = ['#o-fakt-firma', '#o-fakt-ulice', '#o-fakt-mesto', '#o-fakt-psc'].map(function (sel) {
      return overlay.querySelector(sel);
    });
    var qtyInput = overlay.querySelector('#o-pocet');
    var totalEl = overlay.querySelector('#o-total');

    var readQty = function () {
      var n = parseInt(qtyInput.value, 10);
      if (isNaN(n) || n < 1) n = 1;
      if (n > 99) n = 99;
      return n;
    };
    var renderTotal = function () {
      if (!unitPrice) return;
      totalEl.textContent = formatCzk(unitPrice * readQty());
    };
    qtyInput.addEventListener('input', renderTotal);
    qtyInput.addEventListener('blur', function () { qtyInput.value = readQty(); renderTotal(); });
    overlay.querySelectorAll('.os-qty button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        qtyInput.value = readQty() + parseInt(btn.getAttribute('data-step'), 10);
        qtyInput.value = readQty();
        renderTotal();
      });
    });

    var autoCheck = overlay.querySelector('#o-automatizace');
    var pageAuto = document.querySelector('.check-box input[name="automatizace"]');

    var syncBilling = function () {
      var same = sameCheck.checked;
      billing.hidden = same;
      billingRequired.forEach(function (input) {
        if (same) { input.removeAttribute('required'); } else { input.setAttribute('required', 'required'); }
      });
    };
    sameCheck.addEventListener('change', syncBilling);
    syncBilling();

    var open = function () {
      if (pageAuto) autoCheck.checked = pageAuto.checked;
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      setTimeout(function () { overlay.querySelector('#o-jmeno').focus(); }, 120);
    };
    var close = function () {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
    };

    document.querySelectorAll('[data-open="modal-objednavka"]').forEach(function (btn) {
      btn.addEventListener('click', function (e) { e.preventDefault(); open(); });
    });
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
    overlay.querySelector('.modal-close').addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) close();
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var payload = { type: 'objednavka', page: location.href, zarizeni: device, cena_za_kus: price };
      if (unitPrice) payload.celkem = formatCzk(unitPrice * readQty());
      new FormData(form).forEach(function (v, k) { payload[k] = v; });
      if (sameCheck.checked) {
        payload.fakt_firma = payload.firma;
        payload.fakt_ulice = payload.ulice;
        payload.fakt_mesto = payload.mesto;
        payload.fakt_psc = payload.psc;
        payload.fakturace = 'stejná jako kontaktní údaje';
      }
      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).then(function (res) {
        if (!res.ok) throw new Error(res.status);
        location.href = '/dekujeme';
      }).catch(function () {
        status.hidden = false;
        status.classList.remove('ok');
        status.classList.add('err');
        status.textContent = 'Odeslání se nepovedlo. Zkuste to prosím znovu, nebo napište na info@plexima.io.';
      });
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
