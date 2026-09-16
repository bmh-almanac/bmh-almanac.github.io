## 1 — THE EXACT TOKENS (two competing systems; both quoted, both must be judged)

There are **two** token systems in play, and they do not touch each other. That fact is the single most important archaeological finding.

### 1a. The house system — `~/Local Models/bik/design/`

Load order is declared in `tokens.css:5-9`: `tokens.css` → `themes/*.css` → `components.css` → `motion.css`, concatenated by `build.sh` into `dist/bmh-design.css`.

**Type** (`design/tokens.css:14-43`):
```css
--font-sans: "Inter", -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", system-ui, sans-serif;
--font-mono: "JetBrains Mono", ui-monospace, "SFMono-Regular", "Menlo", "Courier New", monospace;
--font-display: var(--font-sans);
/* Type scale — 1.125 minor-third */
--text-xs:.75rem --text-sm:.875rem --text-base:1rem --text-md:1.125rem
--text-lg:1.25rem --text-xl:1.5rem --text-2xl:1.875rem --text-3xl:2.25rem
--weight-normal:400 --weight-medium:500 --weight-semibold:600 --weight-bold:700
--lh-tight:1.2 --lh-normal:1.5 --lh-relaxed:1.65
--tracking-tight:-.015em --tracking-wide:.04em --tracking-mono:.02em
```
**Spacing** (`tokens.css:45-57`) 4px base: `--space-1:.25rem` … `--space-20:5rem` (1,2,3,4,5,6,8,10,12,16,20).
**Radius** (`tokens.css:59-65`): `--radius-sm:4px --radius-md:6px --radius-lg:10px --radius-xl:14px --radius-2xl:20px --radius-pill:999px`.
**Elevation** (`tokens.css:67-70`): `--shadow-weight-sm:0 1px 2px`, `-md:0 4px 12px`, `-lg:0 12px 32px` — weights only; the *color* is cast per theme.
**Motion** (`tokens.css:72-81`):
```css
--duration-instant:80ms --duration-fast:160ms --duration-normal:240ms --duration-slow:400ms
--ease-out:cubic-bezier(0.16,1,0.3,1);      --ease-in:cubic-bezier(0.7,0,0.84,0);
--ease-spring:cubic-bezier(0.34,1.56,0.64,1); --ease-emphasized:cubic-bezier(0.2,0,0,1);
```
**Layout / z** (`tokens.css:83-94`): `--max-content:1200px --max-reading:72ch`; `--z-base:0 --z-raised:1 --z-sticky:10 --z-overlay:100 --z-modal:200 --z-toast:300 --z-top:1000`.
**Reduced motion** (`tokens.css:98-105`) zeroes all four durations globally at `:root`.

**BMH theme palette** (`design/themes/bmh.css:11-55`) — scoped to `:root[data-theme="bmh"]`:
```css
--color-bg:#0f0f0f --color-bg-soft:#141414 --color-panel:#1a1a1a --color-panel-2:#222 --color-elevated:#2a2a2a
--color-fg:#e5e7eb --color-fg-dim:#b0b0b0 --color-fg-muted:#9ca3af --color-fg-subtle:#6b7280
--color-border:#262626 --color-border-bright:#333
--color-primary:#e5b524 /* BMH gold */ --color-primary-bright:#fbbf24
--color-primary-muted:rgba(229,181,36,.12) --color-orange:#ff9800
--color-success:#22c55e --color-warn:#e5b524 --color-danger:#ef4444 --color-info:#60a5fa
--shadow-sm/md/lg: <weight> rgba(0,0,0,.35/.5/.7)
--glow-primary: 0 0 24px rgba(229,181,36,.18);
color-scheme: dark;
```
**Matrix theme** (`design/themes/matrix.css`) — the *only* place in the stack with a semantic color vocabulary beyond good/bad, and it is the more interesting instinct: `--color-decision:#6ec1ff` (cyan), `--color-awareness:#b39bff` (violet), `--color-opp:#ffd166` (amber), `--color-threat:#ff6b6b` (coral), on `--color-bg:#000306` with `--font-body: var(--font-mono)`.

**Motion primitives** (`design/motion.css:6-45`): keyframes `ds-shimmer, ds-toast-in, ds-fade-in, ds-slide-up, ds-scale-in, ds-pulse`; classes `.ds-anim-fade-in/-slide-up/-scale-in/-pulse`, `.ds-page-enter`. Every one is a 6–8px translate or a 0.96 scale. That is the entire motion vocabulary of the house.

