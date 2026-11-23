/* Klinova service worker — generated 2026-11-23T18:22:33.512Z */
const VERSION = "68d17131af53";
const CACHE = "klinova-" + VERSION;
const PRECACHE = ["/404/","/404.html","/_next/static/K4HX5AyM8dpYKR_eK1J6G/_buildManifest.js","/_next/static/K4HX5AyM8dpYKR_eK1J6G/_ssgManifest.js","/_next/static/chunks/205-1cc5c374b50d2f75.js","/_next/static/chunks/255-0e5ac6cd71b0e266.js","/_next/static/chunks/279-8426918084ad6859.js","/_next/static/chunks/292-af34d04ff3991213.js","/_next/static/chunks/302-fee533a3e5c1180b.js","/_next/static/chunks/378-000516902493b147.js","/_next/static/chunks/472-3eeec145261509cd.js","/_next/static/chunks/4bd1b696-c023c6e3521b1417.js","/_next/static/chunks/509-4534e729751a85d2.js","/_next/static/chunks/753-33b3eaf4c73617c4.js","/_next/static/chunks/app/_not-found/page-d9d1421ae4410a8d.js","/_next/static/chunks/app/about/page-5e1cc5255abc2ec6.js","/_next/static/chunks/app/calculators/page-23db232a54ed375f.js","/_next/static/chunks/app/calculators/view/page-e3bac4dda4e7b71a.js","/_next/static/chunks/app/diseases/page-ef69c7492b2fd3ee.js","/_next/static/chunks/app/diseases/view/page-3032f0623d0b2ecb.js","/_next/static/chunks/app/drugs/compare/page-a3d8986338e778cc.js","/_next/static/chunks/app/drugs/page-a18972c1936f1246.js","/_next/static/chunks/app/drugs/view/page-e38eef023a84a9af.js","/_next/static/chunks/app/fluids/page-832b04cc02f39407.js","/_next/static/chunks/app/growth/page-a01c4f2740af5a9c.js","/_next/static/chunks/app/interactions/page-2848360212d22ce2.js","/_next/static/chunks/app/layout-f7f032c8b84d7b3e.js","/_next/static/chunks/app/library/page-780f29e0b8cbc19d.js","/_next/static/chunks/app/page-a009bf78987dd8be.js","/_next/static/chunks/app/pediatric/page-58a00584cc2e6140.js","/_next/static/chunks/app/pregnancy/page-75b2157d5eb34804.js","/_next/static/chunks/app/puyer/page-d92c884b019210f7.js","/_next/static/chunks/app/quickref/page-bba03eeb09062f5f.js","/_next/static/chunks/app/radiology/page-b5db13c818bb3efa.js","/_next/static/chunks/app/search/page-012894a440ca7c15.js","/_next/static/chunks/app/settings/page-1a190f20f81644f5.js","/_next/static/chunks/app/updates/page-3880bc5349090b42.js","/_next/static/chunks/f75dc1a8-565b685073cffbaa.js","/_next/static/chunks/framework-28b60818f5cffd83.js","/_next/static/chunks/main-app-613127bff4bcda66.js","/_next/static/chunks/main-d91ebdeb61984fcd.js","/_next/static/chunks/pages/_app-7d307437aca18ad4.js","/_next/static/chunks/pages/_error-cb2a52f75f2162e2.js","/_next/static/chunks/polyfills-42372ed130431b0a.js","/_next/static/chunks/webpack-32b99883bf220ffe.js","/_next/static/css/5dc175229eb43355.css","/about/","/about/index.txt","/calculators/","/calculators/index.txt","/calculators/view/","/calculators/view/index.txt","/data/diseases.json","/data/drugs.json","/data/interactions.json","/data/manifest.json","/data/milestones.json","/data/quickrefs.json","/data/radiology.json","/data/who-growth.json","/diseases/","/diseases/index.txt","/diseases/view/","/diseases/view/index.txt","/drugs/compare/","/drugs/compare/index.txt","/drugs/","/drugs/index.txt","/drugs/view/","/drugs/view/index.txt","/fluids/","/fluids/index.txt","/growth/","/growth/index.txt","/icons/apple-touch-icon.png","/icons/favicon-32.png","/icons/icon-192.png","/icons/icon-512.png","/icons/icon.svg","/icons/maskable-192.png","/icons/maskable-512.png","/","/index.txt","/interactions/","/interactions/index.txt","/library/","/library/index.txt","/manifest.webmanifest","/pediatric/","/pediatric/index.txt","/pregnancy/","/pregnancy/index.txt","/puyer/","/puyer/index.txt","/quickref/","/quickref/index.txt","/radiology/","/radiology/index.txt","/search/","/search/index.txt","/settings/","/settings/index.txt","/updates/","/updates/index.txt"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith("klinova-") && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

function pageKey(url) {
  let p = url.pathname;
  if (!p.endsWith("/") && !p.includes(".")) p += "/";
  return p;
}

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  // Reference data & manifest: network-first so updates are seen; cache fallback offline.
  if (url.pathname.startsWith("/data/")) {
    e.respondWith(fetch(req).then((r) => { if (r.ok) { const c = r.clone(); caches.open(CACHE).then((ca) => ca.put(url.pathname, c)); } return r; })
      .catch(() => caches.match(url.pathname)));
    return;
  }
  // Navigations: network-first, fall back to the cached page shell (query string ignored).
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).catch(() => caches.match(pageKey(url)).then((r) => r || caches.match("/"))));
    return;
  }
  // Static assets: cache-first.
  e.respondWith(caches.match(req, { ignoreSearch: url.pathname.startsWith("/_next/") ? false : true }).then((r) => r || fetch(req).then((res) => {
    if (res.ok && (url.pathname.startsWith("/_next/static/") || url.pathname.startsWith("/icons/"))) { const c = res.clone(); caches.open(CACHE).then((ca) => ca.put(req, c)); }
    return res;
  })));
});
