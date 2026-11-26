# DRAKO × Plexima workspace

Pracovní prostředí DRAKO pro veškerou činnost vykonávanou jménem Pleximy.

## Dvě pracovní oblasti

### Klientská práce

Klientské složky, podklady, přepisy, interní analýzy potřeb, návrhy řešení a komunikace jsou v `Klienti/`. Každý klient zůstává izolovaný.

### Omi / firemní paměť

Strategie nabídky, validace, web, partnerství a budoucí automatizovaný outreach. Aktuální produkční doména je `memory.plexima.io` a její nasazený obsah je správná aktuální varianta webu.

## Mapa autorit

| Potřeba | Autorita |
|---|---|
| Agentní routing a pravidla | `AGENTS.md` |
| Aktuální handoff obou oblastí | `docs/agent-context/CURRENT_STATE.md` |
| Omi strategie | `docs/agent-context/STRATEGY.md` |
| Omi rozhodnutí | `docs/agent-context/DECISIONS.md` |
| Klientský kontext a výstupy | `Klienti/<klient>/` |
| Omi webové podklady | `docs/plexima-omi-web-struktura-cz.md`, `docs/homepage-wireframe-copy-cz.md`, `docs/use-cases-cz.md` |
| Design systém | `design/plexima-design-system.md`, `design/brand-spec.md` |
| Zdroj webu | `web/` |

## Kam jít

| Složka | Co tam je |
|---|---|
| `web/` | Publikovaný web včetně `api/`, `assets/`, `Fotky/`, `scenare/` a `vercel.json`. Nasazuje se na `memory.plexima.io`, Vercel má Root Directory nastavené na `web`. |
| `docs/` | Naše specifikace, rozhodnutí a handoff. |
| `design/` | Design systém a brand spec. |
| `artifacts/` | Hotové výstupy, decky a PDF. |
| `Klienti/`, `Personal/` | Lokální, mimo git. |

Do kořene nepatří nic nového. Kód webu vždy do `web/`.

## Homepage: návrat a skryté sekce

Homepage (`web/index.html`) byla v listopadu 2026 přestavěna na konverzní stránku „inteligentní paměť firmy“ pro firmy od 20 lidí. Změny jdou přes větev `homepage-pamet-firmy` a pull request, do `main` až po schválení Vercel náhledu.

### Návrat na původní homepage

- **Okamžitě, bez kódu:** ve Vercelu otevřete projekt → **Deployments**, najděte poslední nasazení před sloučením přestavby a zvolte **⋯ → Instant Rollback**. Produkce se vrátí během pár sekund. Další push do `main` rollback zase přepíše.
- **Trvale v kódu:** původní stav je uložený v tagu `homepage-puvodni-2026-11`.
  ```bash
  git checkout main && git pull
  git checkout homepage-puvodni-2026-11 -- web/index.html
  git commit -m "Návrat původní homepage" && git push origin main
  ```
  Pro návrat celého webu místo jen homepage použijte `git revert` na merge commit přestavby.

### Zapnutí skrytých sekcí

Nic se nesmazalo. Skryté části zůstaly v `web/index.html` beze změny, jen jsou zabalené do `<template data-sekce="…">`. Prohlížeč je nevykreslí. Zapínají se v `web/assets/homepage-sekce.js`: u příslušného klíče přepněte `false` na `true`, commitněte a zkontrolujte Vercel náhled.

| Klíč | Co zapne |
|---|---|
| `profese` | sekce „Každá profese potřebuje pamatovat něco jiného“ |
| `jak-puvodni` | původní sekce „Zachytit. Pochopit. Napojit.“ se záložkami (nahrazená sticky scrollem; při zapnutí nový blok odeberte) |
| `prospirio-integrace` | logo Prospirio Hub v sekci Integrace |
| `koupit-omi` | sekce s tlačítkem „Koupit Omi“ a modální okno objednávky |
| `exit-popup` | exit-intent pop-up |
| `menu-zarizeni`, `menu-priklady` | položky menu „Zařízení“ a „Příklady z praxe“ |
| `paticka-podstranky` | odkazy v patičce na Co je Omi, Co je Plaud, Příklady z praxe |
| `dotaznik-odkaz` | původní odkazy „Zjistit, kde začít“ na dotazník |
| `hero-puvodni` | původní hero (zobrazí se nad novým; pro úplnou výměnu je potřeba nový hero odebrat) |
| `sluzba-puvodni`, `proc-plexima-puvodni` | původní samostatné sekce „Služba“ a „Proč Plexima“ |
| `karta-crm` | původní karta „CRM se plní pozdě. Rozhoduje se podle odhadů.“ |

Podstránky `/scenare/*`, `/priklady`, `/co-je-omi`, `/co-je-plaud`, `/prospirio-hub` a `/dotaznik` dál fungují, jen na ně nevedou odkazy z homepage.

### A/B test a měření

- Logika je v `web/assets/mereni.js`. Varianta hero se přidělí 50:50 a uloží do cookie `pm_hero` na 30 dní. Vynutit ji jde parametrem `?hero=a` nebo `?hero=b`.
- Události do `dataLayer`: `hero_variant`, `cta_click` (s `cta_location`), `calculator_interaction`, `consultation_booked`. Každá nese `hero_variant` a uložené UTM/gclid.
- UTM a gclid se ukládají do cookie `pm_attr` na 90 dní a připojují se ke všem odkazům na Calendly.
- `consultation_booked` se odesílá na `/dekujeme?typ=rezervace`. V Calendly musí být u události nastavené přesměrování po rezervaci na `https://memory.plexima.io/dekujeme?typ=rezervace`, bez předávání údajů o účastníkovi v URL.

## Agentní vstup

Hermes načte `.hermes.md`, který směruje do `AGENTS.md`. Další dokumenty se načítají pouze podle pracovní oblasti a konkrétní mise.

Profilový kontrakt je v `~/.hermes/profiles/plexima/SOUL.md`.