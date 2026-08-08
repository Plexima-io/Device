# Handoff: Omi marketing hero animations

## Overview
A set of **calm, seamless, looping** hero animations for the Omi marketing site. They form a
3-step story; **two of the three steps are built** and covered here:

1. **Zachytit (Capture)** — `Zachytit.dc.html` / `scene-capture.jsx`. Three people talk in
   turn; Omi listens in the middle; the usage context cycles office → online → field.
   Message: *"Just have the conversation. Omi records it — anywhere, no notes."*
2. **Zpracovat (Process)** — `Conversation to Knowledge.dc.html` / `scene.jsx`. The recorded
   conversation is auto-structured into a to-do list; each task gets its responsible owner.
   Message: *"Our conversations become organized, assigned business tasks — automatically."*
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
`[0, D)` with `D = 7`. Every frame:
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
Device on the **left** at `(176, 300)`, caption **"NAHRÁVÁM"**, with its own 8-bar waveform
(4 per side) and a static dotted flow line to the card. A to-do **card** on the right at
`x=372, y=108, w=540, h=384` (radius 22, white, border `#ECEEF3`, big soft shadow).

Header (fades in `rise(t,0.95,0.5)`): navy icon tile w/ list glyph + title **"Úkoly ze
schůzky"** (Inter 700, 17px) + subtitle **"Automaticky vytěženo z konverzace"** (Inter 500,
13px, gray) + hairline divider.

Four task rows (`ROW0 = 228`, pitch `ROWH = 62`):

| # | title | date | owner | land |
|---|-------|------|-------|------|
| 0 | Připravit cenovou nabídku | 14. 7. | David | 1.30 |
| 1 | Odeslat smlouvu klientovi | 15. 7. | Aneta | 1.85 |
| 2 | Naplánovat schůzku | 16. 7. | Pavel | 2.40 |
| 3 | Ověřit fakturaci | 17. 7. | David | 2.95 |

Per row: `rowFrac = easeOutCubic(rise(t, land, 0.5)) * present` drives appearance (title Inter
600 15.5px `#2B2B47`; date Inter 500 12.5px gray with a calendar glyph; both slide up ~10px as
they appear). At `assignTime = land + 0.55`, `assigned = smooth(t, assignTime, +0.35)`:
- Checkbox (22px, radius 7) flips from empty (`2px #D6DBE6` border on white) to filled
  `#4DABF7` with a white check.
- Owner chip slides in on the right (`opacity = assigned`, slide 8px): 22px avatar (owner tone,
  white initial) + name (Inter 600, 13px, `#3A3A6B`).

**Reset for the loop:** `present = 1 - smooth(t, 5.9, 6.6)` fades ALL filled content (header,
rows, checks, chips) back to empty near the end, so the wrap to `t=0` (empty card, device still
listening) is invisible.

Timeline: `0.95` header · `1.30/1.85/2.40/2.95` tasks appear · `land+0.55` check+owner (≈1.85→3.5)
· `3.5–5.9` held/readable resting frame · `5.9–6.6` fade to empty · `6.6–7.0` empty → wrap.

> Note: Section 2 has **no** standalone people nodes at the bottom — owners live only as chips
> on their task rows. (An earlier draft had bottom avatars + routing lines; intentionally removed.)

## Implementation notes for production (both scenes)
- **Reduced motion**: honor `prefers-reduced-motion` — render a static resting frame
  (Capture `t≈1`; Process `t≈4.5`) or slow/disable the loop.
- **Performance**: each is a handful of absolutely-positioned divs + one small SVG; cheap. One
  rAF loop recomputing styles is fine. Pause when offscreen (IntersectionObserver).
- **Localization**: all copy is Czech. Externalize — Capture: the `SPK` names, the `CTX`
  labels, and "NAHRÁVÁM"; Process: the `TASKS` array, two header strings, "NAHRÁVÁM".
- **Responsiveness**: fixed 1000×800 stage → scale to the column width, or re-flow to a
  narrower canvas for tall/narrow slots.
- Do **not** drive story beats with CSS `transition:`/keyframes — keep everything derived from
  `t` so the loop stays seamless and controllable.

## Files
- `reference/scene-capture.jsx` — Section 1 (the `SceneContent` function is the full spec in code).
- `reference/scene.jsx` — Section 2 (same).
- `reference/Zachytit.dc.html`, `reference/Conversation to Knowledge.dc.html` — mount / preview.
- `reference/animations.jsx`, `reference/support.js` — engine/runtime; reference only, don't ship.
