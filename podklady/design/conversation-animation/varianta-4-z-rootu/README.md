# Handoff: Omi marketing hero animations

## Overview
A set of **calm, seamless, looping** hero animations for the Omi marketing site. They form a
3-step story; **two of the three steps are built** and covered here:

1. **Zachytit (Capture)** — `Zachytit.dc.html` / `scene-capture.jsx`. Three people talk in
   turn; Omi listens in the middle; the usage context cycles office → online → field.
   Message: *"Just have the conversation. Omi records it — anywhere, no notes."*
2. **Zpracovat (Process)** — `Conversation to Knowledge.dc.html` / `scene.jsx`. A meeting
   transcript is written line by line; from it, tasks are extracted into a to-do list, each
   assigned to its responsible person.
   Message: *"The meeting note writes itself, and its tasks are distributed automatically."*
3. **Napojit (Connect)** — *not built yet.* (Reserved for "send into your systems / CRM".)

Each animation is meant to sit in the **right half** of its section (left half = headline + copy),
be glanced at for a few seconds, understood instantly, and loop forever without a visible seam.
Tone: reliable, orderly, premium — **not** AI-magic / sci-fi.

## About the design files
The files in `reference/` are a **design reference built in HTML/React**, not production code
to ship verbatim. The task is to **recreate each animation inside the target codebase** using
its existing stack and conventions (React/Vue/Svelte/plain canvas/etc.). If no environment
exists yet, choose the most appropriate approach. The reference is authoritative for *look,
timing, and choreography* — port those faithfully; adapt the *implementation* to the app.

- `reference/scene-capture.jsx` — **Section 1 (Zachytit)** animation. Port this.
- `reference/scene.jsx` — **Section 2 (Zpracovat)** animation. Port this.
- `reference/Zachytit.dc.html`, `reference/Conversation to Knowledge.dc.html` — how each is
  mounted / how to view them running in a browser.
- `reference/animations.jsx` — the generic timeline engine the references run on (`Stage`,
  `useTime`, `Easing`, `clamp`). **Do not port it.** It only provides a requestAnimationFrame
  loop, a normalized time `t` (seconds), easing helpers, and an authoring scrubber/export UI.
  In production, replace it with your own rAF loop.
- `reference/support.js` — DC runtime; irrelevant to production, ignore it.

## Fidelity
**High-fidelity.** Colors, typography, spacing, timing, and easing are final. Recreate
pixel-for-pixel, then let each scene scale responsively into the right-hand column.

## The core pattern (read this first — applies to BOTH scenes)
Each animation is a **pure function of one variable**: the loop time `t`, in seconds, in
`[0, D)` (Capture `D = 7`, Process `D = 8`). Every frame:
1. `t` advances; at `t >= D` it wraps to `0` (seamless loop).
2. `SceneContent()` recomputes every element's position/opacity/scale from `t`.

There is **no per-element tween state, no CSS transitions driving the story, no keyframe
library.** Everything is derived math — that is what makes the loop perfectly seamless. To
port: implement the same `t → visual` mapping in your framework and drive `t` with
`t = (performance.now()/1000) % 7`.

Shared timing helpers:
- `rise(t, at, dur)` → linear 0→1 ramp starting at `at`, lasting `dur`, clamped.
- `smooth(t, a, b)` → easeInOutCubic 0→1 ramp between times `a` and `b`.
- Any continuous "breathing" signal uses `sin((t/D)*2π * N)` with **integer N** (2 in these
  scenes) so it completes whole cycles per loop and never jumps at the wrap.

## Shared design tokens (both scenes)
Colors:
- bg `#F5F6F8`
- navy `#17173A`, navy2 `#26265A`, navySoft `#3A3A6B`
- sky `#4DABF7`
- amber `#F5B70A`
- ink (body text) `#2B2B47`, gray (secondary) `#8A90A2`
- hairline/border/divider `#ECEEF3`, empty-control border `#D6DBE6`
- recording dot red `#E5484D`

Typography: **Inter** (400/500/600/700).
Radii: cards/chips 14–22, avatars full circle, small controls 7.
Easing: `easeOutCubic` (appearance), `easeInOutCubic` (fades / cross-fades).
Canvas: each scene is authored on a **1000 × 800** absolute-positioned stage; scale it to the
column width via `transform: scale(w/1000)` (or re-derive coordinates responsively).

