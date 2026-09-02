// Jon Elton — YouTube channel integration
(function () {
  'use strict';

  var CHANNEL_URL = 'https://www.youtube.com/@jondelton';
  var CHANNEL_ID = 'UCI4w0Du4dhtalLyuyTH0GcA';

  // Real videos pulled from the channel's public RSS feed (Aug 2026)
  var VIDEOS = [
    { id: 'RTppZDl6lcA', title: '2007 Africa Trip 01', date: '2017', tag: 'Africa', desc: 'Part of Jon\u2019s trips serving children in Africa.' },
    { id: 'WGOXMT4w7Bk', title: 'Vancouver Game Farm', date: '2017', tag: 'Family', desc: 'A family day out with the animals.' },
    { id: '6u7uKBstX8Q', title: 'Home for Sale Ad', date: '2017', tag: 'Lake House', desc: 'A tour of the family home.' },
    { id: '1rtMGW8_hOo', title: 'Peru Trip \u2014 Chad, Treva & Me', date: '2016', tag: 'Travel', desc: 'Adventures in Peru with Chad and Treva.' },
    { id: 'UgNDClPJ1YY', title: 'Wayne\u2019s Squamish Branch Video', date: '2013', tag: 'Church', desc: 'A church branch celebration.' },
    { id: 'Ts5rvDCTMLk', title: 'Morgan and Byron Together at Last!!', date: '2012', tag: 'Family', desc: 'The cousins finally together!' },
    { id: 'W7oB0tgk-ss', title: 'Byron Tanner Elton', date: '2012', tag: 'Family', desc: 'A special look at Byron.' },
    { id: 'lK2C3EKGYgA', title: 'Grand Canyon River Rafting', date: '2012', tag: 'Travel', desc: 'Rafting the mighty Colorado.' },
    { id: 'lrjihTxT5Gw', title: 'Morgan Elzebeth Smith', date: '2012', tag: 'Family', desc: 'A moment with Morgan.' },
    { id: 'Ffs5BsrpRMc', title: 'Mediterranean Cruise 2011', date: '2012', tag: 'Travel', desc: 'HD cruise memories, HD 1080p.' },
    { id: 'OptCGAj_6so', title: 'Havasupai Man Trip w the Guys', date: '2012', tag: 'Travel', desc: 'A guys\u2019 trip to Havasupai Falls.' },
    { id: 'Tfn0-0pdm3Y', title: 'Pioneer Trek \u201997', date: '2011', tag: 'Church', desc: 'A pioneer trek to remember.' },
    { id: '5V1kEP672cA', title: 'Roger\u2019s Rhine River Rendezvous', date: '2011', tag: 'Travel', desc: 'A river cruise with Roger.' },
    { id: 'f9cik9ySWM4', title: 'Russia \u2014 Moscow & St Petersburg', date: '2011', tag: 'Travel', desc: 'Cruise through Russia\u2019s two great cities.' },
    { id: 'EpyCga6G2Uw', title: 'You\u2019ve Got a Friend in Me', date: '2011', tag: 'Music', desc: 'A song from the heart.' }
  ];

  function thumb(id) { return 'https://img.youtube.com/vi/' + id + '/mqdefault.jpg'; }
  function embedUrl(id) { return 'https://www.youtube.com/embed/' + id + '?rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin=https://Ryangit711.github.io'; }

  var playerWrap = document.getElementById('yt-player');
  var videoGrid = document.getElementById('yt-grid');
  var filterBar = document.getElementById('yt-filters');
  var nowTitle = document.getElementById('yt-now-title');
  var nowMeta = document.getElementById('yt-now-meta');

  if (!videoGrid) return;

  // ----- Filter buttons -----
  var tags = ['All'];
  VIDEOS.forEach(function (v) { if (tags.indexOf(v.tag) === -1) tags.push(v.tag); });
  tags.forEach(function (tag) {
    var b = document.createElement('button');
    b.className = 'chip' + (tag === 'All' ? ' active' : '');
    b.textContent = tag;
    b.addEventListener('click', function () {
      document.querySelectorAll('#yt-filters .chip').forEach(function (c) { c.classList.remove('active'); });
      b.classList.add('active');
      render(tag);
    });
    filterBar.appendChild(b);
  });

  // ----- Card rendering -----
  function render(tag) {
    var list = tag === 'All' ? VIDEOS : VIDEOS.filter(function (v) { return v.tag === tag; });
    videoGrid.innerHTML = '';
    list.forEach(function (v) {
      var card = document.createElement('button');
      card.className = 'yt-card reveal';
      card.innerHTML =
        '<div class="yt-thumb"><img src="' + thumb(v.id) + '" alt="' + v.title + '" loading="lazy">' +
        '<span class="yt-play">&#9654;</span><span class="yt-tag">' + v.tag + '</span></div>' +
        '<div class="yt-body"><h3>' + v.title + '</h3><p>' + v.desc + '</p><span class="yt-date">' + v.date + '</span></div>';
      card.addEventListener('click', function () { play(v); });
      videoGrid.appendChild(card);
    });
    // re-run reveal on new cards
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
      }, { threshold: 0.1 });
      videoGrid.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
    } else {
      videoGrid.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('visible'); });
    }
  }

  // ----- Player -----
  function play(v) {
    playerWrap.classList.add('loading');
    playerWrap.innerHTML =
      '<div class="yt-embed"><iframe src="' + embedUrl(v.id) +
      '" title="' + v.title + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>';
    if (nowTitle) nowTitle.textContent = v.title;
    if (nowMeta) nowMeta.textContent = v.tag + ' \u00b7 ' + v.date;
    var rect = playerWrap.getBoundingClientRect();
    window.scrollTo({ top: window.scrollY + rect.top - 90, behavior: 'smooth' });
  }

  // ----- Featured (first video loads on click only) -----
  function renderFeatured() {
    var v = VIDEOS[0];
    playerWrap.innerHTML =
      '<button class="yt-poster reveal" id="yt-poster">' +
      '<img src="' + thumb(v.id).replace('mqdefault', 'hqdefault') + '" alt="' + v.title + '">' +
      '<span class="yt-bigplay">&#9654;</span>' +
      '<span class="yt-poster-label">Watch "' + v.title + '"</span></button>';
    var poster = document.getElementById('yt-poster');
    poster.addEventListener('click', function () { play(v); });
    if (nowTitle) nowTitle.textContent = v.title;
    if (nowMeta) nowMeta.textContent = v.tag + ' \u00b7 ' + v.date;
  }

  renderFeatured();
  render('All');

  // ----- Subscribe button -----
  var sub = document.getElementById('yt-subscribe');
  if (sub) sub.href = CHANNEL_URL;

  var chanLink = document.getElementById('yt-channel-link');
  if (chanLink) chanLink.href = CHANNEL_URL;
})();
