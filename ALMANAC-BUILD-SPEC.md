# ARC
## The Almanac build spec — final art direction

---

# 1 · THE CALL

## 1.1 Chosen direction

**CONCEPT B — ARC — is the spine.** A and C are harvested for parts. Codename for the build: `arc`. All custom properties `--alm-*`, all ids `#alm-*`.

## 1.2 The governing metaphor, one sentence

> **Almanac is the sun table of his own day: the light comes up carrying only the distances still open between what he said and what is actually true, it drops a notch every time his hand closes one, and it sets when he closes the book on the last one.**

## 1.3 Why this spine and not the other two

**Against C (LIVE / the WebGL weather field).** The sky is the most beautiful idea in the pack and it fails his own acceptance test. It is a *second, unauditable copy* of facts he can already read, on a surface whose doctrine is `keeps-the-record` — *"it has your back by refusing to tell you the number you want to hear."* A feeling-channel nobody can verify is the one thing this man cannot check, and he built Almanac specifically because seventeen surfaces asked him to trust numbers he could not check. It is also the largest failure and battery surface in the file — a shader loop in a PWA that lives for days in a truck's app switcher — for a payoff that B's two-layer opacity crossfade delivers at essentially zero cost. **C's spine is cut. Four of its ideas are grafted and they are excellent.**

**Against A (INSTRUMENT / the dark cockpit).** Doctrinally the closest runner-up: the dark-cockpit principle is the single best precedent for "the reward for competence is less light," and A's press-to-test is the best *single interaction* invented across all three. But the cockpit is a **state**, not a **journey** — it has no ending, only a condition, and the brief demands that the last settle "land like something earned." A panel that dims is a condition changing. A day that ends is an event. And aviation is borrowed identity; the almanac is *his*, named for the farm, humble not grandiose (`DECISIONS.md`). **A's spine is cut. Five of its ideas are grafted, including the best one.**

**For B.** The almanac's most-consulted page for three hundred years is the sun table. He named the product after the book; the surface prints exactly one sun table and it is his own day. That gives, for free, the four hardest things in the brief:

| Brief requirement | ARC's structural answer |
|---|---|
| Earned emptiness that can never read as a failed load | The sun going down is an **event that was witnessed**, not an absence |
| No "personal section" anywhere, five roles on one plane | A **distance** does not know which role it belongs to — there is nowhere to put a personal section |
| New capability as content, never navigation | Two places only: the **arc** (needs his hand) and the **book** (read-only). There is no third place, so there is never a fifth tab |
| The daily session loop | **The last standing of every day is CLOSE THE BOOK** — the session close is not a mode, it is the final gap |

That last row is the strongest single idea in the pack. It makes the session loop structural instead of a feature, it makes the last settle a **different object** rather than a bigger animation, and it puts a recovery practice — the nightly inventory — into the mechanism instead of bolting it on.

## 1.4 The 2-second feeling

> *Before I read a word, the room tells me how much of my day is left — and it is lower than it was this morning, because I put it there.*

## 1.5 The graft table — what came from where, and why

