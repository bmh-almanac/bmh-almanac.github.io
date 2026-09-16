# ALMANAC — BLEEDING-EDGE UI TECHNIQUE PLAYBOOK
### Researched against the live web platform, July 2026. Grounded in `~/Almanac/docs/DOCTRINE.md`, `DECISIONS.md`, `LEDGER.md`, `spine/entry.py::render_context()`, and the current shell at `~/Local Models/almanac-pwa/index.html`.

---

## 0. THE CALL FIRST (metaphor before CSS — his own `design-bar` creed)

### The governing metaphor, one sentence

> **Almanac is one lamp over one desk at night. Under the light sit only the open gaps — the places where what he said and what is actually true have come apart. He closes the last one and the lamp goes out.**

Why this one and not an instrument panel, a ledger, or a dashboard:

- **It is his own primitive, rendered.** `DECISIONS.md` 2026-07-24: *"the core primitive is the gap between stated and actual."* A dashboard renders *state*. A lamp renders *what is unresolved*. Only the second one can ever be empty, and emptiness is the payoff the brief demands.
- **It is domain-blind by construction.** A $1,500 truck-insurance payment, card #647 needing his ruling, `:8560` down, an unconfirmed creed, a nephew's birthday, and an agent saying *"I re-tagged 14 transactions, confirm"* are all the same object: **a STANDING** — something true that is out of alignment with something declared, which only his hand can close. He named five roles; a gap doesn't know which role it belongs to. That is the structural answer to "no personal section exists anywhere."
- **New capability arrives as more STANDINGS, never as a fifth tab.** Health lands as gaps. Agents land as gaps with a proposed ruling attached. Glasses render the top STANDING and nothing else. Voice reads the STANDINGS aloud and settles them by name. No navigation grows.
- **The empty state is a physical event, not an absence.** A lamp going out is unmistakably *not* a failed fetch. That solves the hardest problem in the brief.

Runner-up, named and rejected: *the night watch on a bridge*. Same domain-blindness, but a watch implies vigilance that never ends — wrong for a man whose stated goal is getting his attention back.

### Vocabulary (use it in code, in ARIA, in the voice layer)

| Term | Meaning | Already in his stack |
|---|---|---|
| **STANDING** | one open gap awaiting his ruling | yes — `/api/standing` |
| **settle** | the gesture that closes one | new |
| **the lamp** | the field of open standings | new |
| **the book** | everything below the lamp — the record, the board, the month | `entries`, `moves` |
| **dark** | earned zero-standing state | new |

---

## 0b. THE COHERENCE I AM DISCARDING, AND WHY

He waived house coherence. Here is the receipt, item by item — nothing dropped without an argument.

| Discarding | Where it lives | Why it loses in 2026 |
|---|---|---|
| **The cream-paper light theme** (`--paper:#F7F3EA`) | `almanac-pwa/index.html:20` | Two first-class modes is two designs, two QA passes, two sets of contrast bugs — for a surface with exactly one user who reads it at 5am and in a cab at night. Dark-only removes the burden entirely (the brief pre-authorizes this). **Keep the warmth, kill the paper**: warm near-black `oklch(0.16 0.008 75)`, not the blue-gray tech dark everyone ships. Farm at night, not a terminal. |
| **`--serif: Iowan Old Style` for figures** | `:23`, `.headline .fig` | A book face is a *reading* face. Money is not read, it is **scanned and compared**. Figures need one face forever, with true tabular lining figures and a slashed zero. Iowan is beautiful and wrong for a ledger. Retain a text serif *only* for the closing narrative — the one thing on the page that genuinely is prose. |
| **The 1.125 minor-third scale** (`--text-xs…3xl`, 8 steps) | `bik/design/tokens.css:24-32` | An off-the-shelf ratio that yields eight sizes so close together they read as noise. Instruments do the opposite: **one enormous primary, one small label, nothing in between.** A Bloomberg terminal and a 737 PFD both use ~3 sizes. Replace with 4 functional steps keyed to *reading distance*, not to a ratio. |
| **The `.tabs` board navigation** | `almanac-pwa/index.html:445` | Tabs are navigation. The brief forbids navigation growth. The board becomes: cards that need a ruling are STANDINGS under the lamp; the rest is a strip in the book. |
| **The bespoke `.drawer`** | `:172` | 2026 has `popover` + anchor positioning + `@starting-style` + `interpolate-size`. Hand-rolled drawers now cost more code and behave worse (no top-layer, no light-dismiss, no `closedby`). |
| **`ds-anim-pulse` infinite** | `bik/design/motion.css` | An infinite pulse is a permanent attention tax on a surface whose entire purpose is returning attention. Anything perpetually animating has already failed the acceptance test. |
| **`--shadow-weight-*` elevation** | `tokens.css` | Material-era depth. On a lamp, depth comes from *falloff of light*, which is free (radial gradient) and physically motivated. |
| **Skeleton loaders / spinners** | implied by `fetch` flow | Doctrine `no-fabrication`: a skeleton is a shape of data that doesn't exist. Render last-known state, honestly aged. Never a spinner. |

**What I am keeping, argued on merit in 2026 — not because it's there:**

1. **`localStorage` key namespacing (`almanac_*`).** Not style — a safety requirement. All his PWAs share the `bmhsolutions3711.github.io` origin, so `localStorage`, `IndexedDB`, `caches` and cookies are **shared across every shell he owns**. Un-namespaced keys are how one surface breaks a sibling. (See §10.6 — this is the single highest-risk line in the whole build.)
2. **The mono micro-label in wide tracking** (`.pill`, `:150`). That's an aircraft annunciator caption and it's genuinely correct. Keep, use sparingly.
3. **`font-variant-numeric: tabular-nums`** (`:83`). Right instinct. Now push it much further (§2).
4. **Doctrine rendering before money** (`entry.py:226-232`). Not a visual convention — a doctrinal one. Non-negotiable, carries forward verbatim.

---

## 1. STRUCTURE — the container that absorbs the future

### 1.1 One list, one book. No tabs, ever.

```
┌────────────────────────────┐
│  the lamp                  │   ← STANDINGS. Only things needing HIS hand.
│    • 3 truck insurance     │     Sorted by consequence, not by domain.
│    • #647 ruling           │     Nothing here is informational.
│    • :8560 down 41m        │
├─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┤   ← the terminator. below = read-only.
│  the book                  │   ← money, month strip, board strip,
│                            │     watch, muscle, last entry narrative.
└────────────────────────────┘
```

Future capability enters **above** the terminator as a STANDING or **below** it as a strip. There is no third place, which is exactly why there is never a fifth tab.

### 1.2 `@scope` — style isolation without a build step

**What:** Baseline-available scoped styles with a lower boundary.
**Why here:** Single-file PWA, no bundler, and the STANDING component must be safely liftable into the glasses view and the desktop instrument without leaking.

```css
@scope (.lamp) to (.standing__detail) {
  :scope { --lamp-radius: 62vmin; }
  .standing { /* never reaches into detail popovers */ }
}
```

**Gotcha:** `@scope` proximity beats specificity, which surprises people — a `:scope .x` rule can beat an ID selector defined further away. Keep one `@scope` block per component and never nest them more than two deep.

### 1.3 `content-visibility` — the book costs nothing until seen