**Backgrounds are transparent.** Both scenes render on a transparent stage — the site
section's own background (white) shows through; only the white cards + their soft shadows are
opaque. Do not add a stage fill. Card shadow (the separation on white):
`0 30px 70px rgba(23,23,58,0.18), 0 6px 16px rgba(23,23,58,0.10)` on a `#FFFFFF` card with a
`1px #ECEEF3` hairline border.

**Person / owner colors** (used in both scenes, keep consistent):
David → `#3A3A6B` · Aneta → `#4DABF7` · Pavel → `#F5B70A`.

The Omi **device** is the shared anchor across scenes — same construction in both:
- Pulsing sky ring (`border 2px #4DABF7`, radius `82 + pulse*6`).
- White lens disc 140×140 (`#fff`, big soft shadow + inset hairline).
- Navy core 104×104 (radial `#26265A → #17173A → #101031`, inset shadow).
- Breathing center dot `#4DABF7` (`11–16px`, glow), `pulse = sin((t/7)*2π*2)`.
- Caption below: red breathing dot + label, Inter 600 12px, `letter-spacing 0.14em`, `#8A90A2`.

---

## Section 1 — Zachytit (Capture) · `scene-capture.jsx`
Device centered at `(500, 336)`. Caption label: **"NAHRÁVÁM"**.

**Three speakers, round-robin.** `SPK = [David, Aneta, Pavel]` (tones above). David and Aneta
are stacked on the left (centers `(176,250)` and `(176,422)`, bubble tail on the right); Pavel
is on the right (center `(824,336)`, tail on the left). Each is a 176×60 white pill (radius 16,
border `#ECEEF3`) containing: a 30px circular avatar (tone bg, white initial, Inter 700) + a
column with the name (Inter 600, 13.5px, navy) and a 7-bar mini waveform.

Turn-taking envelope (seamless): segment `seg = D/3`; speaker `k` is active during its segment
with `env_k = sin(π * ((t - k*seg)/seg))` for `local ∈ [0,1]`, else 0. So David speaks in
`[0, 7/3)`, Aneta in `[7/3, 14/3)`, Pavel in `[14/3, 7)`; envelopes are 0 at handoffs → natural
pauses, no jump at the wrap.
- Active speaker: waveform bars animate (`h = 3 + env*a*13`, `a` a fast sine per bar), bubble
  elevated (`scale 0.97+env*0.03`, `opacity 0.62+env*0.38`, deeper shadow), and its dotted
  connector to the device turns sky (`#4DABF7`) and brightens.
- Idle speakers: bars flatten to `#D6DBE6` dots, bubble dimmed.

**Listening ripples.** 3 sky rings expand out of the device center: `phase = ((t/7)+k/3)%1`,
`r = 74 + phase*150`, `opacity = clamp(phase/0.12,0,1) * (1-phase) * 0.32`.

**Context cycle chip.** Bottom-center pill at `(≈405, 520)`, 190px wide, that cross-fades
through three states over the loop (each `seg` long): **Kancelář** (building icon) → **Online
hovor** (monitor icon) → **V terénu** (map-pin icon). Icons are simple 18px line SVGs stroked
in navySoft. Cross-fade windows are `smooth(t, start±0.25)` in / `1 - smooth(t, end±0.25)` out;
context 0 also fades in across the wrap (`1 - smooth(t, D-0.25, D+0.25)`) so it's seamless.
Below the chip, 3 small dots indicate the active context (active = sky, else `#D6DBE6`).

## Section 2 — Zpracovat (Process) · `scene.jsx`
Two cards side by side on a transparent stage. **Left = transcript**, **right = extracted
tasks**, with a subtle static dotted arrow between them (`y≈385`, `#CDD5E1`, dash `2 7`).
There is **no Omi device** in this scene (an earlier draft had one on the left — removed).

