/* KILL SWITCH for the old bik-dispatch worker (card #388, 2026-10-02).
 * bik-dispatch moved to its own origin, https://bik-dispatch.github.io/, because
 * bik-almanac's installed scope '/' claimed /dispatch/ and Chrome would not install
 * it as its own app. A phone that opened the old address still has a worker here;
 * this version replaces it, deletes every 'almanac-dispatch-' cache on this origin,
 * unregisters itself, and sends any open Dispatch window to the new address.
 * (The same shape as the 09-12 move off bmhsolutions3711.github.io.) */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const ks = await caches.keys();
    await Promise.all(ks.filter(k => k.startsWith('almanac-dispatch-')).map(k => caches.delete(k)));
    await self.registration.unregister();
    const list = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    // Only Dispatch's own old windows: a desk window on this origin is never moved.
    for (const c of list)
      if (c.url.startsWith(self.registration.scope)) c.navigate('https://bik-dispatch.github.io/').catch(() => {});
  })());
});
