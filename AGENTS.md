# AGENTS.md — DRAKO × Plexima workspace

Tento repozitář je pracovní prostředí DRAKO pro veškerou činnost vykonávanou jménem Pleximy. Není to AI řízení společnosti Plexima ani workspace jediné nabídky.

## Autority

Používej tento řetězec:

1. aktuální instrukce DRAKO a potvrzený výsledek session;
2. profilový `SOUL.md` pro roli, autonomii, komunikaci a schvalovací gate;
3. tento `AGENTS.md` pro routing, sdílená pravidla a pracovní metodu;
4. přímé podklady a canonical dokumenty zvolené pracovní oblasti;
5. `docs/agent-context/CURRENT_STATE.md` pouze pro aktuální handoff.

`.hermes.md` je jen bootstrap do tohoto souboru. `README.md` je lidská mapa, ne druhý rulebook. Neexistuje další univerzální `START_HERE`.

## Nejdřív zařaď misi

### A. Klientská práce

Patří sem discovery, schůzky, e-maily, analýzy potřeb, CRM/ERP, automatizace, integrace, AI řešení, doporučení systému, funkční a technické návrhy a podklady nabídek.

- Placená klientská práce a její termíny mají výchozí prioritu.
- Začni v příslušné složce `Klienti/<klient>/` a načti pouze její podklady.
- Každý klient je izolovaný kontext. Nikdy nepřenášej klientská fakta, přepisy nebo závěry do jiné klientské práce.

### B. Omi / firemní paměť

Patří sem strategie, nabídka, web, partnerství, validace trhu, akvizice, automatizovaný outreach a návrh systému firemní paměti.

Načti podle potřeby:

- `docs/agent-context/STRATEGY.md` — Omi strategie;
- `docs/agent-context/DECISIONS.md` — potvrzená Omi rozhodnutí;
- Omi část `docs/agent-context/CURRENT_STATE.md` — aktuální fáze a blocker;
- task-specific web, design, produktové nebo partnerské podklady.

Omi postupuje souběžně s klientskou prací. DRAKO vlastní strategii, positioning a klíčová rozhodnutí, nikoliv každodenní provedení.

### Smíšená mise

Rozděl ji podle výsledného artefaktu. Klientská nabídka se řídí klientskou metodou; Omi strategie zůstává ve své autoritě. Sdílený nástroj nebo technologie nejsou důvodem smíchat fakta a pravidla obou oblastí.

## Kontext Pleximy

Plexima je český B2B partner pro:

- procesní analýzu;
- CRM a ERP, zejména Creatio;
- Make a automatizace workflow;
- API a další integrace;
- zapojení AI do firemních procesů.

Plexima nemá být prezentována jako prodejce jediného CRM ani jako generická AI agentura. Nejprve chápe potřebu, potom doporučuje vhodný systém nebo kombinaci nástrojů a realizovatelnou integrační cestu.

Při návrhu nejdřív ověř existující funkce, standardní moduly, marketplace komponenty a konektory. Custom vývoj doporuč až po prokázání, že jednodušší řešení nestačí.

## Role DRAKO

DRAKO:

- jedná a komunikuje jménem Pleximy;
- vlastní discovery, analýzu potřeb, solution design a přípravu komunikace;
- může v klientském výstupu používat `my` a `za Pleximu`;
- nemusí klientům zmiňovat svůj externí smluvní status;
- bez interního potvrzení nezavazuje Pleximu cenou, rozsahem, termínem nebo implementačním slibem.

## Standard klientské práce

### 1. Převzetí podkladů

- Začni přímými dokumenty, přepisem, e-maily, procesními materiály a relevantními přílohami.
- Zkontroluj všechny dostupné podklady dřív, než vytvoříš otázky.
- Nevymýšlej chybějící odpovědi a neopakuj otázku, kterou zdroj již spolehlivě zodpovídá.

### 2. Interní analýza potřeb

To je první canonical výstup. Odděluje potřebu od řešení a podle dostupnosti pokrývá:

- kontext, cíl a očekávaný výsledek;
- současný proces, problém a jeho dopad;
- uživatele, role, vlastníky rozhodnutí a budoucího vlastníka systému;
- funkční a technické požadavky;
- objemy, výchozí hodnoty a měřitelné cíle;
- data, systémy, integrace a zdroje pravdy;
- priority, závislosti, adopci a rizika;
- budoucí potřeby explicitně odložené mimo aktuální scope.

Každé materiální tvrzení označ:

- **potvrzeno klientem** — s dokumentem, stránkou nebo timestampem;
- **odvozeno z kontextu** — označená inference;
- **neznámé** — s dopadem na další rozhodnutí.

### 3. Doplňující otázky

Seřaď je podle dopadu:

1. blokují návrh řešení;
2. ovlivňují rozsah, cenu nebo termín;
3. lze je dořešit při technické analýze nebo implementaci.

### 4. Readiness gate

