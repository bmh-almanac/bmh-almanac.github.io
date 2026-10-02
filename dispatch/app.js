try { if (localStorage.getItem('dispatch_theme') === 'sun') document.documentElement.classList.add('sun'); } catch (e) {}
/* ↑ The theme goes on FIRST, before anything renders, so a man who chose SUN
   at noon never gets a flash of night (and the reverse). Storage can throw in
   a private window; the page then simply opens in night.

   bik-dispatch: the runner's text line (card #376).

   A good dispatcher texting a driver: a text thread and nothing else. No
   board, no money, no links into the desk. He talks rather than types (the
   Gboard mic), and reads it at a truck stop in full sun or at night, on the
   Fold's cover screen (about 340px) first.

   THE RENDERING RULE (load-bearing): every string the spine sends (titles,
   bodies, card titles, errors) reaches the page through textContent or
   createTextNode. This file never parses a server string as markup and never
   auto-links. This origin's storage also holds the desk's bearer, so one card
   title running as script would carry it off; the page's CSP is the second
   lock.

   THE ATTRIBUTION GUARD: Dispatch registers ITS OWN worker at ./ and
   subscribes through that registration only, with the scope checked. The
   container's ready promise is never used: on a first visit it resolves to
   the ROOT Almanac registration, and a subscription made there would ring
   under the Almanac icon, not this one. */
(function () {
'use strict';

const DEMO = location.hash === '#demo';
const HERE = new URL('./', location.href).href;          // this app's scope
const OUR_WORKER = new URL('sw.js', location.href).href;
const POLL_MS = 15000, TIMEOUT_MS = 12000, HOLD_MS = 800, KEEP_ROWS = 400;
// alert (card #386): bik-dispatch is the alarm for everything, his words, so
// Almanac's own alarms (a death on the watch, a payment chase, a road-gate
// question) land on the line as kind 'alert'. One renders like a loud runner
// fault (k-alert wears the hot colour, as k-failed does), never like the
// batch slip, and as text only: any url the spine kept for it is never read
// here, so nothing in an alert becomes a link.
const TAGS = {started: 'STARTED', built: 'BUILT', failed: 'FAILED', held: 'HELD', done: 'LANDED',
              ask: 'ASK', triage: 'TRIAGE', status: 'STATUS', ack: 'OK', alert: 'ALERT'};
// THE SLIP CONTRACT, exactly as card #374 writes the title. · is the '·'.
const SLIP = /^Batch landed: (\d+) to QA · (\d+) failed · (\d+) held · (\d+) need you/;
const SLIP_LABELS = ['TO QA', 'FAILED', 'HELD', 'NEED YOU'];
const THEME_COLOR = {night: '#07080A', sun: '#EAE0C9'};
const DENIED = 'Notifications are blocked for Dispatch — Android Settings › Apps › bik-dispatch › Notifications.';
const NO_ANSWER = 'no answer from the spine (Tailscale?)';

const $ = id => document.getElementById(id);
const store = {   // storage that never throws: a blocked store must not take the line down
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } },
  del(k) { try { localStorage.removeItem(k); } catch (e) {} },
};

const S = {
  api: '', tok: '',
  msgs: new Map(),          // the line's rows by id: the spine's truth, merged by id
  pending: [],              // his words not yet answered with a 200
  seq: 0, demoId: 0,
  lastId: 0, markedThrough: 0,
  runner: null, approved: 0, bell: null, unread: 0, now: null, gotAt: 0,
  limits: {body_max: 2000, max_cards: 1},
  route: 'first', routeWhy: '', lastRead: null,
  reg: null, scopeWrong: false, broken: '', bellNote: '', bellBooted: false,
  polling: false, again: '', timer: 0, composeBusy: false,
  offer: null, version: '',
};

/* ── small helpers ───────────────────────────────────────────────────── */
function el(tag, cls, text) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = String(text);
  return n;
}
const pad = n => String(n).padStart(2, '0');
function when(s) { const t = Date.parse(s); return Number.isFinite(t) ? new Date(t) : null; }
function hhmm(d) { return d ? pad(d.getHours()) + ':' + pad(d.getMinutes()) : '--:--'; }
const MON = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
function dayKey(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
function dayLabel(d) {
  const t = new Date();
  if (dayKey(d) === dayKey(t)) return 'TODAY';
  const y = new Date(t); y.setDate(t.getDate() - 1);
  if (dayKey(d) === dayKey(y)) return 'YESTERDAY';
  return MON[d.getMonth()] + ' ' + d.getDate();
}
function hostOf(api) { try { return new URL(api).host; } catch (e) { return ''; } }
function words(e) { return String(e && e.message ? e.message : e || 'unknown').slice(0, 140); }

/* ── theme ───────────────────────────────────────────────────────────── */
function theme(mode) {
  const sun = mode === 'sun';
  document.documentElement.classList.toggle('sun', sun);
  const b = $('theme');
  b.textContent = sun ? 'NIGHT' : 'SUN';
  b.setAttribute('aria-label', sun ? 'switch to the night theme' : 'switch to the sun theme');
  const m = document.querySelector('meta[name="theme-color"]');
  if (m) m.setAttribute('content', sun ? THEME_COLOR.sun : THEME_COLOR.night);
}

/* ── the connection ──────────────────────────────────────────────────────
   API and TOK are the desk's own keys on this origin, so a phone that has
   opened the desk once is already connected here. */
function loadCfg() {
  S.api = (store.get('almanac_api') || '').replace(/\/+$/, '');
  S.tok = store.get('almanac_token') || '';
}
const configured = () => !!(S.api && S.tok);

/* The only spine addresses a connect code may carry: this Mac on the tailnet
   (https, a .ts.net name, with the spine's port) or this Mac's loopback.
   Anything else could be a stranger's server collecting his key. */
function apiShape(raw) {
  let u;
  try { u = new URL(String(raw || '').trim()); } catch (e) { return null; }
  if (u.username || u.password || u.search || u.hash || u.pathname !== '/') return null;
  const tailnet = u.protocol === 'https:' && /^[a-z0-9-]+(\.[a-z0-9-]+)*\.ts\.net$/i.test(u.hostname);
  const loop = u.protocol === 'http:' && (u.hostname === '127.0.0.1' || u.hostname === 'localhost') && !!u.port;
  return tailnet || loop ? u.origin : null;
}

/* Every call: the bearer, no HTTP cache, and a 12 s ceiling, so a dead zone
   answers in words instead of a spinner that never ends. A network failure
   becomes one plain sentence. */
async function call(method, path, body, cfg) {
  if (DEMO) throw new Error('the demo makes no calls');
  const api = (cfg || S).api, tok = (cfg || S).tok;
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), TIMEOUT_MS);
  try {
    const headers = {Authorization: 'Bearer ' + tok};
    if (body != null) headers['Content-Type'] = 'application/json';
    let r;
    try {
      r = await fetch(api + path, {method, headers, cache: 'no-store', credentials: 'omit', signal: ac.signal,
                                   body: body == null ? undefined : JSON.stringify(body)});
    } catch (e) { throw new Error(NO_ANSWER); }
    let data = null;
    try { data = await r.json(); } catch (e) {}
    return {status: r.status, data};
  } finally { clearTimeout(timer); }
}

