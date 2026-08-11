# Handoff: Omi marketing hero animations

## Overview
A set of **calm, seamless, looping** hero animations for the Omi marketing site. They form the
complete **3-step story**, all built and covered here:

1. **Zachytit (Capture)** — `Zachytit.dc.html` / `scene-capture.jsx`. Three people talk in
   turn; Omi listens in the middle; the usage context cycles office → online → field.
   Message: *"Just have the conversation. Omi records it — anywhere, no notes."*
2. **Pochopit (Understand)** — `Conversation to Knowledge.dc.html` / `scene.jsx`. Four
   statements from a conversation appear on the left; key phrases get softly marked, and the
   intelligent layer composes three structured items on the right by **linking several parts of
   the conversation** — a connection, a decision, and a next step.
   Message: *"Omi doesn't just transcribe — it understands what the conversation means."*
3. **Napojit (Connect)** — `Napojit.dc.html` / `scene-connect.jsx`. A package of outputs
   (Zápis · Úkoly · Follow up) fills in, then dispatches out along routes into the tools the
   team already uses; each destination confirms with its own verb.
   Message: *"Outputs continue into the tools your team already uses — no new app to open."*

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
- `reference/scene.jsx` — **Section 2 (Pochopit)** animation. Port this.
- `reference/scene-connect.jsx` — **Section 3 (Napojit)** animation. Port this.
- `reference/Zachytit.dc.html`, `reference/Conversation to Knowledge.dc.html`,
  `reference/Napojit.dc.html` — how each is
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
`[0, D)` (Capture `D = 7`, Pochopit `D = 10`, Connect `D = 7`). Every frame:
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

## Section 2 — Pochopit (Understand) · `scene.jsx`
`D = 10`. Two cards side by side on a transparent stage. **Left = the conversation**,
**right = what the intelligent layer recognised**, with a subtle static dotted arrow between
them (`y≈385`, `#CDD5E1`, dash `2 7`). No Omi device in this scene. Additional accent:
green `#3FB27F` (only used here).

Shared header pattern for both cards: navy 40×40 icon tile (radius 11, radial `#26265A →
#17173A`) at `x+26, y+26`; **eyebrow title** at `x+80, y+29` (Inter 700, 13px,
`letter-spacing 0.09em`, navy, uppercase); subtitle at `x+80, y+50` (Inter 500, 12.5px, gray);
hairline divider at `y+84`.

**Left card — "ROZHOVOR"** at `x=60, y=150, w=392, h=470`. Icon: two chat bubbles.
Subtitle **"Důležité části konverzace"**. Four statements, first row top `Y0 = 280`, pitch
`RH = 74`. Each row: 26px circular avatar (owner tone, white initial) at `x+26, y+2`; speaker
name at `x+62, y` (Inter 600, 11.5px, gray); the statement at `x+62, y+19` (Inter 500, 14px,
`line-height 22px`, ink), **written on** by a clip reveal
(`write = easeOutCubic(rise(t, at+0.05, 0.55))`, span `width = write*100%`,
`overflow:hidden; white-space:nowrap`).

Each statement carries one **key phrase** rendered as an inline span (`padding: 2px 4px;
margin: 0 -4px` — the negative margin must cancel the padding exactly so no extra space
appears around the phrase; radius 5):

| # | speaker | statement (key phrase in **bold**) | appears at |
|---|---|---|---|
| 0 | David | Pilot chceme **spustit v září**. | 0.35 |
| 1 | Aneta | Nejdřív **potřebujeme napojit CRM**. | 0.95 |
| 2 | Pavel | Začneme **s jedním týmem**. | 1.55 |
| 3 | David | **Po měsíci vyhodnotíme** výsledky. | 2.15 |

