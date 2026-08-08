# Plexima Design System

Praktický základ pro implementaci webu a marketingových ploch Plexima. Systém vychází z aktuálního webu `plexima.io`: čistý B2B styl, bílé plochy, tmavá modrofialová typografie, žlutá CTA barva, světle modrá podpůrná barva, nadpisy Nunito a text Open Sans.

Tento dokument je určený pro vývojáře i další práci v Claude Design. Cílem není jen popsat současný web, ale vytvořit rozšiřitelnou redesignovou vrstvu, která zůstane věrná značce.

## 1. Design Principles

### 1.1 Jasná obchodní důvěra

Plexima působí jako partner pro automatizace, CRM/ERP a firemní systémy. Design musí podporovat pocit odbornosti, spolehlivosti a přehledu. Preferuj čisté rozvržení, věcné texty, konkrétní službové bloky a důkazní prvky: reference, příklady systémů, kontaktní CTA.

### 1.2 Žlutá jako rozhodovací signál

Primary yellow `#FEC710` je nejvýraznější značka. Používej ji hlavně na primární CTA, aktivní stavy, zvýraznění důležitého momentu nebo malé akcenty. Nepoužívej ji jako dominantní pozadí celých sekcí, pokud není text výrazně tmavý a plocha má dostatek vzduchu.

### 1.3 Tmavá modrofialová jako autorita

`#1F1741` je hlavní textová a autoritativní barva. Funguje pro nadpisy, navigaci, patičku, zvýrazněné panely a text na světlém pozadí. Drží systém pohromadě a zabraňuje tomu, aby žlutá působila příliš hravě.

### 1.4 Vzduch před dekorací

Plexima má být moderní a čistá, ne přezdobená. Sekce mají mít velkorysé mezery, jasnou hierarchii a minimum dekorativních efektů. Ilustrace, screenshoty nebo fotky používej jen tam, kde pomáhají vysvětlit službu nebo posílit důvěru.

### 1.5 Praktická implementovatelnost

Každá hodnota v systému má být snadno přenositelná do CSS variables, Tailwind tokenů nebo komponent. Vyhni se jednorázovým hodnotám bez názvu.

## 2. Color System

### 2.1 Core Palette

| Token | Hex | OKLCH | Role |
|---|---:|---:|---|
| `color.brand.yellow` | `#FEC710` | `oklch(84.8% 0.165 88)` | Primární CTA, aktivní stav, high-signal akcent |
| `color.brand.blue` | `#6EC1E4` | `oklch(76% 0.10 226)` | Sekundární akcent, informační prvky, jemné highlights |
| `color.brand.ink` | `#1F1741` | `oklch(24% 0.075 294)` | Nadpisy, body text, navigace, tmavé panely |
| `color.bg.canvas` | `#FFFFFF` | `oklch(100% 0 0)` | Hlavní pozadí |
| `color.bg.soft` | `#F7F8F9` | `oklch(98.2% 0.003 240)` | Jemné sekční pozadí |
| `color.surface.default` | `#FFFFFF` | `oklch(100% 0 0)` | Karty, formuláře, navigace |
| `color.text.primary` | `#1F1741` | `oklch(24% 0.075 294)` | Primární text |
| `color.text.muted` | `#54595F` | `oklch(46% 0.012 255)` | Sekundární text, metadata |
| `color.border.default` | `#E6E6E6` | `oklch(91.8% 0.003 240)` | Linky, inputy, karty |

### 2.2 Extended Neutrals

| Token | Hex | Usage |
|---|---:|---|
| `neutral.0` | `#FFFFFF` | Canvas, cards |
| `neutral.50` | `#F7F8F9` | Section tint, input background |
| `neutral.100` | `#EFEFF1` | Dividers, subtle fills |
| `neutral.200` | `#E6E6E6` | Borders |
| `neutral.500` | `#7A7A7A` | Captions, secondary metadata |
| `neutral.700` | `#54595F` | Body secondary |
| `neutral.950` | `#1F1741` | Text, nav, deep surfaces |

### 2.3 Semantic Colors

