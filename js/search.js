// Jon D. Elton — site-wide search.
// On the search results page (search.html): loads search-index.json and renders ranked results.
// On every other page: the header search form navigates to search.html.

(function () {
  'use strict';

  function normalize(s) {
    return String(s || '')
      .toLowerCase()
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201c\u201d]/g, '"')
      .replace(/\u2026/g, ' ')
      .replace(/&/g, ' and ')
      .replace(/[^a-z0-9'\s-]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function escapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function termsOf(query) {
    return normalize(query).split(' ').filter(function (t) { return t.length > 1; });
  }

  function searchIndex(index, query) {
    var terms = termsOf(query);
    if (!terms.length) return [];
    var out = [];
    index.forEach(function (item) {
      var title = normalize(item.title);
      var tags = normalize((item.tags || []).join(' '));
      var cat = normalize(item.category || '');
      var text = normalize(item.text);
      var hay = title + ' ' + tags + ' ' + cat + ' ' + text;
      var score = 0;
      var all = true;
      terms.forEach(function (t) {
        if (title.indexOf(t) !== -1) score += 40;
        if (tags.indexOf(t) !== -1) score += 20;
        if (cat.indexOf(t) !== -1) score += 10;
        if (text.indexOf(t) !== -1) score += 5;
        if (hay.indexOf(t) === -1) all = false;
      });
      if (all) out.push({ item: item, score: score });
    });
    out.sort(function (a, b) { return b.score - a.score; });
    return out;
  }

  function makeSnippet(text, terms) {
    var first = -1;
    terms.forEach(function (t) {
      var i = text.indexOf(t);
      while (i !== -1) {
        if (first === -1 || i < first) first = i;
        i = text.indexOf(t, i + 1);
      }
    });
    var start = Math.max(0, (first === -1 ? 0 : first) - 60);
    var snip = text.slice(start, start + 220);
    if (start > 0) snip = '\u2026 ' + snip.replace(/^\S+\s+/, '');
    if (start + 220 < text.length) snip = snip.replace(/\S+\s+$/, '') + ' \u2026';
    var escaped = snip.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    terms.forEach(function (t) {
      var re = new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
      escaped = escaped.replace(re, '<mark>$1</mark>');
    });
    return escaped;
  }

  function renderResults(results, query, resultsEl, summaryEl) {
    var q = query.trim();
    if (summaryEl) {
      summaryEl.textContent = results.length
        ? results.length + ' result' + (results.length === 1 ? '' : 's') + ' for "' + q + '"'
        : 'No matches for "' + q + '"';
    }
    document.title = q + ' \u2014 Search | Jon D. Elton';

    if (!results.length) {
      resultsEl.innerHTML = '<p class="search-empty">Nothing found for &ldquo;' + escapeHtml(q) +
        '&rdquo;. Try a different word, e.g. &ldquo;mother&rdquo;, &ldquo;lake&rdquo;, &ldquo;Africa&rdquo;, or &ldquo;poetry&rdquo;.</p>';
      return;
    }

    var terms = termsOf(q);
    var list = document.createElement('ol');
    list.className = 'search-results';
    results.slice(0, 15).forEach(function (r) {
      var li = document.createElement('li');
      li.className = 'search-result';

      var cat = document.createElement('span');
      cat.className = 'search-cat';
      cat.textContent = r.item.category || 'Page';

      var a = document.createElement('a');
      a.className = 'search-title';
      a.href = r.item.url;
      a.textContent = r.item.title;

      var p = document.createElement('p');
      p.className = 'search-snippet';
      p.innerHTML = makeSnippet(normalize(r.item.text), terms);

      li.appendChild(cat);
      li.appendChild(a);
      li.appendChild(p);
      list.appendChild(li);
    });
    resultsEl.innerHTML = '';
    resultsEl.appendChild(list);
  }

  // ---------- Search results page ----------
  var resultsEl = document.getElementById('search-results');
  if (resultsEl) {
    var summaryEl = document.getElementById('search-summary');
    var heroInput = document.getElementById('search-hero-input');
    var params = new URLSearchParams(window.location.search);
    var query = params.get('q') || '';
    if (heroInput) heroInput.value = query;

    var scripts = document.getElementsByTagName('script');
    var indexUrl = 'search-index.json';
    for (var i = 0; i < scripts.length; i++) {
      var src = scripts[i].getAttribute('src') || '';
      if (/search\.js/.test(src)) {
        indexUrl = src.replace(/\/js\/search\.js.*$/, '/search-index.json');
        break;
      }
    }

    if (!query.trim()) {
      resultsEl.innerHTML = '<p class="search-empty">Type a few words above to search the whole site &mdash; poems, videos, the lake house, family, and more.</p>';
      if (summaryEl) summaryEl.textContent = '';
      return;
    }

    fetch(indexUrl)
      .then(function (res) { return res.json(); })
      .then(function (index) { renderResults(searchIndex(index, query), query, resultsEl, summaryEl); })
      .catch(function () {
        if (summaryEl) summaryEl.textContent = 'Search unavailable';
        resultsEl.innerHTML = '<p class="search-empty">Sorry, the search index could not be loaded.</p>';
      });
    return;
  }

  // ---------- Non-search pages: validate before submitting ----------
  var headerForm = document.querySelector('.site-search');
  if (headerForm) {
    headerForm.addEventListener('submit', function (e) {
      var box = headerForm.querySelector('input[name="q"]');
      if (!box || !box.value.trim()) {
        e.preventDefault();
        if (box) box.focus();
      }
    });
  }
})();