Phrase marking is driven by the phases below, per phrase:
`mark = smooth(t, P.at, P.at+0.35)` (permanent, stays until the loop reset) and
`pulse = smooth(t, P.at, P.at+0.3) * (1 - smooth(t, P.at+0.7, P.at+1.3))` (a brief accent).
Rendered as `background: rgba(77,171,247, 0.05 + 0.11*mark + 0.07*pulse)` plus
`inset 0 -1.5px 0 rgba(77,171,247, 0.18*mark + 0.3*pulse)` (a soft underline); once
`mark > 0.4` the phrase text goes navy + Inter 600. **No neon, no glow.**

**Right card — "CO JE PODSTATNÉ"** at `x=560, y=150, w=392, h=470`. Icon: list glyph.
Subtitle **"Informace připravené pro další práci"**. Three structured blocks, first top
`BY0 = 262`, height `BH = 104`, gap `12`, width `CTX.w - 52`, inset `x+26`.
Each block: radius 14, `background: accent @ 5% alpha`, `1px accent @ 22%` border,
padding `16px 18px`, column with `gap 9`; row one = 24px white icon square (radius 7, `1px
accent @ 30%`, 16px line-SVG glyph stroked in the accent) + **kind label** (Inter 700, 11px,
`letter-spacing 0.1em`, accent); row two = the sentence (Inter 600, 15px, navy,
`line-height 21px`, `text-wrap: pretty`).

**The core beat — three phases, each linking statements into one insight.** Per phase:
the listed statements mark up, a single small **label pill** travels a bezier arc between the
cards (`p = easeInOutCubic(rise(t, P.at+0.25, 0.7))`, from the *last* participating
statement's right edge `(TALK.x+TALK.w-30, Y0 + lastLine*RH + 24)` to the target block
`(CTX.x+46, BY0 + i*(BH+GAP) + 26)`, control point midway and 40px above; pill = white,
radius 9, `1px #ECEEF3`, `0 10px 24px rgba(23,23,58,0.16)`, 7px accent dot + Inter 600 12px
navy label; fades in/out over the first/last 15% of travel). On arrival
(`arrive = P.at + 0.7`) the block appears: `smooth(t, arrive, arrive+0.45)`, sliding up 10px.

| # | phase at | links statements | traveling label | block kind | block text | accent | icon |
|---|---|---|---|---|---|---|---|
| 0 | 3.10 | 0 + 1 | Souvislost | SOUVISLOST | Start pilotu závisí na napojení CRM | sky `#4DABF7` | link / chain |
| 1 | 4.85 | 0 + 2 | Rozhodnutí | ROZHODNUTÍ | Pilot začne v září s jedním týmem | green `#3FB27F` | circled check |
| 2 | 6.60 | 3 | Další krok | DALŠÍ KROK | Po prvním měsíci vyhodnotit výsledky | amber `#F5B70A` | arrow |

Two of the three phases pull from **two different statements** (and statement 0 is reused by
two phases) — that is the whole point of the scene and must not be simplified away.

**Reset for the loop:** `present = 1 - smooth(t, 9.15, 9.8)` fades ALL content back to empty
so the wrap to `t=0` is invisible.
Timeline: `0.35–2.15` statements appear · `3.10` souvislost · `4.85` rozhodnutí · `6.60`
další krok (each +0.25 delay, +0.7 travel, +0.45 block-in) · `≈7.75–9.15` **final readable
state** (all four phrases marked, all three blocks visible — this frame must work as a static
image) · `9.15–9.8` fade to empty · wrap.

**Narrow / mobile variant:** stack the two cards vertically (conversation on top, insights
below), keep the same copy and the same three phases, and replace the horizontal traveling
label with the same pill moving **downward** from the last marked statement to the new block.
The dotted connector rotates to vertical. Everything else (marking, timing, reset) is unchanged.

## Section 3 — Napojit (Connect) · `scene-connect.jsx`
Transparent stage, `D = 7`. **Left = a source package**, **right = three destination tiles**
(the tools the team already uses), joined by three curved dotted routes that fan out from an
emitter dot on the source's right edge.