**Left card — "Zápis ze schůzky"** at `x=60, y=150, w=392, h=470`. Header: navy icon tile with
a document glyph + title **"Zápis ze schůzky"** (Inter 700, 17px) + subtitle **"Automatický
přepis konverzace"** (Inter 500, 13px, gray) + hairline divider. Then five transcript lines,
each `= { who, line }`, first line top `Y0 = 258`, pitch `RH = 62`: a small speaker avatar
(owner tone, white initial) + the line text. Each line is **written on** by a clip reveal:
`write = easeOutCubic(rise(t, ll, 0.6))`, the text span's `width = write*100%` with
`overflow:hidden; white-space:nowrap`, and a 1.5px sky **caret** while `0 < write < 1`.

**Right card — "Úkoly ze schůzky"** at `x=560, y=150, w=392, h=470`. Same header pattern
(list glyph, subtitle **"Automaticky vytěženo ze zápisu"**). Rows use the same `Y0/RH` grid so
each task sits on the same row as its source transcript line.

**Extraction (the core beat).** Five items, 1:1 transcript-line → task:

| # | transcript line | task title | date | owner | line written (ll) | extract (ex) |
|---|---|---|---|---|---|---|
| 0 | Pošlu cenovou nabídku klientovi. | Připravit cenovou nabídku | 14. 7. | David | 0.55 | 3.05 |
| 1 | Připravím smlouvu k podpisu. | Odeslat smlouvu klientovi | 15. 7. | Aneta | 1.15 | 3.65 |
| 2 | Domluvím další schůzku. | Naplánovat schůzku | 16. 7. | Pavel | 1.75 | 4.25 |
| 3 | Ověřím fakturaci u účetní. | Ověřit fakturaci | 17. 7. | David | 2.35 | 4.85 |
| 4 | Zašlu podklady k projektu. | Zaslat podklady k projektu | 18. 7. | Aneta | 2.95 | 5.45 |

At each item's `ex`: (a) the **source transcript line highlights** — a sky-tinted pill fades
in behind it (`rgba(77,171,247,0.10)` + faint sky border) then out; (b) a small **task pill**
travels along a bezier arc from the line's right edge to the task row (`TRAVEL = 0.6s`,
`easeInOutCubic`); (c) on arrival the **task row appears** (`rowIn = smooth(t, arrive-0.05,
arrive+0.35)`: checkbox + title Inter 600 15px + date w/ calendar glyph, sliding up 8px), then
`assigned = smooth(t, arrive+0.15, arrive+0.5)` flips the checkbox to filled sky + white check
and slides in the owner chip (avatar + name, `#3A3A6B`).

**Reset for the loop (`D = 8`):** `present = 1 - smooth(t, 7.1, 7.75)` fades ALL content
(transcript + tasks) back to empty near the end, so the wrap to `t=0` is invisible.
Timeline: `0.55–2.95` transcript writes · `3.05–5.45` staggered extraction (+0.6 travel, +~0.5
assign) · hold/readable · `7.1–7.75` fade to empty · wrap.

Person colors (avatars & pills): David `#3A3A6B` · Aneta `#4DABF7` · Pavel `#F5B70A`.

## Implementation notes for production (both scenes)
- **Reduced motion**: honor `prefers-reduced-motion` — render a static resting frame
  (Capture `t≈1`; Process `t≈6`) or slow/disable the loop.
- **Performance**: each is a handful of absolutely-positioned divs + one small SVG; cheap. One
  rAF loop recomputing styles is fine. Pause when offscreen (IntersectionObserver).
- **Localization**: all copy is Czech. Externalize — Capture: the `SPK` names, the `CTX`
  labels, and "NAHRÁVÁM"; Process: the `ITEMS` array (transcript `line` + task `title` +
  `date`), the two header strings per card.
- **Responsiveness**: fixed 1000×800 stage → scale to the column width, or re-flow to a
  narrower canvas for tall/narrow slots.
- Do **not** drive story beats with CSS `transition:`/keyframes — keep everything derived from
  `t` so the loop stays seamless and controllable.

## Files
- `reference/scene-capture.jsx` — Section 1 (the `SceneContent` function is the full spec in code).
- `reference/scene.jsx` — Section 2 (same).
- `reference/Zachytit.dc.html`, `reference/Conversation to Knowledge.dc.html` — mount / preview.
- `reference/animations.jsx`, `reference/support.js` — engine/runtime; reference only, don't ship.
