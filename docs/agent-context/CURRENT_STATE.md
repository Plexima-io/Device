# CURRENT_STATE.md — DRAKO × Plexima

Aktualizováno: 2026-08-01

## Celkový stav

Profil a projektové autority jsou přestavěné kolem DRAKO jako konzultanta a solution designera pro Pleximu. Workspace má dvě souběžné oblasti: placenou klientskou práci a Omi / firemní paměť.

Výchozí priorita je klientská práce a její termíny. Omi pokračuje souběžně, pokud DRAKO neurčí jinak nebo nevznikne materiální Omi příležitost.

## Klientská práce

### Stav klientské oblasti

- Canonical metoda je `podklady → interní analýza potřeb → otázky → potvrzení → návrh řešení → klientský derivát`.
- Klientské podklady a výstupy zůstávají v `Klienti/<klient>/`.
- Aktivní klientské příležitosti mohou existovat ve složce `Klienti/`, ale jejich pořadí není v tomto dokumentu potvrzené. Určuje je aktuální instrukce a reálný termín.

### Blocker

Žádný globální metodický blocker. Pro konkrétního klienta se blocker určí až z jeho přímých podkladů.

### Nejbližší provozní krok

Při další klientské misi použít nový dvoustupňový workflow na skutečných podkladech a zapsat stav pouze do klientské složky.

## Omi / firemní paměť

### Stav Omi

- DRAKO vlastní strategii, nikoliv každodenní provedení.
- Současný cíl je oslovit první potenciální klienty a získat feedback.
- Omi je výchozí hardware, ale hodnota a positioning stojí na firemní paměti a navazující službě.
- Cílová doména je `device.plexima.io`; její současný veřejný obsah není aktuální autorita.
- Apollo, Clay a další nástroje jsou pouze kandidáti pro budoucí automatizovaný outreach.

### Hlavní blocker

ICP a první validační segment nejsou definované. Bez nich se nemá aktivovat automatizovaný outreach ani odvozovat positioning ze starého webu.

### Nejbližší strategický krok

Definovat první ICP hypotézu a validační kohortu; potom navrhnout messaging, test a teprve následně vybrat outreach stack.

## Co teď nedělat

- nepřidávat další univerzální router nebo metodickou vrstvu;
- nenačítat starý obsah `device.plexima.io` jako aktuální strategii;
- nespouštět plošný Omi outreach bez ICP a schválení;
- nepřenášet klientská data nebo předpoklady mezi složkami;
- neměnit web, klientská data, placené nástroje, crony, commit ani deployment bez explicitního scope.