```css
.book > section {
  content-visibility: auto;
  contain-intrinsic-size: auto 220px;  /* remembers last real size */
}
```

**Why here:** The lamp must paint instantly one-handed at a truck stop on weak cellular. The book is 6+ sections of ledger, month strip, board and narrative. `auto` skips layout/paint for off-screen sections entirely.

**Gotcha:** breaks in-page find and can cause scroll-anchor jumps if you omit `contain-intrinsic-size`. Always supply it, and use the `auto <length>` form so the browser stores the *real* measured size after first paint.

### 1.4 Scroll-state container queries — the terminator that knows it's stuck

**What:** `@container scroll-state(stuck: top)` / `(scrolled: top)` — style descendants based on the container's scroll condition, no JS scroll listener (Chrome 133+, part of the 2026 UI wave).

**Why here:** When he scrolls into the book, the lamp header should *compress into an instrument bezel* — count of standings + the one number — without an `IntersectionObserver` firing on every frame in a moving truck.

```css
.terminator { container-type: scroll-state; position: sticky; top: 0; }

@container scroll-state(stuck: top) {
  .terminator__figure { font-size: var(--fig-sm); opacity: 1; }
  .terminator__rule   { --rule-weight: 1.5px; }
}
```

**Gotcha:** the queried element must be a *descendant* of the `container-type: scroll-state` element — you cannot style the sticky element itself from its own scroll-state query. Wrap it.

### 1.5 `view-transition-name: match-element` — the list that reorders itself honestly

**What:** Auto-assigns stable transition names by element identity; Safari 18.4+ and Chromium. Purpose-built for sortable lists and kanban rows.

**Why here:** When one STANDING settles and leaves, the remaining ones must *physically move up* — not cross-fade. That difference is the whole feeling of "one fewer thing on my plate." And it costs one CSS line instead of a manual naming loop over 24 obligations.

```css
.standing { view-transition-name: match-element; }
```

**Gotcha:** `match-element` is same-document only, and duplicate names abort the transition. If you also transition the terminator figure, give it an explicit unique name.

---

## 2. TYPOGRAPHY — the instrument, built from system fonts only

No webfont fetch is allowed. That is not a limitation in 2026; **the system variable fonts (SF on Apple, Roboto Flex on Android) are better than most licensed families**, and the modern text-metrics properties are what actually separate amateur from instrument-grade.

### 2.1 `text-box-trim` / `text-box-edge` — the single highest-leverage property on this page

**What:** Trims the font's leading above the cap-height and below the baseline so a text box is *exactly* the glyphs. Chrome/Edge 133+, Safari 18.2+. Not Firefox — irrelevant here.

**Why here:** The nut figure is the biggest thing on the page. With default line-box metrics it sits in a slab of invisible whitespace that no amount of `margin` tuning fixes, and it will never optically align with the rule beneath it. This property is the difference between "a big number" and "an instrument reading."

```css
.figure {
  font: 700 clamp(3rem, 17vw, 6.5rem)/1 var(--fig);
  text-box: cap alphabetic;            /* shorthand: trim over→cap, under→baseline */
  font-variant-numeric: tabular-nums slashed-zero;
  font-feature-settings: "ss01" 1;     /* SF: alt digits; harmless elsewhere */
  letter-spacing: -0.022em;
}
@supports not (text-box: cap alphabetic) {
  .figure { margin-block: -0.14em -0.09em; }  /* measured fallback */
}
```

**Gotcha:** `cap` depends on the font actually declaring cap-height metrics. System fonts do; some fallback fonts don't, and you'll silently get `text` behavior. Never combine with a `line-height` other than `1` — you'll fight two systems.

### 2.2 The four-step functional scale (replacing the minor third)

Keyed to **reading distance in a truck cab**, not to a ratio:

```css
:root {
  --fig-hero: clamp(3rem, 17vw, 6.5rem);   /* the one number. arm's length, glanceable */
  --fig-inst: clamp(1.35rem, 5.2vw, 1.8rem);/* a settleable amount, a card title */
  --txt:      1.0625rem;                    /* prose: the closing narrative */
  --cap:      0.6875rem;                    /* annunciator captions, 0.14em tracked, uppercase */
}
```

Four sizes. The gap between `--fig-hero` and `--fig-inst` is enormous *on purpose* — that gap is the hierarchy doing the work that eight near-identical sizes cannot.

### 2.3 Two faces, assigned by job — never by aesthetics

```css
:root {
  /* FIGURES ONLY. Every number on the page, forever, in this one face. */
  --fig: ui-monospace, "SF Mono", "Roboto Mono", "DejaVu Sans Mono", monospace;
  /* Everything structural. Roboto Flex on his Samsungs = a real variable font. */
  --ui:  system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  /* Prose ONLY: last session's narrative. The one thing that is genuinely read. */
  --prose: ui-serif, Georgia, "Times New Roman", serif;
}
```

The rule that makes it feel designed rather than assembled: **if it is a quantity, it is in `--fig`. No exceptions, no second opinions.** That is `one-number-one-home` expressed as typography.

### 2.4 `text-wrap: pretty` on the narrative, `balance` on headings

```css
.narrative { text-wrap: pretty; hyphens: auto; }  /* kills orphans in the closing prose */
.headline  { text-wrap: balance; }                /* ≤4 lines only */
```

**Why here:** The closing narrative is the one artifact the next session reads cold. A ragged orphan at the end of a 5-line paragraph on a 340px-wide folded Fold screen is exactly the kind of small ugliness that makes a personal system feel unloved.

**Gotcha:** `balance` silently no-ops past ~6 lines (browser bail-out). Don't apply it to body copy — that's what `pretty` is for.

### 2.5 `text-fit` (emerging, Chrome I/O 2026) — the figure that always fills its rail

```css
.figure { text-fit: consistent scale; }   /* progressive enhancement only */
```

**Why here:** `$9,320.85` and `$847.12` want to be the same optical weight. `clamp()` sizes by *viewport*; `text-fit` sizes by *content*. Behind `@supports`, this is the cleanest solve for a currency figure whose digit count changes month to month.

**Gotcha:** Chromium-only and very new. Must be additive on top of a working `clamp()`. Never ship it as the only sizing mechanism.

---

## 3. COLOR — honesty encoded in the ramp

### 3.1 OKLCH + `color-mix()` — one hue family, perceptually even

**Why here:** sRGB hex ramps go muddy in the middle. Under a *lamp*, everything is one warm light source at varying intensity — which is precisely what an OKLCH lightness ramp at fixed hue produces. One token generates the whole page.

```css
:root {
  color-scheme: dark;
  --bg:    oklch(0.155 0.008 75);     /* warm near-black. NOT #000 (OLED black-crush) */
  --lit:   oklch(0.93  0.015 85);     /* full attention */
  --ink:   color-mix(in oklch, var(--lit) 82%, var(--bg));
  --muted: color-mix(in oklch, var(--lit) 46%, var(--bg));
  --faint: color-mix(in oklch, var(--lit) 22%, var(--bg));

  --short: oklch(0.68 0.17  32);      /* uncovered / down / overdue */
  --clear: oklch(0.74 0.11 148);      /* covered */
  --soon:  oklch(0.80 0.13  78);      /* due within 3 days */
  --unknown: var(--faint);            /* see 3.3 — never a color, always an absence */
}
```

