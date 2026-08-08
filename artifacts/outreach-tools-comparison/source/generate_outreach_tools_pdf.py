from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    KeepTogether,
    ListFlowable,
    ListItem,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)
from pypdf import PdfReader


ROOT = Path(__file__).resolve().parents[3]
OUT = ROOT / "artifacts/outreach-tools-comparison/final/srovnani-outreach-nastroju-cz.pdf"
CREATED = "5. 8. 2026"
PAGE_TOTAL = "?"

PRIMARY = colors.HexColor("#211747")
TEXT = colors.HexColor("#252A3A")
MUTED = colors.HexColor("#626A7D")
LINE = colors.HexColor("#D9DEEA")
PALE_GRAY = colors.HexColor("#F5F7FB")
PALE_BLUE = colors.HexColor("#E7F5FB")
PALE_GREEN = colors.HexColor("#E7F6EE")
PALE_YELLOW = colors.HexColor("#FFF7D6")
ACCENT = colors.HexColor("#FEC710")
WHITE = colors.white


def register_fonts():
    pdfmetrics.registerFont(TTFont("Arial", "/System/Library/Fonts/Supplemental/Arial.ttf"))
    pdfmetrics.registerFont(TTFont("Arial-Bold", "/System/Library/Fonts/Supplemental/Arial Bold.ttf"))


def esc(text):
    return text.replace("&", "&amp;")


def para(text, style):
    return Paragraph(esc(text), style)


class PleximaDoc(BaseDocTemplate):
    def __init__(self, filename):
        super().__init__(filename, pagesize=A4)
        width, height = A4
        frame = Frame(42, 42, width - 84, height - 97, id="normal")
        self.addPageTemplates(PageTemplate(id="main", frames=[frame], onPage=self.decorate))

    def decorate(self, canvas, doc):
        width, height = A4
        canvas.saveState()
        canvas.setFillColor(PRIMARY)
        canvas.rect(0, height - 30, width, 30, fill=1, stroke=0)
        canvas.setFillColor(WHITE)
        canvas.setFont("Arial-Bold", 8)
        canvas.drawString(42, height - 19, "Plexima | B2B outreach")
        canvas.drawRightString(width - 42, height - 19, f"Interní srovnání | {doc.page}/{PAGE_TOTAL}")
        canvas.setStrokeColor(LINE)
        canvas.setLineWidth(0.6)
        canvas.line(42, 29, width - 42, 29)
        canvas.setFillColor(MUTED)
        canvas.setFont("Arial", 7.5)
        canvas.drawString(42, 17, "Plexima | Interní rozhodovací podklad")
        canvas.drawRightString(width - 42, 17, CREATED)
        canvas.restoreState()


def styles():
    ss = getSampleStyleSheet()
    return {
        "title": ParagraphStyle("title", parent=ss["Title"], fontName="Arial-Bold", fontSize=24, leading=28, textColor=PRIMARY, alignment=TA_LEFT, spaceAfter=8),
        "subtitle": ParagraphStyle("subtitle", parent=ss["Normal"], fontName="Arial", fontSize=10.5, leading=14, textColor=MUTED, spaceAfter=13),
        "h": ParagraphStyle("h", parent=ss["Heading2"], fontName="Arial-Bold", fontSize=12, leading=15, textColor=PRIMARY, spaceBefore=9, spaceAfter=3),
        "h3": ParagraphStyle("h3", parent=ss["Heading3"], fontName="Arial-Bold", fontSize=9.2, leading=12, textColor=TEXT, spaceBefore=5, spaceAfter=3),
        "body": ParagraphStyle("body", parent=ss["Normal"], fontName="Arial", fontSize=8.5, leading=11.4, textColor=TEXT, spaceAfter=5),
        "bullet": ParagraphStyle("bullet", parent=ss["Normal"], fontName="Arial", fontSize=8.1, leading=10.7, textColor=TEXT, spaceAfter=1),
        "small": ParagraphStyle("small", parent=ss["Normal"], fontName="Arial", fontSize=7.5, leading=9.5, textColor=MUTED, spaceAfter=1),
        "table": ParagraphStyle("table", parent=ss["Normal"], fontName="Arial", fontSize=6.45, leading=7.8, textColor=TEXT),
        "table_head": ParagraphStyle("table_head", parent=ss["Normal"], fontName="Arial-Bold", fontSize=6.35, leading=7.8, textColor=WHITE),
        "panel": ParagraphStyle("panel", parent=ss["Normal"], fontName="Arial", fontSize=8.4, leading=11.2, textColor=TEXT, spaceAfter=2),
        "panel_bold": ParagraphStyle("panel_bold", parent=ss["Normal"], fontName="Arial-Bold", fontSize=8.5, leading=11.2, textColor=PRIMARY, spaceAfter=3),
        "link": ParagraphStyle("link", parent=ss["Normal"], fontName="Arial", fontSize=7.7, leading=9.7, textColor=TEXT),
    }