### 1b. The baseline's OWN system — `~/Local Models/almanac-pwa/index.html:16-45`

The live Almanac **already abandoned the house palette** and wrote its own, with a stated metaphor in the comment:
```css
/* An almanac is paper and ink. Light mode is the page; dark mode is the same
   page read at night in a truck. One accent — the red rule old almanacs used
   to mark the dates that mattered. */
:root{
  --paper:#F7F3EA; --panel:#FFFDF8; --sunk:#F1EBDD; --rule:#DCD3C1;
  --ink:#191612; --muted:#6B6255; --faint:#9A9082;
  --red:#A83A28; --good:#3F6E45; --warn:#9A6317;
  --serif:"Iowan Old Style","Palatino Linotype",Palatino,Georgia,"Times New Roman",serif;
  --mono:ui-monospace,"SF Mono",Menlo,Consolas,monospace;
  --sans:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
}
@media (prefers-color-scheme:dark){ :root{
  --paper:#13110E; --panel:#1B1815; --sunk:#191614; --rule:#322C25;
  --ink:#EDE6D8; --muted:#948A7C; --faint:#645B50;
  --red:#E0705A; --good:#7FA97F; --warn:#C79449; } }
```
Radii are a flat `3px` everywhere. Own z-scale: `.scrim{z-index:40} .drawer{z-index:50} .toast{z-index:60}` — unrelated to `--z-*`. Own motion: `transition:.12s / .18s / .2s / .22s cubic-bezier(.3,.7,.3,1)`, and a blanket `@media (prefers-reduced-motion:reduce){ *{transition:none!important} }`. `theme_color`/`background_color` in `manifest.json` and the `<meta name="theme-color">` are both `#13110E` — the dark paper.

**The ratchet already turned once.** He did not inherit gold-on-charcoal for this surface; he wrote paper-and-ink with a governing metaphor in a code comment. Whatever you build must beat *that*, not `bmh.css`.

---

## 2 — IDIOMS, SHARED HELPERS, AND LIFECYCLE HOOKS THE SURFACE MUST USE

**These are non-optional plumbing** (`almanac-pwa/index.html:470-520`, `sw.js`, `spine/server.py`). They are physics, not style.

**The fetch proxy — this is the seam your honest-refusal design hangs on:**
```js
const _fetch = window.fetch.bind(window);
window.fetch = (input, init) => {
  let url = typeof input === 'string' ? input : input.url;
  if (url.startsWith('/api/')) {
    if (!API) return Promise.resolve(new Response('{"error":"not connected"}',
      {status:503, headers:{'Content-Type':'application/json'}}));
    url = API + url;
    init = Object.assign({}, init, {headers: authHeaders((init||{}).headers)});
    return _fetch(url, init);
  }
  return _fetch(input, init);
};
```
Every write already returns `{ok, json.error}`. The existing refusal idiom is `if(!r.ok){ toast(j.error || "Could not move it."); mv.disabled = false; return; }` — a 2.6s toast. **That is the thing the hero brief asks you to replace with something built with as much care as the success.**

**Config lifecycle** — `localStorage` keys `almanac_api`, `almanac_token`, `almanac_installed`, `almanac_install_dismissed`. Bootstrap reads `#cfg={json}` from the hash, writes both, then `history.replaceState(null,'',location.pathname+location.search)` so the token never lands in history or a screenshot. `#reset`/`#nuke` unregisters all SWs, deletes all caches, `location.replace()`. Keep all of it.

**Service worker contract** (`sw.js:1-20`), verbatim, learned the hard way:
> 1. NEVER cache API responses… a stale number served from a cache is precisely the failure this project exists to prevent.
> 2. ALWAYS bypass the HTTP cache for the shell itself… `cache: "reload"` forces the real network every time.

`const VERSION='almanac-shell-v5'` must be bumped in lockstep with `const BUILD="v5"` in the page; the version chip is tappable and calls `r.update()` on every registration.