**Gotcha:** `color-mix(in oklch, …)` with a hue difference >180° takes the short arc and can pass through a hue you didn't intend. For ramps, mix toward `--bg` or `--lit` only — never mix two saturated hues.

### 3.2 `@function` — the doctrine compiled into a color (Chrome 139+)

**What:** Genuinely new: user-defined CSS functions with parameters and conditional `result`.

**Why here:** "Honest, not grim" is a *rule about how numbers map to alarm*, and today that rule lives in his head and gets re-typed in every surface. Compile it once:

```css
@function --by-coverage(--ratio) {
  result: var(--clear);
  @container style(--ratio < 1)   { result: var(--soon);  }
  @container style(--ratio < 0.7) { result: var(--short); }
}
.figure { color: --by-coverage(var(--coverage)); }
```

Now the alarm threshold is one place, and changing doctrine is a one-line edit — not a hunt across 17 surfaces, which is the exact disease `DECISIONS.md` says Almanac exists to cure.

**Gotcha:** Chromium-only (~67% globally; 100% of *his* devices, but state it). Always author with a plain `color:` fallback declaration before it — CSS's own cascade handles the fallback for free.

### 3.3 The **unknown token** — the doctrine's hardest rule, made visual

`no-fabrication`: *unknown renders as unknown, never as zero.* Give it a dedicated, unmistakable, non-numeric treatment:

```css
.unknown {
  color: var(--unknown);
  font-family: var(--fig);
  letter-spacing: 0.12em;
}
.unknown::after { content: "——"; }            /* em-dashes, never "0" or "--" */
.unknown[data-through] {
  border-bottom: 1px solid transparent;
  border-image: repeating-linear-gradient(90deg,
      var(--faint) 0 3px, transparent 3px 6px) 1;  /* hatched = not yet observed */
}
```

Use it for `blind_days`, for unreconciled collections, and for any agent-reported figure not yet confirmed. **A hatched underline never looks like data.** That is the entire point.

### 3.4 `contrast-color()` — labels that stay legible over a live gauge

```css
.gauge__label { color: contrast-color(var(--gauge-tint)); }
```

**Why here:** The nut gauge's fill color is data-driven and changes as the month runs. Hardcoding a label color guarantees one week a month where it's unreadable in daylight through a windshield.

---

## 4. INSTRUMENTS — gauges, counters, the month strip

### 4.1 `@property` + `conic-gradient` — the nut arc, animated on the compositor

**What:** Typed custom properties make a gradient stop *animatable*. Without `@property` this is impossible in CSS.

**Why here:** The single most important quantity: contribution against a $9,320.85 nut, and how much of the remainder is *booked but not run* (which owes its own fuel — `entry.py:271`). Three-band arc: **collected · booked · uncovered**. One element, no canvas, no library.

```css
@property --arc-a { syntax: "<percentage>"; inherits: false; initial-value: 0%; }
@property --arc-b { syntax: "<percentage>"; inherits: false; initial-value: 0%; }

.gauge {
  --thick: 9px;
  aspect-ratio: 1; inline-size: 44vmin; border-radius: 50%;
  background: conic-gradient(from -90deg,
      var(--clear)   0 var(--arc-a),
      var(--soon)    var(--arc-a) var(--arc-b),
      var(--faint)   var(--arc-b) 100%);
  mask: radial-gradient(closest-side, #0000 calc(100% - var(--thick)), #000 0);
  transition: --arc-a 900ms var(--ease-settle), --arc-b 900ms var(--ease-settle) 60ms;
}
@media (prefers-reduced-motion: reduce) { .gauge { transition-duration: 1ms; } }
```

**Gotchas:**
- `@property` registration must appear **before** any rule that transitions it, or the first transition silently no-ops.
- `mask` on a conic gradient forces a new compositing layer — fine for *one* gauge; do not repeat it 24 times for the obligations list.
- Never animate `--arc-*` on page load. See 4.3.

### 4.2 The month strip — "spend known through X, N days not yet visible"

The most literal, most honest, cheapest instrument on the page, and it falls straight out of the lamp metaphor: **days that have been observed are lit; days that haven't are outlined but present.**

```css
.month { display: grid; grid-template-columns: repeat(31, 1fr); gap: 2px; block-size: 34px; }
.month i {
  background: color-mix(in oklch, var(--clear) calc(var(--earn) * 100%), transparent);
  border-radius: 1px;
}
.month i[data-blind] {
  background: none;
  box-shadow: inset 0 0 0 1px var(--faint);   /* present, unlit, un-fakeable */
}
.month i[data-today] { box-shadow: inset 0 0 0 1px var(--lit); }
```

`blind_days` from `entry.py:285` becomes a visual fact rather than a caption he has to read. **Incomplete, not zero — rendered.**

### 4.3 Counters: only animate a delta *he* caused

**The doctrine call, and it is a real one.** A count-up on page load is theater — it performs work back at him and costs attention (fails the acceptance test), and it dramatizes a bad number, which is grim. So:

- **On load:** figures render at final value. Instantly. No roll.
- **After a settle:** the affected figure rolls, once, because *he moved it*. The motion is a receipt.

```js
// WAAPI so it is cancellable, interruptible, and GC-clean.
function rollFigure(el, from, to, signal) {
  const fmt = new Intl.NumberFormat('en-US',
    { style:'currency', currency:'USD', minimumFractionDigits:2 });
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = fmt.format(to); return Promise.resolve();
  }
  const t0 = performance.now(), dur = 620;
  return new Promise(res => {
    let raf;
    const step = now => {
      if (signal?.aborted) { el.textContent = fmt.format(to); return res(); }
      const p = Math.min(1, (now - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);              // settle, don't bounce
      el.textContent = fmt.format(from + (to - from) * e);
      if (p < 1) raf = requestAnimationFrame(step); else res();
    };
    raf = requestAnimationFrame(step);
    signal?.addEventListener('abort', () => cancelAnimationFrame(raf), { once:true });
  });
}
```

**Gotcha:** without `tabular-nums` the string width changes every frame and the whole row jitters. §2.1 already sets it — but if you ever put a figure outside `.figure`, you will see this bug and think it's a layout problem. It isn't.

**Pure-CSS alternative** (`@property` `<integer>` + `counter-set` + `content: counter(n)`) is elegant and I'd normally reach for it, but `counter-set` support is uneven and it cannot format currency. Use the JS version for money; the CSS version is fine for a standings *count*.

### 4.4 `linear()` easing — a real spring without a physics library

**What:** `linear()` with many stops approximates any curve, including springs and settles. Baseline.

```css
:root {
  --ease-settle: linear(0,.13 3.2%,.48 8.7%,.79 14.5%,.95 19.6%,1.02 25%,
                        1.03 31%,1 40%,1 100%);   /* 3% overshoot, no wobble */
  --ease-refuse: linear(0,.42 12%,-.18 32%,.09 52%,-.03 72%,0 100%); /* snap-back */
}
```

**Why here:** `--ease-settle` on the latch and the gauge gives the whole surface the feel of a mechanical detent — the Teenage Engineering / fine-watch register the brief asks for — with zero JS. `--ease-refuse` is used exactly once, in §5.