Semantic colors mají být podpůrné, ne dominantní. Udrž je v nižší saturaci, aby nekonkurovaly žluté CTA.

| Token | Hex | Usage |
|---|---:|---|
| `status.success` | `#39B54A` | Úspěšné odeslání, validace |
| `status.info` | `#6EC1E4` | Informační boxy, systémové tipy |
| `status.warning` | `#FEC710` | Varování, čekající stav |
| `status.danger` | `#D9534F` | Chyba, destruktivní akce |

### 2.4 Jak používat `#FEC710`

Používej:

- primární tlačítka,
- aktivní navigační indikátor,
- malé štítky typu "ZDARMA" nebo "Doporučeno",
- link underline / hover akcent,
- jeden výrazný detail v hero sekci.

Nepoužívej:

- jako velkou plochu pod dlouhým textem,
- současně na více CTA v jedné sekci,
- pro běžné dekorativní ikony,
- jako jediný způsob označení chyby nebo stavu.

### 2.5 Light-only rozhodnutí

Pro aktuální rozsah `web + marketing` drž systém pouze ve světlé variantě. Dark mode zatím nenavrhujeme jako plnohodnotnou variantu. Pokud bude později potřeba, měl by vzniknout jako samostatná produktová vrstva, ne jen invertování barev.

## 3. Typography System

### 3.1 Font Families

```css
:root {
  --font-heading: "Nunito", system-ui, -apple-system, "Segoe UI", sans-serif;
  --font-body: "Open Sans", system-ui, -apple-system, "Segoe UI", sans-serif;
  --font-mono: "JetBrains Mono", "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
}
```

Role:

- `Nunito`: nadpisy, hero headline, sekční titulky, karty služeb.
- `Open Sans`: odstavce, navigace, formuláře, tabulky, malé UI texty.
- Mono: technické tokeny, kód, ID, vývojářská dokumentace. Nepoužívat pro marketingový body text.

### 3.2 Type Scale

| Token | Desktop | Mobile | Line-height | Weight | Usage |
|---|---:|---:|---:|---:|---|
| `text.display` | 55px | 40px | 1.08 | 700 | Hero headline |
| `text.h1` | 48px | 36px | 1.12 | 700 | Stránkový titul |
| `text.h2` | 40px | 30px | 1.18 | 700 | Sekční nadpis |
| `text.h3` | 28px | 24px | 1.25 | 700 | Karty, podsekce |
| `text.h4` | 22px | 20px | 1.35 | 700 | Malé titulky |
| `text.body-lg` | 22px | 19px | 1.55 | 400 | Lead odstavec |
| `text.body` | 18px | 16px | 1.65 | 400 | Běžný text |
| `text.body-sm` | 16px | 15px | 1.55 | 400 | Karty, formuláře |
| `text.caption` | 13px | 13px | 1.45 | 600 | Eyebrow, metadata |

### 3.3 Typografická pravidla

- Nadpisy používej v `Nunito`, text v `Open Sans`.
- Hlavní nadpisy mají být velké, ale ne křiklavé. Nepoužívej extrémní letter-spacing.
- Eyebrow text může být uppercase, velikost 12-13px, weight 700, letter-spacing `0.06em`.
- Body text drž mezi 16-18px; 22px používej jen pro lead text.
- Maximální šířka čitelného odstavce: 680-760px.

## 4. Spacing & Layout

### 4.1 Spacing Scale

Používej 4px/8px rytmus. Hodnoty níže jsou systémové; mimo ně sahat jen výjimečně.

| Token | Value | Usage |
|---|---:|---|
| `space.0` | 0 | Reset |
| `space.1` | 4px | Jemné odsazení |
| `space.2` | 8px | Ikona + label, compact gap |
| `space.3` | 12px | Malé skupiny |
| `space.4` | 16px | Výchozí UI mezera |
| `space.5` | 20px | Form rows, card internals |
| `space.6` | 24px | Karty, grid gap |
| `space.8` | 32px | Sekční vnitřní rytmus |
| `space.10` | 40px | Velké bloky |
| `space.12` | 48px | Section clusters |
| `space.16` | 64px | Desktop section padding |
| `space.20` | 80px | Hero / major sections |
| `space.24` | 96px | Výjimečně velké marketingové sekce |

