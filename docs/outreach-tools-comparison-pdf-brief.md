# Zadání pro Codex: PDF srovnání B2B outreach nástrojů

## Úkol

Vytvoř profesionální české PDF srovnávající nástroje pro automatizované a personalizované oslovování českých firem na pracovní e-mailové adresy.

Výsledný dokument je interní rozhodovací podklad pro DRAKO × Plexima. Nemá být marketingovým materiálem žádného dodavatele ani právním stanoviskem.

## Požadované výstupy

Vytvoř:

1. `artifacts/outreach-tools-comparison/final/srovnani-outreach-nastroju-cz.pdf`
2. editovatelný zdroj PDF v `artifacts/outreach-tools-comparison/source/`
3. PNG náhled každé stránky v `artifacts/outreach-tools-comparison/qa/`
4. krátký QA záznam v `artifacts/outreach-tools-comparison/qa/visual-qa.md`

Nevytvářej commit, push ani deployment.

## Povinné projektové autority

Před prací načti:

1. kořenový `AGENTS.md`;
2. `docs/pdf-style-reference.md` jako hlavní vizuální autoritu;
3. tento soubor jako obsahové zadání.

Nepřebírej vizuál z klientských dokumentů ani z jiných projektů.

## Vizuální zadání

Použij výchozí styl z `docs/pdf-style-reference.md`:

- A4 na výšku;
- přibližně 42 pt levý a pravý okraj;
- tmavě modrofialový header `#211747`;
- hlavní text `#252A3A`;
- doplňkový text `#626A7D`;
- světlé ohraničení `#D9DEEA`;
- žlutý akcent `#FEC710`;
- Arial;
- profesionální, vzdušný B2B vzhled;
- tabulky s tmavým záhlavím a střídáním bílých a světle šedých řádků;
- doporučení zvýrazni světle zeleným panelem;
- rizika a neznámé zvýrazni světle žlutým panelem;
- nepoužívej loga dodavatelů, pokud nejsou lokálně dostupná a jejich použití není nutné;
- nepřidávej dekorativní ilustrace, které nenesou informaci.

Header:

- vlevo: `Plexima | B2B outreach`;
- vpravo: `Interní srovnání | strana/celkem`.

Footer:

- vlevo: `Plexima | Interní rozhodovací podklad`;
- vpravo: aktuální datum vytvoření dokumentu.

Cílový rozsah je přibližně 4–6 stran. Čitelnost a správné zalomení mají přednost před přesným počtem stran.

## Název dokumentu

# Srovnání nástrojů pro automatizovaný B2B outreach

Podtitul:

`Apollo, lemlist, Instantly, Clay a Salesforge pro cílené oslovování českých firem`

## Kontext a cíl

Cílem je vybrat nástroj pro:

- vyhledávání českých firem;
- nalezení aktuálních kompetentních osob podle pracovní role a seniority;
- získání a ověření pracovních e-mailových adres;
- personalizaci prvního oslovení;
- automatické e-mailové sekvence a follow-upy;
- ochranu doručitelnosti a reputace odesílatele;
- případné budoucí napojení na Hermes, Codex nebo jiné automatizace.

Vlastní agentní integrace je výhodou, nikoliv podmínkou. Je přijatelné používat AI a automatizace přímo uvnitř vybraného nástroje.

Současná fáze není plošné škálování. Cílem je nejprve ověřit první segment, messaging a kvalitu českých kontaktů na omezeném vzorku.

## Shrnutí doporučení

Hlavní doporučené pořadí:

1. **lemlist** — nejlepší výchozí all-in-one nástroj pro první český pilot;
2. **Apollo** — nejlepší kandidát na kvalitnější vyhledávání kompetentních osob a alternativní sourcing kontaktů;
3. **Instantly** — nejsilnější kandidát pro pozdější škálování odesílací infrastruktury;
4. **Clay** — přidat až tehdy, pokud jedna databáze neposkytne dostatečná česká data;
5. **Salesforge** — cenově zajímavá, ale méně průhledná alternativa z hlediska kompletního sourcingového stacku.