**Gotcha:** generate these; hand-writing stops produces subtle wobble. Values above `1` overshoot — never overshoot a **money figure** (reads as inaccuracy). Overshoot the *mechanism*, never the *number*.

---

## 5. ⚡ THE HERO — THE SETTLE

> **The core idea, and the thing nobody else has built: the progress of the latch is the progress of the write. The bar is not a countdown. It is the transaction.**

Every "hold to confirm" on the web is a fake timer that runs, completes, and *then* fires a request that may fail after the animation already promised success. That is an instrument pretending it acted. His doctrine forbids it explicitly.

### 5.1 The gesture: press-and-hold with a latching rail

Chosen over swipe and over tap-then-confirm, and here is the reasoning:

- **Un-mis-fireable.** It writes to a finance DB. `validate-money` doctrine.
- **One-handed, low precision.** Press anywhere on the row. A swipe in a truck at a light is a coin flip.
- **The hold replaces the confirm dialog.** That is a *decision removed*, not a decision restyled — the acceptance test, passed.
- **It is physical.** Pressure builds, a detent catches, the thing is gone. Same object whether it's $1,500 of truck insurance, a board ruling, a downed service, or an agent's proposal.

### 5.2 Two-phase latch: ARM (local, 420ms, cancellable) → SEAT (network, honest)

```
pointerdown ─── ARM ────────────▶ full ─── SEAT ──▶ caught  → item leaves
              (local, 420ms)              (network) └ refused → springs back, stays
              release early = abort, no request ever sent
```

**Phase 1 — ARM.** Purely local. Nothing is sent. Releasing early cancels with zero consequence. This is what makes it safe to fire the request at the end rather than the beginning (aborting an in-flight financial POST is *not* safe — the server may already have committed).

**Phase 2 — SEAT.** The POST goes out with an idempotency key. The rail holds at full under visible **tension** — a 1.5% over-travel that breathes at ~0.8Hz — for as long as the network actually takes. He can *see* latency. Nothing is faked.

### 5.3 The full implementation

```js
const HAPTIC = { arm:[8], seat:[14,26,14], refuse:[12,70,12] };
function buzz(p){ try { navigator.vibrate?.(p); } catch {} }

class Latch {
  constructor(row, api){ this.row = row; this.api = api; this.armed = null; this.ac = null;
    row.addEventListener('pointerdown', e => this.down(e));
    for (const t of ['pointerup','pointercancel','pointerleave'])
      row.addEventListener(t, () => this.up());
  }

  down(e){
    if (this.row.dataset.state === 'seating') return;
    this.row.setPointerCapture(e.pointerId);
    this.row.dataset.state = 'arming';
    buzz(HAPTIC.arm);
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.armed = this.row.querySelector('.latch__rail').animate(
      { transform: ['scaleX(0)', 'scaleX(1)'] },
      { duration: reduce ? 260 : 420, easing: 'var(--ease-settle)', fill: 'forwards' }
    );
    this.armed.finished.then(() => this.seat()).catch(() => {});   // catch = cancelled
  }

  up(){
    if (this.row.dataset.state !== 'arming') return;                // already seating: let it finish
    this.armed?.cancel();
    this.row.dataset.state = '';
  }

  async seat(){
    this.row.dataset.state = 'seating';                             // rail holds + breathes
    this.ac = new AbortController();
    const kill = setTimeout(() => this.ac.abort('timeout'), 9000);
    try {
      const r = await fetch(`${this.api}/api/standing/${this.row.dataset.id}/settle`, {
        method:'POST', signal:this.ac.signal,
        headers:{ 'Content-Type':'application/json',
                  'Authorization':'Bearer ' + TOK,
                  'Idempotency-Key': this.row.dataset.key },
        body: JSON.stringify({ at: new Date().toISOString() })
      });
      if (!r.ok) throw new Error(`${r.status} ${(await r.text()).slice(0,160)}`);
      const out = await r.json();
      clearTimeout(kill);
      await this.caught(out);                                       // ← ONLY NOW
    } catch (err) {
      clearTimeout(kill);
      this.refuse(err);
    }
  }
  ...
}
```

### 5.4 CAUGHT — the confirmation, drawn only after the write returned

```js
async caught(out){
  buzz(HAPTIC.seat);
  tine(880, 0.055);                                     // §5.7
  const stack = document.querySelector('.lamp');
  const go = () => { this.row.remove(); paintBook(out); };
  // Element-scoped VT (Chrome 147+): remaining standings slide up while the
  // rest of the page stays interactive and no full-page snapshot is taken.
  if (stack.startViewTransition) {
    await stack.startViewTransition({ update: go, types: ['settle'] }).finished;
  } else if (document.startViewTransition) {
    await document.startViewTransition(go).finished;
  } else { go(); }

  if (!document.querySelector('.standing')) await goDark();          // §5.6
}
```

```css
::view-transition-group(*):only-child { animation-duration: 340ms; }

html:active-view-transition-type(settle) {
  &::view-transition-old(*) {
    animation: 220ms var(--ease-settle) both settle-out;
  }
}
@keyframes settle-out {
  to { opacity: 0; transform: translateX(14px) scale(.985); filter: blur(1.5px); }
}
```

**Gotcha:** element-scoped `startViewTransition()` is Chrome 147+. The two-tier fallback above is mandatory, and a plain `go()` third tier must exist — the settle is the primary action of the app and it can never depend on a transition API.

### 5.5 REFUSED — designed with as much care as the success

The failure must be *legible as a physical failure to catch*, not as a red toast.

```js
refuse(err){
  buzz(HAPTIC.refuse);
  thud(150, 0.09);                                       // low, short, un-musical
  this.row.dataset.state = 'refused';
  this.row.querySelector('.latch__rail').animate(
    { transform: ['scaleX(1)','scaleX(0)'] },
    { duration: 520, easing: 'var(--ease-refuse)', fill:'forwards' });
  const why = this.row.querySelector('.latch__why');
  why.textContent = err.name === 'AbortError'
    ? 'no answer from the spine in 9s — nothing was written'
    : `the spine refused: ${err.message}`;
  why.hidden = false;
}
```

```css
.standing[data-state="refused"] {
  --edge: var(--short);
  box-shadow: inset 2px 0 0 var(--short);
}
.standing[data-state="refused"] .latch__why {
  font: 400 var(--cap)/1.5 var(--fig);
  color: var(--short); letter-spacing: .02em;
  padding-block-start: 6px;
}
/* Entry animation for a discrete-property reveal, no JS timing */
.latch__why { transition: opacity 180ms, display 180ms allow-discrete; }
@starting-style { .latch__why { opacity: 0; } }
```

**The three rules of the refusal — this is the trust purchase:**

1. **The item does not move.** It is still standing. Its absence would be the lie.
2. **The rail runs backwards.** Not a shake, not a flash — the mechanism visibly *failing to catch*. `--ease-refuse` overshoots negative once. It reads as a spring letting go.
3. **The reason is the server's own words, verbatim, in the figure face.** Not "Something went wrong." `no-fabrication` applies to error copy exactly as it applies to money. And it always says **what was NOT written**, because that is the fact he needs.

Retry is the identical gesture on the identical row. No new button, no new decision.

### 5.6 THE LAST ONE — going dark

