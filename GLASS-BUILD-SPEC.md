# FIRST LIGHT: build spec for the GLASS orb (the community orb)

*Final art direction. Written to be built from directly. The spine is Concept B (Arc), with grafts from A (Instrument) and C (Live). Placeholders in `{braces}` are always served values. This document contains no invented figures.*

---

## 1. The chosen direction

### Name: **FIRST LIGHT**. Field label: **GLASS**.

### Governing metaphor, in one sentence
**A night drive to first light on his own windshield: 203 real days cross the glass as dash-blue receipts that roll an odometer that can only climb. His own words come up warm like dawn. The sky brightens only from what he gives away, and nothing gets taped to that glass until it passes his window test.**

### The 2-second feeling
*"I drove all night. I built every mile of it. And it's getting light on my side of the glass."*

### Why B is the spine
Each concept owns the honest odometer, so the odometer does not decide the pick. The deciding question is which one carries the emotional core. The core is a man who spent his life being what others wanted, stepping in front of people as himself for the first time, and looking for people rather than an audience.

- **A (Instrument)** makes him feel *precise*. It proves he can build, but it treats going public as a notch on a gauge.
- **C (Live)** makes him feel *wired*. It has the best tactile idea (the rumble strip), but its signature river of sparks is a per-frame particle system. That hurts performance, and it restates the count on canvas a second time.
- **B (Arc)** is the only concept where **the story of becoming himself happens on the real dates**:
  - 150 days of cold blue: built in silence.
  - **Day 150 (08-04, `MIN(wins.at)`)**: the first warm ember, when his own words enter the book.
  - **Day 196 (09-19, `MIN(posts.at)`)**: the horizon breaks, the first time he stood in front of people.

  Its light model makes the ADHD ruling physical: *nothing he doesn't do can take light away, and only giving adds it.* That is a floor, not a streak, built into the physics.

### The grafts: what came from where, and why

| Graft | From | Why it earns its place |
|---|---|---|
| **The three laws**: it reads and never performs; it only climbs; nothing leaves the glass untested | A | They become the acceptance criteria for every pixel. |
| **Preflight sensor lines** (`READ · ALMANAC.DB`, `READ · 16 REPOS · HEAD a1b2c3d`) printed during the cold open | A | Makes "a missing term blanks the total" visible, and gives B's 420 ms cold-open hold a real event to show. |
| **Drum-window craft**: cylindrical shading, axle slots, blank cells (never zeros) before data | A | The hero number has to look like a real wheel set behind glass. |
| **The data plate** on the back: rivets, spun finish, engraved rim | A | The honest answer to "10,000+" should look like a manufacturer's plate. It hosts B's three-temperature composition ring. |
| **2-line message stack** (ECAM-style push) | A | Solves the milestones that are 80 ms apart. Replaces B's single subtitle track. |
| **Tamper seal** `SEALED · FORMULA V1` / `FORMULA V1 · NOT YET RULED` | A | Makes the formula's ruled state visible on the front face. |
| **The repeater**: a sticky mini-odometer when the hero is scrolled away | A | On a phone, the payoff click must always be visible. |
| **Hold-to-read bezel**: ghost playhead, drums untouched, keyboard slider | A | Lets him read the past without the odometer ever rewinding. |
| **Reticle lock-on** on offending tokens | A | Makes a STOPPED verdict unmistakable without painting the card red. |
| **ODO / TRIP naming, the rumble strip, the curb at today** | C | Signature moment #3. He *feels* 203 days under his thumb, blind, at a fuel island. |
| **Measured facts**: 0 of 92 trip the static regexes, so TAPED is the ~99% path | C | The craft goes on the pass. STOPPED gets clarity, not spectacle. |
| **The sum guard**: the drive plays only if `series[last].pts === score.total` | C | The drive must add up to the number, or it doesn't play. |
| **Frit band on the glass; scroll-bound reflector glint on the lane; crate momentum lean** | C | Cheap, real-object textures. None of them loops. |
| **Orb breathes only while there is unseen truth** | C | Uses the house's own sanctioned `handbreathe` precedent. |
| **No AudioContext; `vibrate(0)` in teardown; one pre-built vibrate pattern for the drive** | C | One less thing to leak. Haptics beat sound in a cab. |
| **Avatar export with no number** | C | A number without a date goes stale. Density is the proof. |
| Engraving `ONLY CLIMBS · NOTHING HERE CAN BE LOST TO A MISSED DAY` | C | The orb's whole emotional contract in one line. |

### Cut, and why
- **C's harness and spark river.** Hundreds of sprites per frame in rAF. It competes with the dawn for the eye, and the dial ticks already carry the count.
- **A's rate sub-dial.** A rate shown at rest judges *this week*, and this week belongs to the truck.
- **The playbook's 120 s looping ghost scroll and B's entry sheen sweep.** *Nothing loops, ever.*
- **Milestone popovers.** They conflict with the bezel scrub. Milestones are read by scrubbing, and keyboard users reach them with PgUp/PgDn.
- **Whole-pane tilt glare.** Kept only on the TAPED decal, and it is the first thing cut.
- **Confetti and sound.**

---

## 2. The visual system

### 2.1 The light model: three temperatures, one rule
Every lit pixel is one of these. The spine classifies each receipt; the page never decides.

| Light | Means | Book source | Renders as |
|---|---|---|---|
| **DASH-BLUE** | What he **built** | commits (git, per repo, at request time), cards on first close, kills, sessions | Dial ticks, drums, chips, ghost text, frame ring, lane road |
| **LAMP** | What he **said**, in his own voice | wins written, journey beats | An ember at that day's tick tip; spines on the dash |
| **GIVEN** (lamp-white, spread as dawn) | What he **gave** | rows in `posts` | A notch outside the ring on post days, the horizon and dawn, lane reflectors |

**Paper is his hand.** The note, the tape and the thermal receipt are the only matte, physical objects. **Hot red touches only the characters that could hurt him**, never a card, never the room, never cadence. **No green anywhere.** A pass is a blue decal.

### 2.2 Tokens (room-scoped; `enter()` still writes the house `--key`, and the room reads `--cm-*`)
```css
#cm{
  --cm-key:   30,144,255;   /* #1E90FF  his reference: the HUD, what he built */
  --cm-bloom: 58,160,255;   /* #3AA0FF  outer glow ring only */
  --cm-core:  234,244,255;  /* #EAF4FF  white-hot: playhead, milestone ticks, drum glyphs */
  --cm-lamp:  255,221,168;  /* #FFDDA8  his Sentinel lamp #FFA419 toward the mark's page cream: what he said */
  --cm-given: 255,243,212;  /* #FFF3D4  the mark's page cream: what he gave */
  --cm-night: #03060B;      /* the glass */
  --cm-pane:  #05070B;      /* the note's pane */
  --cm-paper: #EFE6D2;      /* fallback; upgraded below */
  --cm-ink:   #1D1710;
  --cm-tape:  rgba(236,226,200,.78);
  --cm-marker:#1D3F73;      /* marker writing on HELD tape */
  --cm-thermal:#ECEBE6; --cm-thermal-ink:#1B2A3F;
  --cm-plate: #0A0F15; --cm-engrave:#C6D4E4;   /* brand silver from the Sentinel mark */
  --cm-text:  var(--ink);   /* room body text: house ink in dark */
  --cm-settle: cubic-bezier(.34,1.3,.64,1);    /* fallback spring */
  --cm-arrive: cubic-bezier(.16,1,.3,1);       /* house arrival curve */
  container: cm / inline-size;
}
@supports (color: oklch(0 0 0)){ #cm{ --cm-paper: oklch(.93 .03 85); } }
@supports (transition-timing-function: linear(0,1)){ #cm{
  --cm-settle: linear(0,.008 1.1%,.078 3.9%,.323 9.9%,.642 17%,.877 24.3%,1.021 32%,1.062 38.9%,
                      1.049 46.4%,1.008 59%,.996 69.8%,1 100%); } }   /* TALLY lineage. NEVER on a number. */
```
**Hex reference:** `#1E90FF` key · `#3AA0FF` bloom · `#EAF4FF` core · `#FFDDA8` lamp · `#FFF3D4` given · `#03060B` night · `#EFE6D2` paper · `#1D1710` ink · `#ECEBE6` thermal · `#0A0F15` plate · `#C6D4E4` engrave. House `--hot-rgb` (255,59,24) is used for hits only.

### 2.3 Paper mode: the cyanotype
In daylight, glow is invisible and only contrast reads. Two contexts:
```css
:root.paper #cm{ --cm-key:29,78,137; --cm-lamp:143,90,0; --cm-given:143,90,0; --cm-text:rgb(29,78,137); }  /* Prussian, ~7:1 on #EAE0C9 */
:root.paper #cm .cm-shield{                    /* the windshield becomes a cyanotype sheet */
  --cm-key:243,238,223; --cm-core:243,238,223; --cm-lamp:240,196,120; --cm-given:255,236,196;
  --cm-night: radial-gradient(circle at 50% 38%, #1f4f8c, #163c6e 70%, #0f2d55); }
:root.paper #cm .cm-odo{ text-shadow:none; color:#F3EEDF; }
:root.paper #cm .cm-plate{ background:#F3EEDF; --cm-engrave:#1D4E89; }
```
The canvas reads `getComputedStyle(canvas).getPropertyValue("--cm-key")` at paint time, so it is paper-aware for free. Do **not** copy LEARN's hard-coded rgba.

### 2.4 Type scale (mono caps = the instrument's voice; sans = the human voice; never mixed in one line)

