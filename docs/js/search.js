// Simple client‑side search – hides non‑matching items
document.addEventListener('DOMContentLoaded', function () {
  var input = document.getElementById('site-search');
  if (!input) return;
  input.addEventListener('input', function () {
    var term = this.value.trim().toLowerCase();
    var selectors = '.reveal, .gem, .yt-card, .card, .yt-poster';
    var elems = document.querySelectorAll(selectors);
    elems.forEach(function (el) {
      if (term === '') {
        el.style.display = '';
        return;
      }
      var txt = el.textContent.toLowerCase();
      el.style.display = txt.includes(term) ? '' : 'none';
    });
  });
});