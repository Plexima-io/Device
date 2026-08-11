# PDF style reference

Use this as the default visual reference for internal Plexima client PDFs and briefing PDFs.

The rules below are the canonical reusable style. Do not load another client's artifact or generator as a visual dependency.

## Format

- Page: A4 portrait.
- Margins: about 42 pt left/right.
- Header: full-width dark navy bar, 30 pt high.
- Footer: thin light line, left context label, right date.
- Use this format for briefing PDFs unless the user explicitly asks otherwise.

## Colors

- Primary navy: `#211747`
- Main text: `#252A3A`
- Muted text: `#626A7D`
- Light line/border: `#D9DEEA`
- Pale gray panel: `#F5F7FB`
- Pale blue panel: `#E7F5FB`
- Pale green panel: `#E7F6EE`
- Yellow accent: `#FEC710`
- Pale yellow note: `#FFF7D6`
- White: `#FFFFFF`

## Typography

- Font family: Arial.
- Title: Arial Bold, approx. 24 pt, navy.
- Subtitle: Arial, approx. 10.5 pt, muted.
- Section label: Arial Bold, approx. 12 pt, navy.
- Body: Arial, approx. 8-9.5 pt.
- Small notes: Arial, approx. 7.5-8 pt, muted.

## Header

Use a dark navy top bar:

- Left: `Plexima | [document context]`
- Right: `[document type]  |  [page]/[total]`
- Text white.

For client briefing PDFs, default:

- Left: `Plexima | Briefing před schůzkou`
- Right: `Briefing  |  1/N`

## Footer

Use a thin `#D9DEEA` line above footer text.

- Left: `Plexima  |  Interní podklad pro schůzku`
- Right: preparation date.

## Section Pattern

Use strong navy section labels with a short yellow underline:

- Label text in navy.
- Yellow underline approx. 36 pt wide, 3 pt thick.
- Keep sections visually separated with whitespace, not heavy boxes.

## Components

Preferred components:

- Rounded pale panels for important narrative blocks.
- Tables with navy header rows and alternating white / pale gray rows.
- Yellow bottom row for totals or key figures.
- Yellow bullets for list-heavy sections.
- Pale blue panels for objectives/context.
- Pale green panels for positive states or output/finalization.
- Pale yellow panels for notes, warnings, assumptions, or next-step emphasis.
- Full-width navy final CTA/summary band for proposal documents.

## Briefing PDF Adaptation

For `briefing-pred-uvodni-schuzkou.md` style inputs:

- Keep A4 portrait.
- Page 1 should contain header, title, subtitle, metadata, short company summary, and "Co firma nabízí".
- Put "Co se hodí zmínit" and public proof points in highlighted panels.
- Put questions as clean headings with bullet lists underneath. Do not put meeting questions into rectangular cards unless the user explicitly requests cards.
- Use a larger, readable question font than body copy, around 8.8-9 pt.
- Align yellow bullet dots with the first text baseline so each dot visually belongs to the first word of the question.
- Do not create a landscape flow/checklist layout unless the input is a process diagram or checklist.
- Do not add logos unless explicitly requested.
- Preserve the user's supplied content. Only make light edits needed for visual fit, headings, and legibility.

## Quality Bar

- No clipped text.
- No bullets outside panels.
- No overfilled cards.
- No tiny unreadable body text.
- Prefer fewer larger sections over many small decorative cards.
- Render to PNG and inspect before delivery.
