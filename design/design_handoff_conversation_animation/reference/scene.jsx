/* Conversation → structured tasks → responsible person assigned.
   Recording generates a to-do list; each task gets its owner.
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
  chip:    '#EEF1F7',
  cardBd:  '#ECEEF3',
};
const FONT = 'Inter, system-ui, sans-serif';

const rise   = (t, at, dur) => clamp((t - at) / dur, 0, 1);
const smooth = (t, a, b) => Easing.easeInOutCubic(clamp((t - a) / (b - a), 0, 1));

const D = 7;

// ── layout ──────────────────────────────────────────────
const CARD = { x: 372, y: 108, w: 540, h: 384 };
const ROW0 = 228, ROWH = 62;
const PENDANT = { x: 176, y: 300 };

const TASKS = [
  { title: 'Připravit cenovou nabídku', date: '14. 7.', who: 0, land: 1.30 },
  { title: 'Odeslat smlouvu klientovi',  date: '15. 7.', who: 1, land: 1.85 },
  { title: 'Naplánovat schůzku',         date: '16. 7.', who: 2, land: 2.40 },
  { title: 'Ověřit fakturaci',           date: '17. 7.', who: 0, land: 2.95 },
];
const PEOPLE = [
  { name: 'David', tone: C.navySoft },
  { name: 'Aneta', tone: C.sky },
  { name: 'Pavel', tone: C.amber },
];
const HEADER_LAND = 0.95;
const assignTime = tk => tk.land + 0.55;   // owner appears just after task fills

function SceneContent() {
  const t = useTime();
  const pulse = Math.sin((t / D) * Math.PI * 2 * 2); // seamless, 2 cycles

  const resetOut = smooth(t, 5.9, 6.6);
  const present = 1 - resetOut;

  const headerFrac = rise(t, HEADER_LAND, 0.5) * present;
  const rowFrac = TASKS.map(tk => Easing.easeOutCubic(rise(t, tk.land, 0.5)) * present);

  const els = [];

  // ═══ SVG: pendant → card dotted flow ═══
  els.push(React.createElement('svg', {
    key: 'svg', width: 1000, height: 800,
    style: { position: 'absolute', left: 0, top: 0, overflow: 'visible' },
  },
    React.createElement('line', {
      x1: PENDANT.x + 96, y1: PENDANT.y, x2: CARD.x - 6, y2: PENDANT.y,
      stroke: '#CDD5E1', strokeWidth: 2, strokeDasharray: '2 7', strokeLinecap: 'round', opacity: 0.7,
    }),
  ));

  // ═══ pendant (listening) ═══
  const px = PENDANT.x, py = PENDANT.y;
  const ringR = 84 + pulse * 6, ringOp = 0.15 + (pulse*0.5+0.5)*0.2;
  els.push(React.createElement('div', { key:'ring', style:{ position:'absolute', left:px-ringR, top:py-ringR, width:ringR*2, height:ringR*2, borderRadius:'50%', border:'2px solid '+C.sky, opacity:ringOp } }));
  const ring2 = 106 + pulse*4;
  els.push(React.createElement('div', { key:'ring2', style:{ position:'absolute', left:px-ring2, top:py-ring2, width:ring2*2, height:ring2*2, borderRadius:'50%', border:'1.5px solid #DCE3EC', opacity:0.5-(pulse*0.5+0.5)*0.2 } }));
  els.push(React.createElement('div', { key:'lens', style:{ position:'absolute', left:px-70, top:py-70, width:140, height:140, borderRadius:'50%', background:'#fff', boxShadow:'0 12px 34px rgba(23,23,58,0.14), inset 0 0 0 1px #EEF1F6' } }));
  els.push(React.createElement('div', { key:'core', style:{ position:'absolute', left:px-52, top:py-52, width:104, height:104, borderRadius:'50%', background:'radial-gradient(circle at 42% 38%, '+C.navy2+' 0%, '+C.navy+' 62%, #101031 100%)', boxShadow:'inset 0 3px 10px rgba(0,0,0,0.35)' } }));
  const dotS = 11 + (pulse*0.5+0.5)*4;
  els.push(React.createElement('div', { key:'dot', style:{ position:'absolute', left:px-dotS/2, top:py-dotS/2, width:dotS, height:dotS, borderRadius:'50%', background:C.sky, boxShadow:'0 0 12px rgba(77,171,247,0.7)' } }));
  const cy = py, barW = 7;
  [[74,0],[89,1],[104,2],[119,3],[241,0],[256,1],[271,2],[286,3]].forEach(([x,i],k)=>{
    const ph = i*1.1 + x*0.05;
    const a = Math.sin((t/D)*Math.PI*2*2 + ph)*0.5+0.5;
    const h = 11 + a*26;
    els.push(React.createElement('div', { key:'bar'+k, style:{ position:'absolute', left:x, top:cy-h/2, width:barW, height:h, borderRadius:barW/2, background:C.sky, opacity:0.85 } }));
  });
  els.push(React.createElement('div', { key:'rec', style:{ position:'absolute', left:px-46, top:py+92, width:92, display:'flex', alignItems:'center', justifyContent:'center', gap:7, fontFamily:FONT, fontSize:12, fontWeight:600, letterSpacing:'0.14em', color:C.gray } },
    React.createElement('div', { style:{ width:8, height:8, borderRadius:'50%', background:'#E5484D', opacity:0.55+(pulse*0.5+0.5)*0.45 } }),
    React.createElement('span', null, 'NAHRÁVÁM'),
  ));

  // ═══ card = to-do list ═══
  els.push(React.createElement('div', { key:'card', style:{ position:'absolute', left:CARD.x, top:CARD.y, width:CARD.w, height:CARD.h, borderRadius:22, background:'#fff', boxShadow:'0 24px 60px rgba(23,23,58,0.10), 0 2px 6px rgba(23,23,58,0.05)', border:'1px solid '+C.cardBd } }));
  els.push(React.createElement('div', { key:'hi', style:{ position:'absolute', left:CARD.x+26, top:CARD.y+26, width:40, height:40, borderRadius:11, background:'radial-gradient(circle at 40% 35%, '+C.navy2+', '+C.navy+')', display:'flex', alignItems:'center', justifyContent:'center' } },
    React.createElement('svg', { width:18, height:18, viewBox:'0 0 18 18' },
      React.createElement('path', { d:'M4 5.5h10 M4 9h10 M4 12.5h6', stroke:C.sky, strokeWidth:1.6, strokeLinecap:'round' }),
    ),
  ));
  els.push(React.createElement('div', { key:'ht', style:{ position:'absolute', left:CARD.x+80, top:CARD.y+28, fontFamily:FONT, fontSize:17, fontWeight:700, color:C.navy, opacity:0.4+headerFrac*0.6 } }, 'Úkoly ze schůzky'));
  els.push(React.createElement('div', { key:'hs', style:{ position:'absolute', left:CARD.x+80, top:CARD.y+50, fontFamily:FONT, fontSize:13, fontWeight:500, color:C.gray, opacity:0.4+headerFrac*0.6 } }, 'Automaticky vytěženo z konverzace'));
  els.push(React.createElement('div', { key:'div', style:{ position:'absolute', left:CARD.x+26, top:CARD.y+84, width:CARD.w-52, height:1, background:C.line } }));

  TASKS.forEach((tk, i) => {
    const frac = rowFrac[i];
    const y = ROW0 + i * ROWH;
    const at = assignTime(tk);
    const assigned = smooth(t, at, at + 0.35) * present;
    const done = assigned > 0.5;
    const slide = (1 - Easing.easeOutCubic(rise(t, tk.land, 0.5))) * 10;
    // checkbox
    els.push(React.createElement('div', { key:'cb'+i, style:{ position:'absolute', left:CARD.x+28, top:y, width:22, height:22, borderRadius:7, border:'2px solid '+(done?C.sky:'#D6DBE6'), background:done?C.sky:'#fff', opacity:0.3+frac*0.7, display:'flex', alignItems:'center', justifyContent:'center' } },
      React.createElement('svg', { width:12, height:12, viewBox:'0 0 12 12', style:{ opacity:assigned } },
        React.createElement('path', { d:'M2.6 6.2 L5 8.6 L9.4 3.6', stroke:'#fff', strokeWidth:1.8, fill:'none', strokeLinecap:'round', strokeLinejoin:'round' }),
      ),
    ));
    // title
    els.push(React.createElement('div', { key:'tt'+i, style:{ position:'absolute', left:CARD.x+64, top:y-3, fontFamily:FONT, fontSize:15.5, fontWeight:600, color:C.ink, opacity:frac, transform:'translateY('+slide+'px)', whiteSpace:'nowrap' } }, tk.title));
    // date
    els.push(React.createElement('div', { key:'dt'+i, style:{ position:'absolute', left:CARD.x+64, top:y+18, display:'flex', alignItems:'center', gap:6, fontFamily:FONT, fontSize:12.5, fontWeight:500, color:C.gray, opacity:frac, transform:'translateY('+slide+'px)' } },
      React.createElement('svg', { width:12, height:12, viewBox:'0 0 12 12' },
        React.createElement('rect', { x:1.5, y:2.5, width:9, height:8, rx:1.6, stroke:C.gray, strokeWidth:1, fill:'none' }),
        React.createElement('path', { d:'M1.5 4.6h9 M4 1.3v2 M8 1.3v2', stroke:C.gray, strokeWidth:1, strokeLinecap:'round' }),
      ),
      React.createElement('span', null, tk.date),
    ));
    // assignee (the closing beat: name attached to the task)
    const chSlide = (1 - assigned) * 8;
    els.push(React.createElement('div', { key:'as'+i, style:{ position:'absolute', left:CARD.x+CARD.w-124, top:y+1, display:'flex', alignItems:'center', gap:8, opacity:assigned, transform:'translateY('+chSlide+'px)' } },
      React.createElement('div', { style:{ width:22, height:22, borderRadius:'50%', background:PEOPLE[tk.who].tone, color:'#fff', fontFamily:FONT, fontSize:11, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center' } }, PEOPLE[tk.who].name[0]),
      React.createElement('span', { style:{ fontFamily:FONT, fontSize:13, fontWeight:600, color:C.navySoft } }, PEOPLE[tk.who].name),
    ));
  });

  return React.createElement('div', { style:{ position:'absolute', inset:0, width:1000, height:800 } }, els);
}

function ConversationScene() {
  return React.createElement(Stage, {
    width: 1000, height: 800, duration: D, background: C.bg, loop: true, autoplay: true,
    persistKey: 'convo-knowledge',
  }, React.createElement(SceneContent, null));
}

window.ConversationScene = ConversationScene;