async function healthy(api, tok) {
  try {
    const r = await call('GET', '/api/health', null, {api, tok});
    if (r.status === 200) return true;
    return r.status === 401 || r.status === 403 ? 'the spine refused that key' : 'the spine answered ' + r.status;
  } catch (e) { return 'no answer from that spine (Tailscale?)'; }
}

function save(api, tok) {
  store.set('almanac_api', api);
  store.set('almanac_token', tok);
  S.api = api; S.tok = tok;
}

/* #cfg= is STRICT here (card #376). The desk's older bootstrap took an
   address with no key and kept the stored key, so a crafted link could send
   his bearer to a stranger. Here a link is honored only with BOTH halves, a
   known address shape, and a 200 from /api/health on the NEW key, and it
   never replaces a stored pair without asking. The fragment is scrubbed at
   once either way, so the key never sits in the address bar or history. */
function takeCfgHash() {
  const m = (location.hash || '').match(/^#(?:.*&)?cfg=([^&]+)/);
  if (!m) return null;
  history.replaceState(null, '', location.pathname + location.search);
  try {
    const c = JSON.parse(decodeURIComponent(m[1]));
    return c && typeof c === 'object' ? c : {};
  } catch (e) { return {}; }
}

async function adoptCfg(c) {
  const tok = typeof c.token === 'string' ? c.token.trim() : '';
  const api = apiShape(c.api);
  if (!tok) return refused('it carried no key');
  if (!api) return refused("its spine address isn't this Mac's tailnet or loopback address");
  notice('Checking the connect link with the spine…', false);
  const ok = await healthy(api, tok);
  if (ok !== true) return refused(ok);
  notice('', false);
  if (configured()) {
    if (S.api === api && S.tok === tok) return 'same';
    offerReplace(api, tok);
    return 'asked';
  }
  save(api, tok);
  return 'adopted';
}

function refused(why) {
  const text = 'That connect link was refused — ' + why + '. Nothing was stored.';
  if (configured()) notice(text, true);
  else { const w = $('cwhy'); w.textContent = text; w.classList.add('hot'); }
  return 'refused';
}

function notice(text, hot) {
  const n = $('notice');
  n.textContent = text; n.hidden = !text; n.classList.toggle('hot', !!hot);
}

function offerReplace(api, tok) {
  S.offer = {api, tok};             // held in memory only; the key is never rendered
  $('rnew').textContent = 'New spine: ' + hostOf(api);
  $('rold').textContent = 'This phone now: ' + (hostOf(S.api) || 'unknown');
  $('replace').hidden = false;
}

async function manualConnect() {
  const w = $('cwhy');
  w.classList.remove('hot');
  const api = apiShape($('capi').value), tok = $('ctok').value.trim();
  if (!api) { w.textContent = "That address isn't this Mac's tailnet spine (https://….ts.net:8600) or its loopback."; w.classList.add('hot'); return; }
  if (!tok) { w.textContent = 'The key is empty.'; w.classList.add('hot'); return; }
  w.textContent = 'Checking the key with the spine…';
  const ok = await healthy(api, tok);
  if (ok !== true) { w.textContent = 'Not connected — ' + ok + '. Nothing was stored.'; w.classList.add('hot'); return; }
  save(api, tok);
  $('ctok').value = '';
  w.textContent = '';
  start();
}

/* ── the line ────────────────────────────────────────────────────────── */
function take(d) {
  for (const m of d.messages) {
    if (!m || !Number.isInteger(m.id)) continue;
    S.msgs.set(m.id, m);
    if (m.id > S.lastId) S.lastId = m.id;
  }
  if (S.msgs.size > KEEP_ROWS) {
    const ids = [...S.msgs.keys()].sort((a, b) => a - b);
    for (const id of ids.slice(0, ids.length - KEEP_ROWS)) S.msgs.delete(id);
  }
  S.unread = d.unread | 0;
  S.runner = d.runner && typeof d.runner === 'object' ? d.runner : null;
  S.approved = d.approved_waiting | 0;
  S.bell = d.bell && typeof d.bell === 'object' ? d.bell : null;
  if (d.limits && typeof d.limits === 'object')
    S.limits = {body_max: d.limits.body_max | 0 || 2000, max_cards: d.limits.max_cards | 0 || 1};
  S.now = d.now; S.gotAt = Date.now(); S.lastRead = new Date();
  S.route = 'ok'; S.routeWhy = '';
}

/* POLL: every 15 s while he can see it, at once when he comes back to it, and
   2 s and 5 s after a send. Never while hidden: a pocketed phone polling a
   tailnet is battery spent on nobody. A full read (after=0) on every return
   refreshes 'heard' and the unread dots on rows already shown; the 15 s reads
   ask only for what is new. */
async function poll(full) {
  if (DEMO || !configured()) return;
  if (document.visibilityState !== 'visible') { clearTimeout(S.timer); return; }
  if (S.polling) { S.again = full ? 'full' : (S.again || 'new'); return; }
  S.polling = true;
  clearTimeout(S.timer);
  let ok = false;
  try {
    const r = await call('GET', '/api/dispatch?after=' + (full ? 0 : S.lastId));
    if (r.status === 200 && r.data && Array.isArray(r.data.messages)) { take(r.data); ok = true; }
    else { S.route = r.status === 401 || r.status === 403 ? 'refused' : 'answered'; S.routeWhy = String(r.status); }
  } catch (e) { S.route = 'down'; S.routeWhy = ''; }
  S.polling = false;
  render();
  if (ok) { await markRead(); maybeBootBell(); }
  const again = S.again; S.again = '';
  if (again) return poll(again === 'full');
  if (document.visibilityState === 'visible') S.timer = setTimeout(() => poll(false), POLL_MS);
}

/* READ AND BADGE. While he is looking, the line is read: the spine marks it,
   and Dispatch's own notifications are closed, which is what takes the
   launcher's badge off the icon (Android counts the tray, not a number we
   set). The dots stay on screen until his next return, so he can still see
   which rows were new. */
async function markRead() {
  if (DEMO || document.visibilityState !== 'visible') return;
  let top = 0;
  for (const m of S.msgs.values())
    if (m.sender === 'operation' && !m.read_at && m.id > S.markedThrough && m.id > top) top = m.id;
  if (top || S.unread) {
    try {
      const r = await call('POST', '/api/dispatch/read', {});
      if (r.status !== 200) return;
    } catch (e) { return; }
    S.markedThrough = Math.max(S.markedThrough, top, S.lastId);
    S.unread = 0;
  }
  await clearTray();
}

async function clearTray() {
  try { if (S.reg) (await S.reg.getNotifications()).forEach(n => n.close()); } catch (e) {}
  try { if ('clearAppBadge' in navigator) await navigator.clearAppBadge(); } catch (e) {}
}

/* SEND. His words show at once as 'sending…', and nothing is thrown away
   until the spine answers 200: the draft stays in the box and in storage
   until then, and a failure keeps the row with a RETRY key. Nothing is ever
   re-sent on its own, because a send that timed out may still have landed. */
async function send(text, opts) {
  const body = String(text || '').trim();
  if (!body) return false;
  if (body.length > S.limits.body_max) { counter(); return false; }
  // HIS send brings the thumb end into view so he sees his words land; a
  // poll never does, so reading back up the line is never yanked away.
  $('log').scrollTop = 0;
  if (DEMO) { demoSend(body, opts); return true; }
  if (!configured()) return false;
  // a second tap while the same words are already on their way is the same text
  if (S.pending.some(p => p.state === 'sending' && p.body === body)) return false;
  let p = opts && opts.retry;
  if (!p) p = S.pending.find(x => x.state === 'failed' && x.body === body);
  if (p) { p.state = 'sending'; p.reason = ''; }
  else { p = {key: 'p' + (++S.seq), body, at: new Date().toISOString(), state: 'sending', reason: ''}; S.pending.push(p); }
  render();
  let r = null, err = '';
  try { r = await call('POST', '/api/dispatch', {body}); } catch (e) { err = words(e); }
  if (r && r.status === 200 && r.data && Number.isInteger(r.data.id)) {
    const d = r.data, stamp = new Date().toISOString();
    S.pending = S.pending.filter(x => x !== p);
    if (!S.msgs.has(d.id))
      S.msgs.set(d.id, {id: d.id, at: p.at, sender: 'bryan', kind: 'text', body,
                        read_at: null, seen_by_spine_at: d.command ? stamp : null});
    if (d.reply && Number.isInteger(d.reply.id) && !S.msgs.has(d.reply.id))
      S.msgs.set(d.reply.id, {id: d.reply.id, at: stamp, sender: 'operation',
                              kind: d.error ? 'failed' : d.command === 'status' ? 'status' : 'ack',
                              title: d.reply.title, body: d.reply.body, read_at: null, seen_by_spine_at: null});
    landed(body);
    render();
    setTimeout(() => poll(false), 2000);
    setTimeout(() => poll(false), 5000);
    return true;
  }
  p.state = 'failed';
  p.reason = !r ? (err === NO_ANSWER || !err
                     ? 'no answer from the spine (Tailscale?) — it may have landed; tap STATUS before resending'
                     : err)
           : r.status === 403 || r.status === 401 ? "this phone's key isn't his (reconnect)"
           : (r.data && typeof r.data.error === 'string' && r.data.error) || 'the spine answered ' + r.status;
  render();
  return false;
}

/* After a 200 only: the box empties if it still holds exactly those words,
   and the stored draft goes if it was those words. Anything he typed since
   stays. */
function landed(body) {
  const t = $('txt');
  if (t.value.trim() === body) { t.value = ''; autosize(); counter(); }
  const d = store.get('dispatch_draft');
  if (d != null && d.trim() === body) store.del('dispatch_draft');
}

async function sendCompose() {
  if (S.composeBusy) return;
  const t = $('txt'), body = t.value.trim();
  if (!body) return;
  if (body.length > S.limits.body_max) { counter(); return; }
  S.composeBusy = true;
  $('send').disabled = true;
  try { await send(body, {compose: true}); }
  finally { S.composeBusy = false; $('send').disabled = false; }
}

/* ── the worker and the bell ─────────────────────────────────────────── */
async function startWorker() {
  if (DEMO || !('serviceWorker' in navigator)) return null;
  let reg;
  try { reg = await navigator.serviceWorker.register('sw.js', {scope: './'}); }
  catch (e) { S.broken = 'the worker would not register — ' + words(e); renderBell(); return null; }
  // The attribution guard: this registration must be Dispatch's own, or
  // every ring would land under the wrong icon.
  if (reg.scope !== HERE) { S.scopeWrong = true; renderBell(); return null; }
  if (!(await activated(reg))) { S.broken = 'the worker never came up'; renderBell(); return null; }
  S.reg = reg;
  askVersion();
  renderBell();
  maybeBootBell();
  return reg;
}

function activated(reg) {
  return new Promise(resolve => {
    let settled = false;
    const finish = v => { if (!settled) { settled = true; clearTimeout(t); resolve(v); } };
    const t = setTimeout(() => finish(!!(reg.active && reg.active.state === 'activated')), 20000);
    const check = () => {
      if (reg.active && reg.active.state === 'activated') return finish(true);
      const w = reg.installing || reg.waiting || reg.active;
      if (w) w.addEventListener('statechange', check, {once: true});
    };
    check();
  });
}

function askVersion() {
  try { if (S.reg && S.reg.active) S.reg.active.postMessage({type: 'VERSION'}); } catch (e) {}
}

function b64u(s) {
  const b = atob(s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4));
  return Uint8Array.from(b, c => c.charCodeAt(0));
}

