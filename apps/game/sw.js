// Offline-first (C2). Cache the shell on install, serve cache-first, and
// refresh in the background. After one visit the game runs with no network at
// all - which is the point: on metered prepaid data every byte has a cash cost.
const V = 'rubble-run-v1';
const SHELL = [
  './', './index.html', './manifest.webmanifest',
  './src/main.js', './src/sim.js', './src/level.js',
  './src/render.js', './src/input.js', './src/tele.js', './src/rng.js'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request).then(hit => {
    const net = fetch(e.request).then(res => {
      if (res && res.ok) { const cp = res.clone(); caches.open(V).then(c => c.put(e.request, cp)); }
      return res;
    }).catch(() => hit);
    return hit || net;
  }));
});