def section(title, st):
    bar = Table([[""]], colWidths=[36], rowHeights=[3])
    bar.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), ACCENT), ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0)]))
    return [para(title, st["h"]), bar, Spacer(1, 5)]


def panel(items, bg, st, border=None):
    table = Table([[item] for item in items], colWidths=[511])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), bg),
        ("BOX", (0, 0), (-1, -1), 0.5, border or bg),
        ("LEFTPADDING", (0, 0), (-1, -1), 9),
        ("RIGHTPADDING", (0, 0), (-1, -1), 9),
        ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
    ]))
    return table


def bullets(items, st):
    return ListFlowable(
        [ListItem(para(item, st["bullet"]), bulletColor=ACCENT) for item in items],
        bulletType="bullet",
        leftIndent=12,
        bulletFontName="Arial-Bold",
        bulletFontSize=6,
        bulletDedent=8,
        spaceBefore=1,
        spaceAfter=3,
    )


def comparison_table(st):
    headers = ["Nástroj", "Orientační cena", "Funkcionalita", "Výhody", "Na zvážení", "Vhodné použití"]
    rows = [
        ["lemlist", "Email 55 USD/už./měs. při roční platbě (69 USD měsíčně); multichannel od 87 USD.",
         "Databáze kontaktů, email finder a verifier, AI research, personalizace, sekvence, warm-up a Deliverability Hub.",
         "Nejucelenější all-in-one varianta: od nalezení kontaktu po odeslání a vyhodnocení kampaně.",
         "Kvalita českých kontaktů se musí ověřit v praxi; enrichment kredity se připočítávají podle využití.",
         "Nejlepší první volba pro jednoduchý pilot bez skládání více nástrojů."],
        ["Apollo", "Basic 49 USD/už./měs. ročně (59 USD měsíčně); Professional 79 USD ročně / 99 USD měsíčně.",
         "Vyhledávání firem a lidí, filtrování podle role, seniority a lokality, enrichment, CRM workflow a sekvence.",
         "Silné pro sourcing kompetentních osob a práci s více stakeholdery v jedné firmě.",
         "Doručitelnost a odesílací infrastruktura nejsou hlavní diferenciátor; API limity závisí na tarifu.",
         "Dobrá alternativa nebo doplněk, pokud bude potřeba silnější databázové vyhledávání."],
        ["Instantly", "Outreach Growth 47 USD + Growth Credits 47 USD; praktický start dat a odesílání cca 94 USD/měs.",
         "Lead databáze, enrichment, verifikace, kampaně, centralizované odpovědi, více mailboxů a API.",
         "Nejsilnější z trojice pro správu více odesílacích schránek, warm-up a škálování kampaní.",
         "Data a outreach jsou účtované odděleně; pro první malý průzkum může být robustnější, než je potřeba.",
         "Vhodné hlavně tehdy, když bude prioritou růst objemu a správa odesílací infrastruktury."],
    ]
    data = [[para(h, st["table_head"]) for h in headers]]
    data += [[para(cell, st["table"]) for cell in row] for row in rows]
    table = Table(data, colWidths=[49, 84, 108, 107, 72, 91], repeatRows=1)
    rules = [
        ("BACKGROUND", (0, 0), (-1, 0), PRIMARY),
        ("GRID", (0, 0), (-1, -1), 0.35, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 4),
        ("RIGHTPADDING", (0, 0), (-1, -1), 4),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]
    for idx in range(1, len(data)):
        rules.append(("BACKGROUND", (0, idx), (-1, idx), WHITE if idx % 2 else PALE_GRAY))
    table.setStyle(TableStyle(rules))
    return table


def tool_block(num, name, strengths, weaknesses, verdict, st):
    return KeepTogether([
        para(f"{num}. {name}", st["h3"]),
        para("Silné stránky", st["small"]),
        bullets(strengths, st),
        para("Slabiny a neznámé", st["small"]),
        bullets(weaknesses, st),
        panel([para("Verdikt", st["panel_bold"]), para(verdict, st["panel"])], PALE_GRAY, st, LINE),
        Spacer(1, 5),
    ])


def source(label, url, st):
    return Paragraph(f'<a href="{url}" color="#252A3A">{label}</a> - {url}', st["link"])