| Grafted | From | Why it survives |
|---|---|---|
| **THE NIGHT COUNT** (press-and-hold the dark; the day's settled standings return, then go out one at a time) | **A** — press-to-test | The best invention in the pack. Verification instead of trust, for a man whose monitors once read green for hours behind a dead bot. Re-skinned into ARC's own idiom: after sundown you can see the stars, and every star is one thing he closed today. |
| **Declared vs actual as one visual grammar** (the mark and the fill) | **A** — cyan bug / white tape | Renders his ratified core primitive directly. Recolored: the declared marker is **his own almanac red rule**, not aviation cyan — cyan is cold, fights the warm dark, and is borrowed. |
| **No green, anywhere. The watch reports age-of-last-proof.** | **A** | Receipted by `watch.py`'s own docstring. Green lied to him. Also removes a hue from the palette, which is a deletion. |
| **The flag** (barber-pole block for unknown at instrument scale) | **A** | Legible at arm's length through a windshield in a way em-dashes are not. Scoped: flags for blocks, dashes for prose (§2.6). |
| **The ambient dimmer** (`--alm-lum` keyed to local hour) | **A** | Free, physically motivated, and it makes the surface feel alive without animating a pixel. Kept strictly separate from `--alm-sun` (§2.4). |
| **Unknown is the only achromatic token in the palette** | **C** | The sharpest single call about `no-fabrication` in the pack. Zero chroma can never be mistaken for a state. |
| **The delta-only entrance** (paint cache instantly, then animate *only what changed since he last looked*) | **C** | The entrance animation is literally the news. Resolves A's "no entrance ritual" correctly: no theater, but the delta may move, because a delta is information. |
| **Arrival as a visible event** (an agent finishing pushes the sun back *up* one notch) | **C** — the ripple | Honest and free: the day just got longer. A notification that costs zero UI. |
| **The three laws** (nothing readable sits on a moving pixel; the ambient never states a number; nothing moves unless he moved it or the truth moved) | **C** | Adopted verbatim as the motion constitution (§5.1). |
| **"The book will not close on an empty page"** refusal | **C** | An in-character refusal that teaches the mechanism. |

---

# 2 · THE VISUAL SYSTEM

## 2.1 What is discarded from the house language, with the receipt

| Discarded | Where it lives | Why it loses |
|---|---|---|
| `"Inter"` / `"JetBrains Mono"` first in every stack | `bik/design/tokens.css:14-19` | Named, never loaded, **unloadable** on a zero-request offline origin. `grep -rn "@font-face" design/` returns zero hits. On his Fold 7 and S25 the entire house type identity resolves to Roboto pretending to be a decision. |
| The 1.125 minor third, 8 steps | `tokens.css:22-30` | An off-the-shelf ratio with no relationship to the content. Eight sizes that close together read as noise. A 737 PFD and a Bloomberg terminal both use about three. |
| Gold-on-charcoal + `--glow-primary` | `themes/bmh.css:30-47` | 2019 dark-dashboard vernacular; the glow carries no semantic. He already rejected it for this surface by writing paper-and-ink instead. |
| The cream light theme `--paper:#F7F3EA` | `almanac-pwa/index.html:20` | Two first-class modes is two designs, two QA passes and two sets of contrast bugs for **one** user who reads it at 5am and in a cab at night. Dark-only is pre-authorized and removes the burden. Keep the warmth, kill the paper. |
| `--serif:"Iowan Old Style"` for figures | `index.html:23` | A book face is a *reading* face. Money is scanned and compared, never read. Also Apple-only — silently Georgia on his actual phone. |
| The 3-view tab bar + the `now/next/later/done` column strip | `index.html:170-200, 348` | **Seven navigation targets deleted.** Navigation-as-structure is the exact thing the brief forbids growing. |
| The bespoke `.drawer` + `.scrim` | `index.html:172` | 2026 has `popover` with top-layer, light-dismiss and `closedby`. Hand-rolled is now more code and worse behavior. |
| `.toast(j.error)` as the failure channel | `index.html:193-206` | A 2.6-second bottom toast for a failed money write is the precise opposite of the brief. |
| `ds-anim-pulse` infinite, `ds-shimmer` skeletons | `bik/design/motion.css` | A perpetual animation is a permanent attention tax on a surface whose purpose is returning attention. A skeleton is a shape of data that does not exist — a spinner with better manners. |
| `--shadow-weight-*` elevation | `tokens.css:67-70` | Material-era depth. Here depth is light falloff — physically motivated and free. |
| Green status dots | everywhere | See §2.3. |
| The second z-scale | `--z-*` vs the PWA's inline 40/50/60 | One scale, owned (§2.7). |
| A "days you went dark" streak strip | *my own idea, killed in review* | It is a streak. `DECISIONS.md` 2026-07-24 rules out *"streaks, XP, hours logged, percent complete — any metric a person can move without learning anything,"* with five dead tables as evidence. **The arc must never keep score of itself.** |

**Kept, argued on merit in 2026 — not because they were there:**

1. **The red rule.** His own comment: *"one accent — the red rule old almanacs used to mark the dates that mattered."* That is a semantically loaded single accent, exactly right for a page whose only job is what still matters today. Promoted from decoration to **the declared-value marker** (§2.3).
2. **`money(v) → "—"` for null.** That one line *is* `no-fabrication` in code. It becomes the `.unknown` token.
3. **`[hidden]{display:none!important}` at the top of the sheet, verbatim, with its comment.** Hard-won.
4. **`font-variant-numeric: tabular-nums`** on every figure — right instinct, now pushed much further.
5. **Doctrine rendered before money** (`entry.py:225-228`). Doctrinal, not visual. Untouched.
6. **`almanac_*` storage prefixing** — standardized to `almanac.` with a dot, both existing keys migrated in one pass (`migration-discipline`: moved means moved). Not style — a safety requirement (§7.5).

## 2.2 Palette — dark only

Authored in OKLCH at one hue family. sRGB hex ramps go muddy in the middle; an OKLCH lightness ramp at fixed hue is exactly what one warm light source at varying intensity looks like.

```css
:root{
  color-scheme: dark;

  /* GROUND — warm near-black. A barn at night, not a terminal.
     Never #000: OLED black-crush destroys the falloff this design runs on. */
  --alm-ground:   oklch(0.155 0.008 72);
  --alm-ground-2: oklch(0.190 0.008 72);   /* row press state only */

  /* INK RAMP — one token generates the whole page. */
  --alm-lit:      oklch(0.93 0.015 85);
  --alm-ink:      color-mix(in oklch, var(--alm-lit) 82%, var(--alm-ground));
  --alm-muted:    color-mix(in oklch, var(--alm-lit) 46%, var(--alm-ground));
  --alm-faint:    color-mix(in oklch, var(--alm-lit) 22%, var(--alm-ground));

  /* DECLARED — the almanac red rule. 1px ticks and rules ONLY. Never a fill,
     never a bar, never type. This is what HE said. */
  --alm-mark:     oklch(0.56 0.130 30);

  /* CONSEQUENCE — 2px left-edge bars and 11px caps ONLY. Never a rule. */
  --alm-short:    oklch(0.70 0.180 45);    /* uncovered · down · overdue */
  --alm-soon:     oklch(0.81 0.125 82);    /* inside three days */
  /* covered / clear has NO COLOR. It renders in --alm-lit with the word "clear". */

  /* UNKNOWN — the only achromatic token in the product. Zero chroma so it can
     never be read as a state. no-fabrication, made a color. */
  --alm-unknown:  oklch(0.52 0 0);

  /* AMBIENT — see 2.4. Two independent light systems, never conflated. */
  --alm-sun: 1;      /* fraction of the day still standing. HE moves this. */
  --alm-lum: 1;      /* ink brightness keyed to wall-clock hour. HIS EYES. */
}
```

**Approximate sRGB fallbacks** for the `@supports not (color: oklch(0 0 0))` ladder — *these were eyeballed, not computed. The implementer must generate exact values with a converter and commit them before ship; do not trust the numbers below to two digits.*

`--alm-ground ≈ #16130F` · `--alm-ground-2 ≈ #1E1A16` · `--alm-lit ≈ #F0E9DE` · `--alm-ink ≈ #C9C2B8` · `--alm-muted ≈ #7C766D` · `--alm-faint ≈ #453F39` · `--alm-mark ≈ #A44B39` · `--alm-short ≈ #E86F35` · `--alm-soon ≈ #E3AA53` · `--alm-unknown = #6E6E6E`

## 2.3 The two color laws

**LAW 1 — There is no green in this product.** Green means OK, and green is exactly what lied to him for hours while a duplicate Discord bot doubled every message behind a live port (`watch.py:5-11`). **The absence of alarm is a low sun and a quiet page, not a green light.** Money that clears renders in `--alm-lit` with the word *clear*. White is the value; a color would be a judgment, and the judgment is his.

**LAW 2 — Geometry separates declared from alarm.** `--alm-mark` (brick) and `--alm-short` (signal orange) are both warm, so they are never allowed to occupy the same shape:

- **DECLARED** (`--alm-mark`) appears **only** as a 1px tick or hairline *inside a tape*. What he committed to: the nut, the floor rate, Enough, the learning objective, three-in-now.
- **CONSEQUENCE** (`--alm-short` / `--alm-soon`) appears **only** as a 2px bar on the *left edge of a standing row*, and in 11px caps.
- **ACTUAL** is always a lit fill in `--alm-ink`/`--alm-lit`.

So the whole page reads in one grammar: **a red tick is what he said, a lit fill is what is true, and the distance between them is the product.** An agent's proposal is a tick he has not set yet — which is why accepting an agent ruling needs no new component.

## 2.4 The two light systems — kept separate on purpose

They must never be conflated, and the reason must be in a code comment.

| | `--alm-sun` | `--alm-lum` |
|---|---|---|
| Means | how much of his day is still standing | how bright his eyes need it |
| Driven by | **only** his settles (and new standings arriving) | wall-clock hour |
| Range | `1 → 0.18` across working standings; reaches `0` **only** when the book closes | `0.78` at 04:00–06:00 · `1.00` at 09:00–18:00 · `0.70` after 21:00, interpolated |
| Recomputed | on settle, on arrival | at boot and on `visibilitychange` — **never on a timer** |
| Applied to | the two background layers + every raking highlight | a single `color-mix` multiplier over `--alm-ink` and `--alm-muted` |

After 21:00, `--alm-short` desaturates 12%. That is why cockpits dim red at night, and it costs one `color-mix`.

## 2.5 Background treatment — the sun, at zero repaint cost

Animating a full-viewport gradient's *stops* repaints every frame and is the single easiest way to melt a phone. Two pre-rasterized layers crossfading on `opacity` is compositor-only.

```css
@property --alm-sun { syntax:"<number>"; inherits:true; initial-value:1; }

#alm-sky, #alm-dusk{
  position:fixed; inset:0; z-index:0; pointer-events:none;
  transition: opacity 900ms cubic-bezier(.4,0,.2,1);
}
#alm-sky {
  opacity: var(--alm-sun);
  background: radial-gradient(115vmin circle at 50% -10%,
      oklch(.33 .026 84) 0%, oklch(.21 .014 78) 46%, transparent 74%);
}
#alm-dusk{
  opacity: calc(1 - var(--alm-sun));
  background: radial-gradient(165vmin 90vmin ellipse at 50% 104%,
      oklch(.31 .062 46) 0%, oklch(.19 .020 52) 52%, transparent 72%);
}
```

**Depth is light, not shadow. There is no `box-shadow` on this page for elevation, ever.** Every edge is a 1px hairline; every surface carries one raking highlight on its top edge whose opacity tracks the sun:

```css
.alm-standing, .alm-strip{
  border-block-start: 1px solid
    color-mix(in oklch, var(--alm-lit) calc(var(--alm-sun) * 26%), transparent);
}
```

As the day goes down, **the page physically flattens.** That is the transformation, felt rather than shown.

**The one permitted glow, and it is a unit of measure, not a finish.** Light emission on the active latch edge only, present only during ARM and SEAT, removed on settle or refuse:

```css
.alm-standing[data-state="arming"] .alm-edge,
.alm-standing[data-state="seating"] .alm-edge{
  box-shadow: -1px 0 14px -3px color-mix(in oklch, var(--sev) 62%, transparent);
}
```

**Grain.** 128×128 noise generated once to a data URI at init (~4KB, zero network), tiled at 3.5% alpha. A pure gradient on OLED bands, and banding reads as cheap. This is the paper-under-lamp tooth that carries the farm identity **without** a skeuomorphic cream background. Never `feTurbulence` as a CSS background — it re-rasterizes on every resize. Skipped entirely when `navigator.deviceMemory < 4`.

## 2.6 The unknown tokens — two scales, one rule

```css
/* PROSE SCALE — inline, inside a sentence. */
.alm-unk{ color:var(--alm-unknown); font-family:var(--alm-fig); letter-spacing:.12em; }
.alm-unk::after{ content:"——"; }                    /* em-dashes. never "0", never "--" */
.alm-unk[data-through]{
  border-block-end:1px solid transparent;
  border-image: repeating-linear-gradient(90deg,
      var(--alm-unknown) 0 3px, transparent 3px 6px) 1;   /* hatched = not yet observed */
}

/* INSTRUMENT SCALE — a block, a cell, a whole panel. Legible at arm's length. */
.alm-flag{
  display:inline-block; padding:2px 7px 1px; border-radius:1px;
  font:600 var(--cap)/1 var(--alm-fig); letter-spacing:.14em;
  color: var(--alm-ground);
  background: repeating-linear-gradient(135deg,
      var(--alm-unknown) 0 5px, oklch(0.42 0 0) 5px 10px);
}
```

Renders as `NO DATA` / `THRU 22 JUL` / `NOT PROVED`. **A hatched underline never looks like data and a barber-pole tab never looks like a number.** That is the entire point. Applied to `blind_days`, unreconciled collections, `standing.unavailable{}`, and any agent figure with `confidence: null` — an agent that does not know how sure it is says so.

## 2.7 Type

System fonts only, and in 2026 that is not a limitation — Roboto Flex on his Samsungs is a real variable font. What separates amateur from instrument-grade now is the metrics properties, not the family.

```css
:root{
  --alm-fig:   ui-monospace,"Roboto Mono","SF Mono","DejaVu Sans Mono",monospace;
  --alm-ui:    system-ui, Roboto, -apple-system,"Segoe UI", sans-serif;
  --alm-prose: ui-serif, Georgia,"Noto Serif","Times New Roman", serif;

  --fig-hero: clamp(3rem, 17vw, 6.5rem);      /* the one number, arm's length */
  --fig-inst: clamp(1.35rem, 5.2vw, 1.8rem);  /* a settleable amount, a title  */
  --txt:      1.0625rem;                       /* prose — reading, narrative   */
  --cap:      0.6875rem;                       /* caps, .14em tracked, upper   */
}
```

**Four sizes.** The chasm between `--fig-hero` and `--fig-inst` is the hierarchy doing the work eight near-identical steps cannot.

**The rule that makes it read as designed rather than assembled: if it is a quantity, it is in `--alm-fig`. Forever. No exceptions, no second opinions.** That is `one-number-one-home` expressed as typography.

```css
.alm-figure{
  font: 700 var(--fig-hero)/1 var(--alm-fig);
  text-box: cap alphabetic;                       /* highest-leverage property here */
  font-variant-numeric: tabular-nums slashed-zero;
  letter-spacing: -0.022em;
}
@supports not (text-box: cap alphabetic){ .alm-figure{ margin-block:-.14em -.09em } }
```

Without `text-box-trim` the hero figure floats in a slab of invisible leading that no margin tuning fixes and will never optically align with the rule beneath it. That is the difference between "a big number" and an instrument reading. **Never combine with a `line-height` other than `1`.**

`slashed-zero` requires the `zero` feature in the resolved face. Request it; **probe with `document.fonts.check()` at boot and never fake it with a pseudo-element.** The house stack already names two fonts it cannot load; we do not repeat that.

`.alm-narrative{ text-wrap: pretty; hyphens: auto; }` — Georgia on Android is a feature, not a fallback: it was drawn for small sizes on low-resolution screens with a tight measure, which is exactly a 340px folded Fold outer panel.

## 2.8 Spacing, radius, z

**Six spacing steps, not eleven.** Fewer steps is fewer decisions: `--s1:4px --s2:8px --s3:12px --s4:20px --s5:32px --s6:56px`.

**Radius: 2px, everywhere, or 0.** Argued, not inherited: this is printed matter under raking light. 3px in the baseline was closer to right than the house's 10px, but neither was argued. 2px reads as a cut edge rather than a soft chip at the ~2.6× DPR of his phones.

**One z-scale, owned:** `--z-page:0 --z-sticky:10 --z-sheet:40 --z-mark:60`. The `popover` top layer and the view-transition pseudo-layer sit above all of it by the platform's own rules; nothing else competes on this origin.

---

# 3 · THE HERO — THE SETTLE

> **The core idea, and the thing that does not exist anywhere else on the web: the progress of the latch *is* the progress of the write. The bar is not a countdown. It is the transaction. And every settle drops the sun.**

Every hold-to-confirm shipped today is a fake timer that runs, completes, promises success, and *then* fires a request that may fail. That is an instrument pretending it acted. `validate-money` and `loud-fail` both forbid it.

## 3.1 The object

**STANDING.** His own API word, kept on merit: it already means both *an open item* and *where you stand*, and it is the rendered form of the primitive ratified 2026-07-24 — the gap between stated and actual.

| Arriving from | Renders as |
|---|---|
| $1,500 truck insurance, due in 3 days | `PAY · truck insurance · progressive` · `$1,500.00` |
| Card #647 needs a ruling | `RULE · #647 · nut reconciler` |
| `:8560` stopped answering | `DOWN · mileage-insights · last proved 41m ago` |
| A creed unconfirmed | `CONFIRM · the-clock · v2, rewritten from your objection` |
| An agent finished work | `RULE · nut-reconciler · 3 subs off-nut, +$47.97/mo` |
| A nephew's birthday | `MARK · Eli turns 9 Thursday` |
| The end of the working day | `CLOSE · the book · entry 27` |

**One row shape, forever.** Kicker in tracked mono caps (the annunciator caption — the one idiom worth keeping from the old shell), title in `--alm-ui`, figure in `--alm-fig` tabular hard-right, a hairline under, a 2px consequence bar on the left edge. **No cards, no chips, no badges** — a card/chip/badge taxonomy gives each domain its own silhouette and actively destroys the one thing the object model exists for.

Sorted by **consequence** — what changes if this is still standing tonight — never by domain, never by time filed.

**Of the ~24 recurring obligations, only those inside their 3-day window are standings.** The rest live below the terminator in the obligations tape. That is what keeps the arc under 40 DOM nodes and what makes "what needs my hand" mean something.

## 3.2 The gesture, and why it is press-and-hold

- **Un-mis-fireable.** It writes to a finance DB through a proxy. `validate-money`.
- **One-handed, low precision.** A swipe in a moving truck is a coin flip. Press *anywhere* on a 64px row is not.
- **The hold replaces the confirm dialog** — a decision *removed*, not restyled. That is the acceptance test, passed.
- **It is physical.** Pressure builds, a detent catches, the thing is gone — identical whether it is $1,500 of truck insurance, a card ruling, a downed service, or an agent's proposal.

## 3.3 The state machine

```
pointerdown ── ARM ─────────────▶ full ── SEAT ──▶ CAUGHT  → row leaves, sun drops
             (local, 420ms)              (network)  └ REFUSED → springs back, stays standing
             release early = ABORT. no request was ever sent.
```

**Phase 1 — ARM (420ms, local, free).** A 2px rail fills the row's full width, left to right, under his thumb, on `--ease-settle`. Haptic `[8]` on contact, a firmer `[14]` at ~85% — a mechanical detent felt before it is seen. The left edge lights (§2.5, the one glow). Releasing early reverses everything in 180ms with **zero consequence** — which is precisely what makes it safe to fire the POST at the *end* rather than the beginning. Aborting an in-flight financial write is **not** safe; the server may already have committed.

**Phase 2 — SEAT (network, honest).** The rail **holds at full under visible tension** — 1.5% over-travel breathing at ~0.8 Hz — for exactly as long as the network actually takes. Kicker swaps to `WRITING`. He can *see latency*. Nothing is faked, nothing is optimistic.

## 3.4 The implementation

```js
const HAPTIC = { arm:[8], detent:[14], seat:[14,26,14], refuse:[12,70,12] };
const buzz = p => { try{ navigator.vibrate?.(p); }catch{} };

class Latch{
  constructor(row){
    this.row = row;
    this.rail = row.querySelector('.alm-rail');
    this.ac = new AbortController();               // listener scope, torn down with the row
    const o = { signal:this.ac.signal };
    row.addEventListener('pointerdown', e => this.down(e), o);
    for (const t of ['pointerup','pointercancel','pointerleave'])
      row.addEventListener(t, () => this.up(), o);
  }

  down(e){
    if (this.row.dataset.state === 'seating') return;
    if (State.source !== 'live') return;           // cannot settle blind. §7.4
    this.row.setPointerCapture(e.pointerId);
    this.row.dataset.state = 'arming';
    this.rail.style.willChange = 'transform';
    buzz(HAPTIC.arm);
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.detent = setTimeout(() => buzz(HAPTIC.detent), reduce ? 220 : 357);  // 85%
    this.armed = this.rail.animate(
      { transform:['scaleX(0)','scaleX(1)'] },
      { duration: reduce ? 260 : 420, easing:'var(--ease-settle)', fill:'forwards' });
    this.armed.finished.then(() => this.seat()).catch(()=>{});   // catch = cancelled
  }

  up(){
    if (this.row.dataset.state !== 'arming') return;   // already seating: let it finish
    clearTimeout(this.detent);
    this.armed?.cancel();
    this.rail.style.willChange = '';
    this.row.dataset.state = '';
  }

  async seat(){
    clearTimeout(this.detent);
    this.row.dataset.state = 'seating';               // rail holds + breathes
    const net = new AbortController();
    const kill = setTimeout(() => net.abort('timeout'), 9000);
    try{
      const r = await fetch(`/api/standing/${this.row.dataset.id}/settle`, {
        method:'POST', signal:net.signal,
        headers:{ 'Content-Type':'application/json',
                  'Idempotency-Key': this.row.dataset.key },
        body: JSON.stringify({ at:new Date().toISOString() })
      });
      if (!r.ok) throw new Error(`${r.status} ${(await r.text()).slice(0,160)}`);
      const out = await r.json();
      clearTimeout(kill);
      await this.caught(out);                          // ← ONLY NOW
    }catch(err){
      clearTimeout(kill);
      this.refuse(err);
    }finally{
      this.rail.style.willChange = '';
    }
  }
}
```

`Idempotency-Key` is minted once per row at render time (`crypto.randomUUID()`), stored on the element, and **reused on retry** — so a timeout that actually committed cannot double-pay.

## 3.5 CAUGHT — drawn only after the write returned

1. Haptic `[14,26,14]`. `tine()` — one 880 Hz sine, 55ms. The sound of a latch seating, not a notification.
2. The row **leaves to the right**, blurring 1.5px over 220ms. Survivors **physically move up** via `view-transition-name: match-element` — sliding up is the feeling of one fewer thing on his plate; a cross-fade is not.
3. **The sun drops.** `--alm-sun` steps down over 900ms. Every raking highlight on the page shortens by the same fraction. **This is the aggregate progress indicator and it is ambient — no widget, no percentage, no number to read.**
4. The one figure it changed **rolls, once**, on `--ease-settle` — because *he* moved it. The roll is a receipt. Figures never count up on load; a count-up is theater that dramatizes a number he did not cause.

```js
async caught(out){
  buzz(HAPTIC.seat); tine();
  const arc = document.getElementById('alm-arc');
  const go  = () => { this.destroy(); paintBook(out); dropSun(); };
  try{
    if (arc.startViewTransition)                       // Chrome 147+, element-scoped
      await arc.startViewTransition({ update:go, types:['settle'] }).finished;
    else if (document.startViewTransition)
      await document.startViewTransition(go).finished;
    else go();                                          // third tier is MANDATORY
  }catch{ /* a cancelled transition is NEVER a failed write */ }
  if (!document.querySelector('.alm-standing')) await offerClose();
}
destroy(){ this.ac.abort(); this.row.remove(); }
```

```css
::view-transition-group(*):only-child{ animation-duration:340ms }
html:active-view-transition-type(settle)::view-transition-old(*){
  animation:220ms var(--ease-settle) both alm-leave;
}
@keyframes alm-leave{ to{ opacity:0; transform:translateX(14px) scale(.985); filter:blur(1.5px) } }
```

## 3.6 REFUSED — built with more care than the success

He will see this rarely, and it will buy more trust than any animation.

```
│ ▍ PAY   truck insurance · progressive              still standing
│         $1,500.00
│ ◀──────────────────────────────────  rail runs backwards, --ease-refuse
│   the spine refused: 503 finance store unavailable — nothing was written
```

**Five rules. This is the trust purchase.**

1. **The row does not move.** It is still standing. Its absence would be the lie.
2. **The sun does not drop.** Nothing in the world changed, so nothing in the light changes. *This is the tell he will learn to read from three feet away.*
3. **The rail runs backwards** on `--ease-refuse` — one negative overshoot, 520ms. Not a shake, not a red flash: the mechanism visibly **failing to catch**. It reads as a spring letting go.
4. **The reason is the server's own words, verbatim, in the figure face — and it always names what was NOT written.** `no-fabrication` governs error copy exactly as it governs money. *"Something went wrong"* is a fabricated number with letters.
5. **Retry is the identical gesture on the identical row.** No new button. No new decision.

```js
refuse(err){
  buzz(HAPTIC.refuse); thud();
  this.row.dataset.state = 'refused';
  this.rail.animate({ transform:['scaleX(1)','scaleX(0)'] },
    { duration:520, easing:'var(--ease-refuse)', fill:'forwards' });
  const why = this.row.querySelector('.alm-why');
  why.textContent = err.name === 'AbortError' || err === 'timeout'
    ? 'no answer from the spine in 9s — nothing was written'
    : `the spine refused: ${err.message} — nothing was written`;
  why.hidden = false;
}
```

```css
.alm-standing[data-state="refused"]{ --sev: var(--alm-short); }
.alm-standing[data-state="refused"] .alm-edge{
  background: repeating-linear-gradient(45deg,
      var(--alm-short) 0 4px, oklch(0.42 0.08 45) 4px 8px);   /* 2px bar ONLY */
}
.alm-why{ font:400 var(--cap)/1.5 var(--alm-fig); color:var(--alm-short);
          letter-spacing:.02em; padding-block-start:6px;
          transition: opacity 180ms, display 180ms allow-discrete; }
@starting-style{ .alm-why{ opacity:0 } }
```

The hatch goes on the 2px bar only. **Never make the content unreadable to signal a state.**

## 3.7 THE LAST ONE — CLOSE THE BOOK, then SUNDOWN

> **The last standing of every day is always the same object, and it is: CLOSE THE BOOK.**

When the working standings are gone, one final row rises into the arc. Same shape, same rail, same latch, same refusal — **because it is the same object.**

```
│ ▍ CLOSE   the book                              entry 27 · 4h 20m
│           6 moves · 2 findings · 1 deleted
│   ───────────────────────────────────────────────────────────────
│   "Closed the nut reconciliation. Repointed the odometer sync into
│    Mileage Insights and backfilled 91,256 → 101,971, backup first.
│    Ledger paid: mileage-tracker destroyed."
```

The narrative is **composed from the logged moves and the real deltas** between the opening `standing` snapshot and now — the exact diff `entry.py::_changed_since()` already computes (`earned up $X (a → b)`, `spend now known through …`). It is prose in `--alm-prose` at `--txt`, because it is the one artifact on this page that is genuinely *read*: the next session opens on it cold. Tap to amend before settling. If nothing was logged it says so plainly — *"Nothing was logged. Two loads ran; earned up $1,780.00."* **Never invented.**

Latching it calls `entry.py close`. **The record is made without him typing it.**

**Its refusal, in character:**
> `the spine refused: the book will not close on an empty page — nothing was written`

**Why this is the right answer to "make the last one land like something earned."** Not a bigger animation. **A different object.** He is in recovery; the record-keeping is a practice, not an app feature. `keeps-the-record`: *"it supports a continuing, honest inventory so the real work can happen with true information — and it never stands in for it."* The surface **drafts the inventory and hands it to him to settle.** It never speaks the doctrine, never congratulates, never surrenders on his behalf.

### SUNDOWN — five beats

```js
async function sundown(){
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;

  // 1. THE HELD BEAT — 620ms of absolutely nothing. No motion, no sound, no fade.
  //    A PAUSE IS NOT MOTION, so this survives prefers-reduced-motion at full
  //    length. It is the single most important beat in the product.
  await new Promise(r => setTimeout(r, 620));

  // 2. THE LIGHT GOES DOWN, NOT OUT. --alm-sun → 0 over 1600ms (200ms if reduced).
  //    Two rasterised layers crossfading on opacity. Compositor only.
  root.dataset.dark = '1';
  root.style.setProperty('--alm-sun','0');

  // 3. Raking highlights extinguish top-first, bottom-last, in the order they
  //    would in life. sibling-index() * 40ms. Free, and removed under reduced motion.

  // 4. THE MARK — one line of set type fades up where the arc was.
  await new Promise(r => setTimeout(r, reduce ? 220 : 1600));
  document.getElementById('alm-mark').hidden = false;

  // 5. bell() — a perfect fifth, 1.6s decay. ONCE. Only ever here.
  bell();
}
```

**At rest:**

```
                            ————

              Nothing is standing. Entry 27 closed.
           Two loads booked, $1,780.00, both Thursday.

                    FRI 25 JUL · 21:14
                      HOLD TO COUNT
```

**Four independent proofs this can never read as a blank screen, a failed load, or an error — any one of which is sufficient:**

1. **It is typeset.** Real prose serif, optically centered, sitting on a hairline. Errors and failed loads are never set well. *This is the load-bearing one.*
2. **It was witnessed.** He watched the last row leave and the light fall. A failure state *arrives*; this one *happened*.
3. **It breathes.** A 34px hairline pulses on a 7-second cycle — unambiguous proof-of-life at a glance; static at 0.5 opacity under reduced motion.
4. **It says something true and specific**, never *"All done!"* It states the good news plainly (`tone`: *never omit a good one either*), gives no congratulation, and gets out of the way. The book is one scroll down. **Nothing asks him for anything.**

The timestamp is the moment he *finished* — a receipt, not a clock.

### The honesty gate — non-negotiable

```js
if (!document.querySelector('.alm-standing')
    && State.source === 'live'
    && State.settledThisSession) sundown();
```

If the arc is empty because `/api/standing` was unreachable, **that is not sundown — that is unknown**, and it renders §7.4's aged treatment with a `NO DATA` flag where the arc was. **The sun only goes down because he took it down.**

## 3.8 THE NIGHT COUNT — press to test, in the arc's own idiom

*Grafted from Concept A. This is the moment nobody else has built.*

**Press and hold anywhere on the dark for 800ms.** Desktop: `t`. Voice: *"count the day."*

- **At 800ms**, every standing he settled today **returns at once** as points of light in the field where the arc was — at 45% brightness, legends fully readable, in the order he settled them. Simultaneously, because that is what a lamp test is.
- Hold and they stay. One line beneath, in `--cap`: `THE DAY · 6 SETTLED · 0 STANDING`.
- **Release** and they go out **one at a time, in the order he settled them**, 90ms apart. The last one leaves. Dark again. ~1.4 seconds, silent throughout.

**Why this lands for this man and no one else:**

- It is **verification instead of trust.** He built Almanac because seventeen surfaces asked him to believe numbers he could not check, and because a bot ran broken for hours behind a green light. This is the only interface he owns that can be **audited by its user in one gesture**.
- It is a **nightly inventory** — the day's moves, in order, then gone. A recovery practice rendered as a mechanism rather than bolted on as a feature.
- **It cannot flatter.** It can only ever show him his own moves. There is no number in it he did not cause. An instrument that structurally cannot say something nice about you is the auditor-and-friend problem solved in hardware.
- The darkness becomes **proven, not assumed.**

**Hard constraint, from `DECISIONS.md`:** the night count shows **today only**. No cumulative total, no streak, no "days you went dark," no comparison to yesterday, ever. Five prior scoring systems sit at zero rows because a score you can farm is a score you stop believing by day three. **The arc never keeps score of itself.**

## 3.9 The cleanup contract for the hero

Every one of these is a ship blocker:

- [ ] `Latch` owns one `AbortController`; every listener attached with `{signal}`; `destroy()` aborts it before `row.remove()`.
- [ ] `armed` WAAPI animation is `cancel()`ed on early release; `.finished` rejection is caught (a cancelled animation must never enter `seat()`).
- [ ] `will-change` set on `pointerdown`, cleared in `finally`. Never permanent.
- [ ] The 9s network abort timer is `clearTimeout`ed on **both** paths.
- [ ] `vt.finished` awaited inside `try/catch`. **A cancelled transition is never reported as a failed write.**
- [ ] `Idempotency-Key` minted once per row, reused on retry.
- [ ] `setPointerCapture` released implicitly by `pointerup`/`pointercancel`; row removal after capture is safe because listeners were signal-scoped.
- [ ] `AudioContext` created lazily on first `pointerdown`, `resume()` before every play, every node `disconnect()`ed in `onended`, `close()` on `pagehide` (**not** `unload` — bfcache).
- [ ] The 620ms sundown timer is stored and cleared on `pagehide`.

## 3.10 What the backend owes — new work, stated plainly

- **`GET /api/standing` must return a unified, consequence-ranked, itemized list of settleables.** Today `inventory.py:169-172` only `SUM`s loans, credit cards, fixed monthly and annuals — **no row-level obligation object exists.** This is the largest piece of new spine work and everything above depends on it.
- **`POST /api/standing/{id}/settle`** — one record, one human gesture, one write, idempotency-keyed, and permanently excluded from `autonomous.py:56-59`'s unattended paths. `validate-money` does not merely permit the two-phase latch; it **requires** it.
- **`POST /api/entry/close`** — wraps `entry.py cmd_close`, accepts the amended narrative, refuses on an empty page.
- Each standing carries: `id, kind, kicker, title, sub, amount|null, due, severity, source, idem_key`, and for agent rulings additionally `claim, proposed, confidence|null, evidence[]`.

**A finding, surfaced by reading the files.** The nut appears as **$9,320.85** in the brief, **$9,321 / $9,798** in `README.md`, and **$9,310.44** in the memory index. Three documents, three nuts — precisely the disease Almanac exists to cure. The design's answer is structural: **the shell performs no money arithmetic and contains no nut number, ever**, and the reading always carries `fixed_as_built` *and* `fixed_run_rate` in one sentence, naming the open defect (#708). Honest, not grim — and it makes the drift impossible to look away from.

---

# 4 · COMPONENT BUILD NOTES — in first-impression order

There are exactly two places on this page. **Above the terminator: the arc** — only things needing his hand. **Below it: the book** — read-only. Future capability enters as a standing or as a strip. There is no third place.

### 4.1 THE ARC *(the only interactive region)*

`display:flex`. On tall touch viewports `flex-direction: column-reverse` so **the most consequential standing sits nearest the thumb** — DOM order stays consequence order for screen readers, voice and glasses. Reach order and reading order are different problems; in a truck, reach wins.

Arrival: `@starting-style` + `transition-behavior: allow-discrete`, staggered `calc(min(sibling-index(), 8) * 32ms)`. Zero JS, so a standing appears *arriving* identically whether its source is a poll, a push, a voice command or an agent. Capped at 8 so 24 rows do not take 768ms.

`@scope (#alm-arc) to (.alm-sheet)` so the standing component can be lifted into the glance view and the desktop instrument without leaking. One `@scope` block per component, never nested more than two deep — proximity beats specificity and that surprises people.

Rows needing context before he can rule (an agent's diff, three months of an obligation's history) open a top-layer `popover` anchored to the row, light-dismiss, `position-try-fallbacks: flip-block, flip-inline`, **forced to a bottom sheet below 400px** — an anchored popover on a 340px viewport is worse than a sheet. `interpolate-size: allow-keywords` for in-place expansion, falling back to `grid-template-rows: 0fr → 1fr`. **Never a navigation.**

### 4.2 THE TERMINATOR

One hairline that knows it is stuck, via `@container scroll-state(stuck: top)` — **no `IntersectionObserver` firing every frame in a moving truck.** Remember the queried element must be a *descendant* of the `container-type: scroll-state` element, so wrap it. When stuck it grows exactly one line of caps above it — `4 STANDING · $1,249 TO GO` — and thickens to 1.5px. This is the old almanac's red rule promoted from decoration to the one structural element that survives every state, including sundown.

### 4.3 THE CREED LINE *(first in the book — before the money, per `entry.py:225-228`)*

One sentence of the current creed, `--alm-prose`, `--txt`, `--alm-muted`. **The only line on the page with no number, and its silence is why the number underneath means what it means.** This is doctrine, not layout: *"'$1,249 short' means something different to a man funding a mission than to a man chasing a margin."*

### 4.4 THE READING *(the money — the second thing that stops people)*

He already built a renderer whose output is a paragraph a person reads at 5am. **The 2026 answer is not to un-prose it into a dashboard. It is to make the prose the primary object and let the figures inside it be instruments.**

One typeset paragraph, `--alm-prose` at `--txt`, `text-wrap: pretty`, raked by the sun. Every figure inside is `--alm-fig`, tabular, slashed-zero, live, and **tappable — it expands in place** via `interpolate-size` to show its arithmetic and its source. Never navigates, never a modal. That is `one-number-one-home` made physical: **a number's home is the sentence it belongs to.**

Above it, the actionable read as a headline at `--fig-inst`, and the single hero figure at `--fig-hero`:

> **You need one more load.**
>
> `$1,249.16` is not covered by anything booked. You earned `$12,250.00` this month; road took `$2,178.31`, so `$10,071.69` got through against a nut of `$9,320.85` as built — `$9,797.78` on a run-rate basis, and that `$476.93` gap is defect #708, still open. Two loads are booked and not yet run, `$1,780.00`, both delivering Thursday; **those are rates — each still owes its own fuel.** Booked `$12,250.00` against collected `$5,906.00` — `$6,344.00` is still out. Spend is known through **Jul 22**; two days are not yet visible. Incomplete, not zero.

Every figure is a live field. **Nothing here is ever hardcoded, and the shell never computes.** `entry.py:259-263` already carries the scar: the per-day fiction got rewritten in three places in one evening. One producer, one home. **Loads, never days.**

### 4.5 THE MONTH TAPE

31 cells, 2px gap, 34px tall. Observed days lit in proportion to earnings. **`blind_days` are outlined but present** — `box-shadow: inset 0 0 0 1px var(--alm-unknown)`, no fill, and the run past `txn_through` carries one `THRU 22 JUL` flag. *Incomplete, not zero*, rendered as a visual fact rather than a caption. The cheapest and most literal honest instrument on the page.

The declared markers ride here as 1px `--alm-mark` ticks: the nut, prorated break-even.

### 4.6 THE OBLIGATIONS TAPE

The ~24 recurring items **not** inside their 3-day window. One line each is too many; render as a single 31-cell tape with a `--alm-mark` tick on each due date and a caps line: `24 STANDING OBLIGATIONS · NEXT 3 IN 6 DAYS`. Tapping expands in place to a list. **They become standings on their own schedule; he never manages the queue.**

### 4.7 THE BOARD STRIP

No columns, no tabs. `now` is at most three, rendered as **three slots with the empty one visible** — capacity is information. A fourth renders as an `OVER` flag, not a fourth row. `next`/`later` are counts: *"4 next, 9 later."* Cards flagged `needs_bryan` **are not here** — they are standings, up in the arc. **Seven navigation targets deleted.**

### 4.8 THE WATCH

One line. `all_ok` renders as a hairline and the word *clear* in `--alm-lit`. **No green, no dots.** Each service reads `mileage-insights · 200 · proved 41s ago` in the figure face — the age of the last *proof* is the only honest thing to show, because liveness is not health. **A down service is not a line here; it is a standing.**

### 4.9 THE MUSCLE

`learning.brief_line()`, one line, unornamented, with a `--alm-mark` tick for the declared objective and a lit fill for what was applied. **No progress bar, no percentage, no hours, no streak.** Ranked by application, never consumption.

### 4.10 THE NARRATIVE

Last session's prose. `--alm-prose`, 66ch, `text-wrap: pretty`, `hyphens: auto`. The only genuinely-read text on the page and the only serif block. Moves carry three-letter codes — `FND DEC BLT DEL FIX FIL` — mono, tracked, right-aligned, like a logbook margin.

### 4.11 THE PROVENANCE LINE

The last line of the book, above the clock line: `SPINE 200 · PROVED 41s AGO · BUILD v7`. Tapping the build calls `r.update()` on the SW registration. **The connection reads as the age of the last successful proof, never as a dot.** This is the only chrome on the page.

### 4.12 THE CLOCK LINE — doctrine as a design decision

`the-clock`: *"notice it, return to the work, do not grip it."*

**One hairline at the extreme bottom edge of the viewport, below the safe area**, its lit fraction the elapsed share of the clock's span to its date. **No number. No countdown. No color escalation, ever.** `pointer-events: none` — you cannot tap it, hover it, or expand it. Present in peripheral vision, permanently unaddressable. **A meditation you cannot grip.** No dashboard would ever arrive at this.

---

# 5 · MOTION SPEC

## 5.1 The three laws (adopted from C, verbatim)

1. **Nothing readable ever sits on a moving pixel.** The background moves; type never does while it is being read.
2. **The ambient never states a number.** The sun is legal *precisely because it is imprecise* — a feeling and a figure are two channels of one fact, not two copies of it.
3. **Nothing moves unless he moved it, or the truth moved.** No idle pulses, no ambient shimmer, no load-in theater. Motion you can trigger by opening the app is motion you stop reading by day three — the same logic that killed five scoring systems.

## 5.2 Entrance — the delta *is* the news

Cached state paints instantly at final values, honestly aged. When live data lands, **only what changed since he last looked animates** — over 900ms, from what he last saw to what is true now. **If nothing changed, nothing moves.** No sweep, no stagger on figures, no count-up ever on load.

## 5.3 Easings

```css
--ease-settle: linear(0,.13 3.2%,.48 8.7%,.79 14.5%,.95 19.6%,1.02 25%,
                      1.03 31%,1 40%,1 100%);              /* 3% overshoot, no wobble */
--ease-refuse: linear(0,.42 12%,-.18 32%,.09 52%,-.03 72%,0 100%);  /* snap-back */
--ease-fall:   cubic-bezier(.4,0,.2,1);                    /* the sun */
```

Generate these; hand-written stops wobble. **The law: mechanisms may overshoot 3%. Numbers never overshoot** — an overshooting figure reads as inaccuracy, and this instrument's only asset is being believed.

## 5.4 The full beat sheet

| Beat | Duration | Curve |
|---|---|---|
| Standing arrival | 260ms + `min(sibling-index(),8)*32ms` | `--ease-settle` |
| Delta animation on load | 900ms | `--ease-settle` |
| ARM travel | 420ms (260ms reduced) | `--ease-settle` |
| Detent haptic | at 85% | — |
| SEAT breath | until the network answers | 0.8 Hz, ±1.5% |
| Row depart + survivors travel | 340ms / 220ms out | `match-element` |
| Figure roll after settle | 620ms | cubic ease-out, **never overshoots** |
| Sun drop per settle | 900ms | `--ease-fall` |
| Refusal spring-back | 520ms | `--ease-refuse` |
| **The held beat** | **620ms** | **silence** |
| Sundown light fall | 1600ms | `--ease-fall` |
| Highlights extinguishing | `sibling-index()*40ms` | linear |
| The mark fades up | 900ms | ease |
| Night count: illuminate | 0 (simultaneous) | — |
| Night count: extinguish | 90ms apart, in settle order | ease-out |

## 5.5 Sound — three, for the life of the product

One `AudioContext`, lazy on first real gesture, ~30 lines, no files, no fetch.

- **`tine()`** — 880 Hz sine, 55ms, gain 0.07. One settled.
- **`thud()`** — 150 Hz triangle, 90ms, gain 0.10. Deliberately un-musical. Refused.
- **`bell()`** — a perfect fifth (528 + 792 Hz offset 90ms), 1.6s decay, gain 0.05. **Only ever at sundown. Once a day at most.** That scarcity is the entire reason it means anything.

Muted via `almanac.mute`. `resume()` before every play; `suspend()` on hide; `close()` on `pagehide`.

## 5.6 Reduced motion — and the point that silence survives it

**Kept at full value:** the 620ms held beat, all four haptics, all three sounds, the two-phase latch (compressed to 260ms, **structure unchanged**), the refusal (snap-back becomes a 90ms opacity step), the night count's ordered extinguish (becomes ordered opacity steps).

**Removed:** the arrival stagger, the grain fade-in, the breathing hairline (static at 0.5), the sun crossfade (a 200ms step), the sundown highlight cascade, the figure roll (snaps to final).

```js
const RM = matchMedia('(prefers-reduced-motion: reduce)');
RM.addEventListener('change', () => retimeAll());   // live, not read once at load
```

> **A pause is not motion.** The single most important beat in the product — the silence before the light goes down — is fully available to a reduced-motion user. That is the correct reading of the spec, not a loophole.

---

# 6 · PHONE SPEC

## 6.1 Breakpoints — four, functional

| Range | Device | Instrument |
|---|---|---|
| `≤ 399px` | Fold 7 **folded** outer (~340px) | The arc alone. Book behind one scroll. Popovers forced to bottom sheets. `--fig-hero` bottoms out at 3rem. |
| `400 – 599px` | Galaxy S25, Fold outer wide | Primary posture. Arc + terminator; book scrolls under. |
| `600 – 1023px` | Fold 7 **unfolded** | Arc stays put; the book unfolds *beside* it. |
| `≥ 1024px` | Desktop | A different instrument (§6.4). |

## 6.2 One-handed reach in a cab

```css
#alm-arc{ padding-block-end: calc(env(safe-area-inset-bottom) + 96px); }
.alm-standing{ min-block-size: 64px; }          /* whole row is the target */
@media (pointer:coarse) and (min-height:700px){
  #alm-arc{ display:flex; flex-direction:column-reverse; }
}
```

**No control smaller than a thumb exists in the settle path, anywhere.** The light comes from above and rakes down while the standings sit low, in the thumb zone, *in* that raking light — physically true, and it means the sun drops *toward* the standings, so **the last one is lit longest.** Free, and it is the best frame in the design.

`#alm-book > section{ content-visibility:auto; contain-intrinsic-size: auto 220px; }` — the book costs nothing until seen, which is what makes the arc paint instantly on weak cellular. **Always supply `contain-intrinsic-size` in the `auto <length>` form**, or you get scroll-anchor jumps.

## 6.3 The unfold — a designed moment

**Correct the assumption first: the Viewport Segments API is the wrong tool for a Z Fold 7.** Its inner display is continuous and reports **one** segment in both postures, so `env(viewport-segment-*)` will silently never fire on his actual device.

```js
const dp = navigator.devicePosture;
dp?.addEventListener('change', () => onPosture(dp.type));
const mq = matchMedia('(min-width: 600px)');          // the reliable signal
mq.addEventListener('change', e => onPosture(e.matches ? 'open' : 'folded'));
```

Keep `@media (horizontal-viewport-segments: 2)` in the sheet anyway — it costs nothing and correctly handles seamed foldables — but never depend on it.

**Wrong response: reflow into two columns. Right response: the arc stays exactly where it is and the book unfolds beside it, already at today.**

```css
html[data-posture="open"] .alm-shell{
  display:grid; grid-template-columns: minmax(360px,34%) 1fr; gap:28px;
}
#alm-arc { view-transition-name: arc;  }   /* stays put — the anchor of the gesture */
#alm-book{ view-transition-name: book; }   /* swings out from behind it */
html:active-view-transition-type(unfold) ::view-transition-group(book){
  animation-duration:640ms; animation-timing-function: var(--ease-settle);
}
```

**The arc not moving is the whole trick.** Opening the device feels like *more desk*, not a different app. The sun does not change state — same weather, more of it.

## 6.4 Desktop is a different instrument, not a stretched phone

- **Keyboard is the primary settle.** `j`/`k` to move, **hold `f` for 420ms** to latch — identical two-phase mechanism, identical rail, identical detent, identical refusal. Superhuman-grade, and it means **the hero is one code path across all three form factors.**
- **The book stays fully open.** No disclosure anywhere; a wide viewport has the room and **every disclosure is a decision**.
- **A 31-day month register at full height** — one row per day, earnings and obligations on one line, declared ticks in the margin. The Bloomberg move, genuinely useless on a phone, **built only here.**
- `t` runs the night count.

## 6.5 The hero on narrow screens

**The signature moment gets *better* at 340px, because a small screen makes darkness more total.** The settle, sundown and the night count need contrast and silence, not area — and both are free. There is no element of the hero that requires width.

## 6.6 Glasses and voice — free, because the object model is domain-blind

**`?view=glance`** renders **only the top standing**, at `--fig-hero`, on `--alm-ground`, with no chrome. After sundown it renders the mark. A CSS branch over the same markup — no second codebase.

```css
html[data-view="glance"] #alm-book,
html[data-view="glance"] .alm-standing:not(:first-child){ display:none }
```

**Voice in** — on-device only (`SpeechRecognition` with `processLocally: true`; audio never leaves the device, which is the only acceptable answer for a surface holding recovery inventory). Gate the mic affordance on `available()` resolving; language packs are ~60MB and install asynchronously — **never block first paint on it.**

**Voice inherits the two-phase latch as readback** *(grafted from A)*: *"settle truck insurance"* → the surface reads back *"truck insurance, fifteen hundred, settle?"* → *"settle."* Same `seat()`, same refusal, **zero new UI**. Voice is an actuator on the existing mechanism, not a mode.

**Voice out** — `speechSynthesis` filtered on `voice.localService` only; several platform voices are cloud-backed and will leak text off-device. Speaks the standings and the sundown line. **Never the doctrine** — the system keeps the record, it does not do the surrender.

**One mechanism, four actuators: thumb, key, voice, agent.** That is the future-proofing claim, and it is testable.

---

# 7 · PERFORMANCE & ACCESSIBILITY BUDGET

## 7.1 Budget table

| Rule | Number | Why |
|---|---|---|
| Compositor-only during any gesture | `transform`, `opacity` | The rail must never miss a frame under his thumb |
| Full-viewport **repaints** | **zero** | The sun crossfades opacity between two rasterized layers |
| Concurrent rAF loops | **1**, ever | One scheduler, subscriber set, each returning its own unsubscribe |
| `backdrop-filter` / blur | **0** | Depth is light. Frosted glass is a 2020 finish that costs a compositing layer on a scrolling surface |
| `box-shadow` | 1 rule, gesture-scoped | Light emission only, never elevation |
| DOM nodes in the arc | ≤ 40 | Beyond that, virtualize by consequence |
| `will-change` | on `pointerdown`, off in `finally` | Permanent `will-change` = permanent layer = permanent memory |

## 7.2 One scheduler, zero leaks

```js
const Loop = (() => {
  const subs = new Set(); let raf = 0;
  const tick = t => { for (const f of subs) f(t); raf = subs.size ? requestAnimationFrame(tick) : 0; };
  const start = () => { if (!raf && subs.size && document.visibilityState === 'visible')
                          raf = requestAnimationFrame(tick); };
  document.addEventListener('visibilitychange', () => {
    if (document.hidden){ cancelAnimationFrame(raf); raf = 0; AC?.suspend(); Poll.stop(); }
    else { AC?.resume(); Poll.start(); start(); relum(); }
  });
  addEventListener('pagehide', () => {
    cancelAnimationFrame(raf); subs.clear(); Poll.stop(); AC?.close(); AC = null;
  });
  return { add: f => (subs.add(f), start(), () => subs.delete(f)) };
})();
```

**The baseline's `setInterval(load, 120000)` with no visibility gate and no clear is fixed in this pass.** A truck-cab PWA lives for days in the app switcher — **one leaked rAF is a dead battery by Thursday, and it will look like a hardware fault.**

## 7.3 Cleanup checklist (ship blockers)

- [ ] Every component owns an `AbortController`; every listener uses `{signal}`.
- [ ] Every rAF subscription returns and stores its unsubscribe.
- [ ] `visibilitychange` cancels rAF, suspends audio, stops the poll.
- [ ] `pagehide` clears the subscriber set, closes the AudioContext, clears every pending timer.
- [ ] Every WAAPI animation is cancellable and every `.finished` has a `.catch`.
- [ ] Grain generated **once** to a data URI; never regenerated on resize.
- [ ] No timer, animation or fetch survives a settle that removed its row.

## 7.4 Offline and staleness — never a spinner, never a fabricated zero

```js
const KEY = 'almanac.state.v1';
async function load(){
  const cached = JSON.parse(localStorage.getItem(KEY) || 'null');
  if (cached) paint(cached.data, { source:'cache', at: cached.at });   // instant, honest
  try{
    const d = await fetchJSON('/api/all');
    localStorage.setItem(KEY, JSON.stringify({ data:d, at: Date.now() }));
    paint(d, { source:'live', at: Date.now() });
  }catch(e){
    cached ? markAged(cached.at) : paintUnknown(e);   // flags, NOT zeros
  }
}
```

```css
html[data-aged] #alm-book{ filter: saturate(.55) }        /* whole book, uniformly */
html[data-aged] .alm-standing{ pointer-events:none; opacity:.58 }   /* cannot settle blind */
html[data-aged] .alm-age{ color:var(--alm-soon); font:var(--cap)/1 var(--alm-fig);
                          letter-spacing:.14em; text-transform:uppercase }
```

**The rule that follows from doctrine: if the spine is unreachable, standings are not settleable.** Letting him latch something that will never commit is the instrument pretending it can act. Age rendered with `Intl.RelativeTimeFormat`. **Never a spinner. Never a skeleton** — a skeleton is a shape of data that does not exist.

## 7.5 Not breaking siblings — the real risk, and it is not CSS

Every PWA he owns shares `bmhsolutions3711.github.io`. **Storage is origin-scoped, not path-scoped.**

```js
navigator.serviceWorker.register('sw.js', { scope: '/almanac/' });       // explicit
// in sw.js — bail on anything outside our path, or we serve Almanac's shell to /companion/
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (u.origin !== location.origin || !u.pathname.startsWith('/almanac/')) return;
  e.respondWith(/* … */);
});
```

- Every key dot-namespaced: `almanac.api` `almanac.token` `almanac.state.v1` `almanac.mute` `almanac.installed`. The existing `almanac_api` / `almanac_token` migrate in one pass — *moved means moved*.
- `#reset` must filter `caches.keys()` **by prefix**. An unfiltered sweep silently uninstalls every other PWA he owns.
- Keep the SW's two hard-won rules verbatim: **never cache an API response**; **always `cache:"reload"` the shell**. Bump `VERSION` and `BUILD` in lockstep.
- Keep the `#cfg` → `history.replaceState` bootstrap so the token never lands in history or a screenshot.
- Keep `[hidden]{display:none!important}` at the top of the sheet with its comment.

## 7.6 Accessibility

- Every standing is a `<button>` with `aria-describedby` pointing at its amount and due caps. Role list on the arc.
- `aria-live="assertive"` on the refusal line; `aria-live="polite"` on the arc's count. The mark at sundown is `role="status"`.
- The hold gesture has a keyboard equal on every form factor (`f`, 420ms). **There is no pointer-only path to any settle.**
- Contrast: `--alm-ink` on `--alm-ground` ≥ 7:1; `--alm-muted` ≥ 4.5:1; `--alm-faint` is decorative only and never carries text. `contrast-color()` on any label sitting over a data-driven fill.
- Color is never the only channel: severity also carries a caps word (`OVERDUE` / `DUE MON` / `CLEAR`).
- The clock hairline is `aria-hidden` — it is peripheral by design.

## 7.7 Degradation ladder — every enhancement is additive

**The floor: a scrollable list of standings, each with a working hold-to-settle, honest figures, and a real refusal.** That floor works with `@property`, `@function`, `text-box-trim`, view transitions, `@scope`, `scroll-state()`, anchor positioning, `interpolate-size`, `sibling-index()` and on-device speech **all absent.**

Feature-detect only where absence breaks *layout*, never where it merely removes polish:

```js
const HAS = { vt:!!document.startViewTransition, vtEl:!!Element.prototype.startViewTransition,
              prop:!!CSS.registerProperty, anch:CSS.supports('position-area: block-end') };
document.documentElement.dataset.caps = Object.entries(HAS).filter(([,v])=>v).map(([k])=>k).join(' ');
```

## 7.8 What to cut if a phone struggles, in order

1. **Grain** — `deviceMemory < 4` or `saveData`.
2. **The arrival stagger** — `hardwareConcurrency <= 4`.
3. **The sundown highlight cascade** — becomes one crossfade.
4. **The sun crossfade** — becomes a 200ms opacity step (the two layers stay).
5. **The figure roll** — snaps to final.

**Never cut:** the two-phase latch, the refusal, the held beat, the haptics, the three sounds, the flags and dashes. Those are the product.

---

# 8 · THE THREE SIGNATURE MOMENTS, RANKED

### ① THE SETTLE AND ITS REFUSAL — *the two seconds that carry the whole product*

**Why first:** it happens thirty times a day, it is the only thing he does on this surface, and everything else is decoration on it. **Build it first, on one hardcoded row, before anything else exists. If the refusal is not beautiful, nothing downstream matters.**

**Implementation:** §3.4 exactly. WAAPI `scaleX` rail with `--ease-settle`; the phase boundary at 420ms is where the POST leaves; `scaleX` held with a 1.5% breathing over-travel for the true network duration; `caught()` drawn only after a parsed 2xx; `refuse()` runs the rail backwards on `--ease-refuse`, keeps the row, keeps the sun where it was, and prints the spine's own words in the figure face naming what was **not** written. Retry is the same gesture. Idempotency-keyed. Cleanup contract §3.9 is a ship blocker.

### ② CLOSE THE BOOK → SUNDOWN — *the emotional heart*

**Why second in build order and first in meaning:** it turns the daily session loop into structure instead of a feature, makes the last settle a **different object** rather than a louder one, and drafts the recovery inventory without him typing it.

**Implementation:** §3.7. The final standing is composed server-side from logged moves plus `_changed_since()` deltas — **never invented**; amendable in place; refuses on an empty page. Then five beats: 620ms of silence (survives reduced motion), `--alm-sun → 0` over 1600ms via opacity crossfade of two rasterized layers, raking highlights extinguishing top-first on `sibling-index()*40ms`, the typeset mark fading up on a breathing hairline, and `bell()` once. **Gated on `source === 'live' && settledThisSession` — test it with `/api/standing` unreachable and confirm it refuses to go down.**

### ③ THE NIGHT COUNT — *the thing nobody else has built*

**Why third:** it is never offered, never surfaced, never a badge — he has to ask for it. But it is the moment that makes the darkness **proven rather than assumed**, and it is the only interface he owns that can be audited by its user in one gesture.

**Implementation:** an 800ms hold anywhere on the dark (or `t`, or *"count the day"*). The session's settled standings are held in memory only — never persisted, never aggregated across days. Illuminate all at once at 45% via a single class toggle and `@starting-style`; hold shows one caps line, today only; on release, extinguish on `sibling-index()*90ms` in settle order. Silent throughout. **No cross-day total, no streak, no comparison — ever.**

---

# 9 · BUILD ORDER

1. **The latch, on one hardcoded row.** Arm → seat → the real POST → the refusal. Nothing else exists yet.
2. **CLOSE THE BOOK and sundown.** Then test it with the spine unreachable and confirm it **refuses**.
3. **Type and color.** `text-box`, the four sizes, the OKLCH ramp, the two unknown tokens, the two light systems.
4. **The reading** (the prose paragraph with live tappable figures), then the month tape, obligations tape, board strip, watch, muscle, narrative, provenance, clock line.
5. **The night count.**
6. **Fold posture and the desktop register.**
7. **Voice, agents, `?view=glance`** — none of which may require touching 1–6. **That is the test of whether the container actually absorbs the future.**

---

# 10 · THE LEDGER ENTRY THIS BUILD WRITES

`LEDGER.md` says a design that can only add is a design that fails. This one deletes:

> the light theme · three view tabs · four board columns *(seven navigation targets → zero)* · the bespoke drawer and scrim · the toast failure channel · the `details.why` disclosure · the serif figure face · the eight-step minor third · six `ds-anim-*` keyframes including the infinite pulse · the shimmer/skeleton layer · every elevation `box-shadow` · the second z-scale · the `.ds-card`/`.ds-chip`/`.ds-btn` taxonomy · **green** · the confirm dialog · `setInterval(load, 120000)`.

**It is a net-negative build in code as well as in ports.**

---

### The one thing to get right above all others

**The settle must feel like something physically leaving his desk. The refusal must feel like a latch that failed to catch. The last one must feel like closing a book, not clearing a list.** And what follows is the point: a warm, low, quiet room that has nothing left to say to him — so he can go make a difference in the world.