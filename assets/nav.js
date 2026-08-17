(function () {
  var dropdowns = document.querySelectorAll('.nav-dd');
  var HOVER_DELAY = 220;

  function open(dd) {
    clearTimeout(dd._navTimer);
    dd.classList.add('is-open');
    dd.querySelector('.nav-dd-toggle').setAttribute('aria-expanded', 'true');
  }

  function close(dd) {
    clearTimeout(dd._navTimer);
    dd.classList.remove('is-open');
    dd.querySelector('.nav-dd-toggle').setAttribute('aria-expanded', 'false');
  }

  function closeSoon(dd) {
    clearTimeout(dd._navTimer);
    dd._navTimer = setTimeout(function () { close(dd); }, HOVER_DELAY);
  }

  dropdowns.forEach(function (dd) {
    var toggle = dd.querySelector('.nav-dd-toggle');

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      if (dd.classList.contains('is-open')) close(dd);
      else open(dd);
    });

    dd.addEventListener('mouseenter', function () { open(dd); });
    dd.addEventListener('mouseleave', function () { closeSoon(dd); });
    dd.addEventListener('focusin', function () { open(dd); });
    dd.addEventListener('focusout', function (e) {
      if (!dd.contains(e.relatedTarget)) close(dd);
    });
  });

  document.addEventListener('click', function (e) {
    dropdowns.forEach(function (dd) {
      if (dd.classList.contains('is-open') && !dd.contains(e.target)) close(dd);
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    dropdowns.forEach(function (dd) {
      if (dd.classList.contains('is-open')) close(dd);
    });
  });
})();
