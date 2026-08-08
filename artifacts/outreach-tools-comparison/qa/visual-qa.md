# Visual QA - srovnani outreach nastroju

Datum kontroly: 5. 8. 2026

## Provedene kontroly

- PDF bylo pregenerovano do `artifacts/outreach-tools-comparison/final/srovnani-outreach-nastroju-cz.pdf`.
- Soubor byl overen pres `pdfinfo`: A4 portrait, 2 strany, bez sifrovani.
- Textova extrakce byla overena pres `pypdf`: 2 strany, 5128 extrahovatelnych znaku.
- Klikatelne odkazy byly overeny pres PDF anotace: 6 odkazu ve zdrojove casti.
- Kazda strana byla vyrenderovana do PNG pres `pdftoppm -png -r 150`.
- Vizuálne byly zkontrolovany nahledy `page-1.png` a `page-2.png`.

## Vysledek

- Dokument je zkracen na tri vybrane nastroje: lemlist, Apollo a Instantly.
- Byly odstraneny casti o metrikach testu, overovani kvality ceskych dat, provoznim modelu a internich rizikovych poznamkach.
- Prvni strana obsahuje ucel srovnani, kratke shrnuti a hlavni srovnavaci tabulku.
- Druha strana obsahuje strucny detail nastroju, jednoduche porovnani a zdroje.
- Header a footer jsou konzistentni na obou stranach.
- Tabulka je citelna, bez osamocenych radku a bez orezu textu.
- Text v panelech a zdrojich nepreteka pres okraje ani footer.

QA stav: vyhovuje.
