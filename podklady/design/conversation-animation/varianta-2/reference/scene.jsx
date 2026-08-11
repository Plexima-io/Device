/* Section 2 — "Pochopit" (Understand).
   Left: ROZHOVOR — four statements appear; key phrases get softly marked.
   Right: CO JE PODSTATNÉ — three structured blocks (souvislost / rozhodnutí /
   další krok) are composed by linking several parts of the conversation.
   One small traveling label crosses between the cards per phase.
   Calm, seamless ~10s loop. Czech labels. */

const { Stage, useTime, Easing, clamp } = window;

const C = {
  navy:    '#17173A',
  navy2:   '#26265A',
  navySoft:'#3A3A6B',
  amber:   '#F5B70A',
  sky:     '#4DABF7',
  green:   '#3FB27F',
  ink:     '#2B2B47',
  gray:    '#8A90A2',
  line:    '#ECEEF3',
  cardBd:  '#ECEEF3',
};
const FONT = 'Inter, system-ui, sans-serif';
const rise   = (t, at, dur) => clamp((t - at) / dur, 0, 1);
const smooth = (t, a, b) => Easing.easeInOutCubic(clamp((t - a) / (b - a), 0, 1));
function bez(p, A, Cc, B) { const q = 1 - p; return { x:q*q*A.x+2*q*p*Cc.x+p*p*B.x, y:q*q*A.y+2*q*p*Cc.y+p*p*B.y }; }

const D = 10;
const TALK = { x: 60,  y: 150, w: 392, h: 470 };
const CTX  = { x: 560, y: 150, w: 392, h: 470 };
const Y0 = 280, RH = 74;

const PEOPLE = {
  David: C.navySoft,
  Aneta: C.sky,
  Pavel: C.amber,
};

/* each line: pre / key (highlighted phrase) / post */
const LINES = [
  { who:'David', pre:'Pilot chceme ',       key:'spustit v září',            post:'.', at:0.35 },
  { who:'Aneta', pre:'Nejdřív ',            key:'potřebujeme napojit CRM',   post:'.', at:0.95 },
  { who:'Pavel', pre:'Začneme ',            key:'s jedním týmem',            post:'.', at:1.55 },
  { who:'David', pre:'',                    key:'Po měsíci vyhodnotíme',     post:' výsledky.', at:2.15 },
];

/* three phases: which lines light up, the traveling label, the resulting block */
const PHASES = [
  { at:3.10, lines:[0,1], tag:'Souvislost',  kind:'SOUVISLOST',
    text:'Start pilotu závisí na napojení CRM', accent:C.sky,   icon:'link' },
  { at:4.85, lines:[0,2], tag:'Rozhodnutí',  kind:'ROZHODNUTÍ',
    text:'Pilot začne v září s jedním týmem',   accent:C.green, icon:'check' },
  { at:6.60, lines:[3],   tag:'Další krok',  kind:'DALŠÍ KROK',
    text:'Po prvním měsíci vyhodnotit výsledky', accent:C.amber, icon:'arrow' },
];
const TRAVEL = 0.7;
const BY0 = 262, BH = 104, BGAP = 12;

function tint(hex, a) {
  const n = parseInt(hex.slice(1), 16);
  return 'rgba(' + ((n>>16)&255) + ',' + ((n>>8)&255) + ',' + (n&255) + ',' + a + ')';
}

function icon(kind, color) {
  if (kind === 'link') return React.createElement('svg', { width:16, height:16, viewBox:'0 0 16 16' },
    React.createElement('path', { d:'M6.2 9.8 L9.8 6.2', stroke:color, strokeWidth:1.5, strokeLinecap:'round' }),
    React.createElement('path', { d:'M9.1 4.6 L10.4 3.3 a2.4 2.4 0 0 1 3.3 3.3 L12.4 7.9', stroke:color, strokeWidth:1.5, fill:'none', strokeLinecap:'round' }),
    React.createElement('path', { d:'M6.9 11.4 L5.6 12.7 a2.4 2.4 0 0 1 -3.3 -3.3 L3.6 8.1', stroke:color, strokeWidth:1.5, fill:'none', strokeLinecap:'round' }),
  );
  if (kind === 'check') return React.createElement('svg', { width:16, height:16, viewBox:'0 0 16 16' },
    React.createElement('circle', { cx:8, cy:8, r:6, stroke:color, strokeWidth:1.5, fill:'none' }),
    React.createElement('path', { d:'M5.3 8.2 L7.2 10.1 L10.8 6', stroke:color, strokeWidth:1.6, fill:'none', strokeLinecap:'round', strokeLinejoin:'round' }),
  );
  return React.createElement('svg', { width:16, height:16, viewBox:'0 0 16 16' },
    React.createElement('path', { d:'M3 8h9', stroke:color, strokeWidth:1.6, strokeLinecap:'round' }),
    React.createElement('path', { d:'M9 4.8 L12.4 8 L9 11.2', stroke:color, strokeWidth:1.6, fill:'none', strokeLinecap:'round', strokeLinejoin:'round' }),
  );
}