Doporučený start je **lemlist**, ale nikoliv jako definitivně prokázaný vítěz kvality českých dat. Kvalita musí být ověřena head-to-head testem proti Apollu na stejném seznamu českých firem.

## Hlavní srovnávací tabulka

Uveď tabulku s následujícím obsahem. Ceny označ jako orientační, bez DPH, domén a samostatně placených e-mailových schránek.

| Nástroj | Orientační cena | Hlavní možnosti | Ověřování a doručitelnost | Integrace | Role v doporučeném stacku |
|---|---:|---|---|---|---|
| **lemlist** | Email od **55 USD / uživatel / měsíc**, multichannel od **87 USD** | Databáze 650M+ kontaktů, account a role-based prospecting, e-mailové a multichannel sekvence, AI research a personalizace | Finder a verifier přes více poskytovatelů, Deliverability Hub, warm-up; ověřený e-mail přibližně 0,05 USD podle zveřejněného kreditového modelu | REST API, webhooks, CLI a MCP | Doporučený all-in-one nástroj pro první pilot |
| **Apollo** | Basic **49 USD**, Professional **99 USD / uživatel / měsíc** | Pokročilé filtrování firem, pracovních rolí, seniority a lokality, enrichment, sekvence a CRM funkce | Ověřené e-maily a funkce pro deliverability; méně specializované na infrastrukturu více mailboxů | Rozsáhlé API; dostupnost a limity relevantních endpointů je nutné ověřit pro konkrétní tarif | Alternativní nebo doplňkový zdroj kvalitnějších kontaktů |
| **Instantly** | Outreach Growth **47 USD** + Growth Credits **47 USD**, praktický start dat a odesílání přibližně **94 USD / měsíc** | Databáze 450M+ B2B kontaktů, enrichment, více mailboxů, kampaně a centralizované odpovědi | Waterfall pracovní e-mail přes 5+ poskytovatelů, verifikace, neomezený warm-up a pokročilé funkce odesílací infrastruktury | REST API v2, webhooks, oddělená oprávnění API klíčů | Pozdější škálování odesílání po potvrzení segmentu a messagingu |
| **Clay** | Launch přibližně **167 USD / měsíc**, Growth přibližně **446 USD / měsíc** | Skládání enrichmentu z více než 150 poskytovatelů, vlastní datové workflow, signals, research a native sequencer | Waterfall enrichment a ověřování přes různé zdroje; není primárně mailbox-infrastructure nástrojem | Agent plugin, CLI/API, vlastní API klíče, HTTP API a webhooks | Pokročilá enrichment vrstva, pokud Apollo ani lemlist nestačí |
| **Salesforge** | Basic **40 USD**, Growth **80 USD / měsíc** | Sekvence, AI personalizace, více senderů, centralizované odpovědi; lead sourcing je součástí širšího Forge ekosystému | Basic 300 a Growth 1 000 validačních kreditů, warm-up a rotace mailboxů/IP | Salesforge API ve vyšší vrstvě | Cenově zajímavá alternativa, ale ne první doporučená volba |

## Hodnocení jednotlivých nástrojů

### 1. lemlist

**Silné stránky**

- nejucelenější kombinace prospectingu, ověřování, personalizace a odesílání;
- databáze kontaktů a hledání přes více datových poskytovatelů;
- e-mailové i multichannel sekvence;
- warm-up a Deliverability Hub;
- vlastní AI lze použít bez nutnosti stavět externí agentní vrstvu;
- zároveň zachovává možnost REST API, webhooků, CLI a MCP.

**Slabiny a neznámé**

- globální velikost databáze neprokazuje kvalitu českých kontaktů;
- aktuálnost rolí a pracovních e-mailů musí být ověřena na reálném segmentu;
- cena enrichment kreditů se připočítává podle skutečného využití.

**Verdikt**

Nejlepší první nástroj pro omezenou validační kampaň, pokud test potvrdí dostatečné pokrytí českých kompetentních osob.

