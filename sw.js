const CACHE_NAME = 'tenghisob-v6';

const FILES_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './manifest.json',
  './icon.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key.startsWith('tenghisob-') && key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const request = event.request;

  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(cache =>
              cache.put('./index.html', copy)
            );
          }
          return response;
        })
        .catch(async () =>
          (await caches.match('./index.html')) ||
          new Response('Internet aloqasi mavjud emas.', {
            status: 503,
            headers: {'Content-Type': 'text/plain; charset=utf-8'}
          })
        )
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => {
      const network = fetch(request).then(response => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        }
        return response;
      });
      return cached || network;
    }).catch(() =>
      new Response('Internet aloqasi mavjud emas.', {
        status: 503,
        headers: {'Content-Type': 'text/plain; charset=utf-8'}
      })
    )
  );
});