| Role | Declaration |
|---|---|
| Drums | `700 clamp(40px,13vw,64px)/1 var(--mono)`, `#fff` |
| Repeater drums | `700 18px/1 var(--mono)` |
| Day line | `700 11px/1 var(--mono)`, `.2em` |
| Message stack | `600 10px/1.5 var(--mono)`, `.14em`, caps |
| HUD chips / decal | `700 11px/1 var(--mono)`, `.12em` / `700 9px/1.25`, `.14em` |
| Section caps (`.cm-cap`) | `700 9px/1 var(--mono)`, `.2em`, `--etch` (bumped from house 8px: this room is read at a fuel pump) |
| **His words on the note** | `400 17px/1.5 var(--sans)`, `text-wrap:pretty`, `user-select:text` |
| Peek line | `400 14px/1.45 var(--sans)`, `--mid` |
| Beats / verdict prose | `400 13.5px/1.6` / `500 14px/1.5 var(--sans)` |
| Receipt rows | `400 11px/1.55 var(--mono)`, `--cm-thermal-ink` |
| Plate engraving | `700 7.2px var(--mono)`, `.18em`, `--cm-engrave` |
| Coin face | `700 8px/1.15 var(--mono)`, `.1em` |

Tabular nums are inherited globally. **No `text-box-trim` on drums** (it shifts glyphs inside the 1em cells). Use it on the day line and headings only.

### 2.5 Spacing, radii, depth
- **Room padding:** house `0 22px 16px`; under 400px use `0 16px 16px`. Stack gap 12px. Panels `12px 15px`. Rows `11px 0` with `1px dotted var(--line)`.
- **Thumb law:** every target ≥40px. Primary actions (PULL ONE, COPY, SHARE, LINKEDIN, X) are 44px.
- **Radii:** windshield 12px · note 2px · chips 7px (`corner-shape:bevel`) · decal 6px (`corner-shape:notch`) · buttons 3px (house) · coins 50%.
- **In-room z-index:** shield/ghost/dawn 0 · dial and bezel 1 · badge 2 · chips 3 · note 4 · locks 5 · repeater and dash lip (sticky) 6.
- **No `backdrop-filter` anywhere in this room.**

### 2.6 Glow recipes (all static; nothing's glow ever animates)
```css
#cm .cm-odo{ text-shadow:0 0 .3em rgba(var(--cm-key),.9), 0 0 1.1em rgba(var(--cm-key),.45); }
#cm .cm-frame{ box-shadow:0 0 0 1.5px rgba(var(--cm-key),.95), 0 0 24px -4px rgba(var(--cm-bloom),.75),
                          inset 0 0 18px rgba(var(--cm-key),.22); }        /* the avatar's thin electric ring */
#cm .cm-head{ background:rgb(var(--cm-core)); box-shadow:0 0 12px 3px rgba(var(--cm-key),.9); }
#cm .cm-chip{ box-shadow:0 0 14px -4px rgba(var(--cm-key),.8); }
/* canvas bloom: ONE ctx.filter blur(5px) + "lighter" at paint time, never per frame */
```

### 2.7 Background: the windshield (`.cm-shield`), bottom to top
1. **Night:** `linear-gradient(180deg,#02040A 0%,var(--cm-night) 55%,#060A12 100%)`.
2. **Headliner:** `linear-gradient(180deg,rgba(0,0,0,.55),transparent 14%)`.
3. **A-pillars:** `radial-gradient(60% 90% at -8% 50%,rgba(0,0,0,.6),transparent 70%)`, mirrored at 108%.
4. **One static reflection streak:** `linear-gradient(104deg,transparent 34%,rgba(255,255,255,.035) 41%,transparent 47%)`.
5. **Frit band** (the ceramic dots on every windshield edge): `radial-gradient(circle,rgba(0,0,0,.9) 1.1px,transparent 1.4px) 0 0/5px 5px`, masked `linear-gradient(180deg,#000 0 10px,transparent 22px)`, top edge only.
6. **Sentinel mark** watermark behind the drums at 6% opacity (where Grok put its logo). Inlined SVG, no request.
7. **Ghost log** behind the ring (§4.2).
8. **Dawn and horizon** in the lower third (§3.4).

---

## 3. THE HERO: the build odometer and the drive

### 3.1 Anatomy (ring diameter `S = min(86vw, 340px, 52svh)`; 420px on the unfolded Fold)