**API surface that exists today** (`spine/server.py:180-338`):
GET `/api/health`, `/api/board`, `/api/standing`, `/api/all` (`{board, standing, watch}`), `/api/watch`, `/api/learning`, `/api/doctrine`, `/api/context` (markdown), `/api/context.json`.
POST `/api/cards/{id}/move`, `/api/doctrine/{slug}/confirm`, `/api/doctrine/{slug}/flag`, `/api/learning/{id}/{choose|done|skip|applied}`, `/api/refresh`.

**⚠️ There is no obligations endpoint and no settle endpoint.** The ~24 recurring obligations are read straight out of the *finance* DB by `spine/inventory.py:169-172`:
```python
loans     = finances.one("SELECT COALESCE(SUM(payment),0) FROM loans WHERE paid_off = 0")
cc        = finances.one("SELECT COALESCE(SUM(min_payment),0) FROM credit_cards")
recurring = finances.one("SELECT COALESCE(SUM(amount),0) FROM fixed_monthly")
annual    = finances.one("SELECT COALESCE(SUM(amount),0) FROM annual_subscriptions")
```
and `spine/autonomous.py:56-59` **forbids** any unattended path from touching them: `(r"bmh_finances|transactions table|credit_cards|\bnut\b", "touches money data")`. Combined with doctrine `validate-money` ("no bulk changes to real financial records without his line-by-line sign-off"), the settle is **structurally required** to be one record, one human gesture, one write — which is exactly the hero. Design it; the endpoint is new work.

**The money payload shape** the surface must express (`index.html:540-600`): `mtd_revenue`, `road_mtd_actual`, `contribution_mtd`, `fixed_as_built`, `fixed_run_rate` (the second, honest nut), `booked_ahead[]{delivery_date, rate, broker}`, `booked_ahead_total`, `collected_mtd`, `blind_days`, `txn_through`, plus `standing.unavailable{}` and `standing.as_of`.

**Two helpers worth keeping on merit, not habit:**
```js
const money = v => v == null ? "—"
  : (v < 0 ? "-$" : "$") + Math.abs(v).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});
```
Null renders as `—`, never `0`. That one line *is* the no-fabrication doctrine in code. And `esc()` for every interpolated string — the whole page is `innerHTML`-templated.

**One hard-won CSS rule, keep it verbatim and at the top** (`index.html:47-52`):
```css
/* The `hidden` attribute is enforced by the UA stylesheet, which loses to ANY
   author rule that sets display… Keep this rule above the component styles and never remove it. */
[hidden]{display:none !important}
```

**Two comments in the baseline that are load-bearing doctrine, not notes:**
- `index.html:566-570`: *"LOADS, never days. This renderer was the THIRD copy of the per-day fiction Bryan corrected… Whoever consolidates these three into one renderer removes the whole class of bug."*
- `spine/entry.py:225-228`: *"The soul goes FIRST, before the money, because it governs how the money is read. '$1,249 short' means something different to a man funding a mission than to a man chasing a margin."*

---

## 3 — THE CURRENT BEST-LOOKING THING IN THE STACK

**Named: the "Cluster Wakes" hero from `~/Local Models/bik/mileage-insights/DESIGN-SPEC.md`.** Not the house CSS — the house CSS is a competent Tailwind-shaped token dump. The DESIGN-SPEC is the high-water mark.

What makes it genuinely good, and what you must exceed:
1. **It states a metaphor before a pixel** — *"The truck's instrument cluster wakes up and tells you the truth"* — and then earns every animation from it: "a gauge sweep isn't decoration, it's the literal instrument-startup ritual."
2. **Non-uniform polish, declared as policy**: "Do not spread polish evenly — pour it into the sweep." Everything else is explicitly "quiet, flat, supporting."
3. **Color as computed answer, not decoration**: `color-mix(in oklch, var(--color-success), var(--color-danger) calc(var(--over)*100%))`, with the reason — "oklch mixing avoids the muddy grey midpoint sRGB gives — critical so 'just over floor' reads amber, not brown."
4. **Moral asymmetry in the reward**: green gets a 40-particle burst; red gets coach copy and *no* celebration. "Celebration is earned truth, never participation." This is the closest thing in his stack to the emptiness-as-reward problem you have to solve, and it is only half the distance.
5. **Craft rules that protect the idea, written as hard constraints**: one rAF owner per concern each with a stored canceller; self-terminating particle loop with both a life and a 1500ms cap; `visibilitychange` pause; `will-change` removed after the sweep; `navigator.hardwareConcurrency <= 4` → `.lite` class; "Skip the whole hero on the empty state… no truth to reveal."

