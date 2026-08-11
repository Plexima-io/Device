/* Section 2 — "Zpracovat" (Process).
   Left: a meeting transcript ("Zápis ze schůzky") is written line by line.
   Right: from that transcript, tasks are extracted into a to-do list,
   each assigned to its responsible person.
   Calm, seamless loop. Czech labels. */

const { Stage, useTime, Easing, clamp } = window;

const C = {
  bg:      '#F5F6F8',
  navy:    '#17173A',
  navy2:   '#26265A',
  navySoft:'#3A3A6B',
  amber:   '#F5B70A',
  sky:     '#4DABF7',
  ink:     '#2B2B47',
  gray:    '#8A90A2',
  line:    '#ECEEF3',
  ghost:   '#E9ECF2',
  cardBd:  '#ECEEF3',
};
const FONT = 'Inter, system-ui, sans-serif';
const rise   = (t, at, dur) => clamp((t - at) / dur, 0, 1);
const smooth = (t, a, b) => Easing.easeInOutCubic(clamp((t - a) / (b - a), 0, 1));
function bez(p, A, Cc, B) { const q = 1 - p; return { x:q*q*A.x+2*q*p*Cc.x+p*p*B.x, y:q*q*A.y+2*q*p*Cc.y+p*p*B.y }; }

const D = 8;
const NOTE = { x: 60,  y: 150, w: 392, h: 470 };
const TASK = { x: 560, y: 150, w: 392, h: 470 };
const Y0 = 258, RH = 62;

const PEOPLE = [
  { name: 'David', tone: C.navySoft },
  { name: 'Aneta', tone: C.sky },
  { name: 'Pavel', tone: C.amber },
];

// each transcript line maps 1:1 to an extracted task
const ITEMS = [
  { who: 0, line: 'Pošlu cenovou nabídku klientovi.', title: 'Připravit cenovou nabídku', date: '14. 7.', ll: 0.55, ex: 3.05 },
  { who: 1, line: 'Připravím smlouvu k podpisu.',     title: 'Odeslat smlouvu klientovi',  date: '15. 7.', ll: 1.15, ex: 3.65 },
  { who: 2, line: 'Domluvím další schůzku.',          title: 'Naplánovat schůzku',         date: '16. 7.', ll: 1.75, ex: 4.25 },
  { who: 0, line: 'Ověřím fakturaci u účetní.',       title: 'Ověřit fakturaci',           date: '17. 7.', ll: 2.35, ex: 4.85 },
  { who: 1, line: 'Zašlu podklady k projektu.',        title: 'Zaslat podklady k projektu',  date: '18. 7.', ll: 2.95, ex: 5.45 },
];
const TRAVEL = 0.6;

function cardShell(key, r) {
  return React.createElement('div', { key, style:{ position:'absolute', left:r.x, top:r.y, width:r.w, height:r.h, borderRadius:22, background:'#fff', boxShadow:'0 30px 70px rgba(23,23,58,0.18), 0 6px 16px rgba(23,23,58,0.10)', border:'1px solid '+C.cardBd } });
}

