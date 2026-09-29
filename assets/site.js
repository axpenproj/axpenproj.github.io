// Axpenproj — scroll reveals and the screenshot lightbox. Everything still works without it.
(function () {
  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  if ('IntersectionObserver' in window && !reduced) {
    document.documentElement.classList.add('js');
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  }

  var box = document.querySelector('dialog.lightbox');
  if (box && box.showModal) {
    var big = box.querySelector('img');
    document.querySelectorAll('.strip button').forEach(function (b) {
      b.addEventListener('click', function () {
        var img = b.querySelector('img');
        big.src = img.src; big.alt = img.alt;
        box.showModal();
      });
    });
    box.addEventListener('click', function (e) { if (e.target === box || e.target === big) box.close(); });
  }
})();