/* Subscribe on OUR registration. fresh=true throws the old endpoint away
   first: getSubscription() hands back the same dead endpoint, and re-posting
   it only resurrects a row that will 410 again. That is how all 16 of
   Almanac's subscriptions died. */
async function subscribe(fresh) {
  if (DEMO || !S.reg || !configured()) { renderBell(); return; }
  if (!('Notification' in window) || Notification.permission !== 'granted') { renderBell(); return; }
  S.bellNote = fresh ? 'Re-subscribing this phone…' : '';
  renderBell();
  try {
    const pm = S.reg.pushManager;
    let sub = await pm.getSubscription(), made = false;
    if (fresh && sub) { try { await sub.unsubscribe(); } catch (e) {} sub = null; }
    if (!sub) {
      const v = await call('GET', '/api/push/vapid');
      const key = v.status === 200 && v.data && typeof v.data.publicKey === 'string' ? b64u(v.data.publicKey) : null;
      if (!key) throw new Error('the push key request answered ' + v.status);
      sub = await pm.subscribe({userVisibleOnly: true, applicationServerKey: key});
      made = true;
    }
    const r = await call('POST', '/api/dispatch/subscribe',
                         {subscription: sub.toJSON(), label: store.get('almanac_device') || 'phone'});
    if (r.status !== 200 || !r.data || r.data.id == null)
      throw new Error(r.status === 403 ? "the spine refused this phone's key"
                      : (r.data && typeof r.data.error === 'string' && r.data.error) || 'the spine answered ' + r.status);
    const id = String(r.data.id);
    // 'after this phone subscribed' is measured from a NEW subscription, not
    // from every boot's re-post, so a ring that failed on this endpoint still
    // reads BROKEN after a reboot.
    if (made || store.get('dispatch_sub_id') !== id) store.set('dispatch_sub_at', new Date().toISOString());
    store.set('dispatch_sub_id', id);
    S.broken = '';
  } catch (e) {
    S.broken = 'the subscribe failed — ' + words(e);
  }
  S.bellNote = '';
  renderBell();
}

