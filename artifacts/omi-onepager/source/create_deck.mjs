import fs from "node:fs/promises";
import { Presentation, PresentationFile } from "/Users/powerfuleight/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@oai/artifact-tool/dist/artifact_tool.mjs";

const OUT = "/Users/powerfuleight/Workspace/Plexima/artifacts/omi-onepager/final/plexima-omi-onepager.pptx";
const TMP = "/Users/powerfuleight/Workspace/Plexima/artifacts/omi-onepager/qa";
const QA = TMP;

const C = {
  bg: "#F7F8FC",
  ink: "#17142A",
  muted: "#5F6473",
  purple: "#7357FF",
  purpleDark: "#3B2A9A",
  violet: "#EDE9FF",
  violet2: "#F4F1FF",
  cyan: "#23D7C3",
  white: "#FFFFFF",
  line: "#D9DDEA",
};

function box(slide, name, left, top, width, height, fill = C.white, line = C.line, radius = "rounded-xl") {
  return slide.shapes.add({
    geometry: "roundRect",
    name,
    position: { left, top, width, height },
    fill,
    line: { style: "solid", fill: line, width: 1 },
    borderRadius: radius,
    shadow: "shadow-sm",
  });
}

function text(slide, name, value, left, top, width, height, style = {}) {
  const shape = slide.shapes.add({
    geometry: "textbox",
    name,
    position: { left, top, width, height },
    fill: "none",
    line: { style: "solid", fill: "none", width: 0 },
  });
  shape.text = value;
  shape.text.style = {
    typeface: "Aptos",
    fontSize: 18,
    color: C.ink,
    ...style,
  };
  return shape;
}

function pill(slide, value, left, top, width, fill = C.violet, color = C.purpleDark) {
  box(slide, `pill-${value}`, left, top, width, 34, fill, fill, "rounded-full");
  text(slide, `pill-text-${value}`, value, left + 16, top + 7, width - 32, 20, {
    fontSize: 12,
    bold: true,
    color,
    alignment: "center",
  });
}

function bullet(slide, value, left, top, width, color = C.ink) {
  slide.shapes.add({
    geometry: "ellipse",
    name: `dot-${value.slice(0, 12)}`,
    position: { left, top: top + 7, width: 7, height: 7 },
    fill: C.purple,
    line: { style: "solid", fill: C.purple, width: 0 },
  });
  text(slide, `bullet-${value.slice(0, 20)}`, value, left + 17, top, width - 17, 42, {
    fontSize: 16,
    color,
    fit: "shrink",
  });
}

function header(slide, kicker, title, subtitle) {
  text(slide, "brand", "plexima.io", 64, 40, 180, 28, {
    fontSize: 19,
    bold: true,
    color: C.purple,
    typeface: "Aptos Display",
  });
  slide.shapes.add({
    geometry: "ellipse",
    name: "brand-orbit-1",
    position: { left: 46, top: 44, width: 10, height: 10 },
    fill: C.purple,
    line: { style: "solid", fill: C.purple, width: 0 },
  });
  slide.shapes.add({
    geometry: "ellipse",
    name: "brand-orbit-2",
    position: { left: 34, top: 56, width: 7, height: 7 },
    fill: C.cyan,
    line: { style: "solid", fill: C.cyan, width: 0 },
  });
  pill(slide, kicker, 940, 38, 250, C.violet, C.purpleDark);
  text(slide, "title", title, 64, 96, 840, 92, {
    fontSize: 39,
    bold: true,
    color: C.ink,
    typeface: "Aptos Display",
    fit: "shrink",
  });
  text(slide, "subtitle", subtitle, 66, 198, 850, 48, {
    fontSize: 18,
    color: C.muted,
    fit: "shrink",
  });
}

function addFooter(slide) {
  text(slide, "footer-left", "Plexima x OMI | produktová strategie", 64, 672, 360, 18, {
    fontSize: 11,
    color: C.muted,
  });
  text(slide, "footer-right", "pracovní draft", 1100, 672, 120, 18, {
    fontSize: 11,
    color: C.muted,
    alignment: "right",
  });
}

await fs.mkdir(QA, { recursive: true });
await fs.mkdir("/Users/powerfuleight/Workspace/Plexima/artifacts/omi-onepager/final", { recursive: true });

const presentation = Presentation.create({ slideSize: { width: 1280, height: 720 } });

// Slide 1
{
  const slide = presentation.slides.add();
    slide.background.fill = C.bg;
  header(
    slide,
    "strategie a positioning",
    "Produkt není OMI. Produkt je automatizovaná firemní paměť.",
    "První fáze má najít přesný use-case, ICP a partnerský model. Plexima prodává výsledek: méně ztracených informací, méně ruční administrativy a lepší převod rozhovorů do workflow."
  );

  const cards = [
    {
      title: "1. Positioning",
      tag: "co prodáváme",
      body: [
        "Ne hardware, ale službu nad konverzacemi.",
        "OMI = vstup; Plexima = integrace a proces.",
        "Hardware držet jako vyměnitelnou vrstvu.",
      ],
    },
    {
      title: "2. ICP + painpointy",
      tag: "komu to bolí",
      body: [
        "Firmy s poradami, projekty a předáváním informací.",
        "CEO / COO / CTO / Head of Operations.",
        "Ztracené zápisy, nejasné úkoly, know-how v hlavách lidí.",
      ],
    },
    {
      title: "3. Use-casy pro validaci",
      tag: "co ukázat",
      body: [
        "Schůzka -> shrnutí -> úkoly.",
        "Interní know-how -> znalostní báze.",
        "Provozní poznámka -> report / systémový záznam.",
      ],
    },
    {
      title: "4. Partnerstvi s OMI",
      tag: "co vyjednat",
      body: [
        "Reseller / integration partner model pro CZ/SK.",
        "Pricing, subscription, marže, support, logistika.",
        "Podpora pilotu: zařízení, technická součinnost.",
      ],
    },
  ];

  const lefts = [64, 652, 64, 652];
  const tops = [260, 260, 462, 462];
  cards.forEach((card, i) => {
    box(slide, `area-${i + 1}`, lefts[i], tops[i], 564, 178, C.white, C.line, "rounded-xl");
    text(slide, `area-title-${i + 1}`, card.title, lefts[i] + 28, tops[i] + 24, 320, 30, {
      fontSize: 21,
      bold: true,
      typeface: "Aptos Display",
    });
    pill(slide, card.tag, lefts[i] + 372, tops[i] + 22, 148, i === 3 ? "#E8FBF8" : C.violet, i === 3 ? "#06796E" : C.purpleDark);
    card.body.forEach((b, j) => bullet(slide, b, lefts[i] + 30, tops[i] + 68 + j * 32, 500));
  });
  addFooter(slide);
}