function cardShell(key, r) {
  return React.createElement('div', { key, style:{ position:'absolute', left:r.x, top:r.y, width:r.w, height:r.h, borderRadius:22, background:'#fff', boxShadow:'0 30px 70px rgba(23,23,58,0.18), 0 6px 16px rgba(23,23,58,0.10)', border:'1px solid '+C.cardBd } });
}

function cardHead(key, r, glyph, title, sub, op) {
  return [
    React.createElement('div', { key:key+'i', style:{ position:'absolute', left:r.x+26, top:r.y+26, width:40, height:40, borderRadius:11, background:'radial-gradient(circle at 40% 35%, '+C.navy2+', '+C.navy+')', display:'flex', alignItems:'center', justifyContent:'center' } }, glyph),
    React.createElement('div', { key:key+'t', style:{ position:'absolute', left:r.x+80, top:r.y+29, fontFamily:FONT, fontSize:13, fontWeight:700, letterSpacing:'0.09em', color:C.navy, opacity:0.45+op*0.55 } }, title),
    React.createElement('div', { key:key+'s', style:{ position:'absolute', left:r.x+80, top:r.y+50, fontFamily:FONT, fontSize:12.5, fontWeight:500, color:C.gray, opacity:0.45+op*0.55 } }, sub),
    React.createElement('div', { key:key+'d', style:{ position:'absolute', left:r.x+26, top:r.y+84, width:r.w-52, height:1, background:C.line } }),
  ];
}