### 2. Apollo

**Silné stránky**

- velmi silné filtrování podle společnosti, pracovní role, seniority a lokality;
- vhodné pro hledání více stakeholderů v jedné firmě;
- enrichment, CRM workflow a e-mailové sekvence v jednom prostředí;
- může sloužit jako datový zdroj a exportovat kontakty do jiného senderu.

**Slabiny a neznámé**

- skutečná kvalita českých dat není veřejně auditovaná;
- veřejný pricing nedává dostatečně jasnou odpověď na API limity v nižších tarifech;
- deliverability není jeho nejsilnější diferenciátor.

**Verdikt**

Nejlepší srovnávací kandidát proti lemlistu. Pokud najde výrazně více aktuálních českých decision-makerů, doporučená kombinace je sourcing v Apollu a odesílání přes lemlist.

### 3. Instantly

**Silné stránky**

- silná správa více e-mailových účtů;
- warm-up a nástroje zaměřené na odesílací reputaci;
- databáze, waterfall enrichment a verifikace;
- API v2 a možnost automatizovaného workflow.

**Slabiny a neznámé**

- data a outreach jsou účtovány odděleně;
- pro první malou validaci nabízí více odesílací kapacity, než je potřeba;
- české pokrytí musí být otestováno stejně jako u ostatních globálních databází.

**Verdikt**

Vhodný po potvrzení segmentu, nabídky a fungující zprávy, nikoliv jako první nákup pro discovery.

### 4. Clay

**Silné stránky**

- nejsilnější orchestrace více datových zdrojů;
- waterfall enrichment a možnost použít vlastní poskytovatele;
- flexibilní research, signals a personalizace;
- velmi dobrá připravenost na vlastní automatizace a coding agenty.

**Slabiny a neznámé**

- vyšší cena;
- větší provozní složitost;
- pro první stovku kontaktů může být nepřiměřeně robustní;
- kvalitní sending často stále vyžaduje specializovaný navazující nástroj.

**Verdikt**

Přidat až jako řešení prokázaného problému s pokrytím českých kontaktů nebo složitějším enrichmentem.

### 5. Salesforge

**Silné stránky**

- nízká vstupní cena;
- validace e-mailů, warm-up a práce s více sendery;
- AI personalizace a automatizované sekvence;
- API ve vyšším tarifu.

**Slabiny a neznámé**

- lead sourcing je rozdělený mezi více produktů Forge ekosystému;
- celková cena kompletního sourcingu a odesílání je méně průhledná;
- pro český pilot nemá jasnou výhodu proti lemlistu nebo Apollu.

**Verdikt**

Zajímavá cenová alternativa, ale nikoliv doporučený výchozí nástroj.

## Jak ověřit kvalitu českých dat

Marketingové údaje o velikosti databází nestačí. Lemlist ani Apollo nezveřejňují auditovaný údaj o pokrytí českých rozhodovatelů.

Doporučený head-to-head test:

1. vybrat jeden český validační segment;
2. sestavit nezávislý seznam 100 českých firem;
3. předem definovat jednu primární, jednu sekundární a jednu náhradní kompetentní roli;
4. spustit stejné hledání v lemlistu a Apollu;
5. exportovat výsledky a odstranit duplicity;
6. ručně ověřit aktuálnost firmy a pracovní role proti přímému zdroji;
7. porovnat dostupnost a status pracovních e-mailů;
8. vypočítat cenu a ruční čas na jeden skutečně použitelný kontakt.

### Metriky testu

- pokrytí firem;
- podíl firem s alespoň jednou kompetentní osobou;
- přesnost pracovní role;
- aktuálnost zaměstnání;
- podíl osobních pracovních e-mailů;
- podíl verified, catch-all, unknown a invalid adres;
- množství obecných adres typu `info@`;
- duplicity a nekonzistentní záznamy;
- cena za použitelný kontakt;
- čas potřebný na získání 100 použitelných kontaktů.

### Definice použitelného kontaktu