/* Re-subscribe and re-post on EVERY boot where permission is granted, once
   the worker is up and the spine has answered: a FRESH subscription when the
   bell reads BROKEN, the same one otherwise. */
function maybeBootBell() {
  if (DEMO || S.bellBooted || !S.reg || S.route !== 'ok' || !configured()) return;
  S.bellBooted = true;
  if (!('Notification' in window) || Notification.permission !== 'granted') { renderBell(); return; }
  subscribe(bellState().cls === 'broken').then(() => poll(true));
}

function afterSub(at) {
  const a = Date.parse(at), s = Date.parse(store.get('dispatch_sub_at') || '');
  return Number.isFinite(a) && Number.isFinite(s) && a >= s;
}

/* THE BELL chip: the in-app health of the doorbell, in words. The launcher
   badge is the warning he asked for; this says whether that badge can be
   trusted. */
function bellState() {
  if (DEMO) return {word: 'ON', cls: 'on', why: ''};
  if (!('serviceWorker' in navigator) || !('PushManager' in window))
    return {word: 'BROKEN', cls: 'broken', why: 'This browser has no push here, so nothing can ring.'};
  if (S.scopeWrong)
    return {word: 'BROKEN', cls: 'broken', why: 'worker scope wrong — rings would land under the wrong app.'};
  const perm = 'Notification' in window ? Notification.permission : 'denied';
  if (perm !== 'granted') return {word: 'OFF', cls: 'off', why: perm === 'denied' ? DENIED : ''};
  if (S.broken) return {word: 'BROKEN', cls: 'broken', why: S.broken + ' — tap BELL to try again.'};
  const id = store.get('dispatch_sub_id');
  if (!id) return {word: 'OFF', cls: 'off', why: ''};
  if (!S.bell) return {word: '…', cls: 'wait', why: ''};
  const row = (Array.isArray(S.bell.subs) ? S.bell.subs : []).find(x => x && String(x.id) === id);
  if (!row) return {word: 'OFF', cls: 'off', why: ''};
  const le = String(row.last_error || '');
  if (!row.active || /^(404|410)/.test(le))
    return {word: 'BROKEN', cls: 'broken',
            why: 'The push service dropped this phone' + (le ? ' (' + le.slice(0, 60) + ')' : '') + ' — tap BELL to subscribe fresh.'};
  const last = S.bell.last;
  if (last && (last.decision === 'failed' || last.decision === 'no_subs') && afterSub(last.at))
    return {word: 'BROKEN', cls: 'broken',
            why: last.decision === 'no_subs'
              ? 'The last ring found no Dispatch phone — tap BELL to subscribe fresh.'
              : 'The last ring failed' + (last.detail ? ' (' + String(last.detail).slice(0, 60) + ')' : '') + ' — tap BELL to subscribe fresh.'};
  return {word: 'ON', cls: 'on', why: ''};
}

function renderBell() {
  const st = bellState(), b = $('bell');
  b.textContent = 'BELL ' + st.word;
  b.className = 'chip bell ' + st.cls;
  b.setAttribute('aria-label', st.cls === 'on' ? 'the bell is on'
    : st.cls === 'off' ? 'the bell is off: tap to turn it on'
    : st.cls === 'broken' ? 'the bell is broken: tap to subscribe fresh' : 'the bell: checking');
  const w = $('why'), text = S.bellNote || st.why;
  w.textContent = text || '';
  w.hidden = !text;
  w.classList.toggle('hot', st.cls === 'broken' && !S.bellNote);
}