function SceneContent() {
  const t = useTime();
  const resetOut = smooth(t, 7.1, 7.75);
  const present = 1 - resetOut;

  const noteHdr = rise(t, 0.15, 0.4) * present;
  const taskHdr = rise(t, 0.15, 0.4) * present;

  const els = [];

  // ═══ connector between cards (subtle, static) ═══
  els.push(React.createElement('svg', { key:'svg', width:1000, height:800, style:{ position:'absolute', left:0, top:0, overflow:'visible' } },
    React.createElement('line', { x1:NOTE.x+NOTE.w+6, y1:385, x2:TASK.x-6, y2:385, stroke:'#CDD5E1', strokeWidth:2, strokeDasharray:'2 7', strokeLinecap:'round', opacity:0.55 }),
    React.createElement('path', { d:'M'+(TASK.x-16)+' 379 l7 6 l-7 6', stroke:'#CDD5E1', strokeWidth:2, fill:'none', strokeLinecap:'round', strokeLinejoin:'round', opacity:0.6 }),
  ));

  // ═══ LEFT: transcript note ═══
  els.push(cardShell('nc', NOTE));
  els.push(React.createElement('div', { key:'ni', style:{ position:'absolute', left:NOTE.x+26, top:NOTE.y+26, width:40, height:40, borderRadius:11, background:'radial-gradient(circle at 40% 35%, '+C.navy2+', '+C.navy+')', display:'flex', alignItems:'center', justifyContent:'center' } },
    React.createElement('svg', { width:18, height:18, viewBox:'0 0 18 18' },
      React.createElement('rect', { x:3.5, y:2, width:11, height:14, rx:1.6, stroke:C.sky, strokeWidth:1.4, fill:'none' }),
      React.createElement('path', { d:'M6 6h6 M6 9h6 M6 12h3.5', stroke:C.sky, strokeWidth:1.3, strokeLinecap:'round' }),
    ),
  ));
  els.push(React.createElement('div', { key:'nt', style:{ position:'absolute', left:NOTE.x+80, top:NOTE.y+28, fontFamily:FONT, fontSize:17, fontWeight:700, color:C.navy, opacity:0.4+noteHdr*0.6 } }, 'Zápis ze schůzky'));
  els.push(React.createElement('div', { key:'ns', style:{ position:'absolute', left:NOTE.x+80, top:NOTE.y+50, fontFamily:FONT, fontSize:13, fontWeight:500, color:C.gray, opacity:0.4+noteHdr*0.6 } }, 'Automatický přepis konverzace'));
  els.push(React.createElement('div', { key:'nd', style:{ position:'absolute', left:NOTE.x+26, top:NOTE.y+84, width:NOTE.w-52, height:1, background:C.line } }));

  ITEMS.forEach((it, i) => {
    const y = Y0 + i * RH;
    const write = Easing.easeOutCubic(rise(t, it.ll, 0.6)) * present;
    const appear = rise(t, it.ll, 0.25) * present;
    const writing = write > 0.02 && write < 0.99;
    // extraction highlight on the source line
    const hi = (smooth(t, it.ex - 0.1, it.ex + 0.15) * (1 - smooth(t, it.ex + 0.45, it.ex + 0.9))) * present;
    // avatar
    els.push(React.createElement('div', { key:'la'+i, style:{ position:'absolute', left:NOTE.x+24, top:y, width:26, height:26, borderRadius:'50%', background:PEOPLE[it.who].tone, color:'#fff', fontFamily:FONT, fontSize:11, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center', opacity:appear } }, PEOPLE[it.who].name[0]));
    // highlight pill behind text
    els.push(React.createElement('div', { key:'lh'+i, style:{ position:'absolute', left:NOTE.x+56, top:y-5, width:NOTE.w-56-24, height:36, borderRadius:9, background:'rgba(77,171,247,0.10)', border:'1px solid rgba(77,171,247,'+(0.25*hi)+')', opacity:hi } }));
    // text (revealed by clip = "being written")
    els.push(React.createElement('div', { key:'lt'+i, style:{ position:'absolute', left:NOTE.x+62, top:y+3, width:NOTE.w-62-22, overflow:'hidden', whiteSpace:'nowrap', opacity:appear } },
      React.createElement('span', { style:{ display:'inline-block', width:(write*100)+'%', overflow:'hidden', whiteSpace:'nowrap', verticalAlign:'top', fontFamily:FONT, fontSize:13.5, fontWeight:500, color:C.ink } }, it.line),
      writing ? React.createElement('span', { style:{ display:'inline-block', width:1.5, height:15, background:C.sky, verticalAlign:'top', marginLeft:1 } }) : null,
    ));
  });

  // ═══ RIGHT: extracted tasks ═══
  els.push(cardShell('tc', TASK));
  els.push(React.createElement('div', { key:'ti', style:{ position:'absolute', left:TASK.x+26, top:TASK.y+26, width:40, height:40, borderRadius:11, background:'radial-gradient(circle at 40% 35%, '+C.navy2+', '+C.navy+')', display:'flex', alignItems:'center', justifyContent:'center' } },
    React.createElement('svg', { width:18, height:18, viewBox:'0 0 18 18' },
      React.createElement('path', { d:'M4 5.5h10 M4 9h10 M4 12.5h6', stroke:C.sky, strokeWidth:1.6, strokeLinecap:'round' }),
    ),
  ));
  els.push(React.createElement('div', { key:'tt', style:{ position:'absolute', left:TASK.x+80, top:TASK.y+28, fontFamily:FONT, fontSize:17, fontWeight:700, color:C.navy, opacity:0.4+taskHdr*0.6 } }, 'Úkoly ze schůzky'));
  els.push(React.createElement('div', { key:'ts', style:{ position:'absolute', left:TASK.x+80, top:TASK.y+50, fontFamily:FONT, fontSize:13, fontWeight:500, color:C.gray, opacity:0.4+taskHdr*0.6 } }, 'Automaticky vytěženo ze zápisu'));
  els.push(React.createElement('div', { key:'td', style:{ position:'absolute', left:TASK.x+26, top:TASK.y+84, width:TASK.w-52, height:1, background:C.line } }));

  ITEMS.forEach((it, i) => {
    const y = Y0 + i * RH;
    const arrive = it.ex + TRAVEL;
    const rowIn = smooth(t, arrive - 0.05, arrive + 0.35) * present;
    const assigned = smooth(t, arrive + 0.15, arrive + 0.5) * present;
    const done = assigned > 0.5;
    const slide = (1 - rowIn) * 8;
    // checkbox
    els.push(React.createElement('div', { key:'cb'+i, style:{ position:'absolute', left:TASK.x+26, top:y, width:22, height:22, borderRadius:7, border:'2px solid '+(done?C.sky:'#D6DBE6'), background:done?C.sky:'#fff', opacity:rowIn, display:'flex', alignItems:'center', justifyContent:'center' } },
      React.createElement('svg', { width:12, height:12, viewBox:'0 0 12 12', style:{ opacity:assigned } },
        React.createElement('path', { d:'M2.6 6.2 L5 8.6 L9.4 3.6', stroke:'#fff', strokeWidth:1.8, fill:'none', strokeLinecap:'round', strokeLinejoin:'round' }),
      ),
    ));
    // title
    els.push(React.createElement('div', { key:'rt'+i, style:{ position:'absolute', left:TASK.x+62, top:y-3, fontFamily:FONT, fontSize:15, fontWeight:600, color:C.ink, opacity:rowIn, transform:'translateY('+slide+'px)', whiteSpace:'nowrap' } }, it.title));
    // date
    els.push(React.createElement('div', { key:'rd'+i, style:{ position:'absolute', left:TASK.x+62, top:y+18, display:'flex', alignItems:'center', gap:6, fontFamily:FONT, fontSize:12.5, fontWeight:500, color:C.gray, opacity:rowIn, transform:'translateY('+slide+'px)' } },
      React.createElement('svg', { width:12, height:12, viewBox:'0 0 12 12' },
        React.createElement('rect', { x:1.5, y:2.5, width:9, height:8, rx:1.6, stroke:C.gray, strokeWidth:1, fill:'none' }),
        React.createElement('path', { d:'M1.5 4.6h9 M4 1.3v2 M8 1.3v2', stroke:C.gray, strokeWidth:1, strokeLinecap:'round' }),
      ),
      React.createElement('span', null, it.date),
    ));
    // owner chip
    els.push(React.createElement('div', { key:'ow'+i, style:{ position:'absolute', left:TASK.x+TASK.w-118, top:y+1, display:'flex', alignItems:'center', gap:7, opacity:assigned, transform:'translateY('+((1-assigned)*8)+'px)' } },
      React.createElement('div', { style:{ width:20, height:20, borderRadius:'50%', background:PEOPLE[it.who].tone, color:'#fff', fontFamily:FONT, fontSize:10, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center' } }, PEOPLE[it.who].name[0]),
      React.createElement('span', { style:{ fontFamily:FONT, fontSize:12.5, fontWeight:600, color:C.navySoft } }, PEOPLE[it.who].name),
    ));
  });

  // ═══ traveling pills: transcript line → task row ═══
  ITEMS.forEach((it, i) => {
    const p = Easing.easeInOutCubic(rise(t, it.ex, TRAVEL));
    if (p <= 0.02 || p >= 0.99 || present < 0.5) return;
    const y = Y0 + i * RH;
    const from = { x: NOTE.x + NOTE.w - 20, y: y + 13 };
    const to   = { x: TASK.x + 40, y: y + 11 };
    const ctrl = { x: (from.x + to.x) / 2, y: Math.min(from.y, to.y) - 34 };
    const pos = bez(p, from, ctrl, to);
    const fade = p < 0.14 ? p/0.14 : (p > 0.86 ? (1-p)/0.14 : 1);
    els.push(React.createElement('div', { key:'pl'+i, style:{ position:'absolute', left:pos.x-50, top:pos.y-13, display:'flex', alignItems:'center', gap:6, padding:'5px 10px', borderRadius:9, background:'#fff', border:'1px solid '+C.cardBd, boxShadow:'0 8px 20px rgba(23,23,58,0.14)', opacity:fade } },
      React.createElement('div', { style:{ width:6, height:6, borderRadius:'50%', background:PEOPLE[it.who].tone, flex:'0 0 auto' } }),
      React.createElement('span', { style:{ fontFamily:FONT, fontSize:11.5, fontWeight:600, color:C.navy, whiteSpace:'nowrap' } }, it.title.split(' ').slice(0,2).join(' ')),
    ));
  });

  return React.createElement('div', { style:{ position:'absolute', inset:0, width:1000, height:800 } }, els);
}

function ConversationScene() {
  return React.createElement(Stage, {
    width: 1000, height: 800, duration: D, background: 'transparent', loop: true, autoplay: true,
    persistKey: 'convo-knowledge',
  }, React.createElement(SceneContent, null));
}

window.ConversationScene = ConversationScene;