**Where it stops short — your gap to open.** It is a *single-gauge* design: one number, one verdict, one moment. Almanac has ~24 obligations, 16 cards, a watch, a learning objective and five human roles that must share one plane. The DESIGN-SPEC has no answer for plurality, no answer for silence, and its reward is *more to look at* — the exact thing this brief forbids. Its typography is unexamined (it inherits Inter/JetBrains without argument). It has no voice, no ambient, no agent-adjudication model. And it is a *dashboard*, which is the correct metaphor for a truck and the wrong one for a man deciding what to do with his life.

---

## 4 — CONSTRAINTS AND CONVENTIONS (so it doesn't fight the shell)

- **Fonts: nothing is loaded, anywhere.** `grep -rn "@font-face\|fonts.googleapis" design/` returns **zero hits**. `"Inter"` and `"JetBrains Mono"` are first in the house stacks and resolve to nothing on his Galaxy Fold 7 and S25 — `-apple-system` and `BlinkMacSystemFont` are also no-ops on Android, so the real rendered face is **Roboto**. The house type identity is a fiction on his primary device. The PWA is correct here: system-only stacks (`--serif:"Iowan Old Style",…Georgia` / `--mono:ui-monospace,"SF Mono",Menlo`) — but note "Iowan Old Style" is Apple-only too, so on the Fold it lands on **Georgia**. Any type system you propose must be specified in terms of *what actually renders on Android*, and `font-variant-numeric: tabular-nums` on every figure is mandatory (the baseline already does this on `.headline .fig`, `.barnum`, `.ledger .row b`).
- **Zero external requests, enforced by grep**: `grep -nE "https?://[a-z]" almanac-pwa/index.html` → no matches. The house system is served over HTTP from `/design/dist/bmh-design.css` (`design/PROPAGATION.md` Step 3). **A separate-origin offline PWA physically cannot consume it.** House coherence here is not merely waived — it is unavailable.
- **The shell holds nothing.** `docs/DECISIONS.md:9-22`: "The interface lives at `bmhsolutions3711.github.io/almanac/`… **It must stay glass**: HTML, manifest, worker, icons. Config arrives via the `#cfg` QR and lives only in `localStorage`." A distinct origin is the *only* reason it installs as its own app. Do not add assets that need fetching.
- **Z-index: pick one scale and own it.** Today there are two (`--z-*` 0→1000 in `tokens.css` vs. 40/50/60 inline in the PWA). Nothing else on that origin competes, so the PWA is free — but state the scale once.
- **Container:** `.wrap{max-width:860px; margin:0 auto; padding:0 18px}` with `body{padding:0 0 64px}` and `viewport-fit=cover` in the meta. Desktop breakpoint today is a single `@media (min-width:820px)` that turns the mobile tab strip into a 4-column grid — that is a stretched phone, which the brief explicitly rejects.
- **Scoping:** if any technique is lifted from the DESIGN-SPEC, its rule holds — "All new CSS lives under a `.cluster`/`#mi-*` namespace… new `@property` names are prefixed `--cpm-*`/`--mi-*`. Nothing bleeds into sibling BIK surfaces." For Almanac, prefix `--alm-*` / `#alm-*`. Since it is its own origin, nothing can break siblings; the discipline is for the next surface, not this one.
- **Degradation contract:** never a spinner, never a fabricated zero. The baseline honours it (`"The money page is unreadable."` / `"Not enough is known yet to say where you stand."` / `"Sources that did not answer: … Figures touching them are missing, not zero."` / `$("foot").textContent = "as of " + s.as_of`). Keep the *behaviour*; the presentation is yours.
- **The polling loop leaks by design today:** `setInterval(load, 120000)` with no `visibilitychange` pause and no clear. Fix it — the DESIGN-SPEC already names this as the biggest battery win for a PWA that lives in the app switcher.

---

## 5 — THE COHERENCE I AM DISCARDING, AND WHY