Návrh řešení začni teprve, když jsou dostatečně známé cíl, scope, proces, uživatelé, požadavky, data, systémy, integrace, rozhodovací kritéria a blokující neznámé. Readiness je technicko-funkční, nikoliv právní stanovisko.

### 5. Návrh řešení

Musí odpovídat na potvrzenou analýzu a podle potřeby obsahovat:

- `as-is → to-be` a důvod každé hlavní změny;
- doporučený systém nebo architekturu a relevantní alternativy;
- mapování potřeby → požadavek → priorita → akceptace → způsob realizace;
- klasifikaci standard / konfigurace / integrace / marketplace / custom;
- komponenty, datový model, integrace a datové toky;
- migraci, technická rizika, závislosti a nefunkční požadavky;
- fáze implementace, UAT a akceptační kritéria;
- vlastníka systému, adopci a provozní model;
- otevřená technická a obchodní rozhodnutí.

Cena, licence, pracnost a termín se uvádějí jen tehdy, když je dodal nebo ověřil odpovědný technický či obchodní vlastník.

### 6. Klientský derivát

Vzniká pouze z interní analýzy nebo návrhu. Je stručný, srozumitelný a neobsahuje interní citlivé úvahy, nepodložené závěry ani předčasné sliby. Odeslání vždy vyžaduje schválení.

## Technická a právní hranice

Zachycuj technická fakta o přístupech, uložení, přenosech, retenci, exportu, mazání, auditovatelnosti a zabezpečení. Neposkytuj právní nebo GDPR výklad; nejistotu pouze označ k validaci klientem, Pleximou nebo kvalifikovaným poradcem.

## Omi hard rules

- Hlavní hodnotou je firemní paměť a navazující služba, ne samotný gadget.
- Omi je výchozí hardware, ale vrstva musí zůstat nahraditelná.
- ICP zatím není definovaný. Nevymýšlej jej a neprezentuj hypotézu jako rozhodnutí.
- `device.plexima.io` je cílová doména. Její současný veřejný obsah není aktuální autorita a nesmí se používat jako zdroj strategie nebo positioningu.
- Současný obchodní cíl je získat první klienty a feedback.
- Apollo, Clay a další nástroje jsou kandidáti pro budoucí automatizovaný outreach, nikoliv schválený stack.
- Aktivace placených nástrojů, kampaní, sekvencí nebo automatického odesílání vyžaduje schválení.

Pro web a vizuály načti až podle konkrétní mise `design/plexima-design-system.md`, `design/brand-spec.md` a příslušné copy dokumenty. Nekopíruj vizuál Omi.

## Evidence, komunikace a kvalita

- Ověř aktuální produkty, integrace, ceny a technické možnosti v autoritativních zdrojích.
- Rozlišuj fakt, inferenci, neznámé a doporučení.
- Doporuč jednu cestu; více možností ukaž jen při skutečně odlišném rozhodnutí.
- Klientský český výstup má být praktický, věcný, důvěryhodný a bez AI hype.
- Při tvorbě klientských nebo interních PDF použij, pokud je relevantní, `docs/pdf-style-reference.md`.
- Technický build nebo test neprokazuje automaticky obchodní, obsahovou nebo vizuální správnost. Otevři skutečný výstup.

## Data, scope a externí akce

- Klientská data zůstávají v klientské složce a nepatří do Hermes memory ani reusable skillů.
- Externí zprávy lze připravit, ale ne odeslat bez schválení.
- Bez schválení nevytvářej cenu, závazný scope či termín, nezahajuj implementaci, neměň klientská nebo produkční data, neaktivuj placený nástroj, cron nebo outreach.
- Necommituj, nepushuj a nedeployuj bez výslovného pokynu.
- Neměň jiné Workspace projekty, profily, credentials, skills, memory nebo crony bez explicitního scope.
- Neprováděj drive-by úpravy existujícího webu nebo kódu, pokud mise není implementační.

## Dokumentační write-back

- role, autonomie a dlouhodobé chování → profilový `SOUL.md`;
- routing a sdílená metoda → tento `AGENTS.md`;
- aktuální handoff obou oblastí → `docs/agent-context/CURRENT_STATE.md`;
- Omi strategie → `docs/agent-context/STRATEGY.md`;
- Omi rozhodnutí → `docs/agent-context/DECISIONS.md`;
- klientská fakta, analýzy a stav → příslušná složka `Klienti/<klient>/`;
- lidská orientace → `README.md`.

Zapisuj pouze durable signal. Nevytvářej paralelní router, obecný `START_HERE`, deník práce ani novou metodickou vrstvu pro hypotetickou potřebu.

## Definition of done

Práce je hotová pouze tehdy, když:

1. odpovídá správné pracovní oblasti a canonical zdrojům;
2. požadavky a tvrzení mají jasný důkazní status;
3. výstup byl otevřen a ověřen;
4. zbývající materiální blocker je pojmenovaný;
5. DRAKO dostane jedno konkrétní doporučení na další krok.