def story_content():
    register_fonts()
    st = styles()
    story = [
        para("Srovnání nástrojů pro automatizovaný B2B outreach", st["title"]),
        para("Tři vhodné varianty pro cílené oslovování firem: lemlist, Apollo a Instantly", st["subtitle"]),
        panel([
            para("Tento dokument shrnuje tři vybrané nástroje vhodné pro B2B outreach: jejich funkcionalitu, orientační cenu, hlavní výhody a rozdíly. Slouží jako stručný průzkum a podklad k diskuzi nad nejlepší variantou.", st["panel"]),
            para("Ceny byly veřejně ověřeny 5. 8. 2026. Jsou orientační, bez DPH, domén a samostatně placených e-mailových schránek.", st["panel"]),
        ], PALE_BLUE, st),
        Spacer(1, 8),
    ]

    story += section("Účel srovnání", st)
    story.append(para("Vybrané nástroje pokrývají praktické potřeby outboundu: hledání firem a kontaktů, ověřování pracovních e-mailů, personalizaci zpráv, tvorbu sekvencí, práci s odpověďmi a základní ochranu doručitelnosti. Nejde o finální výběr dodavatele, ale o přehled nejvhodnějších variant k zamyšlení.", st["body"]))

    story += section("Krátké shrnutí", st)
    story.append(panel([
        para("Vybrané varianty", st["panel_bold"]),
        para("lemlist - nejvyváženější all-in-one varianta pro začátek: kontakty, ověřování, personalizace, sekvence i doručitelnost v jednom prostředí.", st["panel"]),
        para("Apollo - nejsilnější kandidát pro vyhledávání firem a kompetentních osob podle role, seniority a lokality.", st["panel"]),
        para("Instantly - nejlepší varianta z této trojice pro správu více mailboxů, warm-up a pozdější škálování odesílání.", st["panel"]),
    ], PALE_GREEN, st))

    story.append(Spacer(1, 10))
    story += section("Hlavní srovnávací tabulka", st)
    story.append(comparison_table(st))
    story.append(PageBreak())

    story += section("Detail vybraných nástrojů", st)
    story.append(tool_block(1, "lemlist",
        ["650M+ lead databáze, email finder a verifier",
         "AI research, personalizace a tvorba outbound zpráv",
         "e-mailové i multichannel sekvence",
         "Deliverability Hub, warm-up a práce s více sendery",
         "REST API, webhooks, CLI a MCP pro budoucí automatizace"],
        ["kvalitu a aktuálnost českých kontaktů nelze posoudit jen podle globální velikosti databáze",
         "ověřené e-maily a další enrichment se účtují přes kredity podle spotřeby"],
        "Nejlepší první volba, pokud chceme začít rychle a mít sourcing, ověření, personalizaci i odesílání v jednom nástroji.", st))
    story.append(tool_block(2, "Apollo",
        ["silné filtrování podle společnosti, role, seniority a lokality",
         "vhodné pro hledání více stakeholderů v jedné firmě",
         "enrichment, CRM workflow a základní e-mailové sekvence",
         "dobré jako samostatný nástroj i jako databázový zdroj pro jiný sender"],
        ["není primárně specializovaný na odesílací infrastrukturu a warm-up více schránek",
         "u API je potřeba ověřit konkrétní dostupnost a limity podle zvoleného tarifu"],
        "Nejvhodnější varianta, pokud bude rozhodující hlavně kvalita vyhledávání firem a kompetentních osob.", st))
    story.append(tool_block(3, "Instantly",
        ["silná správa více e-mailových účtů",
         "warm-up a nástroje zaměřené na odesílací reputaci",
         "databáze, waterfall enrichment a verifikace",
         "kampaně, centralizovaná inbox práce a API v2"],
        ["data a outreach jsou účtovány odděleně",
         "pro první velmi malý průzkum může být robustnější, než je potřeba"],
        "Nejvhodnější varianta, pokud bude hlavní prioritou škálování odesílání a správa více mailboxů.", st))

    story += section("Jednoduché porovnání", st)
    story.append(panel([
        para("Pokud chceme jeden nástroj na začátek, nejlépe vychází lemlist. Pokud bude nejdůležitější kvalita databázového vyhledávání a hledání konkrétních rolí, stojí za úvahu Apollo. Pokud bude hlavní téma odesílací infrastruktura, více mailboxů a škálování kampaní, nejsilnější kandidát je Instantly.", st["panel"]),
    ], PALE_GREEN, st))

    story += section("Zdroje", st)
    for label, url in [
        ("Apollo Pricing", "https://www.apollo.io/pricing"),
        ("Apollo People API Search", "https://docs.apollo.io/reference/people-api-search"),
        ("lemlist Pricing", "https://www.lemlist.com/pricing"),
        ("lemlist API, CLI a MCP", "https://developer.lemlist.com/api-reference/getting-started/overview"),
        ("Instantly Pricing", "https://instantly.ai/pricing"),
        ("Instantly API", "https://developer.instantly.ai/"),
    ]:
        story.append(source(label, url, st))

    return story


def build():
    global PAGE_TOTAL
    OUT.parent.mkdir(parents=True, exist_ok=True)
    PAGE_TOTAL = "?"
    PleximaDoc(str(OUT)).multiBuild(story_content())
    PAGE_TOTAL = str(len(PdfReader(str(OUT)).pages))
    PleximaDoc(str(OUT)).multiBuild(story_content())


if __name__ == "__main__":
    build()
