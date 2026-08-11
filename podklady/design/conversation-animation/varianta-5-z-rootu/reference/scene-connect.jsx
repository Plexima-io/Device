/* Section 3 — "Napojit" (Connect).
   Left: a package of outputs (Zápis · Úkoly · CRM záznam), ready to send.
   Right: the tools the team already uses. Packets flow out along dotted
   routes; each destination confirms "synced". No new app — outputs just
   continue into existing tools. Calm, seamless loop. Czech labels. */

const { Stage, useTime, Easing, clamp } = window;

const C = {
  bg:'#F5F6F8', navy:'#17173A', navy2:'#26265A', navySoft:'#3A3A6B',
  amber:'#F5B70A', sky:'#4DABF7', ink:'#2B2B47', gray:'#8A90A2',
  line:'#ECEEF3', ghost:'#E9ECF2', cardBd:'#ECEEF3',
};
const FONT = 'Inter, system-ui, sans-serif';
const rise   = (t, at, dur) => clamp((t - at) / dur, 0, 1);
const smooth = (t, a, b) => Easing.easeInOutCubic(clamp((t - a) / (b - a), 0, 1));
function bez(p, A, Cc, B){ const q=1-p; return { x:q*q*A.x+2*q*p*Cc.x+p*p*B.x, y:q*q*A.y+2*q*p*Cc.y+p*p*B.y }; }

const D = 7;
const SRC = { x: 74, y: 300, w: 320, h: 216 };
const SANCH = { x: SRC.x + SRC.w, y: SRC.y + SRC.h / 2 };
const TILE = { x: 612, w: 312, h: 104 };
const TY = [232, 364, 496]; // tile tops

const DEST = [
  { title:'CRM a obchodní systém',        icon:'crm',   tone:C.navySoft, packet:'Follow up', done:'Zapsáno',  launch:2.35 },
  { title:'Projektové a úkolové nástroje', icon:'board', tone:C.sky,      packet:'Úkoly',     done:'Uloženo',  launch:3.15 },
  { title:'E-mail, Teams, Slack nebo API', icon:'chat',  tone:C.amber,    packet:'Zápis',     done:'Odesláno', launch:3.95 },
];
const TRAVEL = 0.85;
const arriveOf = k => DEST[k].launch + TRAVEL;

function tileIcon(kind, color) {
  const s = { position:'absolute', left:0, top:0 };
  if (kind === 'crm') {
    return React.createElement('svg', { width:22, height:22, viewBox:'0 0 22 22', style:s },
      React.createElement('rect', { x:2.5, y:4, width:17, height:14, rx:2, stroke:color, strokeWidth:1.5, fill:'none' }),
      React.createElement('circle', { cx:7.5, cy:9.5, r:2.1, stroke:color, strokeWidth:1.4, fill:'none' }),
      React.createElement('path', { d:'M4.6 15c0-1.8 1.3-2.7 2.9-2.7s2.9 0.9 2.9 2.7', stroke:color, strokeWidth:1.3, fill:'none', strokeLinecap:'round' }),
      React.createElement('path', { d:'M13.5 8.5h3.5 M13.5 11.5h3.5 M13.5 14.5h2', stroke:color, strokeWidth:1.3, strokeLinecap:'round' }),
    );
  }
  if (kind === 'board') {
    return React.createElement('svg', { width:22, height:22, viewBox:'0 0 22 22', style:s },
      React.createElement('rect', { x:3, y:4, width:4.6, height:14, rx:1.4, stroke:color, strokeWidth:1.5, fill:'none' }),
      React.createElement('rect', { x:9.2, y:4, width:4.6, height:9.5, rx:1.4, stroke:color, strokeWidth:1.5, fill:'none' }),
      React.createElement('rect', { x:15.4, y:4, width:4.6, height:11, rx:1.4, stroke:color, strokeWidth:1.5, fill:'none' }),
    );
  }
  // chat
  return React.createElement('svg', { width:22, height:22, viewBox:'0 0 22 22', style:s },
    React.createElement('path', { d:'M3.5 5.5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9l-4 3.2V14.5H5.5a2 2 0 0 1-2-2Z', stroke:color, strokeWidth:1.5, fill:'none', strokeLinejoin:'round' }),
    React.createElement('path', { d:'M7 8.5h8 M7 11h5', stroke:color, strokeWidth:1.3, strokeLinecap:'round' }),
  );
}