Kontakt se započítá pouze tehdy, když:

- patří ke správné firmě;
- ve firmě aktuálně pracuje;
- odpovídá předem definované kompetentní roli;
- má osobní pracovní e-mail;
- adresa není označena jako invalid;
- nejde o duplicitu.

## Doporučený provozní model

Použij jednoduché schéma:

`vybraný segment → lemlist/Apollo sourcing → ověření kontaktu → AI personalizace → schvalovací fronta → lemlist sekvence → vyhodnocení odpovědí`

Pokud Apollo prokáže výrazně lepší česká data:

`Apollo sourcing → export ověřených kontaktů → lemlist personalizace a odesílání`

Pokud oba nástroje prokážou slabé pokrytí:

`český firemní zdroj → Clay nebo více enrichment poskytovatelů → verifier → lemlist odesílání`

## Doručitelnost a rizika

Jasně odděl kvalitu databáze od kvality odesílací infrastruktury.

Ani jeden nástroj sám nezaručuje doručení do inboxu. Před kampaní bude potřeba:

- bezpečně oddělená odesílací doména nebo subdoména;
- správné SPF, DKIM a DMARC;
- ověřené pracovní adresy;
- nízký počáteční objem a postupné zvyšování;
- okamžité vyřazování bounce, unsubscribe a negativních odpovědí;
- ochrana hlavní domény `plexima.io`;
- samostatná právní validace režimu automatizovaného cold emailu v ČR.

Nevytvářej právní závěr. Pouze uveď, že spuštění automatického odesílání vyžaduje samostatné právní a interní schválení.

## Konečné doporučení

Zvýrazni tuto závěrečnou formulaci:

> Pro první českou validační kampaň doporučujeme otestovat lemlist jako hlavní all-in-one nástroj a Apollo jako kontrolní databázovou alternativu. O vítězi nemá rozhodnout globální velikost databáze, ale počet aktuálních kompetentních osob s použitelným pracovním e-mailem na stejném vzorku českých firem. Instantly dává smysl až při pozdějším škálování odesílání a Clay pouze tehdy, pokud jedna databáze neposkytne dostatečné české pokrytí.

## Zdroje

Použij tyto autoritativní zdroje a zachovej je v poslední části PDF jako klikatelné odkazy:

1. Apollo Pricing — https://www.apollo.io/pricing
2. Apollo People API Search — https://docs.apollo.io/reference/people-api-search
3. Clay Pricing — https://www.clay.com/pricing
4. lemlist Pricing — https://www.lemlist.com/pricing
5. lemlist API, CLI a MCP — https://developer.lemlist.com/api-reference/getting-started/overview
6. Instantly Pricing — https://instantly.ai/pricing
7. Instantly API — https://developer.instantly.ai/
8. Salesforge Pricing — https://www.salesforge.ai/pricing

Před vytvořením PDF ověř, zda se ceny na zdrojových stránkách nezměnily. Pokud ano, aktualizuj cenu i související text a poznamenej datum ověření. Nevymýšlej chybějící údaj; označ jej jako neveřejný nebo k ověření.

## Povinná kontrola před dokončením

1. Vygeneruj PDF.
2. Ověř, že soubor existuje a lze jej otevřít.
3. Zkontroluj počet stran a extrakci textu z PDF.
4. Vyrenderuj každou stránku do PNG.
5. Vizuálně zkontroluj všechny stránky, zejména:
   - oříznutý nebo přetékající text;
   - příliš malé písmo;
   - přerušené tabulky;
   - osamocené nadpisy na konci stránky;
   - nekonzistentní header a footer;
   - nefunkční nebo nečitelné zdroje;
   - příliš husté panely a prázdné dekorace.
6. Oprav nalezené problémy a PDF znovu vyrenderuj.
7. Do `visual-qa.md` zapiš skutečně provedené kontroly a výsledek.

Za dokončený výsledek považuj pouze ověřené PDF a jeho vyrenderované náhledy, nikoliv samotný zdroj nebo build bez vizuální kontroly.