**Source package — "Výstupy ze schůzky"** at `x=74, y=300, w=320, h=216` (radius 20, white,
strong shadow). Header: navy icon tile with a download/arrow glyph + title (Inter 700, 16px) +
subtitle **"Připraveno k odeslání"** (Inter 500, 12.5px, gray). Then three output chips appear
**one after another** (this is the opening beat): `chLand = 0.45 + i*0.5`, each
`ch = smooth(t, chLand, chLand+0.35)`, sliding up 8px. Each chip = a soft `#F4F6FA` pill with a
filled-sky check circle + label: **Zápis**, **Úkoly**, **Follow up** (Inter 600, 13.5px, `#3A3A6B`).

**Destination tiles** at `x=612, w=312, h=104`, tops `TY = [232, 364, 496]`. Each tile = white
card + icon square (48px, `#F4F6FA` idle → sky-tinted when synced) + two-line label:

| # | title | icon | packet label | done verb | launch |
|---|---|---|---|---|---|
| 0 | CRM a obchodní systém | contact-card | Follow up | **Zapsáno** | 2.35 |
| 1 | Projektové a úkolové nástroje | kanban board | Úkoly | **Uloženo** | 3.15 |
| 2 | E-mail, Teams, Slack nebo API | chat bubble | Zápis | **Odesláno** | 3.95 |

**Dispatch (the core beat).** After the chips are in, a small **packet pill** (white, colored
dot + packet label) travels each route from the source to its tile: `p = easeInOutCubic(rise(t,
launch, TRAVEL))`, `TRAVEL = 0.85s`, bezier arc; the active route brightens to sky while its
packet flies. On arrival (`arrive = launch + TRAVEL`), `synced = smooth(t, arrive, arrive+0.3)`
drives that tile's confirmed state: border + icon turn sky, a sky **check badge** pops in
(scale `0.5→1`), and the status line flips from a gray **"Připojeno"** to the tile's colored
**done verb** (Zapsáno / Uloženo / Odesláno).

**Reset for the loop (`D = 7`):** `rearm = 1 - smooth(t, 5.7, 6.4)` fades the synced states
(checks, tints, verbs) back to the idle "Připojeno" look before the wrap; the source package and
tiles themselves stay put. Timeline: `0.45–1.75` chips appear · `2.35–3.95` staggered dispatch
(+0.85 travel) · tiles confirm · `5.7–6.4` re-arm to idle · wrap.

Packet-dot colors reuse the person palette (navySoft / sky / amber) purely as route accents.

## Implementation notes for production (all scenes)
- **Reduced motion**: honor `prefers-reduced-motion` — render a static resting frame
  (Capture `t≈1`; Pochopit `t≈8.5`; Connect `t≈5`) or slow/disable the loop.
- **Performance**: each is a handful of absolutely-positioned divs + one small SVG; cheap. One
  rAF loop recomputing styles is fine. Pause when offscreen (IntersectionObserver).
- **Localization**: all copy is Czech. Externalize — Capture: the `SPK` names, the `CTX`
  labels, and "NAHRÁVÁM"; Process: the `ITEMS` array (transcript `line` + task `title` +
  `date`), the two header strings per card; Connect: the output chip labels, and each `DEST`
  entry's `title` / `packet` / `done` strings.
- **Responsiveness**: fixed 1000×800 stage → scale to the column width, or re-flow to a
  narrower canvas for tall/narrow slots.
- Do **not** drive story beats with CSS `transition:`/keyframes — keep everything derived from
  `t` so the loop stays seamless and controllable.

## Files
- `reference/scene-capture.jsx` — Section 1 (the `SceneContent` function is the full spec in code).
- `reference/scene.jsx` — Section 2 Pochopit (same).
- `reference/scene-connect.jsx` — Section 3 (same).
- `reference/Zachytit.dc.html`, `reference/Conversation to Knowledge.dc.html`, `reference/Napojit.dc.html` — mount / preview.
- `reference/animations.jsx`, `reference/support.js` — engine/runtime; reference only, don't ship.
