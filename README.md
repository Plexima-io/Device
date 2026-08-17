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
| Zdroj webu | `index.html`, související HTML a assets |

## Agentní vstup

Hermes načte `.hermes.md`, který směruje do `AGENTS.md`. Další dokumenty se načítají pouze podle pracovní oblasti a konkrétní mise.

Profilový kontrakt je v `~/.hermes/profiles/plexima/SOUL.md`.