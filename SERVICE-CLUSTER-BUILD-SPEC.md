<!-- AS BUILT (2026-09-29, card #362, shell v181) — where the build departs from the spec below:
  - Class names: `.hero` / `.mini` / `.hold` are GLOBAL desk classes (.hero caps max-height 262/152/126px; .hold is the
    money room's flex column). Built as `.svc-hero` / `.svc-mini` / `.svc-hold`. The first build used the spec's names and
    the hero pod was clipped to 212px — read the collision list at desk.html's CM header before naming anything.
  - svcReveal(): the reset scrolls the hero pod into its room's own scroller before the payoff. Closing the console
    shrinks the room under a kept scroll; without it the refill played ~600px above the view on desktop.
    The telltale rail uses the same helper.
  - `.svc-run` (the overrun hatch past E) is neutral wash at rest, red only when overdue — the faint red at rest read as alarm.
  - Mini date window small line: `WED · ≈29D · EST` (the full `WED · EST. · ≈29 DAYS` truncated at 145px).
  - Rider plate on a mini: `RIDES WITH OIL CHANGE` only; its basis line already says none on record.
  - Under reduced motion SVC.hold still holds the hero seat for 2.6 s so the epitaph reads; topoff (the detents) is skipped.
  - Spine: all nine additions landed in service.py (tie fix, riding, soon_pct, span_est, age_days/est_stale + past-date null,
    zero-pct, pace_why, est_days, recent[].leg with loads counted from loads.delivery_date). 18 tests in test_service.py.
  - Deferred: the concept file's embers / conic beam / dry-run preview (cut by the spec itself).
-->

# THE SERVICE CLUSTER: build spec (card #362)

*It replaces the three text rows of THE SERVICE CLOCK in `desk.html` (`svcHTML` / `wireSvc` / `svcPost`, and the `.svc-*` CSS after `.snapline .mis:hover`). The spine work in `~/Almanac/spine/service.py` ships in the same card, first.*

---

## 1. Chosen direction

**Spine: Concept A, INSTRUMENT.** I picked it for its metaphor and emotional fit, not its flash:
- He asked for a countdown gauge. A literally hands him a second gauge cluster, read with the same reflex as his fuel gauge.
- Its payoff (a lamp *he* put out) is rare, earned, and can't be faked. That is doctrine-true: loud is a budget.
- Arc (B) is emotionally richer, but its "road rolling back" beam depends on a conic-mask layer that adds risk and adds nothing to the glance.
- Live (C) puts its craft into a dry-run preview. That means network on every keystroke and a second POST path, which is complexity at the wrong moment.

**Name:** THE SERVICE CLUSTER. The panel cap still reads `THE TRUCK · SERVICE CLOCK`, because that is his word.

**Governing metaphor.** Each service is a tank of miles on a second gauge cluster for the F-250. The road drains it, his wrench tops it off, and the needle says how far while the almanac leaf under it says what day.

**The two-second feeling.** *The truck is keeping count, so I don't have to.*

### Grafts

| Moment | From | Why it survived |
|---|---|---|
| Lamp by E, and the **filament lamp-out** payoff | A | The single most earned moment. It fires only when a lamp was really lit. |
| **HOLD TO LOG** (the button fills, never the needle) | A (C's squeeze is the same idea) | Tactile and deliberate; a reset sits under a held control. It has a kill switch (§3.6). |
| Detent top-off with the rider 120 ms behind, plus the pump click-off thunk | playbook §6, A and B | The pump nozzle is the payoff he already knows. |
| **THAT LEG epitaph** (miles and days of the leg just closed; loads only if served) | B | Turns an expense into stewardship using served numbers only. It survives reduced motion, because the story lives in the data. |
| Stale-odometer honesty (`READ 9 DAYS AGO — SNAP THE DASH`, dashed leaf) | B and C | The needles are only as current as the odometer, and the page says so. |
| **The tie bug fix** in `board()` (newest entry wins a same-odometer tie) | C | A correctness bug. Without it, the payoff lies: a DONE logged at the shop's odometer would not reset oil. |
| `≈ 26 DAYS` countdown under the date | A (`est_days`) and C (`days_left`) | The most driver-native "when" there is, and it answers his literal complaint. |
| Witness needle ("last look") | A and B | Tier 3. The road since he last looked, shown as an angle and never as a subtracted number. |
| Handoff armed inside `svcPlay` after the afterglow | A and B | A fixed 1.5 s would cut the lamp decay and the leaf flip. |
| Telltale rail, scrolled with `.rgrid.scrollTo` | A (correcting the playbook §9) | `scrollIntoView` would shove the `overflow:hidden` shell. |

### Cut, and why

- **B's conic beam and lane.** An extra paint layer on a moving value, with mask math, for no gain in the glance.
- **C's road embers, days notches, dry-run preview and read-the-road.** They need new spine queries plus network per keystroke, or they drown the dial in texture at 146 px. The embers are parked as a possible later card.
- **LCD ghost segments (`888,888`).** Cute, but noise at a stop in glare.
- **CALIBRATE animation.** The dotted-to-solid scale just re-renders. No motion is needed.
- **The playbook's corner lamp.** Replaced by the lamp at E.

---

## 2. Visual system

### 2.1 Palette

House tokens only. There are no new hex values in dark mode.

| Role | Token | Dark | Paper |
|---|---|---|---|
| OK / backlight (fill, needle, figures) | `--ink` | `#E9EDF0` | `#221A0E` |
| Soon (≤ 1,000 mi, served `soon`) | `--amber` | `#FFA419` | `#8F5A00` |
| Overdue (served `overdue`) | `--hot` / `--hot-rgb` | `#FF3B18` / `255,59,24` | `#B3271A` / `179,39,26` |
| Unknown | `--unknown` | `#6E6E6E` | `#7A756B` |
| Secondary text | `--mid` / `--dim` / `--etch` | `#AEB8C0` / `#8B96A0` / `#5E6870` | inherited |
| Pod ground | `--panel2` | `#101317` | uses `--panel` |
| Hairlines | `--line` | `rgba(150,170,190,.15)` | `rgba(70,56,32,.24)` |
| Identity: the HOLD button fill **only** | `rgba(var(--key),…)` | `255,110,50` (HOTSHOT orb hue, inline) | inline |

**Scoped variables** (all set by class, never by the page doing math):

```css
.svc-g{--svc-c:color-mix(in oklch,var(--ink) 90%,transparent)}   /* ok = backlight white */
.svc-g.soon{--svc-c:var(--amber)}
.svc-g.overdue{--svc-c:var(--hot)}
.svc-g.unk{--svc-c:var(--unknown)}
```

**Laws:**
- No green anywhere.
- Key orange never enters a pod, because it sits too close to amber.
- `body.hot` never touches this panel: use `.svc-*` classes only, never `.big`, `.gread` or `.n`.

### 2.2 Type scale

All mono (`var(--mono)`), 700 unless noted, tabular numerals, uppercase labels.

| Element | Hero | Mini |
|---|---|---|
| Plate (service name) | 12px / `.12em` / `--ink` | 10px / `.12em` / `--mid` |
| NEXT / LOGGED tag | 8px / `.16em` on `--svc-c` | — |
| "+ … · SAME STOP" / "RIDES WITH …" | 600 9px / `.1em` / `--dim` | same |
| Big figure | `clamp(26px,12cqi,46px)` (≈38px on phone), `letter-spacing:-.02em`, `text-box:trim-both cap alphabetic`, `--svc-c` | `clamp(15px,11cqi,21px)` |
| Unit (`MI TO SERVICE` / `MI LEFT` / `MI OVERDUE` / `NO READING`) | 7.5px / `.17em` / `--dim` | same |
| Date window: date (`OCT 27`) | **20px** / `.05em` / `--ink` | 12.5px |
| Date window: small line (`TUE · EST. · ≈26 DAYS`) | 8px / `.16em` / `--dim` | 7.5px |
| Pace line | 500 9.5px / `--dim` | hidden |
| Basis line | 500 10px / 1.45 / `--etch` | 500 9px |
| Header (odometer) | 500 10.5px / `--dim`, figure `--mid` | — |
| Log rows | 500 10.5px / `--mid` | — |
| Epitaph (THAT LEG) | 9px / `.14em` / `--mid` | — |

### 2.3 Spacing and radii

- **Pods:** radius **12px**; padding `10px 10px 12px` (mini `8px 8px 10px`).
- **Gaps:** 8px between pods; 6px from dial to date window; 8px from date window to actions.
- **Date window:** radius 4px, padding `6px 12px 7px` (mini `4px 8px 5px`).
- **Buttons:** `.svc-btn` radius 6px, **min-height 44px** (house thumb law).
- **Telltale rail:** a 16px-radius pill, 32px tall.
- **Console:** radius 8px, padding 12px.

### 2.4 Light recipes

All static. Nothing animates a filter, shadow or blur, and no `backdrop-filter` is added (`.panel` already blurs).

```css
/* the pod = a recessed cluster pod behind a smoked, domed lens, face lit from below */
.svc-g{border:0;border-radius:12px;
  background:
    radial-gradient(140% 55% at 28% -8%, rgba(var(--wash),.055), transparent 46%),   /* domed-lens sheen */
    linear-gradient(180deg, rgba(0,0,0,.34), transparent 24%),                    /* the hood's shade */
    radial-gradient(120% 80% at 50% 108%, rgba(var(--wash),.05), transparent 62%),  /* face lit from below */
    var(--panel2);
  box-shadow:inset 0 1px 0 rgba(var(--wash),.07), inset 0 -1px 0 rgba(0,0,0,.45), inset 0 0 0 1px var(--line)}
.svc-g.overdue{box-shadow:inset 0 1px 0 rgba(var(--wash),.07), inset 0 0 0 1px rgba(var(--hot-rgb),.5)}
/* fill glow = a wide low-alpha stroke, never a filter */
.svc-glow{stroke:color-mix(in oklch,var(--svc-c) 22%,transparent);stroke-width:22}
/* lit lamp = static drop-shadow + a static pool of light on the lens */
.svc-g:is(.soon,.overdue) .svc-lamp{filter:drop-shadow(0 0 4px color-mix(in oklch,var(--svc-c) 70%,transparent))}
.panel:has(.svc-g.overdue){border-color:rgba(var(--hot-rgb),.4)}   /* the frame warms only if a tank is dry */
```

**Paper mode** reads as a gauge printed in a service manual:

```css
:root.paper .svc-g{background:var(--panel);box-shadow:inset 0 0 0 1px var(--line)}
:root.paper .svc-glow,:root.paper .svc-dial::before{display:none}
:root.paper .svc-g:is(.soon,.overdue) .svc-lamp{filter:none;fill:var(--svc-c)}
:root.paper .svc-leaf{background:rgba(var(--wash),.04);box-shadow:none}
```

---

## 3. The hero: the glance, and the reset that answers it

### 3.1 Spine first (tier 0; the page computes nothing)

Each change is a line or two in `board()` in `/Users/bryanhertzig/Almanac/spine/service.py`. I verified in the code that none of these is served today.

1. **Tie bug (fix first), line 154.** `reading["odometer"] >= done["odometer"]` keeps the dash reading when a DONE is logged at the same odometer, so the payoff would refill nothing. The newest entry must win:
   ```python
   if reading and (not done or (reading["odometer"], reading["id"]) > (done["odometer"], done["id"])):
   ```
2. **`riding: true`** on any item with no record of its own.
   - Today the axle lube is served as a 71%-full tank it never earned.
   - After an oil DONE without "axle lube too," it would refill to 100% falsely.
   - When riding, still serve the rider's `pct_left` and `miles_left` (it draws a ghost of them).
3. **`soon_pct = round(SOON_MILES / span, 4)`** per item, or null when there is no span. It places the reserve band.
4. **`span_est: true`** while oil runs on the 10,000 fallback.
5. **`odometer.age_days`** (by the spine's date) and **`odometer.est_stale`** (true when `age_days > 3`).
   - Null any `est_date` that would land before the spine's today.
6. **`pct_left: 0`** (or the negative value) when the dash reads 0%, never null over a known `miles_left`.
7. **`pace_why`**: the reason in words when `pace` is null, e.g. `"readings span 4 days — need 7"`.
8. **`est_days`** per item: days from the spine's today to `est_date`, null when `est_date` is null.
9. **`leg`** on each `done` row in `recent`: `{from_odometer, miles, days, loads}`.
   - It comes from that item's previous non-voided DONE.
   - Any part it can't say is `null`; the whole `leg` is `null` on a first DONE.
   - `loads` counts delivered loads in `almanac.db` between the two dates. **Confirm the loads date column before writing the query.** If unsure, serve `loads: null` and the page omits it.
   - The DONE response already returns `board()`, so the epitaph is true at t=0.

Prove every state against a **scratch copy** of almanac.db, never his live log.

### 3.2 The dial

Inline SVG in the `svcHTML` string. It has no ids, no `<defs>`, no gradients and no masks. One registered number, `--svc-f` (the served `pct_left`), drives the fill, the needle and the overrun. It uses `paintGauge`'s own 165.6° sweep (1.04π–1.96π), so it reads as the same instrument maker's cluster.

```css
@property --svc-f{syntax:"<number>";inherits:true;initial-value:1}
@property --svc-h{syntax:"<number>";inherits:false;initial-value:0}   /* the HOLD button's tank */
.svc{container:svc / inline-size}
.svc-g{container-type:inline-size;contain:layout paint;position:relative;min-width:0;
  display:flex;flex-direction:column;align-items:center;text-align:center;padding:10px 10px 12px}
.svc-dial{position:relative;width:100%;aspect-ratio:200/126;margin-top:4px}
.svc-g.hero .svc-dial{max-width:300px} .svc-g.mini .svc-dial{max-width:156px}
.svc-dial svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
/* scale with zero JS math: a dash pattern on a pathLength=100 ring (E ¼ ½ ¾ F majors, eighths minor) */
.svc-tk{fill:none;stroke:rgba(var(--wash),.34);stroke-width:7;stroke-dasharray:.7px 24.3px;stroke-dashoffset:.35px}
.svc-tk.mn{stroke:rgba(var(--wash),.13);stroke-width:4;stroke-dasharray:.5px 12px;stroke-dashoffset:.25px}
.svc-g.est .svc-tk{stroke-dasharray:.35px 1.2px}                  /* dotted scale = "not a dash reading" */
.svc-trk{fill:none;stroke:color-mix(in oklch,var(--svc-c) 9%,rgba(var(--wash),.06));stroke-width:12}
.svc-run{fill:none;stroke:rgba(var(--hot-rgb),.14);stroke-width:12;stroke-dasharray:1.4px 1.6px}
.svc-g.overdue .svc-run{stroke:rgba(var(--hot-rgb),.55)}          /* the overrun hatch lights only when overdue */
.svc-peg{fill:var(--etch)}
.svc-zn{fill:none;stroke:color-mix(in oklch,var(--amber) 60%,transparent);stroke-width:3;
  stroke-dasharray:calc(var(--svc-z,0) * 100px) 200px}
.svc-glow,.svc-fill{fill:none;stroke-linecap:butt;stroke-dasharray:100px 200px;
  stroke-dashoffset:calc((1 - clamp(0,var(--svc-f),1)) * 100px)}
.svc-fill{stroke:var(--svc-c);stroke-width:12}
.svc-ef{font:700 10px var(--mono);fill:var(--dim)}
.svc-nd{fill:var(--ink);transform-origin:100px 100px;
  transform:rotate(calc(187.2deg + clamp(-.12,var(--svc-f),1) * 165.6deg))}   /* pins on the peg past E */
.svc-nd.tip{fill:var(--svc-c)}                                   /* the one hot pixel: the lit tip */
.svc-read{position:absolute;left:14%;right:14%;top:36%;bottom:4%;display:grid;place-content:center;
  justify-items:center;pointer-events:none}
.svc-read b{font:700 clamp(26px,12cqi,46px)/1 var(--mono);letter-spacing:-.02em;color:var(--svc-c);
  font-variant-numeric:tabular-nums;text-box:trim-both cap alphabetic}
.svc-g.mini .svc-read b{font-size:clamp(15px,11cqi,21px)}
.svc-read i{margin-top:6px;font:700 7.5px/1 var(--mono);letter-spacing:.17em;color:var(--dim);font-style:normal}
/* unknown: no needle, no fill — dotted, and —— in words */
.svc-g.unk :is(.svc-nd,.svc-fill,.svc-glow,.svc-zn){display:none}
.svc-g.unk .svc-trk{stroke:var(--unknown);stroke-opacity:.55;stroke-dasharray:1.2px 1.8px}
/* riding: a dashed ghost of the truck's needle, never a tank of its own */
.svc-g.ride :is(.svc-fill,.svc-glow,.svc-nd.tip){display:none}
.svc-g.ride .svc-nd{fill:none;stroke:var(--mid);stroke-width:1;stroke-dasharray:2 2}
```

```js
const SVC_ARC = "M20.63 89.97A80 80 0 0 1 179.37 89.97",   // E→F, R80 (sweep-flag 1 so fill anchors at E)
      SVC_TKR = "M8.73 88.47A92 92 0 0 1 191.27 88.47",     // tick ring R92
      SVC_ZNR = "M32.54 91.48A68 68 0 0 1 167.46 91.48",    // reserve band R68
      SVC_RUN = "M21.96 117.59A80 80 0 0 1 20.63 89.97";    // past E to the peg (−12%)
function svcDial(big, unit, k, wit){
  return `<div class="svc-dial"><svg viewBox="0 0 200 126" aria-hidden="true">
    <path class="svc-tk mn" d="${SVC_TKR}" pathLength="100"/><path class="svc-tk" d="${SVC_TKR}" pathLength="100"/>
    <path class="svc-run" d="${SVC_RUN}"/><circle class="svc-peg" cx="21.96" cy="117.59" r="2.2"/>
    <path class="svc-trk" d="${SVC_ARC}"/><path class="svc-zn" d="${SVC_ZNR}" pathLength="100"/>
    <path class="svc-glow" d="${SVC_ARC}" pathLength="100"/><path class="svc-fill" d="${SVC_ARC}" pathLength="100"/>
    ${wit == null ? "" : `<path class="svc-wit" d="M187 100H199" style="--svc-w:${wit}"/>`}
    <text class="svc-ef" x="6" y="108">E</text><text class="svc-ef" x="187" y="108">F</text>
    <path class="svc-nd" d="M160 97.8L197 99.4V100.6L160 102.2Z"/>
    <path class="svc-nd tip" d="M186 98.9L197 99.4V100.6L186 101.1Z"/>
  </svg><svg class="svc-lamp" viewBox="0 0 24 24" aria-hidden="true"><path d="${SVC_ICON[k] || ""}"/></svg>
  <div class="svc-read"><b>${big}</b><i>${unit}</i></div></div>`;
}
```

**Dial gotchas:**
- Use px units inside every dash `calc()`.
- Keep caps `butt`, because a round cap paints a blob at E on an empty tank.
- The overrun is visual only. The printed figure is always the served `miles_left`.
- If `@property` is unsupported, the unregistered property still substitutes, so the static gauge stays correct.

### 3.3 The lamp lives at E

It works like the pump icon beside E on a fuel gauge. The item's glyph is both the dial's legend and its telltale.

```js
const SVC_ICON = {   // self-drawn, 24-box, stroke-only — tune by eye at 13px and 18px
  oil_change:    "M3 9h7l2 2h5l4-3v2l-5 5H6a3 3 0 0 1-3-3zM7 9V7h3M21 16a1 1 0 1 1-2 0c0-.8 1-2 1-2s1 1.2 1 2z",
  tire_rotation: "M20 12a8 8 0 1 1-2.3-5.7M20 4v4h-4M12 9a3 3 0 1 0 0 6a3 3 0 1 0 0-6z",
  axle_lube:     "M4 19h16M12 4s4 4.6 4 7.6a4 4 0 0 1-8 0C8 8.6 12 4 12 4z" };
```

```css
.svc-lamp{position:absolute;left:13%;bottom:9%;width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:1.8;
  stroke-linecap:round;stroke-linejoin:round;color:var(--etch);opacity:.5;pointer-events:none}
.svc-g.mini .svc-lamp{width:13px;height:13px}
.svc-dial::before{content:"";position:absolute;inset:0;pointer-events:none;opacity:0;
  background:radial-gradient(34% 42% at 19% 84%, color-mix(in oklch,var(--svc-was,var(--svc-c)) 30%,transparent), transparent 72%)}
.svc-g:is(.soon,.overdue) .svc-dial::before{opacity:1}
.svc-g:is(.soon,.overdue) .svc-lamp{color:var(--svc-c);opacity:1}
.svc-g.ride .svc-lamp{/* follows the stop it rides: served status already equals the oil's */}
```

### 3.4 The date window (his exact complaint)

It is a recessed day-date aperture with the almanac's red rule across the top. The page prints served dates and never computes one.

```js
const SVC_MON = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
/* noon anchor: a bare ISO date parses as UTC midnight and prints YESTERDAY in Ohio */
function svcDay(iso){ const t = new Date(String(iso || "").slice(0,10) + "T12:00");
  return isNaN(t) ? null : {d: SVC_MON[t.getMonth()] + " " + t.getDate(),
    w: t.toLocaleDateString("en-US",{weekday:"short"}).toUpperCase()}; }
```

| State | Big line | Small line |
|---|---|---|
| ok / soon, pace known | `OCT 27` | `TUE · EST. · ≈26 DAYS` (served `est_days`; omit the `≈` part when null) |
| no pace | `——` | served `pace_why`, truncated to one line |
| overdue | `OVERDUE` in `--hot` | `WAS DUE AT 134,200` (served `due_at`) |
| unknown | `——` | `NO READING` |
| odometer stale (`odometer.est_stale`) | served date, or `——` if the spine nulled it | `EST. FROM ODO OF SEP 20`; the frame turns dashed |

```css
.svc-leaf{display:inline-grid;justify-items:center;gap:3px;margin-top:6px;padding:6px 12px 7px;perspective:300px;
  border:1px solid var(--line);border-top:2px solid rgba(var(--hot-rgb),.7);border-radius:4px;
  background:rgba(0,0,0,.22);box-shadow:inset 0 2px 4px rgba(0,0,0,.35)}
.svc-leaf b{font:700 20px/1 var(--mono);letter-spacing:.05em;color:var(--ink)}
.svc-leaf i{font:700 8px/1 var(--mono);letter-spacing:.16em;color:var(--dim);font-style:normal;white-space:nowrap}
.svc-g.mini .svc-leaf{padding:4px 8px 5px} .svc-g.mini .svc-leaf b{font-size:12.5px} .svc-g.mini .svc-leaf i{font-size:7.5px}
.svc-g.overdue .svc-leaf b{color:var(--hot)}
.svc.stale .svc-leaf{border-style:dashed;border-top-style:solid}
```

### 3.5 The memo: honest animation across wholesale re-renders

The base value written inline is **always the truth**. Every animation is a cancellable WAAPI overlay with `fill:"backwards"`, and both keyframes are literal. That matters for two reasons: a lone keyframe is the end, not the start, and Firefox bug 1899531 animates `var()` in keyframes discretely.

```js
const SVC = { open:null, err:null, shown:{}, lit:{}, ride:{}, hold:null, topoff:null, prev:null, woke:false,
              anims:[], holds:new Set(), timers:new Set(), io:null, buzzing:false };
const svcRM   = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const svcLite = () => (navigator.hardwareConcurrency||8) <= 4 || (navigator.deviceMemory||8) <= 4;
const svcT    = (fn, ms) => { const t = setTimeout(() => { SVC.timers.delete(t); fn(); }, ms); SVC.timers.add(t); };
const SVC_LIN = (() => { try{ return CSS.supports("transition-timing-function","linear(0,1)"); }catch(_){ return false; } })();
const SVC_OUT = "cubic-bezier(.16,1,.3,1)";                     // house CM_ARRIVE / bik --ease-out
function svcAnim(g, from, to, {ms, delay = 0, easing = SVC_OUT} = {}){
  if(!g.animate || svcRM() || document.hidden) return null;
  try{ const a = g.animate([{"--svc-f": from}, {"--svc-f": to}], {duration: ms, delay, easing, fill: "backwards"});
       SVC.anims.push(a); a.finished.catch(() => {}); return a; }catch(_){ return null; }
}
function svcTeardown(){
  SVC.anims.forEach(a => { try{
    const g = a.effect && a.effect.target;
    if(g && g.dataset && g.dataset.k && a.playState === "running"){          // a fill cut short RESUMES, never restarts
      const v = parseFloat(getComputedStyle(g).getPropertyValue("--svc-f")); if(!isNaN(v)) SVC.shown[g.dataset.k] = v; }
    a.cancel(); }catch(_){} });
  SVC.anims = [];
  SVC.holds.forEach(a => { try{ a.cancel(); }catch(_){} }); SVC.holds.clear();
  if(SVC.timers.size){ SVC.hold = null; SVC.topoff = null; }               // a cut payoff lands on the truth
  SVC.timers.forEach(clearTimeout); SVC.timers.clear();
  if(SVC.io){ SVC.io.disconnect(); SVC.io = null; }
  if(SVC.buzzing){ try{ navigator.vibrate?.(0); }catch(_){} SVC.buzzing = false; }
}
document.addEventListener("visibilitychange", () => {
  if(!document.hidden) return;
  SVC.holds.forEach(a => { try{ a.cancel(); }catch(_){} });   // CANCEL holds first — finishing one would log an oil change nobody held
  SVC.anims.forEach(a => { try{ a.finish(); }catch(_){} });   // the truth is the base value; finishing only skips to it
  try{ navigator.vibrate?.(0); }catch(_){}
});
addEventListener("pagehide", svcTeardown);
```

**Wire-in points:**
- In `renderRoom`, add `svcTeardown();` next to `lrTeardown(); cmTeardown();`, **before** the `innerHTML` assignment.
- Call `wireSvc()` where it is called today (the standing room's else-arm next to `paintGauge()`). Its last line is `svcPlay()`.

### 3.6 The signature: THE RESET

| t | What happens |
|---|---|
| DONE tap | Opens the **service console** (§4.8). The odometer is prefilled with the served reading and has a real `id`. |
| **HOLD TO LOG** | A press-and-hold of 520 ms. The button's face fills left to right in key orange (`--svc-h` 0→1), with an 8 ms tick on contact. Releasing early drains it back, and nothing is sent. **The hold fills the button, never the needle.** Its `finished` promise *is* the commit. |
| latch | The button reads `LOGGING…` and is disabled. Nothing else moves. |
| 2xx | Run in this order: `State.hotshot.service = o.service` (the truth lands first); `SVC.open = null`; `SVC.topoff = {main, riders}`; `SVC.hold = main`; then `renderRoom()`. |
| t=0 | The big figure is already the new served miles. The plate reads `LOGGED · 125,340`, never NEXT, which would be false during the hold. |
| 0 → `ms` | The needle climbs to F in **detents**, one per quarter-tank actually restored. Logged overdue, one extra first detent lifts it off the peg back to E. Each detent gets an 8 ms haptic. A ticked rider follows **120 ms behind**, like the trailer following the truck; if it was a ghost, its fill fades in solid as it climbs (§4.6). |
| `ms` (the seat) | No overshoot. A **26 ms thunk**: the pump clicking off. |
| seat → +750 ms | **The lamp goes out as a filament** (§8, moment 1). The pool of light on the lens fades 90 ms behind it. The date window flips down to the new served date. |
| seat + 180 ms | The epitaph rises under the leaf: `THAT LEG · 9,180 MI · 31 DAYS · 27 LOADS` (served `leg`; nulls omitted; loads only if served). On a first DONE it reads `FIRST ON RECORD — THE BOOK STARTS HERE`. |
| seat + 1,400 ms | `SVC.hold` and `SVC.topoff` clear, then `svcMutate(renderRoom)`. The spine's new `next.keys[0]` glides into the hero slot through a view transition. |

```js
/* targets: detent stops as progress 0..1 of from→to. Overdue gets a first stop at E. */
function svcDetents(from, to){
  const base = Math.max(0, from), n = Math.max(1, Math.round((to - base) * 4)), stops = [];
  if(from < 0) stops.push((0 - from) / (to - from));
  for(let i = 1; i <= n; i++) stops.push((base + (to - base) * i / n - from) / (to - from));
  return stops;
}
/* climb 75% of each stroke's time, hold 25% — the pump's rhythm */
function svcStrokeEase(stops){
  const p = ["0 0%"], N = stops.length;
  stops.forEach((s, i) => p.push(`${s.toFixed(4)} ${((i + .75) / N * 100).toFixed(2)}%`, `${s.toFixed(4)} ${((i + 1) / N * 100).toFixed(2)}%`));
  return `linear(${p.join(",")})`;
}
function svcBuzz(N, ms){                         // Android (Fold/S25); iOS no-ops. Activation came from the hold.
  if(svcRM() || !navigator.vibrate) return;
  const pat = [0]; let t = 0;
  for(let i = 1; i <= N; i++){ const at = Math.round((i - .25) / N * ms), len = i === N ? 26 : 8;
    pat.push(Math.max(0, at - t), len); t = at + len; }
  try{ navigator.vibrate(pat); SVC.buzzing = true; svcT(() => { SVC.buzzing = false; }, ms + 60); }catch(_){}
}
function svcPlay(){                               // END of wireSvc()
  const top = SVC.topoff; let armed = false;
  document.querySelectorAll(".svc .svc-g[data-from]").forEach(g => {
    const from = +g.dataset.from, to = +g.style.getPropertyValue("--svc-f");
    const pump = top && (top.main === g.dataset.k || top.riders.has(g.dataset.k)) && to > from;
    if(!pump){ svcAnim(g, from, to, {ms: Math.min(900, 300 + Math.abs(to - from) * 1200)}); return; } // drain/reading/void
    const stops = svcDetents(from, to), ms = +g.dataset.dur;                                      // dur emitted by svcGauge
    const rider = top.main !== g.dataset.k;
    svcAnim(g, from, to, {ms, delay: rider ? 120 : 0, easing: SVC_LIN ? svcStrokeEase(stops) : SVC_OUT});
    if(!rider){ svcBuzz(stops.length, ms);
      if(!armed){ armed = true; svcT(() => { SVC.hold = null; SVC.topoff = null; svcMutate(renderRoom); }, ms + 1400); } }
  });
  if(top && !armed) svcT(() => { SVC.hold = null; SVC.topoff = null; svcMutate(renderRoom); }, 1400); // nothing pumped (already full)
}
```

**`svcGauge` must emit `data-dur` and inline `--svc-dur`** on the render where the memo knows `was` and `f`, so CSS delays start true on the first style pass. For a pump, the duration is `260·N + 200` ms, where N is `svcDetents(was,f).length`. For a drain, use the drain formula. This is motion-only arithmetic and is never printed.

**The `svcPost` success branch:**

```js
if(State.hotshot) State.hotshot.service = o.service;
SVC.open = null;
const n = v => Math.round(+v).toLocaleString();
if(path.endsWith("/done") && !svcRM() && !document.hidden){
  SVC.topoff = {main: body.item, riders: new Set(body.also || [])};
  SVC.hold = body.item;
  renderRoom();                                   // svcPlay arms the release; nothing armed here
} else { SVC.topoff = SVC.hold = null; renderRoom(); }
toast(path.endsWith("/done") ? `logged — ${body.item.replace(/_/g," ")} at ${n(body.odometer)}`
    : path.includes("oil-life") ? "dash reading logged" : "voided");
```

**HOLD TO LOG.** Holds live in `SVC.holds`, never in `SVC.anims`.

```js
function svcHold(btn, commit){
  let h = null;
  const go = () => { if(btn.disabled) return; btn.disabled = true; btn.textContent = "LOGGING…"; commit(); };
  const stop = () => { if(h){ try{ h.cancel(); }catch(_){} SVC.holds.delete(h); h = null; } };
  btn.addEventListener("contextmenu", e => e.preventDefault());
  btn.addEventListener("pointerdown", e => {
    e.stopPropagation();
    if(e.button !== 0 || h || btn.disabled) return;
    try{ btn.setPointerCapture(e.pointerId); }catch(_){}
    let a = null;
    try{ a = btn.animate([{"--svc-h":0},{"--svc-h":1}], {duration:520, easing: svcRM() ? "steps(4,end)" : "linear"}); }catch(_){}
    if(!a || !a.finished) return go();                      // no WAAPI: the tap is the act
    h = a; SVC.holds.add(a); if(!svcRM()) try{ navigator.vibrate?.(8); }catch(_){}
    a.finished.then(() => { SVC.holds.delete(a); h = null; go(); }, () => SVC.holds.delete(a));
  });
  ["pointerup","pointercancel","lostpointercapture"].forEach(t => btn.addEventListener(t, stop));
  btn.addEventListener("click", e => { e.stopPropagation(); if(e.detail === 0) go(); });  // keyboard / AT: already deliberate
}
```

```css
.svc-btn.hold{min-height:44px;padding:0 18px;touch-action:none;-webkit-touch-callout:none;user-select:none;
  border-color:rgba(var(--key),.7);color:var(--ink);
  background:linear-gradient(90deg,rgba(var(--key),.34) calc(var(--svc-h) * 100%),var(--panel2) 0)}
.svc-btn.hold[disabled]{--svc-h:1;opacity:.75}
```

**Kill switch.** One constant, `const SVC_HOLD = true;`. If UAT says the hold feels like a chore, set it to `false`: the button becomes a plain tap (`LOG IT`), and the reset still plays in full.

**The oil-life SAVE READING stays a plain tap.** A reading is an observation, not a reset, and only resets are held.

### 3.7 Cleanup contract

Everything that can outlive a render is released in `svcTeardown`:
- **Animation objects** (`SVC.anims`): cancelled, with the mid-flight value captured into `SVC.shown`.
- **Holds** (`SVC.holds`): cancelled.
- **Timers** (`SVC.timers`, every `setTimeout` goes through `svcT`): cleared, which drops the hold and topoff.
- **The IntersectionObserver** (`SVC.io`): disconnected.
- **Vibration**: `navigator.vibrate(0)`.

There is **no `requestAnimationFrame`, no AudioContext and no loop** anywhere. Teardown also runs on `pagehide`; `visibilitychange` (hidden) cancels holds and finishes anims.

Do not call `skipTransition()` in teardown, because `renderRoom` runs inside the view transition's own update callback.

---

## 4. Component build notes (first-impression order)

### 4.1 The telltale rail: the glance before any scroll

The clock is the sixth panel in `.rgrid`, several scrolls down on a phone. The rail sits in the first viewport of every hotshot view.

- **Markup:** one `button.svc-tt` appended to `hsBar`'s output under the seg row, right-aligned.
- **Content:**
  - three glyph lamps in served order: next-due ones in `--ink`, the rest in `--etch`; lit ones in amber or hot by served `status`;
  - then `<b>9,200 MI</b> · OCT 27 EST` from served `next.miles_left` and `next.est_date`;
  - an unknown prints `——`;
  - roughly 190px, which fits 331px.
- **Tap:**
  1. `stopPropagation`.
  2. If not on the standing view, switch to it with the same state change the seg's standing button makes (read `hsBar` for the exact handler), then `renderRoom()`.
  3. Scroll `.rgrid` **with `scrollTo`, never `scrollIntoView`**:
     ```js
     const sc = document.querySelector(".rgrid"), p = sc && sc.querySelector(".svc");
     if(p) sc.scrollTo({top: sc.scrollTop + p.getBoundingClientRect().top - sc.getBoundingClientRect().top - 8,
                        behavior: svcRM() ? "instant" : "smooth"});
     ```
- **Accessibility:** `aria-label="Service clock: oil change next, 9,200 miles, estimated October 27"`, built from served fields.
- **It never animates.** Colour comes from served status only.

```css
.svc-tt{display:flex;align-items:center;gap:6px;margin:6px 0 0 auto;min-height:32px;padding:4px 11px;border-radius:16px;
  border:1px solid var(--line);background:rgba(var(--wash),.03);font:700 10px/1 var(--mono);letter-spacing:.1em;color:var(--mid);cursor:pointer}
.svc-tt svg{width:15px;height:15px;fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round;color:var(--etch);opacity:.55}
.svc-tt svg.nx{color:var(--ink);opacity:1}
.svc-tt svg.soon{color:var(--amber);opacity:1} .svc-tt svg.overdue{color:var(--hot);opacity:1}
.svc-tt.soon b{color:var(--amber)} .svc-tt.overdue b{color:var(--hot)}
```

### 4.2 The panel shell and header

- **Shell:** keep `<div class="panel" style="grid-column:1 / -1">`, the cap `THE TRUCK · SERVICE CLOCK` and `readLine(["hotshot"])`. The inner root is `<div class="svc${stale ? " stale" : ""}">`.
- **Missing payload:** keep the existing `nodata` line.
- **Header (trip-computer line):**
  ```
  ODO 125,000 ● DASH SNAP · SEP 29
  ```
  - The `●` is a 6px ink dot when fresh.
  - When `odometer.est_stale`, it becomes a hollow amber ring, and the line appends `· READ 9 DAYS AGO — SNAP THE DASH` in `--amber`, using served `age_days`.

### 4.3 Deck layout

`svcHTML` builds, in DOM order:
- `.svc-deck` containing the hero pod, the console (if open), and `.svc-minis`;
- then THE LOG.

**Who is the hero:**
- `hero = SVC.hold || sv.next?.keys?.[0] || items[0]?.key`.
- `mates` = the other `next.keys`, empty while a hold is on.
- Minis = every other item in served order.

**The page never ranks.**

```css
.svc-deck{display:grid;gap:8px;grid-template-columns:minmax(0,1fr)}
.svc-minis{display:grid;gap:8px;grid-template-columns:repeat(2,minmax(0,1fr))}
@container svc (min-width:560px){
  .svc-deck{grid-template-columns:minmax(0,1.25fr) minmax(0,1fr)}
  .svc-minis{grid-template-columns:minmax(0,1fr)}
  .svc-con{grid-column:1 / -1;order:9}            /* desktop: console spans below the deck */
}
.svc:has(.svc-con) .svc-g:not(.asking){opacity:.6}   /* hands on a form → the rest steps back */
```

- **Phone:** the hero's console renders between the hero and the minis, so the needle that is about to move stays above his thumb.
- **Minis:** a mini's console renders after `.svc-minis`.

### 4.4 The pod: `svcGauge(it, role, {mates, sv})`

It is a memo diff plus markup. Emitted classes:
- `svc-g hero|mini` plus `ok|soon|overdue` (served) or `unk`;
- `ride` (served `riding`), `est` (served `span_est`);
- `lampout` / `lampon` / `moved` / `own` (memo);
- `asking` when its console is open.

```js
function svcGauge(it, role, {mates = [], sv}){
  const k = it.key, f = it.pct_left, unk = f == null, n = v => v == null ? "——" : Math.round(v).toLocaleString();
  const was = SVC.shown[k], moved = !unk && was != null && Math.abs(was - f) > .002;
  const litNow = it.status === "soon" || it.status === "overdue";
  const lampOut = SVC.lit[k] && !litNow, lampOn = SVC.lit[k] === false && litNow;   // crossings only; first render = no event
  const own = SVC.ride[k] === true && !it.riding;
  const wasC = lampOut ? (SVC.lit[k] === "overdue" ? "var(--hot)" : "var(--amber)") : "";
  SVC.shown[k] = unk ? null : f; SVC.lit[k] = litNow ? it.status : false; SVC.ride[k] = !!it.riding;
  const top = SVC.topoff, pump = moved && top && (top.main === k || top.riders.has(k)) && f > was;
  const dur = !moved ? 0 : pump ? 260 * svcDetents(was, f).length + 200 : Math.min(900, 300 + Math.abs(f - was) * 1200);
  const held = SVC.hold === k, left = it.miles_left;
  const big = left == null ? "——" : n(Math.abs(left));
  const unit = left == null ? "NO READING" : left < 0 ? "MI OVERDUE" : it.riding ? "MI · WITH OIL" : role === "hero" ? "MI TO SERVICE" : "MI LEFT";
  // … date window per §3.4, witness per §4.7, epitaph per §4.5, aria per §7 …
}
```

The plate (top-left, `padding-right:0`, since the lamp now lives at E) reads:
- **Hero:** `[NEXT] OIL CHANGE`, then `+ TRAILER AXLE LUBE · SAME STOP` from `mates`.
- **Held:** `[LOGGED · 125,340]` (outline tag).
- **Rider:** `RIDES WITH OIL CHANGE · NONE ON RECORD`.

```css
.svc-plate{align-self:stretch;text-align:left;font:700 10px/1.35 var(--mono);letter-spacing:.12em;color:var(--mid);text-transform:uppercase}
.svc-g.hero .svc-plate{font-size:12px;color:var(--ink)}
.svc-tag{display:inline-block;margin-right:7px;padding:3px 6px;border-radius:3px;font:700 8px/1 var(--mono);
  letter-spacing:.16em;color:var(--void);background:var(--svc-c)}
.svc-tag.done{background:none;color:var(--mid);border:1px solid var(--line)}
.svc-with{display:block;margin-top:3px;font:600 9px/1.3 var(--mono);letter-spacing:.1em;color:var(--dim)}
@supports (corner-shape:bevel){ .svc-tag{corner-shape:bevel;border-radius:4px} }
```

Under the leaf:
- **Hero only:** a pace line, `at 354 mi/day · 08-16 → 09-29`, or the served `pace_why`.
- **Every pod:** the basis line in `--etch`, e.g. `dash read 71% · 9,200 mi left at 125,000`, or on the estimate `est. 10,000 until a dash reading`.
- **Actions:** `DONE` on every pod; `OIL LIFE READING` on the oil pod (hero or mini). Buttons are 44px, `data-open="${k}:done|oil"`, with `stopPropagation`.

### 4.5 The epitaph (THAT LEG)

- **When:** emitted inside the pod **only while `SVC.hold === k`**, from `sv.recent` (the first non-voided `done` row for k) and its `leg`.
- **Format:**
  - `THAT LEG · ${n(leg.miles)} MI · ${leg.days} DAYS${leg.loads != null ? " · " + leg.loads + " LOADS" : ""}`
  - any null part is omitted;
  - `leg == null` prints `FIRST ON RECORD — THE BOOK STARTS HERE`.
- **Afterwards:** the same text lives on as that row in THE LOG, so it persists after the hold.

```css
.svc-leg{margin-top:5px;font:700 9px/1.3 var(--mono);letter-spacing:.14em;color:var(--mid)}
@keyframes svc-leg{from{opacity:0;transform:translateY(6px)}}
.svc-g.moved .svc-leg{animation:svc-leg .5s var(--svc-ease) calc(var(--svc-dur,0ms) + 180ms) backwards}
```

### 4.6 The rider pod (trailer axle lube)

- **While served `riding`:**
  - a dashed `--mid` ghost of the oil needle (it reads the rider's served `pct_left`, which equals the oil's);
  - no fill, glow or tip;
  - the number is served miles with the unit `MI · WITH OIL`, and the leaf shows the served date;
  - its lamp follows served status.
- **In a drain or a reset,** it animates 120 ms after the oil (in `svcPlay`, `delay:120` whenever k is a rider of the main).
- **First "axle lube too" log:** the spine drops `riding`. The memo sees `ride → own` and emits `own`, so the fill fades in solid during the climb. The trailer gets its own tank.
  ```css
  @keyframes svc-own{from{opacity:0}}
  .svc-g.own :is(.svc-fill,.svc-glow,.svc-nd.tip){animation:svc-own .6s var(--svc-ease) 120ms backwards}
  ```
- **After an oil DONE without the box:** the spine keeps `riding` and the ghost follows oil back to F. That is honest: the lube is still due at the next oil stop, which the served `due_at` states.

### 4.7 The witness needle (tier 3)

- **Storage:** `localStorage["svc.seen"] = {odo, pct:{k:v}}`, the served values, written after each render while the deck has been seen. It is read **once per page load** into `SVC.prev`, and every access is wrapped in try/catch.
- **When it draws:** a 1.4px `--mid` hairline across the R92 ring at `SVC.prev.pct[k]`, only when
  - `SVC.prev.odo < odometer.miles`, and
  - `SVC.prev.pct[k] - f > .01` (a drain, never after a reset).
- **Legend:** the hero's basis line gains `╎ last look at 124,310`, the stored *served* odometer.

```css
.svc-wit{stroke:var(--mid);stroke-width:1.4;opacity:.7;transform-origin:100px 100px;
  transform:rotate(calc(187.2deg + clamp(-.12,var(--svc-w),1) * 165.6deg))}
```

### 4.8 The service console (forms)

- **Container:** `.svc-con`, one per open form.
  - Header: the glyph plus `OIL CHANGE · DONE AT`.
  - Radius 8, background `rgba(0,0,0,.22)`, border `1px solid var(--line)`.
- **Inputs:** 44px tall, `font:700 16px var(--mono)` (16px stops iOS zoom), `inputmode="numeric"`, `user-select:text`, and **ids** so `renderRoom` restores focus and the Fold keyboard stays up:
  - `svc-odo-in`, prefilled with the served `odometer.miles`;
  - `svc-pct-in` and `svc-left-in` on the reading form.
- **Class rename:** `.sm` becomes `.svc-pct` to escape the global `.sm` collision.
- **"Axle lube too":** a 44px rocker styled over a real `<input type="checkbox" id="svc-also" name="also" value="axle_lube" checked>`.
- **Buttons:** `CANCEL` on the left; `HOLD TO LOG` on the right (DONE form), or `SAVE READING` as a plain tap (oil form).
- **Errors:** the spine's own words in `--hot` under the field (`SVC.err`).
- **Hooks:** keep the existing `data-f`, `data-k` and `data-save` hooks, so `svcPost` is unchanged apart from §3.6.
- **Scope:** `wireSvc` queries from `document.querySelector(".svc")`, never `document`.

### 4.9 THE LOG

- **Replaces:** `recent`, capped at four rows, with a hairline rule above it.
- **Row formats:** odometer first, because it's the truck's own clock.
  - `125,340 · SEP 29 · OIL CHANGE DONE`
  - then on its own line in `--dim`: `that leg 9,180 mi · 31 days`
  - dash readings: `125,000 · SEP 29 · DASH 71% · 9,200 LEFT`
- **`void`:** stays as is (a typo is voided, never deleted). A void gets a quiet drain, no haptic and no celebration.

---

## 5. Motion spec

```css
.svc{--svc-ease:cubic-bezier(.16,1,.3,1)}   /* expo-out, the house CM_ARRIVE. NO spring on any needle or number. */
```

| Moment | Keyed to | What moves | Timing / easing | Haptic |
|---|---|---|---|---|
| **Rest** | — | nothing | — | — |
| **Key-on** | first sight per page load: IO on the hero `.svc-dial`, threshold .5, then disconnect | dials' opacity .25→1 (240 ms); needles run from `SVC.prev` (the road since the last look) down to the truth, or rise from E with no memory; 90 ms stagger via `delay:i*90` | 240 ms, then `300 + Δ·1200` ms (≤900), expo-out | none |
| **Drain** | memo: served pct fell (snap, poll, reading) | the needle eases to the truth | `300 + Δ·1200` ms (≤900), expo-out | none |
| **Lamp on** | memo: crossed into soon / overdue | soon: a 200 ms warm-up (opacity 0→1); overdue: 3 blinks over 0.7 s, `step-end`, then steady | — | none |
| **Hold** | his thumb | the button face fills | 520 ms linear (reduced motion: `steps(4,end)`) | 8 ms on contact |
| **Reset** | DONE 2xx | detents, rider +120 ms, seat | `260·N + 200` ms, generated `linear()` (fallback expo-out) | 8 ms per detent, 26 ms seat |
| **Lamp out** | memo: was lit, now ok | filament decay, then the pool fades | .75 s `cubic-bezier(.2,0,.1,1)` at `--svc-dur`; pool 1.1 s at `--svc-dur` + 90 ms | — |
| **Leaf flip** | a moved gauge with a date | `rotateX(-88deg)→0`, `transform-origin:50% 0` | .42 s expo-out at `--svc-dur` | — |
| **Epitaph** | a hold render | fade and rise 6px | .5 s expo-out at `--svc-dur` + 180 ms | — |
| **Handoff** | armed in `svcPlay` at `ms + 1400` | view-transition morph of the pods | .45 s expo-out | — |

```css
@keyframes svc-turn{from{transform:rotateX(-88deg);opacity:0}}
@keyframes svc-warm{from{opacity:0}}
@keyframes svc-blink{0%,33%,66%{opacity:1}16%,50%,83%{opacity:.15}}
.svc-g.moved .svc-leaf.turn{transform-origin:50% 0;animation:svc-turn .42s var(--svc-ease) var(--svc-dur,0ms) backwards}
.svc-g.soon.lampon .svc-lamp{animation:svc-warm .2s ease-out}
.svc-g.overdue.lampon .svc-lamp{animation:svc-blink .7s step-end}
@media (prefers-reduced-motion: reduce){ .svc,.svc *,.svc-dial::before{animation:none !important} }
```

**Every entry effect is memo-gated** (`moved`, `lampout`, `lampon`, `own`, `turn`). There is no ungated `@starting-style`, because it replays on every `innerHTML` insert: opening a form would replay it.

### View transition (hero handoff)

```js
function svcMutate(go){
  const h = document.querySelector(".svc-g.hero"), sc = h && h.closest(".rgrid");
  const r = h && h.getBoundingClientRect(), s = sc && sc.getBoundingClientRect();
  const inView = r && s && r.top >= s.top && r.bottom <= s.bottom;
  if(!document.startViewTransition || svcRM() || svcLite() || document.hidden || !inView) return go();
  let vt; try{ vt = document.startViewTransition({update: go, types: ["svc"]}); }catch(_){ vt = document.startViewTransition(go); }
  [vt.finished, vt.ready, vt.updateCallbackDone].forEach(p => p.catch(() => {}));
}
```

```css
:root:active-view-transition-type(svc) .svc-g{view-transition-name:var(--svc-vt);view-transition-class:svc}
:root:active-view-transition-type(svc)::view-transition-old(root),
:root:active-view-transition-type(svc)::view-transition-new(root){animation:none}
::view-transition-group(*.svc){animation-duration:.45s;animation-timing-function:cubic-bezier(.16,1,.3,1)}
```

Each pod carries inline `--svc-vt:svc-${k}`. The names are unique because each key renders once. Don't use `match-element`: `innerHTML` makes new elements every render, so nothing would match.

---

## 6. Phone spec

- **Breakpoint:** one container query, `@container svc (min-width:560px)`. There are no viewport queries.
- **Phone (panel ≈331px):**
  - hero full width: dial ≈290px, figure ≈38px, date 20px;
  - minis in two columns of ≈158px each: dial ≈140px, figure ≈18px, date 12.5px;
  - the console goes directly under the pod that asked.
- **≥560px (Fold 7 open, desktop ≈760px):**
  - hero on the left at 1.25fr, minis stacked on the right;
  - the console and THE LOG span both columns.
- **Reach:**
  - every action sits at the bottom of its pod;
  - `HOLD TO LOG` sits at the console's lower right;
  - every target is at least 44px;
  - the only thing at the top is the read-only rail, which he taps once.
- **The hero on narrow screens:** figure, date window and needle angle are the three reads.
  - The pace and basis lines wrap to two lines at most and never push the buttons off-pod.
  - Plate text truncates with an ellipsis before it can collide with the dial.
- **Glare and gloves:**
  - ink at 700 on deep glass;
  - status carried without colour (needle angle, lamp shape, and the words OVERDUE / NO READING / RIDES WITH OIL);
  - the hold's pointer capture forgives a greasy thumb, and `touch-action:none` means a scroll attempt cancels the hold rather than stealing it.
- **Glance budget:** rail plus one tap is under 2 s per glance, within the NHTSA guideline. Designed for a stop, never mid-drive.
- **Haptics:** Android only. iOS is silent, and nothing depends on it.

---

## 7. Performance and accessibility budget

### At rest
- Zero timers, zero rAF, zero loops, zero observers once seen.
- About 25 SVG nodes per pod, with `contain:layout paint` per pod.

### On change
- Style recalc and SVG repaint for three small subtrees for at most about 2.9 s (a four-detent reset plus the lamp decay).
- Only `--svc-f`, `--svc-h`, `color`, `opacity` and `transform` animate. `filter`, `box-shadow` and blur never animate.

### Cleanup checklist
Verify each with DevTools:
- [ ] `svcTeardown()` in `renderRoom` before `innerHTML`, and on `pagehide`.
- [ ] `SVC.anims` is empty after teardown; `SVC.holds` is empty; `SVC.timers.size === 0`; `SVC.io === null`.
- [ ] `vibrate(0)` whenever a pattern was running.
- [ ] Hidden page: holds are **cancelled** (not finished) and anims finished. Test by backgrounding mid-hold: nothing is logged.
- [ ] A poll landing mid-reset resumes from the captured value and lands true.
- [ ] Opening or closing a console replays no animation.
- [ ] No `requestAnimationFrame` and no `AudioContext` string in the diff.

### Reduced motion
- The CSS `animation:none` block, plus the JS gates in `svcAnim`, `svcBuzz` and `svcMutate`.
- No hold slot (`svcPost` skips topoff and hold), no key-on, no view transition.
- The hold keeps its 520 ms (it is a gesture, not decoration) but fills in 4 steps.
- The epitaph still prints (render the `.svc-leg` in the pod when reduced motion is on and the latest row is a fresh DONE; the memo already knows this) and the toast still speaks.

### Other preferences
- `prefers-reduced-transparency`: hide `.svc-glow`, the sheen layers and `.svc-dial::before`.
- `prefers-contrast: more`: `.svc-tk{stroke-width:10}`, a thicker needle (`transform` unchanged; path `M160 97L197 99V101L160 103Z`), no glow.
- `forced-colors: active`: `.svc-fill,.svc-nd{stroke:CanvasText;fill:CanvasText}`, lit lamp `color:Mark`.

### Accessibility
- **Known gauge:** `role="meter" aria-labelledby="svc-l-${k}" aria-valuemin="0" aria-valuemax="100"`, `aria-valuenow` = clamped pct·100, and `aria-valuetext` = `"Oil change: 9,200 miles left, due at 134,200, estimated Tuesday October 27"`.
- **Unknown gauge:** `role="img"` with `aria-label` = `"… unknown — <basis>"`. A meter without a value lies to a screen reader.
- **Toast:** add `role="status" aria-live="polite"` to the global `#toast` at `desk.html:2279`. The re-rendered room can't hold its own live region.
- **Grayscale test** must pass for every state in the honesty ledger.

### Honesty ledger (every state renders exactly this)

| State | Dial | Figure | Date window | Lamp |
|---|---|---|---|---|
| ok | ink fill to the needle | `9,200 MI TO SERVICE` | `OCT 27 / TUE · EST. · ≈26 DAYS` | dark |
| soon | amber fill, needle in the reserve band | amber | served | amber, with pool |
| overdue | empty arc, needle on the peg, hatch lit | `1,240 MI OVERDUE`, hot | `OVERDUE / WAS DUE AT 134,200` | hot; the frame warms |
| unknown | dotted track, no needle | `—— NO READING` | `——` | dark |
| riding | dashed ghost, no fill | served miles `MI · WITH OIL` | served | follows its stop |
| estimated scale | dotted ticks | served | served | per status |
| no pace | unchanged | served | `——` / `pace_why` | per status |
| stale odometer | unchanged | served | dashed frame, `EST. FROM ODO OF SEP 20` | per status |

The page never ranks, never subtracts to print, and never places a band it wasn't served.

### Degradation ladder
1. No `@property`: gauges are correct and static.
2. No `linear()`: expo-out, one smooth climb (haptics still pulse).
3. WAAPI can't animate a custom property: the needle stands at the truth, and the hold falls back to a tap.
4. No view transitions: a plain re-render.
5. No `vibrate` (iOS): silent.
6. `localStorage` throws: no witness, and key-on rises from E.
7. `:has()` missing: no frame warm and no step-back dim; everything else holds.

### If a phone struggles (`svcLite()`)
Cut these, in order:
1. The view transition (already gated).
2. Key-on.
3. The `.svc-glow` stroke (`.svc.lite .svc-glow{display:none}`).
4. The sheen layers.

**Never cut:** the reset, the lamp-out, the date window.

### Release
- Bump `sw.js` `VERSION` from `almanac-shell-v180` to `almanac-shell-v181` with the note `card #362 service cluster`.
- Scope audit: every selector is `.svc*`, every property `--svc-*`, keyframes `svc-*`, container `svc`, view-transition type and class `svc`, storage key `svc.seen`.

---

## 8. The three signature moments, ranked

### 1. The lamp goes out, by his hand (the reset's peak)

**What he sees.** On the seat thunk, the telltale at E doesn't switch off. It decays like a filament: a sharp drop when the current cuts, a slow cool from amber through ember to dark, and the light on the lens fading a beat behind.

**How it's built:**
- `svcGauge` emits `lampout` and inline `--svc-was` only when the memo says this lamp was lit and the served status is now `ok`.
- `fill:backwards` keeps it glowing through the detent climb, so it goes out exactly at the seat.
- Only `color` and `opacity` animate.

```css
@keyframes svc-filament{
  0%  {color:var(--svc-was);opacity:1}
  12% {color:var(--svc-was);opacity:.72}
  40% {color:color-mix(in oklch,var(--hot) 55%,var(--void));opacity:.6}
  100%{color:var(--etch);opacity:.5}}
@keyframes svc-pool{from{opacity:1}to{opacity:0}}
.svc-g.lampout .svc-lamp{animation:svc-filament .75s cubic-bezier(.2,0,.1,1) var(--svc-dur,0ms) backwards}
.svc-g.lampout .svc-dial::before{opacity:0;animation:svc-pool 1.1s cubic-bezier(.3,0,.2,1) calc(var(--svc-dur,0ms) + 90ms) backwards}
```

**Why first.** It is rare and earned: once per interval, and only when a lamp was really lit. For a man alone in a cab on a three-month runway, a lit lamp is a breakdown and money he doesn't have, and watching it go dark on his own logged odometer is control coming back.

### 2. The glance: needle, lamp at E, and the date window

**What he sees.** In under a second from the rail, or one tap down: the needle angle (pre-attentive, like the fuel gauge), whether the lamp by E is lit, the big figure, and then `OCT 27 · ≈26 DAYS` under the almanac's red rule. Answering "when" is the literal fix for his complaint.

**How it's built:**
- The SVG dial is driven by one served number, so the first frame is true even in a hidden document.
- The lamp glow is static.
- The date is printed from served `est_date` / `est_days` with the noon anchor.
- There is zero motion at rest.

### 3. The top-off and THAT LEG

**What he sees.** After the hold, the needle climbs in pump detents with a click in his palm per quarter tank. The trailer's needle follows 120 ms behind. The pump click-off thunk lands, and one served line rises: `THAT LEG · 9,180 MI · 31 DAYS · 27 LOADS`. The oil change stops being money leaving and becomes the thing that carried his work.

**How it's built:**
- `svcDetents` / `svcStrokeEase` generate the `linear()` stroke easing; `svcBuzz` fires the haptic pattern.
- The rider delay and the release of the hero slot are armed inside `svcPlay`.
- The epitaph comes from the spine's `leg` on the DONE response.
- It survives reduced motion as still text, because the story lives in the data and the motion only delivers it.

---

**Files to touch:**
- `/Users/bryanhertzig/Almanac/spine/service.py`: tie fix at line 154, plus `riding`, `soon_pct`, `span_est`, `age_days` / `est_stale`, the zero-pct fix, `pace_why`, `est_days`, `leg`.
- `/Users/bryanhertzig/Local Models/almanac-pwa/desk.html`: `.svc-*` CSS block, `svcHTML` / `svcGauge` / `svcDial`, `wireSvc` / `svcPlay` / `svcHold`, `svcPost`, `svcTeardown` in `renderRoom`, `hsBar` rail, `#toast` role at line 2279.
- `/Users/bryanhertzig/Local Models/almanac-pwa/sw.js`: bump to v181.