async function bellTap() {
  if (DEMO) { flash('Demo: the bell is not wired here. The real one rings through the spine.'); return; }
  if (!configured()) { flash('Connect first: the bell rings through the spine.'); return; }
  const st = bellState();
  if (st.cls === 'on') {
    const last = S.bell && S.bell.last;
    flash('The bell is on' + (last ? ' · last ring ' + hhmm(when(last.at)) + ' ' + String(last.decision || '') : ' · no ring yet') + '.');
    return;
  }
  if (!S.reg) { flash(S.scopeWrong ? 'The worker scope is wrong; reload Dispatch.' : 'The worker is not up yet.'); return; }
  if (!('Notification' in window)) return;
  if (Notification.permission !== 'granted') {
    let p;
    try { p = await Notification.requestPermission(); } catch (e) { p = Notification.permission; }
    if (p !== 'granted') { renderBell(); return; }
    await subscribe(false);
  } else {
    await subscribe(st.cls === 'broken');
  }
  poll(true);
}

let flashTimer = 0;
function flash(text) {
  S.bellNote = text;
  renderBell();
  clearTimeout(flashTimer);
  flashTimer = setTimeout(() => { S.bellNote = ''; renderBell(); }, 6000);
}

/* ── rendering ───────────────────────────────────────────────────────── */
function renderStrip() {
  const s = $('strip');
  s.replaceChildren();
  s.classList.remove('hot');
  if (DEMO || S.route === 'ok') {
    const r = S.runner || {};
    if (r.running) {
      s.append(el('span', 'pulse'));
      s.append(document.createTextNode('ON #' + (r.card != null ? r.card : '?') + ' · ' + (r.phase || '…') + ' · ' + minutes(r.since) + ' min'));
    } else {
      s.textContent = 'IDLE · ' + S.approved + ' approved waiting · batches of ' + S.limits.max_cards;
    }
    return;
  }
  if (!configured()) { s.textContent = 'NOT CONNECTED'; return; }
  if (S.route === 'first') { s.textContent = 'Reading the line…'; return; }
  const last = ' · last read ' + (S.lastRead ? hhmm(S.lastRead) : 'never');
  s.classList.add('hot');
  s.textContent = S.route === 'refused' ? "THE SPINE REFUSED THIS PHONE'S KEY — reconnect" + last
    : S.route === 'answered' ? 'THE SPINE ANSWERED ' + S.routeWhy + ' — the line could not be read' + last
    : 'NO ROUTE TO THE SPINE — check Tailscale' + last;
}

// Minutes on the card come from the spine's own clock (since against now),
// plus the time since that answer, so a phone with a wrong clock can't skew it.
function minutes(since) {
  const a = Date.parse(since), b = Date.parse(S.now);
  if (!Number.isFinite(a) || !Number.isFinite(b)) return '?';
  return Math.max(0, Math.floor((b - a + (Date.now() - S.gotAt)) / 60000));
}

// The newest thing the RUNNER said. An Almanac alert (card #386) is not the
// runner talking, so a watch death landing after the slip never moves the
// RUN key out of it.
function newestOp() {
  let best = null;
  for (const m of S.msgs.values())
    if (m.sender === 'operation' && m.kind !== 'alert' && (!best || m.id > best.id)) best = m;
  return best;
}
function slipCounts(m) {
  if (!m || m.kind !== 'done') return null;
  const x = SLIP.exec(String(m.title || ''));
  return x ? {n: x.slice(1, 5).map(Number), rest: String(m.title).slice(x[0].length).trim()} : null;
}
const running = () => !!(S.runner && S.runner.running);
// THE RUN KEY rides inside the slip only when the slip is the newest thing
// the runner said, nothing is rolling, and approved cards are waiting.
function runInSlipId() {
  if (running() || !(S.approved > 0)) return 0;
  const n = newestOp();
  return n && slipCounts(n) ? n.id : 0;
}
function runSub() {
  if (DEMO) return 'demo';
  const n = S.approved;
  return 'next ' + Math.min(n, S.limits.max_cards) + ' of ' + n + ' approved';
}

function timeEl(at) {
  const t = el('time', null, hhmm(when(at)));
  if (typeof at === 'string') t.dateTime = at;
  return t;
}

function opRow(m) {
  // own keys only: a kind of '__proto__' must not reach the prototype
  const known = Object.prototype.hasOwnProperty.call(TAGS, m.kind);
  const a = el('article', 'row op k-' + (known ? m.kind : 'other'));
  const meta = el('div', 'meta');
  meta.append(el('span', 'tag', known ? TAGS[m.kind] : String(m.kind || 'note').toUpperCase().slice(0, 12)));
  if (!m.read_at) { const d = el('span', 'dot'); d.setAttribute('role', 'img'); d.setAttribute('aria-label', 'unread'); meta.append(d); }
  meta.append(timeEl(m.at));
  a.append(meta);
  if (m.title) a.append(el('div', 'title', m.title));
  if (m.body) a.append(el('div', 'body', m.body));
  if (m.kind === 'triage') triageChips(a, m.body);
  return a;
}

// The ids under RUNNABLE, one '#<id> <title>' line each, until the first line
// that isn't one (#375's body puts a blank line before the NOT list).
function runnableIds(body) {
  const lines = String(body || '').split('\n');
  const i = lines.findIndex(l => l.trim() === 'RUNNABLE');
  const ids = [];
  if (i < 0) return ids;
  for (const l of lines.slice(i + 1)) {
    const x = /^#(\d+)(\s|$)/.exec(l.trim());
    if (!x) break;
    ids.push(x[1]);
  }
  return ids;
}

/* One chip per runnable card, each sending 'approve <id>'. No approve-all key
   in v1: walk before run, one card first. He can still SAY approve all. */
function triageChips(a, body) {
  const ids = runnableIds(body);
  if (!ids.length) return;
  const box = el('div', 'chips');
  for (const id of ids) {
    const b = el('button', 'approve', 'APPROVE #' + id);
    b.type = 'button';
    b.setAttribute('aria-label', 'send approve ' + id);
    b.addEventListener('click', () => send('approve ' + id));
    box.append(b);
  }
  a.append(box, el('div', 'hint', 'or say: approve all · approve all but 223 260'));
}