The hardest problem in the brief. Here is the answer, in five beats:

```js
async function goDark(){
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lamp = document.documentElement;

  // 1. THE HELD BEAT — 620ms of nothing at all. This survives reduced-motion,
  //    because a pause is not motion. It is the pause that makes it land.
  await new Promise(r => setTimeout(r, 620));

  // 2. THE LAMP GOES OUT — radius collapses, warmth drains toward the floor.
  lamp.dataset.dark = '1';
  if (!reduce) await lamp.animate(
    [{ '--lamp-r':'62vmin' }, { '--lamp-r':'0vmin' }],
    { duration: 1500, easing:'cubic-bezier(.4,0,.2,1)', fill:'forwards' }).finished;

  // 3. THE MARK — one line of set type fades up. Never an empty viewport.
  document.querySelector('.dark-mark').hidden = false;
  bell();                                             // §5.7 — once. Only ever here.
}
```

```css
@property --lamp-r { syntax:"<length>"; inherits:true; initial-value:62vmin; }

html[data-dark] { --lit: oklch(0.62 0.010 78); }      /* everything recedes */

.dark-mark {
  position: fixed; inset-block-end: 22vh; inset-inline: 0;
  text-align: center; transition: opacity 900ms;
}
.dark-mark__line { font: 400 var(--txt)/1.6 var(--prose); color: var(--muted); }
.dark-mark__date { font: 400 var(--cap)/1 var(--fig);
                   letter-spacing:.16em; text-transform:uppercase; color: var(--faint); }
/* PROOF OF LIFE — the anti-error signal. One hairline, one slow breath. */
.dark-mark__rule {
  inline-size: 34px; block-size: 1px; margin: 18px auto; background: var(--faint);
  animation: breathe 7s ease-in-out infinite;
}
@keyframes breathe { 0%,100%{opacity:.28} 50%{opacity:.72} }
@media (prefers-reduced-motion: reduce) { .dark-mark__rule { animation: none; opacity:.5 } }
@starting-style { .dark-mark { opacity: 0 } }
```

**Why this cannot read as a blank screen, a failed load, or an error — four independent proofs, any one of which is sufficient:**

1. **It is typeset.** Real type, optically centered, sitting on a hairline. Errors and failed loads are never set well. This is the load-bearing one.
2. **It was witnessed.** He watched the last item leave and the light fall. A failure state arrives; this one *happened*.
3. **It breathes.** A 7-second hairline pulse is unambiguous proof-of-life at a glance, and it survives reduced-motion as a static half-opacity rule.
4. **It says something true and specific.** Not "All done!" — that's flattery. The honest-not-grim reading:

```
                    ————
        Nothing is standing. Two loads booked,
           $1,780, both delivering Thursday.
                 FRI 25 JUL · 21:14
```

A **fact**, not a congratulation. It states good news plainly (doctrine: *never omit a good one either*) and it does not perform. Then it gets out of the way. Swipe up reaches the book if he wants it; nothing asks him to.

**And the honesty guard:** `goDark()` must only ever run on a **settle-driven** empty. If the standings list is empty because `/api/standing` was unreachable, that is *not* dark — that is unknown, and it renders §9.3's aged-state treatment. **The lamp only goes out because he turned it off.** Gate it:

```js
if (!document.querySelector('.standing') && state.source === 'live' && state.settledThisSession)
  await goDark();
```

### 5.7 Sound — three sounds, total, for the life of the product

One `AudioContext`, created lazily on the first real gesture, closed on `pagehide`. Total code ~30 lines. No files, no fetch.

```js
let AC = null;
const ac = () => (AC ??= new (window.AudioContext || window.webkitAudioContext)());

function voice(freq, dur, type='sine', gain=0.09){
  if (localStorage.getItem('almanac.mute') === '1') return;
  const c = ac(); if (c.state === 'suspended') c.resume();
  const o = c.createOscillator(), g = c.createGain();
  o.type = type; o.frequency.value = freq;
  g.gain.setValueAtTime(0.0001, c.currentTime);
  g.gain.exponentialRampToValueAtTime(gain, c.currentTime + 0.004);
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
  o.connect(g).connect(c.destination);
  o.start(); o.stop(c.currentTime + dur + 0.02);
  o.onended = () => { o.disconnect(); g.disconnect(); };      // ← no node leak
}
const tine  = () => voice(880, 0.055, 'sine', 0.07);          // one settled
const thud  = () => voice(150, 0.090, 'triangle', 0.10);      // refused
const bell  = () => { voice(528, 1.6, 'sine', 0.05); setTimeout(()=>voice(792,1.3,'sine',0.028),90); };
addEventListener('pagehide', () => { AC?.close(); AC = null; });
```

`bell()` — a perfect fifth, long decay — fires **only** at dark. Once a day at most. That scarcity is what makes it mean something.

**Gotcha:** an `AudioContext` created before a user gesture starts `suspended` and, on iOS, can stay wedged. Create on first `pointerdown`, always `resume()` before playing, always `close()` on `pagehide` (not `unload` — bfcache).

---

## 6. AMBIENT — the lamp itself

### 6.1 The light field (one element, compositor-cheap)

```css
body::before {
  content: ""; position: fixed; inset: 0; z-index: -1; pointer-events: none;
  background: radial-gradient(var(--lamp-r) circle at 50% 26%,
      oklch(0.30 0.024 72) 0%, oklch(0.20 0.014 72) 42%, var(--bg) 100%);
  transition: background 900ms ease;
}
```

**Gotcha:** do **not** animate `--lamp-r` continuously — a gradient repaint every frame on a full-viewport fixed element is the single easiest way to melt a phone. It moves exactly twice: on load, and at dark.

### 6.2 Grain — generated once, never per-frame

```js
function grainURI(n = 128){
  const c = Object.assign(document.createElement('canvas'), {width:n, height:n});
  const x = c.getContext('2d'), d = x.createImageData(n, n);
  for (let i = 0; i < d.data.length; i += 4){
    const v = 128 + (Math.random() * 22 - 11);
    d.data[i] = d.data[i+1] = d.data[i+2] = v; d.data[i+3] = 9;
  }
  x.putImageData(d, 0, 0);
  return c.toDataURL('image/png');    // ~4KB, inline, zero network
}
document.documentElement.style.setProperty('--grain', `url(${grainURI()})`);
```

**Why here:** A pure gradient on OLED shows banding, which reads as cheap. 128×128 tiled grain at 3.5% alpha kills the banding and adds the paper-under-lamp tooth that carries his farm identity **without** the skeuomorphic cream background.

**Gotcha:** the classic mistake is SVG `feTurbulence` as a CSS background — it re-rasterizes on every resize and is brutal on mobile. Generate once to a data URI. Also disables cleanly: skip it entirely if `navigator.deviceMemory < 4`.

### 6.3 The clock, carried as a meditation

Doctrine `the-clock`: *notice it, return to the work, do not grip it.* Render it as **one hairline at the very bottom edge of the viewport**, its lit fraction = elapsed share of the runway. No number, no countdown, no color escalation. Present in peripheral vision, never addressable.

```css
.clock { position:fixed; inset:auto 0 0 0; block-size:1px; background:var(--faint); }
.clock::before { content:""; display:block; block-size:100%;
  inline-size: calc(var(--runway-pct) * 1%); background: var(--soon); }
```

