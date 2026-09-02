// Jon D. Elton — "Jon's Gems" archive: browsable list + search + reader.
// Renders from window.JONS_GEMS (see js/gems-data.js).

(function () {
  'use strict';

  var gems = (typeof window !== 'undefined' && window.JONS_GEMS) || [];

  var listEl = document.getElementById('gems-archive');
  var toolbarEl = document.getElementById('gems-toolbar');
  var readerEl = document.getElementById('gems-reader');
  if (!listEl || !toolbarEl || !gems.length) return;

  var inputEl = toolbarEl.querySelector('.gems-search-input');
  var clearBtn = toolbarEl.querySelector('.gems-clear');
  var metaEl = toolbarEl.querySelector('.gems-meta');
  var readerTitleEl = readerEl.querySelector('.gems-reader-title');
  var readerLabelEl = readerEl.querySelector('.gems-reader-label');
  var readerBodyEl = readerEl.querySelector('.gems-body');
  var closeBtn = readerEl.querySelector('.gems-reader-close');

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

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

  function termsOf(q) {
    return normalize(q).split(' ').filter(function (t) { return t.length > 1; });
  }

  function groupMatches(gem, terms) {
    return terms.every(function (t) {
      var hay = normalize(gem.label + ' ' + gem.title + ' ' + gem.body);
      return hay.indexOf(t) !== -1;
    });
  }

  function highlight(body, terms) {
    if (!terms.length) return escapeHtml(body);
    var escaped = escapeHtml(body);
    terms.forEach(function (t) {
      var re = new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
      escaped = escaped.replace(re, '<mark>$1</mark>');
    });
    return escaped;
  }

  function renderList(query) {
    var terms = termsOf(query);
    var filtered = terms.length ? gems.filter(function (g) { return groupMatches(g, terms); }) : gems;

    // group by year (reverse-chron already), build year blocks in order of appearance
    var byYear = {};
    var order = [];
    filtered.forEach(function (g) {
      if (!byYear[g.year]) { byYear[g.year] = []; order.push(g.year); }
      byYear[g.year].push(g);
    });

    var html = '';
    order.forEach(function (year) {
      html += '<div class="gems-year">';
      html += '<h3 class="gems-year-title">' + year + '</h3>';
      html += '<ul class="gems-list">';
      byYear[year].forEach(function (g) {
        html += '<li>';
        html += '<span class="gem-label">' + escapeHtml(g.label) +
          (g.note ? '<span class="gem-note">' + escapeHtml(g.note) + '</span>' : '') + '</span>';
        html += '<button type="button" class="gems-read" data-id="' + g.id + '">Read &rarr;</button>';
        html += '</li>';
      });
      html += '</ul></div>';
    });

    if (!filtered.length) {
      html = '<p class="gems-empty">No Gems matched &ldquo;' + escapeHtml(query.trim()) +
        '&rdquo;. Try a word or phrase from one of Jon&rsquo;s letters, e.g. &ldquo;Africa&rdquo;, &ldquo;love&rdquo;, or &ldquo;wisdom&rdquo;.</p>';
    }

    listEl.innerHTML = html;

    if (metaEl) {
      metaEl.textContent = filtered.length + (filtered.length === 1 ? ' issue' : ' issues') +
        ' of ' + gems.length + (terms.length ? ' matching "' + query.trim() + '"' : '');
    }
  }

  function openReader(id) {
    var g = gems.find(function (x) { return x.id === id; });
    if (!g) return;
    if (readerTitleEl) readerTitleEl.textContent = g.title;
    if (readerLabelEl) readerLabelEl.textContent = g.label;
    if (readerBodyEl) {
      var terms = termsOf(inputEl.value);
      readerBodyEl.innerHTML = highlight(g.body, terms);
    }
    readerEl.style.display = 'block';
    readerEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Events
  if (inputEl) {
    inputEl.addEventListener('input', function () { renderList(inputEl.value); });
    inputEl.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); readerEl.style.display = 'none'; }
    });
  }
  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      if (inputEl) { inputEl.value = ''; inputEl.focus(); }
      renderList('');
      readerEl.style.display = 'none';
    });
  }
  listEl.addEventListener('click', function (e) {
    var btn = e.target.closest('.gems-read');
    if (btn) openReader(parseInt(btn.getAttribute('data-id'), 10));
  });
  if (closeBtn) {
    closeBtn.addEventListener('click', function () { readerEl.style.display = 'none'; });
  }

  // Initial render
  renderList('');
  readerEl.style.display = 'none';
})();
