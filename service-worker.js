const CACHE_NAME = 'pwa-demo-v1';
const urlsToCache = [
  '/pwa/',
  '/pwa/index.html',
  '/pwa/deeplink.html',
  '/pwa/css/styles.css',
  '/pwa/js/app.js',
  '/pwa/js/route.js',
  '/pwa/js/qrcode.min.js',
  '/pwa/manifest.json',
  '/pwa/images/icons/icon-72x72.png',
  '/pwa/images/icons/icon-96x96.png',
  '/pwa/images/icons/icon-128x128.png',
  '/pwa/images/icons/icon-144x144.png',
  '/pwa/images/icons/icon-152x152.png',
  '/pwa/images/icons/icon-192x192.png',
  '/pwa/images/icons/icon-384x384.png',
  '/pwa/images/icons/icon-512x512.png'
];

// Install event - cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request).then(
          response => {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});