### 4.2 Layout

| Token | Value | Usage |
|---|---:|---|
| `layout.container` | 1200px | Standardní obsah |
| `layout.container-wide` | 1360px | Logo grid, case studies, širší marketingové bloky |
| `layout.readable` | 760px | Text-heavy sekce |
| `layout.gutter` | `clamp(20px, 4vw, 56px)` | Horizontální padding |
| `layout.section-y` | `clamp(64px, 8vw, 112px)` | Vertikální spacing sekcí |

Grid principy:

- Marketing homepage: 12 sloupců desktop, 6 tablet, 1 mobile.
- Karty služeb: 3 sloupce desktop, 2 tablet, 1 mobile.
- Reference/testimonials: 2-3 sloupce podle délky textu.
- Formuláře: 2 sloupce desktop, 1 sloupec mobile.
- Hero: text a vizuál v poměru 52/48 nebo 56/44; nikdy nevytvářet těsný split bez vzduchu.

### 4.3 Breakpoints

```css
--bp-mobile: 480px;
--bp-tablet: 768px;
--bp-laptop: 1024px;
--bp-desktop: 1280px;
--bp-wide: 1440px;
```

Na mobile:

- CTA má mít minimálně 44px výšku.
- Navigace se mění na hamburger nebo zjednodušené menu.
- Karty jdou do jednoho sloupce.
- Hero nadpis klesá na 36-40px a má zůstat čitelný bez zalamování po jednom slově.

## 5. Border Radius, Shadows, Elevation

### 5.1 Radius

| Token | Value | Usage |
|---|---:|---|
| `radius.none` | 0 | Layout containers bez potřeby měkkosti |
| `radius.sm` | 5px | Výchozí tlačítka, karty, menší prvky |
| `radius.md` | 10px | Větší karty, dropdowny |
| `radius.lg` | 20px | Feature panely, testimonial surfaces |
| `radius.pill` | 999px | Pills, badges, input addon, rounded CTA |

Pravidlo: výchozí Plexima radius je 5px. Větší radius používej jen tam, kde prvek potřebuje působit jako samostatný marketingový modul.

### 5.2 Shadows

```css
--shadow-none: none;
--shadow-sm: 0 2px 8px rgba(31, 23, 65, 0.08);
--shadow-md: 0 10px 30px -10px rgba(0, 0, 0, 0.15);
--shadow-lg: 0 18px 48px -18px rgba(31, 23, 65, 0.22);
```

Používej shadow jen pro:

- hover karty,
- dropdowny,
- modaly,
- plovoucí CTA / formulářové panely.

Nepoužívej shadow na každou sekci ani jako náhradu za spacing.

## 6. Component Library

### 6.1 Buttons

#### Primary Button

Role: hlavní obchodní akce.

```css
.btn-primary {
  background: #FEC710;
  color: #1F1741;
  border: 1px solid #FEC710;
  border-radius: 5px;
  min-height: 48px;
  padding: 12px 22px;
  font: 700 16px/1.2 var(--font-body);
}
```

States:

- Hover: `background: #EAB70F`, jemný `transform: translateY(-1px)`.
- Focus: 2px outline `#6EC1E4`, offset 2px.
- Disabled: `background: #E6E6E6`, `color: #7A7A7A`, no transform.

Použití:

- "Sjednat online schůzku"
- "Stáhnout workbook"
- "Chci automatizovat obchod"

#### Secondary Button

Role: doplňková akce, méně prioritní než primary.

```css
.btn-secondary {
  background: #1F1741;
  color: #FFFFFF;
  border: 1px solid #1F1741;
  border-radius: 5px;
  min-height: 48px;
  padding: 12px 22px;
}
```

Hover: zesvětlit na `#30265E` nebo přidat modrý underline detail.

#### Ghost Button

Role: navigační nebo tertiary akce.