function slipRow(m, c, withRun) {
  const a = el('article', 'row slip k-done');
  const meta = el('div', 'meta');
  meta.append(el('span', 'tag', 'BATCH LANDED · ' + hhmm(when(m.at))));
  if (!m.read_at) { const d = el('span', 'dot'); d.setAttribute('role', 'img'); d.setAttribute('aria-label', 'unread'); meta.append(d); }
  a.append(meta);
  const cells = el('div', 'cells');
  c.n.forEach((v, i) => {
    const cell = el('div', 'cell');
    const num = el('div', 'n', v);
    if (i === 1 && v > 0) num.classList.add('hot');
    if (i === 3 && v > 0) num.classList.add('amber');
    cell.append(num, el('div', 'nl', SLIP_LABELS[i]));
    cells.append(cell);
  });
  a.append(cells);
  if (c.rest) a.append(el('div', 'sub', c.rest));     // anything the title said past the counts, as said
  for (const line of String(m.body || '').split('\n')) {
    if (!line.trim()) continue;
    const row = el('div', 'sline');
    const x = /^(QA|FAILED|HELD|NEEDS YOU)\s+([\s\S]*)$/.exec(line);
    if (x) {
      const pre = el('span', 'pre', x[1]);
      if (x[1] === 'FAILED') pre.classList.add('hot');
      if (x[1] === 'NEEDS YOU') pre.classList.add('amber');
      row.append(pre, document.createTextNode(x[2]));
    } else row.textContent = line;
    a.append(row);
  }
  if (withRun) {
    const b = el('button', 'run');
    b.type = 'button';
    b.append(el('span', null, 'RUN'), el('small', null, runSub()));
    b.setAttribute('aria-label', 'send run: ' + runSub());
    b.addEventListener('click', () => send('run'));
    a.append(b);
  }
  return a;
}

function meRow(body, at, statusEl) {
  const a = el('article', 'row me');
  a.append(el('div', 'meta', 'YOU · ' + hhmm(when(at))), el('div', 'body', body), statusEl);
  return a;
}

function pendingRow(p) {
  if (p.state === 'sending') return meRow(p.body, p.at, el('div', 'st', 'sending…'));
  const st = el('div', 'st hot', 'NOT SENT — ' + p.reason);
  const box = el('div');
  const b = el('button', 'retry', 'RETRY');
  b.type = 'button';
  b.setAttribute('aria-label', 'retry sending this text');
  b.addEventListener('click', () => send(p.body, {retry: p}));
  box.append(st, b);
  return meRow(p.body, p.at, box);
}

/* The log keeps one element per row and only replaces a row whose content
   changed, so a poll never re-announces the whole line to a screen reader,
   never steals a tap mid-press, and never jumps the scroll. */
const NODES = new Map();
function renderLog() {
  const log = $('log');
  const rows = [...S.msgs.values()].sort((a, b) => a.id - b.id);
  const runId = runInSlipId();
  const items = [];
  let lastDay = '';
  // a divider is keyed by the row it heads, so two runs of the same day can
  // never fight over one element
  const divider = (at, first) => {
    const d = when(at) || new Date(), k = dayKey(d);
    if (k === lastDay) return;
    lastDay = k;
    const lab = dayLabel(d);
    items.push({key: 'd' + k + '@' + first, sig: lab, make: () => el('div', 'day', lab)});
  };
  for (const m of rows) {
    divider(m.at, 'm' + m.id);
    const c = m.sender === 'operation' ? slipCounts(m) : null;
    const withRun = !!c && m.id === runId;
    items.push({
      key: 'm' + m.id,
      sig: JSON.stringify([m.sender, m.kind, m.title, m.body, m.at, !!m.read_at, !!m.seen_by_spine_at,
                           withRun ? runSub() : '']),
      make: () => m.sender === 'bryan'
        ? meRow(m.body, m.at, el('div', 'st', m.seen_by_spine_at ? 'heard' : 'waits for the next session'))
        : c ? slipRow(m, c, withRun) : opRow(m),
    });
  }
  for (const p of S.pending) {
    divider(p.at, p.key);
    items.push({key: p.key, sig: JSON.stringify([p.state, p.reason, p.body]), make: () => pendingRow(p)});
  }
  if (!items.length && (DEMO || S.route === 'ok'))
    items.push({key: 'empty', sig: 'e', make: () => el('p', 'empty', 'The line is quiet. The runner texts here when it has something to say.')});

  items.reverse();     // column-reverse: newest first in the DOM, so it sits at the bottom
  const keep = new Set(), els = [];
  for (const it of items) {
    keep.add(it.key);
    let n = NODES.get(it.key);
    if (!n || n.sig !== it.sig) {
      const fresh = it.make();
      if (n && n.el.parentNode === log) n.el.replaceWith(fresh);
      n = {sig: it.sig, el: fresh};
      NODES.set(it.key, n);
    }
    els.push(n.el);
  }
  for (const [k, n] of NODES) if (!keep.has(k)) { n.el.remove(); NODES.delete(k); }
  let cur = log.firstChild;
  for (const e of els) {
    if (cur === e) { cur = cur.nextSibling; continue; }
    log.insertBefore(e, cur);
  }
  while (cur) { const nx = cur.nextSibling; cur.remove(); cur = nx; }
}

/* KEYS follow state, and every key sends its literal word through the same
   send path as his typing, so the line shows exactly what was said. */
function keySet() {
  if (!DEMO && !configured()) return [];
  if (running()) return [
    {word: 'status', label: 'STATUS', aria: 'send status'},
    {word: 'stop', label: 'STOP', sub: 'hold', hold: true, aria: 'hold to send stop'},
  ];
  const ks = [];
  if (S.approved > 0 && !runInSlipId())
    ks.push({word: 'run', label: 'RUN', sub: DEMO ? 'demo' : S.approved + ' approved', aria: 'send run'});
  ks.push({word: 'status', label: 'STATUS', aria: 'send status'});
  return ks;
}

function renderKeys() {
  const box = $('keys'), want = keySet();
  const sig = JSON.stringify(want.map(k => [k.word, k.label, k.sub || '', !!k.hold]));
  if (box.dataset.sig === sig) return;      // never rebuild a key under a finger that is holding it
  box.dataset.sig = sig;
  box.replaceChildren(...want.map(makeKey));
}

function makeKey(k) {
  const b = el('button', 'key' + (k.hold ? ' hold' : ''));
  b.type = 'button';
  b.append(el('span', null, k.label));
  if (k.sub) b.append(el('small', null, k.sub));
  b.setAttribute('aria-label', k.aria);
  if (k.hold) holdKey(b, k.word);
  else b.addEventListener('click', () => send(k.word));
  return b;
}