function SceneContent() {
  const t = useTime();
  const puls = Math.sin((t / D) * Math.PI * 2 * 2);
  const appear = rise(t, 0.15, 0.45);
  const rearm = 1 - smooth(t, 5.7, 6.4); // fade "synced" states before wrap

  const els = [];

  // ═══ routes (SVG) — faint always, bright while its packet flies ═══
  const routePts = DEST.map((d, k) => {
    const to = { x: TILE.x - 4, y: TY[k] + TILE.h / 2 };
    const ctrl = { x: (SANCH.x + to.x) / 2 + 20, y: (SANCH.y + to.y) / 2 };
    return { from: SANCH, ctrl, to };
  });
  els.push(React.createElement('svg', { key:'svg', width:1000, height:800, style:{ position:'absolute', left:0, top:0, overflow:'visible' } },
    ...routePts.map((r, k) => {
      const p = Easing.easeInOutCubic(rise(t, DEST[k].launch, TRAVEL));
      const live = (p > 0.02 && p < 0.99) ? 1 : 0;
      const on = Math.max(live, smooth(t, arriveOf(k), arriveOf(k)+0.3) * rearm * 0.6);
      return React.createElement('path', { key:k,
        d:'M'+r.from.x+' '+r.from.y+' Q'+r.ctrl.x+' '+r.ctrl.y+' '+r.to.x+' '+r.to.y,
        stroke: on > 0.1 ? C.sky : '#CDD5E1', strokeWidth:2, fill:'none',
        strokeDasharray:'2 7', strokeLinecap:'round', opacity: (0.35 + on*0.5) * appear });
    }),
    // emitter dot at source anchor
    React.createElement('circle', { cx:SANCH.x, cy:SANCH.y, r:5 + (puls*0.5+0.5)*2, fill:C.sky, opacity:appear }),
  ));

  // ═══ source package ═══
  els.push(React.createElement('div', { key:'src', style:{ position:'absolute', left:SRC.x, top:SRC.y, width:SRC.w, height:SRC.h, borderRadius:20, background:'#fff', border:'1px solid '+C.cardBd, boxShadow:'0 26px 60px rgba(23,23,58,0.16), 0 6px 16px rgba(23,23,58,0.09)', opacity:appear } }));
  els.push(React.createElement('div', { key:'sic', style:{ position:'absolute', left:SRC.x+22, top:SRC.y+22, width:38, height:38, borderRadius:11, background:'radial-gradient(circle at 40% 35%, '+C.navy2+', '+C.navy+')', display:'flex', alignItems:'center', justifyContent:'center', opacity:appear } },
    React.createElement('svg', { width:18, height:18, viewBox:'0 0 18 18' },
      React.createElement('path', { d:'M9 2v9 M5.5 8 L9 11.5 L12.5 8 M3.5 13.5h11', stroke:C.sky, strokeWidth:1.5, fill:'none', strokeLinecap:'round', strokeLinejoin:'round' }),
    ),
  ));
  els.push(React.createElement('div', { key:'stt', style:{ position:'absolute', left:SRC.x+72, top:SRC.y+26, fontFamily:FONT, fontSize:16, fontWeight:700, color:C.navy, opacity:appear } }, 'Výstupy ze schůzky'));
  els.push(React.createElement('div', { key:'sts', style:{ position:'absolute', left:SRC.x+72, top:SRC.y+48, fontFamily:FONT, fontSize:12.5, fontWeight:500, color:C.gray, opacity:appear } }, 'Připraveno k odeslání'));
  ['Zápis','Úkoly','Follow up'].forEach((lab, i) => {
    const chLand = 0.45 + i * 0.5;
    const ch = smooth(t, chLand, chLand + 0.35);
    els.push(React.createElement('div', { key:'sc'+i, style:{ position:'absolute', left:SRC.x+24, top:SRC.y+96+i*36, display:'flex', alignItems:'center', gap:10, padding:'8px 14px', borderRadius:10, background:'#F4F6FA', opacity:ch, transform:'translateY('+((1-ch)*8)+'px)' } },
      React.createElement('div', { style:{ width:16, height:16, borderRadius:'50%', background:C.sky, display:'flex', alignItems:'center', justifyContent:'center', flex:'0 0 auto' } },
        React.createElement('svg', { width:9, height:9, viewBox:'0 0 8 8' }, React.createElement('path', { d:'M1.6 4.2 L3.3 5.9 L6.4 2.4', stroke:'#fff', strokeWidth:1.5, fill:'none', strokeLinecap:'round', strokeLinejoin:'round' })),
      ),
      React.createElement('span', { style:{ fontFamily:FONT, fontSize:13.5, fontWeight:600, color:C.navySoft } }, lab),
    ));
  });

  // ═══ destination tiles ═══
  DEST.forEach((d, k) => {
    const a = arriveOf(k);
    const synced = smooth(t, a, a + 0.3) * rearm;
    const glow = (Easing.easeInOutCubic(rise(t, d.launch, TRAVEL)) > 0.5) ? synced : synced;
    els.push(React.createElement('div', { key:'ti'+k, style:{ position:'absolute', left:TILE.x, top:TY[k], width:TILE.w, height:TILE.h, borderRadius:16, background:'#fff', border:'1px solid '+(synced>0.05 ? 'rgba(77,171,247,'+(0.25+synced*0.4)+')' : C.cardBd), boxShadow:'0 20px 44px rgba(23,23,58,'+(0.10+synced*0.05)+'), 0 5px 12px rgba(23,23,58,0.07)', display:'flex', alignItems:'center', gap:16, padding:'0 22px', boxSizing:'border-box', opacity:appear } },
      // icon square
      React.createElement('div', { style:{ position:'relative', width:48, height:48, borderRadius:13, flex:'0 0 auto', background: synced>0.05 ? 'rgba(77,171,247,0.10)' : '#F4F6FA', display:'flex', alignItems:'center', justifyContent:'center' } },
        React.createElement('div', { style:{ position:'relative', width:22, height:22 } }, tileIcon(d.icon, synced>0.3 ? C.sky : C.navySoft)),
      ),
      // label
      React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:5, minWidth:0, flex:1 } },
        React.createElement('span', { style:{ fontFamily:FONT, fontSize:15.5, fontWeight:600, color:C.navy, lineHeight:1.25 } }, d.title),
        React.createElement('span', { style:{ fontFamily:FONT, fontSize:12.5, fontWeight:600, color: synced>0.4 ? C.sky : '#C3C9D6', display:'flex', alignItems:'center', gap:5 } },
          React.createElement('span', { style:{ width:6, height:6, borderRadius:'50%', background: synced>0.4 ? C.sky : '#D6DBE6' } }),
          synced > 0.4 ? d.done : 'Připojeno',
        ),
      ),
      // sync check badge
      React.createElement('div', { style:{ width:26, height:26, borderRadius:'50%', flex:'0 0 auto', background:C.sky, display:'flex', alignItems:'center', justifyContent:'center', opacity:synced, transform:'scale('+(0.5+synced*0.5)+')', boxShadow:'0 4px 12px rgba(77,171,247,0.4)' } },
        React.createElement('svg', { width:13, height:13, viewBox:'0 0 13 13' }, React.createElement('path', { d:'M3 6.6 L5.5 9.1 L10 3.9', stroke:'#fff', strokeWidth:1.8, fill:'none', strokeLinecap:'round', strokeLinejoin:'round' })),
      ),
    ));
  });

  // ═══ traveling packets ═══
  DEST.forEach((d, k) => {
    const p = Easing.easeInOutCubic(rise(t, d.launch, TRAVEL));
    if (p <= 0.02 || p >= 0.99) return;
    const r = routePts[k];
    const pos = bez(p, r.from, r.ctrl, r.to);
    const fade = p < 0.14 ? p/0.14 : (p > 0.86 ? (1-p)/0.14 : 1);
    els.push(React.createElement('div', { key:'pk'+k, style:{ position:'absolute', left:pos.x-46, top:pos.y-13, display:'flex', alignItems:'center', gap:6, padding:'5px 10px', borderRadius:9, background:'#fff', border:'1px solid '+C.cardBd, boxShadow:'0 8px 20px rgba(23,23,58,0.16)', opacity:fade } },
      React.createElement('div', { style:{ width:6, height:6, borderRadius:'50%', background:d.tone, flex:'0 0 auto' } }),
      React.createElement('span', { style:{ fontFamily:FONT, fontSize:11.5, fontWeight:600, color:C.navy, whiteSpace:'nowrap' } }, d.packet),
    ));
  });

  return React.createElement('div', { style:{ position:'absolute', inset:0, width:1000, height:800 } }, els);
}

function ConnectScene() {
  return React.createElement(Stage, {
    width: 1000, height: 800, duration: D, background: 'transparent', loop: true, autoplay: true,
    persistKey: 'connect-scene',
  }, React.createElement(SceneContent, null));
}

window.ConnectScene = ConnectScene;