function SceneContent() {
  const t = useTime();
  const present = 1 - smooth(t, 9.15, 9.8);
  const hdr = rise(t, 0.15, 0.4) * present;
  const els = [];

  /* ── left card ── */
  els.push(cardShell('tc', TALK));
  els.push(cardHead('th', TALK,
    React.createElement('svg', { width:18, height:18, viewBox:'0 0 18 18' },
      React.createElement('path', { d:'M3 4.6a1.6 1.6 0 0 1 1.6-1.6h6.4a1.6 1.6 0 0 1 1.6 1.6v3.8a1.6 1.6 0 0 1-1.6 1.6H6.6L3.9 12V4.6z', stroke:C.sky, strokeWidth:1.3, fill:'none', strokeLinejoin:'round' }),
      React.createElement('path', { d:'M11.4 6.6h1.9a1.6 1.6 0 0 1 1.6 1.6v3.6a1.6 1.6 0 0 1-1.6 1.6h-.6l-1.6 1.5v-1.5H9.2', stroke:C.sky, strokeWidth:1.3, fill:'none', strokeLinejoin:'round', opacity:0.65 }),
    ),
    'ROZHOVOR', 'Důležité části konverzace', hdr));

  LINES.forEach((L, i) => {
    const y = Y0 + i * RH;
    const appear = smooth(t, L.at, L.at + 0.45) * present;
    const write  = Easing.easeOutCubic(rise(t, L.at + 0.05, 0.55));

    // phase in which this line participates → soft persistent mark + a pulse
    let mark = 0, pulse = 0;
    PHASES.forEach(P => {
      if (P.lines.indexOf(i) < 0) return;
      mark = Math.max(mark, smooth(t, P.at, P.at + 0.35));
      pulse = Math.max(pulse, smooth(t, P.at, P.at + 0.3) * (1 - smooth(t, P.at + 0.7, P.at + 1.3)));
    });
    mark *= present; pulse *= present;

    els.push(React.createElement('div', { key:'av'+i, style:{ position:'absolute', left:TALK.x+26, top:y+2, width:26, height:26, borderRadius:'50%', background:PEOPLE[L.who], color:'#fff', fontFamily:FONT, fontSize:11, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center', opacity:appear } }, L.who[0]));
    els.push(React.createElement('div', { key:'nm'+i, style:{ position:'absolute', left:TALK.x+62, top:y, fontFamily:FONT, fontSize:11.5, fontWeight:600, letterSpacing:'0.03em', color:C.gray, opacity:appear } }, L.who));
    els.push(React.createElement('div', { key:'ln'+i, style:{ position:'absolute', left:TALK.x+62, top:y+19, width:TALK.w-62-26, opacity:appear, display:'flex', overflow:'hidden' } },
      React.createElement('span', { style:{ display:'inline-block', width:(write*100)+'%', overflow:'hidden', whiteSpace:'nowrap', fontFamily:FONT, fontSize:14, fontWeight:500, color:C.ink, lineHeight:'22px' } },
        L.pre,
        React.createElement('span', { style:{ padding:'2px 4px', margin:'0 -4px', borderRadius:5, background:tint(C.sky, 0.05 + 0.11*mark + 0.07*pulse), boxShadow:'inset 0 -1.5px 0 '+tint(C.sky, 0.18*mark + 0.3*pulse), color:mark > 0.4 ? C.navy : C.ink, fontWeight:mark > 0.4 ? 600 : 500 } }, L.key),
        L.post,
      ),
    ));
  });

  /* ── right card ── */
  els.push(cardShell('cc', CTX));
  els.push(cardHead('ch', CTX,
    React.createElement('svg', { width:18, height:18, viewBox:'0 0 18 18' },
      React.createElement('path', { d:'M4 4.5h10 M4 9h10 M4 13.5h6', stroke:C.sky, strokeWidth:1.5, strokeLinecap:'round' }),
    ),
    'CO JE PODSTATNÉ', 'Informace připravené pro další práci', hdr));

  PHASES.forEach((P, i) => {
    const y = BY0 + i * (BH + BGAP);
    const arrive = P.at + TRAVEL;
    const inn = smooth(t, arrive, arrive + 0.45) * present;
    if (inn <= 0.005) return;
    const lift = (1 - inn) * 10;
    els.push(React.createElement('div', { key:'bk'+i, style:{ position:'absolute', left:CTX.x+26, top:y, width:CTX.w-52, height:BH, borderRadius:14, background:tint(P.accent, 0.05), border:'1px solid '+tint(P.accent, 0.22), opacity:inn, transform:'translateY('+lift+'px)', boxSizing:'border-box', padding:'16px 18px', display:'flex', flexDirection:'column', gap:9 } },
      React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:8 } },
        React.createElement('div', { style:{ width:24, height:24, borderRadius:7, background:'#fff', border:'1px solid '+tint(P.accent, 0.3), display:'flex', alignItems:'center', justifyContent:'center', flex:'0 0 auto' } }, icon(P.icon, P.accent)),
        React.createElement('span', { style:{ fontFamily:FONT, fontSize:11, fontWeight:700, letterSpacing:'0.1em', color:P.accent } }, P.kind),
      ),
      React.createElement('span', { style:{ fontFamily:FONT, fontSize:15, fontWeight:600, color:C.navy, lineHeight:'21px', textWrap:'pretty' } }, P.text),
    ));
  });

  /* ── traveling label, one per phase ── */
  PHASES.forEach((P, i) => {
    const p = Easing.easeInOutCubic(rise(t, P.at + 0.25, TRAVEL));
    if (p <= 0.02 || p >= 0.99 || present < 0.5) return;
    const srcY = Y0 + (P.lines[P.lines.length - 1]) * RH + 24;
    const dstY = BY0 + i * (BH + BGAP) + 26;
    const from = { x: TALK.x + TALK.w - 30, y: srcY };
    const to   = { x: CTX.x + 46,           y: dstY };
    const ctrl = { x: (from.x + to.x) / 2,  y: Math.min(from.y, to.y) - 40 };
    const pos = bez(p, from, ctrl, to);
    const fade = p < 0.15 ? p/0.15 : (p > 0.85 ? (1-p)/0.15 : 1);
    els.push(React.createElement('div', { key:'tg'+i, style:{ position:'absolute', left:pos.x-46, top:pos.y-15, display:'flex', alignItems:'center', gap:7, padding:'6px 12px', borderRadius:9, background:'#fff', border:'1px solid '+C.cardBd, boxShadow:'0 10px 24px rgba(23,23,58,0.16)', opacity:fade } },
      React.createElement('div', { style:{ width:7, height:7, borderRadius:'50%', background:P.accent, flex:'0 0 auto' } }),
      React.createElement('span', { style:{ fontFamily:FONT, fontSize:12, fontWeight:600, color:C.navy, whiteSpace:'nowrap' } }, P.tag),
    ));
  });

  /* ── static hairline between cards ── */
  els.push(React.createElement('svg', { key:'sv', width:1000, height:800, style:{ position:'absolute', left:0, top:0, overflow:'visible' } },
    React.createElement('line', { x1:TALK.x+TALK.w+8, y1:385, x2:CTX.x-8, y2:385, stroke:'#CDD5E1', strokeWidth:2, strokeDasharray:'2 7', strokeLinecap:'round', opacity:0.5 }),
    React.createElement('path', { d:'M'+(CTX.x-18)+' 379 l7 6 l-7 6', stroke:'#CDD5E1', strokeWidth:2, fill:'none', strokeLinecap:'round', strokeLinejoin:'round', opacity:0.55 }),
  ));

  return React.createElement('div', { style:{ position:'absolute', inset:0, width:1000, height:800 } }, els);
}

function ConversationScene() {
  return React.createElement(Stage, {
    width: 1000, height: 800, duration: D, background: 'transparent', loop: true, autoplay: true,
    persistKey: 'convo-understand',
  }, React.createElement(SceneContent, null));
}

window.ConversationScene = ConversationScene;