/* STOP is a HOLD, not a tap: 800 ms with a sweep that fills as it goes, and
   letting go early cancels. A stop kills a card mid-build, so a brush of a
   thumb in a bouncing cab must not send it. */
function holdKey(b, word) {
  let t = 0;
  const begin = e => {
    if (t) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    b.classList.add('holding');
    try { if (e.pointerId != null) b.setPointerCapture(e.pointerId); } catch (x) {}
    t = setTimeout(() => {
      t = 0;
      b.classList.remove('holding');
      try { if (navigator.vibrate) navigator.vibrate(40); } catch (x) {}
      send(word);
    }, HOLD_MS);
  };
  const cancel = () => { if (t) { clearTimeout(t); t = 0; } b.classList.remove('holding'); };
  b.addEventListener('pointerdown', begin);
  for (const ev of ['pointerup', 'pointercancel', 'lostpointercapture', 'blur']) b.addEventListener(ev, cancel);
  b.addEventListener('keydown', e => {
    if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); begin(e); }
  });
  b.addEventListener('keyup', e => { if (e.key === ' ' || e.key === 'Enter') cancel(); });
  b.addEventListener('contextmenu', e => e.preventDefault());
}

const FIELD_SIZING = !!(window.CSS && CSS.supports && CSS.supports('field-sizing', 'content'));
function autosize() {
  if (FIELD_SIZING) return;
  const t = $('txt');
  t.style.height = 'auto';
  t.style.height = Math.min(Math.max(t.scrollHeight + 3, 64), Math.round(innerHeight * 0.4)) + 'px';
}

// The counter shows only within 200 of the line's limit, and over it says
// so in words; the box never truncates what he dictated.
function counter() {
  const c = $('count'), max = S.limits.body_max, n = $('txt').value.trim().length;
  if (n < max - 200) { c.hidden = true; return; }
  c.hidden = false;
  c.textContent = n > max ? n + ' / ' + max + ' — too long to send; the line takes ' + max : n + ' / ' + max;
  c.classList.toggle('hot', n > max);
}

function renderVer() {
  $('ver').textContent = DEMO ? 'dispatch demo · no worker'
    : 'dispatch ' + (S.version ? S.version.replace(/^almanac-dispatch-/, '') : '…');
}

function view() {
  const off = !DEMO && !configured();
  $('connect').hidden = !off;
  $('log').hidden = off;
  $('keys').hidden = off;
  $('compose').hidden = off;
  if (off) $('count').hidden = true;
}

function render() {
  view();
  renderBell();
  renderStrip();
  renderLog();
  renderKeys();
  counter();
}

/* ── #demo: a fixed line for previews and screenshots. ZERO network calls,
   no worker, no subscription, and a band that cannot be dismissed, so no
   screenshot of it can pass for the real line. ──────────────────────────── */