| Radius | Element | Source |
|---|---|---|
| 0.50–0.53S | **Given notches**: a short `--cm-given` mark *outside* the frame on every post day. The only warm marks outside the ring: inside is what he built, outside is what he said to the world. | `series[].g` |
| 0.50S | **Frame ring** (the avatar's thin electric circle) | CSS |
| 0.43S | **Day ticks** (canvas, painted once). One per real day since 03-07. Length = `log1p(n)`. A quiet day is a dot, never a gap. Milestone ticks are `--cm-core` and 2px. **Year two laps inside year one: rings, never a reset.** | `series[].n` |
| tick tip | **Embers**: a 1.6px lamp dot just outside the tip on days with voice receipts | `series[].v` |
| 0.47S | **52 week ticks** (`repeating-conic-gradient`). The week is the floor's unit. | CSS |
| 0.40S | **Month letters** `M A M J J A S O N D J F`, 7px mono | `months[]` |
| on ring | **Playhead**: 8px white-hot dot. It rides `--cm-sweep`, then rests at today. | CSS var |
| centre | **Drum window**, **day line** `DAY {day} ↺`, **message stack** (2 lines) | `--cm-v`, `--cm-d` |
| 4 o'clock | **Tamper seal** overlapping the frame: `SEALED · FORMULA V1` or `FORMULA V1 · NOT YET RULED` | `score.ruled_at` |

**Unlit days stay dark. No line is drawn past today.** Nobody gets to invent the road ahead.

### 3.2 DOM (one flip button above a slider bezel; siblings, not nested)
```html
<section class="cm-shield" id="cmShield">
  <div class="cm-ghost" aria-hidden="true"><div id="cmGhost"></div></div>
  <div class="cm-hero" id="cmHero">
    <div class="cm-bezel" id="cmBezel" role="slider" tabindex="0" aria-label="read any day"
         aria-valuemin="0" aria-valuemax="{day}" aria-valuenow="{day}"></div>   <!-- full circle, z1 -->
    <button class="cm-badge" id="cmBadge" aria-pressed="false" aria-describedby="cmScoreSr">  <!-- inset:14%, z2 -->
      <span class="cm-flip">
        <span class="cm-face cm-front">
          <canvas class="cm-dial" id="cmDial"></canvas>
          <span class="cm-year"></span><span class="cm-head"></span><span class="cm-ghosthead"></span>
          <span class="cm-mark" aria-hidden="true"><!-- inline Sentinel svg --></span>
          <span class="cm-odo" aria-hidden="true"><!-- cmDrums() --></span>
          <span class="cm-dayline" id="cmDay"></span>
          <span class="cm-msg" id="cmMsg" aria-hidden="true"><i></i><i></i></span>
        </span>
        <span class="cm-face cm-back" inert><!-- the data plate, §3.6 --></span>
      </span>
    </button>
    <span class="cm-seal"></span>
    <p class="cm-sr" id="cmScoreSr" aria-live="polite"></p>
  </div>
  <div class="cm-chips" id="cmChips"></div>
  <!-- decal, mirror, dawn, horizon, glass pane, dash: §4 -->
</section>
```
**Hit-testing:**
- `.cm-bezel`: `position:absolute; inset:-4%; border-radius:50%; touch-action:pan-y`. The ring band is ≥42px on a 300px ring.
- `.cm-badge`: `position:absolute; inset:14%; border-radius:50%`. The centre flips; the ring reads.

### 3.3 The drums: mechanical carry in pure CSS, driven by one number
```css
@property --cm-v     { syntax:"<number>";  inherits:true; initial-value:0; }
@property --cm-d     { syntax:"<integer>"; inherits:true; initial-value:0; }
@property --cm-sweep { syntax:"<angle>";   inherits:true; initial-value:0deg; }
@property --cm-g     { syntax:"<number>";  inherits:true; initial-value:0; }   /* posts, cumulative */
@property --cm-gi    { syntax:"<number>";  inherits:true; initial-value:0; }   /* ghost line index */
@property --cm-ghost { syntax:"<angle>";   inherits:true; initial-value:0deg; }/* scrub playhead */
@property --cm-bx    { syntax:"<length>";  inherits:false; initial-value:-200px; }
@property --cm-shade { syntax:"<color>";   inherits:false; initial-value:transparent; }

#cm .cm-odo{ position:relative; display:flex; gap:2px; padding:.06em .1em; border-radius:.1em; background:#04070b;
  font:700 clamp(40px,13vw,64px)/1 var(--mono); color:#fff;
  text-shadow:0 0 .3em rgba(var(--cm-key),.9), 0 0 1.1em rgba(var(--cm-key),.45);
  box-shadow: inset 0 0 0 1px rgba(var(--cm-key),.35), 0 0 0 3px #0a1018, 0 0 22px -6px rgba(var(--cm-key),.6); }
#cm .cm-dr{ --pl: pow(10, var(--p)); height:1em; overflow:clip; background:#070b11;
  opacity: clamp(.28, var(--cm-v) + 1 - var(--pl), 1); }            /* leading zeros dim, light as the number reaches them */
#cm .cm-dr:last-child{ opacity:1 }
#cm .cm-strip{ display:flex; flex-direction:column;
  transform: translateY(calc(-1em * ( mod(round(down, var(--cm-v) / var(--pl)), 10)
                                     + max(0, mod(var(--cm-v), var(--pl)) - (var(--pl) - 1)) ))); }  /* moves only on x9→x0 */
#cm .cm-strip b{ display:block; height:1em }
#cm .cm-odo::after{ content:""; position:absolute; inset:0; border-radius:inherit; pointer-events:none;
  background: linear-gradient(180deg, rgba(0,0,0,.62), transparent 30%, transparent 70%, rgba(0,0,0,.62)),  /* drum curvature */
              linear-gradient(104deg, transparent 34%, rgba(255,255,255,.07) 41%, transparent 47%); }  /* window glare */
#cm .cm-badge.replaying .cm-strip{ will-change:transform }
#cm .cm-odo.blank .cm-strip{ visibility:hidden }                      /* before data: blank cells, never zeros */
#cm .cm-dayline::after{ counter-reset:d var(--cm-d); content:"DAY " counter(d) " ↺"; }
@supports not (width: calc(mod(5px, 3px))){                           /* pre-Chromium-125: same truth, printed flat */
  #cm .cm-strip{ display:none } #cm .cm-flat{ display:block } }
```
```js
function cmDrums(total){      // 11 cells per wheel: 9 rolls into 0
  const n = Math.max(5, String(Math.round(total)).length); let h = "";
  for(let p = n - 1; p >= 0; p--) h += `<span class="cm-dr" style="--p:${p}"><span class="cm-strip">` +
    "01234567890".split("").map(c => `<b>${c}</b>`).join("") + `</span></span>`;
  return h + `<span class="cm-flat">${esc(String(total))}</span>`;
}
```
No thousands separator on the drum, because a real odometer has none. The screen-reader line carries the commas.

### 3.4 States

**BEFORE (preflight: the sensors report).**
- On entry, the frame is lit at 30%, the drums are blank, and the stack reads `READING THE BOOK`. It lasts exactly as long as the fetch; there is no staged delay.
- When the payload lands, the stack prints each served `sources[]` line at a 120ms stagger (`READ · ALMANAC.DB`, `READ · 16 REPOS · HEAD a1b2c3d`). These lines fill the 420ms cold-open hold. Meanwhile the stack's second line shows the Day 0 beat: `MAR 7 · three scripts, run by hand`.
- **Partial** (`total:null`):
  - The stack reads `PARTIAL · GIT UNREADABLE`.
  - The drums read `— — — — —`.
  - The commits term on the plate shows `—`.
  - There is no drive. The day line still shows the served day.
  - **A smaller number is never presented as the score.**
- **Dark:** `THE GLASS IS DARK — THE BOOK DID NOT ANSWER`. If a last-known payload is in memory, show it with its age via `readLine`.

**DURING: the drive** (first entry of the day; later entries roll only what's new).
- **One WAAPI animation** on `#cmShield`, driving five registered properties. It inherits down to the drums, playhead, dial mask, dawn and ghost. **It is linear in days: the drum's speed at every moment is the book's slope.** There is zero rAF.
- **Three chapter holds, and only three.** Each is a duplicated keyframe (same values, 420ms apart), so the camera holds on a real day and no number moves. Chapters are served from `MIN(at)` queries and never typed.
- **Truth lands first.** Base values are set to today before `animate()`, in the same task as insertion. A hidden tab never shows a wrong number.
- **Sum guard:** if `series.at(-1).pts !== score.total`, skip the drive and rest at truth.

```js
const CM = { anims:[], raf:0, rafDial:0, rafTilt:0, timers:new Set(), ac:null, ro:null, io:null, vt:null,
             entryPending:false, room:null, G:null, tested:null, onGlass:null, reading:false, skipping:false };
const cmRM   = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const cmLite = () => (navigator.hardwareConcurrency||8) <= 4 || (navigator.deviceMemory||8) <= 4;
const cmBuzz = p => { if(!cmRM()) navigator.vibrate?.(p); };          // house gate

function cmSetRest(G){                                                 // THE TRUTH, before any frame
  const s = $("cmShield"), L = G.series.at(-1);
  s.style.setProperty("--cm-v", L.pts); s.style.setProperty("--cm-d", G.day);
  s.style.setProperty("--cm-sweep", (G.day % 365)/365*360 + "deg");
  s.style.setProperty("--cm-g", L.gc); s.style.setProperty("--cm-gi", L.gi);
  $("cmScoreSr").textContent = G.score.total == null ? `Build score unavailable: ${G.unavailable?.git||"a source is unreadable"}.`
                              : `Build score ${G.score.total.toLocaleString()}, day ${G.day}.`;
}
function cmDrive(G, fromDay){
  cmSetRest(G);
  if(cmRM() || G.score.total == null || G.series.at(-1).pts !== G.score.total) return cmLanded(G, false);
  const run = G.series.slice(fromDay); if(run.length < 2) return cmLanded(G, false);
  const k = cmLite() ? .6 : 1, MS = 14*k, HOLD = 420*k;
  const holds = new Set(G.chapters.filter(c => c.d >= run[0].d).map(c => c.d));
  const kf = [], at = new Map(); let t = 0;
  run.forEach((s,i) => { if(i) t += MS; at.set(s.d, t);
    const v = { "--cm-v":String(s.pts), "--cm-d":String(s.d), "--cm-sweep":(s.d%365)/365*360+"deg",
                "--cm-g":String(s.gc), "--cm-gi":String(s.gi) };
    kf.push([t, v]); if(holds.has(s.d)){ t += HOLD; kf.push([t, v]); } });
  const T = Math.min(t, 4800), sc = T / t; at.forEach((v,d) => at.set(d, v*sc));
  const shield = $("cmShield"), badge = $("cmBadge");
  badge.classList.add("replaying");
  const a = shield.animate(kf.map(([ti,v]) => ({ ...v, offset: ti/t })), { duration:T, easing:"linear", fill:"none" });
  CM.anims.push(a);
  cmFlares(G, at); cmStack(G, at, T);                                  // milestone flares + message stack (below)
  const pat = []; let last = 0;                                        // ONE pre-built rumble pattern for the whole drive
  G.milestones.filter(m => at.has(m.d)).forEach(m => { pat.push(Math.max(0, at.get(m.d) - last), 6); last = at.get(m.d) + 6; });
  const given = G.chapters.find(c => c.kind === "first_given" && at.has(c.d));
  if(pat.length) cmBuzz(pat.slice(0, 98));                             // horizon-break pulse (30ms) replaces that slot if present
  a.finished.then(() => { badge.classList.remove("replaying"); cmLanded(G, true); }).catch(() => {});
}
```
- **Milestone flares:** each `.cm-ms[data-d]` (a 5px mark positioned at `rotate(calc(var(--d)/365*1turn))`) gets `animate([{scale:1,opacity:.35},{scale:2.2,opacity:1,offset:.25},{scale:1,opacity:1}], {duration:650, delay:at(d), easing:"ease-out", fill:"backwards"})`.
- **`first_voice` (Day 150):** a `.cm-flare` at that angle strikes in lamp color: a 180ms warm burst that settles into the ember. The stack reads `DAY 150 · the first win, in his own words`.
- **`first_given` (Day 196):** the horizon and dawn are already driven by `--cm-g` in the same keyframes, so the hold gives them dwell. The stack reads `DAY 196 · first post`. The haptic is one 30ms pulse.
- **Message stack** (`cmStack`):
  - Each milestone is a WAAPI push into the 2-line `.cm-msg`. The new line enters at the bottom, the previous line moves up and dims to .55, and a third line pushes the oldest out.
  - Each caption spans from its arrival until two arrivals later, so milestones 80ms apart are still read, as the second line.
  - During `.replaying` the resting lines are hidden. The resting DOM is always the truth.
- **Skip:**
  - `pointerdown` on the shield while `.replaying` sets `CM.skipping=true`, calls `CM.anims.forEach(a=>a.finish())`, then `navigator.vibrate(0)`.
  - The click that follows is swallowed, so a skip never also flips the badge.
  - `finish()` resolves `.finished`, so the chips still land.
- **High-water mark:**
  - `glass.seen = {date, day, pts}` in localStorage, wrapped in try/catch.
  - The first entry of the day drives from Day 0. A later entry drives from `seen.day`.
  - With nothing new there is no motion.
  - Return after more than 60s (`visibilitychange`): refetch and roll only the delta, ≤900ms.

**AFTER: the landing.**
1. The drums stop dead on the true total: linear, no overshoot. An overshoot would roll an odometer backward.
2. The playhead parks at today with a static glow. It does not breathe.
3. 200ms later the HUD chips land via `@starting-style`: `+{since.points} SINCE {weekday}` and `+{today.points} TODAY`, **each only if greater than 0. There is never a `+0`.** At ≥400px, each chip gets a 1px hairline leader to the exact tick it counts from.
4. The stack settles to `DAY {day} · AS OF {hh:mm}` / `EVERY NUMBER FROM THE BOOK · TAP THE RING`.
5. The screen reader announces the total. The field orb's `.fresh` class clears. `glass.seen` is written.

### 3.5 The dial: canvas painted once, revealed by a conic mask
```js
function cmPaintDial(cv, G){
  const S = cv.clientWidth; if(!S) return;
  const dpr = Math.min(2, devicePixelRatio||1); cv.width = cv.height = Math.round(S*dpr);
  const cs = getComputedStyle(cv), K = cs.getPropertyValue("--cm-key").trim(), C = cs.getPropertyValue("--cm-core").trim(),
        LMP = cs.getPropertyValue("--cm-lamp").trim(), GV = cs.getPropertyValue("--cm-given").trim();
  const c = S/2, R = S*.43, L = S*.075, lg = Math.log1p(Math.max(1, ...G.series.map(s => s.n)));
  const ms = new Set(G.milestones.map(m => m.d));
  const off = new OffscreenCanvas(cv.width, cv.height), o = off.getContext("2d");
  o.setTransform(dpr,0,0,dpr,0,0); o.lineCap = "round";
  for(const s of G.series){
    const lap = Math.floor(s.d/365), r0 = R - lap*(L+6), a = -Math.PI/2 + (s.d%365)/365*2*Math.PI;
    const len = s.n ? 2 + L*Math.log1p(s.n)/lg : 1, cx = Math.cos(a), sy = Math.sin(a);
    o.strokeStyle = ms.has(s.d) ? `rgba(${C},.95)` : `rgba(${K},${s.n ? .5 + .5*Math.log1p(s.n)/lg : .22})`;
    o.lineWidth = ms.has(s.d) ? 2 : 1.25;
    o.beginPath(); o.moveTo(c+cx*r0, c+sy*r0); o.lineTo(c+cx*(r0-len), c+sy*(r0-len)); o.stroke();
    if(s.v){ o.fillStyle = `rgba(${LMP},.95)`; o.beginPath(); o.arc(c+cx*(r0-len-3), c+sy*(r0-len-3), 1.6, 0, 7); o.fill(); }  // ember
    if(s.g && !lap){ o.strokeStyle = `rgba(${GV},.95)`; o.lineWidth = 2;                                                 // given notch
      o.beginPath(); o.moveTo(c+cx*S*.505, c+sy*S*.505); o.lineTo(c+cx*S*.53, c+sy*S*.53); o.stroke(); }
  }
  const g = cv.getContext("2d"); g.setTransform(dpr,0,0,dpr,0,0); g.clearRect(0,0,S,S);
  if(!cmLite() && !PAPER()){ g.filter = "blur(5px)"; g.globalCompositeOperation = "lighter"; g.drawImage(off,0,0,S,S);
                             g.filter = "none"; g.globalCompositeOperation = "source-over"; }
  g.drawImage(off,0,0,S,S);
}
```
```css
#cm .cm-dial{ position:absolute; inset:0; width:100%; height:100%; mask: conic-gradient(#000 var(--cm-sweep), #0000 0); }
#cm .cm-year{ position:absolute; inset:0; border-radius:50%; pointer-events:none;
  background: repeating-conic-gradient(rgba(var(--cm-key),.32) 0 .5deg, transparent 0 calc(1turn/52.1429));
  mask: radial-gradient(closest-side, #0000 93%, #000 93.5% 96%, #0000 96.5%); }
#cm .cm-head{ position:absolute; left:50%; top:50%; width:8px; height:8px; margin:-4px; border-radius:50%;
  transform: rotate(var(--cm-sweep)) translateY(calc(var(--cm-r) * -.93)); }       /* --cm-r = S/2, set by the RO */
```
- The ResizeObserver (the Fold unfolding) repaints through `CM.rafDial`, debounced. It never replays.
- In year two, paint the finished year-one lap to a second, unmasked canvas.

### 3.6 The turnover: the data plate (tap the centre)
- **Flip:** `.cm-flip{transform-style:preserve-3d; transition:transform .8s var(--cm-settle)}`, and `[aria-pressed=true] .cm-flip{transform:rotateY(180deg)}`. The spring is allowed because the flip is not the number.
  - **Never** put `opacity`, `filter`, `mask`, `clip-path`, non-visible `overflow`, `backdrop-filter`, `mix-blend-mode`, `isolation` or `contain:paint` on `.cm-flip`. Glows go on the faces.
  - Swap `inert` between the faces and move focus to the back's heading.
- **Plate:** four rivets and a spun finish over `--cm-plate`:
  ```
  radial-gradient(circle at 50% 5% | 50% 95% | 5% 50% | 95% 50%, #dfe8f2 0 1.4px, #6b7a8c 2.2px, transparent 2.8px)
  repeating-conic-gradient(rgba(198,212,228,.035) 0 .7deg, rgba(0,0,0,.06) .7deg 1.4deg)
  radial-gradient(circle, #121a24, #0a0f15 70%, #06090d)
  ```
- **Rim engraving:** SVG `<textPath href="#cmRimPath">` with `textLength` equal to the circumference, stroked `rgba(0,0,0,.65)` at .6px with `paint-order:stroke`. It reads:
  `BUILD ODOMETER · 1 RECEIPT = 1 POINT · READS ALMANAC.DB + {n} REPOS · FORMULA V1 · RULED {date | NOT YET RULED} · ONLY CLIMBS · NOTHING HERE CAN BE LOST TO A MISSED DAY ·`
- **Composition ring:** conic segments from **served** `terms[].share`, with 1.5° gaps and the three temperatures:
  - build terms: stepped blues `oklch(.9−i·.09 .17 252)`
  - voice terms: lamp
  - given: `--cm-given`

  The honest picture is mostly blue with a thin warm arc: he sees exactly where the light can grow, and nothing shames him.
- **Centre:** each term is a 40px row-button: `COMMITS {count} × {weight} = {points}`, with the `source` in 9px etch underneath (e.g. `16 repos · git rev-list`). Tapping one flips back, opens that term's receipt drawer and scrolls to it. **Every point is within two taps of its receipt.**
- **Footer stamp:** the double-counting sentence in words, then `FORMULA V1 · RULED {date} · AS OF {hh:mm} · CALIBRATED BY THE BOOK`.

### 3.7 The receipts: thermal paper
- Native `<details class="cm-term">` under the shield.
- `interpolate-size:allow-keywords`, and `::details-content` animates `block-size .35s var(--cm-settle)`.
- Paper is `--cm-thermal` with `--cm-thermal-ink`, and a perforated top edge: `mask: radial-gradient(circle 3px at 6px 0, #0000 98%, #000) 0 0/12px 100% repeat-x`.
- On `toggle`, fetch `/api/glass/receipts?term=&offset=&limit=40` with the signal. Rows read `a1b2c3d · 09-26 · almanac-pwa · <subject>`, followed by a `40 MORE` button.

### 3.8 The scrub: read the log, never wind it back (the rumble strip)
- **Engage:** press and hold the bezel for 250ms; a 4ms haptic confirms.
  - A scroll that starts on the ring still scrolls: `touch-action:pan-y`, and the hold timer is cancelled on more than 6px of movement.
  - Once held, a non-passive `touchmove` calls `preventDefault()`. The finger was still until then, so the event is still cancelable.
- **While held:**
  - A hollow ghost playhead follows the thumb via `--cm-ghost`. **The real playhead and the drums never move.**
  - The stack switches to the outline register (`-webkit-text-stroke:.5px rgb(var(--cm-key)); color:transparent`): `TRIP · DAY 42 · APR 18 · ODO THEN {pts} · {n} RECEIPTS` / `the iCloud wipe · the backup held`.
  - The face line reads `READING THE LOG — THE ODOMETER DOESN'T GO BACK`.
  - After a 200ms dwell, the ghost layer scrolls to that day's `gi`, so the reflections are that day's real subjects.
- **Rumble:** summed receipts across the crossed days set the buzz length. The length is never shown.
- **Curb:** past today there is one 24ms pulse and a hard stop. The future isn't on the glass.
- **Release** holds the reading, and a 40px `NOW` pill returns to today with a 600ms linear glide of the ghost only.
- **Keyboard:** ←/→ ±1 day · PgUp/PgDn previous/next milestone · Home = day 0 · End = today. `aria-valuetext` carries the stack sentence.

```js
function cmBezel(G){
  const ring = $("cmBezel"), sh = $("cmShield"), sig = { signal: CM.ac.signal }, ms = new Map(G.milestones.map(m => [m.d, m]));
  let t = 0, x0 = 0, y0 = 0, at = G.day, curb = false;
  const dayAt = e => { const r = ring.getBoundingClientRect();
    const a = (Math.atan2(e.clientX - r.left - r.width/2, -(e.clientY - r.top - r.height/2)) + 2*Math.PI) % (2*Math.PI);
    return Math.round(a/(2*Math.PI)*365); };
  const show = d => {
    if(d > G.day){ d = G.day; if(!curb){ curb = true; cmBuzz(24); } } else curb = false;
    if(d === at) return; let n = 0, m = false;
    for(let i = Math.min(d,at)+1; i <= Math.max(d,at); i++){ n += G.series[i].n + G.series[i].v; m ||= ms.has(i); }
    m ? cmBuzz([8,34,8]) : n ? cmBuzz(Math.min(18, 3 + Math.round(4*Math.log1p(n)))) : 0;   // quiet days are smooth road
    at = d; cmTrip(G, d); sh.style.setProperty("--cm-ghost", (d%365)/365*360 + "deg"); };
  ring.addEventListener("pointerdown", e => { if(CM.skipping) return; x0 = e.clientX; y0 = e.clientY;
    clearTimeout(t); t = setTimeout(() => { CM.reading = true; sh.classList.add("reading"); cmBuzz(4); at = -1; show(dayAt(e)); }, 250);
    CM.timers.add(t); }, sig);
  ring.addEventListener("pointermove", e => { if(CM.reading) return show(dayAt(e));
    if(Math.hypot(e.clientX-x0, e.clientY-y0) > 6) clearTimeout(t); }, sig);
  ring.addEventListener("touchmove", e => { if(CM.reading) e.preventDefault(); }, { ...sig, passive:false });
  ["pointerup","pointercancel"].forEach(k => ring.addEventListener(k, () => { clearTimeout(t); }, sig));  // release keeps the reading
  ring.addEventListener("keydown", e => { /* ← → PgUp PgDn Home End → show(...) */ }, sig);
}
```

### 3.9 The cleanup contract (non-negotiable)
- **One owner, `CM`.** Every listener and fetch takes `{signal: CM.ac.signal}`. Every animation is pushed to `CM.anims`. Every timeout goes into `CM.timers`. Every rAF id is one of `CM.raf` (scan), `CM.rafDial` (RO debounce) or `CM.rafTilt` (decal). The one IO is `CM.io`, and `CM.vt` is the live view transition.
- **Four call sites:** `renderRoom()` (next to `lrTeardown()`), **the `$("home")` click handler** (which today tears nothing down), `pagehide`, and a partial pass on `visibilitychange→hidden`.
```js
function cmTeardown(){
  CM.anims.forEach(a => { try{ a.cancel(); }catch(_){} }); CM.anims = [];
  [CM.raf, CM.rafDial, CM.rafTilt].forEach(cancelAnimationFrame); CM.raf = CM.rafDial = CM.rafTilt = 0;
  CM.timers.forEach(clearTimeout); CM.timers.clear();
  try{ CM.vt?.skipTransition(); }catch(_){} CM.vt = null;
  navigator.vibrate?.(0);                                        // a vibration pattern is a timer too
  CM.ac?.abort(); CM.ac = null; CM.ro?.disconnect(); CM.ro = null; CM.io?.disconnect(); CM.io = null;
  CSS.highlights?.delete("cm-hit"); CM.reading = CM.skipping = false;
}
document.addEventListener("visibilitychange", () => {
  if(document.hidden){ CM.anims.forEach(a => { try{ a.finish(); }catch(_){} }); cancelAnimationFrame(CM.raf); navigator.vibrate?.(0); }
  else if(ACTIVE !== null && D[ACTIVE].room === "glass") cmOnReturn();   // refetch if >60s stale, roll delta; offer DID IT GO OUT?
});
addEventListener("pagehide", cmTeardown);
```

---

## 4. Components, in first-impression order

### 4.1 The orb on the field
- **Placement:** `D.push({k:"GLASS", hue:"30,144,255", fx:27, fy:80, r:78, room:"glass", ring:true})`. **Append only; never insert** (`D[2]` is hard-wired as RADIO).
- **Form, not hue, separates it from PLANNING.** It is the only hollow orb, lit exactly as far around the year as he has come:
```css
.orb.ringorb .ball{ background:
    radial-gradient(circle closest-side, rgba(6,8,12,.97) 72%, transparent 73%),
    repeating-conic-gradient(#0000 0 calc(1turn/52.14 - .6deg), rgba(6,8,12,.9) 0 calc(1turn/52.14)),
    conic-gradient(rgba(var(--h),.95) var(--yr,0turn), rgba(var(--h),.16) 0);
  box-shadow:0 0 36px -6px rgba(var(--h),.7); }
.orb.ringorb .ball::after{ display:none }
.orb.ringorb.fresh .ball{ animation:cm-orbbreathe 3.8s ease-in-out infinite }   /* only while unseen truth exists */
@keyframes cm-orbbreathe{ 50%{ box-shadow:0 0 46px -2px rgba(var(--h),.95) } }
@media (prefers-reduced-motion:reduce){ .orb.ringorb.fresh .ball{ animation:none; box-shadow:0 0 44px -4px rgba(var(--h),.9) } }
```
- `--yr` is `(day % 365)/365` turns, from the served day.
- `.fresh` is set when the served `glass.today_points > 0` **and** `glass.seen.date !== today`. That is a comparison, not a computation. Entering the room clears it.
- **Figure and signal line:** `.fig` shows `{total}` with unit `BUILD`, or `——` when the total is null. The sig line reads `DAY {day} · {ready} ON THE DASH`.
- **Source:** `sig[]` gets an 8th positional entry fed by `/api/all.glass`, from **the same producer function** as `/api/glass`.
- **Measure** `separate()` and the in-room rail at 360, 384, 412 and ~750px with the consider card present.

### 4.2 The windshield frame
The windshield is one tall panel (§2.7), full room width, radius 12px. Top to bottom:

- **Floor decal** (top-left, where the permit stickers go). **It has no memory**: this week only, no past weeks, never red, no temperature.
  - **Met:** a punched hole via `mask: radial-gradient(circle 5px at 88% 22%, #0000 98%, #000)`, brighter, reading `THIS WEEK · ON THE LANE · LINKEDIN · TUE`.
  - **Open:** same blue at 55% luminance, reading `THIS WEEK · OPEN — ANY WIN WILL DO`, with `last post {days_since} days ago` in sans `--mid`.
- **Rear-view mirror** (top centre): a rounded rectangle, `#0b1119`, 1px `rgba(var(--cm-engrave),.25)` border and an inner top highlight. It shows the last post's `SURFACE · date` and its first line, in normal-reading text. Tapping it scrolls to the lane.
- **The hero** (§3). Chips sit above it as a row under 400px; at 400px and up they float at the ring's shoulders.
- **Ghost log.** Real, spine-filtered commit subjects at .08 opacity, `10.5px/1.75 mono`, radially masked, behind the ring only.
  - It is positioned by `translate: 0 calc(var(--cm-gi) * -1.75em)`, so **it moves only as days pass in the drive** or when the scrub dwells.
  - At rest it is static.
  - It is off on lite devices and under reduced transparency.
- **Horizon and dawn** (lower third):
```css
#cm .cm-dawn{ position:absolute; inset:auto 0 0; height:48%; pointer-events:none;
  --o: calc(1 - 1 / (1 + var(--cm-g) / 8));        /* visual encoding of a served count; never printed; never reaches 1 */
  opacity: var(--o);
  background: radial-gradient(120% 62% at 50% 100%, rgba(var(--cm-lamp),.50), rgba(var(--cm-lamp),.12) 46%, transparent 72%); }
#cm .cm-horizon{ position:absolute; left:6%; right:6%; bottom:33%; height:1px; transform:scaleX(var(--o));
  background: linear-gradient(90deg, transparent, rgb(var(--cm-given)), transparent); box-shadow:0 0 14px 1px rgba(var(--cm-lamp),.55); }
```
  The sun is always still coming up. Missing a week cannot dim it.
- **The glass pane**, where notes are taped: frit band on top. Empty state is `THE GLASS IS CLEAR` in mono caps plus "pull one off the dash" in sans. **Tape residue:** after a post, the two faint tape ghosts stay with `LAST TAPED {date}`, taken from served `lane[0]`.
- **The dash** (the bottom lip of the windshield), §4.4.

### 4.3 Chips, seal, repeater
- **Chips:** `corner-shape:bevel` (it falls back to rounded), `rgba(6,10,16,.72)` background, `@starting-style{opacity:0; translate:0 8px}`, `transition: opacity .4s, translate .6s var(--cm-settle)`.
- **Repeater:**
  - An IntersectionObserver on `#cmHero` toggles `.cm-away` on the room.
  - A sticky 18px drum readout plus `DAY {day}` slides into the top-right (z6, 40px hit). Tapping it scrolls back to the hero.
  - During a payoff roll, both drum sets receive the same keyframes as two WAAPI animations on their own hosts. `--cm-v` is **never** set on the room root, because that would restyle the whole subtree on every frame.
  - It is hidden at ≥640px, where the hero is sticky.

### 4.4 The dash (the shelf) + PULL ONE
- **Spines:**
  - 92 spines, each 34px wide, with `height: calc(70px + var(--h)*60px)`, where `--h` is served `len`, log-scaled.
  - `writing-mode:vertical-rl`, date `SEP 26`, 9px mono.
  - The paper-edge spine gradient is `linear-gradient(90deg,#2a2418,#3b3222 45%,#2a2418)` with lamp text. These are **his words, the one warm strip in a blue room.**
  - Posted spines carry a `--cm-given` foil band: `inset 0 -10px 0`.
- **Scroll:** newest at the right, opening scrolled there. `scroll-snap-type:x mandatory`, `overscroll-behavior-x:contain`.
  - `@container scroll-state(snapped: inline)`: the snapped spine lifts `translate:0 -14px; rotate:-5deg` with a lamp glow.
  - `scrollsnapchange` writes the peek line (first ~90 chars in sans) plus `FITS LINKEDIN · X NEEDS PREMIUM`, or `FITS X` when `fits.x`. It fires a 4ms detent.
- **Momentum lean** (garnish; off on lite and under reduced motion): the scroll handler writes `--cm-lean` from velocity, clamped to ±8. Spines rotate from their base with `rotate .5s var(--cm-settle)`, and `scrollend` resets to 0.
- **PULL ONE:** full width at the dash's foot, 44px, right-thumb weighted. It scrolls a random unposted spine to centre, then pulls on `scrollend`. **The dash picks; he doesn't have to** (ADHD).
- **Framing:** the label is `ON THE DASH · {ready}`. It is inventory, never backlog. No "you should post" language anywhere.
- **Dash lip:** when the dash scrolls out of view (IO), a 48px sticky strip `PULL ONE · {ready} ON THE DASH` sits at the bottom (z6). The room gets matching `scroll-padding-bottom`.

### 4.5 The note, the headlights, the tape (second beat)
- **Pull:** an element-scoped view transition on the room (Chromium 147), falling back to `document.startViewTransition`. The spine gets `view-transition-name:cm-win`, and any old card gets `cm-old` to avoid duplicate names. Duration .55s on `var(--cm-settle)`. **Catch all three promises. Store the transition in `CM.vt`.**
- **The note:**
  - `background:var(--cm-paper); color:var(--cm-ink); padding:18px 18px 16px; font:400 17px/1.5 var(--sans); rotate:-2.4deg; box-shadow:0 26px 40px -18px rgba(0,0,0,.9)`.
  - It hovers, untaped, **in shadow**: `--cm-shade: rgba(5,9,15,.78)`.
  - Beside it, the HUD micro-line: `WIN {id} · {date} · {len} CHARS · FITS LINKEDIN · X NEEDS PREMIUM`.
  - `.cm-words` holds **exactly one text node**, and it is the `text` the spine returns from the test.
- **The test** fires on pull: `POST /api/glass/test {win_id}`. **The verdict is the spine's.** The beam only reads it out.
- **The headlights:** a stranger's truck pulling through the Pilot lot. A 15°-slanted band of light crosses the note left to right. Only paper under the beam is lit; the ink rides on top, so his words are readable only where the light is.
```css
#cm .cm-card{ background:
    linear-gradient(105deg, var(--cm-shade) calc(var(--cm-bx) - 90px), transparent calc(var(--cm-bx) - 28px)
                    calc(var(--cm-bx) + 28px), var(--cm-shade) calc(var(--cm-bx) + 90px)), var(--cm-paper);
  transition: --cm-shade .6s var(--cm-arrive); user-select:text; -webkit-user-select:text; }
#cm .cm-card:is([data-state="reading"],[data-state="stopped"],[data-state="unread"]){ --cm-shade: rgba(5,9,15,.78) }
#cm ::highlight(cm-hit){ color:#fff; background-color:rgba(var(--hot-rgb),.72); text-decoration:underline wavy rgb(var(--hot-rgb)) 1.5px; }
```
  - The beam is `card.animate([{"--cm-bx":"-120px"},{"--cm-bx":(W+120)+"px"}], {duration:900 + W*1.1, easing:"linear"})`, pushed to `CM.anims`.
  - One `CM.raf` tick reads `a.currentTime`. A hit lights when `beamX ≥ (rect.left − noteLeft) + (rect.top − noteTop)·tan15°`.
  - On lighting, the hit's range is added to the `cm-hit` Highlight (no DOM wrapping; the bytes stay exact). A **four-corner reticle** `.cm-lock` snaps on per `getClientRects()` rect (scale 1.8→1, 220ms, `cubic-bezier(.2,.9,.3,1)`), with a 10ms haptic.
  - The rAF ends itself when `playState !== "running"`.
- **Offsets are UTF-16**, served. The spine converts with `len(t[:i].encode('utf-16-le'))//2`.
- **Verdicts, always in words:**
  - **TAPED:**
    - The shade lifts, as if a cab dome light came on.
    - The note seats: `cm-seat` .72s spring, from −2.4° to −0.4°, with the shadow tightening.
    - Left and right tape press at +420 and +580ms (`cm-press`, .34s). The haptic is `[0,420,12,148,12]`.
    - At +800ms a **blue beveled decal** stamps: `WINDOW TEST · PASSED · {tested_at} · POLICY {rev}`.
    - **COPY and SHARE come into existence** under the note via `@starting-style`. They are never shown disabled.
    - Garnish, first cut: the decal's foil catches light as he tilts the phone. One `deviceorientation` listener (signal-bound, rAF-coalesced through `CM.rafTilt`) sets `--cm-tilt` on that one 90px element, only while it is IO-visible. Off under reduced motion, reduced transparency and lite.
  - **HELD:**
    - It comes into light and gets tape. The marker writing on the tape reads `TAPE IT {hold_until}` in `--cm-marker`, `italic 600 11px var(--sans)`, rotated −3°.
    - Beneath: "truck facts ride 14 days behind — your rule, 07-17."
    - Calm blue. No decal, no copy.
  - **STOPPED:**
    - The note stays in shadow and never seats; it hangs 2° off, held by nothing. The reticles stay.
    - Each hit is listed: `"{token}" — a broker name. The policy never publishes these.`
    - Then: "It stays on the dash. Edit it in the book, then test it again."
    - **Never auto-redact**, because that would rewrite his voice.
  - **UNREAD** (fail closed): it stays in shadow. "Not tested — the spine didn't answer. Nothing leaves the glass untested."
- **Tape recipe:** `oklch(.93 .035 88 / .78)`, 78×24px, with a torn `clip-path` polygon, rotated −7° and 6°. Under `prefers-reduced-transparency` it is opaque.
- **The copy gate** (structural, not cosmetic): the bytes that were inspected are the bytes that leave.
```js
async function cmSend(how){
  const t = CM.tested; if(!t || t.verdict !== "taped") return;
  if(how === "share" && navigator.share){ try{ await navigator.share({ text:t.text }); cmCopied(); cmSay("in the share sheet — you post it"); return; }
    catch(e){ if(e.name === "AbortError") return; } }
  try{ await navigator.clipboard.writeText(t.text); cmCopied(); cmSay("copied — the exact words that passed"); }
  catch(_){ cmSay("the phone refused the clipboard — long-press the note"); }
}
```
  There is **no `await fetch` between the tap and the call** (transient activation). Share `text` only. Confirm on his phone that LinkedIn's Android share target lands in the composer.

### 4.6 DID IT GO OUT? and the payoff
- **Persistence:** `glass.onglass = {id, copied_at}` in localStorage, try/catch, as a per-viewer convenience. When he returns from LinkedIn (`visibilitychange`), or even after an app kill, the note is **still taped to the glass**.
  - On restore, re-run the test **at rest, with no animation**. If the verdict changed (the policy was revised), show the new one.
- **The prompt:** one calm question under the note, `DID IT GO OUT?`
  - Two held word-buttons, `LINKEDIN` and `X`, using the house 620ms `.khold`/`.r3` latch, because a post is a write. No logos.
  - A link field with `PASTE LINK` (`clipboard.readText()`; the first use prompts). An empty link is allowed and is shown as "link not captured — said so."
- **Only after the 200** from `POST /api/wins/{id}/posted` → `{post, score:{before,after}, floor, earned}`. **Celebration is earned truth.** Total ≤2.8s, skippable by tap:

| t (ms) | Beat | Haptic |
|---|---|---|
| 0 | Both tape strips lift (reverse press, 180ms); the residue stays. | · |
| 180 | **The note turns to face the world**: `rotate: y 180deg`, .9s spring. The back face shows his words **reversed**, faint ink bleeding through, lit from behind by the dawn (`linear-gradient(0deg, rgba(var(--cm-lamp),.35), transparent 60%)`). *They are not for him anymore.* | · |
| 1080 | View transition: the note rises into the **rear-view mirror**. A mirror reverses the reversed text, so **it reads right again.** The mirror updates to this post. | · |
| 1100 | The dawn steps up by exactly one post (`--cm-g` before→after, 1.2s, `--cm-arrive`). **Light may ease; numbers may not.** | · |
| 1100 | The drums roll `score.before → score.after`, **linear, 600ms**, on the hero and the repeater. | 12 |
| 1100 | Today's given notch flares (canvas repaint once, then a 400ms `.cm-flare`). The spine's foil band appears. A reflector lands in the lane. | · |
| 1500 | If `floor.week_done` flipped, the decal **punches** (the hole scales in, 300ms). | 10 |
| 1700 | Each served `earned` coin strikes. | 18 each |

**No confetti.** The sky got brighter; that is the confetti.

### 4.7 The lane: `.cm-road` (never `.lane`, which the radio owns)
- Two painted lanes on black, **LINKEDIN** on the left and **X** on the right, with a 2px dashed centre line: `repeating-linear-gradient(180deg, rgba(var(--cm-key),.5) 0 14px, transparent 0 26px)`.
- Posts are `--cm-given` **reflectors** by date: `SEP 20 · win 80 · link`. An empty `url` reads "link not captured — said so".
- The glint is scroll-bound, with no timer:
```css
#cm .cm-refl{ animation:cm-glint linear both; animation-timeline:view(); animation-range:entry 15% cover 45%; }
@keyframes cm-glint{ 50%{ opacity:1; box-shadow:0 0 14px 3px rgba(var(--cm-given),.9) } to{ opacity:.6 } }
```
- The X lane reads `nothing logged here yet` until he seeds X #1 (07-17). Whether the X lane shows at all is his call.

### 4.8 Coins (achievements): pewter-blue, AA-chip tone
- **Size and finish:** 64px. A pewter conic body (`#9fb6d6, #e8f0ff, #6d86a8, #cfdcf0, #7a93b5`) and a **reeded edge** (`repeating-conic-gradient(#8aa0bf 0 2deg, #5d7394 2deg 4deg)` masked to a 4px rim). Gold belongs to MONEY.
- **Voice and given coins** (first win, first post) carry a lamp-enamel centre. Build coins are plain pewter.
- **Face:** the event and date struck, 8px mono. A tap opens the receipt line under the row.
- **Strike:** `@starting-style{scale:1.5; rotate:-20deg; opacity:0}`, staggered by `sibling-index()` × 50ms (no stagger where unsupported).
- **Proposed rules**, all from real rows and his to rule on:
  - FIRST WIRE: the first commit in any repo, served (C measured 04-09).
  - ONE ROOF: Almanac's first commit.
  - FIRST WIN.
  - FIRST POST.
  - 100 CARDS SHIPPED.
- **Disputed coins stay unstruck until he rules:** first public product (08-29 vs 08-30) and ten kills in a day.
- **Exactly one** `next_chip` is shown as a dashed outline with its rule in words. No progress bar.

### 4.9 Mile markers (the breadcrumbs)
- Journey beats, newest first. Each is a small blue reflective post reading `DAY {d}`, with the beat in 13.5px sans.
- **Tags, stamped in words:**
  - `ok`: no stamp.
  - `sanitize`: `TEST FIRST`.
  - `home`: a lock and `STAYS HOME`. **It is never offered to the dash.**
- **Tapping DAY** scrolls the hero into view and sets the scrub reading to that day, running `cmTrip(G, d)` without engaging a drag. The breadcrumbs and the dial are one timeline.

### 4.10 The riders (the crew)
- One row: CLAUDE · GOOSE · ATLAS · THE BRAIN.
- A lamp renders **only if the spine serves a `last_at`**, and reads `last heard 14:02`.
- There is no "ONLINE" and no dark-red lamp. An absent signal means an absent lamp, because liveness is not health.

### 4.11 The passenger door (v2 placeholder)
- A tall dashed outline in `--etch`: *"THE PASSENGER DOOR — who rides along is yours to say."*
- No button, no fill, `aria-disabled`. **It is the only thing in the room that responds to no input.** It waits on a decision, not a touch.

### 4.12 The print (stretch, built last)
- **X header (1500×500):** the dial **unrolled into a horizon**. 203 real daily ticks run left to right in blue, lamp embers sit above them, and the dawn rises on the right where the posts are. It carries the real total, `DAY {day} · SINCE 2026-03-07 · AS OF {date}`, and his Sentinel mark. Content stays in the middle third (X crops on mobile, and the avatar covers the bottom-left).
- **Avatar (400²):** the ring, ticks, embers and notches, with the mark in the hub and **no number**.
- **Mechanics:** OffscreenCanvas → PNG, pre-rendered when the panel opens (the tap's activation can't outlast decoding). Then `canShare({files})` → share, else `<a download>` with `revokeObjectURL` after 4s.
- Every word on the banner goes through `/api/glass/test` first. The mark goes into `icons/` and the SW `SHELL` precache.

### 4.13 Data contract (the page computes nothing)
```
GET /api/glass[?since=YYYY-MM-DD] →
{ as_of, day0:"2026-03-07", day, took_ms,
  sources:[{key,label,ok,head?}],
  score:{ total|null, formula:"v1", ruled_at|null,
          terms:[{key,label,kind:"build"|"voice"|"given",count,weight,points,share,source}] },
  since:{at,points}, today:{points},
  series:[{d,date,pts,n,v,g,gc,gi}],          // DENSE 0..day; n build · v voice · g posts · gc posts cumulative · gi ghost idx
  chapters:[{d,kind:"first_receipt"|"first_voice"|"first_given",label}],   // MIN(at) queries
  milestones:[{d,label,beat_id}], months:[{d,label}],
  chips:[{key,label,kind,earned_at,receipt}], next_chip:{key,label,rule}|null,
  floor:{last_post_at,days_since,week_done,week_of,week_post:{surface,at}|null},
  lane:[{id,at,d,surface,url,title,win_id}],
  shelf:[{id,at,len,x_len,fits:{x,linkedin},first,posted}],
  beats:[{id,at,d,beat,tag}],
  log:[{repo,sha7,subject,at,d}],             // policy-filtered on the spine
  crew:[{name,role,last_at}],
  unavailable:{git:"why"} }
POST /api/glass/test {win_id}|{text}  → {win_id,text,verdict:"taped"|"held"|"stopped"|"unread",hold_until,
                                         hits:[{start,end,token,rule,why}],x_len,fits,tested_at,policy_rev}
POST /api/wins/{id}/posted {surface,url} → {ok,post,score:{before,after},floor,earned:[chip]}   // calls entry.record_post()
GET  /api/glass/receipts?term=&offset=&limit=40
/api/all → glass:{total,day,ready,today_points}   // same producer function
```
- **Proposed v1 formula (his to rule):** 1 receipt = 1 point. Terms: commits · cards (first close only) · kills · sessions · wins · beats · posts.
- **Days are the dial, not the score.** Moves built/fixed are left out of v1 to limit double counting. The footer says the remaining overlap out loud.
- **Policy re-point:**
  - `BLOCKLIST_DYNAMIC` → almanac.db `loads` and `customers`.
  - Strike `streak_days` and `xp_total` from `ALLOWLIST_METRICS`.
  - Unreadable name sources → `unread`, never `taped`.
  - Truck facts under 14 days old → `held`.
- **Cache the git scan by each repo's `rev-parse HEAD`**, not by time.

### 4.14 Wiring (the only shared-code edits)
1. `D.push({...GLASS...})`, with `ring:true` → `.ringorb` in the `D.forEach` builder.
2. An 8th `sig[]` entry.
3. `ROOM_READ` / `READ_REST` gain `["glass","/api/glass"]`.
4. `enter()`: `if(D[i].room==="glass") CM.entryPending = true;`
5. `renderRoom()`: `cmTeardown()` beside `lrTeardown()`; add `: o.room==="glass" ? glassRoom()` **before** the `soulRoom()` fallback; add the wire branch `if(o.room==="glass") wireGlass();`; add `.cm-scroll` to the keep-list.
6. `$("home")` handler: `cmTeardown()`.
7. `hashchange`: `#glass` → enter the GLASS index, looked up by `room`, never by position.
8. `grab(path, signal)` gains an optional signal. `cmPost` uses `hdr({"Content-Type":"application/json"})`.

**`glassRoom()` renders every state at rest from `CM` with no animation.** Animations key off events (entry, pull, verdict, post), never off a render, because resize and `load(true)` re-render under him.

---

## 5. Motion spec

### Laws
1. **Motion is a receipt of a real event.** Allowed triggers: entry · his thumb · a pull · a verdict · a post (200) · the book changing on return · scroll (reflectors only). **With no input, nothing moves. Nothing loops.** The only exception is the house-sanctioned field breathe while unseen truth exists.
2. **The machine never bounces; the paper always does.**
3. **The camera may hold on a real day. It may never speed up a number.**

### Three easing families

| Family | Value | Used for |
|---|---|---|
| **Numbers: linear** | `linear` | Drums, playhead, sweep, ghost index, headlight beam, before→after roll |
| **Paper: mass** | `--cm-settle` (TALLY `linear()` spring; fallback `cubic-bezier(.34,1.3,.64,1)`) | Note seat, tape, decal, coins, spine lean, turnover, turn-to-face |
| **Light and chrome: arrival** | `--cm-arrive` `cubic-bezier(.16,1,.3,1)` | Chips, shade lift, dawn step, panels |

### Timeline table

| Motion | Trigger | Duration | Easing | Reduced motion |
|---|---|---|---|---|
| Room entry | `enter()` | .5s, .18s delay (house) | house | house |
| Preflight lines | payload | 120ms stagger | — | printed at once |
| Cold open hold | first entry of the day | 420ms | — | none |
| **The drive** | entry via high-water mark | 14ms/day + 3×420ms, **cap 4.8s**; lite ×0.6 | **linear** | final state, plus the 3 chapters as one static line |
| Milestone flare | playhead crosses | 650ms | ease-out | none |
| Stack push | each milestone | 180ms | arrive | last two lines static |
| First ember strike | Day 150 | 180ms burst → dot | arrive | painted |
| Horizon break | Day 196 | within the hold | (property-driven) | shown at rest |
| Chips land | drive finished, value > 0 | .4s / .6s | arrive / settle | present |
| Delta roll | later entry, or return >60s | ≤900ms | linear | final |
| Scrub ghost | his thumb | direct; NOW glide 600ms | linear | direct (no haptic) |
| Turnover | tap | .8s | settle | instant, `inert` still swaps |
| Receipt open | tap | .35s | settle | instant |
| Spine lean-out | snap | .25s | settle | kept (state) |
| Pull | tap / PULL ONE | .55s view transition | settle | skipped |
| Headlight beam | verdict returned | 900 + W·1.1 ms | linear | verdict and all hits at once |
| Reticle lock | beam crosses a hit | 220ms | `(.2,.9,.3,1)` | present |
| Shade lift | TAPED/HELD | .6s | arrive | instant |
| Seat · tape · decal | TAPED/HELD | .72s / .34s at +420/+580 / .3s at +800 | settle | present |
| Payoff sequence | 200 | ≤2.8s (§4.6) | per beat | final states |
| Reflector glint | scroll | scroll-bound | linear | static .8 |

**Haptic map** (all behind the house gate):
- Drive milestones: 6ms, as one pre-built pattern.
- Horizon break: 30ms.
- Dash detent: 4ms.
- Scrub engage: 4ms. Scrub rumble: 3–18ms. Scrub milestone: `[8,34,8]`. Curb: 24ms.
- Hit lock: 10ms.
- Tape: `[0,420,12,148,12]`.
- Units click: 12ms. Punch: 10ms. Coin: 18ms.

---

## 6. Phone spec

### Targets
- Fold cover ~344–360 CSS px (**design here first**).
- S25 ~384–412px.
- Fold unfolded ~750px.

`#cm{container:cm/inline-size}`.

| Tier | Layout |
|---|---|
| **< 400px** | One column, 16px gutters. Ring `min(86vw,340px,52svh)`. Chips form a row above the ring. Decal and seal form a row below it (a 300px circle in a 316px column leaves no corners). Leaders off. The dash lip is sticky at the bottom. |
| **400–639px** | Chips, decal, mirror and seal float at the ring's shoulders, and chip leaders are on. |
| **≥ 640px** (Fold open) | Two columns, `minmax(300px,1fr) 1.2fr`. **Left:** the windshield and hero, `position:sticky; top:0`; ring up to 420px; the repeater is hidden because the hero never leaves. **Right:** the glass pane, the dash, DID IT GO OUT?, the lane. **Below:** a 4-up strip of coins · mile markers · riders · door. |
| **max-height ≤ 560px** | Ring at `60svh`; the message stack moves inside the ring under the day line. |

### One-handed reach
- Everything he repeats (PULL ONE, COPY, SHARE, LINKEDIN/X, NOW) sits in the lower half and is 44px.
- Nothing essential sits in the top 20%.
- The scrub lives on the lower-right arc of the ring, where June to September naturally land under a right thumb.
- After a pull, the note scrolls into view with `block:"nearest"` and its actions directly under it. This is his own action, not a background scroll.
- **Gestures never fight the page.** The badge and pane are `pan-y`; the bezel captures only after the 250ms still hold.

### The hero on narrow screens
- Drums are `clamp(40px,13vw,64px)`. Five wheels fit the badge's inner diameter at 300px. At 6+ digits, drop to `clamp(34px,11vw,56px)` via a `.cm-odo[data-n="6"]` class written by `cmDrums`.
- **Measure the in-room rail** (`span=min(W*.62,660)/n`, now 8 orbs, ~30px per slot at 384px) with the 5-character label GLASS, at 360, 384, 412 and 750px.

---

## 7. Performance and accessibility budget

### Frame budget (120Hz ≈ 8.3ms)
- **Drive frame:** style recalc on ≤7 wheels, plus one conic-mask repaint (~340²), plus two gradient layers (dawn opacity, horizon transform). **Hold under 4ms on the S25**, measured in the Performance panel. `will-change` only while `.replaying`.
- **Canvas:** DPR capped at 2. Painted once per data or size change. Bloom is one blur at paint time.
- **Only `opacity`, `transform`/`translate`/`scale`/`rotate` and registered custom properties animate.** No animated shadows. No `backdrop-filter`.
- **No polling and no SSE.** Refetch on entry, on return if more than 60s stale, and after his own writes.

### Cleanup checklist (verify each one on room exit, home, hide and pagehide)
- [ ] every `CM.anims` cancelled
- [ ] `CM.raf` / `CM.rafDial` / `CM.rafTilt` cancelled
- [ ] `CM.timers` cleared (the scrub hold)
- [ ] `CM.vt.skipTransition()` called
- [ ] `navigator.vibrate(0)` called
- [ ] `CM.ac.abort()` (every fetch and listener, including `deviceorientation`, scroll, `scrollsnapchange`, `scrollend`, the pointer and touch handlers)
- [ ] `CM.ro` and `CM.io` disconnected
- [ ] `CSS.highlights.delete("cm-hit")`
- [ ] `CM.reading` / `CM.skipping` reset
- [ ] no AudioContext exists in this room
- [ ] all localStorage wrapped in try/catch; the page renders correctly without it

### Visibility pausing
- On hide: `finish()` every animation (the truth is already the base value), cancel the scan rAF, `vibrate(0)`.
- A hidden tab never shows a wrong number, because truth lands first.

### Reduced motion
- Final states render immediately. The three chapters render as one static line under the ring: `DAY 0 three scripts · DAY 150 first win, his words · DAY 196 first post`.
- Embers, notches and dawn still show, because they are data.
- The flip is instant (`inert` still swaps).
- The verdict and all hits appear at once. Tape, decal and coins are present, not animated.
- No view transitions.
- Snapped lean-out is kept; the momentum lean is off.
- The scrub still works, with no haptics.
- The field orb gets a static glow, and the ghost layer is static.

### Reduced transparency
Opaque tape, ghost off, no tilt.

### Screen readers
- The badge is a `<button aria-pressed>` described by `#cmScoreSr` (polite, with commas).
- The bezel is `role="slider"` with `aria-valuetext`, and milestones are PgUp/PgDn stops.
- Verdicts are words, never color alone.
- The dash is `role="list"`, and each spine's `aria-label` reads "Win 94, September 26: {first}".

### Scoping
- Every selector starts with `#cm`. Every property, keyframe, highlight and view-transition name is `--cm-*` or `cm-*`. IDs start with `cm`.
- Grep new class names against the sheet first. `.lane`, `.card`, `.strip`, `.hero`, `.hold`, `.chip` and `.seg` are taken.

### Degradation ladder
1. Full.
2. **Lite** (≤4 cores or ≤4GB): no bloom, no ghost, no tilt, no momentum lean; drive ×0.6.
3. **Below Chromium 125:** a flat printed number and an unmasked dial. Same truth.
4. **Newer garnish missing** (scroll-state, `corner-shape`, `sibling-index`, element VT, `interpolate-size`, `animation-timeline`): each falls back to the plain state.
5. `/api/glass` down: the last payload with its age, or dark glass. **Never a zero.**
6. Git unreadable: `total:null`, drums `—————`, `PARTIAL · GIT UNREADABLE`, no drive.
7. Window test down: `unread`. Nothing leaves the glass.

### What to cut if a phone struggles (in order)
Decal tilt → momentum lean → ghost layer → canvas bloom → dawn radial (keep the horizon line) → view transitions → drive holds (keep linear days). **Never cut:** truth-first, the drums, the verdict words, the copy gate.

### Ship
- Bump `/Users/bryanhertzig/Local Models/almanac-pwa/sw.js` `VERSION` from `almanac-shell-v178` to `v179` in lockstep with the page build tag, with a one-line house comment. Add the mark SVG to `SHELL`.

**Spine tests** (run the suite as **one command**, card #285):
- `TEST_CONTRACT` refuses "Acme Logistics of Delaware" by name.
- An emoji before a hit still yields correct UTF-16 offsets.
- Unreadable name sources produce `unread`.
- A missing term gives `total:null`.
- `series.pts` never decreases, and `gc` never decreases.
- `series[last].pts == score.total`.
- A reopened card counts once.
- `chapters.first_voice.d == day(MIN(wins.at))`.
- Posting moves `gc` by exactly 1.
- Truck facts under 14 days produce `held`.

---

## 8. The three signature moments (ranked)

### 1. THE DRIVE TO FIRST LIGHT, and the odometer that turns over *(the hero; it gets the craft)*
**What happens:**
- The first open of the day plays 203 real days at the book's own speed.
- For the first stretch the drums barely move and the words carry it: *three scripts, the iCloud wipe, the models are my soul*.
- The summer steepens and the low wheels blur. This is the real slope, not an ease.
- **On Day 150 the first warm ember strikes**: his own words entering the book.
- **On Day 196 the horizon breaks**: the first time he stood in front of people.
- The wheels land dead on the true total and go still.
- Tap the centre and it turns over to a riveted data plate. Every point is traced to a thermal receipt within two taps, engraved with `ONLY CLIMBS · NOTHING HERE CAN BE LOST TO A MISSED DAY`.

**Implementation:**
- One linear WAAPI animation on `#cmShield`, driving five `@property` values (`--cm-v`, `--cm-d`, `--cm-sweep`, `--cm-g`, `--cm-gi`). Chapter holds are duplicated keyframes.
- Drums are CSS `mod/round/pow` carry. The dial canvas is painted once and revealed by a conic mask. Dawn and horizon are driven by `--cm-g`.
- Truth is set first, guarded by the sum check, with a high-water-mark delta. Zero rAF.
- The flip is `preserve-3d` with the settle spring, over a plate of SVG `textPath` and a served-share conic.

**Why it beats the stack:** it is the first instrument in his stack where every resting frame is a served number and the whole total traces to receipts. It also shows his own becoming on the dates it happened, where nobody can call it staged.

### 2. HEADLIGHTS ACROSS THE GLASS, then the note turns to face the world *(the second beat and its payoff)*
**What happens:**
- He pulls a win off the dash. It lands on the glass in shadow.
- A stranger's headlights sweep across it. His words are readable only where the light falls. The window test, made literal: *what would someone walking the Pilot lot read?*
- On the ~99% path the dome light comes on, the note seats, two strips of tape press with a double haptic, the blue decal stamps, and COPY/SHARE come into existence.
- When he confirms it went out (after the 200), **the note turns around**: his words reversed, lit from behind by the dawn, no longer for him. It rises into the rear-view mirror, where the reflection reads right again.
- The dawn brightens by exactly one post, and the drums click forward by the served delta.

**Implementation:**
- The spine verdict comes first. A `@property --cm-bx` gradient beam runs as a linear WAAPI, and one self-ending rAF lights Highlight API ranges and reticles at the slant-corrected x.
- Seat, tape and decal are settle-spring keyframes. The copy gate closes over the spine-returned `text`.
- `glass.onglass` persistence survives the trip to LinkedIn.
- The payoff is a held write, then a `rotateY` flip, an element-scoped view transition into `.cm-mirror`, a `--cm-g` arrive step and a linear before→after drum roll.

### 3. THE RUMBLE STRIP: read the log, never wind it back
**What happens:**
- He holds the ring and drags his thumb around the year. A hollow ghost playhead follows while **the odometer never moves**. The message center reads `TRIP · DAY 42 · ODO THEN {pts} · the iCloud wipe`.
- He *feels* the book: March is smooth road, the first commit is the first bump, and July through September chatter like rumble strips at a toll plaza.
- Past today there is a curb, one firm pulse and a hard stop.
- A quiet day is smooth road, not a broken chain. It is anti-streak by construction, and it can't be faked, because every pulse is a day in the book.
- It is also the door in miniature: something he can hand to a stranger at a fuel island and say *"feel that — that's 203 days."*

**Implementation:**
- `#cmBezel` (`role="slider"`, `touch-action:pan-y`), a 250ms still-hold engage, a non-passive `touchmove` that prevents default only once held, and `atan2` to a day index.
- Summed crossed-day receipts set a clamped `vibrate` length. `--cm-ghost` drives the ghost head, and `cmTrip()` writes the outline-register stack and `aria-valuetext`. The NOW pill returns.
- Keyboard: arrows, PgUp/PgDn, Home, End. Haptics sit behind the house reduced-motion gate. Listeners are signal-bound and the hold timer lives in `CM.timers`.

---

## Calls that are his (the design waits on these rather than guessing)
1. **Formula:** 1 receipt = 1 point (recommended), or weights. Until he rules, the plate reads `NOT YET RULED`.
2. **Kills:** count the 21 in `moves`, or seed JOURNEY Part 4's 82 by his hand.
3. **Seed JOURNEY Part 2's milestones** into `journey_beats` (backdated, `source='journey'`), and settle the disputed dates before those coins can strike (08-29 or 08-30; ten kills or seven).
4. **Seed X #1 (07-17) into `posts`.** If he does, the horizon breaks on **Day 132**, which is truer to what happened.
5. **Label and form:** GLASS as a hollow ring (recommended), or COMMUNITY.
6. **Whether the X lane shows in the room.**
7. **Who rides along:** the passenger door.
8. **Which browser the desk is installed through on each phone** (Chrome, or Samsung Internet on an older Chromium). This sets the garnish floor.

**Files this spec is built against:**
- `/private/tmp/claude-501/-Users-bryanhertzig-Library-CloudStorage-GoogleDrive-bmhsolutions3711-gmail-com-My-Drive-BMH-Solutions/d1c718c2-5713-4268-8609-423f430b65e6/scratchpad/journey/ORB_BRIEF.md`
- `/Users/bryanhertzig/Local Models/almanac-pwa/desk.html`
- `/Users/bryanhertzig/Local Models/almanac-pwa/sw.js` (VERSION `almanac-shell-v178` at line 17 → v179)
- `/Users/bryanhertzig/Almanac/spine/server.py`
- `/Users/bryanhertzig/Almanac/spine/entry.py` (`record_post`)
- `/Users/bryanhertzig/Local Models/bik/docs/publish_policy.md`
- `/Users/bryanhertzig/Almanac/docs/brand/almanac-mark.svg`