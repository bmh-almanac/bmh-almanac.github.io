/* Almanac shell service worker.
 *
 * TWO rules, both learned the hard way.
 *
 * 1. NEVER cache API responses. Those are money, board state and doctrine on the
 *    tailnet backend, and a stale number served from a cache is precisely the
 *    failure this project exists to prevent.
 *
 * 2. ALWAYS bypass the HTTP cache for the shell itself. GitHub Pages sets its own
 *    cache headers, and that cache sits UNDERNEATH this worker — so a plain
 *    fetch() here happily returns yesterday's HTML and network-first quietly
 *    becomes cache-first. That is why "I pushed an update and the phone did not
 *    change" is the classic PWA failure. `cache: "reload"` forces the real
 *    network every time; the SW cache is then only ever a genuine offline
 *    fallback.
 */
const VERSION = 'almanac-shell-v173';   // v173: the app opens at the desk — index.html is a dark hand-off, start_url is desk.html (card #300)   // v172: the epic rows stopped being crushed (flex:0 0 auto) and stopped stealing the money room's .ep class

// The version gauge that cannot lie (Almanac #8): the page asks, the worker
// answers — the chip renders what is actually installed, never a hardcoded
// string that drifts. SKIP_WAITING lets the chip's tap activate an update.
self.addEventListener('message', e => {
  if (e.data?.type === 'VERSION')
    e.source?.postMessage({type: 'VERSION', version: VERSION});
  if (e.data?.type === 'SKIP_WAITING') self.skipWaiting();
});
const SHELL = ['./', './index.html', './manifest.json',
               './detent.html', './detent.webmanifest', './desk.html',
               './companion.html', './ear.html', './history.html',
               './vendor/leaflet.js', './vendor/leaflet.css',
               './icons/icon-192.png', './icons/icon-512.png',
               './icons/badge-96.png'];