```css
.btn-ghost {
  background: transparent;
  color: #1F1741;
  border: 1px solid #E6E6E6;
  border-radius: 5px;
}
```

Hover: `background: #F7F8F9`, `border-color: #6EC1E4`.

#### Icon Button

Role: menu, close, carousel, dropdown.

- Size: 40x40px desktop, 44x44px touch.
- Radius: 5px nebo pill podle kontextu.
- Ikona musí mít textový label pro accessibility.

### 6.2 Inputs & Form Controls

Základní input:

```css
.input {
  min-height: 48px;
  padding: 12px 16px;
  border: 1px solid #E6E6E6;
  border-radius: 10px;
  background: #F7F8F9;
  color: #1F1741;
  font: 400 16px/1.4 var(--font-body);
}
```

States:

- Hover: `border-color: #D8D8DE`.
- Focus: `border-color: #6EC1E4`, outline `2px solid rgba(110,193,228,.25)`.
- Error: `border-color: #D9534F`, helper text `#D9534F`.
- Success: `border-color: #39B54A`.

Form layout:

- Label nad inputem.
- Helper text pod inputem, 13-14px.
- Povinné pole označit textově, ne jen barvou.
- Checkbox/radio: 20px control, focus ring vždy viditelný.

### 6.3 Cards / Surface

#### Service Card

Použití: automatizace procesů, CRM/ERP, konzultace.

- Background: `#FFFFFF`
- Border: `1px solid #E6E6E6`
- Radius: `10px`
- Padding: 28-32px
- Hover: `box-shadow: var(--shadow-md)`, border `#6EC1E4`
- Heading: Nunito 22-28px, 700

#### Testimonial Card

- Background: `#FFFFFF` nebo `#F7F8F9`
- Quote text: Open Sans 18-20px, line-height 1.6
- Author: Nunito 16px, 700
- Company: Open Sans 14px, muted
- Nepoužívat velké dekorativní uvozovky, pokud sekce už obsahuje fotku/logo.

#### Download / Lead Magnet Surface

- Může použít jemný `#F7F8F9` základ.
- Žlutá pouze na CTA.
- Vizuál workbooku nebo dokumentu může být výraznější než běžné karty.

### 6.4 Badges / Tags

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 28px;
  padding: 5px 10px;
  border-radius: 999px;
  font: 700 12px/1 var(--font-body);
}
```

Variants:

- `badge-yellow`: background `rgba(254,199,16,.18)`, text `#1F1741`
- `badge-blue`: background `rgba(110,193,228,.16)`, text `#1F1741`
- `badge-neutral`: background `#F7F8F9`, text `#54595F`, border `#E6E6E6`

Používej pro:

- "PDF workbook zdarma"
- "No-code / low-code"
- "CRM/ERP"
- "Automatizace"

### 6.5 Navigation

Desktop:

- Header background `#FFFFFF`.
- Text `#1F1741`.
- Active/hover stav přes žlutý underline nebo světle modrý textový akcent.
- Výška headeru 72-88px.
- Primární CTA vpravo jako yellow button.

Dropdown:

- Surface `#FFFFFF`.
- Border `#E6E6E6`.
- Radius `10px`.
- Shadow `var(--shadow-md)`.
- Položky min-height 44px.
- Hover background `#F7F8F9`.

Mobile:

- Hamburger 44x44px.
- Menu jako full-width sheet pod headerem.
- CTA zůstává výrazné, ale nezdvojuj ho víc než jednou.

### 6.6 Tables

Tabulky používej pro porovnání služeb, systémů, integrací nebo plánů.

```css
.table {
  width: 100%;
  border-collapse: collapse;
  font: 400 15px/1.5 var(--font-body);
}
```

Rules:

- Header background `#F7F8F9`.
- Header text `#1F1741`, weight 700.
- Border `1px solid #E6E6E6`.
- Row hover `#F7F8F9`.
- Status buňky jako badge, ne barevný celý řádek.

### 6.7 Tabs

Použití: služby, typy automatizace, CRM/ERP sekce.

Variants:

- Underline tabs pro content-heavy sekce.
- Pill tabs pro landing/marketing filtrování.

States:

- Active: text `#1F1741`, underline `#FEC710`, weight 700.
- Hover: text `#1F1741`, background `#F7F8F9`.
- Focus: outline `#6EC1E4`.

### 6.8 Modals / Popovers

Modal:

- Max width: 560px pro formulář, 760px pro detail služby.
- Background: `#FFFFFF`.
- Radius: `20px`.
- Shadow: `var(--shadow-lg)`.
- Overlay: `rgba(31, 23, 65, 0.45)`.
- Close button: 44x44px.

Popover:

- Radius: 10px.
- Padding: 16-20px.
- Border: `#E6E6E6`.
- Shadow: `var(--shadow-md)`.

### 6.9 Alerts / Status Messages

```css
.alert {
  border-radius: 10px;
  padding: 16px 18px;
  border: 1px solid;
  font-size: 15px;
}
```

Variants:

- Info: bg `rgba(110,193,228,.12)`, border `rgba(110,193,228,.42)`, text `#1F1741`
- Success: bg `rgba(57,181,74,.10)`, border `rgba(57,181,74,.36)`, text `#1F1741`
- Warning: bg `rgba(254,199,16,.14)`, border `rgba(254,199,16,.46)`, text `#1F1741`
- Danger: bg `rgba(217,83,79,.10)`, border `rgba(217,83,79,.36)`, text `#1F1741`

## 7. Usage Guidelines & Rules

### 7.1 Do

- Používej bílé a velmi světlé plochy jako základ.
- Stav hierarchii přes velikost, váhu a spacing dřív než přes dekorace.
- Drž `#FEC710` pro jednu hlavní akci na sekci.
- Podporuj důvěru přes reference, konkrétní služby, jasné formuláře a přehledné case-study struktury.
- Pro marketingové sekce používej velkorysé mezery a jasné titulky.
- Udržuj komponenty snadno přenositelné do kódu.

### 7.2 Don't

- Nepoužívej žlutou jako masivní pozadí přes několik sekcí za sebou.
- Nemíchej další výrazné brand barvy bez jasného důvodu.
- Nepoužívej příliš hravé ilustrace nebo emoji jako hlavní vizuální jazyk.
- Nepoužívej tmavé gradienty jako nový základ značky.
- Nezmenšuj body text pod 16px.
- Nepřepisuj Nunito/Open Sans jiným display fontem bez rebrand rozhodnutí.
- Nevytvářej komponenty bez hover/focus/disabled/error stavů.

## 8. Implementation Recommendations

### 8.1 CSS Variables

```css
:root {
  --plx-color-yellow: #FEC710;
  --plx-color-blue: #6EC1E4;
  --plx-color-ink: #1F1741;
  --plx-color-white: #FFFFFF;
  --plx-color-soft: #F7F8F9;
  --plx-color-border: #E6E6E6;
  --plx-color-muted: #54595F;

  --plx-status-success: #39B54A;
  --plx-status-info: #6EC1E4;
  --plx-status-warning: #FEC710;
  --plx-status-danger: #D9534F;

  --plx-font-heading: "Nunito", system-ui, -apple-system, "Segoe UI", sans-serif;
  --plx-font-body: "Open Sans", system-ui, -apple-system, "Segoe UI", sans-serif;
  --plx-font-mono: "JetBrains Mono", "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace;

  --plx-radius-sm: 5px;
  --plx-radius-md: 10px;
  --plx-radius-lg: 20px;
  --plx-radius-pill: 999px;

  --plx-shadow-sm: 0 2px 8px rgba(31, 23, 65, 0.08);
  --plx-shadow-md: 0 10px 30px -10px rgba(0, 0, 0, 0.15);
  --plx-shadow-lg: 0 18px 48px -18px rgba(31, 23, 65, 0.22);

  --plx-container: 1200px;
  --plx-container-wide: 1360px;
  --plx-gutter: clamp(20px, 4vw, 56px);
  --plx-section-y: clamp(64px, 8vw, 112px);
}
```

### 8.2 Tailwind Token Sketch

