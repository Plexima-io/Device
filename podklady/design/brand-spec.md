# Plexima Brand Spec

Source basis: https://plexima.io/ homepage content and live CSS inspection on 2026-07-03.

## Core Tokens

Use these six tokens as the minimum brand mapping for implementation.

```css
:root {
  --bg: oklch(100% 0 0);                 /* #FFFFFF */
  --surface: oklch(98.2% 0.003 240);     /* #F7F8F9 */
  --fg: oklch(24% 0.075 294);            /* #1F1741 */
  --muted: oklch(46% 0.012 255);         /* #54595F */
  --border: oklch(91.8% 0.003 240);      /* #E6E6E6 */
  --accent: oklch(84.8% 0.165 88);       /* #FEC710 */
}
```

Supporting brand color:

```css
:root {
  --secondary: oklch(76% 0.10 226);      /* #6EC1E4 */
}
```

## Typography

- Display / headings: `"Nunito", system-ui, -apple-system, "Segoe UI", sans-serif`
- Body / UI: `"Open Sans", system-ui, -apple-system, "Segoe UI", sans-serif`
- Mono / code: `"JetBrains Mono", "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace`

## Observed Posture

- Airy, professional B2B service website with strong trust cues, testimonials, service cards and direct consultation CTAs.
- White base and dark blue-violet copy carry most hierarchy; yellow should stay a high-signal CTA/accent, not a broad background wash.
- Light blue appears repeatedly in Elementor CSS and should work as supportive informational color, not as the main action color.
- Most UI corners are tight to moderate: 5px default, 10-12px for larger marketing surfaces, 24-30px only for pills or rounded inputs.
- Shadows are subtle and functional, with card elevation around `0 10px 30px -10px rgba(0,0,0,.15)`.
