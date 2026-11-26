/*
 * Přepínače skrytých sekcí homepage (memory.plexima.io).
 *
 * Skryté části jsou v index.html beze změny zabalené do
 * <template data-sekce="klic"> ... </template>. Obsah šablony se nevykreslí
 * ani nespustí. Když u klíče níže nastavíte true, šablona se při načtení
 * stránky nahradí původním obsahem, ještě než doběhnou skripty stránky.
 *
 * Postup zapnutí: změňte false na true, commit, push, zkontrolovat Vercel náhled.
 */
window.HOMEPAGE_SEKCE = {
  'hero-puvodni': false,          // původní hero „To nejdůležitější z rozhovorů často zapadne“
  'profese': false,               // sekce „Každá profese potřebuje pamatovat něco jiného“ (karusel scénářů)
  'jak-puvodni': false,           // původní sekce „Zachytit. Pochopit. Napojit.“ se záložkami (nahrazena sticky scrollem)
  'prospirio-integrace': false,   // logo Prospirio Hub v sekci Integrace
  'koupit-omi': false,            // sekce s tlačítkem „Koupit Omi“ a modální okno objednávky
  'exit-popup': false,            // exit-intent pop-up „Počkejte, tohle se vám bude hodit“
  'menu-zarizeni': false,         // položka menu „Zařízení“ (Plaud, Omi)
  'menu-priklady': false,         // položka menu „Příklady z praxe“
  'paticka-podstranky': false,    // odkazy v patičce na Co je Omi, Co je Plaud, Příklady z praxe
  'dotaznik-odkaz': false,        // původní odkazy „Zjistit, kde začít“ na dotazník
  'sluzba-puvodni': false,        // původní samostatná sekce „Služba“ (nahrazena spojenou sekcí)
  'proc-plexima-puvodni': false,  // původní samostatná sekce „Proč Plexima“ (nahrazena spojenou sekcí)
  'karta-crm': false              // původní karta „CRM se plní pozdě. Rozhoduje se podle odhadů.“
};

(function () {
  var cfg = window.HOMEPAGE_SEKCE || {};
  document.querySelectorAll('template[data-sekce]').forEach(function (tpl) {
    if (cfg[tpl.getAttribute('data-sekce')] === true) {
      tpl.replaceWith(document.importNode(tpl.content, true));
    }
  });
})();
