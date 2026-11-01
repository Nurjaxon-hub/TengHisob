
const CACHE_NAME = 'tenghisob-v1';

const FILES_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Ilova fayllarini keshlash
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      await Promise.all(
        FILES_TO_CACHE.map(async file => {
          try {
            await cache.add(file);
          } catch (error) {
            console.warn('Cache failed:', file);
          }
        })
      );
    })
  );

  self.skipWaiting();
});

// Eski keshlarni tozalash
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );

  self.clients.claim();
});

// Fayllarni internetdan olish, internet bo‘lmasa keshdan ochish
self.addEventListener('fetch', event => {
  const request = event.request;

  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Supabase va boshqa tashqi xizmatlarga aralashmaymiz
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(request)
      .then(response => {
        if (response && response.ok) {
          const copy = response.clone();

          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, copy);
          });
        }

        return response;
      })
      .catch(async () => {
        const cached = await caches.match(request);

        if (cached) return cached;

        if (request.mode === 'navigate') {
          return caches.match('./index.html');
        }

        return new Response('Internet aloqasi mavjud emas.', {
          status: 503,
          headers: {
            'Content-Type': 'text/plain; charset=utf-8'
          }
        });
      })
  );
});
