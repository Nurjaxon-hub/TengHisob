const CACHE_NAME = 'tenghisob-v10';

const FILES_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './manifest.json',
  './icon.svg'
];

self.addEventListener('install', event => {
  const installTask = caches.open(CACHE_NAME)
    .then(cache => cache.addAll(FILES_TO_CACHE))
    .then(() => self.skipWaiting());
  event.waitUntil(installTask);
});

self.addEventListener('activate', event => {
  const activateTask = caches.keys().then(keys =>
    Promise.all(
      keys
        .filter(key => key.startsWith('tenghisob-') && key !== CACHE_NAME)
        .map(key => caches.delete(key))
    )
  ).then(() => self.clients.claim());
  event.waitUntil(activateTask);
});

self.addEventListener('fetch', event => {
  const request = event.request;

  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    const navigation = fetch(request).then(response => {
      if (response.ok) {
        const copy = response.clone();
        return caches.open(CACHE_NAME)
          .then(cache => cache.put('./index.html', copy))
          .then(() => response);
      }
      return response;
    });
    event.waitUntil(navigation.then(() => undefined).catch(() => undefined));
    event.respondWith(
      navigation.catch(async () => {
        const cached = await caches.match('./index.html');
        return cached || new Response('Internet aloqasi mavjud emas.', {
          status: 503,
          headers: {'Content-Type': 'text/plain; charset=utf-8'}
        });
      })
    );
    return;
  }

  const networkUpdate = fetch(request).then(response => {
    if (response.ok) {
      const copy = response.clone();
      return caches.open(CACHE_NAME)
        .then(cache => cache.put(request, copy))
        .then(() => response);
    }
    return response;
  });

  event.waitUntil(networkUpdate.then(() => undefined).catch(() => undefined));
  event.respondWith(
    caches.match(request).then(cached => cached || networkUpdate).catch(() =>
      networkUpdate.catch(() =>
        new Response('Internet aloqasi mavjud emas.', {
          status: 503,
          headers: {'Content-Type': 'text/plain; charset=utf-8'}
        })
      )
    )
  );
});