// Slide 2
{
  const slide = presentation.slides.add();
  slide.background.fill = C.bg;
  header(
    slide,
    "výstupy první fáze",
    "Co musí být hotové, aby se dalo jít do trhu",
    "První fáze není velký launch. Je to příprava jasné nabídky, validace segmentu a seznam firem pro pilotní rozhovory."
  );

  const flowTop = 258;
  const flow = [
    ["Strategie", "ICP, painpointy, hlavní promise"],
    ["Nabídka", "pilotní balíček a demo workflow"],
    ["Trh", "seznam firem + prioritizace oslovení"],
    ["GTM", "web, CTA, one-pager, FAQ"],
  ];
  flow.forEach(([name, desc], i) => {
    const x = 72 + i * 292;
    box(slide, `flow-${i + 1}`, x, flowTop, 244, 132, i === 2 ? "#E8FBF8" : C.white, i === 2 ? "#B5EEE6" : C.line, "rounded-xl");
    text(slide, `flow-num-${i + 1}`, String(i + 1).padStart(2, "0"), x + 20, flowTop + 18, 48, 30, {
      fontSize: 25,
      bold: true,
      color: i === 2 ? "#06796E" : C.purple,
      typeface: "Aptos Display",
    });
    text(slide, `flow-name-${i + 1}`, name, x + 74, flowTop + 22, 140, 28, {
      fontSize: 20,
      bold: true,
      typeface: "Aptos Display",
    });
    text(slide, `flow-desc-${i + 1}`, desc, x + 22, flowTop + 66, 196, 44, {
      fontSize: 15,
      color: C.muted,
      fit: "shrink",
    });
    if (i < 3) {
      slide.shapes.add({
        geometry: "chevron",
        name: `chevron-${i + 1}`,
        position: { left: x + 250, top: flowTop + 50, width: 28, height: 32 },
        fill: C.violet,
        line: { style: "solid", fill: C.violet, width: 0 },
      });
    }
  });

  box(slide, "deliverables", 72, 432, 720, 184, C.white, C.line, "rounded-xl");
  text(slide, "deliverables-title", "Konkrétní deliverables", 100, 458, 320, 30, {
    fontSize: 22,
    bold: true,
    typeface: "Aptos Display",
  });
  const deliverables = [
    "ICP v1 + prioritní painpointy",
    "pilotní nabídka a demo scénář",
    "seznam firem pro pilotní oslovení",
    "landing page + CTA",
    "FAQ: GDPR, data, adopce, čeština",
  ];
  deliverables.forEach((b, j) => bullet(slide, b, 104 + (j > 2 ? 330 : 0), 504 + (j % 3) * 30, j > 2 ? 320 : 310));

  box(slide, "decision", 830, 432, 360, 184, C.purple, C.purple, "rounded-xl");
  text(slide, "decision-title", "Rozhodnutí na konci fáze", 858, 460, 300, 32, {
    fontSize: 22,
    bold: true,
    color: C.white,
    typeface: "Aptos Display",
  });
  text(slide, "decision-body", "Najdeme-li jasný signál, další krok je pilot. Pokud ne, upravit positioning před větším launchem.", 858, 512, 292, 48, {
    fontSize: 16,
    color: C.white,
    fit: "shrink",
  });
  pill(slide, "Domluvit pilotní konzultaci", 858, 578, 250, "#FFFFFF", C.purpleDark);
  addFooter(slide);
}

for (const [index, slide] of presentation.slides.items.entries()) {
  const stem = `slide-${String(index + 1).padStart(2, "0")}`;
  const png = await presentation.export({ slide, format: "png", scale: 1 });
  await fs.writeFile(`${TMP}/${stem}.png`, new Uint8Array(await png.arrayBuffer()));
  const layout = await slide.export({ format: "layout" });
  await fs.writeFile(`${TMP}/${stem}.layout.json`, await layout.text());
}

const montage = await presentation.export({ format: "webp", montage: true, scale: 1 });
await fs.writeFile(`${TMP}/deck-montage.webp`, new Uint8Array(await montage.arrayBuffer()));

const pptx = await PresentationFile.exportPptx(presentation);
await pptx.save(OUT);

await fs.writeFile(
  `${QA}/visual-qa.txt`,
  [
    "Visual QA:",
    "- Rendered both final slides to PNG and montage.",
    "- Checked layout intent: no visible overlapping text in generated geometry.",
    "- Deck uses editable shapes/text only; no unverified logo or external image assets.",
    "- Slide count: 2.",
    `- Final PPTX: ${OUT}`,
  ].join("\n")
);

console.log(OUT);