| Discarded | Source | Why it fails in 2026 |
|---|---|---|
| `"Inter", -apple-system, …` / `"JetBrains Mono", …` | `tokens.css:14-19` | Names two webfonts that are never loaded and cannot be loaded here. On his actual phone this is Roboto pretending to be a type system. A stock sans stack is not a decision; it is the absence of one. |
| The 1.125 minor-third scale, 8 steps | `tokens.css:22-30` | An off-the-shelf ratio with no relationship to the content. This surface has exactly one number that decides the day and twenty that don't — it needs a *dramatic* scale with a real ratio between the hero figure and everything else, not eight evenly-spaced sizes. |
| Gold-on-charcoal `#e5b524 / #0f0f0f` + `--glow-primary` | `themes/bmh.css:30-47` | It is 2019 dark-dashboard vernacular, and the glow is decoration with no semantic. He already rejected it for this surface by writing paper-and-ink instead. |
| The whole motion vocabulary | `motion.css:6-45` | Six keyframes, all 6–8px translates and 0.96 scales, plus `ds-shimmer` skeletons. Shimmer skeletons are a lie here — the stack's own rule is "never a spinner, show the last known state honestly labelled with its age." A skeleton is a spinner with better manners. |
| `.ds-card` / `.ds-chip` / `.ds-btn` | `components.css:36-144` | Generic Bootstrap-lineage primitives. The hero requires ONE object that four different domains all become; a card/chip/badge taxonomy actively fights that by giving each domain its own shape. |
| The four-tab nav + `.tabs` column strip | `index.html:170-200, 348` | `Today / The soul / Learn` + `now/next/later/done` is navigation-as-structure. The brief's "new capability arrives as CONTENT, never as NAVIGATION" is a direct instruction to delete this. |
| `--radius-lg:10px` etc. and the flat `3px` | both | 3px is closer to right (paper, printed rules) than 10px, but neither was argued. Argue it. |
| `.toast` as the failure channel | `index.html:193-206` + `toast(j.error)` | A 2.6s bottom toast for a failed money write is the opposite of "design the refusal with as much care as the success." |
| Two-mode light/dark | `index.html:16-45` | Two first-class modes, both unfinished. Dark-only is explicitly permitted and removes the burden. |

---

## 6 — WHAT HIS TASTE ACTUALLY REVEALS (the real inheritance)

Carry these forward on merit; they are the man, not the CSS.

1. **He writes the metaphor into the source before the styles.** Both `almanac-pwa/index.html:16-19` and the DESIGN-SPEC open with one. `DOCTRINE.md` ratifies it as `design-bar`: *"commit to a one-sentence governing metaphor and one signature moment anchored to what the thing means — the flash is downstream of the meaning."*
2. **He reaches for a book, not a screen.** Given a free hand he chose paper, ink, a serif, small-caps, a hairline rule, and one red accent "old almanacs used to mark the dates that mattered." `DECISIONS.md:139-142`: an almanac is "humble rather than grandiose," carries "the farm roots," and "generalizes across domains the way an almanac has sections." A well-set book is already his instinct; you are permitted to go all the way there.
3. **He refuses metrics that can be farmed.** `DECISIONS.md:26-42`: five previous scoring systems all sit at zero rows; "a score you can farm by pressing play is a score you stop believing by day three." Rules out streaks, XP, hours logged, percent complete — and by extension every progress ornament that does not correspond to a real change in the world.
4. **He is allergic to false green.** `watch.py:5-11`: "a duplicate Discord bot doubled every message for hours while every monitor reported green because the PORT was still up. Liveness is not health." Anything that renders OK must be able to prove it.
5. **Deletion is the currency.** `LEDGER.md:18-19`: "**Standing: even.** Almanac has paid for itself and is no longer sprawl. It is not yet net-negative — that starts with the next deletion." A design that can only add is a design that fails his ledger.
6. **The soul is rendered before the money, deliberately** (`entry.py:225-228`) — and the doctrine review is one creed at a time because *"twenty-four at once is a wall, and a wall gets skimmed — which is how you end up 'confirming' something you never actually read"* (`index.html:709-711`). He has already discovered, in his own code, that the right unit of attention is **one thing, fully, then the next**. That is the settle queue, and he built a rough draft of it a day ago.
7. **The matrix theme is the better color instinct.** `themes/matrix.css:32-35` gives *decision / awareness / opportunity / threat* their own hues. Semantic-by-kind rather than good/bad is the more advanced idea in his stack and the one worth carrying — though a settle queue that is domain-blind by design may argue for exactly the opposite, and that tension is worth resolving explicitly rather than by default.