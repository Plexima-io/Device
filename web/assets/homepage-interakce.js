/* Homepage memory.plexima.io: interaktivní prvky (11/2026). Bez knihoven. */
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    || document.documentElement.classList.contains('no-motion');
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var wait = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };

  /* ---------- Hero A: živá ukázka rozhovor -> výstupy ---------- */
  (function () {
    var demo = $('#live-demo');
    if (!demo) return;
    var lines = $$('.ld-line', demo);
    var marks = $$('mark', demo);
    var cards = $$('.ld-card', demo);
    var chips = $$('.ld-chip', demo);
    var setAll = function (on) {
      lines.forEach(function (l) { l.classList.toggle('is-in', on); });
      marks.forEach(function (m) { m.classList.toggle('is-lit', on); });
      cards.forEach(function (c) { c.classList.toggle('is-filled', on); });
    };
    if (reduced) { setAll(true); return; }

    var visible = true;
    var running = false;
    var fly = function (i) {
      var chip = chips[i], mark = marks[i], card = cards[i];
      var box = demo.getBoundingClientRect();
      var m = mark.getBoundingClientRect();
      var c = card.getBoundingClientRect();
      var x0 = m.left - box.left, y0 = m.top - box.top - 4;
      var x1 = c.left - box.left + c.width - chip.offsetWidth - 46, y1 = c.top - box.top + (c.height - chip.offsetHeight) / 2;
      chip.style.transition = 'none';
      chip.style.transform = 'translate(' + x0 + 'px,' + y0 + 'px) scale(.8)';
      chip.style.opacity = '0';
      chip.getBoundingClientRect();
      chip.style.transition = 'transform .35s cubic-bezier(.3,1.5,.5,1), opacity .25s ease';
      chip.style.transform = 'translate(' + x0 + 'px,' + (y0 - 22) + 'px) scale(1)';
      chip.style.opacity = '1';
      return wait(520).then(function () {
        chip.style.transition = 'transform .8s cubic-bezier(.6,0,.25,1), opacity .3s ease .6s';
        chip.style.transform = 'translate(' + x1 + 'px,' + y1 + 'px) scale(.92)';
        chip.style.opacity = '0';
        return wait(700);
      }).then(function () { card.classList.add('is-filled'); });
    };
    var loop = function () {
      if (!visible || document.hidden) { running = false; return; }
      running = true;
      setAll(false);
      chips.forEach(function (ch) { ch.style.opacity = '0'; });
      var p = wait(500);
      lines.forEach(function (line, i) {
        p = p.then(function () { line.classList.add('is-in'); return wait(650); })
          .then(function () { marks[i].classList.add('is-lit'); return wait(450); })
          .then(function () { return fly(i); })
          .then(function () { return wait(250); });
      });
      p.then(function () { return wait(3200); }).then(loop);
    };
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        if (visible && !running) loop();
      }, { threshold: 0.2 }).observe(demo);
    } else { loop(); }
    document.addEventListener('visibilitychange', function () { if (!document.hidden && visible && !running) loop(); });
  })();

  /* ---------- Srovnávací slider ---------- */
  (function () {
    var cmp = $('#cmp');
    if (!cmp) return;
    var range = $('.cmp-range', cmp);
    var set = function () {
      var v = +range.value;
      cmp.style.setProperty('--pos', v + '%');
      cmp.style.setProperty('--pos-px', (cmp.clientWidth * v / 100) + 'px');
    };
    range.addEventListener('input', set);
    window.addEventListener('resize', set);
    set();
  })();

  /* ---------- Sticky scroll: Zachytit / Pochopit / Napojit ---------- */
  (function () {
    var track = $('#pin-track');
    if (!track) return;
    var steps = $$('.pin-step', track);
    var navBtns = $$('.pin-nav-btn', track);
    var fill = $('#pin-progress-fill');
    var stages = $$('.pv-stage', track);
    var pinned = window.matchMedia('(min-width: 768px) and (min-height: 641px)');
    var current = -1;

    var scaleStages = function () {
      stages.forEach(function (st) {
        var w = st.parentNode.clientWidth;
        if (w) st.style.setProperty('--pv-scale', (w / 520).toFixed(4));
      });
    };
    var activate = function (i) {
      if (i === current) return;
      current = i;
      steps.forEach(function (s, k) { s.classList.toggle('is-active', k === i); });
      navBtns.forEach(function (b, k) {
        b.classList.toggle('is-active', k === i);
        if (k === i) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
      });
    };
    var progress = function () {
      var r = track.getBoundingClientRect();
      var total = track.offsetHeight - window.innerHeight;
      return total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
    };
    var ticking = false;
    var onScroll = function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        ticking = false;
        if (!pinned.matches) return;
        var p = progress();
        fill.style.transform = 'scaleY(' + p.toFixed(4) + ')';
        activate(Math.min(steps.length - 1, Math.floor(p * steps.length)));
      });
    };

    /* Mobil: kroky pod sebou, každý se objeví při najetí */
    var mobileObserver = null;
    var setupMode = function () {
      scaleStages();
      if (pinned.matches) {
        if (mobileObserver) { mobileObserver.disconnect(); mobileObserver = null; }
        current = -1;
        onScroll();
        if (current === -1) activate(0);
      } else {
        current = -1;
        if (reduced || !('IntersectionObserver' in window)) {
          steps.forEach(function (s) { s.classList.add('is-active'); });
          return;
        }
        steps.forEach(function (s) { s.classList.remove('is-active'); });
        mobileObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) { e.target.classList.add('is-active'); mobileObserver.unobserve(e.target); }
          });
        }, { threshold: 0.25 });
        steps.forEach(function (s) { mobileObserver.observe(s); });
      }
    };

    navBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var i = +btn.getAttribute('data-step');
        var total = track.offsetHeight - window.innerHeight;
        var top = track.getBoundingClientRect().top + window.scrollY + total * ((i + 0.5) / steps.length);
        window.scrollTo({ top: top, behavior: reduced ? 'auto' : 'smooth' });
      });
    });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', function () { scaleStages(); onScroll(); });
    if (pinned.addEventListener) pinned.addEventListener('change', setupMode);
    setupMode();
  })();

  /* ---------- Zeptejte se firemní paměti (předpřipravené ukázky) ---------- */
  (function () {
    var demo = $('#ask-demo');
    if (!demo) return;
    var log = $('#ask-log');
    var chips = $$('.ask-chip', demo);
    var QA = [
      { q: 'Proč jsme v březnu změnili dodavatele?',
        a: 'Původní dodavatel dvakrát nedodržel termín dodání a nový nabídl servis do 24 hodin. Rozhodnutí padlo na poradě vedení po porovnání tří nabídek.',
        src: ['Porada vedení · 12. 3. 2026 · Jana Králová, Petr Novák', 'Provozní schůzka · 5. 3. 2026 · Petr Novák'] },
      { q: 'Co jsme slíbili klientovi na poslední schůzce?',
        a: 'Do pátku pošleme upravený harmonogram a do konce měsíce zprovozníme export do jejich účetního systému. Kontaktní osobou zůstává Martin.',
        src: ['Schůzka s klientem · 18. 11. 2026 · Martin Dvořák, Eva Horáková'] },
      { q: 'Které téma se na poradách opakuje?',
        a: 'Kapacita IT týmu. Za poslední dva měsíce zazněla na 6 z 8 porad, nejčastěji v souvislosti s napojením CRM a termínem pilotu.',
        src: ['Týdenní porady · září až listopad 2026 · 8 záznamů'] },
      { q: 'Kdo má na starosti napojení CRM?',
        a: 'Martin Dvořák, s termínem do 31. 3. Úkol vznikl na poradě vedení a je zapsaný v projektovém nástroji.',
        src: ['Porada vedení · 12. 3. 2026 · Tomáš Beneš', 'Projektový nástroj · úkol přiřazen 12. 3. 2026'] }
    ];
    var run = 0;
    var el = function (tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text) n.textContent = text; return n; };
    var ask = function (i) {
      var my = ++run;
      chips.forEach(function (c, k) { c.classList.toggle('is-active', k === i); c.setAttribute('aria-pressed', k === i); });
      var item = QA[i];
      log.innerHTML = '';
      log.appendChild(el('p', 'ask-q', item.q));
      var ans = el('div', 'ask-a');
      var label = el('span', 'ask-a-label', 'Firemní paměť');
      label.insertBefore(el('i'), label.firstChild);
      var text = el('p', 'ask-a-text');
      ans.appendChild(label);
      ans.appendChild(text);
      log.appendChild(ans);
      var showSources = function () {
        var box = el('div', 'ask-sources');
        item.src.forEach(function (s) { box.appendChild(el('span', '', s)); });
        ans.appendChild(box);
      };
      if (reduced) { text.textContent = item.a; showSources(); return; }
      var caret = el('span', 'ask-caret');
      var pos = 0;
      var tick = function () {
        if (my !== run) return;
        pos = Math.min(item.a.length, pos + 2);
        text.textContent = item.a.slice(0, pos);
        text.appendChild(caret);
        if (pos < item.a.length) setTimeout(tick, 22);
        else { caret.remove(); showSources(); }
      };
      setTimeout(tick, 450);
    };
    chips.forEach(function (c, i) { c.addEventListener('click', function () { ask(i); }); });
  })();

  /* ---------- Zařízení: přepínač Máme / Nemáme a záložky Omi / Plaud ---------- */
  var tabs = function (btnSel, attr, panels, onChange) {
    var btns = $$(btnSel);
    btns.forEach(function (b, i) {
      b.addEventListener('click', function () {
        btns.forEach(function (x, k) {
          x.classList.toggle('is-active', k === i);
          x.setAttribute('aria-selected', k === i);
        });
        panels.forEach(function (p, k) { p.hidden = k !== i; });
        if (onChange) onChange(i);
      });
      b.addEventListener('keydown', function (e) {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        var n = (i + (e.key === 'ArrowRight' ? 1 : btns.length - 1)) % btns.length;
        btns[n].focus();
        btns[n].click();
      });
    });
  };
  var seg = $('.seg');
  if (seg) tabs('.seg-btn', 'data-have', $$('.have-panel'), function (i) { seg.setAttribute('data-active', i); });
  if ($('.dev-tab')) tabs('.dev-tab', 'data-dev', $$('.dev-stage'));

  /* ---------- Přilepené CTA na mobilu až po odscrollování hero ---------- */
  (function () {
    var bar = $('.sticky-cta');
    var hero = $('.hero');
    if (!bar || !hero) return;
    if (!('IntersectionObserver' in window)) { bar.classList.add('is-visible'); return; }
    new IntersectionObserver(function (entries) {
      bar.classList.toggle('is-visible', !entries[0].isIntersecting);
    }, { threshold: 0 }).observe(hero);
  })();
})();