self.addEventListener('install', e => {
  // ALL OR NOTHING (card #99): a single missed file fails the whole install,
  // so the old worker and its COMPLETE cache stay live and the browser
  // retries later. The old per-file .catch(()=>{}) let a flaky connection
  // install a holey cache — which activate then trusted, deleting the last
  // good one. A permanent 404 here means a broken deploy and SHOULD refuse
  // to ship; the runtime fetch handler still tops the cache up per-request.
  e.waitUntil(
    caches.open(VERSION)
      .then(c => Promise.all(SHELL.map(u =>
        fetch(u, {cache: 'reload'}).then(r => {
          if (!r.ok) throw new Error('shell fetch failed: ' + u + ' ' + r.status);
          return c.put(u, r);
        }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  // Deleting the old caches is safe ONLY because install is now atomic —
  // activate cannot run behind a partial cache (card #99).
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Web Push (Almanac #10). The payload is written by spine/push.py; the url
// says which surface answers the tap. Budgeted at the SENDER — by the time a
// push reaches this handler it has already earned its place, so it is shown.
self.addEventListener('push', e => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (err) {}
  // requireInteraction + a heavy vibration: a push that costs a day's budget
  // must not scroll away with the sea — it stays until Bryan dismisses it.
  // THE ROAD GATE (card #218). An approval push carries its own verdict door:
  // the decision URL and a SINGLE-USE token that exists nowhere on the Mac in
  // plaintext — only as a sha256 there and as these bytes here. That is what
  // stops an agent on the box approving its own tool call, so the token must
  // stay inside this worker: it rides notification.data, never a URL, never a
  // page, never localStorage.
  const isApproval = d.kind === 'approval' && d.approval_id && d.token;
  // Each approval gets its OWN tag. The ambient 'almanac' tag is deliberately
  // singular — a new push replaces the last — and that is exactly wrong here:
  // a second question arriving would silently eat the first, and the hook
  // behind it would sit waiting on a notification he never saw.
  e.waitUntil(self.registration.showNotification(d.title || 'Almanac', {
    body: d.body || '',
    data: isApproval
      ? { url: d.url, kind: 'approval', approval_id: d.approval_id, token: d.token }
      : { url: d.url || './detent.html' },
    icon: './icons/icon-192.png',
    badge: './icons/badge-96.png',
    tag: isApproval ? `approval-${d.approval_id}` : 'almanac',
    renotify: true,
    requireInteraction: true,
    vibrate: [180, 60, 180, 60, 320],
    actions: isApproval
      ? [{ action: 'approve', title: 'Approve' }, { action: 'deny', title: 'Deny' }]
      : undefined,
  }));
});

self.addEventListener('notificationclick', e => {
  const data = e.notification.data || {};
  // A verdict from the lock screen. It answers from INSIDE the worker so the
  // token never reaches a page — and so a tap works with the phone locked and
  // the app closed, which is the only state that matters when he is driving.
  if (data.kind === 'approval' && (e.action === 'approve' || e.action === 'deny')) {
    e.notification.close();
    e.waitUntil(
      fetch(data.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ decision: e.action, token: data.token }),
      }).then(r => r.json().catch(() => ({})).then(d => ({ ok: r.ok, status: r.status, d }))).then(({ ok, status, d }) => {
        // Silence would read as "sent" while the call sat waiting on the Mac.
        // A failed verdict says so, on its own notification, in words.
        // 409 "already <status>" is his second tap, not a failure — the first landed.
        if (!ok && !(status === 409 && /^already/.test(d.error || ''))) return self.registration.showNotification('Verdict did not land', {
          body: `Your ${e.action} came back ${status}. The call is still waiting — `
              + `open the desk, or it expires on its own.`,
          icon: './icons/icon-192.png', badge: './icons/badge-96.png',
          tag: `approval-${data.approval_id}-failed`, requireInteraction: true,
        });
        // An ATLAS document edit applies INSIDE this request (card #224). A verdict that
        // landed but wrote nothing must say so here — the run row alone is not enough
        // when the phone is the surface he is holding.
        if (ok && d.applied && d.applied.ok === false) return self.registration.showNotification('Approved — but nothing was written', {
          body: d.applied.words || 'the change did not land; check the file by hand',
          icon: './icons/icon-192.png', badge: './icons/badge-96.png',
          tag: `approval-${data.approval_id}-noapply`, requireInteraction: true,
        });
      }).catch(() => self.registration.showNotification('Verdict did not send', {
        // Off the tailnet — the common case in a dead zone. Say which, plainly.
        body: 'No route to the spine. Check Tailscale; the call is still waiting.',
        icon: './icons/icon-192.png', badge: './icons/badge-96.png',
        tag: `approval-${data.approval_id}-failed`, requireInteraction: true,
      }))
    );
    return;
  }
  // A BODY tap on an approval (not a button) must not navigate to the POST-only
  // decision URL — that is a dead page. Send him to the desk instead.
  e.notification.close();
  const target = new URL((data.kind === 'approval' ? './desk.html#hand' : data.url) || './detent.html',
                         self.registration.scope).href;
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    for (const c of list)
      if (c.url.startsWith(self.registration.scope) && 'focus' in c) {
        c.navigate(target);
        return c.focus();
      }
    return clients.openWindow(target);
  }));
});

self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  // Card #209: an /api/ path is data wherever it is served from — the same
  // origin included (a same-origin GET of a run's messages used to be copied
  // into CacheStorage below, so a THERAPIST transcript could land in the
  // phone's cache). Rule 1 above, made mechanical: never touch /api/.
  if (u.pathname.startsWith('/api/')) return;
  if (u.origin !== location.origin) return;        // a foreign origin is never cached

  const isShell = e.request.mode === 'navigate' ||
                  u.pathname.endsWith('/') ||
                  u.pathname.endsWith('.html');

  e.respondWith(
    fetch(isShell ? new Request(e.request.url, {cache: 'reload'}) : e.request)
      .then(r => {
        if (r && r.ok && e.request.method === 'GET') {
          const copy = r.clone();
          caches.open(VERSION).then(c => c.put(e.request, copy));
        }
        return r;
      })
      .catch(() => caches.match(e.request).then(r => r || caches.match('./')))
  );
});
