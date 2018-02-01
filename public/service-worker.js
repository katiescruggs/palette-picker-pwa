this.addEventListener('install', event => {
  event.waitUntil(
    caches.open('assets-v1').then(cache => {
      return cache.addAll([
        '/',
        '/js/scripts.js',
        '/css/styles.css',
        '/assets/lock.png',
        '/assets/palette-192.png',
        '/assets/palette-48.png',
        '/assets/palette-512.png',
        '/assets/palette-96.png',
        '/assets/unlock.png'
      ])
    })
  );
});

this.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request)
    })
  );
});

this.addEventListener('activate', event => {
  let cacheWhitelist = ['assets-v1'];

  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (cacheWhitelist.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
    .then(() => clients.claim())
  );
});

this.addEventListener('message', event => {
  if (event.data.type === 'save-palette') {
    self.registration.showNotification(`${event.data.paletteTitle} was successfully saved!`)
  }
});