function demoParse(body) {
  // the same whole-message rule as the spine: 'run the numbers' stays free text
  const n = body.toLowerCase().trim().replace(/^["'“”‘’]+|["'“”‘’]+$/g, '').replace(/[.!?,\s]+$/, '').replace(/\s+/g, ' ');
  if (n === 'run' || n === 'stop' || n === 'status') return n;
  const toks = n.split(' ');
  if (toks[0] === 'approve' || toks[0] === 'approved') return 'approve';
  if (toks[0] === 'hold' && toks.length > 1 &&
      toks.slice(1).join(' ').split(/[\s,]+/).filter(Boolean).every(x => /^#?\d+$/.test(x) || x === 'all' || x === 'and'))
    return 'hold';
  return null;
}

function demoSend(body, opts) {
  const now = new Date().toISOString(), verb = demoParse(body);
  S.msgs.set(++S.demoId, {id: S.demoId, at: now, sender: 'bryan', kind: 'text', body,
                          read_at: null, seen_by_spine_at: verb ? now : null});
  let reply = null;
  const r = S.runner || {};
  if (verb === 'run') {
    if (r.running) reply = ['ack', 'Already rolling', 'On #' + r.card + ' (' + r.phase + ') since ' + hhmm(when(r.since)) + '. Say stop first.'];
    else {
      reply = ['ack', "Rolling. I'll text you as cards land.", ''];
      S.runner = {running: true, card: 913, card_title: 'Demo card: the next approved one', phase: 'contract',
                  since: now, beat_at: now, run: 'demo', done_n: 0};
      S.now = now; S.gotAt = Date.now();
    }
  } else if (verb === 'stop') {
    if (r.running) {
      reply = ['ack', 'Stopping', 'Stopping #' + r.card + ". It'll text when it's down."];
      S.runner = {running: false, card: null, card_title: null, phase: null, since: null, beat_at: null, run: null, done_n: 0};
    } else reply = ['ack', "Nothing's rolling", 'No runner is on a card.'];
  } else if (verb === 'status') {
    reply = ['status', 'Status', r.running
      ? 'On #' + r.card + ' — ' + r.card_title + ' · ' + r.phase + ' since ' + hhmm(when(r.since)) + ' · ' + r.done_n + ' landed this batch.'
      : 'Idle. ' + S.approved + ' approved card(s) waiting · batches take ' + S.limits.max_cards + '.'];
  } else if (verb === 'approve' || verb === 'hold') {
    reply = ['ack', verb === 'approve' ? 'Approvals' : 'Held', 'Demo: nothing was approved or held. The real line answers this.'];
  }
  if (reply) S.msgs.set(++S.demoId, {id: S.demoId, at: now, sender: 'operation', kind: reply[0],
                                      title: reply[1], body: reply[2], read_at: now, seen_by_spine_at: null});
  if (opts && opts.compose) { $('txt').value = ''; autosize(); }
  render();
}

function demoBoot() {
  $('demo').hidden = false;
  document.title = 'Dispatch · DEMO';
  const t = Date.now(), ago = min => new Date(t - min * 60000).toISOString();
  const y = new Date(t); y.setDate(y.getDate() - 1); y.setHours(21, 40, 0, 0);
  const rows = [
    {at: y.toISOString(), sender: 'operation', kind: 'triage', title: 'Triage: 2 runnable of 9', read: true,
     body: 'RUNNABLE\n#901 Demo card: the strip shows the batch size\n#902 <b>bold?</b>\n\nNOT (7)\n' +
           'money: #903 #904\nvague: #905 #906 #907\nfence: #908 #909\n' +
           'Screened by rules only — no judgement pass yet. Read before you approve.\n' +
           'The contract stage can still refuse a card it cannot fence.\n' +
           'Say: approve 901 · approve all · approve all but 901 902'},
    {at: ago(190), sender: 'bryan', kind: 'text', body: 'run', seen: true},
    {at: ago(189), sender: 'operation', kind: 'started', title: 'Started: 3 approved cards, one at a time', read: true,
     body: 'First up: #901 Demo card: the strip shows the batch size.'},
    {at: ago(140), sender: 'operation', kind: 'built', title: '#901 built → QA', read: true,
     body: 'Demo card: the strip shows the batch size\ncommit demo001 · proof passed · suite GREEN\nreview: 1 combined lens · clean\nQA is yours.'},
    {at: ago(95), sender: 'operation', kind: 'built', title: '#902 built → QA', read: true,
     body: '<b>bold?</b>\ncommit demo002 · proof passed · suite GREEN\nreview: 3 lenses · 1 fix applied\nQA is yours.'},
    {at: ago(60), sender: 'operation', kind: 'failed', title: '#910 failed',
     body: 'The proof did not pass: test_demo, 2 of 9 red.\nAutonomy is off for #910, so it will not loop.'},
    {at: ago(41), sender: 'operation', kind: 'done', title: 'Batch landed: 3 to QA · 1 failed · 0 held · 1 need you',
     body: 'QA  #901 Demo card: the strip shows the batch size (demo001)\nQA  #902 <b>bold?</b> (demo002)\n' +
           'QA  #911 Demo card: a quieter ring (demo003)\nFAILED  #910 the proof did not pass\n' +
           'NEEDS YOU  #912 the contract asks which file owns the strip\n4 approved waiting. Say run for the next batch.'},
    {at: ago(12), sender: 'bryan', kind: 'text', body: "how's the drive look", seen: false},
    {at: ago(4), sender: 'operation', kind: 'alert', title: 'THE WATCH — sage went down',
     body: 'sage: connection refused'},
  ];
  for (const r of rows)
    S.msgs.set(++S.demoId, {id: S.demoId, at: r.at, sender: r.sender, kind: r.kind, title: r.title || null,
                            body: r.body, read_at: r.read ? r.at : null, seen_by_spine_at: r.seen ? r.at : null});
  S.runner = {running: false, card: null, card_title: null, phase: null, since: null, beat_at: null, run: null, done_n: 0};
  S.approved = 4;
  S.limits = {body_max: 2000, max_cards: 1};
  S.now = new Date(t).toISOString(); S.gotAt = t; S.route = 'ok';
  renderVer();
  render();
}

/* ── wiring and boot ─────────────────────────────────────────────────── */
// A new connection starts a fresh read of the line, but his unsent words
// (S.pending) are kept: a NOT SENT row can RETRY against the new spine.
function reset() {
  S.msgs.clear(); S.lastId = 0; S.markedThrough = 0;
  S.runner = null; S.approved = 0; S.bell = null; S.unread = 0;
  S.route = 'first'; S.lastRead = null; S.bellBooted = false; S.broken = '';
}

function start() {
  reset();
  render();
  poll(true);
}

function wire() {
  $('theme').addEventListener('click', () => {
    const mode = document.documentElement.classList.contains('sun') ? 'night' : 'sun';
    store.set('dispatch_theme', mode);
    theme(mode);
  });
  $('bell').addEventListener('click', bellTap);
  const t = $('txt');
  t.addEventListener('input', () => {
    // the draft lives in storage until a 200, so a killed tab keeps his words
    if (!DEMO) { if (t.value) store.set('dispatch_draft', t.value); else store.del('dispatch_draft'); }
    autosize();
    counter();
  });
  t.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); sendCompose(); }
  });
  $('send').addEventListener('click', sendCompose);
  $('cgo').addEventListener('click', manualConnect);
  $('ctok').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); manualConnect(); } });
  $('rgo').addEventListener('click', () => {
    const o = S.offer;
    S.offer = null;
    $('replace').hidden = true;
    if (!o) return;
    save(o.api, o.tok);
    start();
  });
  $('rno').addEventListener('click', () => { S.offer = null; $('replace').hidden = true; });
  $('notice').addEventListener('click', () => notice('', false));
  setInterval(() => { renderStrip(); renderLog(); }, 30000);   // the minutes, and TODAY at midnight
  addEventListener('hashchange', async () => {
    // #demo is decided at load; switching in or out of it is a fresh page
    if ((location.hash === '#demo') !== DEMO) { location.reload(); return; }
    if (DEMO) return;
    // a connect code opened while Dispatch is already open
    const c = takeCfgHash();
    if (!c) return;
    const was = configured();
    if ((await adoptCfg(c)) === 'adopted' && !was) start();
  });
  if (DEMO) return;
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') poll(true);
    else clearTimeout(S.timer);
  });
  addEventListener('focus', () => poll(true));
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('message', e => {
      // only OUR worker speaks on this line; the root worker's words are not ours
      if (!e.source || e.source.scriptURL !== OUR_WORKER) return;
      const d = e.data || {};
      if (d.type === 'VERSION') { S.version = String(d.version || ''); renderVer(); }
      if (d.type === 'RESUBSCRIBED') subscribe(false).then(() => poll(true));
    });
    navigator.serviceWorker.addEventListener('controllerchange', () => setTimeout(askVersion, 300));
    try { navigator.serviceWorker.startMessages(); } catch (e) {}
  }
}

async function boot() {
  wire();
  theme(document.documentElement.classList.contains('sun') ? 'sun' : 'night');
  if (DEMO) { demoBoot(); return; }
  const cfg = takeCfgHash();          // scrubbed before anything else runs
  loadCfg();
  $('txt').value = store.get('dispatch_draft') || '';
  autosize();
  renderVer();
  // The worker registers whether or not this phone is connected yet, so the
  // app can install and open offline from its first visit.
  startWorker();
  if (cfg) await adoptCfg(cfg);
  render();
  if (configured()) poll(true);
}

boot();
})();
