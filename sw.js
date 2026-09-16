// Bump CACHE on every release so old shells get cleared out.
const CACHE = 'bjc-v1';
const ASSETS = [
  './', './index.html', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Stale-while-revalidate: opens instantly from cache, quietly pulls the newer
// build in the background so the next launch is up to date. Works with no
// connection at all, which is the point at a table on patchy wifi.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    caches.open(CACHE).then(cache =>
      cache.match(e.request).then(hit => {
        const net = fetch(e.request)
          .then(res => { if (res && res.ok) cache.put(e.request, res.clone()); return res; })
          .catch(() => hit || cache.match('./index.html'));
        return hit || net;
      })
    )
  );
});