```js
export default {
  theme: {
    extend: {
      colors: {
        plexima: {
          yellow: "#FEC710",
          blue: "#6EC1E4",
          ink: "#1F1741",
          soft: "#F7F8F9",
          border: "#E6E6E6",
          muted: "#54595F"
        },
        status: {
          success: "#39B54A",
          info: "#6EC1E4",
          warning: "#FEC710",
          danger: "#D9534F"
        }
      },
      fontFamily: {
        heading: ["Nunito", "system-ui", "sans-serif"],
        body: ["Open Sans", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "IBM Plex Mono", "ui-monospace", "monospace"]
      },
      borderRadius: {
        plexima: "5px",
        "plexima-md": "10px",
        "plexima-lg": "20px"
      },
      boxShadow: {
        plexima: "0 10px 30px -10px rgba(0,0,0,.15)"
      },
      maxWidth: {
        "plx-container": "1200px",
        "plx-wide": "1360px",
        "plx-readable": "760px"
      }
    }
  }
};
```

### 8.3 Suggested Token Structure

```text
tokens/
  color.brand
  color.neutral
  color.semantic
  typography.family
  typography.scale
  spacing.scale
  radius.scale
  shadow.scale
  layout.container
components/
  button
  input
  card
  badge
  navigation
  table
  tabs
  modal
  alert
patterns/
  hero
  service-grid
  testimonial-strip
  lead-magnet
  consultation-form
```

### 8.4 Accessibility Baseline

- Text on `#FEC710` should use `#1F1741`, not white.
- Body text on white should use `#1F1741` or `#54595F`.
- Focus states must be visible and not rely only on yellow fill.
- Touch targets: at least 44px height.
- Form errors must include text, not only red border.
- CTA labels should be action-specific: "Sjednat online schůzku", not generic "Odeslat".

## 9. Recommended Marketing Patterns

### 9.1 Hero

Structure:

- Eyebrow: service/category.
- H1: outcome-focused promise.
- Lead: short explanation in plain Czech.
- Primary CTA: consultation or workbook.
- Secondary link: service detail.
- Visual: product/process illustration, service diagram or real screenshot.

### 9.2 Service Grid

Default 3 cards:

- Automatizace procesů
- Implementace CRM/ERP systému
- Konzultace / analýza

Each card needs:

- specific service title,
- 1-2 sentence value,
- subtle visual/icon,
- text link or secondary CTA.

### 9.3 Trust Section

Use testimonials as credibility anchors. Keep quote cards readable and avoid overloading with too many logos at once. If using a logo wall, pair it with one clear headline and one short proof statement.

### 9.4 Lead Magnet / Form

Forms should feel calm and trustworthy:

- 2-column on desktop,
- single column on mobile,
- clear privacy text,
- yellow primary submit button,
- no excessive required fields above the fold.

## 10. Co ještě vyjasnit nebo navrhnout navíc

Pro další iteraci by bylo dobré doplnit:

- přesné logo usage rules: ochranná zóna, minimální velikost, světlá/tmavá verze,
- reálnou sadu ikon: line icons vs filled icons, tloušťka tahu, velikosti,
- pravidla pro fotky týmu a zákazníků,
- case-study šablonu,
- blog/editorial šablonu,
- detailní formulářový systém pro lead generation,
- komponentové specifikace ve Figmě nebo Storybooku,
- pravidla pro aplikaci / produktové UI, pokud Plexima později půjde mimo marketingový web.

## 11. Implementation Checklist

Před nasazením nové Plexima stránky ověř:

- používá se `Nunito` pro nadpisy a `Open Sans` pro body/UI,
- `#FEC710` je hlavní CTA akcent a není nadužívaná,
- text na žluté je `#1F1741`,
- radius výchozích prvků je 5px,
- inputy mají výraznější radius a focus ring,
- komponenty mají hover/focus/disabled/error stavy,
- layout používá container 1200px a responsive gutters,
- marketingové sekce mají dost vzduchu,
- žádná sekce nepůsobí jako generická šablona bez Plexima obsahu.