That is the doctrine as a design decision, and it is the kind of thing no generic dashboard would ever arrive at.

---

## 7. MICRO-INTERACTIONS

### 7.1 `@starting-style` + `transition-behavior: allow-discrete` — entry animation with no JS

```css
.standing {
  transition: opacity 260ms, transform 260ms var(--ease-settle),
              display 260ms allow-discrete;
}
@starting-style { .standing { opacity: 0; transform: translateY(8px); } }
```

**Why here:** New standings arrive at any moment — a service drops, an agent finishes, an obligation crosses its 3-day line. They must appear *arriving*, not just be there. Zero JS, so it works identically whether the source is a poll, a push, or a voice command.

**Gotcha:** `@starting-style` only fires for elements entering the *rendered* tree. If you build a row detached and then append it, you get it. If you toggle `visibility`, you don't.

### 7.2 `sibling-index()` — stagger with no JS and no inline styles (Chromium, Firefox landing 2026)

```css
.standing { animation: rise 300ms var(--ease-settle) both;
            animation-delay: calc(sibling-index() * 32ms); }
@media (prefers-reduced-motion: reduce) { .standing { animation: none; } }
```

**Why here:** The lamp's first paint should feel like items settling onto a desk, in order of consequence. Doing this with JS means writing inline `style` on every row — which then fights `@scope` and breaks the view-transition snapshot. `sibling-index()` is the correct 2026 answer.

**Gotcha:** cap the total. `calc(min(sibling-index(), 8) * 32ms)` — a 24-item obligations list would otherwise take 768ms to finish arriving, which is worse than no stagger.

### 7.3 `popover` + anchor positioning — the ruling sheet

