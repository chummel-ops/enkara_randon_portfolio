(function () {
  document.documentElement.classList.add('js');

  // Rideau de transition entre les pages
  var v = document.createElement('div');
  v.className = 'veil';
  document.body.appendChild(v);
  requestAnimationFrame(function () {
    requestAnimationFrame(function () { v.classList.add('out'); });
  });
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (!a || a.target || e.metaKey || e.ctrlKey || e.shiftKey) return;
    var h = a.getAttribute('href');
    if (!h || h.charAt(0) === '#' || /^(https?:|mailto:|tel:)/.test(h)) return;
    e.preventDefault();
    v.classList.remove('out');
    setTimeout(function () { location.href = a.href; }, 520);
  });
  window.addEventListener('pageshow', function (ev) {
    if (ev.persisted) v.classList.add('out');
  });

  // Apparition au défilement
  var items = document.querySelectorAll('.rv');
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  items.forEach(function (el) { io.observe(el); });
})();