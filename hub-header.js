/* Shared review-hub header — ONE uniform header across every hub nav page, on
 * BOTH hubs (LP Review Hub + Social hub). Single source of truth; kept as an
 * identical copy in each hub folder (public/harassment-lp/ + public/social-hub/).
 *
 * Usage on a page:
 *   <div id="hub-header" data-page="ads-map" data-hub="lp"></div>
 *   <script src="hub-header.js"></script>
 * Optional data-crumb="…" overrides the current (leaf) breadcrumb label — used by
 * blog-post.html to show the article title.
 *
 * Renders a dark bar (#111418 / accent #ff6b73):
 *   [logo]  <Hub> › <Page>            ...........  [Sections ▾]
 *           <subtitle>
 * Cross-hub links resolve to the live mirror; same-hub links stay relative. The
 * interactive review.html keeps its own tool controls (mix/phone/search) in a
 * second row below this bar. */
(function () {
  var mount = document.getElementById('hub-header');
  if (!mount) return;
  var page = mount.getAttribute('data-page') || '';
  var hub  = mount.getAttribute('data-hub') || 'lp';
  var leafOverride = mount.getAttribute('data-crumb') || '';

  var HUBS = {
    lp:     { label: 'LP Review Hub', root: 'review.html', base: 'https://2-human.github.io/credo-public-harassment-lp/' },
    social: { label: 'Social Hub',    root: 'index.html',  base: 'https://2-human.github.io/credo-public-social-hub/' }
  };
  /* Resolve a target (hub,file) to an href: relative within the current hub,
   * absolute (live mirror) across hubs. */
  function href(targetHub, file) {
    return targetHub === hub ? file : (HUBS[targetHub] ? HUBS[targetHub].base + file : file);
  }

  var META = {
    'review':      { hub: 'lp',     name: 'LP Review',       sub: '32 landing-page variants across 7 debt clusters', root: true },
    'ads-map':     { hub: 'lp',     name: 'Ads → LP',        sub: 'Every ad mapped to its landing-page final URL + UTM tracking' },
    'phone-map':   { hub: 'lp',     name: 'Phone map',       sub: 'Every ad × platform, with its call-tracking phone number' },
    'statute-map': { hub: 'lp',     name: 'Statute map',     sub: 'Every claim + FAQ mapped to 15 U.S.C. § 1692' },
    'blog':        { hub: 'lp',     name: 'Blog',            sub: 'Article library' },
    'blog-post':   { hub: 'lp',     name: 'Article',         sub: '', parent: { label: 'Blog', hub: 'lp', file: 'blog.html' } },
    'social-hub':  { hub: 'social', name: 'Social hub',      sub: 'Blog article + its derived posts', root: true },
    'social-cal':  { hub: 'social', name: 'Social calendar', sub: '1 LinkedIn + 1 Facebook daily · Jul 20 – Oct 29, 2026' }
  };

  /* Canonical section list — spans both hubs. */
  var SECTIONS = [
    { h: 'LP Review Hub', items: [
      { id: 'review',      hub: 'lp',     label: 'LP review',      file: 'review.html' },
      { id: 'statute-map', hub: 'lp',     label: 'Statute map',    file: 'statute-map.html' },
      { id: 'ads-map',     hub: 'lp',     label: 'Ads → LP',       file: 'ads-map.html' },
      { id: 'phone-map',   hub: 'lp',     label: 'Phone map',      file: 'phone-map.html' },
      { id: 'blog',        hub: 'lp',     label: 'Blog',           file: 'blog.html' },
      { id: 'webflow',     hub: 'lp',     label: 'Webflow export', file: 'webflow-lp/index.html' }
    ]},
    { h: 'Social campaign', items: [
      { id: 'social-hub',  hub: 'social', label: 'Social hub',      file: 'index.html' },
      { id: 'social-cal',  hub: 'social', label: 'Social calendar', file: 'calendar.html' }
    ]}
  ];

  var CSS =
  '.hh-bar{position:sticky;top:0;z-index:50;background:#111418;color:#fff;display:flex;align-items:center;gap:16px;' +
  'padding:0 20px;height:72px;border-bottom:1px solid #2a2f37;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif}' +
  '.hh-brand{display:inline-flex;align-items:center;text-decoration:none;flex:0 0 auto}' +
  '.hh-logo{height:26px;width:auto;display:block}' +
  '.hh-left{display:flex;flex-direction:column;justify-content:center;gap:3px;min-width:0}' +
  '.hh-crumbs{display:flex;align-items:center;gap:7px;font-size:13.5px;line-height:1.2;white-space:nowrap;overflow:hidden}' +
  '.hh-crumbs a{color:#c8cdd6;text-decoration:none;transition:color .15s}.hh-crumbs a:hover{color:#fff}' +
  '.hh-crumbs .hh-here{color:#fff;font-weight:600;overflow:hidden;text-overflow:ellipsis}' +
  '.hh-crumbs .hh-sp{color:#5b6470}' +
  '.hh-sub{font-size:12px;color:#8590a0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}' +
  '.hh-spacer{flex:1 1 auto;min-width:8px}' +
  '.hh-menu-btn{font:600 11px/1 -apple-system,BlinkMacSystemFont,sans-serif;letter-spacing:.08em;text-transform:uppercase;' +
  'color:#c8cdd6;background:none;border:1px solid #2a2f37;padding:9px 13px;cursor:pointer;border-radius:3px;transition:all .15s;white-space:nowrap}' +
  '.hh-menu-btn:hover{color:#fff;border-color:#5b6470}' +
  '.hh-menu{position:relative;display:inline-flex;flex:0 0 auto}' +
  '.hh-menu-btn::after{content:" \\25be";color:#8590a0}' +
  '.hh-menu.open .hh-menu-btn{color:#fff;border-color:#5b6470;background:#1a1e25}' +
  '.hh-menu-panel{position:absolute;top:calc(100% + 8px);right:0;z-index:60;min-width:210px;padding:5px;display:none;flex-direction:column;' +
  'background:#1a1e25;border:1px solid #2a2f37;border-radius:4px;box-shadow:0 10px 28px rgba(0,0,0,.45)}' +
  '.hh-menu.open .hh-menu-panel{display:flex}' +
  '.hh-mi{font:600 11px/1 -apple-system,sans-serif;letter-spacing:.05em;text-transform:uppercase;color:#c8cdd6;text-decoration:none;' +
  'padding:8px 11px;border-radius:3px;white-space:nowrap;transition:background .12s,color .12s;display:block}' +
  'a.hh-mi:hover{background:#2a2f37;color:#fff}' +
  '.hh-mi.hh-cur{color:#ff6b73;cursor:default}.hh-mi.hh-cur::after{content:" \\2713";opacity:.8}' +
  '.hh-sep{height:1px;background:#2a2f37;margin:5px 8px}' +
  '.hh-mh{font-size:9px;letter-spacing:.1em;color:#6b7480;text-transform:uppercase;padding:6px 11px 3px;font-weight:700}' +
  '@media(max-width:720px){.hh-sub{display:none}.hh-bar{height:60px}}';

  if (!document.getElementById('hh-css')) {
    var st = document.createElement('style'); st.id = 'hh-css'; st.textContent = CSS;
    document.head.appendChild(st);
  }

  var m = META[page] || { hub: hub, name: page || 'Review hub', sub: '' };
  var curHub = HUBS[m.hub] ? m.hub : hub;
  var hubInfo = HUBS[curHub];

  /* Breadcrumb: [Hub] › (parent ›) Current — left-aligned; the hub crumb is the
   * back link (replaces the old "← LP review" button). */
  var crumbs;
  if (m.root && !leafOverride) {
    /* hub root (review.html / index.html): just the hub name, no redundant leaf. */
    crumbs = '<span class="hh-here">' + hubInfo.label + '</span>';
  } else {
    crumbs = '<a href="' + href(curHub, hubInfo.root) + '">' + hubInfo.label + '</a>';
    if (m.parent) {
      crumbs += '<span class="hh-sp">›</span><a href="' + href(m.parent.hub, m.parent.file) + '">' + m.parent.label + '</a>';
    }
    crumbs += '<span class="hh-sp">›</span><span class="hh-here">' + (leafOverride || m.name) + '</span>';
  }

  var menuHtml = SECTIONS.map(function (g) {
    return '<div class="hh-mh">' + g.h + '</div>' + g.items.map(function (it) {
      if (it.id === page) return '<span class="hh-mi hh-cur" aria-current="page">' + it.label + '</span>';
      var cross = it.hub !== hub;
      return '<a class="hh-mi" href="' + href(it.hub, it.file) + '"' + (cross ? ' target="_blank" rel="noopener"' : '') + '>' + it.label + (cross ? ' ↗' : '') + '</a>';
    }).join('');
  }).join('<div class="hh-sep"></div>');

  mount.className = 'hh-bar';
  mount.innerHTML =
    '<a class="hh-brand" href="' + href(curHub, hubInfo.root) + '" title="' + hubInfo.label + '">' +
      '<img class="hh-logo" src="assets/credo-logo.png" alt="Credo Legal">' +
    '</a>' +
    '<div class="hh-left">' +
      '<nav class="hh-crumbs" aria-label="Breadcrumb">' + crumbs + '</nav>' +
      (m.sub ? '<div class="hh-sub">' + m.sub + '</div>' : '') +
    '</div>' +
    '<span class="hh-spacer"></span>' +
    '<div class="hh-menu" id="hh-menu"><button class="hh-menu-btn" aria-haspopup="true" aria-expanded="false">Sections</button>' +
      '<div class="hh-menu-panel" role="menu">' + menuHtml + '</div></div>';

  var menu = mount.querySelector('#hh-menu'), btn = menu.querySelector('.hh-menu-btn');
  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    var open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.addEventListener('click', function () {
    menu.classList.remove('open'); btn.setAttribute('aria-expanded', 'false');
  });
})();