**Why here:** Some standings need context before he can rule (the agent's diff, the card's impact, three months of that obligation's history). That must never be a navigation. Top-layer popover, light-dismiss, anchored to the row.

```html
<button class="standing" popovertarget="d647" style="anchor-name:--a647">…</button>
<div id="d647" popover="auto" class="sheet" style="position-anchor:--a647">…</div>
```
```css
.sheet {
  position: absolute; position-area: block-end span-inline-end;
  position-try-fallbacks: flip-block, flip-inline;
  inline-size: min(92vw, 420px); max-block-size: 70dvh; overflow: auto;
  overscroll-behavior: contain;
}
```

**Gotcha:** anchor positioning is Chromium-solid but still uneven elsewhere in 2026. `position-try-fallbacks` handles edge collisions; also give the sheet a static `@supports not (position-area: block-end)` bottom-sheet layout. On the folded Fold outer screen (~340px), force the bottom-sheet variant regardless — anchored popovers on a 340px viewport are worse than a sheet.

### 7.4 `interpolate-size: allow-keywords` — expand-in-place without measuring

```css
:root { interpolate-size: allow-keywords; }
.standing__more { block-size: 0; overflow: clip; transition: block-size 300ms var(--ease-settle); }
.standing[aria-expanded="true"] .standing__more { block-size: auto; }
```

**Why here:** An agent's report ("I re-tagged 14 transactions — here they are") expands to variable height. This deletes the entire `scrollHeight` measuring dance and its layout thrash.

**Gotcha:** Chromium-only (129+). Fall back to `grid-template-rows: 0fr → 1fr`, which is Baseline and behaves nearly identically.

### 7.5 Thumb geometry — one-handed in a cab

```css
.lamp { padding-block-end: calc(env(safe-area-inset-bottom) + 96px); }
.standing { min-block-size: 64px; }              /* ≥ 56px real target, not 44 */
@media (pointer: coarse) and (min-height: 700px) {
  .lamp { display: flex; flex-direction: column-reverse; }  /* most urgent nearest thumb */
}
```

**The non-obvious call:** on a tall phone, the most consequential standing goes at the **bottom**, not the top. Reading order and reach order are different problems; in a truck, reach wins. Keep DOM order = consequence order (correct for screen readers, voice, and glasses) and reverse it visually with `column-reverse`.

---

## 8. THE FOLD 7 — the viewport change as a designed moment

### 8.1 Correct the assumption first

**The Viewport Segments API is the wrong tool for the Z Fold 7.** Segments exist to describe a *seam* (Surface Duo–style). The Fold 7's inner display is continuous, so it reports **one** segment in both postures. Building the fold response on `env(viewport-segment-*)` will silently never fire on his actual device.

The two signals that do work:

```js
// 1. Device Posture API — 'folded' | 'continuous'
const dp = navigator.devicePosture;
dp?.addEventListener('change', () => onPosture(dp.type));

// 2. The reliable one: the viewport itself changes.
const mq = matchMedia('(min-width: 600px)');
mq.addEventListener('change', e => onPosture(e.matches ? 'continuous' : 'folded'));
```

Keep `@media (horizontal-viewport-segments: 2)` in the sheet anyway — it costs nothing and correctly handles seamed foldables — but never depend on it.

### 8.2 The unfold is the one transition worth spending a full second on

Wrong response: reflow into two columns. Right response: **the desk lamp reveals the desk.** Folded = the lamp only. Unfolded = the lamp stays exactly where it is, and the book unfolds *beside* it, already scrolled to today.

```js
let last = mq.matches;
mq.addEventListener('change', async e => {
  if (e.matches === last) return; last = e.matches;
  const go = () => document.documentElement.dataset.posture = e.matches ? 'open' : 'folded';
  if (document.startViewTransition && !matchMedia('(prefers-reduced-motion: reduce)').matches)
    document.startViewTransition({ update: go, types:['unfold'] });
  else go();
});
```

```css
html[data-posture="open"] .shell {
  display: grid; grid-template-columns: minmax(360px, 34%) 1fr; gap: 28px;
}
html:active-view-transition-type(unfold) ::view-transition-group(book) {
  animation-duration: 640ms; animation-timing-function: var(--ease-settle);
}
.lamp { view-transition-name: lamp; }   /* stays put — the anchor of the whole gesture */
.book { view-transition-name: book; }   /* swings out from behind it */
```

The lamp not moving is the whole trick. Everything else arrives around a fixed point, so the device opening feels like *more desk*, not like a different app.

### 8.3 Desktop is a different instrument, not a wider phone

Same `[data-posture="open"]` grid, plus three things a phone can't have and shouldn't fake:

- **Keyboard as the primary settle.** `j`/`k` to move, `f` held for 420ms to latch — the identical two-phase mechanism, identical rail, identical refusal. Superhuman-grade, and it means the hero interaction is one code path across all three form factors.
- **The book stays open.** No disclosure at all; a wide viewport has the room, and every disclosure is a decision.
- **A month column at full height** — 31 days vertical, one row per day, earnings + obligations on one line. This is the Bloomberg register, and it is genuinely useless on a phone. Build it only here.

---

## 9. BUILDING FOR THE FUTURE — absorbing capability as content

### 9.1 Voice in — on-device, which is the only kind that satisfies "no network"

Chrome 139+ shipped local Web Speech. Audio never leaves the device — which is the *only* acceptable answer for a surface holding recovery inventory and finances.

```js
async function voiceReady(){
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR?.available) return false;
  const s = await SR.available({ langs:['en-US'], processLocally:true });
  if (s === 'unavailable') return false;
  if (s !== 'available') await SR.install({ langs:['en-US'], processLocally:true });
  return true;
}
function listen(onFinal){
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const r = new SR();
  r.processLocally = true; r.lang = 'en-US'; r.continuous = false; r.interimResults = true;
  r.onresult = e => { const l = e.results[e.results.length-1];
                      if (l.isFinal) onFinal(l[0].transcript); };
  r.start();
  return () => r.abort();                      // ← always return the teardown
}
```

**Why it needs no new UI:** "settle truck insurance" resolves against the standings already in the DOM and runs the *same* `Latch.seat()`. Voice is an alternate actuator on the existing mechanism, not a mode. `read-his-input` doctrine — he talks rather than types — makes this the highest-value future input, and it fits under the lamp with zero navigation.

**Gotcha:** language packs are ~60MB and install asynchronously; `install()` can hang in non-Chrome Chromium builds. Never block first paint on it. Gate the mic affordance on `voiceReady()` resolving true.

### 9.2 Voice out — local voices only

```js
const localVoice = () => speechSynthesis.getVoices()
  .find(v => v.localService && v.lang.startsWith('en'));
```

Filtering on `localService` is what keeps the strict-offline promise; several platform voices are cloud-backed and will silently fail or leak text off-device. Speak **only** the standings and the dark line — never the doctrine. His creed says the system keeps the record, it does not do the surrender.

### 9.3 Offline & staleness — never a spinner, never a fabricated zero

```js
const CACHE = 'almanac.state.v1';                 // ← namespaced, see §10.6
async function load(){
  const cached = JSON.parse(localStorage.getItem(CACHE) || 'null');
  if (cached) paint(cached.data, { source:'cache', at: cached.at });   // instant, honest
  try {
    const d = await fetchJSON('/api/all');
    localStorage.setItem(CACHE, JSON.stringify({ data:d, at: Date.now() }));
    paint(d, { source:'live', at: Date.now() });
  } catch (e) {
    if (!cached) paintUnknown(e);                 // §3.3 hatching — NOT zeros
    else markAged(cached.at, e);
  }
}
function markAged(at){
  const m = Math.round((Date.now() - at) / 60000);
  const rtf = new Intl.RelativeTimeFormat('en', { numeric:'auto' });
  document.documentElement.dataset.aged = '1';
  document.querySelector('.age').textContent =
    m < 60 ? rtf.format(-m,'minute') : rtf.format(-Math.round(m/60),'hour');
}
```

```css
html[data-aged] .book { filter: saturate(.55); }   /* visibly not-now, still readable */
html[data-aged] .age  { color: var(--soon); font: var(--cap)/1 var(--fig);
                        letter-spacing:.14em; text-transform:uppercase; }
html[data-aged] .standing { pointer-events: none; opacity: .58; }  /* can't settle blind */
```

**The rule that follows from doctrine:** if the spine is unreachable, **standings are not settleable**. Greying them out is honest; letting him latch one that will never commit is the instrument pretending it can act. And `filter: saturate()` degrades the *whole book* uniformly, which is a single, unmistakable, un-missable signal.

### 9.4 Agents as first-class standings

An agent-produced standing is the same object with two extra fields:

```json
{ "id":"agt-9f2", "kind":"ruling", "by":"nut-reconciler",
  "claim":"3 subscriptions on the 8th card are not in the nut ($47.97/mo)",
  "proposed":"add to fixed monthly", "confidence":null,
  "evidence":[{"txn":8814},{"txn":8907}] }
```

- Renders identically. Same row, same rail, same latch.
- The proposal fills the row's secondary line. Latching **accepts**; the sheet (§7.3) holds the evidence and an "amend" path.
- `confidence: null` renders as §3.3 unknown — **never** as a fabricated percentage. If the agent doesn't know how sure it is, the surface says so.

**This is what the whole architecture is for.** A man adjudicating 30 agent rulings a day needs exactly one motion, repeated, with a real refusal — not thirty screens. The two-phase latch scales to that; a confirm dialog does not.

### 9.5 Glasses / ambient projection — free, if the DOM is right

`?view=glance` renders **only the top standing**, at `--fig-hero`, on `--bg`, with no chrome. No second codebase — it's a media/param branch over the same markup because the object model is domain-blind. That is the payoff for solving it structurally.

```css
html[data-view="glance"] .book,
html[data-view="glance"] .standing:not(:first-child) { display: none; }
```

---

## 10. PERFORMANCE & SAFETY

### 10.1 Paint budget for a Galaxy S25 / Fold 7 on weak cellular

| Rule | Number | Why |
|---|---|---|
| Compositor-only during any gesture | `transform`, `opacity` only | The latch rail must never miss a frame under his thumb |
| `backdrop-filter` instances | **≤ 1**, never on a scrolling surface | Chromium struggles with stacked backdrop-filters + mask + `overflow:hidden` |
| Full-viewport gradient repaints | 2 per session (load, dark) | A per-frame fixed gradient repaint is the #1 mobile melter |
| Concurrent rAF loops | **1**, ever | One scheduler, subscribers pattern |
| `will-change` | applied on `pointerdown`, removed on settle/refuse | Permanent `will-change` = permanent layer = permanent memory |
| DOM nodes under the lamp | ≤ 40 | 24 obligations + board + watch; beyond that, virtualize by consequence |

### 10.2 `prefers-reduced-motion` — and the point that silence survives it

```js
const RM = matchMedia('(prefers-reduced-motion: reduce)');
let reduce = RM.matches;
RM.addEventListener('change', e => { reduce = e.matches; retimeAll(); });  // live, not load-time
```

The doctrine of the reduced-motion pass on **this** surface:

- **Kept at full value:** the 620ms held beat before dark, all haptics, all three sounds, the two-phase latch (durations compress to 260ms, structure unchanged), the refusal's `--ease-refuse` snap-back compressed to a 90ms opacity step.
- **Removed:** stagger, grain fade-in, the `breathe` hairline (becomes static at 0.5 opacity), the lamp-radius collapse (becomes a 200ms cross-fade).

**A pause is not motion.** The single most important beat in the whole product — the silence before the lamp goes out — is fully available to a reduced-motion user, and that is the correct reading of the spec, not a loophole.

### 10.3 One scheduler, zero leaks

```js
const Loop = (() => {
  const subs = new Set(); let raf = 0;
  const tick = t => { for (const f of subs) f(t); raf = subs.size ? requestAnimationFrame(tick) : 0; };
  const start = () => { if (!raf && subs.size && document.visibilityState === 'visible')
                          raf = requestAnimationFrame(tick); };
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { cancelAnimationFrame(raf); raf = 0; AC?.suspend(); }
    else { AC?.resume(); start(); }
  });
  addEventListener('pagehide', () => { cancelAnimationFrame(raf); subs.clear(); AC?.close(); AC = null; });
  return { add: f => (subs.add(f), start(), () => subs.delete(f)) };
})();
```

Every subscription returns its own unsubscribe. Every listener attached inside a component uses `{ signal: this.ac.signal }`. **A truck-cab PWA lives for days in the background** — a single leaked rAF is a dead battery by Thursday, and it will look like a hardware problem.

### 10.4 View-transition safety

- Always `await vt.finished` before further DOM writes; concurrent transitions on the same root abort each other and leave orphaned `::view-transition` pseudos.
- Wrap in `try/catch` — `vt.finished` rejects on abort (tab hidden, another transition starts), and an unhandled rejection here will look like a settle failure and trigger the refusal path. **A cancelled animation must never be reported as a failed write.**
- `document.startViewTransition` freezes the whole page. Prefer `Element.startViewTransition` (Chrome 147+) so the book stays scrollable while a standing settles.

### 10.5 Graceful degradation ladder

Every enhancement in this playbook is additive. The floor is: **a scrollable list of standings, each with a working hold-to-settle, honest figures, and a real refusal.** That works with `@property`, `@function`, `text-box-trim`, view transitions, anchor positioning, `interpolate-size`, `sibling-index`, and on-device speech **all** absent.

Feature-detect where a missing feature would break *layout*, not where it merely removes polish:

```js
const HAS = {
  vt:   !!document.startViewTransition,
  vtEl: !!Element.prototype.startViewTransition,
  prop: !!CSS.registerProperty,
  anch: CSS.supports('position-area: block-end'),
};
document.documentElement.dataset.caps = Object.entries(HAS)
  .filter(([,v]) => v).map(([k]) => k).join(' ');
```

### 10.6 ⚠️ Not breaking sibling surfaces — the real risk, and it isn't CSS

All of his PWAs live on **one origin**: `bmhsolutions3711.github.io`. Storage is origin-scoped, not path-scoped. Three hard rules:

```js
// 1. Service worker scope MUST be explicit and path-limited.
navigator.serviceWorker.register('sw.js', { scope: '/almanac/' });
```
```js
// 2. In sw.js — never handle a request outside your own path.
//    A greedy fetch handler here can serve Almanac's shell to /companion/ or /now-brief/.
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (u.origin !== location.origin || !u.pathname.startsWith('/almanac/')) return;  // ← bail
  e.respondWith(/* … */);
});
```
```js
// 3. Namespace EVERY storage key. Dot-prefix, no exceptions.
//    almanac.api  almanac.token  almanac.state.v1  almanac.mute  almanac.installed
```

The current shell already does key-prefixing (`almanac_api`, `almanac_token`) — that instinct was right and is worth keeping. Standardize on `almanac.` with a dot and migrate the two existing keys in one pass, because `migration-discipline` says moved means moved.

Also: `caches.delete()` in a `#reset` handler must filter by prefix. An unfiltered `caches.keys()` sweep will silently uninstall every other PWA he owns.

---

## 11. WHAT MAKES THIS SPECIFICALLY HIS — the ten anchors

| Doctrine | Rendered as |
|---|---|
| **the gap** is the primitive (`DECISIONS.md`) | STANDINGS are gaps, not tasks. One object, all five roles, every domain. |
| **doctrine before money** (`entry.py:226`) | The lamp holds standings; the *first* thing below the terminator is the creed line, then the money. Order preserved verbatim. |
| **never invent a number** | §3.3 hatched `——`. `blind_days` as unlit month cells. Agent `confidence: null` renders unknown. |
| **one number, one home** | Each figure appears exactly once on the page. Duplicating a number across hero and ledger is a doctrine violation rendered in CSS. |
| **honest, not grim** | `--by-coverage()` compiles the threshold once. The dark line leads with the actionable read and states good news plainly. |
| **carry the clock, don't grip it** | §6.3: one hairline at the viewport's bottom edge. No number, no countdown, unaddressable. |
| **validate every dollar edit** | Two-phase latch: 420ms local arm, then a real network seat with an idempotency key. Nothing bulk, nothing optimistic. |
| **loud-fail** | The refusal *is* the loud fail, at the UI layer: the item stays, the rail runs backwards, the server's verbatim words print in the figure face, and it names what was **not** written. |
| **fewer decisions, not less information** | The hold replaces the confirm dialog. Refusal retry is the same gesture. No modes, no tabs, no settings. |
| **deletion pays** (`LEDGER.md`) | This design deletes: the tab bar, the light theme, the bespoke drawer, the serif figure face, the 8-step scale, four of eight motion keyframes, and the entire spinner/skeleton layer. **It is a net-negative build in code as well as in ports.** |

---

## 12. BUILD ORDER

1. **Prove the latch first.** Two-phase arm→seat, the real POST, the refusal, on one hardcoded row. If the refusal isn't beautiful, nothing else matters. Everything downstream is decoration on this.
2. **The dark.** Held beat → lamp out → the mark → the bell. Test it with `/api/standing` unreachable and confirm it **refuses to go dark**.
3. **Typography + color.** `text-box`, the four-step scale, the OKLCH ramp, the unknown token.
4. **The lamp field, the month strip, the gauge.**
5. **Fold posture + desktop instrument.**
6. **Voice, agents, glance view** — none of which require touching 1–5. That is the test of whether the container actually absorbs the future.

**The one thing to get right above all others:** the settle must feel like something is *physically leaving his desk*, and the refusal must feel like a latch that failed to catch. Everything else on this page is in service of those two seconds.

---

**Sources:**
[FRONTIER/26 — State of the Web Platform, July 2026](https://jovial-kayak-tysa.here.now/) · [What's new in web UI — Google I/O 2026](https://developer.chrome.com/blog/new-in-web-ui-io26?hl=en) · [Element-scoped view transitions (Chrome 147)](https://developer.chrome.com/blog/element-scoped-view-transitions) · [What's new in view transitions](https://developer.chrome.com/blog/view-transitions-in-2025) · [MDN — view-transition-name](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/view-transition-name) · [MDN — text-box-trim](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-box-trim) · [caniuse — css-text-box-trim](https://caniuse.com/css-text-box-trim) · [MDN — sibling-index()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/sibling-index) · [Smashing — Mathematical layouts with sibling-index()](https://www.smashingmagazine.com/2026/05/mathematical-layouts-sibling-index-sibling-count/) · [MDN — interpolate-size](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/interpolate-size) · [Chrome — Animate to height:auto](https://developer.chrome.com/docs/css-ui/animate-to-height-auto) · [Chrome 139 beta — @function](https://developer.chrome.com/blog/chrome-139-beta?hl=en) · [una.im — 5 useful CSS functions with @function](https://una.im/5-css-functions/) · [MDN — SpeechRecognition.available()](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/available_static) · [MDN — SpeechRecognition.install()](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/install_static) · [W3C — On-device speech recognition explainer](https://github.com/WebAudio/web-speech-api/blob/main/explainers/on-device-speech-recognition.md) · [Chrome — Foldable APIs origin trial](https://developer.chrome.com/blog/foldable-apis-ot) · [Android viewport sizes 2026 — foldables](https://screensizechecker.com/devices/android-viewport-sizes) · [Vibration API — support & patterns](https://www.testmuai.com/learning-hub/vibration-api-browser-support/) · [Josh Comeau — backdrop-filter](https://www.joshwcomeau.com/css/backdrop-filter/) · [Frontend Masters — View transition list reordering](https://frontendmasters.com/blog/view-transition-list-reordering-with-a-kick-flip/) · [web.dev — Same-document view transitions are Baseline](https://web.dev/blog/same-document-view-transitions-are-now-baseline-newly-available)