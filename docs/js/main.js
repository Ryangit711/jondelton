// Jon D. Elton demo — mobile nav + scroll reveal + newsletter demo feedback
(function () {
  'use strict';

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  }

  // Scroll reveal
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  // Newsletter form demo feedback
  var forms = document.querySelectorAll('.newsletter form');
  forms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = document.createElement('p');
      note.className = 'form-note';
      note.style.color = '#ffd76a';
      note.style.fontWeight = 'bold';
      note.textContent = 'Thank you for subscribing — welcome to Gems from Jon!';
      form.parentNode.appendChild(note);
      form.reset();
    });
  });

  // Homepage featured video (click-to-play, then swap to embed)
  var poster = document.getElementById('home-poster');
  if (poster) {
    var id = 'RTppZDl6lcA';
    poster.addEventListener('click', function () {
      var wrap = document.getElementById('home-player');
      wrap.innerHTML =
        '<div class="yt-embed"><iframe src="https://www.youtube-nocookie.com/embed/' + id +
        '?rel=0&autoplay=1&modestbranding=1" title="Jon Elton — 2007 Africa Trip" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>';
    });
  }
})();
