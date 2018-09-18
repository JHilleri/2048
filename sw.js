
const cacheName = 'pwa';
const filesToCache = [
  'index.html'
];


self.addEventListener('install', function (e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(async () => {
    let cache = await caches.open(cacheName);
    console.log('[ServiceWorker] Caching app shell');
    return cache.addAll(filesToCache);
  });
});


self.addEventListener('fetch', function (e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(async () => {
    let response = await caches.match(e.request);
    return response || await fetch(e.request);
  });
});

