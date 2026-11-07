// BMW test běží pouze online. Tento soubor pouze vyřadí starší offline worker.
self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(name => name.startsWith('bmw-test-')).map(name => caches.delete(name)));
    await self.registration.unregister();
  })());
});
