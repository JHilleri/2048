
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


// self.addEventListener('fetch', function (e) {
//   console.log('[ServiceWorker] Fetch', e.request.url);
//   e.respondWith(
//     async () => {
//       let response = await caches.match(e.request);
//       if(response) return response;
//       return await fetch(e.request);
//     }
//   );
// });

self.addEventListener('fetch', function(event) {
  console.log('Gestion de l\'évènement de fetch pour', event.request.url);

  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        console.log('Réponse trouvée en cache:', response);

        return response;
      }
      console.log('Pas de réponse trouvée en cache. Sur le point de la récupérer via le réseau...');

      return fetch(event.request).then(function(response) {
        console.log('La réponse du réseau est:', response);

        return response;
      }).catch(function(error) {
        console.error('Récupération échouée:', error);

        throw error;
      });
    })
  );
});